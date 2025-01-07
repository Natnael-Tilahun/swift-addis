import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";
import Head from "next/head";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <Head>
        <title>Professional Car Detailing Services | Swift Addis</title>
        <meta
          name="description"
          content="Get high-quality car detailing services at your location. Book now for swift and professional service."
        />
        <meta
          name="keywords"
          content="car detailing, mobile car wash, Addis Ababa, car cleaning services"
        />
        <meta name="author" content="Swift Addis Car Detailing" />

        {/* Open Graph / Social Sharing */}
        <meta
          property="og:title"
          content="Professional Car Detailing Services | Swift Addis"
        />
        <meta
          property="og:description"
          content="Get high-quality car detailing services at your location. Book now!"
        />
        <meta property="og:image" content="/logo.png" />
        <meta property="og:url" content="https://swiftaddisdetailing.com" />
        <meta property="og:type" content="website" />

        {/* Favicon */}
        <link rel="icon" href="/logo.png" />
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased grid grid-rows-[80px_1fr_auto] items-cente justify-items-center min-h-screen gap-0 bg-[#FAFAFA] font-[family-name:var(--font-geist-sans)]`}
      >
        <NextIntlClientProvider messages={messages}>
          <LayoutWrapper>{children}</LayoutWrapper>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
