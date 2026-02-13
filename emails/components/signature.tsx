import { Text } from "@react-email/components";
import { EMAIL_COLORS, SiteConfig } from "../utils/email-constants";

type SignatureProps = {
  lang: "fr" | "en";
  motivational?: boolean;
};

export const Signature = ({ lang, motivational = false }: SignatureProps) => {
  const closings = {
    fr: motivational ? "On se retrouve sur le terrain !" : "A tres bientot,",
    en: motivational ? "See you on the field!" : "See you soon,",
  };

  const teamName = {
    fr: `L'equipe ${SiteConfig.title}`,
    en: `The ${SiteConfig.title} Team`,
  };

  const motivationalQuotes = {
    fr: "Push your limits. Exceed your goals.",
    en: "Push your limits. Exceed your goals.",
  };

  return (
    <div style={{ marginTop: "24px" }}>
      {motivational && (
        <Text
          style={{
            fontSize: "14px",
            color: EMAIL_COLORS.primary,
            fontWeight: 600,
            fontStyle: "italic",
            margin: "0 0 8px 0",
            lineHeight: "1.6",
          }}
        >
          "{motivationalQuotes[lang]}"
        </Text>
      )}
      <Text
        style={{
          fontSize: "14px",
          color: EMAIL_COLORS.textSecondary,
          margin: "0",
          lineHeight: "1.6",
        }}
      >
        {closings[lang]}
        <br />
        <span style={{ color: EMAIL_COLORS.primary, fontWeight: 600 }}>
          {teamName[lang]}
        </span>
      </Text>
    </div>
  );
};
