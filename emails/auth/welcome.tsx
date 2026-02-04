import { Heading, Preview, Text } from "@react-email/components";
import {
  ATHLETE_FEATURES,
  COACH_FEATURES,
  FeatureList,
} from "../components/feature-list";
import { Signature } from "../components/signature";
import { BilingualSection } from "../utils/bilingual-section";
import { CTAButton } from "../utils/cta-button";
import { EMAIL_COLORS, EMAIL_URLS, SiteConfig } from "../utils/email-constants";
import { EmailLayout } from "../utils/email-layout";
import { LanguageDivider } from "../utils/language-divider";

type WelcomeEmailProps = {
  userName: string;
  userRole: "coach" | "athlete";
};

export default function WelcomeEmail({
  userName = "Champion",
  userRole = "athlete",
}: WelcomeEmailProps) {
  const dashboardUrl = EMAIL_URLS.dashboard();
  const features = userRole === "coach" ? COACH_FEATURES : ATHLETE_FEATURES;

  return (
    <EmailLayout>
      <Preview>
        Bienvenue sur {SiteConfig.title} ! Pret a repousser vos limites ? /
        Welcome to {SiteConfig.title}! Ready to push your limits?
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
          Bienvenue {userRole === "coach" ? "Coach" : "Athlete"} ! 💪
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
          {userRole === "coach"
            ? "Felicitations pour avoir rejoint Impulsion ! Vous avez maintenant acces a une plateforme complete pour accompagner vos athletes vers l'excellence."
            : "Felicitations pour avoir rejoint Impulsion ! Vous etes sur le point de transformer votre entrainement avec un suivi personnalise et des outils de pointe."}
        </Text>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          Avec {SiteConfig.title}, vous pouvez :
        </Text>

        <FeatureList features={features} lang="fr" />

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
          Welcome {userRole === "coach" ? "Coach" : "Athlete"}! 💪
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
          {userRole === "coach"
            ? "Congratulations on joining Impulsion! You now have access to a complete platform to guide your athletes toward excellence."
            : "Congratulations on joining Impulsion! You're about to transform your training with personalized tracking and cutting-edge tools."}
        </Text>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          With {SiteConfig.title}, you can:
        </Text>

        <FeatureList features={features} lang="en" />

        <CTAButton href={dashboardUrl}>Start Training</CTAButton>

        <Signature lang="en" motivational />
      </BilingualSection>
    </EmailLayout>
  );
}
