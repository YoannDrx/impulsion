import { Heading, Preview, Text } from "@react-email/components";
import { LevelUpCard } from "../components/achievement-card";
import { Signature } from "../components/signature";
import { BilingualSection } from "../utils/bilingual-section";
import { CTAButton } from "../utils/cta-button";
import { EMAIL_COLORS, EMAIL_URLS } from "../utils/email-constants";
import { EmailLayout } from "../utils/email-layout";
import { LanguageDivider } from "../utils/language-divider";

type LevelUpEmailProps = {
  userName: string;
  newLevel: number;
  levelName: string;
  totalXp: number;
  xpToNextLevel: number;
  unlockedFeature?: string;
};

const LEVEL_NAMES: Partial<Record<number, { fr: string; en: string }>> = {
  1: { fr: "Debutant", en: "Beginner" },
  2: { fr: "Novice", en: "Novice" },
  3: { fr: "Amateur", en: "Amateur" },
  4: { fr: "Intermediaire", en: "Intermediate" },
  5: { fr: "Avance", en: "Advanced" },
  6: { fr: "Expert", en: "Expert" },
  7: { fr: "Elite", en: "Elite" },
  8: { fr: "Champion", en: "Champion" },
  9: { fr: "Maitre", en: "Master" },
  10: { fr: "Legende", en: "Legend" },
};

export default function LevelUpEmail({
  userName = "Champion",
  newLevel = 5,
  levelName = "Avance",
  totalXp = 2500,
  xpToNextLevel = 500,
  unlockedFeature,
}: LevelUpEmailProps) {
  const profileUrl = EMAIL_URLS.profile();

  const getLevelEmoji = (level: number) => {
    if (level >= 10) return "👑";
    if (level >= 8) return "🏆";
    if (level >= 6) return "⭐";
    if (level >= 4) return "💪";
    return "🌱";
  };

  return (
    <EmailLayout>
      <Preview>
        {`${getLevelEmoji(newLevel)} Niveau ${newLevel} atteint ! / ${getLevelEmoji(newLevel)} Level ${newLevel} reached!`}
      </Preview>

      {/* Section Francaise */}
      <BilingualSection lang="fr">
        <Heading
          as="h1"
          style={{
            fontSize: "32px",
            fontWeight: 800,
            color: EMAIL_COLORS.primary,
            margin: "0 0 24px 0",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Level Up ! {getLevelEmoji(newLevel)}
        </Heading>

        <Text
          style={{
            fontSize: "18px",
            color: EMAIL_COLORS.textPrimary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
            textAlign: "center",
          }}
        >
          Bravo {userName} !
        </Text>

        <LevelUpCard
          newLevel={newLevel}
          levelName={LEVEL_NAMES[newLevel]?.fr ?? levelName}
          lang="fr"
        />

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
            textAlign: "center",
          }}
        >
          Votre travail acharne et votre perseverance vous ont permis
          d'atteindre le niveau{" "}
          <strong style={{ color: EMAIL_COLORS.primary }}>{newLevel}</strong> !
        </Text>

        {unlockedFeature && (
          <div
            style={{
              backgroundColor: EMAIL_COLORS.cardBackgroundLight,
              borderRadius: "12px",
              padding: "16px",
              margin: "16px 0",
              borderLeft: `4px solid ${EMAIL_COLORS.secondary}`,
            }}
          >
            <Text
              style={{
                fontSize: "12px",
                color: EMAIL_COLORS.secondary,
                margin: "0 0 4px 0",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              🔓 Nouveau debloque
            </Text>
            <Text
              style={{
                fontSize: "14px",
                color: EMAIL_COLORS.textPrimary,
                margin: "0",
              }}
            >
              {unlockedFeature}
            </Text>
          </div>
        )}

        {/* Progress to next level */}
        <div
          style={{
            backgroundColor: EMAIL_COLORS.cardBackgroundLight,
            borderRadius: "12px",
            padding: "20px",
            margin: "16px 0",
          }}
        >
          <Text
            style={{
              fontSize: "14px",
              color: EMAIL_COLORS.textMuted,
              margin: "0 0 12px 0",
              textAlign: "center",
            }}
          >
            Progression vers le niveau {newLevel + 1}
          </Text>
          <div
            style={{
              backgroundColor: EMAIL_COLORS.background,
              borderRadius: "8px",
              height: "12px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                backgroundColor: EMAIL_COLORS.primary,
                height: "100%",
                width: "10%",
                borderRadius: "8px",
              }}
            />
          </div>
          <Text
            style={{
              fontSize: "12px",
              color: EMAIL_COLORS.textMuted,
              margin: "8px 0 0 0",
              textAlign: "center",
            }}
          >
            {totalXp} XP / {totalXp + xpToNextLevel} XP
          </Text>
        </div>

        <div style={{ textAlign: "center" }}>
          <CTAButton href={profileUrl}>Voir mon profil</CTAButton>
        </div>

        <Signature lang="fr" motivational />
      </BilingualSection>

      <LanguageDivider />

      {/* English Section */}
      <BilingualSection lang="en">
        <Heading
          as="h1"
          style={{
            fontSize: "32px",
            fontWeight: 800,
            color: EMAIL_COLORS.primary,
            margin: "0 0 24px 0",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Level Up! {getLevelEmoji(newLevel)}
        </Heading>

        <Text
          style={{
            fontSize: "18px",
            color: EMAIL_COLORS.textPrimary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
            textAlign: "center",
          }}
        >
          Well done {userName}!
        </Text>

        <LevelUpCard
          newLevel={newLevel}
          levelName={LEVEL_NAMES[newLevel]?.en ?? levelName}
          lang="en"
        />

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
            textAlign: "center",
          }}
        >
          Your hard work and perseverance have helped you reach level{" "}
          <strong style={{ color: EMAIL_COLORS.primary }}>{newLevel}</strong>!
        </Text>

        {unlockedFeature && (
          <div
            style={{
              backgroundColor: EMAIL_COLORS.cardBackgroundLight,
              borderRadius: "12px",
              padding: "16px",
              margin: "16px 0",
              borderLeft: `4px solid ${EMAIL_COLORS.secondary}`,
            }}
          >
            <Text
              style={{
                fontSize: "12px",
                color: EMAIL_COLORS.secondary,
                margin: "0 0 4px 0",
                textTransform: "uppercase",
                fontWeight: 600,
              }}
            >
              🔓 Newly unlocked
            </Text>
            <Text
              style={{
                fontSize: "14px",
                color: EMAIL_COLORS.textPrimary,
                margin: "0",
              }}
            >
              {unlockedFeature}
            </Text>
          </div>
        )}

        {/* Progress to next level */}
        <div
          style={{
            backgroundColor: EMAIL_COLORS.cardBackgroundLight,
            borderRadius: "12px",
            padding: "20px",
            margin: "16px 0",
          }}
        >
          <Text
            style={{
              fontSize: "14px",
              color: EMAIL_COLORS.textMuted,
              margin: "0 0 12px 0",
              textAlign: "center",
            }}
          >
            Progress to level {newLevel + 1}
          </Text>
          <div
            style={{
              backgroundColor: EMAIL_COLORS.background,
              borderRadius: "8px",
              height: "12px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                backgroundColor: EMAIL_COLORS.primary,
                height: "100%",
                width: "10%",
                borderRadius: "8px",
              }}
            />
          </div>
          <Text
            style={{
              fontSize: "12px",
              color: EMAIL_COLORS.textMuted,
              margin: "8px 0 0 0",
              textAlign: "center",
            }}
          >
            {totalXp} XP / {totalXp + xpToNextLevel} XP
          </Text>
        </div>

        <div style={{ textAlign: "center" }}>
          <CTAButton href={profileUrl}>View my profile</CTAButton>
        </div>

        <Signature lang="en" motivational />
      </BilingualSection>
    </EmailLayout>
  );
}
