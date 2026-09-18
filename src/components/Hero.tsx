"use client";

import React from "react";
import { ArrowDown, ArrowUpRight, Sparkles } from "lucide-react";

export function Hero() {
  const stats = [
    { value: "2 Weeks", label: "Average MVP Delivery" },
    { value: "<100ms", label: "Sync & Ingestion Latency" },
    { value: "100%", label: "Native Mobile & Full-Stack" },
    { value: "₹10k–₹18k", label: "Most Popular Sprint Tier" },
  ];

  return (
    <section className="relative pt-32 pb-16 md:pt-44 md:pb-24 overflow-hidden bg-black">
      {/* Ambient background glow effects */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 w-[650px] h-[350px] bg-gradient-to-tr from-emerald-500/10 via-cyan-500/10 to-violet-500/5 blur-[140px] rounded-full pointer-events-none -z-10" />
      <div className="absolute inset-0 amoled-mesh opacity-30 pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Eyebrow Badge */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950 border border-white/10 text-zinc-300 text-xs font-mono tracking-wide mb-8 shadow-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>Available for Select Projects</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
          I build production-ready MVPs that{" "}
          <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-white bg-clip-text text-transparent">
            look and feel world-class.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-xl text-zinc-400 max-w-2xl mx-auto mb-10 font-mono text-balance leading-relaxed">
          Full-stack development, native mobile pipelines, and high-velocity shipping in 2 weeks.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
          <a
            href="#featured-architecture"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-zinc-900 text-white font-medium text-xs font-mono border border-white/15 hover:border-emerald-500/50 hover:bg-zinc-800 transition-all duration-200 group"
          >
            <span>Explore Sukoon Engine</span>
            <ArrowDown className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
          </a>

          <a
            href="#intake"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-white text-black font-semibold text-xs font-mono hover:bg-zinc-200 transition-all duration-200 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.35)]"
          >
            <span>Start a Project</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Quick Stat Ticker Bar */}
        <div className="rounded-2xl bg-zinc-950/80 border border-white/[0.08] p-4 sm:p-6 backdrop-blur-md">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06]">
            {stats.map((item, idx) => (
              <div key={idx} className={`pt-3 sm:pt-0 ${idx > 0 ? "sm:pl-6" : ""}`}>
                <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-mono">
                  {item.value}
                </div>
                <div className="text-xs text-zinc-400 font-mono mt-1">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
