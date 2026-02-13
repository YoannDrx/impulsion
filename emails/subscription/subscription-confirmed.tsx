import { Heading, Preview, Text } from "@react-email/components";
import { FeatureList, PRO_FEATURES } from "../components/feature-list";
import { Signature } from "../components/signature";
import { BilingualSection } from "../utils/bilingual-section";
import { CTAButton } from "../utils/cta-button";
import { EMAIL_COLORS, EMAIL_URLS } from "../utils/email-constants";
import { EmailLayout } from "../utils/email-layout";
import { LanguageDivider } from "../utils/language-divider";

type SubscriptionConfirmedEmailProps = {
  userName: string;
  planName: string;
  billingCycle: "monthly" | "yearly";
  amount: string;
  nextBillingDate: string;
};

export default function SubscriptionConfirmedEmail({
  userName = "Champion",
  planName = "Pro",
  billingCycle = "monthly",
  amount = "29,00 EUR",
  nextBillingDate = "15 fevrier 2025",
}: SubscriptionConfirmedEmailProps) {
  const dashboardUrl = EMAIL_URLS.dashboard();
  const billingUrl = EMAIL_URLS.billing();

  const billingCycleLabel = {
    monthly: { fr: "mensuel", en: "monthly" },
    yearly: { fr: "annuel", en: "yearly" },
  };

  return (
    <EmailLayout>
      <Preview>
        Abonnement {planName} confirme ! / {planName} subscription confirmed!
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
          Bienvenue dans l'Elite ! 🏆
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
          Merci pour votre confiance ! Votre abonnement{" "}
          <strong style={{ color: EMAIL_COLORS.primary }}>{planName}</strong>{" "}
          est maintenant actif. Vous avez fait le choix de l'excellence !
        </Text>

        {/* Subscription details card */}
        <div
          style={{
            backgroundColor: EMAIL_COLORS.cardBackgroundLight,
            borderRadius: "12px",
            padding: "20px",
            margin: "16px 0",
            border: `2px solid ${EMAIL_COLORS.primary}`,
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
            Details de votre abonnement
          </Text>
          <table cellPadding={0} cellSpacing={0} style={{ width: "100%" }}>
            <tr>
              <td style={{ padding: "8px 0" }}>
                <Text
                  style={{
                    fontSize: "14px",
                    color: EMAIL_COLORS.textMuted,
                    margin: "0",
                  }}
                >
                  Plan
                </Text>
              </td>
              <td style={{ padding: "8px 0", textAlign: "right" }}>
                <Text
                  style={{
                    fontSize: "14px",
                    color: EMAIL_COLORS.textPrimary,
                    fontWeight: 600,
                    margin: "0",
                  }}
                >
                  {planName} ({billingCycleLabel[billingCycle].fr})
                </Text>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0" }}>
                <Text
                  style={{
                    fontSize: "14px",
                    color: EMAIL_COLORS.textMuted,
                    margin: "0",
                  }}
                >
                  Montant
                </Text>
              </td>
              <td style={{ padding: "8px 0", textAlign: "right" }}>
                <Text
                  style={{
                    fontSize: "14px",
                    color: EMAIL_COLORS.primary,
                    fontWeight: 600,
                    margin: "0",
                  }}
                >
                  {amount}
                </Text>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0" }}>
                <Text
                  style={{
                    fontSize: "14px",
                    color: EMAIL_COLORS.textMuted,
                    margin: "0",
                  }}
                >
                  Prochaine facturation
                </Text>
              </td>
              <td style={{ padding: "8px 0", textAlign: "right" }}>
                <Text
                  style={{
                    fontSize: "14px",
                    color: EMAIL_COLORS.textPrimary,
                    margin: "0",
                  }}
                >
                  {nextBillingDate}
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
          Vous avez maintenant acces a toutes les fonctionnalites {planName} :
        </Text>

        <FeatureList features={PRO_FEATURES} lang="fr" />

        <table
          cellPadding={0}
          cellSpacing={0}
          style={{ width: "100%", marginTop: "16px" }}
        >
          <tr>
            <td style={{ width: "50%", paddingRight: "8px" }}>
              <CTAButton href={dashboardUrl}>Mon dashboard</CTAButton>
            </td>
            <td style={{ width: "50%", paddingLeft: "8px" }}>
              <CTAButton href={billingUrl} variant="outline">
                Gerer mon abonnement
              </CTAButton>
            </td>
          </tr>
        </table>

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
          Welcome to the Elite! 🏆
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
          Thank you for your trust! Your{" "}
          <strong style={{ color: EMAIL_COLORS.primary }}>{planName}</strong>{" "}
          subscription is now active. You've chosen excellence!
        </Text>

        {/* Subscription details card */}
        <div
          style={{
            backgroundColor: EMAIL_COLORS.cardBackgroundLight,
            borderRadius: "12px",
            padding: "20px",
            margin: "16px 0",
            border: `2px solid ${EMAIL_COLORS.primary}`,
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
            Your subscription details
          </Text>
          <table cellPadding={0} cellSpacing={0} style={{ width: "100%" }}>
            <tr>
              <td style={{ padding: "8px 0" }}>
                <Text
                  style={{
                    fontSize: "14px",
                    color: EMAIL_COLORS.textMuted,
                    margin: "0",
                  }}
                >
                  Plan
                </Text>
              </td>
              <td style={{ padding: "8px 0", textAlign: "right" }}>
                <Text
                  style={{
                    fontSize: "14px",
                    color: EMAIL_COLORS.textPrimary,
                    fontWeight: 600,
                    margin: "0",
                  }}
                >
                  {planName} ({billingCycleLabel[billingCycle].en})
                </Text>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0" }}>
                <Text
                  style={{
                    fontSize: "14px",
                    color: EMAIL_COLORS.textMuted,
                    margin: "0",
                  }}
                >
                  Amount
                </Text>
              </td>
              <td style={{ padding: "8px 0", textAlign: "right" }}>
                <Text
                  style={{
                    fontSize: "14px",
                    color: EMAIL_COLORS.primary,
                    fontWeight: 600,
                    margin: "0",
                  }}
                >
                  {amount}
                </Text>
              </td>
            </tr>
            <tr>
              <td style={{ padding: "8px 0" }}>
                <Text
                  style={{
                    fontSize: "14px",
                    color: EMAIL_COLORS.textMuted,
                    margin: "0",
                  }}
                >
                  Next billing
                </Text>
              </td>
              <td style={{ padding: "8px 0", textAlign: "right" }}>
                <Text
                  style={{
                    fontSize: "14px",
                    color: EMAIL_COLORS.textPrimary,
                    margin: "0",
                  }}
                >
                  {nextBillingDate}
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
          You now have access to all {planName} features:
        </Text>

        <FeatureList features={PRO_FEATURES} lang="en" />

        <table
          cellPadding={0}
          cellSpacing={0}
          style={{ width: "100%", marginTop: "16px" }}
        >
          <tr>
            <td style={{ width: "50%", paddingRight: "8px" }}>
              <CTAButton href={dashboardUrl}>My dashboard</CTAButton>
            </td>
            <td style={{ width: "50%", paddingLeft: "8px" }}>
              <CTAButton href={billingUrl} variant="outline">
                Manage subscription
              </CTAButton>
            </td>
          </tr>
        </table>

        <Signature lang="en" motivational />
      </BilingualSection>
    </EmailLayout>
  );
}
