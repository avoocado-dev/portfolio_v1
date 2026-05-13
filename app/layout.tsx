import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://avoantonio.com"),
  title: {
    default: "Antonio Aguilar Gomez — UX Engineer",
    template: "%s · Antonio Aguilar Gomez",
  },
  description:
    "UX Engineer based in Los Angeles. I sit between design and engineering — turning research into shipped, accessible, AI-augmented enterprise experiences.",
  openGraph: {
    title: "Antonio Aguilar Gomez — UX Engineer",
    description:
      "UX Engineer based in Los Angeles. I sit between design and engineering.",
    url: "https://avoantonio.com",
    siteName: "avoantonio.com",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Antonio Aguilar Gomez — UX Engineer",
    description:
      "UX Engineer based in Los Angeles. I sit between design and engineering.",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f1ea" },
    { media: "(prefers-color-scheme: dark)", color: "#131210" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-contrast"
        >
          Skip to content
        </a>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
