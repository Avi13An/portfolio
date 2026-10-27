import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { SpotlightBackground } from "@/components/ui/spotlight-background";
import "./globals.css";

const customFont = localFont({
  src: "./fonts/LibrevilleFree-K7YjX.otf",
  variable: "--font-custom",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Avi Tandon | Full-Stack & Systems MVP Developer",
  description:
    "Avi Tandon — Full-Stack & Systems MVP Developer building production-ready MVPs that feel fast, refined, and alive.",
  keywords: [
    "Avi Tandon",
    "Full-Stack Developer",
    "Systems MVP Developer",
    "React Native",
    "Expo",
    "MediaCodec",
    "MQTT",
    "Next.js",
    "MVP Sprints",
  ],
  authors: [{ name: "Avi Tandon", url: "https://github.com/Avi13An" }],
  openGraph: {
    title: "Avi Tandon | Full-Stack & Systems MVP Developer",
    description:
      "Full-stack web & native mobile architecture. Taking product ideas from initial schema to live production in 2 weeks.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avi Tandon | Full-Stack & Systems MVP Developer",
    description:
      "Full-stack web & native mobile architecture. Taking product ideas from initial schema to live production in 2 weeks.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={customFont.variable}>
      <body
        className={`${customFont.className} bg-black text-white antialiased selection:bg-white/20 selection:text-white min-h-screen relative overflow-x-hidden`}
      >
        {/* Global Atmospheric Ambient Layers */}
        <div className="fixed inset-0 dot-matrix-bg pointer-events-none z-0" />
        <SpotlightBackground />

        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
