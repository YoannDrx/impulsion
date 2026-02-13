"use server";

import { getRequiredUser } from "@/lib/auth/auth-user";
import type { PainLocation, PainSide } from "@/lib/impulsion/types";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/format/id";
import { logger } from "@/lib/logger";

type PainReportInput = {
  feedbackId?: string;
  location: PainLocation;
  side: PainSide;
  intensity: number;
  description?: string;
};

type ActionResult = {
  success: boolean;
  error?: string;
};

/**
 * Submit a pain report from an athlete
 */
export async function submitPainReport(
  data: PainReportInput,
): Promise<ActionResult> {
  try {
    const user = await getRequiredUser();

    const painReportId = generateSlug("pain");

    await prisma.$executeRaw`
      INSERT INTO pain_report (
        id, "athleteId", "feedbackId", location, side,
        intensity, description, "isResolved", "createdAt", "updatedAt"
      )
      VALUES (
        ${painReportId},
        ${user.id},
        ${data.feedbackId ?? null},
        ${data.location},
        ${data.side},
        ${data.intensity},
        ${data.description ?? null},
        false,
        NOW(),
        NOW()
      )
    `;

    return { success: true };
  } catch (err) {
    logger.error("Submit pain report error:", { err });
    return {
      success: false,
      error: "Impossible de signaler la douleur. Veuillez réessayer.",
    };
  }
}

/**
 * Get pain reports for an athlete
 */
export async function getAthletePainReports(athleteId: string) {
  try {
    const reports = await prisma.$queryRaw<
      {
        id: string;
        location: string;
        side: string;
        intensity: number;
        description: string | null;
        isResolved: boolean;
        coachNotes: string | null;
        createdAt: Date;
      }[]
    >`
      SELECT
        id, location, side, intensity, description,
        "isResolved", "coachNotes", "createdAt"
      FROM pain_report
      WHERE "athleteId" = ${athleteId}
      ORDER BY "createdAt" DESC
      LIMIT 20
    `;

    return reports;
  } catch {
    return [];
  }
}

/**
 * Mark a pain report as resolved (coach action)
 */
export async function resolvePainReport(
  painReportId: string,
  coachNotes?: string,
): Promise<ActionResult> {
  try {
    await prisma.$executeRaw`
      UPDATE pain_report
      SET
        "isResolved" = true,
        "resolvedAt" = NOW(),
        "coachNotes" = ${coachNotes ?? null},
        "updatedAt" = NOW()
      WHERE id = ${painReportId}
    `;

    return { success: true };
  } catch (err) {
    logger.error("Resolve pain report error:", { err });
    return {
      success: false,
      error: "Impossible de résoudre le signalement.",
    };
  }
}
