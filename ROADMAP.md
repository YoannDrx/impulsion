# Roadmap - Impulsion.app

Ce document detaille la roadmap de developpement d'Impulsion, une plateforme de coaching sportif hybride.

## Vue d'Ensemble

```
Phase 0 : Fondations          [Termine]
Phase 1 : MVP Core            [Termine]
Phase 2 : Module Video        [A venir]
Phase 3 : Integrations        [A venir]
Phase 4 : Business Layer      [A venir]
Phase 5 : Scale               [Futur]
```

---

## Phase 0 : Fondations (2 semaines)

**Objectif** : Mettre en place les bases techniques et le design system.

### Sprint 0.1 : Design System

- [x] Creer la structure des tokens CSS
  - [x] `src/styles/tokens/colors.css` - Palette Impulsion
  - [x] `src/styles/tokens/typography.css` - Systeme typographique
  - [x] `src/styles/tokens/spacing.css` - Espacements et layout
  - [x] `src/styles/tokens/effects.css` - Ombres, glows, gradients
  - [x] `src/styles/tokens/animations.css` - Keyframes et transitions
- [x] Creer les themes
  - [x] `src/styles/themes/dark.css` - Theme dark (defaut)
  - [x] `src/styles/themes/light.css` - Theme light
- [x] Integrer dans `app/globals.css`

### Sprint 0.2 : Documentation

- [x] Refonte complete de `CLAUDE.md`
- [x] Mise a jour de `README.md`
- [x] Creation de `ROADMAP.md`
- [x] Modifier `src/site-config.ts` pour Impulsion

### Sprint 0.3 : Composants de Base

- [x] Creer `src/components/impulsion/glow-card.tsx`
- [x] Creer `src/components/impulsion/cyber-button.tsx`
- [x] Creer `src/components/impulsion/neon-badge.tsx`
- [x] Creer `src/components/impulsion/stat-card.tsx`

### Sprint 0.4 : Systeme d'Animations

- [x] Creer les variants d'animation (`src/lib/animations/variants/`)
  - [x] fade.ts, slide.ts, scale.ts, stagger.ts
- [x] Creer les presets Impulsion (`src/lib/animations/presets/`)
  - [x] impulsion.ts (glowIn, energyBounce, neonPulse, etc.)
  - [x] page-transition.ts
- [x] Creer les hooks d'animation (`src/lib/animations/hooks/`)
  - [x] useInViewAnimation, useScrollAnimation, useParallax
- [x] Creer les composants wrapper (`src/lib/animations/components/`)
  - [x] ScrollReveal, AnimatedList, AnimatedGrid
- [x] Creer les animations de gamification (`src/features/gamification/`)
  - [x] badge-unlock.ts, streak.ts, confetti.ts

### Sprint 0.5 : Composants Three.js

- [x] Installer les dependances (three, @react-three/fiber, drei)
- [x] Creer les canvas wrappers (`src/components/three/canvas/`)
- [x] Creer les backgrounds (`src/components/three/backgrounds/`)
  - [x] ParticleField, WaveParticleField, FloatingParticles
- [x] Creer les effets (`src/components/three/effects/`)
  - [x] BadgeShowcase, BadgeGrid, ProgressBadge
- [x] Creer les materiaux partages (`src/components/three/utils/`)

---

## Phase 1 : MVP Core (4 semaines)

**Objectif** : Permettre a un coach de gerer un groupe d'athletes et leurs seances.

### Sprint 1.1 : Auth & Onboarding

- [x] Adapter l'onboarding pour coach/athlete
  - [x] `src/features/onboarding/onboarding-wizard.tsx`
  - [x] `src/features/onboarding/role-selection.tsx`
- [x] Creer les roles (COACH, ATHLETE, ASSISTANT)
  - [x] `src/lib/impulsion/types.ts` (IMPULSION_ROLES)
- [x] Page de profil avec specialite sportive
  - [x] `src/features/onboarding/coach-profile-form.tsx`
  - [x] `src/features/onboarding/athlete-profile-form.tsx`

### Sprint 1.2 : Gestion d'Equipe

- [x] CRUD Team (creer, modifier, supprimer)
  - [x] `src/features/team-dashboard/coach-dashboard.tsx`
- [x] Systeme d'invitation par lien magique
  - [x] `src/features/team-dashboard/invite-athlete-dialog.tsx`
- [x] Liste des athletes pour le coach
  - [x] `src/features/team-dashboard/athletes-list.tsx`
  - [x] `src/features/team-dashboard/team-stats-cards.tsx`
- [x] Vue athlete : mon equipe, mes seances
  - [x] `src/features/athlete-dashboard/athlete-dashboard.tsx`
  - [x] `src/features/athlete-dashboard/athlete-stats-cards.tsx`
  - [x] `src/features/athlete-dashboard/upcoming-sessions.tsx`
  - [x] `src/features/athlete-dashboard/my-team-info.tsx`

### Sprint 1.3 : Calendrier & Seances

- [x] Vue calendrier mensuelle
  - [x] `src/features/calendar/calendar-view.tsx`
  - [x] `src/features/calendar/calendar-day-cell.tsx`
  - [x] `src/features/calendar/calendar-header.tsx`
- [x] Creation de seance (titre, description, date, type)
  - [x] `src/features/sessions/create-session-form.tsx`
- [x] Types de seance : COURSE, PPG, TECHNIQUE, FORCE, AUTRE
  - [x] `src/lib/impulsion/types.ts`
- [x] Assignation a un ou plusieurs athletes
- [x] Statuts : PLANIFIEE, FAITE, PARTIELLE, MANQUEE

### Sprint 1.4 : Feedback Athlete

- [x] Marquer une seance comme faite
  - [x] `src/features/feedback/feedback.action.ts`
- [x] Saisie RPE (1-10)
  - [x] `src/features/feedback/feedback-form.tsx`
- [x] Saisie sensations et humeur
  - [x] `src/features/feedback/feedback-form.tsx`
- [x] Signalement douleur (localisation + intensite)
  - [x] `src/features/pain-report/pain-report-form.tsx`
  - [x] `src/features/pain-report/pain-report.action.ts`
- [x] Page detail seance avec commentaires coach/athlete
  - [x] `src/features/session-detail/session-detail.tsx`
  - [x] `src/query/sessions/get-session-detail.query.ts`

---

## Phase 2 : Module Video (4 semaines)

**Objectif** : Implementer la killer feature - analyse video avec timestamps.

### Sprint 2.1 : Upload Video

- [x] Upload video via Vercel Blob
  - [x] `src/features/video/video-upload.tsx`
  - [x] `src/features/video/video.action.ts`
- [ ] Compression cote client (mobile-friendly)
- [x] Generation de thumbnail
  - [x] `src/features/video/video-thumbnail.ts`
  - [x] Capture automatique d'un frame a la selection
  - [x] Preview dans le composant d'upload
- [x] Stockage des metadonnees (duree, resolution)
  - [x] `src/features/video/video.query.ts`

### Sprint 2.2 : Player Video

- [x] Player video custom (React)
  - [x] `src/features/video/video-player.tsx`
- [x] Timeline interactive cliquable
- [x] Controles : play/pause, volume, vitesse
- [x] Mode plein ecran

### Sprint 2.3 : Systeme de Markers

- [x] Creation de markers sur la timeline
  - [x] `src/features/video/video-markers-panel.tsx`
- [x] Commentaires attaches aux markers
- [x] Fil de discussion par marker (replies)
- [ ] Notifications de nouveaux commentaires

### Sprint 2.4 : Dossier Video

- [x] Vue liste des videos
  - [x] `src/features/video/video-card.tsx`
  - [x] `app/[locale]/orgs/[orgSlug]/(navigation)/videos/page.tsx`
- [x] Vue detail video avec player et markers
  - [x] `app/[locale]/orgs/[orgSlug]/(navigation)/videos/[videoId]/page.tsx`
- [x] Filtres : par seance, par date
  - [x] `src/features/video/video-filters.tsx`
  - [x] `src/features/video/video-list-with-filters.tsx`
- [x] Recherche dans les commentaires
  - [x] Champ de recherche dans `video-markers-panel.tsx`

---

## Phase 3 : Integrations & Intelligence (4 semaines)

**Objectif** : Connecter Strava et ajouter le suivi de charge.

### Sprint 3.1 : Synchronisation Strava

- [ ] OAuth Strava
- [ ] Import automatique des activites
- [ ] Matching seance prevue / activite realisee
- [ ] Import : distance, duree, FC moyenne, allure

### Sprint 3.2 : Gestion de la Charge

- [x] Calcul charge = RPE x duree
  - [x] `src/features/workload/workload.query.ts`
- [x] Ratio charge aigue / chronique (ACWR)
  - [x] Calcul EWMA sur 7j (aigu) et 28j (chronique)
  - [x] `src/features/workload/workload.types.ts`
- [x] Indicateur visuel de risque (vert/orange/rouge)
  - [x] Gauge ACWR avec couleurs dynamiques
  - [x] `src/features/workload/acwr-gauge.tsx`
- [x] Alertes coach si surcharge detectee
  - [x] Dashboard equipe avec athletes a risque
  - [x] `src/features/workload/team-workload-dashboard.tsx`
  - [x] Indicateurs douleur recente
- [x] Page dashboard charge
  - [x] `app/[locale]/orgs/[orgSlug]/(navigation)/workload/page.tsx`

### Sprint 3.3 : Module Blessures

- [x] Journal de blessure structure
  - [x] `src/features/injuries/injuries.types.ts`
  - [x] `src/features/injuries/injuries.query.ts`
- [x] Historique par athlete
  - [x] `src/features/injuries/injuries-dashboard.tsx`
- [x] Alertes coach si douleur > 6/10
  - [x] Section alertes critiques avec seuil configurable
  - [x] Indicateurs visuels de severite (mineur/modere/severe/critique)
- [x] Statistiques sur les blessures recurrentes
  - [x] Stats par zone corporelle
  - [x] Moyenne d'intensite par zone
  - [x] Suivi par athlete avec historique

### Sprint 3.4 : Bibliotheque de Templates

- [x] Creation de templates de seance
  - [x] `src/features/templates/templates.types.ts`
  - [x] `src/features/templates/templates.query.ts`
  - [x] `src/features/templates/templates.action.ts` (CRUD + duplicate)
  - [x] `src/features/templates/template-form.tsx`
- [x] Categories : Course, PPG, Pliometrie, Technique
  - [x] `src/features/templates/template-card.tsx` avec couleurs par categorie
- [x] Tags et filtres
  - [x] `src/features/templates/templates-list.tsx` avec recherche et filtres
- [ ] Drag & drop template vers calendrier (Phase future)

---

## Phase 4 : Business Layer (4 semaines)

**Objectif** : Monetisation et gamification.

### Sprint 4.1 : Plans & Abonnements

- [ ] Plan gratuit : 1 coach, 5 athletes max
- [ ] Plan Pro : athletes illimites, analytics avances
- [ ] Integration Stripe Checkout
- [ ] Gestion des abonnements

### Sprint 4.2 : Gamification

- [ ] Systeme de badges (regularite, pas de perf)
- [ ] Streaks (semaines consecutives actives)
- [ ] XP et niveaux
- [ ] Animations de deblocage

### Sprint 4.3 : Notifications Avancees

- [ ] Email recap hebdo pour le coach
- [ ] Push notifications (rappel seance)
- [ ] In-app notifications
- [ ] Preferences granulaires

### Sprint 4.4 : Referral

- [ ] Codes de parrainage
- [ ] Coach invite coach = 1 mois Pro offert
- [ ] Athlete invite athlete = badge + trial etendu

---

## Phase 5 : Scale (Futur)

**Objectif** : Features avancees et expansion.

### Internationalisation

- [x] Setup next-intl
- [x] Traductions FR (defaut) et EN
- [x] Detection automatique de la langue
- [x] Structure app/[locale]/ avec middleware

### Three.js & Animations 3D

- [x] Setup React Three Fiber
- [x] Particle field sur landing
- [x] Badge showcase 3D
- [ ] Visualisations de donnees 3D

### Features Avancees

- [ ] Comparaison video side-by-side
- [ ] Outils de dessin sur video
- [ ] Export vers montres (Garmin, Coros)
- [ ] Generateur de plans IA
- [ ] Marketplace de programmes

---

## Metriques de Succes

### MVP (Phase 1-2)

- 10 coachs beta testeurs actifs
- 50+ athletes utilisant l'app
- NPS > 50
- Taux de retention semaine 4 > 60%

### Post-MVP (Phase 3-4)

- 100 coachs payants
- 1000+ athletes
- MRR > 5000 EUR
- Churn < 5%

---

## Risques Identifies

| Risque | Impact | Mitigation |
|--------|--------|------------|
| Player video complexe | Eleve | Commencer simple, iterer |
| Sync Strava (rate limits) | Moyen | Cache agressif, webhooks |
| Adoption coachs | Eleve | Beta test early, feedback continu |
| Performance calendrier | Moyen | Virtualisation si necessaire |
| Cout stockage video | Moyen | Compression, limites de duree |

---

## Changelog

- **2025-12-06** : Phase 3 Sprint 3.4 Bibliotheque de Templates termine
  - CRUD complet pour les templates de seance
  - Formulaire de creation/edition avec preview
  - Systeme de tags personnalisables
  - Filtres par categorie et recherche
  - Duplication de templates
  - Categories avec couleurs : Course, PPG, Pliometrie, Technique, Force
  - Pages /templates, /templates/new, /templates/[id]/edit

- **2025-12-06** : Phase 3 Sprint 3.3 Module Blessures termine
  - Journal de blessure structure (types et queries)
  - Dashboard injuries avec vue d'ensemble equipe
  - Alertes critiques si douleur >= 6/10 (seuil configurable)
  - Statistiques par zone corporelle (count, moyenne intensite)
  - Suivi par athlete avec historique et bouton resoudre
  - Indicateurs de severite visuels (mineur/modere/severe/critique)
  - Navigation et page /injuries

- **2025-12-06** : Phase 3 Sprint 3.2 Gestion de la Charge termine
  - Calcul de charge d'entrainement (RPE x duree)
  - Ratio ACWR (charge aigue 7j / chronique 28j)
  - Dashboard equipe avec indicateurs visuels de risque
  - Gauge ACWR animee avec zones colorees
  - Graphique de charge hebdomadaire
  - Alertes athletes a risque et douleurs recentes
  - Navigation et page /workload

- **2025-12-06** : Phase 2 Module Video avancee (~95%)
  - Generation automatique de thumbnails (capture frame video)
  - Filtres videos par seance et par date
  - Recherche dans les commentaires
  - Composant VideoListWithFilters avec filtrage client-side
  - Reste : compression cote client, notifications commentaires

- **2025-12-06** : Phase 1 MVP Core terminee
  - Vue athlete dashboard complete (stats, seances a venir, equipe)
  - Module signalement douleur (formulaire avec localisation, cote, intensite)
  - Page detail seance avec affichage des feedbacks
  - Vue calendrier mensuel avec navigation
  - Migration Prisma pour toutes les tables Impulsion

- **2025-12-06** : Internationalisation ajoutee
  - Setup next-intl avec routing FR (defaut) / EN
  - Middleware de detection automatique de locale
  - Restructuration app/[locale]/ complete
  - Fichiers de traduction (common, landing, dashboard, athlete, auth, validation)

- **2025-12-05** : Phase 0 terminee
  - Design system complet (tokens CSS, themes dark/light)
  - Documentation mise a jour (CLAUDE.md, README.md, ROADMAP.md)
  - Configuration Impulsion (site-config.ts)
  - Composants Impulsion (glow-card, cyber-button, neon-badge, stat-card)
  - Systeme d'animations Motion complet (variants, presets, hooks, composants)
  - Animations de gamification (badge-unlock, streak, confetti)
  - Composants Three.js (particle field, badge showcase, materiaux)

---

*Derniere mise a jour : 6 decembre 2025*
