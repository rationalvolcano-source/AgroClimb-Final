import { sql } from "drizzle-orm";
import {
  index,
  jsonb,
  pgTable,
  timestamp,
  varchar,
  text,
} from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Session storage table for Replit Auth
export const sessions = pgTable(
  "sessions",
  {
    sid: varchar("sid").primaryKey(),
    sess: jsonb("sess").notNull(),
    expire: timestamp("expire").notNull(),
  },
  (table) => [index("IDX_session_expire").on(table.expire)],
);

// User storage table for Replit Auth
export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  email: varchar("email").unique(),
  firstName: varchar("first_name"),
  lastName: varchar("last_name"),
  profileImageUrl: varchar("profile_image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type UpsertUser = typeof users.$inferInsert;
export type User = typeof users.$inferSelect;

// Enrollments table to track user enrollments in programs
export const enrollments = pgTable("enrollments", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").notNull().references(() => users.id),
  program: varchar("program").notNull(), // 'digital-skills', 'webinars', 'daily-news'
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertEnrollmentSchema = createInsertSchema(enrollments).pick({
  userId: true,
  program: true,
});

export type InsertEnrollment = z.infer<typeof insertEnrollmentSchema>;
export type Enrollment = typeof enrollments.$inferSelect;

// User Profiles table for storing Gmail and WhatsApp (linked to Clerk userId)
export const userProfiles = pgTable("user_profiles", {
  clerkUserId: varchar("clerk_user_id").primaryKey(),
  email: varchar("email").notNull(),
  whatsappNumber: varchar("whatsapp_number"),
});

export const insertUserProfileSchema = createInsertSchema(userProfiles).extend({
  email: z.string().email("Invalid email format"),
  whatsappNumber: z.string().regex(/^\+?[1-9]\d{6,14}$/, "Invalid WhatsApp number format").optional().or(z.literal("")),
});

export type InsertUserProfile = z.infer<typeof insertUserProfileSchema>;
export type UserProfile = typeof userProfiles.$inferSelect;
