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
  Layers,
  Sparkles,
} from "lucide-react";

export function ServicesGrid() {
  const services = [
    {
      id: "rapid-mvp",
      title: "Rapid MVP Development",
      subtitle: "(Idea to Launch in 2 Weeks)",
      icon: Rocket,
      turnaround: "10–14 Days Delivery",
      badge: "Flagship Offering",
      description:
        "Transform raw ideas, PRDs, or wireframes into live, battle-tested production applications ready for paying users, venture pitches, and rapid iteration.",
      deliverables: [
        "Full-stack architecture & PostgreSQL/Supabase schema",
        "Authentication (OAuth, Magic Links, RBAC)",
        "Stripe / Lemonsqueezy subscription billing integration",
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
      turnaround: "2–3 Weeks Delivery",
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
      turnaround: "1–2 Weeks Delivery",
      badge: "Enterprise Ready",
      description:
        "Complex data visualization, real-time analytics dashboards, workflow automation engines, and custom back-office tools that accelerate your team.",
      deliverables: [
        "High-throughput virtualized data tables (100k+ rows)",
        "Interactive real-time chart pipelines (Tremor / Chart.js)",
        "Granular team permissions & audit trail logging",
        "CSV/PDF export engines & automated batch jobs",
        "Third-party integrations (Slack, HubSpot, OpenAI API)",
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-gradient-to-r from-emerald-500/5 via-cyan-500/5 to-violet-500/5 blur-[160px] pointer-events-none -z-10" />

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

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
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
                      <div className="flex items-center gap-1 text-[11px] font-mono text-zinc-500">
                        <Clock className="w-3 h-3" />
                        <span>{service.turnaround}</span>
                      </div>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight mb-1">
                    {service.title}
                  </h3>
                  <div className={`text-xs font-mono mb-3 ${service.accentText}`}>
                    {service.subtitle}
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
      </div>
    </section>
  );
}
