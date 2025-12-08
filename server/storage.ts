import {
  users,
  enrollments,
  userProfiles,
  userJourneyEvents,
  userWeeklyActivity,
  userDailyPageMetrics,
  type User,
  type UpsertUser,
  type Enrollment,
  type InsertEnrollment,
  type UserProfile,
  type InsertUserProfile,
  type AnalyticsEventInput,
} from "@shared/schema";
import { db } from "./db";
import { eq, and, sql } from "drizzle-orm";

export interface IStorage {
  // User operations for Replit Auth
  getUser(id: string): Promise<User | undefined>;
  upsertUser(user: UpsertUser): Promise<User>;
  
  // Enrollment operations
  createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment>;
  getEnrollment(userId: string, program: string): Promise<Enrollment | undefined>;
  getUserEnrollments(userId: string): Promise<Enrollment[]>;
  
  // User Profile operations (for Gmail and WhatsApp)
  getUserProfile(clerkUserId: string): Promise<UserProfile | undefined>;
  upsertUserProfile(profile: InsertUserProfile): Promise<UserProfile>;
  
  // Analytics operations
  recordAnalyticsEvents(clerkUserId: string, events: AnalyticsEventInput[]): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async upsertUser(userData: UpsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(userData)
      .onConflictDoUpdate({
        target: users.id,
        set: {
          ...userData,
          updatedAt: new Date(),
        },
      })
      .returning();
    return user;
  }

  async createEnrollment(enrollment: InsertEnrollment): Promise<Enrollment> {
    const [result] = await db
      .insert(enrollments)
      .values(enrollment)
      .returning();
    return result;
  }

  async getEnrollment(userId: string, program: string): Promise<Enrollment | undefined> {
    const [enrollment] = await db
      .select()
      .from(enrollments)
      .where(and(eq(enrollments.userId, userId), eq(enrollments.program, program)));
    return enrollment;
  }

  async getUserEnrollments(userId: string): Promise<Enrollment[]> {
    return db.select().from(enrollments).where(eq(enrollments.userId, userId));
  }

  async getUserProfile(clerkUserId: string): Promise<UserProfile | undefined> {
    const [profile] = await db.select().from(userProfiles).where(eq(userProfiles.clerkUserId, clerkUserId));
    return profile;
  }

  async upsertUserProfile(profile: InsertUserProfile): Promise<UserProfile> {
    const [result] = await db
      .insert(userProfiles)
      .values(profile)
      .onConflictDoUpdate({
        target: userProfiles.clerkUserId,
        set: {
          email: profile.email,
          whatsappNumber: profile.whatsappNumber,
        },
      })
      .returning();
    return result;
  }

  async recordAnalyticsEvents(clerkUserId: string, events: AnalyticsEventInput[]): Promise<void> {
    if (events.length === 0) return;

    // Helper to get Monday of the week
    const getWeekStart = (date: Date): Date => {
      const d = new Date(date);
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1); // Adjust for Sunday
      d.setDate(diff);
      d.setHours(0, 0, 0, 0);
      return d;
    };

    // Helper to get start of day
    const getDayStart = (date: Date): Date => {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      return d;
    };

    // Insert raw events
    const eventRecords = events.map(event => ({
      clerkUserId,
      sessionId: event.sessionId,
      eventType: event.eventType,
      path: event.path,
      referrerPath: event.referrerPath || null,
      durationSeconds: event.durationSeconds?.toString() || null,
      metadata: event.metadata || null,
    }));

    await db.insert(userJourneyEvents).values(eventRecords);

    // Update weekly activity rollup
    const now = new Date();
    const weekStart = getWeekStart(now);
    const dayStart = getDayStart(now);
    
    // Calculate total duration from events
    const totalDuration = events.reduce((sum, e) => sum + (e.durationSeconds || 0), 0);

    // Upsert weekly activity
    await db
      .insert(userWeeklyActivity)
      .values({
        clerkUserId,
        weekStart,
        visitCount: events.length.toString(),
        uniqueDays: "1",
        totalDurationSeconds: totalDuration.toString(),
      })
      .onConflictDoNothing(); // Simple insert for now, updates handled separately

    // Try to update existing weekly record
    await db.execute(sql`
      UPDATE user_weekly_activity 
      SET visit_count = (CAST(visit_count AS INTEGER) + ${events.length})::VARCHAR,
          total_duration_seconds = (CAST(total_duration_seconds AS INTEGER) + ${totalDuration})::VARCHAR
      WHERE clerk_user_id = ${clerkUserId} 
        AND week_start = ${weekStart}
    `);

    // Upsert daily page metrics for each unique path
    const pathCounts = new Map<string, { count: number; duration: number }>();
    for (const event of events) {
      const existing = pathCounts.get(event.path) || { count: 0, duration: 0 };
      existing.count++;
      existing.duration += event.durationSeconds || 0;
      pathCounts.set(event.path, existing);
    }

    for (const [path, data] of Array.from(pathCounts.entries())) {
      await db
        .insert(userDailyPageMetrics)
        .values({
          clerkUserId,
          date: dayStart,
          path,
          visitCount: data.count.toString(),
          totalDurationSeconds: data.duration.toString(),
        })
        .onConflictDoNothing();

      // Try to update existing
      await db.execute(sql`
        UPDATE user_daily_page_metrics 
        SET visit_count = (CAST(visit_count AS INTEGER) + ${data.count})::VARCHAR,
            total_duration_seconds = (CAST(total_duration_seconds AS INTEGER) + ${data.duration})::VARCHAR
        WHERE clerk_user_id = ${clerkUserId} 
          AND date = ${dayStart}
          AND path = ${path}
      `);
    }
  }
}

export const storage = new DatabaseStorage();
