export const SiteConfig = {
  title: "Impulsion",
  description: "Plateforme de coaching sportif hybride - Elevate your training",
  prodUrl: "https://impulsion.app",
  appId: "impulsion",
  domain: "impulsion.app",
  appIcon: "/images/icon.png",
  company: {
    name: "Impulsion",
    address: "France",
  },
  brand: {
    /** Electric Lime - Couleur primaire Impulsion */
    primary: "#ccff00",
    /** Neon Cyan - Couleur secondaire */
    secondary: "#00f3ff",
  },
  team: {
    image: "/images/team.jpg",
    website: "https://impulsion.app",
    twitter: "https://twitter.com/impulsion_app",
    name: "Impulsion",
  },
  features: {
    /**
     * Enable image/video upload for athlete videos and session media
     * Uses UploadThing for file handling
     */
    enableImageUpload: true as boolean,
    /**
     * If enable, the user will be redirected to `/orgs` when he visits the landing page at `/`
     * The logic is located in middleware.ts
     */
    enableLandingRedirection: false as boolean,
  },
  /** Limites par plan */
  limits: {
    free: {
      maxAthletes: 5,
      maxVideosPerMonth: 10,
      maxVideoSizeMB: 100,
    },
    pro: {
      maxAthletes: -1, // illimité
      maxVideosPerMonth: -1,
      maxVideoSizeMB: 500,
    },
  },
  /** Sports supportés */
  sports: [
    "athletisme",
    "running",
    "trail",
    "triathlon",
    "natation",
    "cyclisme",
    "fitness",
    "crossfit",
    "autre",
  ] as const,
};
