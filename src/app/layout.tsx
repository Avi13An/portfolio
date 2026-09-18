import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Engineering Portfolio | Production-Ready MVPs & Native Audio Systems",
  description:
    "I turn ambitious ideas into production-ready MVPs and mobile/web applications. Specialized in high-performance streaming, real-time audio engines, and rapid 2-week deployments.",
  keywords: [
    "Full-Stack Developer",
    "React Native",
    "Expo",
    "Audio Engineering",
    "MediaCodec",
    "MQTT",
    "Next.js",
    "MVP Development",
    "Software Engineer",
  ],
  authors: [{ name: "Avi Tandon" }],
  openGraph: {
    title: "Engineering Portfolio | Production-Ready MVPs & Real-Time Systems",
    description:
      "Turning ambitious ideas into production-ready MVPs, mobile applications, and native audio pipelines in 2 weeks.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Engineering Portfolio | Production-Ready MVPs",
    description:
      "Full-stack development, native audio pipelines, and high-performance real-time applications.",
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
      <body className="font-sans bg-black text-zinc-100 min-h-screen antialiased selection:bg-emerald-500/20 selection:text-emerald-300">
        {children}
      </body>
    </html>
  );
}
