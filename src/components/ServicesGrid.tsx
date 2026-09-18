"use client";

import React, { useState } from "react";
import {
  Rocket,
  Smartphone,
  Sparkles,
  Radio,
  Layers,
  ArrowUpRight,
  Check,
  Zap,
} from "lucide-react";

interface BentoCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

function BentoCard({
  children,
  className = "",
  spotlightColor = "rgba(16, 185, 129, 0.15)",
}: BentoCardProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePosition({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className={`group relative rounded-3xl bg-[#080808] border border-white/[0.08] p-6 sm:p-7 transition-all duration-300 hover:border-white/20 overflow-hidden ${className}`}
    >
      {/* Cursor Following Radial Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(400px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />
      <div className="relative z-10 flex flex-col justify-between h-full">{children}</div>
    </div>
  );
}

export function ServicesGrid() {
  const services = [
    {
      id: "rapid-mvp",
      title: "Rapid 2-Week MVP",
      tagline: "Ideal for early validation. Complete production app ready for users and investors.",
      price: "₹10,000 – ₹18,000",
      turnaround: "7–10 Days",
      badge: "Flagship Sprint",
      icon: Rocket,
      chips: [
        "Full-Stack Next.js 15",
        "PostgreSQL / Supabase",
        "Stripe / Razorpay Billing",
        "Vercel Edge Deploy",
      ],
      colSpan: "lg:col-span-7",
      spotlight: "rgba(16, 185, 129, 0.22)",
      accentColor: "text-emerald-400",
      badgeClass: "bg-emerald-950/60 border-emerald-500/40 text-emerald-300",
    },
    {
      id: "mobile-app",
      title: "Mobile Applications",
      tagline: "iOS & Android from one codebase. Smooth 60/120fps gesture interfaces.",
      price: "₹20,000 – ₹30,000",
      turnaround: "2 Weeks",
      badge: "React Native / Expo",
      icon: Smartphone,
      chips: [
        "Expo 57 Unified Codebase",
        "Custom Native Modules",
        "Offline-First MMKV",
        "EAS Store Release",
      ],
      colSpan: "lg:col-span-5",
      spotlight: "rgba(6, 182, 212, 0.2)",
      accentColor: "text-cyan-400",
      badgeClass: "bg-cyan-950/60 border-cyan-500/40 text-cyan-300",
    },
    {
      id: "prototype",
      title: "Interactive Prototype",
      tagline: "Quick 3-day functional proof-of-concept and high-converting landing page.",
      price: "₹5,000 – ₹8,000",
      turnaround: "2–4 Days",
      badge: "Fast Validation",
      icon: Layers,
      chips: [
        "Clickable Tailwind UI",
        "Waitlist & Lead Capture",
        "Postgres Schema Blueprint",
        "Zero-Config Deploy",
      ],
      colSpan: "lg:col-span-5",
      spotlight: "rgba(16, 185, 129, 0.16)",
      accentColor: "text-emerald-400",
      badgeClass: "bg-zinc-900 border-white/10 text-zinc-300",
    },
    {
      id: "realtime",
      title: "Real-Time & Media Systems",
      tagline: "Audio engines, WebSockets, and HiveMQ MQTT with sub-100ms global drift sync.",
      price: "₹20,000 – ₹30,000",
      turnaround: "2 Weeks",
      badge: "Low-Latency Specialist",
      icon: Radio,
      chips: [
        "HiveMQ MQTT & WebSockets",
        "Hardware MediaCodec Mixer",
        "Drift Compensation",
        "10k+ Concurrency Tested",
      ],
      colSpan: "lg:col-span-7",
      spotlight: "rgba(139, 92, 246, 0.2)",
      accentColor: "text-violet-400",
      badgeClass: "bg-violet-950/60 border-violet-500/40 text-violet-300",
    },
  ];

  return (
    <section id="services" className="py-24 bg-black relative border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-zinc-300 text-xs font-mono mb-4">
            <Zap className="w-3.5 h-3.5 text-cyan-400" />
            <span>SPRINT PACKAGES &amp; PRICING</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            What I Build
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 font-mono">
            Fixed-scope 2-week sprints with transparent INR pricing. No runaway hourly billing.
          </p>
        </div>

        {/* 4-Card Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.id} className={item.colSpan}>
                <BentoCard spotlightColor={item.spotlight}>
                  <div>
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-10 h-10 rounded-xl bg-zinc-950 border border-white/10 flex items-center justify-center text-white shadow-inner">
                        <Icon className={`w-5 h-5 ${item.accentColor}`} />
                      </div>
                      <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${item.badgeClass}`}>
                        {item.badge}
                      </span>
                    </div>

                    <div className="flex items-baseline justify-between gap-2 mb-1">
                      <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                        {item.title}
                      </h3>
                      <span className={`text-sm sm:text-base font-extrabold font-mono shrink-0 ${item.accentColor}`}>
                        {item.price}
                      </span>
                    </div>

                    <p className="text-xs text-zinc-400 font-mono leading-relaxed mb-5">
                      {item.tagline}
                    </p>

                    {/* Deliverables checklist chips */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                      {item.chips.map((chip, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-2 p-2 rounded-xl bg-black/60 border border-white/5 text-xs font-mono text-zinc-300"
                        >
                          <Check className={`w-3.5 h-3.5 ${item.accentColor} shrink-0`} />
                          <span className="truncate">{chip}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-white/[0.06] flex items-center justify-between">
                    <span className="text-[11px] font-mono text-zinc-500">
                      Turnaround: {item.turnaround}
                    </span>
                    <a
                      href="#intake"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-white hover:text-emerald-400 transition-colors font-medium"
                    >
                      <span>Start Sprint</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </BentoCard>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
