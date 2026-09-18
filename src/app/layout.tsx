import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Avi Tandon | Full-Stack & Systems MVP Developer",
  description:
    "Avi Tandon — Full-Stack & Systems MVP Developer turning ambitious ideas into production-ready MVPs, mobile applications, and native audio/real-time systems.",
  keywords: [
    "Avi Tandon",
    "Full-Stack Developer",
    "Systems MVP Developer",
    "React Native",
    "Expo",
    "MediaCodec",
    "MQTT",
    "Next.js",
    "MVP Development",
  ],
  authors: [{ name: "Avi Tandon", url: "https://github.com/Avi13An" }],
  openGraph: {
    title: "Avi Tandon | Full-Stack & Systems MVP Developer",
    description:
      "Turning ambitious ideas into production-ready MVPs, mobile applications, and real-time audio systems in 2 weeks.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Avi Tandon | Full-Stack & Systems MVP Developer",
    description:
      "Turning ambitious ideas into production-ready MVPs, mobile applications, and real-time audio systems in 2 weeks.",
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
