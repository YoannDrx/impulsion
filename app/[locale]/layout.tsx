import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/navigation";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  modal: ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, modal, params }: Props) {
  const { locale } = await params;

  // Validate locale
  if (!routing.locales.includes(locale as "fr" | "en")) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Get messages for NextIntlClientProvider
  const messages = await getMessages();

  return (
    <NextIntlClientProvider messages={messages}>
      {children}
      {modal}
    </NextIntlClientProvider>
  );
}
