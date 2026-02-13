import { Heading, Preview, Text } from "@react-email/components";
import { Signature } from "../components/signature";
import { BilingualSection } from "../utils/bilingual-section";
import { CTAButton } from "../utils/cta-button";
import { EMAIL_COLORS, EMAIL_URLS } from "../utils/email-constants";
import { EmailLayout } from "../utils/email-layout";
import { LanguageDivider } from "../utils/language-divider";

type SessionReminderEmailProps = {
  athleteName: string;
  sessionTitle: string;
  sessionDate: string;
  sessionTime: string;
  sessionType: string;
  coachName?: string;
  notes?: string;
};

export default function SessionReminderEmail({
  athleteName = "Champion",
  sessionTitle = "Entrainement fractionne",
  sessionDate = "demain, 15 janvier",
  sessionTime = "18h00",
  sessionType = "Cardio",
  coachName = "Coach Martin",
  notes,
}: SessionReminderEmailProps) {
  const sessionsUrl = EMAIL_URLS.sessions();

  return (
    <EmailLayout>
      <Preview>
        Rappel : {sessionTitle} {sessionDate} a {sessionTime} / Reminder:{" "}
        {sessionTitle} {sessionDate} at {sessionTime}
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
          Seance demain ! 🏃‍♂️
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
          C'est un rappel pour votre prochaine seance d'entrainement :
        </Text>

        {/* Session Details Card */}
        <div
          style={{
            backgroundColor: EMAIL_COLORS.cardBackgroundLight,
            borderRadius: "12px",
            padding: "20px",
            margin: "16px 0",
            borderLeft: `4px solid ${EMAIL_COLORS.primary}`,
          }}
        >
          <Text
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: EMAIL_COLORS.primary,
              margin: "0 0 12px 0",
              textTransform: "uppercase",
            }}
          >
            {sessionTitle}
          </Text>
          <Text
            style={{
              fontSize: "14px",
              color: EMAIL_COLORS.textSecondary,
              margin: "0 0 8px 0",
              lineHeight: "1.5",
            }}
          >
            📅 <strong>Date :</strong> {sessionDate}
          </Text>
          <Text
            style={{
              fontSize: "14px",
              color: EMAIL_COLORS.textSecondary,
              margin: "0 0 8px 0",
              lineHeight: "1.5",
            }}
          >
            ⏰ <strong>Heure :</strong> {sessionTime}
          </Text>
          <Text
            style={{
              fontSize: "14px",
              color: EMAIL_COLORS.textSecondary,
              margin: "0 0 8px 0",
              lineHeight: "1.5",
            }}
          >
            🎯 <strong>Type :</strong> {sessionType}
          </Text>
          {coachName && (
            <Text
              style={{
                fontSize: "14px",
                color: EMAIL_COLORS.textSecondary,
                margin: "0",
                lineHeight: "1.5",
              }}
            >
              👤 <strong>Coach :</strong> {coachName}
            </Text>
          )}
        </div>

        {notes && (
          <Text
            style={{
              fontSize: "14px",
              color: EMAIL_COLORS.textMuted,
              fontStyle: "italic",
              margin: "0 0 16px 0",
              lineHeight: "1.6",
              padding: "12px",
              backgroundColor: EMAIL_COLORS.background,
              borderRadius: "8px",
            }}
          >
            Note du coach : "{notes}"
          </Text>
        )}

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          Preparez-vous bien : hydratation, nutrition, et repos adequat. On se
          donne a fond demain ! 💪
        </Text>

        <CTAButton href={sessionsUrl}>Voir les details</CTAButton>

        <Signature lang="fr" motivational />
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
          Session tomorrow! 🏃‍♂️
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
          This is a reminder for your upcoming training session:
        </Text>

        {/* Session Details Card */}
        <div
          style={{
            backgroundColor: EMAIL_COLORS.cardBackgroundLight,
            borderRadius: "12px",
            padding: "20px",
            margin: "16px 0",
            borderLeft: `4px solid ${EMAIL_COLORS.primary}`,
          }}
        >
          <Text
            style={{
              fontSize: "18px",
              fontWeight: 700,
              color: EMAIL_COLORS.primary,
              margin: "0 0 12px 0",
              textTransform: "uppercase",
            }}
          >
            {sessionTitle}
          </Text>
          <Text
            style={{
              fontSize: "14px",
              color: EMAIL_COLORS.textSecondary,
              margin: "0 0 8px 0",
              lineHeight: "1.5",
            }}
          >
            📅 <strong>Date:</strong> {sessionDate}
          </Text>
          <Text
            style={{
              fontSize: "14px",
              color: EMAIL_COLORS.textSecondary,
              margin: "0 0 8px 0",
              lineHeight: "1.5",
            }}
          >
            ⏰ <strong>Time:</strong> {sessionTime}
          </Text>
          <Text
            style={{
              fontSize: "14px",
              color: EMAIL_COLORS.textSecondary,
              margin: "0 0 8px 0",
              lineHeight: "1.5",
            }}
          >
            🎯 <strong>Type:</strong> {sessionType}
          </Text>
          {coachName && (
            <Text
              style={{
                fontSize: "14px",
                color: EMAIL_COLORS.textSecondary,
                margin: "0",
                lineHeight: "1.5",
              }}
            >
              👤 <strong>Coach:</strong> {coachName}
            </Text>
          )}
        </div>

        {notes && (
          <Text
            style={{
              fontSize: "14px",
              color: EMAIL_COLORS.textMuted,
              fontStyle: "italic",
              margin: "0 0 16px 0",
              lineHeight: "1.6",
              padding: "12px",
              backgroundColor: EMAIL_COLORS.background,
              borderRadius: "8px",
            }}
          >
            Coach's note: "{notes}"
          </Text>
        )}

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          Prepare well: proper hydration, nutrition, and rest. Let's give it our
          all tomorrow! 💪
        </Text>

        <CTAButton href={sessionsUrl}>View details</CTAButton>

        <Signature lang="en" motivational />
      </BilingualSection>
    </EmailLayout>
  );
}
