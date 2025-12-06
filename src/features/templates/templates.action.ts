"use server";

import { orgAction } from "@/lib/actions/safe-actions";
import { ActionError } from "@/lib/errors/action-error";
import { CreateTemplateSchema } from "@/lib/impulsion/schemas";
import { prisma } from "@/lib/prisma";
import { generateSlug } from "@/lib/format/id";
import { z } from "zod";

// ============================================================================
// CREATE TEMPLATE - Requires owner/admin role
// ============================================================================

export const createTemplateAction = orgAction
  .metadata({ roles: ["owner", "admin"] })
  .inputSchema(CreateTemplateSchema)
  .action(async ({ parsedInput: data, ctx: { org } }) => {
    const templateId = generateSlug("template");
    const tagsJson = data.tags ? JSON.stringify(data.tags) : null;

    await prisma.$executeRaw`
      INSERT INTO session_template (
        id, "organizationId", "createdById", title, description,
        type, "durationMinutes", "targetRpe", category, tags,
        "createdAt", "updatedAt"
      )
      VALUES (
        ${templateId},
        ${org.id},
        ${org.user.id},
        ${data.title},
        ${data.description ?? null},
        ${data.type},
        ${data.durationMinutes},
        ${data.targetRpe ?? null},
        ${data.category},
        ${tagsJson}::jsonb,
        NOW(),
        NOW()
      )
    `;

    return { templateId };
  });

// ============================================================================
// UPDATE TEMPLATE - Requires owner/admin role
// ============================================================================

const UpdateTemplateInputSchema = CreateTemplateSchema.partial().extend({
  templateId: z.string().min(1),
});

export const updateTemplateAction = orgAction
  .metadata({ roles: ["owner", "admin"] })
  .inputSchema(UpdateTemplateInputSchema)
  .action(async ({ parsedInput: { templateId, ...data }, ctx: { org } }) => {
    // Check if there's anything to update
    const hasUpdates =
      data.title !== undefined ||
      data.description !== undefined ||
      data.type !== undefined ||
      data.durationMinutes !== undefined ||
      data.targetRpe !== undefined ||
      data.category !== undefined ||
      data.tags !== undefined;

    if (!hasUpdates) {
      return { updated: true };
    }

    // Use COALESCE for conditional updates - only update fields that are provided
    const tagsJson = data.tags !== undefined ? JSON.stringify(data.tags) : null;

    const result = await prisma.$executeRaw`
      UPDATE session_template
      SET
          title = COALESCE(${data.title ?? null}, title),
          description = COALESCE(${data.description ?? null}, description),
          type = COALESCE(${data.type ?? null}, type),
          "durationMinutes" = COALESCE(${data.durationMinutes ?? null}, "durationMinutes"),
          "targetRpe" = COALESCE(${data.targetRpe ?? null}, "targetRpe"),
          category = COALESCE(${data.category ?? null}, category),
          tags = COALESCE(${tagsJson}::jsonb, tags),
          "updatedAt" = NOW()
      WHERE id = ${templateId} AND "organizationId" = ${org.id}
    `;

    if (result === 0) {
      throw new ActionError("Template non trouvé");
    }

    return { updated: true };
  });

// ============================================================================
// DELETE TEMPLATE - Requires owner/admin role
// ============================================================================

export const deleteTemplateAction = orgAction
  .metadata({ roles: ["owner", "admin"] })
  .inputSchema(
    z.object({
      templateId: z.string().min(1),
    }),
  )
  .action(async ({ parsedInput: { templateId }, ctx: { org } }) => {
    const result = await prisma.$executeRaw`
      DELETE FROM session_template
      WHERE id = ${templateId} AND "organizationId" = ${org.id}
    `;

    if (result === 0) {
      throw new ActionError("Template non trouvé");
    }

    return { deleted: true };
  });

// ============================================================================
// DUPLICATE TEMPLATE - Requires owner/admin role
// ============================================================================

export const duplicateTemplateAction = orgAction
  .metadata({ roles: ["owner", "admin"] })
  .inputSchema(
    z.object({
      templateId: z.string().min(1),
    }),
  )
  .action(async ({ parsedInput: { templateId }, ctx: { org } }) => {
    // Get the original template
    const templates = await prisma.$queryRaw<
      {
        title: string;
        description: string | null;
        type: string;
        durationMinutes: number;
        targetRpe: number | null;
        category: string;
        tags: string | null;
      }[]
    >`
      SELECT title, description, type, "durationMinutes", "targetRpe", category, tags::text
      FROM session_template
      WHERE id = ${templateId} AND "organizationId" = ${org.id}
    `;

    if (templates.length === 0) {
      throw new ActionError("Template non trouvé");
    }

    const original = templates[0];
    const newId = generateSlug("template");

    await prisma.$executeRaw`
      INSERT INTO session_template (
        id, "organizationId", "createdById", title, description,
        type, "durationMinutes", "targetRpe", category, tags,
        "createdAt", "updatedAt"
      )
      VALUES (
        ${newId},
        ${org.id},
        ${org.user.id},
        ${`${original.title} (copie)`},
        ${original.description},
        ${original.type},
        ${original.durationMinutes},
        ${original.targetRpe},
        ${original.category},
        ${original.tags}::jsonb,
        NOW(),
        NOW()
      )
    `;

    return { templateId: newId };
  });

// ============================================================================
// LEGACY EXPORTS (for backwards compatibility during migration)
// These will be removed after all callers are updated
// ============================================================================

import type {
  CreateTemplateInput,
  UpdateTemplateInput,
} from "./templates.types";

export async function createTemplate(data: CreateTemplateInput) {
  const result = await createTemplateAction(data);
  if (result.data) {
    return { success: true as const, data: { id: result.data.templateId } };
  }
  return {
    success: false as const,
    error:
      result.serverError ??
      "Impossible de créer le template. Veuillez réessayer.",
  };
}

export async function updateTemplate(
  templateId: string,
  data: UpdateTemplateInput,
) {
  const result = await updateTemplateAction({ templateId, ...data });
  if (result.data) {
    return { success: true as const };
  }
  return {
    success: false as const,
    error: result.serverError ?? "Impossible de mettre à jour le template.",
  };
}

export async function deleteTemplate(templateId: string) {
  const result = await deleteTemplateAction({ templateId });
  if (result.data) {
    return { success: true as const };
  }
  return {
    success: false as const,
    error:
      result.serverError ??
      "Impossible de supprimer le template. Veuillez réessayer.",
  };
}

export async function duplicateTemplate(templateId: string) {
  const result = await duplicateTemplateAction({ templateId });
  if (result.data) {
    return { success: true as const, data: { id: result.data.templateId } };
  }
  return {
    success: false as const,
    error: result.serverError ?? "Impossible de dupliquer le template.",
  };
}
