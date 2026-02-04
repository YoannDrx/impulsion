import { Heading, Preview, Text } from "@react-email/components";
import { FeatureList, FREE_LIMITATIONS } from "../components/feature-list";
import { Signature } from "../components/signature";
import { BilingualSection } from "../utils/bilingual-section";
import { CTAButton } from "../utils/cta-button";
import { EMAIL_COLORS, EMAIL_URLS } from "../utils/email-constants";
import { EmailLayout } from "../utils/email-layout";
import { LanguageDivider } from "../utils/language-divider";

type TrialReminderEmailProps = {
  userName: string;
  planName: string;
  daysRemaining: number;
  trialEndDate: string;
  athletesCount?: number;
  sessionsCompleted?: number;
};

export default function TrialReminderEmail({
  userName = "Champion",
  planName = "Pro",
  daysRemaining = 3,
  trialEndDate = "28 janvier 2025",
  athletesCount = 8,
  sessionsCompleted = 24,
}: TrialReminderEmailProps) {
  const pricingUrl = EMAIL_URLS.pricing();

  const getUrgencyColor = (days: number) => {
    if (days <= 1) return EMAIL_COLORS.error;
    if (days <= 3) return EMAIL_COLORS.warning;
    return EMAIL_COLORS.primary;
  };

  return (
    <EmailLayout>
      <Preview>
        {`⏰ Plus que ${daysRemaining} jours d'essai ${planName} ! / ⏰ Only ${daysRemaining} days left of your ${planName} trial!`}
      </Preview>

      {/* Section Francaise */}
      <BilingualSection lang="fr">
        <Heading
          as="h1"
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: EMAIL_COLORS.textPrimary,
            margin: "0 0 24px 0",
          }}
        >
          ⏰ Votre essai se termine bientot !
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
          Votre essai gratuit du plan{" "}
          <strong style={{ color: EMAIL_COLORS.primary }}>{planName}</strong> se
          termine dans{" "}
          <strong style={{ color: getUrgencyColor(daysRemaining) }}>
            {daysRemaining} jours
          </strong>{" "}
          (le {trialEndDate}).
        </Text>

        {/* Usage stats */}
        {(athletesCount || sessionsCompleted) && (
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
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              Ce que vous avez accompli
            </Text>
            <table cellPadding={0} cellSpacing={0} style={{ width: "100%" }}>
              <tr>
                {athletesCount && (
                  <td style={{ textAlign: "center", width: "50%" }}>
                    <Text
                      style={{
                        fontSize: "28px",
                        fontWeight: 700,
                        color: EMAIL_COLORS.primary,
                        margin: "0",
                      }}
                    >
                      {athletesCount}
                    </Text>
                    <Text
                      style={{
                        fontSize: "12px",
                        color: EMAIL_COLORS.textMuted,
                        margin: "4px 0 0 0",
                      }}
                    >
                      Athletes geres
                    </Text>
                  </td>
                )}
                {sessionsCompleted && (
                  <td style={{ textAlign: "center", width: "50%" }}>
                    <Text
                      style={{
                        fontSize: "28px",
                        fontWeight: 700,
                        color: EMAIL_COLORS.secondary,
                        margin: "0",
                      }}
                    >
                      {sessionsCompleted}
                    </Text>
                    <Text
                      style={{
                        fontSize: "12px",
                        color: EMAIL_COLORS.textMuted,
                        margin: "4px 0 0 0",
                      }}
                    >
                      Seances completees
                    </Text>
                  </td>
                )}
              </tr>
            </table>
          </div>
        )}

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 8px 0",
            lineHeight: "1.6",
          }}
        >
          Sans abonnement, vous passerez au plan gratuit avec ces limitations :
        </Text>

        <FeatureList features={FREE_LIMITATIONS} lang="fr" icon="⚠️" />

        <Text
          style={{
            fontSize: "14px",
            color: EMAIL_COLORS.warning,
            fontWeight: 600,
            margin: "16px 0",
            lineHeight: "1.6",
          }}
        >
          Ne perdez pas votre progression ! Gardez tous vos athletes et
          fonctionnalites en passant au plan {planName}.
        </Text>

        <CTAButton href={pricingUrl}>Passer au plan {planName}</CTAButton>

        <Signature lang="fr" />
      </BilingualSection>

      <LanguageDivider />

      {/* English Section */}
      <BilingualSection lang="en">
        <Heading
          as="h1"
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: EMAIL_COLORS.textPrimary,
            margin: "0 0 24px 0",
          }}
        >
          ⏰ Your trial is ending soon!
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
          Your free trial of the{" "}
          <strong style={{ color: EMAIL_COLORS.primary }}>{planName}</strong>{" "}
          plan ends in{" "}
          <strong style={{ color: getUrgencyColor(daysRemaining) }}>
            {daysRemaining} days
          </strong>{" "}
          (on {trialEndDate}).
        </Text>

        {/* Usage stats */}
        {(athletesCount || sessionsCompleted) && (
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
                textTransform: "uppercase",
                textAlign: "center",
              }}
            >
              What you've accomplished
            </Text>
            <table cellPadding={0} cellSpacing={0} style={{ width: "100%" }}>
              <tr>
                {athletesCount && (
                  <td style={{ textAlign: "center", width: "50%" }}>
                    <Text
                      style={{
                        fontSize: "28px",
                        fontWeight: 700,
                        color: EMAIL_COLORS.primary,
                        margin: "0",
                      }}
                    >
                      {athletesCount}
                    </Text>
                    <Text
                      style={{
                        fontSize: "12px",
                        color: EMAIL_COLORS.textMuted,
                        margin: "4px 0 0 0",
                      }}
                    >
                      Athletes managed
                    </Text>
                  </td>
                )}
                {sessionsCompleted && (
                  <td style={{ textAlign: "center", width: "50%" }}>
                    <Text
                      style={{
                        fontSize: "28px",
                        fontWeight: 700,
                        color: EMAIL_COLORS.secondary,
                        margin: "0",
                      }}
                    >
                      {sessionsCompleted}
                    </Text>
                    <Text
                      style={{
                        fontSize: "12px",
                        color: EMAIL_COLORS.textMuted,
                        margin: "4px 0 0 0",
                      }}
                    >
                      Sessions completed
                    </Text>
                  </td>
                )}
              </tr>
            </table>
          </div>
        )}

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 8px 0",
            lineHeight: "1.6",
          }}
        >
          Without a subscription, you'll switch to the free plan with these
          limitations:
        </Text>

        <FeatureList features={FREE_LIMITATIONS} lang="en" icon="⚠️" />

        <Text
          style={{
            fontSize: "14px",
            color: EMAIL_COLORS.warning,
            fontWeight: 600,
            margin: "16px 0",
            lineHeight: "1.6",
          }}
        >
          Don't lose your progress! Keep all your athletes and features by
          upgrading to the {planName} plan.
        </Text>

        <CTAButton href={pricingUrl}>Upgrade to {planName}</CTAButton>

        <Signature lang="en" />
      </BilingualSection>
    </EmailLayout>
  );
}
