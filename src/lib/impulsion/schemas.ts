/**
 * Impulsion Zod Schemas
 *
 * Schémas de validation pour les formulaires et actions serveur.
 */

import { z } from "zod";
import {
  BADGE_CATEGORIES,
  BADGE_RARITIES,
  DAYS_OF_WEEK,
  MOODS,
  PAIN_LOCATIONS,
  PAIN_SIDES,
  SENSATIONS,
  SESSION_STATUSES,
  SESSION_TYPES,
  SPORTS,
  TEMPLATE_CATEGORIES,
} from "./types";

// ============================================================================
// ATHLETE PROFILE
// ============================================================================

export const AthleteProfileSchema = z.object({
  sport: z.enum(SPORTS).optional(),
  dateOfBirth: z.coerce.date().optional(),
  seasonGoal: z.string().max(500).optional(),
  personalBests: z.record(z.string(), z.string()).optional(),
  healthNotes: z.string().max(1000).optional(),
  preferredDays: z.array(z.enum(DAYS_OF_WEEK)).optional(),
  weeklyVolumeTarget: z.number().min(0).max(2000).optional(),
});

export type AthleteProfileInput = z.infer<typeof AthleteProfileSchema>;

// ============================================================================
// COACHING SESSION
// ============================================================================

export const CreateSessionSchema = z.object({
  title: z.string().min(1, "Le titre est requis").max(200),
  description: z.string().max(2000).optional(),
  type: z
    .enum(Object.values(SESSION_TYPES) as [string, ...string[]])
    .default("AUTRE"),
  scheduledAt: z.coerce.date(),
  durationMinutes: z.number().min(5).max(480).default(60),
  targetRpe: z.number().min(1).max(10).optional(),
  athleteIds: z.array(z.string()).min(1, "Sélectionnez au moins un athlète"),
});

export type CreateSessionInput = z.infer<typeof CreateSessionSchema>;

export const UpdateSessionSchema = CreateSessionSchema.partial().extend({
  id: z.string(),
  status: z
    .enum(Object.values(SESSION_STATUSES) as [string, ...string[]])
    .optional(),
});

export type UpdateSessionInput = z.infer<typeof UpdateSessionSchema>;

// ============================================================================
// SESSION FEEDBACK
// ============================================================================

export const SessionFeedbackSchema = z.object({
  sessionId: z.string(),
  rpe: z.number().min(1).max(10),
  actualDuration: z.number().min(0).max(480).optional(),
  sensation: z
    .enum(Object.values(SENSATIONS) as [string, ...string[]])
    .optional(),
  mood: z.enum(Object.values(MOODS) as [string, ...string[]]).optional(),
  comment: z.string().max(2000).optional(),
});

export type SessionFeedbackInput = z.infer<typeof SessionFeedbackSchema>;

// ============================================================================
// PAIN REPORT
// ============================================================================

export const PainReportSchema = z.object({
  feedbackId: z.string().optional(),
  location: z.enum(Object.values(PAIN_LOCATIONS) as [string, ...string[]]),
  side: z
    .enum(Object.values(PAIN_SIDES) as [string, ...string[]])
    .default("CENTER"),
  intensity: z.number().min(1).max(10),
  description: z.string().max(1000).optional(),
});

export type PainReportInput = z.infer<typeof PainReportSchema>;

export const ResolvePainSchema = z.object({
  id: z.string(),
  coachNotes: z.string().max(1000).optional(),
});

export type ResolvePainInput = z.infer<typeof ResolvePainSchema>;

// ============================================================================
// VIDEO
// ============================================================================

export const UploadVideoSchema = z.object({
  title: z.string().min(1).max(200),
  sessionId: z.string().optional(),
  fileName: z.string(),
  fileUrl: z.string().url(),
  fileSize: z.number().min(1),
  duration: z.number().min(1).optional(),
  thumbnailUrl: z.string().url().optional(),
});

export type UploadVideoInput = z.infer<typeof UploadVideoSchema>;

// ============================================================================
// VIDEO MARKER
// ============================================================================

export const CreateMarkerSchema = z.object({
  videoId: z.string(),
  timestamp: z.number().min(0),
  content: z.string().min(1).max(1000),
  parentId: z.string().optional(),
});

export type CreateMarkerInput = z.infer<typeof CreateMarkerSchema>;

// ============================================================================
// SESSION TEMPLATE
// ============================================================================

export const CreateTemplateSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().max(2000).optional(),
  type: z
    .enum(Object.values(SESSION_TYPES) as [string, ...string[]])
    .default("AUTRE"),
  durationMinutes: z.number().min(5).max(480).default(60),
  targetRpe: z.number().min(1).max(10).optional(),
  category: z
    .enum(Object.values(TEMPLATE_CATEGORIES) as [string, ...string[]])
    .default("AUTRE"),
  tags: z.array(z.string()).optional(),
});

export type CreateTemplateInput = z.infer<typeof CreateTemplateSchema>;

// ============================================================================
// TEAM INVITATION
// ============================================================================

export const InviteAthleteSchema = z.object({
  email: z.string().email("Email invalide"),
  role: z.enum(["member", "admin"]).default("member"),
});

export type InviteAthleteInput = z.infer<typeof InviteAthleteSchema>;

// ============================================================================
// ONBOARDING
// ============================================================================

export const CoachOnboardingSchema = z.object({
  teamName: z.string().min(2, "Nom d'équipe trop court").max(100),
  sport: z.enum(SPORTS),
  logo: z.string().url().optional(),
});

export type CoachOnboardingInput = z.infer<typeof CoachOnboardingSchema>;

export const AthleteOnboardingSchema = z.object({
  sport: z.enum(SPORTS),
  dateOfBirth: z.coerce.date().optional(),
  seasonGoal: z.string().max(500).optional(),
  preferredDays: z.array(z.enum(DAYS_OF_WEEK)).optional(),
});

export type AthleteOnboardingInput = z.infer<typeof AthleteOnboardingSchema>;

// ============================================================================
// BADGE
// ============================================================================

export const CreateBadgeSchema = z.object({
  key: z.string().min(1).max(50),
  name: z.string().min(1).max(100),
  description: z.string().max(500),
  iconUrl: z.string().url().optional(),
  category: z
    .enum(Object.values(BADGE_CATEGORIES) as [string, ...string[]])
    .default("JALON"),
  rarity: z
    .enum(Object.values(BADGE_RARITIES) as [string, ...string[]])
    .default("COMMUN"),
  criteria: z
    .object({
      type: z.string(),
      value: z.number(),
    })
    .optional(),
  xpReward: z.number().min(0).default(0),
});

export type CreateBadgeInput = z.infer<typeof CreateBadgeSchema>;

// ============================================================================
// FILTERS & QUERIES
// ============================================================================

export const SessionFiltersSchema = z.object({
  status: z
    .enum(Object.values(SESSION_STATUSES) as [string, ...string[]])
    .optional(),
  type: z
    .enum(Object.values(SESSION_TYPES) as [string, ...string[]])
    .optional(),
  athleteId: z.string().optional(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional(),
});

export type SessionFilters = z.infer<typeof SessionFiltersSchema>;

export const CalendarQuerySchema = z.object({
  month: z.number().min(1).max(12),
  year: z.number().min(2020).max(2100),
  athleteId: z.string().optional(),
});

export type CalendarQuery = z.infer<typeof CalendarQuerySchema>;
