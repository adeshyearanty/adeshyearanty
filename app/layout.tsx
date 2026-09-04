import type { Metadata } from "next";
import { Instrument_Sans, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SiteNav } from "@/app/_components/site-nav";
import { SiteFooter } from "@/app/_components/site-footer";
import { ChatAssistant } from "@/app/_components/chat-assistant";
import { GoogleAnalytics } from '@next/third-parties/google';

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

const mono = Geist_Mono({
  variable: "--font-mono-geist",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Adesh Yearanty — Full Stack Developer",
    template: "%s — Adesh Yearanty",
  },
  description:
    "Adesh Yearanty builds event-driven, multi-tenant systems — real-time messaging infrastructure, fine-grained access control, and cloud-native platforms on NestJS, Next.js, and AWS.",
  metadataBase: new URL("https://adeshyearanty.vercel.app"),
  openGraph: {
    title: "Adesh Yearanty — Full Stack Developer",
    description:
      "Full stack developer building event-driven, multi-tenant systems on NestJS, Next.js, and AWS.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Adesh Yearanty — Full Stack Developer",
    description:
      "Full stack developer building event-driven, multi-tenant systems on NestJS, Next.js, and AWS.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${instrument.variable} ${mono.variable} h-full`}
    >
      <body className="flex min-h-full flex-col bg-base">
        <SiteNav />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <ChatAssistant />
        <GoogleAnalytics gaId="G-L2Q4Y88SER" />
      </body>
    </html>
  );
}
