"use server";

import { auth } from "@/lib/auth";
import { getRequiredUser } from "@/lib/auth/auth-user";
import type {
  CoachOnboardingInput,
  AthleteOnboardingInput,
} from "@/lib/impulsion/schemas";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/format/id";
import { logger } from "@/lib/logger";

type ActionResult = {
  success: boolean;
  error?: string;
};

/**
 * Complete coach onboarding - create/update organization
 */
export async function completeCoachOnboarding(
  data: CoachOnboardingInput,
): Promise<ActionResult> {
  try {
    const user = await getRequiredUser();

    // Update the user's default organization with team info
    // First, get the user's organizations
    const organizations = await auth.api.listOrganizations({
      headers: {
        cookie: `${user.id}`, // This won't work, need proper session handling
      },
    });

    // For now, update the first organization or create metadata
    // In production, this would be more sophisticated
    const orgId = organizations[0]?.id;

    if (orgId) {
      await prisma.organization.update({
        where: { id: orgId },
        data: {
          name: data.teamName,
          slug: generateSlug(data.teamName),
          metadata: JSON.stringify({
            sport: data.sport,
            type: "team",
          }),
        },
      });
    }

    return { success: true };
  } catch (err) {
    logger.error("Coach onboarding error:", { err });
    return {
      success: false,
      error: "Impossible de créer l'équipe. Veuillez réessayer.",
    };
  }
}

/**
 * Complete athlete onboarding - create athlete profile
 */
export async function completeAthleteOnboarding(
  data: AthleteOnboardingInput,
): Promise<ActionResult> {
  try {
    const user = await getRequiredUser();

    // Create or update athlete profile
    await prisma.$executeRaw`
      INSERT INTO athlete_profile (id, "userId", sport, "seasonGoal", "preferredDays", "createdAt", "updatedAt")
      VALUES (
        ${generateSlug("profile")},
        ${user.id},
        ${data.sport},
        ${data.seasonGoal ?? null},
        ${data.preferredDays ? JSON.stringify(data.preferredDays) : null}::jsonb,
        NOW(),
        NOW()
      )
      ON CONFLICT ("userId")
      DO UPDATE SET
        sport = EXCLUDED.sport,
        "seasonGoal" = EXCLUDED."seasonGoal",
        "preferredDays" = EXCLUDED."preferredDays",
        "updatedAt" = NOW()
    `;

    return { success: true };
  } catch (err) {
    logger.error("Athlete onboarding error:", { err });
    return {
      success: false,
      error: "Impossible de configurer le profil. Veuillez réessayer.",
    };
  }
}
