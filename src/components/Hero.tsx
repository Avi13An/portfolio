"use client";

import React from "react";
import {
  ArrowUpRight,
  Sparkles,
  Zap,
  Activity,
  Layers,
  Terminal as TerminalIcon,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";

export function Hero() {
  const quickStats = [
    { label: "Delivery Speed", value: "2 Weeks", desc: "Concept to Production" },
    { label: "Sync Latency", value: "< 100ms", desc: "MQTT Real-Time Mesh" },
    { label: "Audio Precision", value: "44.1 kHz", desc: "Hardware MediaCodec" },
    { label: "Production Uptime", value: "99.99%", desc: "Vercel & Cloud Edge" },
  ];

  const techBadges = [
    "Next.js 15",
    "React Native",
    "Expo 57",
    "Kotlin MediaCodec",
    "C++ MMKV",
    "HiveMQ MQTT",
    "TypeScript",
    "Supabase",
    "Tailwind CSS",
    "AWS & Edge",
  ];

  return (
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-black">
      {/* Ambient background glow effects */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-emerald-500/10 via-cyan-500/10 to-violet-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 -left-48 w-96 h-96 bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/4 -right-48 w-96 h-96 bg-cyan-500/5 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* AMOLED grid overlay */}
      <div className="absolute inset-0 amoled-mesh opacity-40 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Top Status Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950 border border-white/10 text-zinc-300 text-xs font-mono tracking-wide mb-8 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>AVI TANDON • FULL-STACK &amp; SYSTEMS MVP DEVELOPER</span>
            <ChevronRight className="w-3.5 h-3.5 text-zinc-500" />
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1] mb-6">
            I turn ambitious ideas into{" "}
            <span className="bg-gradient-to-r from-emerald-400 via-cyan-300 to-white bg-clip-text text-transparent">
              production-ready MVPs
            </span>{" "}
            and mobile/web applications.
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-xl text-zinc-400 font-normal leading-relaxed max-w-2xl mx-auto mb-10 font-mono text-balance">
            Full-Stack Development • UI/UX • Native Audio &amp; Real-Time Systems • Cloud Deployment
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <a
              href="#featured-architecture"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-xl bg-zinc-900/90 text-white font-medium text-sm border border-white/20 hover:border-emerald-500/60 hover:bg-zinc-800 transition-all duration-200 group shadow-lg shadow-black/60"
            >
              <Activity className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
              <span>View Featured Architecture</span>
              <span className="text-xs font-mono text-zinc-500 group-hover:text-zinc-300">
                (Sukoon Engine)
              </span>
            </a>

            <a
              href="#intake"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-100 transition-all duration-200 shadow-[0_0_30px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(255,255,255,0.4)]"
            >
              <span>Start a Project</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          {/* Interactive Tech Badge Ticker */}
          <div className="pt-2 pb-6">
            <p className="text-xs uppercase tracking-widest text-zinc-500 font-mono mb-4">
              Core Production Stack &amp; Low-Latency Technologies
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {techBadges.map((badge) => (
                <span
                  key={badge}
                  className="px-3 py-1 text-xs font-mono text-zinc-300 bg-zinc-950/90 border border-white/10 rounded-lg hover:border-white/30 hover:text-white transition-colors"
                >
                  {badge}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Live Architecture Performance Metrics Grid */}
        <div className="mt-12 max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {quickStats.map((stat, idx) => (
              <div
                key={idx}
                className="amoled-card rounded-xl p-4 md:p-5 relative overflow-hidden group hover:border-emerald-500/40"
              >
                <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-emerald-400/50" />
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <Zap className="w-3.5 h-3.5 text-zinc-600 group-hover:text-emerald-400 transition-colors" />
                </div>
                <div className="text-2xl md:text-3xl font-extrabold text-white tracking-tight font-mono">
                  {stat.value}
                </div>
                <p className="text-xs text-zinc-400 mt-1 font-mono">
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Live Terminal Peek */}
        <div className="mt-8 max-w-3xl mx-auto">
          <div className="rounded-xl bg-zinc-950 border border-white/10 overflow-hidden shadow-2xl font-mono text-xs">
            <div className="flex items-center justify-between px-4 py-2.5 bg-black/60 border-b border-white/5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
                <span className="ml-2 text-zinc-500 text-[11px]">engine_diagnostics.sh</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-emerald-400">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                <span>ONLINE // 0 JANK DETECTED</span>
              </div>
            </div>
            <div className="p-4 space-y-1.5 text-zinc-400">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">$</span>
                <span className="text-zinc-200">sukoon-cli --benchmark --concurrency=10000</span>
              </div>
              <p className="text-zinc-500 pl-4">
                &gt; Resolving audio manifest: DIRECT-TO-CLIENT [HTTP 200 OK • 0 CDN Blocks]
              </p>
              <p className="text-zinc-500 pl-4">
                &gt; HiveMQ cluster telemetry: 48.2ms p99 MQTT broadcast to 12 room participants
              </p>
              <p className="text-zinc-500 pl-4">
                &gt; MMKV memory mapped cache: 0.11ms sync read vs 18.4ms AsyncStorage baseline
              </p>
              <p className="text-emerald-400 font-semibold pl-4">
                ✔ Hardware MediaCodec pipeline locked @ 44,100Hz • 0 dropped audio frames
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
