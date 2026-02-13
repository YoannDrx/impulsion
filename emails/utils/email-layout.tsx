import {
  Body,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Link,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";
import type { PropsWithChildren } from "react";
import {
  CONTACT_EMAIL,
  EMAIL_COLORS,
  EMAIL_FONTS,
  EMAIL_URLS,
  SiteConfig,
} from "./email-constants";

type EmailLayoutProps = PropsWithChildren<{
  disableTailwind?: boolean;
}>;

/**
 * EmailLayout is the main layout for all Impulsion emails.
 * Dark theme with lime/cyan accents for sport performance branding.
 *
 * @param props.children The email content
 * @param props.disableTailwind If true, children are rendered without Tailwind CSS
 */
export const EmailLayout = ({
  children,
  disableTailwind,
}: EmailLayoutProps) => {
  const logoUrl = EMAIL_URLS.logo();

  return (
    <Html>
      <Head />
      <Body
        style={{
          backgroundColor: EMAIL_COLORS.background,
          fontFamily: EMAIL_FONTS.primary,
          margin: 0,
          padding: 0,
        }}
      >
        <Container
          style={{
            maxWidth: "600px",
            margin: "0 auto",
            padding: "40px 20px",
          }}
        >
          {/* Email Card */}
          <div
            style={{
              backgroundColor: EMAIL_COLORS.cardBackground,
              borderRadius: "16px",
              boxShadow: "0 4px 24px rgba(0, 0, 0, 0.4)",
              overflow: "hidden",
              border: `1px solid ${EMAIL_COLORS.border}`,
            }}
          >
            {/* Header with gradient accent */}
            <div
              style={{
                background: `linear-gradient(135deg, ${EMAIL_COLORS.primary}15, ${EMAIL_COLORS.secondary}10)`,
                padding: "32px 32px 24px",
                borderBottom: `1px solid ${EMAIL_COLORS.border}`,
              }}
            >
              <table cellPadding={0} cellSpacing={0} style={{ width: "100%" }}>
                <tr>
                  <td style={{ paddingRight: "12px", width: "48px" }}>
                    <Img
                      src={logoUrl}
                      width={48}
                      height={48}
                      alt={`${SiteConfig.title} logo`}
                      style={{
                        borderRadius: "12px",
                        border: `2px solid ${EMAIL_COLORS.primary}`,
                      }}
                    />
                  </td>
                  <td>
                    <Text
                      style={{
                        fontSize: "28px",
                        fontWeight: 800,
                        color: EMAIL_COLORS.primary,
                        margin: 0,
                        letterSpacing: "-0.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      {SiteConfig.title}
                    </Text>
                    <Text
                      style={{
                        fontSize: "12px",
                        color: EMAIL_COLORS.secondary,
                        margin: 0,
                        textTransform: "uppercase",
                        letterSpacing: "2px",
                      }}
                    >
                      Elevate Your Training
                    </Text>
                  </td>
                </tr>
              </table>
            </div>

            {/* Content */}
            <div style={{ padding: "32px" }}>
              {disableTailwind ? children : <Tailwind>{children}</Tailwind>}
            </div>

            {/* Footer */}
            <div
              style={{
                padding: "24px 32px",
                backgroundColor: EMAIL_COLORS.background,
                borderTop: `1px solid ${EMAIL_COLORS.border}`,
              }}
            >
              <table cellPadding={0} cellSpacing={0} style={{ width: "100%" }}>
                <tr>
                  <td style={{ paddingRight: "12px", width: "32px" }}>
                    <Img
                      src={logoUrl}
                      width={32}
                      height={32}
                      alt={`${SiteConfig.title} logo`}
                      style={{
                        borderRadius: "8px",
                      }}
                    />
                  </td>
                  <td>
                    <Text
                      style={{
                        fontSize: "16px",
                        fontWeight: 700,
                        color: EMAIL_COLORS.textPrimary,
                        margin: 0,
                      }}
                    >
                      {SiteConfig.title}
                    </Text>
                  </td>
                </tr>
              </table>

              <Hr
                style={{
                  borderColor: EMAIL_COLORS.border,
                  margin: "16px 0",
                }}
              />

              <Text
                style={{
                  fontSize: "12px",
                  color: EMAIL_COLORS.textMuted,
                  margin: "0 0 8px 0",
                  lineHeight: "1.5",
                }}
              >
                Cet email a ete envoye par {SiteConfig.title}. Si vous avez des
                questions, contactez-nous a{" "}
                <Link
                  href={`mailto:${CONTACT_EMAIL}`}
                  style={{ color: EMAIL_COLORS.primary }}
                >
                  {CONTACT_EMAIL}
                </Link>
                .
              </Text>

              <Text
                style={{
                  fontSize: "12px",
                  color: EMAIL_COLORS.textMuted,
                  margin: "0 0 8px 0",
                  lineHeight: "1.5",
                }}
              >
                This email was sent by {SiteConfig.title}. If you have any
                questions, contact us at{" "}
                <Link
                  href={`mailto:${CONTACT_EMAIL}`}
                  style={{ color: EMAIL_COLORS.primary }}
                >
                  {CONTACT_EMAIL}
                </Link>
                .
              </Text>

              {SiteConfig.company.address && (
                <Text
                  style={{
                    fontSize: "12px",
                    color: EMAIL_COLORS.textMuted,
                    margin: "12px 0 0 0",
                  }}
                >
                  {SiteConfig.company.name} • {SiteConfig.company.address}
                </Text>
              )}
            </div>
          </div>
        </Container>
      </Body>
    </Html>
  );
};
