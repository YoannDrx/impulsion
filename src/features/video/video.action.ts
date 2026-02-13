"use server";

import { authAction, orgAction } from "@/lib/actions/safe-actions";
import { ActionError } from "@/lib/errors/action-error";
import { fileAdapter } from "@/lib/files/vercel-blob-adapter";
import { generateSlug } from "@/lib/format/id";
import { prisma } from "@/lib/prisma";
import { SiteConfig } from "@/site-config";
import { z } from "zod";
import { checkAndUnlockBadgesAction } from "@/features/gamification/gamification.action";

// Get Impulsion-specific limits based on plan
function getImpulsionLimits(planName: string | null | undefined) {
  const isPro = planName === "pro" || planName === "ultra";
  return isPro ? SiteConfig.limits.pro : SiteConfig.limits.free;
}

// ============================================================================
// UPLOAD VIDEO - Requires org membership + applies plan limits
// ============================================================================

export const uploadVideoAction = orgAction
  .metadata({ roles: ["owner", "admin", "member"] })
  .inputSchema(
    z.object({
      formData: z.instanceof(FormData),
    }),
  )
  .action(async ({ parsedInput: { formData }, ctx: { org } }) => {
    const fileEntry = formData.get("file");
    const title = formData.get("title") as string;
    const sessionId = (formData.get("sessionId") as string) || null;
    const thumbnailEntry = formData.get("thumbnail");
    const durationStr = formData.get("duration") as string | null;

    if (!(fileEntry instanceof File)) {
      throw new ActionError("Fichier requis");
    }

    const file = fileEntry;

    if (!file.type.startsWith("video/")) {
      throw new ActionError("Le fichier doit être une vidéo");
    }

    // Get Impulsion-specific limits based on plan
    const limits = getImpulsionLimits(org.subscription?.plan);

    // Apply plan limits for video size
    const maxSizeMB = limits.maxVideoSizeMB;
    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      throw new ActionError(`La vidéo ne doit pas dépasser ${maxSizeMB} Mo`);
    }

    // Check monthly video count limit
    const maxVideosPerMonth = limits.maxVideosPerMonth;
    if (maxVideosPerMonth !== -1) {
      const startOfMonth = new Date();
      startOfMonth.setDate(1);
      startOfMonth.setHours(0, 0, 0, 0);

      const videoCount = await prisma.$queryRaw<{ count: bigint }[]>`
        SELECT COUNT(*) as count FROM video
        WHERE "organizationId" = ${org.id}
        AND "createdAt" >= ${startOfMonth}
      `;

      if (Number(videoCount[0]?.count ?? 0) >= maxVideosPerMonth) {
        throw new ActionError(
          `Limite de ${maxVideosPerMonth} vidéos par mois atteinte. Passez au plan Pro pour des vidéos illimitées.`,
        );
      }
    }

    const videoId = generateSlug("vid");

    // Upload video to Vercel Blob
    const uploadResult = await fileAdapter.uploadFile({
      file,
      path: `videos/${org.id}`,
    });

    if (uploadResult.error) {
      throw new ActionError("Erreur lors de l'upload");
    }

    // Upload thumbnail if provided
    let thumbnailUrl: string | null = null;
    if (thumbnailEntry instanceof File) {
      const thumbResult = await fileAdapter.uploadFile({
        file: thumbnailEntry,
        path: `thumbnails/${org.id}`,
      });
      if (thumbResult.data) {
        thumbnailUrl = thumbResult.data.url;
      }
    }

    // Parse duration
    const duration = durationStr ? parseFloat(durationStr) : null;

    // Create video record - uses org.id from context, NOT from client
    await prisma.$executeRaw`
      INSERT INTO video (
        id, "organizationId", "uploadedById", "sessionId",
        title, "fileName", "fileUrl", "fileSize",
        "thumbnailUrl", duration,
        status, "createdAt", "updatedAt"
      )
      VALUES (
        ${videoId},
        ${org.id},
        ${org.user.id},
        ${sessionId},
        ${title || file.name},
        ${file.name},
        ${uploadResult.data.url},
        ${file.size},
        ${thumbnailUrl},
        ${duration},
        'READY',
        NOW(),
        NOW()
      )
    `;

    // Trigger gamification check for video upload badges
    const gamificationResult = await checkAndUnlockBadgesAction({
      triggerType: "video",
    });

    return {
      videoId,
      gamification: gamificationResult.data ?? null,
    };
  });

// ============================================================================
// ADD VIDEO MARKER - Requires auth + verify access to video
// ============================================================================

export const addVideoMarkerAction = authAction
  .inputSchema(
    z.object({
      videoId: z.string().min(1),
      timestamp: z.number().min(0),
      content: z.string().min(1),
      parentId: z.string().optional(),
    }),
  )
  .action(async ({ parsedInput, ctx: { user } }) => {
    const { videoId, timestamp, content, parentId } = parsedInput;

    // Verify user has access to this video (is member of the org that owns it)
    const video = await prisma.$queryRaw<{ organizationId: string }[]>`
      SELECT v."organizationId"
      FROM video v
      JOIN member m ON v."organizationId" = m."organizationId"
      WHERE v.id = ${videoId} AND m."userId" = ${user.id}
    `;

    if (video.length === 0) {
      throw new ActionError("Vidéo non trouvée ou accès non autorisé");
    }

    const markerId = generateSlug("mrk");

    await prisma.$executeRaw`
      INSERT INTO video_marker (
        id, "videoId", "authorId", timestamp, content, "parentId",
        "createdAt", "updatedAt"
      )
      VALUES (
        ${markerId},
        ${videoId},
        ${user.id},
        ${timestamp},
        ${content},
        ${parentId ?? null},
        NOW(),
        NOW()
      )
    `;

    return { markerId };
  });

// ============================================================================
// DELETE VIDEO - Requires org membership + ownership check
// ============================================================================

export const deleteVideoAction = orgAction
  .metadata({ roles: ["owner", "admin"] })
  .inputSchema(
    z.object({
      videoId: z.string().min(1),
    }),
  )
  .action(async ({ parsedInput: { videoId }, ctx: { org } }) => {
    // Delete only if video belongs to the current org
    const result = await prisma.$executeRaw`
      DELETE FROM video
      WHERE id = ${videoId} AND "organizationId" = ${org.id}
    `;

    if (result === 0) {
      throw new ActionError("Vidéo non trouvée");
    }

    return { deleted: true };
  });

// ============================================================================
// UPDATE VIDEO TITLE - Requires org membership + ownership check
// ============================================================================

export const updateVideoTitleAction = orgAction
  .metadata({ roles: ["owner", "admin"] })
  .inputSchema(
    z.object({
      videoId: z.string().min(1),
      title: z.string().min(1).max(200),
    }),
  )
  .action(async ({ parsedInput: { videoId, title }, ctx: { org } }) => {
    const result = await prisma.$executeRaw`
      UPDATE video
      SET title = ${title}, "updatedAt" = NOW()
      WHERE id = ${videoId} AND "organizationId" = ${org.id}
    `;

    if (result === 0) {
      throw new ActionError("Vidéo non trouvée");
    }

    return { updated: true };
  });

// ============================================================================
// DELETE MARKER - Requires auth + verify ownership of marker
// ============================================================================

export const deleteMarkerAction = authAction
  .inputSchema(
    z.object({
      markerId: z.string().min(1),
    }),
  )
  .action(async ({ parsedInput: { markerId }, ctx: { user } }) => {
    // Only the author can delete their own marker, OR org admin/owner
    const marker = await prisma.$queryRaw<
      { authorId: string; organizationId: string }[]
    >`
      SELECT vm."authorId", v."organizationId"
      FROM video_marker vm
      JOIN video v ON vm."videoId" = v.id
      WHERE vm.id = ${markerId}
    `;

    if (marker.length === 0) {
      throw new ActionError("Commentaire non trouvé");
    }

    const isAuthor = marker[0].authorId === user.id;

    // Check if user is admin/owner of the org
    const isOrgAdmin = await prisma.$queryRaw<{ role: string }[]>`
      SELECT role FROM member
      WHERE "organizationId" = ${marker[0].organizationId}
      AND "userId" = ${user.id}
      AND role IN ('owner', 'admin')
    `;

    if (!isAuthor && isOrgAdmin.length === 0) {
      throw new ActionError(
        "Vous ne pouvez supprimer que vos propres commentaires",
      );
    }

    await prisma.$executeRaw`
      DELETE FROM video_marker WHERE id = ${markerId}
    `;

    return { deleted: true };
  });

// ============================================================================
// LEGACY EXPORTS (for backwards compatibility during migration)
// These will be removed after all callers are updated
// ============================================================================

// Re-export with old names pointing to new action wrapper functions
export async function uploadVideo(formData: FormData) {
  const result = await uploadVideoAction({ formData });
  if (result.data) {
    return { success: true as const, data: result.data };
  }
  return {
    success: false as const,
    error: result.serverError ?? "Erreur lors de l'upload",
  };
}

export async function addVideoMarker(data: {
  videoId: string;
  timestamp: number;
  content: string;
  parentId?: string;
}) {
  const result = await addVideoMarkerAction(data);
  if (result.data) {
    return { success: true as const, data: result.data };
  }
  return {
    success: false as const,
    error: result.serverError ?? "Erreur lors de l'ajout du commentaire",
  };
}

export async function deleteVideo(videoId: string) {
  const result = await deleteVideoAction({ videoId });
  if (result.data) {
    return { success: true as const, data: undefined };
  }
  return {
    success: false as const,
    error: result.serverError ?? "Erreur lors de la suppression",
  };
}

export async function updateVideoTitle(videoId: string, title: string) {
  const result = await updateVideoTitleAction({ videoId, title });
  if (result.data) {
    return { success: true as const, data: undefined };
  }
  return {
    success: false as const,
    error: result.serverError ?? "Erreur lors de la modification",
  };
}

export async function deleteMarker(markerId: string) {
  const result = await deleteMarkerAction({ markerId });
  if (result.data) {
    return { success: true as const, data: undefined };
  }
  return {
    success: false as const,
    error: result.serverError ?? "Erreur lors de la suppression",
  };
}
