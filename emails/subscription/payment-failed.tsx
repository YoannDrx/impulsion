import { Heading, Preview, Text } from "@react-email/components";
import { Signature } from "../components/signature";
import { BilingualSection } from "../utils/bilingual-section";
import { CTAButton } from "../utils/cta-button";
import {
  CONTACT_EMAIL,
  EMAIL_COLORS,
  EMAIL_URLS,
} from "../utils/email-constants";
import { EmailLayout } from "../utils/email-layout";
import { LanguageDivider } from "../utils/language-divider";

type PaymentFailedEmailProps = {
  userName: string;
  planName: string;
  amount: string;
  failureReason?: string;
  retryDate?: string;
  gracePeriodEnd?: string;
};

export default function PaymentFailedEmail({
  userName = "Champion",
  planName = "Pro",
  amount = "29,00 EUR",
  failureReason,
  retryDate = "18 janvier 2025",
  gracePeriodEnd = "25 janvier 2025",
}: PaymentFailedEmailProps) {
  const billingUrl = EMAIL_URLS.billing();

  return (
    <EmailLayout>
      <Preview>
        ⚠️ Paiement echoue - Action requise / ⚠️ Payment failed - Action
        required
      </Preview>

      {/* Section Francaise */}
      <BilingualSection lang="fr">
        <Heading
          as="h1"
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: EMAIL_COLORS.error,
            margin: "0 0 24px 0",
          }}
        >
          ⚠️ Paiement echoue
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
          Nous n'avons pas pu traiter le paiement de{" "}
          <strong style={{ color: EMAIL_COLORS.primary }}>{amount}</strong> pour
          votre abonnement {planName}.
        </Text>

        {/* Error details card */}
        <div
          style={{
            backgroundColor: EMAIL_COLORS.cardBackgroundLight,
            borderRadius: "12px",
            padding: "20px",
            margin: "16px 0",
            border: `2px solid ${EMAIL_COLORS.error}`,
          }}
        >
          {failureReason && (
            <Text
              style={{
                fontSize: "14px",
                color: EMAIL_COLORS.textSecondary,
                margin: "0 0 12px 0",
                lineHeight: "1.5",
              }}
            >
              <strong>Raison :</strong> {failureReason}
            </Text>
          )}
          {retryDate && (
            <Text
              style={{
                fontSize: "14px",
                color: EMAIL_COLORS.textSecondary,
                margin: "0 0 12px 0",
                lineHeight: "1.5",
              }}
            >
              <strong>Prochaine tentative :</strong> {retryDate}
            </Text>
          )}
          {gracePeriodEnd && (
            <Text
              style={{
                fontSize: "14px",
                color: EMAIL_COLORS.warning,
                fontWeight: 600,
                margin: "0",
                lineHeight: "1.5",
              }}
            >
              ⏰ Votre acces {planName} sera suspendu le {gracePeriodEnd} si le
              paiement n'est pas effectue.
            </Text>
          )}
        </div>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          Causes possibles :
        </Text>

        <ul
          style={{
            margin: "0 0 16px 0",
            padding: "0 0 0 20px",
          }}
        >
          <li
            style={{
              fontSize: "14px",
              color: EMAIL_COLORS.textSecondary,
              marginBottom: "8px",
              lineHeight: "1.5",
            }}
          >
            Carte expiree ou fonds insuffisants
          </li>
          <li
            style={{
              fontSize: "14px",
              color: EMAIL_COLORS.textSecondary,
              marginBottom: "8px",
              lineHeight: "1.5",
            }}
          >
            Limite de depenses atteinte
          </li>
          <li
            style={{
              fontSize: "14px",
              color: EMAIL_COLORS.textSecondary,
              marginBottom: "8px",
              lineHeight: "1.5",
            }}
          >
            Transaction bloquee par votre banque
          </li>
        </ul>

        <Text
          style={{
            fontSize: "14px",
            color: EMAIL_COLORS.textMuted,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          Pour eviter toute interruption de service et continuer a utiliser
          toutes les fonctionnalites {planName}, veuillez mettre a jour vos
          informations de paiement.
        </Text>

        <CTAButton href={billingUrl} variant="warning">
          Mettre a jour mon paiement
        </CTAButton>

        <Text
          style={{
            fontSize: "14px",
            color: EMAIL_COLORS.textMuted,
            margin: "16px 0 0 0",
            lineHeight: "1.6",
          }}
        >
          Besoin d'aide ? Contactez-nous a{" "}
          <span style={{ color: EMAIL_COLORS.primary }}>{CONTACT_EMAIL}</span>
        </Text>

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
            color: EMAIL_COLORS.error,
            margin: "0 0 24px 0",
          }}
        >
          ⚠️ Payment failed
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
          We were unable to process the payment of{" "}
          <strong style={{ color: EMAIL_COLORS.primary }}>{amount}</strong> for
          your {planName} subscription.
        </Text>

        {/* Error details card */}
        <div
          style={{
            backgroundColor: EMAIL_COLORS.cardBackgroundLight,
            borderRadius: "12px",
            padding: "20px",
            margin: "16px 0",
            border: `2px solid ${EMAIL_COLORS.error}`,
          }}
        >
          {failureReason && (
            <Text
              style={{
                fontSize: "14px",
                color: EMAIL_COLORS.textSecondary,
                margin: "0 0 12px 0",
                lineHeight: "1.5",
              }}
            >
              <strong>Reason:</strong> {failureReason}
            </Text>
          )}
          {retryDate && (
            <Text
              style={{
                fontSize: "14px",
                color: EMAIL_COLORS.textSecondary,
                margin: "0 0 12px 0",
                lineHeight: "1.5",
              }}
            >
              <strong>Next attempt:</strong> {retryDate}
            </Text>
          )}
          {gracePeriodEnd && (
            <Text
              style={{
                fontSize: "14px",
                color: EMAIL_COLORS.warning,
                fontWeight: 600,
                margin: "0",
                lineHeight: "1.5",
              }}
            >
              ⏰ Your {planName} access will be suspended on {gracePeriodEnd} if
              payment is not made.
            </Text>
          )}
        </div>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          Possible causes:
        </Text>

        <ul
          style={{
            margin: "0 0 16px 0",
            padding: "0 0 0 20px",
          }}
        >
          <li
            style={{
              fontSize: "14px",
              color: EMAIL_COLORS.textSecondary,
              marginBottom: "8px",
              lineHeight: "1.5",
            }}
          >
            Expired card or insufficient funds
          </li>
          <li
            style={{
              fontSize: "14px",
              color: EMAIL_COLORS.textSecondary,
              marginBottom: "8px",
              lineHeight: "1.5",
            }}
          >
            Spending limit reached
          </li>
          <li
            style={{
              fontSize: "14px",
              color: EMAIL_COLORS.textSecondary,
              marginBottom: "8px",
              lineHeight: "1.5",
            }}
          >
            Transaction blocked by your bank
          </li>
        </ul>

        <Text
          style={{
            fontSize: "14px",
            color: EMAIL_COLORS.textMuted,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          To avoid any service interruption and continue using all {planName}{" "}
          features, please update your payment information.
        </Text>

        <CTAButton href={billingUrl} variant="warning">
          Update my payment
        </CTAButton>

        <Text
          style={{
            fontSize: "14px",
            color: EMAIL_COLORS.textMuted,
            margin: "16px 0 0 0",
            lineHeight: "1.6",
          }}
        >
          Need help? Contact us at{" "}
          <span style={{ color: EMAIL_COLORS.primary }}>{CONTACT_EMAIL}</span>
        </Text>

        <Signature lang="en" />
      </BilingualSection>
    </EmailLayout>
  );
}
