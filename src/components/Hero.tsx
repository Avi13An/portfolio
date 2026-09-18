"use client";

import React from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";

export function Hero() {
  const stats = [
    { value: "2 Weeks", label: "Average MVP Turnaround" },
    { value: "<100ms", label: "Real-Time MQTT Sync" },
    { value: "44.1kHz", label: "Native Hardware Audio" },
    { value: "₹10k–₹18k", label: "Flagship Sprint Tier" },
  ];

  return (
    <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        {/* Eyebrow Pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono tracking-wide mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)]">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span>Available for Select MVP Sprints</span>
        </div>

        {/* High-Contrast Metallic Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.1] mb-6 heading-metallic font-sans">
          I build production-ready MVPs that feel fast, refined, and alive.
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg lg:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 font-mono font-normal leading-relaxed text-balance">
          Full-stack web &amp; native mobile architecture. Taking product ideas from initial schema
          to live production in 2 weeks.
        </p>

        {/* Dual Call-to-Action */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <a
            href="#intake"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-black font-semibold text-xs font-mono hover:bg-neutral-200 transition-all duration-300 shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(255,255,255,0.45)] hover:scale-[1.02]"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <a
            href="#featured-architecture"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-950/80 text-neutral-200 font-medium text-xs font-mono border border-white/15 hover:border-emerald-500/50 hover:bg-zinc-900 transition-all duration-300 group backdrop-blur-md"
          >
            <span>Watch Sukoon Architecture</span>
            <ArrowDown className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
          </a>
        </div>

        {/* Metric Ticker Strip */}
        <div className="rounded-2xl bg-zinc-950/70 border border-white/[0.08] p-5 sm:p-6 backdrop-blur-xl shadow-2xl">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06]">
            {stats.map((item, idx) => (
              <div key={idx} className={`pt-3 sm:pt-0 ${idx > 0 ? "sm:pl-6" : ""}`}>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                  {item.value}
                </div>
                <div className="text-xs text-neutral-400 font-mono mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
