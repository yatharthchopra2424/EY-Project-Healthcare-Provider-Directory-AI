import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HealthAI Directory - Provider Data Validation & Management",
  description: "AI-Powered Healthcare Provider Data Validation and Directory Management System. Automate provider data validation with intelligent AI agents achieving 80%+ accuracy.",
  keywords: "healthcare, provider directory, AI, data validation, NPI registry, healthcare payer, provider management",
  authors: [{ name: "HealthAI" }],
  openGraph: {
    title: "HealthAI Directory - Provider Data Validation",
    description: "Transform provider data management with AI-powered validation agents",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-900 text-white`}>{children}</body>
    </html>
  );
}
