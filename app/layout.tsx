import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Tavixo — Cartes de visite NFC",
    template: "%s | Tavixo",
  },
  description:
    "Tavixo propose des cartes de visite NFC intelligentes pour partager instantanément votre identité professionnelle.",
  keywords: [
    "Tavixo",
    "carte NFC",
    "carte de visite NFC",
    "carte de visite digitale",
    "smart business card",
  ],
  authors: [{ name: "Tavixo" }],
  creator: "Tavixo",
  openGraph: {
    title: "Tavixo — Cartes de visite NFC",
    description:
      "Partagez votre identité professionnelle instantanément avec une carte Tavixo.",
    type: "website",
    locale: "fr_FR",
    siteName: "Tavixo",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}