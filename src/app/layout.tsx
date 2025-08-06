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
  openGraph: {
    title: "Adesh Yearanty - Full-Stack Developer",
    description:
      "Portfolio of Yearanty Sri Sai Adesh - Full-Stack Developer and Computer Science Engineer",
    type: "website",
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
