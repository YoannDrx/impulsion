import { TailwindIndicator } from "@/components/utils/tailwind-indicator";
import { FloatingLegalFooter } from "@/features/legal/floating-legal-footer";
import { NextTopLoader } from "@/features/page/next-top-loader";
import { ServerToaster } from "@/features/server-sonner/server-toaster";
import { getServerUrl } from "@/lib/server-url";
import { cn } from "@/lib/utils";
import { SiteConfig } from "@/site-config";
import { routing } from "@/i18n/navigation";
import type { Metadata } from "next";
import { Geist_Mono, Inter, Space_Grotesk } from "next/font/google";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import "./globals.css";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: SiteConfig.title,
  description: SiteConfig.description,
  metadataBase: new URL(getServerUrl()),
};

const CaptionFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-caption",
});

const GeistSans = Inter({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const GeistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

type Props = {
  children: React.ReactNode;
  params?: Promise<{ locale?: string }>;
};

export default async function RootLayout({ children, params }: Props) {
  // Get locale from params or use default
  const resolvedParams = await params;
  const locale = resolvedParams?.locale ?? routing.defaultLocale;

  return (
    <html lang={locale} className="h-full" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={cn(
          "bg-background h-full font-sans antialiased",
          GeistMono.variable,
          GeistSans.variable,
          CaptionFont.variable,
        )}
      >
        <NuqsAdapter>
          <Providers>
            <NextTopLoader
              delay={100}
              showSpinner={false}
              color="hsl(var(--primary))"
            />
            <Suspense fallback={null}>{children}</Suspense>
            <TailwindIndicator />
            <FloatingLegalFooter />
            <Suspense>
              <ServerToaster />
            </Suspense>
          </Providers>
        </NuqsAdapter>
      </body>
    </html>
  );
}
