import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "./agency.css";
import "./agency-pages.css";
import "./world-pages.css";
import "./refinement.css";
import "./mobile-luxury.css";

const sans = Geist({ variable: "--font-sans", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://corporate-gpt.ai"),
  title: { default: "Corporate GPT — Institutional Intelligence That Compounds", template: "%s — Corporate GPT" },
  description: "Company-specific AI that compounds approved knowledge, workflows, and expert methods inside the enterprise boundary.",
  keywords: ["sovereign enterprise AI", "private enterprise AI", "air-gapped AI", "adaptive enterprise intelligence", "Corporate GPT"],
  applicationName: "Corporate GPT",
  creator: "Neurologic AI",
  publisher: "Neurologic AI",
  alternates: { canonical: "/" },
  openGraph: { title: "Corporate GPT — Institutional Intelligence That Compounds", description: "AI Assistants, Governed Agents, and Digital Experts that turn approved outcomes into lasting enterprise capability.", type: "website", siteName: "Corporate GPT", url: "/", images: [{url:"/og-corporate-gpt-adaptive.png",width:1200,height:630,alt:"Corporate GPT — institutional intelligence that compounds"}] },
  twitter: { card:"summary_large_image", title:"Corporate GPT — Institutional Intelligence That Compounds", description:"Own the intelligence that runs your enterprise.", images:["/og-corporate-gpt-adaptive.png"] },
  robots: { index: true, follow: true },
  icons: { icon: "/brand/neurologic-logogram-dark.png", shortcut: "/brand/neurologic-logogram-dark.png" },
};

const organizationJsonLd={"@context":"https://schema.org","@type":"Organization",name:"Neurologic AI",url:"https://www.neurologicai.com",brand:{"@type":"Brand",name:"Corporate GPT"},sameAs:["https://www.neurologicai.com"]};
const productJsonLd={"@context":"https://schema.org","@type":"SoftwareApplication",name:"Corporate GPT",applicationCategory:"BusinessApplication",operatingSystem:"Customer-hosted",url:"https://corporate-gpt.ai",provider:{"@type":"Organization",name:"Neurologic AI",url:"https://www.neurologicai.com"},description:"Adaptive Enterprise Intelligence for AI Assistants, Governed Agents, and Digital Experts inside a customer-controlled boundary."};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) { return <html lang="en"><body className={`${sans.variable} ${mono.variable}`}><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(organizationJsonLd)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(productJsonLd)}}/>{children}</body></html>; }
