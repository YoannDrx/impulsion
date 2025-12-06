/**
 * Templates Feature Types
 *
 * Types for session template management
 */

import type { TemplateCategory, SessionType } from "@/lib/impulsion/types";

/**
 * Session template data
 */
export type SessionTemplate = {
  id: string;
  organizationId: string;
  createdById: string;
  title: string;
  description: string | null;
  type: SessionType;
  durationMinutes: number;
  targetRpe: number | null;
  category: TemplateCategory;
  tags: string[];
  createdAt: Date;
  updatedAt: Date;
};

/**
 * Template with creator info
 */
export type TemplateWithCreator = SessionTemplate & {
  creatorName: string;
  creatorImage: string | null;
};

/**
 * Input for creating a template
 */
export type CreateTemplateInput = {
  title: string;
  description?: string;
  type: SessionType;
  durationMinutes: number;
  targetRpe?: number;
  category: TemplateCategory;
  tags?: string[];
};

/**
 * Input for updating a template
 */
export type UpdateTemplateInput = Partial<CreateTemplateInput>;

/**
 * Templates overview for the list view
 */
export type TemplatesOverview = {
  templates: TemplateWithCreator[];
  totalCount: number;
  categoryStats: {
    category: TemplateCategory;
    count: number;
  }[];
};
