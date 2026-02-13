import { Heading, Preview, Text } from "@react-email/components";
import { FeatureList } from "../components/feature-list";
import { Signature } from "../components/signature";
import { BilingualSection } from "../utils/bilingual-section";
import { CTAButton } from "../utils/cta-button";
import { EMAIL_COLORS, EMAIL_URLS, SiteConfig } from "../utils/email-constants";
import { EmailLayout } from "../utils/email-layout";
import { LanguageDivider } from "../utils/language-divider";

type OrgWelcomeEmailProps = {
  userName: string;
  organizationName: string;
  role: "coach" | "athlete" | "admin";
  coachName?: string;
};

export default function OrgWelcomeEmail({
  userName = "Champion",
  organizationName = "Elite Athletics",
  role = "athlete",
  coachName = "Coach Martin",
}: OrgWelcomeEmailProps) {
  const dashboardUrl = EMAIL_URLS.dashboard();

  const athleteNextSteps = [
    {
      fr: "Completez votre profil athlete",
      en: "Complete your athlete profile",
    },
    {
      fr: "Consultez votre premier programme d'entrainement",
      en: "Check out your first training program",
    },
    {
      fr: "Soumettez votre premiere video pour analyse",
      en: "Submit your first video for analysis",
    },
    {
      fr: "Connectez-vous avec votre coach",
      en: "Connect with your coach",
    },
  ];

  const coachNextSteps = [
    {
      fr: "Invitez vos athletes dans l'equipe",
      en: "Invite your athletes to the team",
    },
    {
      fr: "Creez votre premier programme d'entrainement",
      en: "Create your first training program",
    },
    {
      fr: "Configurez les parametres de l'equipe",
      en: "Configure team settings",
    },
    {
      fr: "Explorez les outils d'analyse video",
      en: "Explore video analysis tools",
    },
  ];

  const nextSteps = role === "athlete" ? athleteNextSteps : coachNextSteps;

  return (
    <EmailLayout>
      <Preview>
        Bienvenue dans {organizationName} ! / Welcome to {organizationName}!
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
          Bienvenue dans l'equipe ! 🎉
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
          Felicitations ! Vous faites maintenant partie de{" "}
          <strong style={{ color: EMAIL_COLORS.secondary }}>
            {organizationName}
          </strong>{" "}
          sur {SiteConfig.title}.
        </Text>

        {role === "athlete" && coachName && (
          <Text
            style={{
              fontSize: "16px",
              color: EMAIL_COLORS.textSecondary,
              margin: "0 0 16px 0",
              lineHeight: "1.6",
            }}
          >
            Votre coach,{" "}
            <strong style={{ color: EMAIL_COLORS.primary }}>{coachName}</strong>
            , est pret a vous accompagner vers l'excellence.
          </Text>
        )}

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 8px 0",
            lineHeight: "1.6",
          }}
        >
          Prochaines etapes pour bien demarrer :
        </Text>

        <FeatureList features={nextSteps} lang="fr" icon="→" />

        <CTAButton href={dashboardUrl}>Acceder a mon espace</CTAButton>

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
          Welcome to the team! 🎉
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
          Congratulations! You're now part of{" "}
          <strong style={{ color: EMAIL_COLORS.secondary }}>
            {organizationName}
          </strong>{" "}
          on {SiteConfig.title}.
        </Text>

        {role === "athlete" && coachName && (
          <Text
            style={{
              fontSize: "16px",
              color: EMAIL_COLORS.textSecondary,
              margin: "0 0 16px 0",
              lineHeight: "1.6",
            }}
          >
            Your coach,{" "}
            <strong style={{ color: EMAIL_COLORS.primary }}>{coachName}</strong>
            , is ready to guide you toward excellence.
          </Text>
        )}

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 8px 0",
            lineHeight: "1.6",
          }}
        >
          Next steps to get started:
        </Text>

        <FeatureList features={nextSteps} lang="en" icon="→" />

        <CTAButton href={dashboardUrl}>Go to my dashboard</CTAButton>

        <Signature lang="en" motivational />
      </BilingualSection>
    </EmailLayout>
  );
}
