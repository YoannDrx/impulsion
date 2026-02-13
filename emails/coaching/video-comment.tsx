import { Heading, Preview, Text } from "@react-email/components";
import { Signature } from "../components/signature";
import { BilingualSection } from "../utils/bilingual-section";
import { CTAButton } from "../utils/cta-button";
import { EMAIL_COLORS } from "../utils/email-constants";
import { EmailLayout } from "../utils/email-layout";
import { LanguageDivider } from "../utils/language-divider";

type VideoCommentEmailProps = {
  recipientName: string;
  commenterName: string;
  commenterRole: "coach" | "athlete";
  videoTitle: string;
  timestamp?: string;
  commentPreview: string;
  videoUrl: string;
};

export default function VideoCommentEmail({
  recipientName = "Champion",
  commenterName = "Coach Martin",
  commenterRole = "coach",
  videoTitle = "Technique de depart sprint",
  timestamp = "0:45",
  commentPreview = "Excellent positionnement ! Attention a la phase de poussse...",
  videoUrl = "https://impulsion.app/videos/video-123",
}: VideoCommentEmailProps) {
  const roleEmoji = commenterRole === "coach" ? "🎯" : "💬";
  const roleLabel = commenterRole === "coach" ? "votre coach" : "votre athlete";
  const roleLabelEn = commenterRole === "coach" ? "your coach" : "your athlete";

  return (
    <EmailLayout>
      <Preview>
        {commenterName} a commente votre video / {commenterName} commented on
        your video
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
          Nouveau commentaire video ! {roleEmoji}
        </Heading>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textPrimary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          Salut {recipientName},
        </Text>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          <strong style={{ color: EMAIL_COLORS.primary }}>
            {commenterName}
          </strong>
          , {roleLabel}, a laisse un commentaire sur votre video{" "}
          <strong>"{videoTitle}"</strong>.
        </Text>

        {/* Comment Preview Card */}
        <div
          style={{
            backgroundColor: EMAIL_COLORS.cardBackgroundLight,
            borderRadius: "12px",
            padding: "20px",
            margin: "16px 0",
            borderLeft: `4px solid ${EMAIL_COLORS.secondary}`,
          }}
        >
          {timestamp && (
            <Text
              style={{
                fontSize: "12px",
                color: EMAIL_COLORS.primary,
                margin: "0 0 8px 0",
                fontFamily: "monospace",
              }}
            >
              ⏱️ {timestamp}
            </Text>
          )}
          <Text
            style={{
              fontSize: "14px",
              color: EMAIL_COLORS.textSecondary,
              margin: "0",
              fontStyle: "italic",
              lineHeight: "1.5",
            }}
          >
            "{commentPreview}"
          </Text>
        </div>

        <Text
          style={{
            fontSize: "14px",
            color: EMAIL_COLORS.textMuted,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          L'analyse video est essentielle pour progresser. Consultez le
          commentaire complet et repondez directement sur la plateforme.
        </Text>

        <CTAButton href={videoUrl}>Voir la video</CTAButton>

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
          New video comment! {roleEmoji}
        </Heading>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textPrimary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          Hi {recipientName},
        </Text>

        <Text
          style={{
            fontSize: "16px",
            color: EMAIL_COLORS.textSecondary,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          <strong style={{ color: EMAIL_COLORS.primary }}>
            {commenterName}
          </strong>
          , {roleLabelEn}, left a comment on your video{" "}
          <strong>"{videoTitle}"</strong>.
        </Text>

        {/* Comment Preview Card */}
        <div
          style={{
            backgroundColor: EMAIL_COLORS.cardBackgroundLight,
            borderRadius: "12px",
            padding: "20px",
            margin: "16px 0",
            borderLeft: `4px solid ${EMAIL_COLORS.secondary}`,
          }}
        >
          {timestamp && (
            <Text
              style={{
                fontSize: "12px",
                color: EMAIL_COLORS.primary,
                margin: "0 0 8px 0",
                fontFamily: "monospace",
              }}
            >
              ⏱️ {timestamp}
            </Text>
          )}
          <Text
            style={{
              fontSize: "14px",
              color: EMAIL_COLORS.textSecondary,
              margin: "0",
              fontStyle: "italic",
              lineHeight: "1.5",
            }}
          >
            "{commentPreview}"
          </Text>
        </div>

        <Text
          style={{
            fontSize: "14px",
            color: EMAIL_COLORS.textMuted,
            margin: "0 0 16px 0",
            lineHeight: "1.6",
          }}
        >
          Video analysis is essential for progress. Check out the full comment
          and reply directly on the platform.
        </Text>

        <CTAButton href={videoUrl}>View video</CTAButton>

        <Signature lang="en" />
      </BilingualSection>
    </EmailLayout>
  );
}
