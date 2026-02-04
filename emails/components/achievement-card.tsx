import { Text } from "@react-email/components";
import { EMAIL_COLORS } from "../utils/email-constants";

type AchievementCardProps = {
  title: string;
  description: string;
  icon?: string;
  level?: "bronze" | "silver" | "gold";
  points?: number;
};

const getLevelColor = (level?: "bronze" | "silver" | "gold") => {
  switch (level) {
    case "gold":
      return EMAIL_COLORS.gold;
    case "silver":
      return EMAIL_COLORS.silver;
    case "bronze":
      return EMAIL_COLORS.bronze;
    default:
      return EMAIL_COLORS.primary;
  }
};

export const AchievementCard = ({
  title,
  description,
  icon = "🏆",
  level,
  points,
}: AchievementCardProps) => {
  const borderColor = getLevelColor(level);

  return (
    <div
      style={{
        backgroundColor: EMAIL_COLORS.cardBackgroundLight,
        borderRadius: "12px",
        padding: "24px",
        margin: "16px 0",
        border: `2px solid ${borderColor}`,
        textAlign: "center",
      }}
    >
      <Text
        style={{
          fontSize: "48px",
          margin: "0 0 12px 0",
          lineHeight: "1",
        }}
      >
        {icon}
      </Text>
      <Text
        style={{
          fontSize: "20px",
          fontWeight: 700,
          color: borderColor,
          margin: "0 0 8px 0",
          textTransform: "uppercase",
          letterSpacing: "1px",
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontSize: "14px",
          color: EMAIL_COLORS.textSecondary,
          margin: "0",
          lineHeight: "1.5",
        }}
      >
        {description}
      </Text>
      {points && (
        <Text
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: EMAIL_COLORS.primary,
            margin: "12px 0 0 0",
          }}
        >
          +{points} XP
        </Text>
      )}
    </div>
  );
};

// Streak milestone card
type StreakCardProps = {
  days: number;
  lang: "fr" | "en";
};

export const StreakCard = ({ days, lang }: StreakCardProps) => {
  const titles = {
    fr: `${days} jours consecutifs !`,
    en: `${days} consecutive days!`,
  };

  const descriptions = {
    fr: "Votre regularite est impressionnante. Continuez sur cette lancee !",
    en: "Your consistency is impressive. Keep up the momentum!",
  };

  const getStreakEmoji = () => {
    if (days >= 100) return "💯";
    if (days >= 30) return "🔥";
    if (days >= 7) return "⚡";
    return "✨";
  };

  return (
    <AchievementCard
      title={titles[lang]}
      description={descriptions[lang]}
      icon={getStreakEmoji()}
      level={days >= 30 ? "gold" : days >= 7 ? "silver" : "bronze"}
      points={days * 10}
    />
  );
};

// Level up card
type LevelUpCardProps = {
  newLevel: number;
  levelName: string;
  lang: "fr" | "en";
};

export const LevelUpCard = ({
  newLevel,
  levelName,
  lang,
}: LevelUpCardProps) => {
  const titles = {
    fr: `Niveau ${newLevel} atteint !`,
    en: `Level ${newLevel} reached!`,
  };

  const descriptions = {
    fr: `Felicitations ! Vous etes maintenant "${levelName}"`,
    en: `Congratulations! You are now "${levelName}"`,
  };

  return (
    <AchievementCard
      title={titles[lang]}
      description={descriptions[lang]}
      icon="🚀"
      level="gold"
    />
  );
};
