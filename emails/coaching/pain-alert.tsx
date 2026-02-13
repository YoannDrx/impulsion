import { Heading, Preview, Text } from "@react-email/components";
import { Signature } from "../components/signature";
import { BilingualSection } from "../utils/bilingual-section";
import { CTAButton } from "../utils/cta-button";
import { EMAIL_COLORS } from "../utils/email-constants";
import { EmailLayout } from "../utils/email-layout";
import { LanguageDivider } from "../utils/language-divider";

type PainAlertEmailProps = {
  coachName: string;
  athleteName: string;
  painLocation: string;
  painLevel: number;
  sessionTitle?: string;
  sessionDate: string;
  athleteComment?: string;
  athleteProfileUrl: string;
};

export default function PainAlertEmail({
  coachName = "Coach",
  athleteName = "Thomas",
  painLocation = "Genou gauche",
  painLevel = 7,
  sessionTitle = "Entrainement fractionne",
  sessionDate = "14 janvier",
  athleteComment,
  athleteProfileUrl = "https://impulsion.app/athletes/athlete-123",
}: PainAlertEmailProps) {
  const getPainColor = (level: number) => {
    if (level <= 3) return EMAIL_COLORS.success;
    if (level <= 5) return EMAIL_COLORS.warning;
    return EMAIL_COLORS.error;
  };

  const getPainEmoji = (level: number) => {
    if (level <= 3) return "🟢";
    if (level <= 5) return "🟡";
    if (level <= 7) return "🟠";
    return "🔴";
  };

  return (
    <EmailLayout>
      <Preview>
        ⚠️ Alerte douleur : {athleteName} - {painLocation} / ⚠️ Pain alert:{" "}
        {athleteName} - {painLocation}
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
          ⚠️ Alerte Douleur Signalee
        </Heading>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textPrimary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          Salut {coachName},
        </Text>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          <strong style={{ color: EMAIL_COLORS.primary }}>{athleteName}</strong>{" "}
          a signale une douleur{" "}
          {sessionTitle && (
            <>
              apres la seance <strong>{sessionTitle}</strong> du {sessionDate}
            </>
          )}
          .
        </Text>

        {/* Pain Alert Card */}
        <div
          style={{
            backgroundColor: EMAIL_COLORS.cardBackgroundLight,
            borderRadius: "12px",
            padding: "20px",
            margin: "16px 0",
            border: `2px solid ${getPainColor(painLevel)}`,
          }}
        >
          <table cellPadding={0} cellSpacing={0} style={{ width: "100%" }}>
            <tr>
              <td style={{ width: "60%" }}>
                <Text
                  style={{
                    fontSize: "14px",
                    color: EMAIL_COLORS.textMuted,
                    margin: "0 0 4px 0",
                    textTransform: "uppercase",
                  }}
                >
                  Zone concernee
                </Text>
                <Text
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: EMAIL_COLORS.textPrimary,
                    margin: "0",
                  }}
                >
                  {painLocation}
                </Text>
              </td>
              <td style={{ width: "40%", textAlign: "right" }}>
                <Text
                  style={{
                    fontSize: "14px",
                    color: EMAIL_COLORS.textMuted,
                    margin: "0 0 4px 0",
                    textTransform: "uppercase",
                  }}
                >
                  Intensite
                </Text>
                <Text
                  style={{
                    fontSize: "28px",
                    fontWeight: 700,
                    color: getPainColor(painLevel),
                    margin: "0",
                  }}
                >
                  {getPainEmoji(painLevel)} {painLevel}/10
                </Text>
              </td>
            </tr>
          </table>

          {athleteComment && (
            <div
              style={{
                marginTop: "16px",
                paddingTop: "16px",
                borderTop: `1px solid ${EMAIL_COLORS.border}`,
              }}
            >
              <Text
                style={{
                  fontSize: "12px",
                  color: EMAIL_COLORS.textMuted,
                  margin: "0 0 8px 0",
                  textTransform: "uppercase",
                }}
              >
                Description de l'athlete
              </Text>
              <Text
                style={{
                  fontSize: "14px",
                  color: EMAIL_COLORS.textSecondary,
                  margin: "0",
                  fontStyle: "italic",
                  lineHeight: "1.5",
                }}
              >
                "{athleteComment}"
              </Text>
            </div>
          )}
        </div>

        <Text
          style={{
            fontSize: "14px",
            color: EMAIL_COLORS.warning,
            fontWeight: 600,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          Nous vous recommandons de contacter votre athlete pour evaluer la
          situation et adapter le programme si necessaire.
        </Text>

        <CTAButton href={athleteProfileUrl} variant="warning">
          Voir le profil athlete
        </CTAButton>

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
          ⚠️ Pain Alert Reported
        </Heading>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textPrimary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          Hi {coachName},
        </Text>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          <strong style={{ color: EMAIL_COLORS.primary }}>{athleteName}</strong>{" "}
          reported pain{" "}
          {sessionTitle && (
            <>
              after the <strong>{sessionTitle}</strong> session on {sessionDate}
            </>
          )}
          .
        </Text>

        {/* Pain Alert Card */}
        <div
          style={{
            backgroundColor: EMAIL_COLORS.cardBackgroundLight,
            borderRadius: "12px",
            padding: "20px",
            margin: "16px 0",
            border: `2px solid ${getPainColor(painLevel)}`,
          }}
        >
          <table cellPadding={0} cellSpacing={0} style={{ width: "100%" }}>
            <tr>
              <td style={{ width: "60%" }}>
                <Text
                  style={{
                    fontSize: "14px",
                    color: EMAIL_COLORS.textMuted,
                    margin: "0 0 4px 0",
                    textTransform: "uppercase",
                  }}
                >
                  Affected area
                </Text>
                <Text
                  style={{
                    fontSize: "18px",
                    fontWeight: 700,
                    color: EMAIL_COLORS.textPrimary,
                    margin: "0",
                  }}
                >
                  {painLocation}
                </Text>
              </td>
              <td style={{ width: "40%", textAlign: "right" }}>
                <Text
                  style={{
                    fontSize: "14px",
                    color: EMAIL_COLORS.textMuted,
                    margin: "0 0 4px 0",
                    textTransform: "uppercase",
                  }}
                >
                  Intensity
                </Text>
                <Text
                  style={{
                    fontSize: "28px",
                    fontWeight: 700,
                    color: getPainColor(painLevel),
                    margin: "0",
                  }}
                >
                  {getPainEmoji(painLevel)} {painLevel}/10
                </Text>
              </td>
            </tr>
          </table>

          {athleteComment && (
            <div
              style={{
                marginTop: "16px",
                paddingTop: "16px",
                borderTop: `1px solid ${EMAIL_COLORS.border}`,
              }}
            >
              <Text
                style={{
                  fontSize: "12px",
                  color: EMAIL_COLORS.textMuted,
                  margin: "0 0 8px 0",
                  textTransform: "uppercase",
                }}
              >
                Athlete's description
              </Text>
              <Text
                style={{
                  fontSize: "14px",
                  color: EMAIL_COLORS.textSecondary,
                  margin: "0",
                  fontStyle: "italic",
                  lineHeight: "1.5",
                }}
              >
                "{athleteComment}"
              </Text>
            </div>
          )}
        </div>

        <Text
          style={{
            fontSize: "14px",
            color: EMAIL_COLORS.warning,
            fontWeight: 600,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          We recommend contacting your athlete to assess the situation and adapt
          the program if necessary.
        </Text>

        <CTAButton href={athleteProfileUrl} variant="warning">
          View athlete profile
        </CTAButton>

        <Signature lang="en" />
      </BilingualSection>
    </EmailLayout>
  );
}
