"use server";

import { orgAction } from "@/lib/actions/safe-actions";
import { ActionError } from "@/lib/errors/action-error";
import { CreateSessionSchema } from "@/lib/impulsion/schemas";
import { SESSION_STATUSES } from "@/lib/impulsion/types";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/format/id";
import { z } from "zod";

// ============================================================================
// CREATE SESSION - Requires owner/admin role
// ============================================================================

export const createSessionAction = orgAction
  .metadata({ roles: ["owner", "admin"] })
  .inputSchema(CreateSessionSchema)
  .action(async ({ parsedInput: data, ctx: { org } }) => {
    const sessionId = generateSlug("session");

    // Create the coaching session using raw SQL
    await prisma.$executeRaw`
      INSERT INTO coaching_session (
        id, "organizationId", "createdById", title, description,
        type, "scheduledAt", "durationMinutes", "targetRpe", status,
        "createdAt", "updatedAt"
      )
      VALUES (
        ${sessionId},
        ${org.id},
        ${org.user.id},
        ${data.title},
        ${data.description ?? null},
        ${data.type},
        ${data.scheduledAt},
        ${data.durationMinutes},
        ${data.targetRpe ?? null},
        'PLANIFIEE',
        NOW(),
        NOW()
      )
    `;

    // Create assignments for each athlete using Promise.all
    const assignmentPromises = data.athleteIds.map(async (athleteId) => {
      const assignmentId = generateSlug("assign");
      return prisma.$executeRaw`
        INSERT INTO session_assignment (
          id, "sessionId", "athleteId", status, "createdAt"
        )
        VALUES (
          ${assignmentId},
          ${sessionId},
          ${athleteId},
          'PLANIFIEE',
          NOW()
        )
      `;
    });
    await Promise.all(assignmentPromises);

    return { sessionId };
  });

// ============================================================================
// UPDATE SESSION STATUS - Requires org membership
// ============================================================================

const UpdateSessionStatusSchema = z.object({
  sessionId: z.string().min(1),
  status: z.enum(Object.values(SESSION_STATUSES) as [string, ...string[]]),
});

export const updateSessionStatusAction = orgAction
  .metadata({ roles: ["owner", "admin", "member"] })
  .inputSchema(UpdateSessionStatusSchema)
  .action(async ({ parsedInput: { sessionId, status }, ctx: { org } }) => {
    const result = await prisma.$executeRaw`
      UPDATE coaching_session
      SET status = ${status}, "updatedAt" = NOW()
      WHERE id = ${sessionId} AND "organizationId" = ${org.id}
    `;

    if (result === 0) {
      throw new ActionError("Séance non trouvée");
    }

    return { updated: true };
  });

// ============================================================================
// DELETE SESSION - Requires owner/admin role
// ============================================================================

export const deleteSessionAction = orgAction
  .metadata({ roles: ["owner", "admin"] })
  .inputSchema(
    z.object({
      sessionId: z.string().min(1),
    }),
  )
  .action(async ({ parsedInput: { sessionId }, ctx: { org } }) => {
    // Delete using raw SQL (cascade will handle assignments)
    const result = await prisma.$executeRaw`
      DELETE FROM coaching_session
      WHERE id = ${sessionId} AND "organizationId" = ${org.id}
    `;

    if (result === 0) {
      throw new ActionError("Séance non trouvée");
    }

    return { deleted: true };
  });

// ============================================================================
// LEGACY EXPORTS (for backwards compatibility during migration)
// These will be removed after all callers are updated
// ============================================================================

export async function createSession(data: z.infer<typeof CreateSessionSchema>) {
  const result = await createSessionAction(data);
  if (result.data) {
    return { success: true as const, data: result.data };
  }
  return {
    success: false as const,
    error:
      result.serverError ??
      "Impossible de créer la séance. Veuillez réessayer.",
  };
}

export async function updateSessionStatus(sessionId: string, status: string) {
  const result = await updateSessionStatusAction({
    sessionId,
    status: status as z.infer<typeof UpdateSessionStatusSchema>["status"],
  });
  if (result.data) {
    return { success: true as const };
  }
  return {
    success: false as const,
    error: result.serverError ?? "Impossible de mettre à jour le statut.",
  };
}

export async function deleteSession(sessionId: string) {
  const result = await deleteSessionAction({ sessionId });
  if (result.data) {
    return { success: true as const };
  }
  return {
    success: false as const,
    error:
      result.serverError ??
      "Impossible de supprimer la séance. Veuillez réessayer.",
  };
}
