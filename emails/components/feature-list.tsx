import { Text } from "@react-email/components";
import { EMAIL_COLORS } from "../utils/email-constants";

type FeatureItem = {
  fr: string;
  en: string;
};

type FeatureListProps = {
  features: FeatureItem[];
  lang: "fr" | "en";
  title?: {
    fr: string;
    en: string;
  };
  icon?: string;
};

export const FeatureList = ({
  features,
  lang,
  title,
  icon,
}: FeatureListProps) => {
  return (
    <div style={{ margin: "16px 0" }}>
      {title && (
        <Text
          style={{
            fontSize: "16px",
            fontWeight: 600,
            color: EMAIL_COLORS.textPrimary,
            margin: "0 0 12px 0",
          }}
        >
          {title[lang]}
        </Text>
      )}
      <ul
        style={{
          margin: "0",
          padding: "0",
          listStyleType: "none",
        }}
      >
        {features.map((feature, index) => (
          <li
            key={index}
            style={{
              fontSize: "15px",
              color: EMAIL_COLORS.textSecondary,
              marginBottom: "8px",
              lineHeight: "1.5",
              paddingLeft: "24px",
              position: "relative",
            }}
          >
            <span
              style={{
                position: "absolute",
                left: "0",
                color: EMAIL_COLORS.primary,
              }}
            >
              {icon ?? "⚡"}
            </span>
            {feature[lang]}
          </li>
        ))}
      </ul>
    </div>
  );
};

// Pro plan features for Impulsion
export const PRO_FEATURES: FeatureItem[] = [
  { fr: "Athletes illimites", en: "Unlimited athletes" },
  {
    fr: "Videos illimitees avec analyse",
    en: "Unlimited videos with analysis",
  },
  {
    fr: "Programmation d'entrainement avancee",
    en: "Advanced training programming",
  },
  {
    fr: "Statistiques et analytics detailles",
    en: "Detailed statistics and analytics",
  },
  { fr: "Export PDF des programmes", en: "PDF program export" },
  { fr: "Support prioritaire", en: "Priority support" },
];

// Free plan limitations
export const FREE_LIMITATIONS: FeatureItem[] = [
  { fr: "Athletes : limite a 5", en: "Athletes: limited to 5" },
  { fr: "Videos : 10/mois max", en: "Videos: 10/month max" },
  { fr: "Taille video : 100 MB max", en: "Video size: 100 MB max" },
  { fr: "Programmation basique", en: "Basic programming" },
];

// Coach features
export const COACH_FEATURES: FeatureItem[] = [
  { fr: "Gerer votre equipe d'athletes", en: "Manage your athlete team" },
  { fr: "Analyser les videos d'entrainement", en: "Analyze training videos" },
  {
    fr: "Creer des programmes personnalises",
    en: "Create personalized programs",
  },
  {
    fr: "Suivre la progression en temps reel",
    en: "Track progress in real-time",
  },
];

// Athlete features
export const ATHLETE_FEATURES: FeatureItem[] = [
  {
    fr: "Recevoir vos programmes d'entrainement",
    en: "Receive your training programs",
  },
  {
    fr: "Soumettre vos videos pour analyse",
    en: "Submit your videos for analysis",
  },
  { fr: "Suivre votre progression", en: "Track your progress" },
  { fr: "Communiquer avec votre coach", en: "Communicate with your coach" },
];
