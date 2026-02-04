import { Heading, Preview, Text } from "@react-email/components";
import { Signature } from "../components/signature";
import { BilingualSection } from "../utils/bilingual-section";
import {
  CONTACT_EMAIL,
  EMAIL_COLORS,
  SiteConfig,
} from "../utils/email-constants";
import { EmailLayout } from "../utils/email-layout";
import { LanguageDivider } from "../utils/language-divider";

type AccountDeletedEmailProps = {
  userName: string;
};

export default function AccountDeletedEmail({
  userName = "Champion",
}: AccountDeletedEmailProps) {
  return (
    <EmailLayout>
      <Preview>
        Votre compte {SiteConfig.title} a ete supprime / Your {SiteConfig.title}{" "}
        account has been deleted
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
          Au revoir, {userName} 👋
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
          Nous vous confirmons que votre compte {SiteConfig.title} a ete
          supprime avec succes. Toutes vos donnees personnelles ont ete
          definitivement effacees de nos serveurs.
        </Text>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          Nous sommes tristes de vous voir partir. Si vous souhaitez nous faire
          part de vos commentaires ou si vous avez supprime votre compte par
          erreur, n'hesitez pas a nous contacter a{" "}
          <span style={{ color: EMAIL_COLORS.primary }}>{CONTACT_EMAIL}</span>.
        </Text>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          Vous serez toujours le bienvenu si vous decidez de revenir. En
          attendant, continuez a repousser vos limites ! 💪
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
          Goodbye, {userName} 👋
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
          We confirm that your {SiteConfig.title} account has been successfully
          deleted. All your personal data has been permanently removed from our
          servers.
        </Text>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          We're sad to see you go. If you'd like to share feedback or if you
          deleted your account by mistake, please don't hesitate to contact us
          at{" "}
          <span style={{ color: EMAIL_COLORS.primary }}>{CONTACT_EMAIL}</span>.
        </Text>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          You'll always be welcome if you decide to come back. In the meantime,
          keep pushing your limits! 💪
        </Text>

        <Signature lang="en" />
      </BilingualSection>
    </EmailLayout>
  );
}
