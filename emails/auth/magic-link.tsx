import { Heading, Preview, Text } from "@react-email/components";
import { Signature } from "../components/signature";
import { BilingualSection } from "../utils/bilingual-section";
import { CTAButton } from "../utils/cta-button";
import { EMAIL_COLORS, SiteConfig } from "../utils/email-constants";
import { EmailLayout } from "../utils/email-layout";
import { LanguageDivider } from "../utils/language-divider";

type MagicLinkEmailProps = {
  userName: string;
  magicLinkUrl: string;
};

export default function MagicLinkEmail({
  userName = "Champion",
  magicLinkUrl = "https://impulsion.app/auth/magic-link",
}: MagicLinkEmailProps) {
  return (
    <EmailLayout>
      <Preview>
        Votre lien de connexion {SiteConfig.title} / Your {SiteConfig.title}{" "}
        login link
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
          Votre lien de connexion magique ✨
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
          Vous avez demande un lien de connexion pour acceder a votre compte{" "}
          {SiteConfig.title}. Cliquez sur le bouton ci-dessous pour vous
          connecter instantanement.
        </Text>

        <CTAButton href={magicLinkUrl}>Se connecter</CTAButton>

        <Text
          style={{
            fontSize: "14px",
            color: EMAIL_COLORS.textMuted,
            margin: "16px 0 0 0",
            lineHeight: "1.6",
          }}
        >
          Ce lien est valide pendant 15 minutes et ne peut etre utilise qu'une
          seule fois. Si vous n'avez pas demande ce lien, vous pouvez ignorer
          cet email.
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
          Your magic login link ✨
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
          You requested a login link to access your {SiteConfig.title} account.
          Click the button below to sign in instantly.
        </Text>

        <CTAButton href={magicLinkUrl}>Sign in</CTAButton>

        <Text
          style={{
            fontSize: "14px",
            color: EMAIL_COLORS.textMuted,
            margin: "16px 0 0 0",
            lineHeight: "1.6",
          }}
        >
          This link is valid for 15 minutes and can only be used once. If you
          didn't request this link, you can safely ignore this email.
        </Text>

        <Signature lang="en" />
      </BilingualSection>
    </EmailLayout>
  );
}
