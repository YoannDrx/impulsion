import { Section } from "@react-email/components";
import type { PropsWithChildren } from "react";

type BilingualSectionProps = PropsWithChildren<{
  lang: "fr" | "en";
}>;

export const BilingualSection = ({ lang, children }: BilingualSectionProps) => {
  return (
    <Section
      dir="ltr"
      style={{
        marginBottom: "8px",
      }}
      data-lang={lang}
    >
      {children}
    </Section>
  );
};
