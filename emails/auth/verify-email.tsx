import { Heading, Preview, Text } from "@react-email/components";
import { Signature } from "../components/signature";
import { BilingualSection } from "../utils/bilingual-section";
import { CTAButton } from "../utils/cta-button";
import { EMAIL_COLORS, SiteConfig } from "../utils/email-constants";
import { EmailLayout } from "../utils/email-layout";
import { LanguageDivider } from "../utils/language-divider";

type VerifyEmailProps = {
  userName: string;
  verificationUrl: string;
};

export default function VerifyEmail({
  userName = "Champion",
  verificationUrl = "https://impulsion.app/verify",
}: VerifyEmailProps) {
  return (
    <EmailLayout>
      <Preview>
        Verifiez votre email {SiteConfig.title} / Verify your {SiteConfig.title}{" "}
        email
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
          Verifiez votre adresse email ✉️
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
          Bienvenue sur {SiteConfig.title} ! Pour finaliser votre inscription et
          commencer a repousser vos limites, veuillez verifier votre adresse
          email en cliquant sur le bouton ci-dessous.
        </Text>

        <CTAButton href={verificationUrl}>Verifier mon email</CTAButton>

        <Text
          style={{
            fontSize: "14px",
            color: EMAIL_COLORS.textMuted,
            margin: "16px 0 0 0",
            lineHeight: "1.6",
          }}
        >
          Ce lien expire dans 24 heures. Si vous n'avez pas cree de compte sur{" "}
          {SiteConfig.title}, vous pouvez ignorer cet email.
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
            color: EMAIL_COLORS.textPrimary,
            margin: "0 0 24px 0",
          }}
        >
          Verify your email address ✉️
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
          Welcome to {SiteConfig.title}! To complete your registration and start
          pushing your limits, please verify your email address by clicking the
          button below.
        </Text>

        <CTAButton href={verificationUrl}>Verify my email</CTAButton>

        <Text
          style={{
            fontSize: "14px",
            color: EMAIL_COLORS.textMuted,
            margin: "16px 0 0 0",
            lineHeight: "1.6",
          }}
        >
          This link expires in 24 hours. If you didn't create an account on{" "}
          {SiteConfig.title}, you can safely ignore this email.
        </Text>

        <Signature lang="en" />
      </BilingualSection>
    </EmailLayout>
  );
}
