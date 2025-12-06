"use server";

import { authAction } from "@/lib/actions/safe-actions";
import { SessionFeedbackSchema } from "@/lib/impulsion/schemas";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/format/id";
import { logger } from "@/lib/logger";
import { z } from "zod";
import { processGamificationAfterFeedbackAction } from "@/features/gamification/gamification.action";

// ============================================================================
// SUBMIT FEEDBACK - Requires authenticated user
// ============================================================================

export const submitFeedbackAction = authAction
  .inputSchema(SessionFeedbackSchema)
  .action(async ({ parsedInput: data, ctx: { user } }) => {
    // Check if feedback already exists
    const existing = await prisma.$queryRaw<{ id: string }[]>`
      SELECT id FROM session_feedback
      WHERE "sessionId" = ${data.sessionId} AND "athleteId" = ${user.id}
      LIMIT 1
    `;

    if (existing.length > 0) {
      // Update existing feedback
      await prisma.$executeRaw`
        UPDATE session_feedback
        SET
          rpe = ${data.rpe},
          "actualDuration" = ${data.actualDuration ?? null},
          sensation = ${data.sensation ?? null},
          mood = ${data.mood ?? null},
          comment = ${data.comment ?? null},
          "updatedAt" = NOW()
        WHERE "sessionId" = ${data.sessionId} AND "athleteId" = ${user.id}
      `;
    } else {
      // Create new feedback
      const feedbackId = generateSlug("feedback");
      await prisma.$executeRaw`
        INSERT INTO session_feedback (
          id, "sessionId", "athleteId", rpe, "actualDuration",
          sensation, mood, comment, "createdAt", "updatedAt"
        )
        VALUES (
          ${feedbackId},
          ${data.sessionId},
          ${user.id},
          ${data.rpe},
          ${data.actualDuration ?? null},
          ${data.sensation ?? null},
          ${data.mood ?? null},
          ${data.comment ?? null},
          NOW(),
          NOW()
        )
      `;
    }

    // Update session assignment status to FAITE
    await prisma.$executeRaw`
      UPDATE session_assignment
      SET status = 'FAITE', "completedAt" = NOW()
      WHERE "sessionId" = ${data.sessionId} AND "athleteId" = ${user.id}
    `;

    // Trigger gamification (streak + badges)
    const gamificationResult = await processGamificationAfterFeedbackAction({});

    return {
      submitted: true,
      gamification: gamificationResult.data ?? null,
    };
  });

// ============================================================================
// GET SESSION FEEDBACKS - Requires authenticated user + verify access
// ============================================================================

export const getSessionFeedbacksAction = authAction
  .inputSchema(
    z.object({
      sessionId: z.string().min(1),
    }),
  )
  .action(async ({ parsedInput: { sessionId }, ctx: { user } }) => {
    // Verify user has access to this session (is member of the org that owns it)
    const hasAccess = await prisma.$queryRaw<{ id: string }[]>`
      SELECT cs.id
      FROM coaching_session cs
      JOIN member m ON cs."organizationId" = m."organizationId"
      WHERE cs.id = ${sessionId} AND m."userId" = ${user.id}
      LIMIT 1
    `;

    if (hasAccess.length === 0) {
      return { feedbacks: [] };
    }

    const feedbacks = await prisma.$queryRaw<
      {
        id: string;
        athleteId: string;
        athleteName: string;
        athleteImage: string | null;
        rpe: number;
        actualDuration: number | null;
        sensation: string | null;
        mood: string | null;
        comment: string | null;
        createdAt: Date;
      }[]
    >`
      SELECT
        sf.id,
        sf."athleteId",
        u.name as "athleteName",
        u.image as "athleteImage",
        sf.rpe,
        sf."actualDuration",
        sf.sensation,
        sf.mood,
        sf.comment,
        sf."createdAt"
      FROM session_feedback sf
      JOIN "user" u ON sf."athleteId" = u.id
      WHERE sf."sessionId" = ${sessionId}
      ORDER BY sf."createdAt" DESC
    `;

    return { feedbacks };
  });

// ============================================================================
// LEGACY EXPORTS (for backwards compatibility during migration)
// These will be removed after all callers are updated
// ============================================================================

import type { SessionFeedbackInput } from "@/lib/impulsion/schemas";

export async function submitFeedback(data: SessionFeedbackInput) {
  const result = await submitFeedbackAction(data);
  if (result.data) {
    return { success: true as const };
  }
  return {
    success: false as const,
    error:
      result.serverError ??
      "Impossible d'envoyer le feedback. Veuillez réessayer.",
  };
}

export async function getSessionFeedbacks(sessionId: string) {
  try {
    const result = await getSessionFeedbacksAction({ sessionId });
    if (result.data) {
      return result.data.feedbacks;
    }
    return [];
  } catch (err) {
    logger.error("Get session feedbacks error:", { err });
    return [];
  }
}
