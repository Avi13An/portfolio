import type { Metadata, Viewport } from "next";
import "./globals.css";

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
    <html lang="en" className="dark bg-black">
      <body className="font-sans bg-black text-neutral-200 min-h-screen antialiased relative overflow-x-hidden selection:bg-emerald-500/20 selection:text-emerald-300">
        {/* Global Atmospheric Ambient Layers */}
        <div className="fixed inset-0 dot-matrix-bg pointer-events-none z-0" />

        {/* 3 Organic, Blurred Ambient Glow Spheres (Emerald, Cyan, Indigo) */}
        <div className="fixed -top-28 left-1/2 -translate-x-1/2 w-[750px] h-[550px] glow-emerald-sphere rounded-full blur-[140px] pointer-events-none animate-float-slow z-0" />
        <div className="fixed top-[35%] -left-48 w-[650px] h-[650px] glow-cyan-sphere rounded-full blur-[160px] pointer-events-none animate-float-reverse z-0" />
        <div className="fixed top-[70%] -right-48 w-[700px] h-[700px] glow-indigo-sphere rounded-full blur-[170px] pointer-events-none animate-float-slow z-0" />

        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
