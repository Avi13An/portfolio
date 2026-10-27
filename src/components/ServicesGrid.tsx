"use client";

import React, { useState } from "react";
import {
  Rocket,
  Smartphone,
  Radio,
  Layers,
  Check,
  Zap,
} from "lucide-react";
import { motion, type Variants } from "framer-motion";
import LiquidMetalButton from "@/components/ui/liquid-metal-button";

const EASE_CUSTOM: [number, number, number, number] = [0.16, 1, 0.3, 1];

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  hasBorderBeam?: boolean;
}

function BentoCard({
  children,
  className = "",
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
      className={`group relative rounded-3xl bg-zinc-950/85 backdrop-blur-xl border border-white/10 hover:border-white/25 p-6 sm:p-7 transition-all duration-300 overflow-hidden h-full flex flex-col justify-between shadow-[0_0_30px_-5px_rgba(0,0,0,0.8)] ${className}`}
    >
      {/* Animated Glowing Border Beam for Flagship Card */}
      {hasBorderBeam && (
        <div className="absolute -inset-[100%] animate-spin-slow opacity-0 group-hover:opacity-30 transition-opacity duration-500 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.4)_120deg,transparent_180deg)] pointer-events-none" />
      )}

      {/* Interactive Cursor Following Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 z-0"
        style={{
          background: `radial-gradient(450px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(255, 255, 255, 0.08), transparent 80%)`,
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
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.12] text-zinc-300 text-xs mb-4 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <Zap className="w-3.5 h-3.5 text-zinc-300" />
            <span>SPRINT TIERS &amp; SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight heading-metallic">
            What I Build
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400">
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
                  hasBorderBeam={pkg.hasBorderBeam}
                >
                  <div>
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-white shadow-inner">
                        <Icon className="w-5 h-5 text-white" />
                      </div>
                      <span
                        className="text-[11px] px-3 py-1 rounded-full border bg-white/[0.04] border-white/[0.12] text-zinc-300"
                      >
                        {pkg.badge}
                      </span>
                    </div>

                    {/* Title & Tagline */}
                    <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-2">
                      {pkg.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-zinc-400 mb-6 leading-relaxed">
                      {pkg.tagline}
                    </p>

                    {/* Crisp Bullet Chips */}
                    <div className="space-y-2 mb-6">
                      {pkg.chips.map((chip, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-xs text-zinc-300">
                          <Check className="w-3.5 h-3.5 text-white shrink-0" />
                          <span>{chip}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Pricing Footer */}
                  <div className="pt-4 border-t border-white/[0.08] flex items-end justify-between gap-3">
                    <div>
                      <div className="text-[10px] text-zinc-400 uppercase tracking-wider">
                        Turnaround: {pkg.turnaround}
                      </div>
                      <div className="text-lg sm:text-xl font-extrabold text-white mt-0.5">
                        {pkg.price}
                      </div>
                    </div>
                    <a href="#contact" className="inline-block shrink-0">
                      <LiquidMetalButton label="Book Sprint" />
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
