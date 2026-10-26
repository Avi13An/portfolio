import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroAnimation } from "@/components/HeroAnimation";
import { WebsiteRevamp } from "@/components/WebsiteRevamp";
import { SukoonCaseStudy } from "@/components/SukoonCaseStudy";
import { ServicesGrid } from "@/components/ServicesGrid";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { ProjectIntake } from "@/components/ProjectIntake";
import { Footer } from "@/components/Footer";
import { ScrollProgress } from "@/components/ScrollProgress";
import { FloatingDock } from "@/components/FloatingDock";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-violet-500/30 selection:text-white relative">
      {/* Real-Time Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Top Fixed Navigation */}
      <Navbar />

      {/* 1. HERO REEL ANIMATION: 5-Phase Choreography */}
      <HeroAnimation />

      {/* 2. LIVE BENTHAM REVAMP SHOWCASE: Interactive Split Slider & Side-by-Side */}
      <WebsiteRevamp />

      {/* 3. FEATURED CASE STUDY: Sukoon Music Engine */}
      <SukoonCaseStudy />

      {/* 4. WHAT I BUILD: Services Grid */}
      <ServicesGrid />

      {/* 5. THE 2-WEEK DELIVERY PROCESS */}
      <ProcessTimeline />

      {/* 6. PROJECT INTAKE SECTION */}
      <ProjectIntake />

      {/* FOOTER */}
      <Footer />

      {/* Persistent Floating Quick-Contact Dock */}
      <FloatingDock />
    </main>
  );
}
