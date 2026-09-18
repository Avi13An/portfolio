"use client";

import React, { useState } from "react";
import {
  Rocket,
  Smartphone,
  Radio,
  Layers,
  ArrowUpRight,
  Check,
  Zap,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";

const EASE_CUSTOM: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  hasBorderBeam?: boolean;
}

function BentoCard({
  children,
  className = "",
  spotlightColor = "rgba(16, 185, 129, 0.15)",
  hasBorderBeam = false,
}: BentoCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -6, scale: 1.015 }}
      transition={{ duration: 0.35, ease: EASE_CUSTOM }}
      className={`group relative rounded-3xl bg-[#080808] border border-white/[0.08] p-6 sm:p-7 transition-colors duration-300 hover:border-white/20 overflow-hidden h-full flex flex-col justify-between ${className}`}
    >
      {/* Animated Glowing Border Beam for Flagship Card */}
      {hasBorderBeam && (
        <div className="absolute -inset-[100%] animate-spin-slow opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(16,185,129,0.8)_120deg,transparent_180deg)] pointer-events-none" />
      )}

      {/* Interactive Cursor Following Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(450px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />

      <div className="relative z-10 flex flex-col justify-between h-full">{children}</div>
    </motion.div>
  );
}

export function ServicesGrid() {
  const packages = [
    {
      id: "lean-core",
      name: "Lean Core MVP",
      tagline: "Ideal for validation. Full-stack production app ready for paying customers and investor pitches.",
      price: "₹10,000 – ₹18,000",
      turnaround: "7–10 Days",
      badge: "Most Popular",
      icon: Rocket,
      chips: [
        "Full-Stack Next.js 15 App Router",
        "PostgreSQL / Supabase Schema & Auth",
        "Stripe / Razorpay Payment Webhooks",
        "High-Converting Tailwind Design",
        "Automated CI/CD & Vercel Edge Deploy",
      ],
      colSpan: "lg:col-span-7",
      spotlight: "rgba(16, 185, 129, 0.22)",
      accentColor: "text-emerald-400",
      badgeClass: "bg-emerald-950/60 border-emerald-500/40 text-emerald-300",
      highlight: true,
      hasBorderBeam: true,
    },
    {
      id: "mobile-app",
      name: "Mobile Applications",
      tagline: "Native iOS & Android from a single codebase with 60/120fps fluid gestures and custom native bridges.",
      price: "₹20,000 – ₹30,000",
      turnaround: "2 Weeks",
      badge: "iOS & Android",
      icon: Smartphone,
      chips: [
        "Expo 57 / React Native Codebase",
        "Custom Native Kotlin / Swift Bridges",
        "Offline-First Caching via MMKV",
        "EAS Store Submission Pipelines",
      ],
      colSpan: "lg:col-span-5",
      spotlight: "rgba(6, 182, 212, 0.2)",
      accentColor: "text-cyan-400",
      badgeClass: "bg-cyan-950/60 border-cyan-500/40 text-cyan-300",
      highlight: false,
      hasBorderBeam: false,
    },
    {
      id: "prototype",
      name: "Starter / Prototype",
      tagline: "Functional proof-of-concept and high-converting landing page to rapidly validate your thesis.",
      price: "₹5,000 – ₹8,000",
      turnaround: "2–4 Days",
      badge: "Fast Validation",
      icon: Layers,
      chips: [
        "Clickable Interactive UI in Tailwind",
        "Waitlist / Lead Capture Integration",
        "Database Architecture Blueprint",
        "Live Production URL on Vercel",
      ],
      colSpan: "lg:col-span-5",
      spotlight: "rgba(16, 185, 129, 0.16)",
      accentColor: "text-emerald-400",
      badgeClass: "bg-zinc-900 border-white/10 text-zinc-300",
      highlight: false,
      hasBorderBeam: false,
    },
    {
      id: "realtime",
      name: "Multi-Feature System",
      tagline: "Low-latency streaming engines, WebSockets, and HiveMQ MQTT with sub-100ms drift sync.",
      price: "₹20,000 – ₹30,000",
      turnaround: "2 Weeks",
      badge: "Flagship Architecture",
      icon: Radio,
      chips: [
        "HiveMQ MQTT & WebSocket Pipelines",
        "Raw 44.1kHz Hardware Audio / Media",
        "Sub-100ms Clock Drift Compensation",
        "Stress-Tested for 10k+ Concurrency",
      ],
      colSpan: "lg:col-span-7",
      spotlight: "rgba(139, 92, 246, 0.2)",
      accentColor: "text-violet-400",
      badgeClass: "bg-violet-950/60 border-violet-500/40 text-violet-300",
      highlight: false,
      hasBorderBeam: false,
    },
  ];

  const gridContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const gridItemVariants: Variants = {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE_CUSTOM },
    },
  };

  return (
    <section id="services" className="py-24 bg-black relative border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE_CUSTOM }}
          className="max-w-2xl mx-auto text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-zinc-300 text-xs font-mono mb-4">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>SPRINT TIERS &amp; SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-tight heading-metallic">
            What I Build
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 font-mono">
            Predictable 2-week MVP sprints with transparent INR pricing. No hourly billing.
          </p>
        </motion.div>

        {/* Asymmetrical Bento Grid with Staggered Scroll Cascades */}
        <motion.div
          variants={gridContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-5"
        >
          {packages.map((pkg) => {
            const Icon = pkg.icon;
            return (
              <motion.div key={pkg.id} variants={gridItemVariants} className={pkg.colSpan}>
                <BentoCard
                  spotlightColor={pkg.spotlight}
                  hasBorderBeam={pkg.hasBorderBeam}
                  className={pkg.highlight ? "border-emerald-500/40 shadow-[0_0_35px_rgba(16,185,129,0.12)]" : ""}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-10 h-10 rounded-xl bg-neutral-950 border border-white/10 flex items-center justify-center text-white shadow-inner">
                        <Icon className={`w-5 h-5 ${pkg.accentColor}`} />
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${pkg.badgeClass}`}>
                        {pkg.badge}
                      </span>
                    </div>

                    {/* Title & Price */}
                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {pkg.name}
                      </h3>
                      <span className={`text-sm sm:text-base font-extrabold font-mono shrink-0 ${pkg.accentColor}`}>
                        {pkg.price}
                      </span>
                    </div>

                    <p className="text-xs text-neutral-400 font-mono leading-relaxed mb-5">
                      {pkg.tagline}
                    </p>

                    {/* Deliverables Bullet Chips */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                      {pkg.chips.map((chip, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2 rounded-xl bg-black/60 border border-white/5 text-xs font-mono text-neutral-300"
                        >
                          <Check className={`w-3.5 h-3.5 ${pkg.accentColor} shrink-0`} />
                          <span className="truncate">{chip}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-neutral-500">
                      Turnaround: {pkg.turnaround}
                    </span>
                    <a
                      href="#intake"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-white hover:text-emerald-400 transition-colors font-medium group/link"
                    >
                      <span>Start Sprint</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </BentoCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
