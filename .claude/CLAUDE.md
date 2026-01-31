# CLAUDE.md

---

## ⚡ AUTO-START grepai (à faire automatiquement)

**Dès que tu commences à travailler sur ce projet, lance cette commande en background :**

```bash
~/.local/bin/grepai watch &
```

> Lance cette commande UNE SEULE FOIS au début de la session. Ne la relance pas à chaque question.

---

Ce fichier fournit des instructions aux agents IA pour le projet Impulsion.

---

## grepai - Recherche sémantique de code (100% local et gratuit)

**grepai est l'outil principal pour explorer ce codebase.** Il utilise des embeddings locaux (Ollama) pour la recherche sémantique.


### Lancer le watch (à faire à chaque ouverture du projet)

```bash
cd ~/Projets/impulsion
~/.local/bin/grepai watch
```

> Garde ce terminal ouvert : il surveille les modifications en temps réel.

### Commande de recherche

```bash
~/.local/bin/grepai search "ta question en langage naturel"<nombre>
```

### Paramètres

| Paramètre             | Description                                 |
| --------------------- | ------------------------------------------- |

### Ajuster `-m` selon la complexité

| Type de requête                         | `-m` recommandé |
| --------------------------------------- | --------------- |
| Question simple (1-2 fichiers)          | 10              |
| Question moyenne (flow, feature)        | 20-30           |
| Question complexe (debug, architecture) | 30-50           |

### Stratégie pour requêtes complexes

Lance plusieurs grepai en parallèle plutôt qu'une seule requête surchargée :

```bash
~/.local/bin/grepai search "comment fonctionne le calendrier d'entrainements"
~/.local/bin/grepai search "comment sont gérées les vidéos avec annotations"
~/.local/bin/grepai search "comment fonctionne la synchronisation Strava"
```

### Règles

- **OBLIGATOIRE** : Utilise grepai pour TOUTE recherche de code. N'utilise JAMAIS grep, Grep tool, ou Glob.
- **Langage naturel** : Parle à grepai comme à un collègue
  - ❌ `"calendar training video strava"` (mots-clés)
  - ✅ `"Comment fonctionne le calendrier d'entrainements et l'affichage des sessions ?"` (question naturelle)

---

## Subagents (Task tool)

**Les subagents n'héritent PAS des instructions de ce fichier.**

Quand tu lances un subagent, copie-colle cette section grepai dans le prompt du subagent.

---

## A propos du projet Impulsion

**Impulsion** est une plateforme SaaS de coaching sportif hybride ("Hybrid Coaching OS") qui combine :

- **Data** : Suivi des entrainements, stats, charge, synchronisation Strava
- **Video** : Analyse technique avec commentaires timestamps
- **Business** : Facturation, abonnements, marketplace pour coachs

### Vision et Positionnement

Le probleme : Les outils actuels sont soit trop austeres (Nolio, TrainingPeaks), trop automatises (Runna, Garmin Coach), ou trop sociaux (Strava).

La solution : **Augmenter le coach humain** plutot que de le remplacer.

**Cible principale** : Coachs d'athletisme (saut, sprint, demi-fond), coachs running independants, preparateurs physiques.

**Differenciateur** : La simplicite du feedback video technique - un coach peut envoyer un retour video annote en 2 minutes.

### Design System "Cyber-Athletisme"

L'identite visuelle d'Impulsion est moderne, energique et sportive :

- **Theme par defaut** : Dark mode
- **Couleur primaire** : Electric Lime (#ccff00) - oklch(0.91 0.23 120)
- **Couleur secondaire** : Neon Cyan (#00f3ff) - oklch(0.85 0.16 195)
- **Effets** : Glows neon, glassmorphism, animations fluides

## Commandes de Developpement

### Commandes Principales

- `pnpm dev` - Demarrer le serveur de developpement avec Turbopack
- `pnpm build` - Construire l'application
- `pnpm start` - Demarrer le serveur de production
- `pnpm ts` - Verifier les types TypeScript
- `pnpm lint` - Lancer ESLint avec auto-fix
- `pnpm lint:ci` - Lancer ESLint sans auto-fix pour CI
- `pnpm clean` - Lancer lint, type check et formatter le code
- `pnpm format` - Formatter le code avec Prettier

### Commandes de Test

**CRITIQUE - Toujours utiliser les commandes CI (mode non-interactif) :**

- **TOUJOURS utiliser `pnpm test:ci`** - Tests unitaires en mode CI (dans `__tests__/`)
- **TOUJOURS utiliser `pnpm test:e2e:ci`** - Tests e2e en mode CI headless (dans `e2e/`)

**NE JAMAIS utiliser ces commandes interactives :**

- **JAMAIS** `pnpm test` - Mode interactif (incompatible avec Claude Code)
- **JAMAIS** `pnpm test:e2e` - Mode interactif (incompatible avec Claude Code)

### Commandes Base de Donnees

- `pnpm prisma:seed` - Peupler la base de donnees
- `pnpm prisma:migrate` - Creer une migration
- `pnpm better-auth:migrate` - Generer le schema Prisma de Better Auth

### Outils de Developpement

- `pnpm email` - Serveur de developpement email
- `pnpm stripe-webhooks` - Ecouter les webhooks Stripe
- `pnpm knip` - Detection du code inutilise

## Architecture Technique

### Stack Technologique

- **Framework** : Next.js 16 avec App Router
- **Langage** : TypeScript (mode strict)
- **Styling** : TailwindCSS v4 avec composants Shadcn/UI
- **Base de donnees** : PostgreSQL avec Prisma ORM
- **Cache** : Redis (ioredis)
- **Authentification** : Better Auth avec support multi-tenant
- **Email** : React Email avec Resend
- **Paiements** : Integration Stripe
- **Tests** : Vitest pour les tests unitaires, Playwright pour e2e
- **Animations** : Motion (Framer Motion 12)
- **Package Manager** : pnpm

### Structure du Projet

```
app/                    # Pages et layouts Next.js App Router
src/
  components/
    ui/                 # Composants Shadcn/UI
    nowts/              # Composants custom NOW.TS
    impulsion/          # Composants specifiques Impulsion
    three/              # Composants Three.js (3D)
  features/             # Logique et composants par feature
    landing/            # Landing page
    auth/               # Authentification
    calendar/           # Calendrier entrainements
    video/              # Module video
    gamification/       # Badges, streaks, etc.
  lib/                  # Utilitaires et services
    animations/         # Presets et hooks d'animation
  hooks/                # Hooks React custom
  styles/               # Design system
    tokens/             # Couleurs, typo, spacing, effets
    themes/             # Themes dark et light
  i18n/                 # Configuration i18n (a venir)
  locales/              # Fichiers de traduction (a venir)
emails/                 # Templates email React Email
prisma/                 # Schema et migrations DB
e2e/                    # Tests end-to-end
__tests__/              # Tests unitaires
```

### Design System

Le design system est organise en tokens CSS :

```
src/styles/
  tokens/
    colors.css         # Palette Impulsion (lime, cyan, dark, semantic)
    typography.css     # Polices, tailles, poids
    spacing.css        # Espacements, radius, containers
    effects.css        # Ombres, glows, gradients
    animations.css     # Keyframes et presets d'animation
  themes/
    dark.css           # Theme dark (defaut)
    light.css          # Theme light
  index.css            # Point d'entree
```

**Classes utilitaires disponibles :**

- `.glow-lime`, `.glow-cyan` - Effets de glow neon
- `.glass` - Glassmorphism
- `.text-gradient-lime`, `.text-gradient-cyan` - Texte en degrade
- `.bg-mesh` - Background mesh gradient
- `.font-stat`, `.font-chrono` - Affichage de donnees numeriques
- `.animate-pulse-glow` - Animation de pulsation lumineuse

## Conventions de Code

### TypeScript

- Utiliser `type` plutot que `interface` (enforce par ESLint)
- Preferer les composants fonctionnels avec types TypeScript
- Pas d'enums - utiliser des maps a la place
- Configuration TypeScript stricte

### React/Next.js

- Preferer les React Server Components
- Utiliser `"use client"` uniquement pour l'acces aux Web APIs dans de petits composants
- Wrapper les composants client dans `Suspense` avec fallback
- Utiliser le chargement dynamique pour les composants non-critiques
- **TOUJOURS utiliser le type global `PageProps<"/route/path">` pour les pages**
  - Exemple : `export default async function MyPage(props: PageProps<"/admin/users">) {}`

### Styling

- Approche mobile-first avec TailwindCSS
- Utiliser les composants Shadcn/UI de `src/components/ui/`
- Composants custom dans `src/components/impulsion/` pour les elements specifiques
- **Ne jamais utiliser d'emojis** (preferer les icones Lucide)
- **Ne jamais utiliser de gradients** sauf si explicitement demande

### Preferences de Style

- Utiliser les composants de typographie partages dans `@/components/ui/typography.tsx`
- Pour l'espacement, preferer `flex flex-col gap-4` plutot que `space-y-4`
- Preferer le composant Card pour les conteneurs styles

### Gestion d'Etat

- Utiliser `nuqs` pour l'etat des parametres URL
- Zustand pour l'etat global (voir dialog-store.ts)
- TanStack Query pour l'etat serveur

### Formulaires et Server Actions

- Utiliser React Hook Form avec validation Zod
- Server actions dans les fichiers `.action.ts`
- Utiliser le helper `resolveActionResult` pour les mutations
- Suivre le pattern de creation de formulaire dans `/src/features/form/`

### Authentification

- Utiliser `getUser()` pour un utilisateur optionnel (cote serveur)
- Utiliser `getRequiredUser()` pour un utilisateur requis (cote serveur)
- Utiliser `useSession()` depuis auth-client.ts (cote client)
- Utiliser `getCurrentOrgCache()` pour obtenir l'organisation courante

### Base de Donnees

- Prisma ORM avec PostgreSQL
- Hooks de base de donnees pour la configuration des utilisateurs
- Patterns d'acces aux donnees bases sur les organisations

### Systeme de Dialogues

- Utiliser `dialogManager` pour les modales globales
- Types : confirm, input, custom dialogs
- Etats de chargement et gestion d'erreur automatiques

### Animations

Pour les animations, utiliser les presets Impulsion :

```typescript
import { impulsionVariants } from '@/lib/animations/presets/impulsion';

// Utilisation avec motion/react
<motion.div
  variants={impulsionVariants.glowIn}
  initial="initial"
  animate="animate"
>
  Contenu anime
</motion.div>
```

Variants disponibles :

- `glowIn` - Apparition avec effet de glow
- `energyBounce` - Rebond energique (badges)
- `neonPulse` - Pulsation neon continue
- `slideUpSpring` - Slide vers le haut avec spring

## Tests

### Tests Unitaires

- Situes dans le repertoire `__tests__/`
- Utiliser Vitest avec React Testing Library
- Mock extended avec `vitest-mock-extended`

### Tests E2E

- Situes dans le repertoire `e2e/`
- Utiliser Playwright avec utilitaires custom
- Fonctions helper dans `e2e/utils/`

## Fichiers Importants

- `src/lib/auth.ts` - Configuration authentification
- `src/features/dialog-manager/` - Systeme de dialogues global
- `src/lib/actions/actions-utils.ts` - Utilitaires server actions
- `src/components/ui/form.tsx` - Composants de formulaire
- `src/site-config.ts` - Configuration du site
- `src/lib/actions/safe-actions.ts` - Toutes les Server Actions DOIVENT utiliser cette logique
- `src/lib/zod-route.ts` - Toutes les routes Next.js DOIVENT utiliser cette logique

### Schemas Base de Donnees

- `prisma/schema/schema.prisma` - Schema principal
- `prisma/schema/better-auth.prisma` - Schema Better Auth (auto-genere)

## Notes de Developpement

- Toujours utiliser `pnpm` pour la gestion des packages
- Utiliser le mode strict TypeScript - pas de types `any`
- Preferer les server components et eviter l'etat client inutile
- Preferer `??` a `||`
- Toutes les routes API DOIVENT utiliser `@/lib/zod-route.ts`
- Toutes les requetes API DOIVENT utiliser `@/lib/up-fetch.ts`, JAMAIS `fetch` directement

## Nommage des Fichiers

- Toutes les server actions doivent etre suffixees par `.action.ts` (ex: `user.action.ts`)

## Debugging et Taches Complexes

- Pour la logique complexe et le debugging, utiliser des logs
- Ajouter beaucoup de logs a chaque etape et DEMANDER a l'utilisateur d'envoyer les logs

## Imports TypeScript

Toujours utiliser les paths TypeScript :

- `@/*` est lie a `@src`
- `@email/*` est lie a `@emails`
- `@app/*` est lie a `@app`

## Workflow de Modification

**REGLE CRITIQUE - TOUJOURS SUIVRE** :

**AVANT d'editer des fichiers, vous DEVEZ lire au moins 3 fichiers** qui vous aideront a comprendre comment faire un code coherent et consistant.

C'est **NON-NEGOCIABLE**. Ne sautez jamais cette etape.

**Types de fichiers a lire :**

1. **Fichiers similaires** : Lire les fichiers avec des fonctionnalites similaires
2. **Dependances importees** : Lire l'implementation des imports que vous n'etes pas sur d'utiliser correctement

## UI / UX

- Ne jamais utiliser d'emojis (preferer les icones Lucide)
- Ne jamais utiliser de gradients sauf si explicitement demande par l'utilisateur
- Suivre l'identite visuelle "Cyber-Athletisme" :
  - Dark mode par defaut
  - Accents Electric Lime pour les actions
  - Accents Neon Cyan pour les donnees/info
  - Animations fluides et micro-interactions

## Internationalisation (a venir)

Le projet supportera le francais (defaut) et l'anglais.
Structure prevue avec `next-intl` :

```
src/
  i18n/
    config.ts           # Configuration
    request.ts          # Helpers server-side
    navigation.ts       # Links localises
  locales/
    fr/                 # Traductions francaises
    en/                 # Traductions anglaises
```

## Three.js (a venir)

Pour les elements 3D, toujours utiliser le lazy loading :

```typescript
import dynamic from 'next/dynamic';

const ParticleField = dynamic(
  () => import('@/components/three/backgrounds/particle-field'),
  { ssr: false, loading: () => <div className="animate-pulse" /> }
);
```
