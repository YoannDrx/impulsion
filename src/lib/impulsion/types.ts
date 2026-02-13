/**
 * Impulsion Types & Enums
 *
 * Types TypeScript pour les modèles de coaching sportif.
 * Ces types correspondent au schéma Prisma impulsion.prisma.
 */

// ============================================================================
// SESSION TYPES
// ============================================================================

/**
 * Types de séance d'entraînement
 */
export const SESSION_TYPES = {
  COURSE: "COURSE",
  PPG: "PPG", // Préparation Physique Générale
  TECHNIQUE: "TECHNIQUE",
  FORCE: "FORCE",
  RECUPERATION: "RECUPERATION",
  AUTRE: "AUTRE",
} as const;

export type SessionType = (typeof SESSION_TYPES)[keyof typeof SESSION_TYPES];

export const SESSION_TYPE_LABELS: Record<SessionType, string> = {
  COURSE: "Course",
  PPG: "PPG",
  TECHNIQUE: "Technique",
  FORCE: "Force",
  RECUPERATION: "Récupération",
  AUTRE: "Autre",
};

/**
 * Statuts de séance
 */
export const SESSION_STATUSES = {
  PLANIFIEE: "PLANIFIEE",
  FAITE: "FAITE",
  PARTIELLE: "PARTIELLE",
  MANQUEE: "MANQUEE",
} as const;

export type SessionStatus =
  (typeof SESSION_STATUSES)[keyof typeof SESSION_STATUSES];

export const SESSION_STATUS_LABELS: Record<SessionStatus, string> = {
  PLANIFIEE: "Planifiée",
  FAITE: "Faite",
  PARTIELLE: "Partielle",
  MANQUEE: "Manquée",
};

// ============================================================================
// FEEDBACK TYPES
// ============================================================================

/**
 * Sensations après l'entraînement
 */
export const SENSATIONS = {
  SUPER: "SUPER",
  BIEN: "BIEN",
  CORRECT: "CORRECT",
  FATIGUE: "FATIGUE",
  MAUVAIS: "MAUVAIS",
} as const;

export type Sensation = (typeof SENSATIONS)[keyof typeof SENSATIONS];

export const SENSATION_LABELS: Record<Sensation, string> = {
  SUPER: "Super",
  BIEN: "Bien",
  CORRECT: "Correct",
  FATIGUE: "Fatigué",
  MAUVAIS: "Pas bien",
};

/**
 * Humeur
 */
export const MOODS = {
  MOTIVE: "MOTIVE",
  NEUTRE: "NEUTRE",
  STRESSE: "STRESSE",
  FATIGUE: "FATIGUE",
} as const;

export type Mood = (typeof MOODS)[keyof typeof MOODS];

export const MOOD_LABELS: Record<Mood, string> = {
  MOTIVE: "Motivé",
  NEUTRE: "Neutre",
  STRESSE: "Stressé",
  FATIGUE: "Fatigué",
};

/**
 * Échelle RPE (Rate of Perceived Exertion)
 */
export const RPE_SCALE = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] as const;

export type RPEValue = (typeof RPE_SCALE)[number];

export const RPE_LABELS: Record<RPEValue, string> = {
  1: "Très léger",
  2: "Léger",
  3: "Modéré",
  4: "Assez dur",
  5: "Dur",
  6: "Plus dur",
  7: "Très dur",
  8: "Extrêmement dur",
  9: "Presque maximal",
  10: "Maximal",
};

// ============================================================================
// PAIN/INJURY TYPES
// ============================================================================

/**
 * Localisations de douleur
 */
export const PAIN_LOCATIONS = {
  HEAD: "HEAD",
  NECK: "NECK",
  SHOULDER: "SHOULDER",
  ARM: "ARM",
  ELBOW: "ELBOW",
  WRIST: "WRIST",
  HAND: "HAND",
  BACK: "BACK",
  HIP: "HIP",
  THIGH: "THIGH",
  KNEE: "KNEE",
  CALF: "CALF",
  ANKLE: "ANKLE",
  FOOT: "FOOT",
} as const;

export type PainLocation = (typeof PAIN_LOCATIONS)[keyof typeof PAIN_LOCATIONS];

export const PAIN_LOCATION_LABELS: Record<PainLocation, string> = {
  HEAD: "Tête",
  NECK: "Cou",
  SHOULDER: "Épaule",
  ARM: "Bras",
  ELBOW: "Coude",
  WRIST: "Poignet",
  HAND: "Main",
  BACK: "Dos",
  HIP: "Hanche",
  THIGH: "Cuisse",
  KNEE: "Genou",
  CALF: "Mollet",
  ANKLE: "Cheville",
  FOOT: "Pied",
};

/**
 * Côté de la douleur
 */
export const PAIN_SIDES = {
  LEFT: "LEFT",
  RIGHT: "RIGHT",
  BOTH: "BOTH",
  CENTER: "CENTER",
} as const;

export type PainSide = (typeof PAIN_SIDES)[keyof typeof PAIN_SIDES];

export const PAIN_SIDE_LABELS: Record<PainSide, string> = {
  LEFT: "Gauche",
  RIGHT: "Droit",
  BOTH: "Les deux",
  CENTER: "Centre",
};

// ============================================================================
// VIDEO TYPES
// ============================================================================

/**
 * Statuts de traitement vidéo
 */
export const VIDEO_STATUSES = {
  UPLOADING: "UPLOADING",
  PROCESSING: "PROCESSING",
  READY: "READY",
  ERROR: "ERROR",
} as const;

export type VideoStatus = (typeof VIDEO_STATUSES)[keyof typeof VIDEO_STATUSES];

// ============================================================================
// GAMIFICATION TYPES
// ============================================================================

/**
 * Catégories de badges
 */
export const BADGE_CATEGORIES = {
  REGULARITE: "REGULARITE",
  JALON: "JALON",
  SPECIAL: "SPECIAL",
} as const;

export type BadgeCategory =
  (typeof BADGE_CATEGORIES)[keyof typeof BADGE_CATEGORIES];

export const BADGE_CATEGORY_LABELS: Record<BadgeCategory, string> = {
  REGULARITE: "Régularité",
  JALON: "Jalons",
  SPECIAL: "Spéciaux",
};

/**
 * Raretés de badges
 */
export const BADGE_RARITIES = {
  COMMUN: "COMMUN",
  RARE: "RARE",
  EPIQUE: "EPIQUE",
  LEGENDAIRE: "LEGENDAIRE",
} as const;

export type BadgeRarity = (typeof BADGE_RARITIES)[keyof typeof BADGE_RARITIES];

export const BADGE_RARITY_LABELS: Record<BadgeRarity, string> = {
  COMMUN: "Commun",
  RARE: "Rare",
  EPIQUE: "Épique",
  LEGENDAIRE: "Légendaire",
};

// ============================================================================
// NOTIFICATION TYPES
// ============================================================================

/**
 * Types de notifications
 */
export const NOTIFICATION_TYPES = {
  SESSION_REMINDER: "SESSION_REMINDER",
  FEEDBACK_REQUEST: "FEEDBACK_REQUEST",
  VIDEO_COMMENT: "VIDEO_COMMENT",
  BADGE_UNLOCK: "BADGE_UNLOCK",
  PAIN_ALERT: "PAIN_ALERT",
  LOAD_WARNING: "LOAD_WARNING",
  STREAK_REMINDER: "STREAK_REMINDER",
  TEAM_INVITATION: "TEAM_INVITATION",
} as const;

export type NotificationType =
  (typeof NOTIFICATION_TYPES)[keyof typeof NOTIFICATION_TYPES];

// ============================================================================
// ROLE MAPPING
// ============================================================================

/**
 * Mapping des rôles Better Auth vers les rôles Impulsion
 *
 * owner = Coach (créateur de l'équipe)
 * admin = Assistant (aide le coach)
 * member = Athlète
 */
export const IMPULSION_ROLES = {
  COACH: "owner",
  ASSISTANT: "admin",
  ATHLETE: "member",
} as const;

export type ImpulsionRole =
  (typeof IMPULSION_ROLES)[keyof typeof IMPULSION_ROLES];

export const ROLE_LABELS: Record<ImpulsionRole, string> = {
  owner: "Coach",
  admin: "Assistant",
  member: "Athlète",
};

// ============================================================================
// TEMPLATE CATEGORIES
// ============================================================================

/**
 * Catégories de templates de séance
 */
export const TEMPLATE_CATEGORIES = {
  COURSE: "COURSE",
  PPG: "PPG",
  PLIOMETRIE: "PLIOMETRIE",
  TECHNIQUE: "TECHNIQUE",
  FORCE: "FORCE",
  AUTRE: "AUTRE",
} as const;

export type TemplateCategory =
  (typeof TEMPLATE_CATEGORIES)[keyof typeof TEMPLATE_CATEGORIES];

export const TEMPLATE_CATEGORY_LABELS: Record<TemplateCategory, string> = {
  COURSE: "Course",
  PPG: "PPG",
  PLIOMETRIE: "Pliométrie",
  TECHNIQUE: "Technique",
  FORCE: "Force",
  AUTRE: "Autre",
};

// ============================================================================
// SPORTS (from SiteConfig)
// ============================================================================

export const SPORTS = [
  "athletisme",
  "running",
  "trail",
  "triathlon",
  "natation",
  "cyclisme",
  "fitness",
  "crossfit",
  "autre",
] as const;

export type Sport = (typeof SPORTS)[number];

export const SPORT_LABELS: Record<Sport, string> = {
  athletisme: "Athlétisme",
  running: "Running",
  trail: "Trail",
  triathlon: "Triathlon",
  natation: "Natation",
  cyclisme: "Cyclisme",
  fitness: "Fitness",
  crossfit: "CrossFit",
  autre: "Autre",
};

// ============================================================================
// DAYS OF WEEK
// ============================================================================

export const DAYS_OF_WEEK = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export type DayOfWeek = (typeof DAYS_OF_WEEK)[number];

export const DAY_LABELS: Record<DayOfWeek, string> = {
  monday: "Lundi",
  tuesday: "Mardi",
  wednesday: "Mercredi",
  thursday: "Jeudi",
  friday: "Vendredi",
  saturday: "Samedi",
  sunday: "Dimanche",
};
