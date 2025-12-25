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

// Analytics: Raw journey events table
export const userJourneyEvents = pgTable("user_journey_events", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clerkUserId: varchar("clerk_user_id").notNull(),
  sessionId: varchar("session_id").notNull(),
  eventType: varchar("event_type").notNull(), // 'page_view', 'cta_click', 'whatsapp_opened', 'sign_in', etc.
  path: varchar("path").notNull(),
  referrerPath: varchar("referrer_path"),
  durationSeconds: varchar("duration_seconds"), // Time spent on previous page
  metadata: jsonb("metadata"), // Additional context (button label, etc.)
  createdAt: timestamp("created_at").defaultNow(),
}, (table) => [
  index("idx_journey_user_created").on(table.clerkUserId, table.createdAt),
  index("idx_journey_session").on(table.sessionId, table.createdAt),
]);

export type UserJourneyEvent = typeof userJourneyEvents.$inferSelect;

// Analytics: Weekly activity rollup
export const userWeeklyActivity = pgTable("user_weekly_activity", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clerkUserId: varchar("clerk_user_id").notNull(),
  weekStart: timestamp("week_start").notNull(), // Monday of the week
  visitCount: varchar("visit_count").notNull().default("0"),
  uniqueDays: varchar("unique_days").notNull().default("0"),
  totalDurationSeconds: varchar("total_duration_seconds").notNull().default("0"),
  visitedDays: jsonb("visited_days"), // Array of date strings to track unique days
}, (table) => [
  index("idx_weekly_user_week").on(table.clerkUserId, table.weekStart),
]);

export type UserWeeklyActivity = typeof userWeeklyActivity.$inferSelect;

// Analytics: Daily page metrics rollup
export const userDailyPageMetrics = pgTable("user_daily_page_metrics", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clerkUserId: varchar("clerk_user_id").notNull(),
  date: timestamp("date").notNull(),
  path: varchar("path").notNull(),
  visitCount: varchar("visit_count").notNull().default("0"),
  totalDurationSeconds: varchar("total_duration_seconds").notNull().default("0"),
}, (table) => [
  index("idx_daily_user_date_path").on(table.clerkUserId, table.date, table.path),
]);

export type UserDailyPageMetrics = typeof userDailyPageMetrics.$inferSelect;

// Zod schema for analytics event input
export const analyticsEventSchema = z.object({
  sessionId: z.string(),
  eventType: z.enum(['page_view', 'cta_click', 'whatsapp_opened', 'sign_in', 'sign_out', 'enroll']),
  path: z.string(),
  referrerPath: z.string().optional(),
  durationSeconds: z.number().optional(),
  metadata: z.record(z.any()).optional(),
  timestamp: z.string().optional(),
});

export const analyticsEventBatchSchema = z.object({
  events: z.array(analyticsEventSchema),
});

export type AnalyticsEventInput = z.infer<typeof analyticsEventSchema>;

// User Career Choices table - stores locked career pathway recommendations
export const userCareerChoices = pgTable("user_career_choices", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  clerkUserId: varchar("clerk_user_id").notNull().unique(),
  email: varchar("email").notNull(),
  recommendedPath: varchar("recommended_path").notNull(),
  confidenceLevel: varchar("confidence_level").notNull(),
  quizAnswers: jsonb("quiz_answers").notNull(),
  isLocked: varchar("is_locked").notNull().default("true"),
  lockedAt: timestamp("locked_at").defaultNow(),
  unlockedAt: timestamp("unlocked_at"),
});

export const insertCareerChoiceSchema = createInsertSchema(userCareerChoices).pick({
  clerkUserId: true,
  email: true,
  recommendedPath: true,
  confidenceLevel: true,
  quizAnswers: true,
});

export type InsertCareerChoice = z.infer<typeof insertCareerChoiceSchema>;
export type CareerChoice = typeof userCareerChoices.$inferSelect;
