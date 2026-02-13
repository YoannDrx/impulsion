# Impulsion.app

**Elevate your training.**

Impulsion est une plateforme SaaS de coaching sportif hybride qui combine data, video et business pour les coachs et leurs athletes.

## Vision

Le probleme avec les outils actuels :

- **Nolio, TrainingPeaks** : Trop austeres, tableaux Excel glorifies
- **Runna, Garmin Coach** : Trop automatises, remplacent le coach humain
- **Strava** : Trop social, pas un outil de travail

**Notre solution** : Augmenter le coach humain plutot que de le remplacer.

## Differenciateur

La **simplicite du feedback video technique** : un coach peut envoyer un retour video annote en 2 minutes.

1. Le coach recoit ou filme une video
2. Il pose quelques markers sur la timeline
3. Il ecrit ses commentaires
4. Il envoie

## Cible

- Coachs d'athletisme (saut, sprint, demi-fond)
- Coachs running independants
- Preparateurs physiques

## Stack Technique

- **Framework** : Next.js 16 (App Router, Turbopack)
- **Langage** : TypeScript (strict)
- **Styling** : TailwindCSS v4, Shadcn/UI
- **Base de donnees** : PostgreSQL (Neon) + Prisma ORM
- **Cache** : Redis
- **Auth** : Better Auth (multi-tenant)
- **Email** : React Email + Resend
- **Paiements** : Stripe
- **Animations** : Motion (Framer Motion 12)
- **3D** : Three.js / React Three Fiber (a venir)

## Setup du Projet

### Prerequisites

- Node.js 20+
- pnpm 10+
- PostgreSQL
- Redis

### Installation

```bash
# Cloner le repo
git clone https://github.com/your-username/impulsion.git
cd impulsion

# Installer les dependances
pnpm install

# Copier le fichier d'environnement
cp .env-template .env
```

### Variables d'Environnement

Configurer les variables suivantes dans `.env` :

```bash
# Database
DATABASE_URL="postgresql://USER:@localhost:5432/impulsion"

# Redis (requis pour le cache)
REDIS_URL="redis://localhost:6379"

# Better Auth
BETTER_AUTH_SECRET="votre_secret_genere"
GITHUB_CLIENT_ID="votre_github_id"
GITHUB_CLIENT_SECRET="votre_github_secret"

# Resend (emails)
RESEND_API_KEY="votre_api_key"
EMAIL_FROM="contact@impulsion.app"

# Stripe
STRIPE_SECRET_KEY="sk_test_..."
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="pk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Uploadthing
UPLOADTHING_TOKEN="votre_token"
```

### Demarrer le Developpement

```bash
# Lancer le serveur de dev
pnpm dev

# Dans un autre terminal, pour les webhooks Stripe
pnpm stripe-webhooks
```

L'application sera disponible sur [http://localhost:3000](http://localhost:3000).

## Scripts Disponibles

| Commande              | Description                          |
| --------------------- | ------------------------------------ |
| `pnpm dev`            | Serveur de developpement (Turbopack) |
| `pnpm build`          | Build de production                  |
| `pnpm start`          | Serveur de production                |
| `pnpm ts`             | Verification des types TypeScript    |
| `pnpm lint`           | ESLint avec auto-fix                 |
| `pnpm format`         | Formatter avec Prettier              |
| `pnpm clean`          | Lint + Type check + Format           |
| `pnpm test:ci`        | Tests unitaires (CI)                 |
| `pnpm test:e2e:ci`    | Tests E2E (CI)                       |
| `pnpm email`          | Serveur de dev email                 |
| `pnpm prisma:migrate` | Creer une migration                  |
| `pnpm prisma:seed`    | Peupler la DB                        |

## Structure du Projet

```
impulsion/
├── app/                    # Pages Next.js App Router
├── src/
│   ├── components/
│   │   ├── ui/             # Composants Shadcn/UI
│   │   ├── impulsion/      # Composants specifiques
│   │   └── three/          # Composants 3D
│   ├── features/           # Logique par feature
│   ├── lib/                # Utilitaires
│   ├── styles/             # Design system
│   │   ├── tokens/         # CSS tokens
│   │   └── themes/         # Dark/Light themes
│   └── hooks/              # Hooks custom
├── emails/                 # Templates email
├── prisma/                 # Schema DB
├── e2e/                    # Tests E2E
└── __tests__/              # Tests unitaires
```

## Design System

Impulsion utilise un design system "Cyber-Athletisme" :

- **Theme par defaut** : Dark mode
- **Couleur primaire** : Electric Lime (`#ccff00`)
- **Couleur secondaire** : Neon Cyan (`#00f3ff`)
- **Effets** : Glows neon, glassmorphism, animations fluides

### Classes Utilitaires

```html
<!-- Effets de glow -->
<div class="glow-lime">...</div>
<div class="glow-cyan">...</div>

<!-- Glassmorphism -->
<div class="glass">...</div>

<!-- Texte en degrade -->
<span class="text-gradient text-gradient-lime">...</span>

<!-- Affichage numerique -->
<span class="font-chrono">02:34:56</span>
<span class="font-stat">1,234</span>
```

## Features Principales

### MVP (Phase 1)

- Auth & gestion d'equipe
- Calendrier des seances
- Module video avec commentaires timestamps
- Feedback athlete (RPE, sensations)

### Phase 2

- Synchronisation Strava
- Gestion de la charge
- Bibliotheque de templates

### Phase 3

- Gamification (badges, streaks)
- Paiements (abonnements)
- Internationalisation FR/EN

## Documentation

- [CLAUDE.md](./CLAUDE.md) - Instructions pour les agents IA
- [ROADMAP.md](./ROADMAP.md) - Roadmap detaillee du projet

## Contribution

Les contributions sont bienvenues ! Merci de :

1. Fork le projet
2. Creer une branche (`git checkout -b feature/amazing-feature`)
3. Commit les changements (`git commit -m 'Add amazing feature'`)
4. Push sur la branche (`git push origin feature/amazing-feature`)
5. Ouvrir une Pull Request

## License

Proprietary - All rights reserved.

---

Built with Next.js, TailwindCSS, and Motion.
