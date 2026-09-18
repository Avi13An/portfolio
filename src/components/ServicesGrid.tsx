"use client";

import React from "react";
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
} from "lucide-react";

export function ServicesGrid() {
  const pricingPackages = [
    {
      id: "starter",
      name: "Starter / Prototype",
      price: "₹5,000 – ₹8,000",
      timeline: "2–4 Days Turnaround",
      badge: "Fast Validation",
      tagline: "Rapid clickable prototype or landing page to validate your market thesis with real users.",
      features: [
        "High-fidelity responsive UI in Tailwind CSS",
        "Essential user flows & mock data binding",
        "Database schema design (PostgreSQL/Supabase)",
        "Waitlist / lead capture with automated notifications",
        "Live deployment on Vercel with custom domain",
      ],
      cta: "Book Starter Sprint",
      accentBorder: "border-white/10 hover:border-emerald-500/50",
      priceColor: "text-emerald-400",
      highlight: false,
    },
    {
      id: "lean-core",
      name: "Lean Core MVP",
      price: "₹10,000 – ₹18,000",
      timeline: "7–10 Days Turnaround",
      badge: "Most Popular",
      tagline: "Complete production-grade foundation ready for paying customers and investor demos.",
      features: [
        "Full-stack Next.js App Router architecture",
        "Secure auth (OAuth, Magic Links, Session cookies)",
        "PostgreSQL database with Row-Level Security (RLS)",
        "Payment integration (Stripe / Razorpay / Lemon Squeezy)",
        "Automated CI/CD pipeline, error logging & analytics",
      ],
      cta: "Launch Core MVP",
      accentBorder: "border-emerald-500/50 shadow-[0_0_30px_rgba(16,185,129,0.15)] bg-zinc-950",
      priceColor: "text-emerald-300",
      highlight: true,
    },
    {
      id: "multi-feature",
      name: "Multi-Feature / Real-Time System",
      price: "₹20,000 – ₹30,000",
      timeline: "2 Weeks (14 Days)",
      badge: "Flagship Architecture",
      tagline: "Complex systems, mobile applications, or real-time low-latency collaborative products.",
      features: [
        "Cross-platform mobile app (React Native / Expo) or complex web app",
        "Real-time sync engine (MQTT / WebSockets / WebRTC)",
        "High-performance caching (MMKV / Redis Pub/Sub)",
        "Hardware acceleration / audio-video pipelines if needed",
        "Automated end-to-end QA + 30-day post-launch warranty",
      ],
      cta: "Build Real-Time System",
      accentBorder: "border-cyan-500/40 hover:border-cyan-500/70",
      priceColor: "text-cyan-400",
      highlight: false,
    },
  ];

  const services = [
    {
      id: "rapid-mvp",
      title: "Rapid MVP Development",
      subtitle: "(Idea to Launch in 2 Weeks)",
      icon: Rocket,
      priceEstimate: "₹10,000 – ₹18,000",
      turnaround: "7–10 Days Delivery",
      badge: "Flagship Offering",
      description:
        "Transform raw ideas, PRDs, or wireframes into live, battle-tested production applications ready for paying users, venture pitches, and rapid iteration.",
      deliverables: [
        "Full-stack architecture & PostgreSQL/Supabase schema",
        "Authentication (OAuth, Magic Links, RBAC)",
        "Payment & subscription integration (Stripe / Razorpay)",
        "Responsive, high-converting Tailwind UI/UX",
        "Automated CI/CD pipelines & Vercel/AWS deployment",
      ],
      techStack: ["Next.js 15", "TypeScript", "Tailwind CSS", "Supabase", "Stripe", "Vercel"],
      glowColor: "from-emerald-500/20 to-transparent",
      accentBorder: "group-hover:border-emerald-500/50",
      accentText: "text-emerald-400",
    },
    {
      id: "mobile-apps",
      title: "Mobile Applications",
      subtitle: "(React Native / Expo / Native Modules)",
      icon: Smartphone,
      priceEstimate: "₹20,000 – ₹30,000",
      turnaround: "2 Weeks Delivery",
      badge: "iOS & Android",
      description:
        "High-performance native-feeling cross-platform mobile apps. From smooth 60/120fps gesture-driven interfaces to custom Kotlin & Swift native modules.",
      deliverables: [
        "Expo 57 / React Native unified codebase",
        "Custom native modules (Kotlin / Swift / C++)",
        "Offline-first sync via WatermelonDB or MMKV caching",
        "App Store & Google Play submission pipelines (EAS)",
        "Push notifications, deep-linking, & in-app purchases",
      ],
      techStack: ["React Native", "Expo", "Kotlin", "Swift", "C++ JSI", "EAS Build"],
      glowColor: "from-cyan-500/20 to-transparent",
      accentBorder: "group-hover:border-cyan-500/50",
      accentText: "text-cyan-400",
    },
    {
      id: "real-time-systems",
      title: "Real-Time & Collaborative Systems",
      subtitle: "(WebSockets, WebRTC, MQTT)",
      icon: Radio,
      priceEstimate: "₹20,000 – ₹30,000",
      turnaround: "2 Weeks Delivery",
      badge: "Low-Latency Specialist",
      description:
        "Multiplayer states, audio/video streaming pipelines, instant messaging, and IoT/telemetry backends with sub-100ms global synchronization.",
      deliverables: [
        "HiveMQ / Mosquitto MQTT & Socket.io architectures",
        "WebRTC peer-to-peer audio/video streaming channels",
        "Adaptive clock drift compensation & jitter buffers",
        "Presence detection & multi-user state synchronization",
        "Stress tested for 10,000+ concurrent connections",
      ],
      techStack: ["WebSockets", "WebRTC", "HiveMQ MQTT", "Redis Pub/Sub", "Go / Node.js"],
      glowColor: "from-violet-500/20 to-transparent",
      accentBorder: "group-hover:border-violet-500/50",
      accentText: "text-violet-400",
    },
    {
      id: "saas-dashboards",
      title: "SaaS Dashboards & Internal Tooling",
      subtitle: "High-throughput Data Grids & Admin Tools",
      icon: LayoutDashboard,
      priceEstimate: "₹10,000 – ₹18,000",
      turnaround: "1–2 Weeks Delivery",
      badge: "Enterprise Ready",
      description:
        "Complex data visualization, real-time analytics dashboards, workflow automation engines, and custom back-office tools that accelerate your team.",
      deliverables: [
        "High-throughput virtualized data tables (100k+ rows)",
        "Interactive real-time chart pipelines (Tremor / Chart.js)",
        "Granular team permissions & audit trail logging",
        "CSV/PDF export engines & automated batch jobs",
        "Third-party integrations (Slack, Razorpay, OpenAI API)",
      ],
      techStack: ["Next.js", "TanStack Table", "Tailwind", "PostgreSQL", "Prisma", "OpenAI"],
      glowColor: "from-amber-500/20 to-transparent",
      accentBorder: "group-hover:border-amber-500/50",
      accentText: "text-amber-400",
    },
  ];

  return (
    <section id="services" className="py-24 bg-black relative border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-emerald-500/5 via-cyan-500/5 to-violet-500/5 blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border border-white/10 text-zinc-300 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            <span>CORE SPECIALIZATIONS &amp; SERVICES</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            What I Build
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-mono leading-relaxed">
            I don&apos;t just build prototypes — I deliver complete, scalable software architectures
            engineered for performance, user retention, and enterprise-grade reliability.
          </p>
        </div>

        {/* Services Grid (4 Cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 mb-20">
          {services.map((service) => {
            const Icon = service.icon;
            return (
              <div
                key={service.id}
                className={`amoled-card rounded-2xl p-7 relative group flex flex-col justify-between overflow-hidden transition-all duration-300 border ${service.accentBorder}`}
              >
                {/* Top Subtle Ambient Glow */}
                <div
                  className={`absolute -top-24 -right-24 w-52 h-52 bg-gradient-to-b ${service.glowColor} blur-[70px] pointer-events-none rounded-full`}
                />

                <div>
                  {/* Card Header */}
                  <div className="flex items-start justify-between mb-5">
                    <div className="w-12 h-12 rounded-xl bg-zinc-950 border border-white/15 flex items-center justify-center text-white shadow-inner group-hover:scale-105 transition-transform">
                      <Icon className={`w-6 h-6 ${service.accentText}`} />
                    </div>
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono bg-zinc-900 border border-white/10 text-zinc-300">
                        {service.badge}
                      </span>
                      <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-400">
                        <Clock className="w-3 h-3 text-zinc-500" />
                        <span>{service.turnaround}</span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
                    {service.title}
                  </h3>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className={`text-xs font-mono ${service.accentText}`}>
                      {service.subtitle}
                    </span>
                    <span className="text-xs font-mono font-bold text-zinc-300 bg-zinc-950 px-2 py-0.5 rounded border border-white/10">
                      {service.priceEstimate}
                    </span>
                  </div>
                  <p className="text-sm text-zinc-400 leading-relaxed mb-6 font-normal">
                    {service.description}
                  </p>

                  {/* Deliverables checklist */}
                  <div className="space-y-2 mb-6 pt-2 border-t border-white/5">
                    <div className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider mb-2">
                      Key Deliverables &amp; Outcomes
                    </div>
                    {service.deliverables.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <div className="w-4 h-4 rounded-full bg-zinc-900 border border-white/10 flex items-center justify-center shrink-0 mt-0.5">
                          <Check className={`w-2.5 h-2.5 ${service.accentText}`} />
                        </div>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footer: Tech Stack & Inquiry CTA */}
                <div className="pt-4 border-t border-white/10 mt-auto">
                  <div className="flex flex-wrap items-center gap-1.5 mb-4">
                    {service.techStack.map((tech) => (
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
                    className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-zinc-300 hover:text-white group/btn"
                  >
                    <span>Request scope &amp; estimate for this</span>
                    <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* TRANSPARENT INR PRICING MATRIX SECTION */}
        <div id="pricing" className="pt-6 border-t border-white/10">
          <div className="max-w-3xl mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-3">
              <Zap className="w-3.5 h-3.5" />
              <span>TRANSPARENT INR PRICING</span>
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
            {pricingPackages.map((pkg) => (
              <div
                key={pkg.id}
                className={`amoled-card rounded-2xl p-6 sm:p-7 flex flex-col justify-between relative overflow-hidden transition-all duration-300 border ${pkg.accentBorder}`}
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
                      <div key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <a
                  href="#intake"
                  className={`w-full py-3 rounded-xl font-mono text-xs font-semibold text-center flex items-center justify-center gap-2 transition-all ${
                    pkg.highlight
                      ? "bg-white text-black hover:bg-zinc-200 shadow-[0_0_20px_rgba(255,255,255,0.2)]"
                      : "bg-zinc-900 border border-white/15 text-white hover:bg-zinc-800"
                  }`}
                >
                  <span>{pkg.cta}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
