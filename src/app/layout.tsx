import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Adesh Yearanty - Full-Stack Developer",
  description:
    "Portfolio of Yearanty Sri Sai Adesh - Full-Stack Developer and Computer Science Engineer",
  keywords:
    "Full-Stack Developer, React, Next.js, NestJS, JavaScript, TypeScript, Portfolio",
  authors: [{ name: "Yearanty Sri Sai Adesh" }],
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/logo.png", type: "image/png", sizes: "32x32" },
    ],
    apple: "/logo.png",
  },
  openGraph: {
    title: "Adesh Yearanty - Full-Stack Developer",
    description:
      "Portfolio of Yearanty Sri Sai Adesh - Full-Stack Developer and Computer Science Engineer",
    type: "website",
    url: "https://adeshyearanty.vercel.app",
    siteName: "Adesh Yearanty Portfolio",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Adesh Yearanty Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Adesh Yearanty - Full-Stack Developer",
    description:
      "Portfolio of Yearanty Sri Sai Adesh - Full-Stack Developer and Computer Science Engineer",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
