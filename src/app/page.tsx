import React from "react";
import { Navbar } from "@/components/Navbar";
import { HeroAnimation } from "@/components/HeroAnimation";
import { ProofOfWork } from "@/components/ProofOfWork";
import { ServicesGrid } from "@/components/ServicesGrid";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { ProjectIntake } from "@/components/ProjectIntake";
import { ScrollProgress } from "@/components/ScrollProgress";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-white/20 selection:text-white relative">
      {/* Real-Time Scroll Progress Indicator */}
      <ScrollProgress />

      {/* Top Fixed Navigation */}
      <Navbar />

      {/* 1. HERO REEL ANIMATION: 5-Phase Choreography */}
      <HeroAnimation />

      {/* Hairline Gradient Separator */}
      <div className="w-full max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-white/12 to-transparent my-16 sm:my-24" />

      {/* 2. UNIFIED PROOF OF WORK HUB: Bentham Web Revamp + Sukoon Mobile Engine */}
      <ProofOfWork />

      {/* Hairline Gradient Separator */}
      <div className="w-full max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-white/12 to-transparent my-16 sm:my-24" />

      {/* 3. WHAT I BUILD: Services Grid */}
      <ServicesGrid />

      {/* Hairline Gradient Separator */}
      <div className="w-full max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-white/12 to-transparent my-16 sm:my-24" />

      {/* 4. THE 2-WEEK DELIVERY PROCESS */}
      <ProcessTimeline />

      {/* Hairline Gradient Separator */}
      <div className="w-full max-w-6xl mx-auto h-px bg-gradient-to-r from-transparent via-white/12 to-transparent my-16 sm:my-24" />

      {/* 5. PROJECT INTAKE SECTION */}
      <ProjectIntake />
    </main>
  );
}
