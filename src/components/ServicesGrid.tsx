"use client";

import React, { useState } from "react";
import {
  Rocket,
  Smartphone,
  Radio,
  LayoutDashboard,
  Check,
  ArrowUpRight,
  Clock,
  Sparkles,
  Zap,
  CheckCircle2,
  Shield,
  Layers,
  Cpu,
} from "lucide-react";

// Interactive Bento Card with Mouse Spotlight Tracking
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
  const [isHovered, setIsHovered] = useState(false);

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
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-3xl bg-[#080808] border border-white/10 p-7 sm:p-8 transition-all duration-300 hover:border-white/20 overflow-hidden ${className}`}
    >
      {/* Interactive Radial Spotlight */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(450px circle at ${mousePosition.x}px ${mousePosition.y}px, ${spotlightColor}, transparent 80%)`,
        }}
      />

      {/* Subtle Card Border Highlight Following Mouse */}
      <div
        className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition-opacity duration-300 group-hover:opacity-100 border border-emerald-500/20"
        style={{
          maskImage: `radial-gradient(250px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
          WebkitMaskImage: `radial-gradient(250px circle at ${mousePosition.x}px ${mousePosition.y}px, black, transparent)`,
        }}
      />

      <div className="relative z-10 flex flex-col justify-between h-full">{children}</div>
    </div>
  );
}

export function ServicesGrid() {
  const pricingTiers = [
    {
      id: "starter",
      name: "Starter / Prototype",
      price: "₹5,000 – ₹8,000",
      timeline: "2–4 Days Turnaround",
      badge: "Market Validation",
      tagline: "Rapid clickable prototype and high-converting landing page to validate your thesis with real users.",
      features: [
        "High-fidelity responsive UI in Tailwind CSS",
        "Essential user flows & mock data binding",
        "PostgreSQL / Supabase schema blueprint",
        "Waitlist / lead capture with automated alerts",
        "Live zero-config Vercel deployment + custom domain",
      ],
      cta: "Book Starter Sprint",
      spotlightColor: "rgba(16, 185, 129, 0.18)",
      priceColor: "text-emerald-400",
      highlight: false,
    },
    {
      id: "lean-core",
      name: "Lean Core MVP",
      price: "₹10,000 – ₹18,000",
      timeline: "7–10 Days Turnaround",
      badge: "Most Popular",
      tagline: "Full-stack production application ready for paying customers, pilot clients, and investor demos.",
      features: [
        "Full-stack Next.js 15 App Router architecture",
        "Secure authentication (OAuth, Magic Links, RBAC)",
        "PostgreSQL database with Row-Level Security (RLS)",
        "Payment integration (Stripe / Razorpay webhooks)",
        "Automated CI/CD pipelines & real-time telemetry",
      ],
      cta: "Launch Core MVP",
      spotlightColor: "rgba(16, 185, 129, 0.25)",
      priceColor: "text-emerald-300",
      highlight: true,
    },
    {
      id: "multi-feature",
      name: "Multi-Feature System",
      price: "₹20,000 – ₹30,000",
      timeline: "2 Weeks (14 Days)",
      badge: "Flagship Architecture",
      tagline: "High-throughput real-time systems, mobile applications, or hardware audio pipelines.",
      features: [
        "Cross-platform React Native / Expo 57 app or complex web",
        "Sub-100ms real-time sync (MQTT / WebSockets / WebRTC)",
        "High-performance caching (MMKV / Redis Pub-Sub)",
        "Custom native modules (Kotlin / Swift) if required",
        "Automated QA test suite + 30-day post-launch warranty",
      ],
      cta: "Build Real-Time System",
      spotlightColor: "rgba(6, 182, 212, 0.2)",
      priceColor: "text-cyan-400",
      highlight: false,
    },
  ];

  return (
    <section id="services" className="py-24 bg-black relative border-t border-white/10 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-gradient-to-r from-emerald-500/10 via-cyan-500/5 to-violet-500/10 blur-[170px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border border-white/10 text-zinc-300 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>SPECIALIZATIONS &amp; SPRINT ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            What I Build
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-mono leading-relaxed">
            I don&apos;t just build prototypes — I deliver complete, scalable software architectures
            engineered for performance, user retention, and enterprise-grade reliability.
          </p>
        </div>

        {/* ASYMMETRICAL MODERN BENTO GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-20">
          {/* Bento Card 1 (Large 7-Col Hero Feature): Rapid MVP Development */}
          <div className="lg:col-span-7">
            <BentoCard spotlightColor="rgba(16, 185, 129, 0.2)">
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-white/15 flex items-center justify-center text-emerald-400 shadow-inner group-hover:scale-105 transition-transform">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-emerald-950/60 border border-emerald-500/40 text-emerald-300">
                      FLAGSHIP OFFERING
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">7–10 Days Turnaround</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                    Rapid MVP Development
                  </h3>
                  <span className="text-sm font-mono font-bold text-emerald-400">
                    ₹10,000 – ₹18,000
                  </span>
                </div>

                <p className="text-xs font-mono text-emerald-400 mb-3">
                  (Idea to Launch in 2 Weeks)
                </p>

                <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-mono">
                  Transform raw ideas, PRDs, or wireframes into live, battle-tested production
                  applications ready for paying users, venture pitches, and rapid iteration.
                </p>

                {/* Deliverable Checklist Chips */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                  {[
                    "Full-stack Next.js App Router",
                    "PostgreSQL / Supabase Schema",
                    "OAuth & Magic Link Auth",
                    "Stripe / Razorpay Payments",
                    "High-Converting Tailwind UI",
                    "Vercel Edge Deployment",
                  ].map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-2 p-2 rounded-xl bg-black/60 border border-white/5 text-xs font-mono text-zinc-300"
                    >
                      <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {["Next.js 15", "TypeScript", "Tailwind", "Supabase", "Stripe"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-black border border-white/10 text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href="#intake"
                  className="inline-flex items-center gap-1 text-xs font-mono text-emerald-400 hover:text-emerald-300"
                >
                  <span>Build This</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </BentoCard>
          </div>

          {/* Bento Card 2 (5-Col Mobile Apps): Mobile Applications */}
          <div className="lg:col-span-5">
            <BentoCard spotlightColor="rgba(6, 182, 212, 0.2)">
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-white/15 flex items-center justify-center text-cyan-400 shadow-inner group-hover:scale-105 transition-transform">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-cyan-950/60 border border-cyan-500/40 text-cyan-300">
                      iOS &amp; ANDROID
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">2 Weeks Turnaround</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Mobile Applications
                  </h3>
                  <span className="text-sm font-mono font-bold text-cyan-400">
                    ₹20k – ₹30k
                  </span>
                </div>

                <p className="text-xs font-mono text-cyan-400 mb-3">
                  (React Native / Expo 57 / Native Modules)
                </p>

                <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-mono">
                  High-performance native-feeling cross-platform mobile apps. From smooth 60/120fps
                  gesture-driven interfaces to custom Kotlin &amp; Swift native bridges.
                </p>

                <div className="space-y-2 mb-6">
                  {[
                    "Unified Expo 57 / React Native codebase",
                    "Custom native modules (Kotlin / C++)",
                    "Offline-first sync & MMKV caching",
                    "App Store & Google Play EAS build setup",
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                      <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {["React Native", "Expo", "Kotlin", "C++ JSI"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-black border border-white/10 text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href="#intake"
                  className="inline-flex items-center gap-1 text-xs font-mono text-cyan-400 hover:text-cyan-300"
                >
                  <span>Build This</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </BentoCard>
          </div>

          {/* Bento Card 3 (6-Col Real-Time & Collaborative Systems) */}
          <div className="lg:col-span-6">
            <BentoCard spotlightColor="rgba(139, 92, 246, 0.2)">
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-white/15 flex items-center justify-center text-violet-400 shadow-inner group-hover:scale-105 transition-transform">
                    <Radio className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-violet-950/60 border border-violet-500/40 text-violet-300">
                      LOW-LATENCY
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">2 Weeks Turnaround</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    Real-Time &amp; Collaborative Systems
                  </h3>
                  <span className="text-sm font-mono font-bold text-violet-400">
                    ₹20k – ₹30k
                  </span>
                </div>

                <p className="text-xs font-mono text-violet-400 mb-3">
                  (WebSockets, WebRTC, MQTT)
                </p>

                <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-mono">
                  Multiplayer rooms, low-latency audio/video streaming, instant telemetry, and
                  synchronization pipelines with sub-100ms global drift compensation.
                </p>

                <div className="space-y-2 mb-6">
                  {[
                    "HiveMQ / Mosquitto MQTT & Socket.io",
                    "WebRTC peer-to-peer audio/video streaming",
                    "Adaptive clock drift compensation algorithms",
                    "Stress-tested for 10,000+ concurrent users",
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                      <Check className="w-3.5 h-3.5 text-violet-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {["MQTT", "WebSockets", "WebRTC", "Redis"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-black border border-white/10 text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href="#intake"
                  className="inline-flex items-center gap-1 text-xs font-mono text-violet-400 hover:text-violet-300"
                >
                  <span>Build This</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </BentoCard>
          </div>

          {/* Bento Card 4 (6-Col SaaS Dashboards & Internal Tooling) */}
          <div className="lg:col-span-6">
            <BentoCard spotlightColor="rgba(245, 158, 11, 0.2)">
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-zinc-950 border border-white/15 flex items-center justify-center text-amber-400 shadow-inner group-hover:scale-105 transition-transform">
                    <LayoutDashboard className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="px-3 py-1 rounded-full text-[11px] font-mono bg-amber-950/60 border border-amber-500/40 text-amber-300">
                      ENTERPRISE TOOLING
                    </span>
                    <span className="text-[11px] font-mono text-zinc-400">1–2 Weeks Turnaround</span>
                  </div>
                </div>

                <div className="flex items-baseline justify-between mb-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                    SaaS Dashboards &amp; Internal Tooling
                  </h3>
                  <span className="text-sm font-mono font-bold text-amber-400">
                    ₹10k – ₹18k
                  </span>
                </div>

                <p className="text-xs font-mono text-amber-400 mb-3">
                  (High-Throughput Data Grids &amp; Admin Workflows)
                </p>

                <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-mono">
                  Complex data visualization, real-time analytics dashboards, workflow automation
                  engines, and custom back-office tools that accelerate your team.
                </p>

                <div className="space-y-2 mb-6">
                  {[
                    "Virtualized high-throughput data tables (100k+ rows)",
                    "Interactive real-time chart pipelines",
                    "Granular RBAC team permissions & audit logs",
                    "Third-party integrations (Slack, Razorpay, OpenAI)",
                  ].map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                      <Check className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                  {["Next.js", "TanStack", "Tailwind", "PostgreSQL"].map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-0.5 rounded text-[10px] font-mono bg-black border border-white/10 text-zinc-400"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <a
                  href="#intake"
                  className="inline-flex items-center gap-1 text-xs font-mono text-amber-400 hover:text-amber-300"
                >
                  <span>Build This</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </BentoCard>
          </div>
        </div>

        {/* REALISTIC INR PRICING TIERS SECTION */}
        <div id="pricing" className="pt-8 border-t border-white/10">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>TRANSPARENT INR PRICING TIERS</span>
            </div>
            <h3 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
              Predictable Pricing. Zero Hidden Fees.
            </h3>
            <p className="mt-2 text-sm sm:text-base text-zinc-400 font-mono">
              Fixed-scope sprint rates in Indian Rupees (INR) designed to get you from concept to
              launch without runaway hourly budgets.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {pricingTiers.map((pkg) => (
              <BentoCard
                key={pkg.id}
                spotlightColor={pkg.spotlightColor}
                className={pkg.highlight ? "border-emerald-500/50 shadow-[0_0_35px_rgba(16,185,129,0.15)]" : ""}
              >
                {pkg.highlight && (
                  <div className="absolute top-0 right-0 bg-emerald-500 text-black text-[10px] font-mono font-extrabold px-3 py-1 rounded-bl-xl uppercase tracking-wider">
                    {pkg.badge}
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
                      {pkg.name}
                    </span>
                    {!pkg.highlight && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-400">
                        {pkg.badge}
                      </span>
                    )}
                  </div>

                  <div className="mb-2">
                    <span className={`text-2xl sm:text-3xl font-extrabold font-mono ${pkg.priceColor}`}>
                      {pkg.price}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs font-mono text-zinc-400 mb-4 pb-4 border-b border-white/10">
                    <Clock className="w-3.5 h-3.5 text-emerald-400" />
                    <span>{pkg.timeline}</span>
                  </div>

                  <p className="text-xs text-zinc-400 leading-relaxed mb-6 font-mono">
                    {pkg.tagline}
                  </p>

                  <div className="space-y-2.5 mb-8">
                    {pkg.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300 font-mono">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="#intake"
                  className={`w-full py-3.5 rounded-xl font-mono text-xs font-semibold text-center flex items-center justify-center gap-2 transition-all ${
                    pkg.highlight
                      ? "bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.25)]"
                      : "bg-zinc-900 border border-white/15 text-white hover:bg-zinc-800"
                  }`}
                >
                  <span>{pkg.cta}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </BentoCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
