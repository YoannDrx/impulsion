import { Heading, Preview, Text } from "@react-email/components";
import { AchievementCard } from "../components/achievement-card";
import { Signature } from "../components/signature";
import { BilingualSection } from "../utils/bilingual-section";
import { CTAButton } from "../utils/cta-button";
import { EMAIL_COLORS, EMAIL_URLS } from "../utils/email-constants";
import { EmailLayout } from "../utils/email-layout";
import { LanguageDivider } from "../utils/language-divider";

type BadgeUnlockEmailProps = {
  userName: string;
  badgeName: string;
  badgeDescription: string;
  badgeIcon: string;
  badgeLevel: "bronze" | "silver" | "gold";
  xpEarned: number;
  totalXp: number;
};

export default function BadgeUnlockEmail({
  userName = "Champion",
  badgeName = "Premier Pas",
  badgeDescription = "Vous avez complete votre premiere seance d'entrainement",
  badgeIcon = "🏅",
  badgeLevel = "bronze",
  xpEarned = 100,
  totalXp = 500,
}: BadgeUnlockEmailProps) {
  const achievementsUrl = EMAIL_URLS.achievements();

  const getLevelLabel = (
    level: "bronze" | "silver" | "gold",
    lang: "fr" | "en",
  ) => {
    const labels = {
      bronze: { fr: "Bronze", en: "Bronze" },
      silver: { fr: "Argent", en: "Silver" },
      gold: { fr: "Or", en: "Gold" },
    };
    return labels[level][lang];
  };

  return (
    <EmailLayout>
      <Preview>
        Nouveau badge debloque : {badgeName} ! / New badge unlocked: {badgeName}
        !
      </Preview>

      {/* Section Francaise */}
      <BilingualSection lang="fr">
        <Heading
          as="h1"
          style={{
            fontSize: "28px",
            fontWeight: 800,
            color: EMAIL_COLORS.primary,
            margin: "0 0 24px 0",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Badge Debloque ! 🏆
        </Heading>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textPrimary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
            textAlign: "center",
          }}
        >
          Felicitations {userName} !
        </Text>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
            textAlign: "center",
          }}
        >
          Votre travail acharne a paye ! Vous avez debloque un nouveau badge{" "}
          <strong style={{ color: EMAIL_COLORS.secondary }}>
            {getLevelLabel(badgeLevel, "fr")}
          </strong>
          .
        </Text>

        <AchievementCard
          title={badgeName}
          description={badgeDescription}
          icon={badgeIcon}
          level={badgeLevel}
          points={xpEarned}
        />

        <div
          style={{
            backgroundColor: EMAIL_COLORS.cardBackgroundLight,
            borderRadius: "8px",
            padding: "16px",
            margin: "16px 0",
            textAlign: "center",
          }}
        >
          <Text
            style={{
              fontSize: "14px",
              color: EMAIL_COLORS.textMuted,
              margin: "0 0 4px 0",
            }}
          >
            Votre total XP
          </Text>
          <Text
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: EMAIL_COLORS.primary,
              margin: "0",
            }}
          >
            {totalXp} XP
          </Text>
        </div>

        <Text
          style={{
            fontSize: "14px",
            color: EMAIL_COLORS.textMuted,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
            textAlign: "center",
          }}
        >
          Continuez a vous entrainer pour debloquer plus de badges et grimper
          dans le classement !
        </Text>

        <div style={{ textAlign: "center" }}>
          <CTAButton href={achievementsUrl}>Voir mes badges</CTAButton>
        </div>

        <Signature lang="fr" motivational />
      </BilingualSection>

      <LanguageDivider />

      {/* English Section */}
      <BilingualSection lang="en">
        <Heading
          as="h1"
          style={{
            fontSize: "28px",
            fontWeight: 800,
            color: EMAIL_COLORS.primary,
            margin: "0 0 24px 0",
            textAlign: "center",
            textTransform: "uppercase",
          }}
        >
          Badge Unlocked! 🏆
        </Heading>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textPrimary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
            textAlign: "center",
          }}
        >
          Congratulations {userName}!
        </Text>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
            textAlign: "center",
          }}
        >
          Your hard work has paid off! You've unlocked a new{" "}
          <strong style={{ color: EMAIL_COLORS.secondary }}>
            {getLevelLabel(badgeLevel, "en")}
          </strong>{" "}
          badge.
        </Text>

        <AchievementCard
          title={badgeName}
          description={badgeDescription}
          icon={badgeIcon}
          level={badgeLevel}
          points={xpEarned}
        />

        <div
          style={{
            backgroundColor: EMAIL_COLORS.cardBackgroundLight,
            borderRadius: "8px",
            padding: "16px",
            margin: "16px 0",
            textAlign: "center",
          }}
        >
          <Text
            style={{
              fontSize: "14px",
              color: EMAIL_COLORS.textMuted,
              margin: "0 0 4px 0",
            }}
          >
            Your total XP
          </Text>
          <Text
            style={{
              fontSize: "24px",
              fontWeight: 700,
              color: EMAIL_COLORS.primary,
              margin: "0",
            }}
          >
            {totalXp} XP
          </Text>
        </div>

        <Text
          style={{
            fontSize: "14px",
            color: EMAIL_COLORS.textMuted,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
            textAlign: "center",
          }}
        >
          Keep training to unlock more badges and climb the leaderboard!
        </Text>

        <div style={{ textAlign: "center" }}>
          <CTAButton href={achievementsUrl}>View my badges</CTAButton>
        </div>

        <Signature lang="en" motivational />
      </BilingualSection>
    </EmailLayout>
  );
}
