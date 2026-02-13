import { Heading, Preview, Text } from "@react-email/components";
import { Signature } from "../components/signature";
import { BilingualSection } from "../utils/bilingual-section";
import { CTAButton } from "../utils/cta-button";
import { EMAIL_COLORS, SiteConfig } from "../utils/email-constants";
import { EmailLayout } from "../utils/email-layout";
import { LanguageDivider } from "../utils/language-divider";

type OrgInvitationEmailProps = {
  inviteeName: string;
  inviterName: string;
  organizationName: string;
  role: "coach" | "athlete" | "admin";
  invitationUrl: string;
};

export default function OrgInvitationEmail({
  inviteeName = "Champion",
  inviterName = "Coach Martin",
  organizationName = "Elite Athletics",
  role = "athlete",
  invitationUrl = "https://impulsion.app/invite/accept",
}: OrgInvitationEmailProps) {
  const roleLabels = {
    coach: { fr: "coach", en: "coach" },
    athlete: { fr: "athlete", en: "athlete" },
    admin: { fr: "administrateur", en: "administrator" },
  };

  return (
    <EmailLayout>
      <Preview>
        {inviterName} vous invite a rejoindre {organizationName} / {inviterName}{" "}
        invites you to join {organizationName}
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
          Rejoignez l'equipe ! 🏆
        </Heading>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textPrimary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          Salut {inviteeName},
        </Text>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          <strong style={{ color: EMAIL_COLORS.primary }}>{inviterName}</strong>{" "}
          vous invite a rejoindre{" "}
          <strong style={{ color: EMAIL_COLORS.secondary }}>
            {organizationName}
          </strong>{" "}
          sur {SiteConfig.title} en tant que {roleLabels[role].fr}.
        </Text>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          {role === "athlete"
            ? "En rejoignant cette equipe, vous aurez acces a vos programmes d'entrainement personnalises, a l'analyse video et au suivi de votre progression."
            : "En rejoignant cette equipe, vous pourrez collaborer avec les autres membres et acceder a tous les outils de coaching."}
        </Text>

        <CTAButton href={invitationUrl}>Accepter l'invitation</CTAButton>

        <Text
          style={{
            fontSize: "14px",
            color: EMAIL_COLORS.textMuted,
            margin: "16px 0 0 0",
            lineHeight: "1.6",
          }}
        >
          Cette invitation expire dans 7 jours. Si vous ne reconnaissez pas
          l'expediteur, vous pouvez ignorer cet email.
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
          Join the team! 🏆
        </Heading>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textPrimary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          Hi {inviteeName},
        </Text>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          <strong style={{ color: EMAIL_COLORS.primary }}>{inviterName}</strong>{" "}
          invites you to join{" "}
          <strong style={{ color: EMAIL_COLORS.secondary }}>
            {organizationName}
          </strong>{" "}
          on {SiteConfig.title} as {roleLabels[role].en}.
        </Text>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          {role === "athlete"
            ? "By joining this team, you'll have access to personalized training programs, video analysis, and progress tracking."
            : "By joining this team, you'll be able to collaborate with other members and access all coaching tools."}
        </Text>

        <CTAButton href={invitationUrl}>Accept invitation</CTAButton>

        <Text
          style={{
            fontSize: "14px",
            color: EMAIL_COLORS.textMuted,
            margin: "16px 0 0 0",
            lineHeight: "1.6",
          }}
        >
          This invitation expires in 7 days. If you don't recognize the sender,
          you can safely ignore this email.
        </Text>

        <Signature lang="en" />
      </BilingualSection>
    </EmailLayout>
  );
}
