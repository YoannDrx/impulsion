import { Heading, Preview, Text } from "@react-email/components";
import { FeatureList, PRO_FEATURES } from "../components/feature-list";
import { Signature } from "../components/signature";
import { BilingualSection } from "../utils/bilingual-section";
import { CTAButton } from "../utils/cta-button";
import { EMAIL_COLORS, EMAIL_URLS, SiteConfig } from "../utils/email-constants";
import { EmailLayout } from "../utils/email-layout";
import { LanguageDivider } from "../utils/language-divider";

type TrialWelcomeEmailProps = {
  userName: string;
  planName: string;
  trialDays: number;
  trialEndDate: string;
};

export default function TrialWelcomeEmail({
  userName = "Champion",
  planName = "Pro",
  trialDays = 14,
  trialEndDate = "28 janvier 2025",
}: TrialWelcomeEmailProps) {
  const dashboardUrl = EMAIL_URLS.dashboard();

  return (
    <EmailLayout>
      <Preview>
        Bienvenue dans votre essai {SiteConfig.title} {planName} ! / Welcome to
        your {SiteConfig.title} {planName} trial!
      </Preview>

      {/* Section Francaise */}
      <BilingualSection lang="fr">
        <Heading
          as="h1"
          style={{
            fontSize: "28px",
            fontWeight: 800,
            color: EMAIL_COLORS.textPrimary,
            margin: "0 0 24px 0",
            textTransform: "uppercase",
          }}
        >
          Essai {planName} Active ! 🚀
        </Heading>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textPrimary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          Salut {userName},
        </Text>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          Felicitations ! Vous beneficiez maintenant de{" "}
          <strong style={{ color: EMAIL_COLORS.primary }}>
            {trialDays} jours d'essai gratuit
          </strong>{" "}
          du plan {planName}. C'est le moment de decouvrir tout ce qu'
          {SiteConfig.title} peut faire pour votre entrainement !
        </Text>

        {/* Trial info card */}
        <div
          style={{
            backgroundColor: EMAIL_COLORS.cardBackgroundLight,
            borderRadius: "12px",
            padding: "20px",
            margin: "16px 0",
            border: `2px solid ${EMAIL_COLORS.primary}`,
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
                  Duree de l'essai
                </Text>
                <Text
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: EMAIL_COLORS.primary,
                    margin: "0",
                  }}
                >
                  {trialDays} jours
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
                  Fin de l'essai
                </Text>
                <Text
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: EMAIL_COLORS.textPrimary,
                    margin: "0",
                  }}
                >
                  {trialEndDate}
                </Text>
              </td>
            </tr>
          </table>
        </div>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 8px 0",
            lineHeight: "1.6",
          }}
        >
          Pendant votre essai, vous avez acces a :
        </Text>

        <FeatureList features={PRO_FEATURES} lang="fr" />

        <Text
          style={{
            fontSize: "14px",
            color: EMAIL_COLORS.textMuted,
            margin: "16px 0",
            lineHeight: "1.6",
          }}
        >
          Aucune carte bancaire requise pendant l'essai. Vous serez notifie
          avant la fin de la periode d'essai.
        </Text>

        <CTAButton href={dashboardUrl}>Commencer l'entrainement</CTAButton>

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
            color: EMAIL_COLORS.textPrimary,
            margin: "0 0 24px 0",
            textTransform: "uppercase",
          }}
        >
          {planName} Trial Activated! 🚀
        </Heading>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textPrimary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          Hi {userName},
        </Text>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          Congratulations! You now have{" "}
          <strong style={{ color: EMAIL_COLORS.primary }}>
            {trialDays} days of free trial
          </strong>{" "}
          of the {planName} plan. Now's the time to discover everything{" "}
          {SiteConfig.title} can do for your training!
        </Text>

        {/* Trial info card */}
        <div
          style={{
            backgroundColor: EMAIL_COLORS.cardBackgroundLight,
            borderRadius: "12px",
            padding: "20px",
            margin: "16px 0",
            border: `2px solid ${EMAIL_COLORS.primary}`,
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
                  Trial duration
                </Text>
                <Text
                  style={{
                    fontSize: "24px",
                    fontWeight: 700,
                    color: EMAIL_COLORS.primary,
                    margin: "0",
                  }}
                >
                  {trialDays} days
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
                  Trial ends
                </Text>
                <Text
                  style={{
                    fontSize: "18px",
                    fontWeight: 600,
                    color: EMAIL_COLORS.textPrimary,
                    margin: "0",
                  }}
                >
                  {trialEndDate}
                </Text>
              </td>
            </tr>
          </table>
        </div>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 8px 0",
            lineHeight: "1.6",
          }}
        >
          During your trial, you have access to:
        </Text>

        <FeatureList features={PRO_FEATURES} lang="en" />

        <Text
          style={{
            fontSize: "14px",
            color: EMAIL_COLORS.textMuted,
            margin: "16px 0",
            lineHeight: "1.6",
          }}
        >
          No credit card required during the trial. You'll be notified before
          the trial period ends.
        </Text>

        <CTAButton href={dashboardUrl}>Start training</CTAButton>

        <Signature lang="en" motivational />
      </BilingualSection>
    </EmailLayout>
  );
}
