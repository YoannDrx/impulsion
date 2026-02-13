import { Heading, Preview, Text } from "@react-email/components";
import { Signature } from "../components/signature";
import { BilingualSection } from "../utils/bilingual-section";
import { CTAButton } from "../utils/cta-button";
import { EMAIL_COLORS } from "../utils/email-constants";
import { EmailLayout } from "../utils/email-layout";
import { LanguageDivider } from "../utils/language-divider";

type FeedbackRequestEmailProps = {
  athleteName: string;
  sessionTitle: string;
  sessionDate: string;
  coachName: string;
  feedbackUrl: string;
};

export default function FeedbackRequestEmail({
  athleteName = "Champion",
  sessionTitle = "Entrainement fractionne",
  sessionDate = "14 janvier",
  coachName = "Coach Martin",
  feedbackUrl = "https://impulsion.app/feedback/session-123",
}: FeedbackRequestEmailProps) {
  return (
    <EmailLayout>
      <Preview>
        Comment s'est passee votre seance ? / How was your training session?
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
          Comment s'est passee votre seance ? 📝
        </Heading>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textPrimary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          Salut {athleteName},
        </Text>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          Vous avez termine votre seance{" "}
          <strong style={{ color: EMAIL_COLORS.primary }}>
            {sessionTitle}
          </strong>{" "}
          le {sessionDate}. Bravo pour votre engagement !
        </Text>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          <strong style={{ color: EMAIL_COLORS.secondary }}>{coachName}</strong>{" "}
          souhaite connaitre votre ressenti. Votre feedback est precieux pour
          adapter votre programme d'entrainement et vous aider a progresser plus
          rapidement.
        </Text>

        <Text
          style={{
            fontSize: "14px",
            color: EMAIL_COLORS.textMuted,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          Ca ne prend que 2 minutes et ca fait toute la difference !
        </Text>

        <CTAButton href={feedbackUrl}>Donner mon feedback</CTAButton>

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
          How was your session? 📝
        </Heading>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textPrimary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          Hi {athleteName},
        </Text>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          You completed your{" "}
          <strong style={{ color: EMAIL_COLORS.primary }}>
            {sessionTitle}
          </strong>{" "}
          session on {sessionDate}. Great job on your commitment!
        </Text>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          <strong style={{ color: EMAIL_COLORS.secondary }}>{coachName}</strong>{" "}
          would like to know how you felt. Your feedback is valuable to adapt
          your training program and help you progress faster.
        </Text>

        <Text
          style={{
            fontSize: "14px",
            color: EMAIL_COLORS.textMuted,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          It only takes 2 minutes and makes all the difference!
        </Text>

        <CTAButton href={feedbackUrl}>Give my feedback</CTAButton>

        <Signature lang="en" />
      </BilingualSection>
    </EmailLayout>
  );
}
