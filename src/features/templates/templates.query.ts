import { prisma } from "@/lib/prisma";
import type { TemplateWithCreator, TemplatesOverview } from "./templates.types";
import type { TemplateCategory, SessionType } from "@/lib/impulsion/types";

/**
 * Get all templates for an organization
 */
export async function getOrgTemplates(
  orgId: string,
  options?: {
    category?: TemplateCategory;
    limit?: number;
  },
): Promise<TemplateWithCreator[]> {
  const { category, limit = 50 } = options ?? {};

  const templates = await prisma.$queryRaw<
    {
      id: string;
      organizationId: string;
      createdById: string;
      title: string;
      description: string | null;
      type: string;
      durationMinutes: number;
      targetRpe: number | null;
      category: string;
      tags: string | null;
      createdAt: Date;
      updatedAt: Date;
      creatorName: string;
      creatorImage: string | null;
    }[]
  >`
    SELECT
      st.id,
      st."organizationId",
      st."createdById",
      st.title,
      st.description,
      st.type,
      st."durationMinutes",
      st."targetRpe",
      st.category,
      st.tags::text,
      st."createdAt",
      st."updatedAt",
      u.name as "creatorName",
      u.image as "creatorImage"
    FROM session_template st
    JOIN "user" u ON st."createdById" = u.id
    WHERE st."organizationId" = ${orgId}
      ${category ? prisma.$queryRaw`AND st.category = ${category}` : prisma.$queryRaw``}
    ORDER BY st."createdAt" DESC
    LIMIT ${limit}
  `;

  return templates.map((t) => ({
    ...t,
    type: t.type as SessionType,
    category: t.category as TemplateCategory,
    tags: t.tags ? JSON.parse(t.tags) : [],
  }));
}

/**
 * Get a single template by ID
 */
export async function getTemplateById(
  templateId: string,
  orgId: string,
): Promise<TemplateWithCreator | null> {
  const templates = await prisma.$queryRaw<
    {
      id: string;
      organizationId: string;
      createdById: string;
      title: string;
      description: string | null;
      type: string;
      durationMinutes: number;
      targetRpe: number | null;
      category: string;
      tags: string | null;
      createdAt: Date;
      updatedAt: Date;
      creatorName: string;
      creatorImage: string | null;
    }[]
  >`
    SELECT
      st.id,
      st."organizationId",
      st."createdById",
      st.title,
      st.description,
      st.type,
      st."durationMinutes",
      st."targetRpe",
      st.category,
      st.tags::text,
      st."createdAt",
      st."updatedAt",
      u.name as "creatorName",
      u.image as "creatorImage"
    FROM session_template st
    JOIN "user" u ON st."createdById" = u.id
    WHERE st.id = ${templateId} AND st."organizationId" = ${orgId}
  `;

  if (templates.length === 0) return null;

  const t = templates[0];
  return {
    ...t,
    type: t.type as SessionType,
    category: t.category as TemplateCategory,
    tags: t.tags ? JSON.parse(t.tags) : [],
  };
}

/**
 * Get templates overview with stats
 */
export async function getTemplatesOverview(
  orgId: string,
): Promise<TemplatesOverview> {
  const [templates, categoryStats] = await Promise.all([
    getOrgTemplates(orgId),
    prisma.$queryRaw<
      {
        category: string;
        count: bigint;
      }[]
    >`
      SELECT category, COUNT(*) as count
      FROM session_template
      WHERE "organizationId" = ${orgId}
      GROUP BY category
      ORDER BY count DESC
    `,
  ]);

  return {
    templates,
    totalCount: templates.length,
    categoryStats: categoryStats.map((s) => ({
      category: s.category as TemplateCategory,
      count: Number(s.count),
    })),
  };
}
