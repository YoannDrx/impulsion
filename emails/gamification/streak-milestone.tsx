import { Heading, Preview, Text } from "@react-email/components";
import { StreakCard } from "../components/achievement-card";
import { Signature } from "../components/signature";
import { BilingualSection } from "../utils/bilingual-section";
import { CTAButton } from "../utils/cta-button";
import { EMAIL_COLORS, EMAIL_URLS } from "../utils/email-constants";
import { EmailLayout } from "../utils/email-layout";
import { LanguageDivider } from "../utils/language-divider";

type StreakMilestoneEmailProps = {
  userName: string;
  streakDays: number;
  totalXp: number;
  nextMilestone: number;
};

export default function StreakMilestoneEmail({
  userName = "Champion",
  streakDays = 7,
  totalXp = 850,
  nextMilestone = 14,
}: StreakMilestoneEmailProps) {
  const dashboardUrl = EMAIL_URLS.dashboard();

  const getStreakEmoji = (days: number) => {
    if (days >= 100) return "💯";
    if (days >= 30) return "🔥🔥🔥";
    if (days >= 14) return "🔥🔥";
    if (days >= 7) return "🔥";
    return "⚡";
  };

  const getMotivationalMessage = (days: number, lang: "fr" | "en") => {
    if (days >= 100) {
      return {
        fr: "Vous etes une LEGENDE ! 100 jours consecutifs, c'est exceptionnel !",
        en: "You are a LEGEND! 100 consecutive days is exceptional!",
      }[lang];
    }
    if (days >= 30) {
      return {
        fr: "Un mois complet ! Votre dedication est inspirante. Vous etes un modele !",
        en: "A full month! Your dedication is inspiring. You're a role model!",
      }[lang];
    }
    if (days >= 14) {
      return {
        fr: "Deux semaines de suite ! L'habitude est en train de se former. Continuez !",
        en: "Two weeks straight! The habit is forming. Keep going!",
      }[lang];
    }
    return {
      fr: "Une semaine complete ! C'est le debut d'une belle habitude. Vous etes sur la bonne voie !",
      en: "A full week! This is the start of a great habit. You're on the right track!",
    }[lang];
  };

  return (
    <EmailLayout>
      <Preview>
        {`${getStreakEmoji(streakDays)} Serie de ${streakDays} jours ! / ${getStreakEmoji(streakDays)} ${streakDays}-day streak!`}
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
          {getStreakEmoji(streakDays)} Serie en Feu !
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
          Incroyable {userName} !
        </Text>

        <StreakCard days={streakDays} lang="fr" />

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
            textAlign: "center",
          }}
        >
          {getMotivationalMessage(streakDays, "fr")}
        </Text>

        {/* Stats */}
        <div
          style={{
            backgroundColor: EMAIL_COLORS.cardBackgroundLight,
            borderRadius: "12px",
            padding: "20px",
            margin: "16px 0",
          }}
        >
          <table cellPadding={0} cellSpacing={0} style={{ width: "100%" }}>
            <tr>
              <td style={{ textAlign: "center", width: "50%" }}>
                <Text
                  style={{
                    fontSize: "12px",
                    color: EMAIL_COLORS.textMuted,
                    margin: "0 0 4px 0",
                    textTransform: "uppercase",
                  }}
                >
                  Total XP
                </Text>
                <Text
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: EMAIL_COLORS.primary,
                    margin: "0",
                  }}
                >
                  {totalXp}
                </Text>
              </td>
              <td style={{ textAlign: "center", width: "50%" }}>
                <Text
                  style={{
                    fontSize: "12px",
                    color: EMAIL_COLORS.textMuted,
                    margin: "0 0 4px 0",
                    textTransform: "uppercase",
                  }}
                >
                  Prochain milestone
                </Text>
                <Text
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: EMAIL_COLORS.secondary,
                    margin: "0",
                  }}
                >
                  {nextMilestone} jours
                </Text>
              </td>
            </tr>
          </table>
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
          Plus que {nextMilestone - streakDays} jours pour atteindre le prochain
          milestone !
        </Text>

        <div style={{ textAlign: "center" }}>
          <CTAButton href={dashboardUrl}>Continuer ma serie</CTAButton>
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
          {getStreakEmoji(streakDays)} Streak on Fire!
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
          Incredible {userName}!
        </Text>

        <StreakCard days={streakDays} lang="en" />

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
            textAlign: "center",
          }}
        >
          {getMotivationalMessage(streakDays, "en")}
        </Text>

        {/* Stats */}
        <div
          style={{
            backgroundColor: EMAIL_COLORS.cardBackgroundLight,
            borderRadius: "12px",
            padding: "20px",
            margin: "16px 0",
          }}
        >
          <table cellPadding={0} cellSpacing={0} style={{ width: "100%" }}>
            <tr>
              <td style={{ textAlign: "center", width: "50%" }}>
                <Text
                  style={{
                    fontSize: "12px",
                    color: EMAIL_COLORS.textMuted,
                    margin: "0 0 4px 0",
                    textTransform: "uppercase",
                  }}
                >
                  Total XP
                </Text>
                <Text
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: EMAIL_COLORS.primary,
                    margin: "0",
                  }}
                >
                  {totalXp}
                </Text>
              </td>
              <td style={{ textAlign: "center", width: "50%" }}>
                <Text
                  style={{
                    fontSize: "12px",
                    color: EMAIL_COLORS.textMuted,
                    margin: "0 0 4px 0",
                    textTransform: "uppercase",
                  }}
                >
                  Next milestone
                </Text>
                <Text
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: EMAIL_COLORS.secondary,
                    margin: "0",
                  }}
                >
                  {nextMilestone} days
                </Text>
              </td>
            </tr>
          </table>
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
          Only {nextMilestone - streakDays} days left to reach the next
          milestone!
        </Text>

        <div style={{ textAlign: "center" }}>
          <CTAButton href={dashboardUrl}>Continue my streak</CTAButton>
        </div>

        <Signature lang="en" motivational />
      </BilingualSection>
    </EmailLayout>
  );
}
