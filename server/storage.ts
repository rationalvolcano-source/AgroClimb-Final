import {
  users,
  enrollments,
  userProfiles,
  type User,
  type UpsertUser,
  type Enrollment,
  type InsertEnrollment,
  type UserProfile,
  type InsertUserProfile,
} from "@shared/schema";
import { db } from "./db";
import { eq, and } from "drizzle-orm";

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
}

export const storage = new DatabaseStorage();
