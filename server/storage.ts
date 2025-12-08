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
import { eq, and, sql, gte, lte } from "drizzle-orm";

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
  
  // Analytics export operations
  getJourneyEventsForExport(startDate: Date, endDate: Date): Promise<any[]>;
  getWeeklyActivityForExport(startDate: Date, endDate: Date): Promise<any[]>;
  getDailyPageMetricsForExport(startDate: Date, endDate: Date): Promise<any[]>;
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

    const getWeekStart = (date: Date): Date => {
      const d = new Date(date);
      const day = d.getDay();
      const diff = d.getDate() - day + (day === 0 ? -6 : 1);
      d.setDate(diff);
      d.setHours(0, 0, 0, 0);
      return d;
    };

    const getDayStart = (date: Date): Date => {
      const d = new Date(date);
      d.setHours(0, 0, 0, 0);
      return d;
    };

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

    const now = new Date();
    const weekStart = getWeekStart(now);
    const dayStart = getDayStart(now);
    const dayKey = dayStart.toISOString().slice(0, 10);
    const totalDuration = events.reduce((sum, e) => sum + (e.durationSeconds || 0), 0);

    // Check if weekly record exists and update or insert
    const existingWeekly = await db.select()
      .from(userWeeklyActivity)
      .where(and(
        eq(userWeeklyActivity.clerkUserId, clerkUserId),
        eq(userWeeklyActivity.weekStart, weekStart)
      ));

    if (existingWeekly.length > 0) {
      const existing = existingWeekly[0];
      const currentDays = existing.visitedDays ? (existing.visitedDays as string[]) : [];
      const newDays = currentDays.includes(dayKey) ? currentDays : [...currentDays, dayKey];
      
      await db.update(userWeeklyActivity)
        .set({
          visitCount: (parseInt(existing.visitCount || "0") + events.length).toString(),
          totalDurationSeconds: (parseInt(existing.totalDurationSeconds || "0") + totalDuration).toString(),
          uniqueDays: newDays.length.toString(),
          visitedDays: newDays,
        })
        .where(eq(userWeeklyActivity.id, existing.id));
    } else {
      await db.insert(userWeeklyActivity).values({
        clerkUserId,
        weekStart,
        visitCount: events.length.toString(),
        uniqueDays: "1",
        totalDurationSeconds: totalDuration.toString(),
        visitedDays: [dayKey],
      });
    }

    // Aggregate events by path
    const pathCounts = new Map<string, { count: number; duration: number }>();
    for (const event of events) {
      const existing = pathCounts.get(event.path) || { count: 0, duration: 0 };
      existing.count++;
      existing.duration += event.durationSeconds || 0;
      pathCounts.set(event.path, existing);
    }

    // Update or insert daily page metrics
    for (const [path, data] of Array.from(pathCounts.entries())) {
      const existingDaily = await db.select()
        .from(userDailyPageMetrics)
        .where(and(
          eq(userDailyPageMetrics.clerkUserId, clerkUserId),
          eq(userDailyPageMetrics.date, dayStart),
          eq(userDailyPageMetrics.path, path)
        ));

      if (existingDaily.length > 0) {
        const existing = existingDaily[0];
        await db.update(userDailyPageMetrics)
          .set({
            visitCount: (parseInt(existing.visitCount || "0") + data.count).toString(),
            totalDurationSeconds: (parseInt(existing.totalDurationSeconds || "0") + data.duration).toString(),
          })
          .where(eq(userDailyPageMetrics.id, existing.id));
      } else {
        await db.insert(userDailyPageMetrics).values({
          clerkUserId,
          date: dayStart,
          path,
          visitCount: data.count.toString(),
          totalDurationSeconds: data.duration.toString(),
        });
      }
    }
  }

  async getJourneyEventsForExport(startDate: Date, endDate: Date): Promise<any[]> {
    const events = await db.select({
      id: userJourneyEvents.id,
      clerkUserId: userJourneyEvents.clerkUserId,
      sessionId: userJourneyEvents.sessionId,
      eventType: userJourneyEvents.eventType,
      path: userJourneyEvents.path,
      referrerPath: userJourneyEvents.referrerPath,
      durationSeconds: userJourneyEvents.durationSeconds,
      createdAt: userJourneyEvents.createdAt,
    })
      .from(userJourneyEvents)
      .where(and(
        gte(userJourneyEvents.createdAt, startDate),
        lte(userJourneyEvents.createdAt, endDate)
      ))
      .orderBy(userJourneyEvents.createdAt);
    return events;
  }

  async getWeeklyActivityForExport(startDate: Date, endDate: Date): Promise<any[]> {
    const activities = await db.select({
      id: userWeeklyActivity.id,
      clerkUserId: userWeeklyActivity.clerkUserId,
      weekStart: userWeeklyActivity.weekStart,
      visitCount: userWeeklyActivity.visitCount,
      uniqueDays: userWeeklyActivity.uniqueDays,
      totalDurationSeconds: userWeeklyActivity.totalDurationSeconds,
    })
      .from(userWeeklyActivity)
      .where(and(
        gte(userWeeklyActivity.weekStart, startDate),
        lte(userWeeklyActivity.weekStart, endDate)
      ))
      .orderBy(userWeeklyActivity.weekStart);
    return activities;
  }

  async getDailyPageMetricsForExport(startDate: Date, endDate: Date): Promise<any[]> {
    const metrics = await db.select({
      id: userDailyPageMetrics.id,
      clerkUserId: userDailyPageMetrics.clerkUserId,
      date: userDailyPageMetrics.date,
      path: userDailyPageMetrics.path,
      visitCount: userDailyPageMetrics.visitCount,
      totalDurationSeconds: userDailyPageMetrics.totalDurationSeconds,
    })
      .from(userDailyPageMetrics)
      .where(and(
        gte(userDailyPageMetrics.date, startDate),
        lte(userDailyPageMetrics.date, endDate)
      ))
      .orderBy(userDailyPageMetrics.date);
    return metrics;
  }
}

export const storage = new DatabaseStorage();
