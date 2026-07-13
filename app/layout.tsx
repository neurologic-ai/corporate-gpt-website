import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./agency.css";
import "./agency-pages.css";
import "./world-pages.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Corporate GPT — The AI that learns your company", template: "%s — Corporate GPT" },
  description: "Adaptive Enterprise Intelligence that runs entirely inside your infrastructure, cites every claim, and gets measurably smarter every quarter.",
  keywords: ["sovereign enterprise AI", "private enterprise AI", "air-gapped AI", "adaptive enterprise intelligence", "Corporate GPT"],
  openGraph: { title: "Corporate GPT — The AI that learns your company", description: "Runs inside your infrastructure. Cites every claim. Gets measurably smarter every quarter.", type: "website" },
  robots: { index: true, follow: true },
  other: { "codex-preview": "development" },
  icons: { icon: "/brand/neurologic-logogram-dark.png", shortcut: "/brand/neurologic-logogram-dark.png" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={`${sans.variable} ${mono.variable}`}>{children}</body></html>; }
