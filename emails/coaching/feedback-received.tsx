import { Heading, Preview, Text } from "@react-email/components";
import { Signature } from "../components/signature";
import { BilingualSection } from "../utils/bilingual-section";
import { CTAButton } from "../utils/cta-button";
import { EMAIL_COLORS } from "../utils/email-constants";
import { EmailLayout } from "../utils/email-layout";
import { LanguageDivider } from "../utils/language-divider";

type FeedbackReceivedEmailProps = {
  coachName: string;
  athleteName: string;
  sessionTitle: string;
  sessionDate: string;
  rpeScore?: number;
  feelingEmoji?: string;
  athleteComment?: string;
  feedbackUrl: string;
};

export default function FeedbackReceivedEmail({
  coachName = "Coach",
  athleteName = "Thomas",
  sessionTitle = "Entrainement fractionne",
  sessionDate = "14 janvier",
  rpeScore,
  feelingEmoji = "💪",
  athleteComment,
  feedbackUrl = "https://impulsion.app/athletes/athlete-123/feedback",
}: FeedbackReceivedEmailProps) {
  const getRPEColor = (score: number) => {
    if (score <= 3) return EMAIL_COLORS.success;
    if (score <= 6) return EMAIL_COLORS.primary;
    if (score <= 8) return EMAIL_COLORS.warning;
    return EMAIL_COLORS.error;
  };

  return (
    <EmailLayout>
      <Preview>
        {athleteName} a donne son feedback / {athleteName} submitted feedback
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
          Nouveau feedback athlete ! 📊
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
          vient de soumettre son feedback pour la seance{" "}
          <strong>{sessionTitle}</strong> du {sessionDate}.
        </Text>

        {/* Feedback Summary Card */}
        <div
          style={{
            backgroundColor: EMAIL_COLORS.cardBackgroundLight,
            borderRadius: "12px",
            padding: "20px",
            margin: "16px 0",
            border: `1px solid ${EMAIL_COLORS.border}`,
          }}
        >
          <table cellPadding={0} cellSpacing={0} style={{ width: "100%" }}>
            <tr>
              <td style={{ textAlign: "center", padding: "10px" }}>
                <Text
                  style={{
                    fontSize: "32px",
                    margin: "0 0 8px 0",
                    lineHeight: "1",
                  }}
                >
                  {feelingEmoji}
                </Text>
                <Text
                  style={{
                    fontSize: "12px",
                    color: EMAIL_COLORS.textMuted,
                    margin: "0",
                    textTransform: "uppercase",
                  }}
                >
                  Ressenti
                </Text>
              </td>
              {rpeScore !== undefined && (
                <td style={{ textAlign: "center", padding: "10px" }}>
                  <Text
                    style={{
                      fontSize: "32px",
                      fontWeight: 700,
                      color: getRPEColor(rpeScore),
                      margin: "0 0 8px 0",
                      lineHeight: "1",
                    }}
                  >
                    {rpeScore}/10
                  </Text>
                  <Text
                    style={{
                      fontSize: "12px",
                      color: EMAIL_COLORS.textMuted,
                      margin: "0",
                      textTransform: "uppercase",
                    }}
                  >
                    RPE Score
                  </Text>
                </td>
              )}
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
                Commentaire de l'athlete
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

        <CTAButton href={feedbackUrl}>Voir le feedback complet</CTAButton>

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
          New athlete feedback! 📊
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
          just submitted feedback for the <strong>{sessionTitle}</strong>{" "}
          session on {sessionDate}.
        </Text>

        {/* Feedback Summary Card */}
        <div
          style={{
            backgroundColor: EMAIL_COLORS.cardBackgroundLight,
            borderRadius: "12px",
            padding: "20px",
            margin: "16px 0",
            border: `1px solid ${EMAIL_COLORS.border}`,
          }}
        >
          <table cellPadding={0} cellSpacing={0} style={{ width: "100%" }}>
            <tr>
              <td style={{ textAlign: "center", padding: "10px" }}>
                <Text
                  style={{
                    fontSize: "32px",
                    margin: "0 0 8px 0",
                    lineHeight: "1",
                  }}
                >
                  {feelingEmoji}
                </Text>
                <Text
                  style={{
                    fontSize: "12px",
                    color: EMAIL_COLORS.textMuted,
                    margin: "0",
                    textTransform: "uppercase",
                  }}
                >
                  Feeling
                </Text>
              </td>
              {rpeScore !== undefined && (
                <td style={{ textAlign: "center", padding: "10px" }}>
                  <Text
                    style={{
                      fontSize: "32px",
                      fontWeight: 700,
                      color: getRPEColor(rpeScore),
                      margin: "0 0 8px 0",
                      lineHeight: "1",
                    }}
                  >
                    {rpeScore}/10
                  </Text>
                  <Text
                    style={{
                      fontSize: "12px",
                      color: EMAIL_COLORS.textMuted,
                      margin: "0",
                      textTransform: "uppercase",
                    }}
                  >
                    RPE Score
                  </Text>
                </td>
              )}
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
                Athlete's comment
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

        <CTAButton href={feedbackUrl}>View full feedback</CTAButton>

        <Signature lang="en" />
      </BilingualSection>
    </EmailLayout>
  );
}
