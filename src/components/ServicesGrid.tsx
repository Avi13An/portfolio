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
      className={`group relative rounded-3xl bg-zinc-950/85 backdrop-blur-xl border p-6 sm:p-7 transition-all duration-300 overflow-hidden h-full flex flex-col justify-between ${className}`}
    >
      {/* Animated Glowing Border Beam for Flagship Card */}
      {hasBorderBeam && (
        <div className="absolute -inset-[100%] animate-spin-slow opacity-0 group-hover:opacity-40 transition-opacity duration-500 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(139,92,246,0.8)_120deg,transparent_180deg)] pointer-events-none" />
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
      tagline: "Full-stack web application ready for paying customers and investor demos.",
      price: "₹10,000 – ₹18,000",
      turnaround: "7–10 Days",
      badge: "Flagship Sprint",
      icon: Rocket,
      chips: [
        "Full-Stack Next.js 15 App Router",
        "PostgreSQL & Supabase Architecture",
        "Stripe & Razorpay Payment Webhooks",
        "Automated CI/CD & Vercel Edge Launch",
      ],
      colSpan: "lg:col-span-7",
      spotlight: "rgba(139, 92, 246, 0.25)",
      accentColor: "text-violet-400",
      badgeClass: "bg-violet-950/70 border-violet-500/40 text-violet-300",
      borderClass: "border-violet-500/40 hover:border-violet-400/80 shadow-[0_0_35px_-5px_rgba(139,92,246,0.25)]",
      highlight: true,
      hasBorderBeam: true,
    },
    {
      id: "mobile-app",
      name: "Mobile Applications",
      tagline: "Fluid cross-platform iOS & Android mobile apps with custom native modules.",
      price: "₹20,000 – ₹30,000",
      turnaround: "2 Weeks",
      badge: "iOS & Android",
      icon: Smartphone,
      chips: [
        "Expo 57 & React Native Codebase",
        "Custom Native Kotlin & Swift Bridges",
        "Offline-First C++ MMKV Caching",
        "Automated EAS Store Pipelines",
      ],
      colSpan: "lg:col-span-5",
      spotlight: "rgba(6, 182, 212, 0.22)",
      accentColor: "text-cyan-400",
      badgeClass: "bg-cyan-950/70 border-cyan-500/40 text-cyan-300",
      borderClass: "border-cyan-500/30 hover:border-cyan-400/80 shadow-[0_0_30px_-5px_rgba(6,182,212,0.2)]",
      highlight: false,
      hasBorderBeam: false,
    },
    {
      id: "prototype",
      name: "Starter / Prototype",
      tagline: "Interactive proof-of-concept and high-converting landing page to validate your thesis.",
      price: "₹5,000 – ₹8,000",
      turnaround: "2–4 Days",
      badge: "Fast Validation",
      icon: Layers,
      chips: [
        "Clickable Interactive Tailwind UI",
        "Waitlist & Lead Capture Integration",
        "Database Architecture Blueprint",
        "Live Production URL Deployment",
      ],
      colSpan: "lg:col-span-5",
      spotlight: "rgba(16, 185, 129, 0.22)",
      accentColor: "text-emerald-400",
      badgeClass: "bg-emerald-950/70 border-emerald-500/40 text-emerald-300",
      borderClass: "border-emerald-500/30 hover:border-emerald-400/80 shadow-[0_0_30px_-5px_rgba(16,185,129,0.2)]",
      highlight: false,
      hasBorderBeam: false,
    },
    {
      id: "realtime",
      name: "Multi-Feature System",
      tagline: "Low-latency streaming engines, WebSockets, and HiveMQ MQTT with sub-100ms sync.",
      price: "₹20,000 – ₹30,000",
      turnaround: "2 Weeks",
      badge: "High Performance",
      icon: Radio,
      chips: [
        "HiveMQ MQTT & WebSocket Pipelines",
        "Hardware Audio & MediaCodec Bridges",
        "Mathematical Drift Clock Compensation",
        "Stress-Tested for 10k+ Concurrency",
      ],
      colSpan: "lg:col-span-7",
      spotlight: "rgba(6, 182, 212, 0.22)",
      accentColor: "text-cyan-400",
      badgeClass: "bg-cyan-950/70 border-cyan-500/40 text-cyan-300",
      borderClass: "border-cyan-500/30 hover:border-cyan-400/80 shadow-[0_0_30px_-5px_rgba(6,182,212,0.2)]",
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-950/40 border border-violet-500/30 text-violet-300 text-xs mb-4 shadow-[0_0_20px_rgba(139,92,246,0.15)]">
            <Zap className="w-3.5 h-3.5 text-violet-400" />
            <span>SPRINT TIERS &amp; SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight heading-metallic">
            What I Build
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400">
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
                  className={pkg.borderClass}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-white shadow-inner">
                        <Icon className={`w-5 h-5 ${pkg.accentColor}`} />
                      </div>
                      <span
                        className={`text-[11px] px-3 py-1 rounded-full border ${pkg.badgeClass}`}
                      >
                        {pkg.badge}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-neutral-400 mb-6 leading-relaxed">
                      {pkg.tagline}
                    </p>

                    {/* Crisp Bullet Chips */}
                    <div className="space-y-2 mb-6">
                      {pkg.chips.map((chip, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-neutral-300">
                          <Check className={`w-3.5 h-3.5 ${pkg.accentColor} shrink-0`} />
                          <span>{chip}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Footer */}
                  <div className="pt-4 border-t border-white/[0.08] flex items-end justify-between">
                    <div>
                      <div className="text-[10px] text-neutral-400 uppercase tracking-wider">
                        Turnaround: {pkg.turnaround}
                      </div>
                      <div className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                        {pkg.price}
                      </div>
                    </div>
                    <a
                      href="#intake"
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors shadow-md"
                    >
                      <span>Book Sprint</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
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
