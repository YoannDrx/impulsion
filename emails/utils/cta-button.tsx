import { Button } from "@react-email/components";
import { EMAIL_COLORS } from "./email-constants";

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "success" | "warning";
};

export const CTAButton = ({
  href,
  children,
  variant = "primary",
}: CTAButtonProps) => {
  const getStyles = () => {
    switch (variant) {
      case "secondary":
        return {
          backgroundColor: EMAIL_COLORS.secondary,
          color: EMAIL_COLORS.textOnPrimary,
        };
      case "outline":
        return {
          backgroundColor: "transparent",
          color: EMAIL_COLORS.primary,
          border: `2px solid ${EMAIL_COLORS.primary}`,
        };
      case "success":
        return {
          backgroundColor: EMAIL_COLORS.success,
          color: "#FFFFFF",
        };
      case "warning":
        return {
          backgroundColor: EMAIL_COLORS.warning,
          color: EMAIL_COLORS.textOnPrimary,
        };
      default:
        return {
          backgroundColor: EMAIL_COLORS.primary,
          color: EMAIL_COLORS.textOnPrimary,
        };
    }
  };

  const styles = getStyles();

  return (
    <Button
      href={href}
      style={{
        display: "inline-block",
        padding: "14px 28px",
        borderRadius: "8px",
        fontWeight: 700,
        fontSize: "16px",
        textDecoration: "none",
        textAlign: "center",
        marginTop: "16px",
        marginBottom: "16px",
        textTransform: "uppercase",
        letterSpacing: "0.5px",
        ...styles,
      }}
    >
      {children}
    </Button>
  );
};
