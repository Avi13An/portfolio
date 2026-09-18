import React from "react";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { SukoonCaseStudy } from "@/components/SukoonCaseStudy";
import { ServicesGrid } from "@/components/ServicesGrid";
import { ProcessTimeline } from "@/components/ProcessTimeline";
import { ProjectIntake } from "@/components/ProjectIntake";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-emerald-500/20 selection:text-emerald-300">
      {/* Top Fixed Navigation */}
      <Navbar />

      {/* 1. HERO SECTION */}
      <Hero />

      {/* 2. FEATURED CASE STUDY: Sukoon Music Engine */}
      <SukoonCaseStudy />

      {/* 3. WHAT I BUILD: Services Grid */}
      <ServicesGrid />

      {/* 4. THE 2-WEEK DELIVERY PROCESS */}
      <ProcessTimeline />

      {/* 5. PROJECT INTAKE SECTION */}
      <ProjectIntake />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
