import { logger } from "@/lib/logger";
import { faker } from "@faker-js/faker";
import { nanoid } from "nanoid";
import { prisma } from "../src/lib/prisma";

// Badge definitions for gamification system
const BADGES = [
  // REGULARITE (streak-based)
  {
    key: "streak_3",
    name: "Demarrage",
    description: "3 jours consecutifs d'entrainement",
    category: "REGULARITE",
    rarity: "COMMUN",
    criteria: { type: "streak", value: 3 },
    xpReward: 50,
  },
  {
    key: "streak_7",
    name: "Semaine Parfaite",
    description: "7 jours consecutifs d'entrainement",
    category: "REGULARITE",
    rarity: "RARE",
    criteria: { type: "streak", value: 7 },
    xpReward: 150,
  },
  {
    key: "streak_30",
    name: "Mois de Fer",
    description: "30 jours consecutifs d'entrainement",
    category: "REGULARITE",
    rarity: "EPIQUE",
    criteria: { type: "streak", value: 30 },
    xpReward: 500,
  },
  {
    key: "streak_100",
    name: "Centurion",
    description: "100 jours consecutifs d'entrainement",
    category: "REGULARITE",
    rarity: "LEGENDAIRE",
    criteria: { type: "streak", value: 100 },
    xpReward: 2000,
  },
  // JALON (milestone-based)
  {
    key: "sessions_10",
    name: "Premier Pas",
    description: "10 seances completees",
    category: "JALON",
    rarity: "COMMUN",
    criteria: { type: "sessions", value: 10 },
    xpReward: 100,
  },
  {
    key: "sessions_50",
    name: "Regulier",
    description: "50 seances completees",
    category: "JALON",
    rarity: "RARE",
    criteria: { type: "sessions", value: 50 },
    xpReward: 300,
  },
  {
    key: "sessions_100",
    name: "Devoue",
    description: "100 seances completees",
    category: "JALON",
    rarity: "EPIQUE",
    criteria: { type: "sessions", value: 100 },
    xpReward: 600,
  },
  {
    key: "feedbacks_50",
    name: "Communicant",
    description: "50 feedbacks envoyes",
    category: "JALON",
    rarity: "RARE",
    criteria: { type: "feedbacks", value: 50 },
    xpReward: 200,
  },
  // SPECIAL (achievement-based)
  {
    key: "first_video",
    name: "Cineaste",
    description: "Premier upload video",
    category: "SPECIAL",
    rarity: "COMMUN",
    criteria: { type: "video_upload", value: 1 },
    xpReward: 75,
  },
  {
    key: "rpe_master",
    name: "Maitre RPE",
    description: "20 feedbacks avec un RPE precis",
    category: "SPECIAL",
    rarity: "RARE",
    criteria: { type: "rpe_accuracy", value: 20 },
    xpReward: 250,
  },
  {
    key: "early_bird",
    name: "Leve-tot",
    description: "10 seances avant 7h du matin",
    category: "SPECIAL",
    rarity: "RARE",
    criteria: { type: "early_sessions", value: 10 },
    xpReward: 200,
  },
  {
    key: "team_player",
    name: "Esprit d'equipe",
    description: "Membre d'une equipe depuis plus de 3 mois",
    category: "SPECIAL",
    rarity: "COMMUN",
    criteria: { type: "team_tenure", value: 90 },
    xpReward: 100,
  },
] as const;

// Set seed for reproducibility
faker.seed(123);

async function seedBadges() {
  logger.info("🏆 Seeding badges...");

  const badgePromises = BADGES.map(async (badge) =>
    prisma.badge
      .upsert({
        where: { key: badge.key },
        update: {
          name: badge.name,
          description: badge.description,
          category: badge.category,
          rarity: badge.rarity,
          criteria: badge.criteria,
          xpReward: badge.xpReward,
        },
        create: {
          id: nanoid(11),
          key: badge.key,
          name: badge.name,
          description: badge.description,
          category: badge.category,
          rarity: badge.rarity,
          criteria: badge.criteria,
          xpReward: badge.xpReward,
        },
      })
      .then((b) => logger.info(`🎖️  Created badge: ${b.name} (${b.rarity})`)),
  );

  await Promise.all(badgePromises);
}

async function main() {
  logger.info("🌱 Seeding database...");

  // Seed badges first (required for gamification)
  await seedBadges();

  // Create 10 users
  const userCreatePromises = Array.from({ length: 10 }, async () => {
    const email = faker.internet.email();
    return prisma.user.upsert({
      where: { email },
      update: {},
      create: {
        id: nanoid(11),
        name: faker.person.fullName(),
        email,
        emailVerified: faker.datatype.boolean(0.8), // 80% chance of being verified
        image: faker.image.avatar(),
        createdAt: faker.date.past(),
        updatedAt: faker.date.recent(),
      },
    });
  });

  const users = await Promise.all(userCreatePromises);
  users.forEach((user) => logger.info(`👤 Created user: ${user.name}`));

  // Create 3 organizations
  const memberPromises: Promise<unknown>[] = [];
  const invitationPromises: Promise<unknown>[] = [];

  // Prepare organization creation data
  const orgData = Array.from({ length: 3 }, () => {
    const orgName = faker.company.name();
    const orgSlug = orgName.toLowerCase().replace(/[^a-z0-9]/g, "-");
    return { orgName, orgSlug };
  });

  // Create all organizations first
  const organizations = await Promise.all(
    orgData.map(async ({ orgName, orgSlug }) =>
      prisma.organization
        .upsert({
          where: { slug: orgSlug },
          update: {},
          create: {
            id: nanoid(11),
            name: orgName,
            slug: orgSlug,
            logo: faker.image.url(),
            email: faker.internet.email(),
            createdAt: faker.date.past(),
          },
        })
        .then((org) => {
          logger.info(`🏢 Created organization: ${org.name}`);
          return org;
        }),
    ),
  );

  // Process members and invitations for each organization
  organizations.forEach((organization) => {
    const roleOptions = ["owner", "admin", "member"];

    // Make sure each org has at least one owner
    memberPromises.push(
      prisma.member
        .create({
          data: {
            id: nanoid(11),
            organizationId: organization.id,
            userId: users[0].id, // First user is always an owner
            role: "owner",
            createdAt: faker.date.past(),
          },
        })
        .then(() =>
          logger.info(
            `👑 Added ${users[0].name} as OWNER to ${organization.name}`,
          ),
        ),
    );

    // Add 2-4 more random members to each org
    const memberCount = faker.number.int({ min: 2, max: 4 });
    const memberIndices = faker.helpers.uniqueArray(
      () => faker.number.int({ min: 1, max: users.length - 1 }),
      memberCount,
    );

    for (const index of memberIndices) {
      const user = users[index];
      const role = faker.helpers.arrayElement(roleOptions);

      memberPromises.push(
        prisma.member
          .create({
            data: {
              id: nanoid(11),
              organizationId: organization.id,
              userId: user.id,
              role,
              createdAt: faker.date.past(),
            },
          })
          .then(() =>
            logger.info(
              `👥 Added ${user.name} as ${role} to ${organization.name}`,
            ),
          ),
      );
    }
  });

  await Promise.all([...memberPromises, ...invitationPromises]);

  logger.info("✅ Seeding completed!");
}

main()
  .catch((e) => {
    logger.error("❌ Error seeding database:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
