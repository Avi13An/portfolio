"use client";

import React, { useState } from "react";
import {
  FileCode2,
  Palette,
  Server,
  ShieldCheck,
  Rocket,
  KeyRound,
  CheckCircle2,
  Calendar,
  Sparkles,
  ArrowRight,
} from "lucide-react";

export function ProcessTimeline() {
  const [activeStep, setActiveStep] = useState<number>(0);

  const steps = [
    {
      number: "01",
      title: "Scope & Schema",
      days: "Days 1 – 2",
      icon: FileCode2,
      tag: "Architecture Spec",
      summary: "Deconstruct your PRD into rigorous database schemas, API contracts, and user flows.",
      details: [
        "Interactive architectural blueprint and tech stack lock-in.",
        "PostgreSQL / Supabase relational schema design with indexing strategy.",
        "REST / GraphQL / WebSocket API contracts defined before code.",
        "Clickable low-fidelity wireframe to validate user journeys.",
      ],
      deliverable: "Architecture Spec Doc + Validated DB Schema + Wireframes",
    },
    {
      number: "02",
      title: "Interactive UI",
      days: "Days 3 – 5",
      icon: Palette,
      tag: "High-Fidelity Frontend",
      summary: "Build ultra-responsive, accessible, and high-converting user interfaces with 60fps micro-interactions.",
      details: [
        "Component-driven Tailwind design system matching modern design standards.",
        "Zero-compromise mobile responsiveness across phone, tablet, and desktop viewports.",
        "Keyboard navigation, micro-interactions, and high-contrast AMOLED themes.",
        "Optimistic UI states, loading skeletons, and interactive states.",
      ],
      deliverable: "Complete Frontend Experience with Mock Data & State Management",
    },
    {
      number: "03",
      title: "Backend & Integrations",
      days: "Days 6 – 9",
      icon: Server,
      tag: "Core Engineering",
      summary: "Wire up edge-rendered APIs, secure authentication, real-time message brokers, and payment pipelines.",
      details: [
        "Row-level security (RLS), OAuth providers, and session persistence.",
        "Real-time event sync via WebSockets / MQTT / Server-Sent Events.",
        "Stripe / Lemonsqueezy webhook listeners & subscription lifecycle handling.",
        "Third-party API integrations (OpenAI, Resend, S3/Cloudflare R2 storage).",
      ],
      deliverable: "Fully Functional Core Backend & Live 3rd-Party Integrations",
    },
    {
      number: "04",
      title: "Automated QA",
      days: "Days 10 – 11",
      icon: ShieldCheck,
      tag: "Hardening & Stress Test",
      summary: "End-to-end testing, error boundary resilience, and load testing under synthetic concurrency.",
      details: [
        "Playwright / Cypress end-to-end test suites covering critical user funnels.",
        "Network latency simulation (3G, packet drop, CDN throttle recovery).",
        "Mobile device matrix validation (iOS notch, Android back button, orientation).",
        "Security audit: SQL injection, rate limiting, and CORS configuration.",
      ],
      deliverable: "Automated Test Report + Zero Known Critical Bugs Guarantee",
    },
    {
      number: "05",
      title: "Production Deployment",
      days: "Days 12 – 13",
      icon: Rocket,
      tag: "Go-Live Launch",
      summary: "Spin up automated CI/CD pipelines, edge caching, custom domain SSL, and real-time observability.",
      details: [
        "Vercel / AWS ECS / Fly.io production provisioning with zero downtime rollback.",
        "Sentry error monitoring, log drains, and PostHog / Mixpanel telemetry.",
        "DNS configuration, custom SSL certificates, and Cloudflare CDN caching rules.",
        "Database automated snapshot backups and failover policies.",
      ],
      deliverable: "Live Production URL + 99.99% Edge Deployment",
    },
    {
      number: "06",
      title: "Handoff",
      days: "Day 14",
      icon: KeyRound,
      tag: "Complete Ownership",
      summary: "Complete transfer of repositories, cloud credentials, documentation, and a post-launch warranty.",
      details: [
        "1-on-1 Loom video walkthrough covering the entire codebase and architecture.",
        "Comprehensive README and environment variable setup guides.",
        "100% intellectual property transfer with clean Git commit history.",
        "30 days of post-launch bug warranty and direct Slack/Discord support.",
      ],
      deliverable: "Full Source Code Transfer + Loom Walkthrough + 30-Day Support",
    },
  ];

  return (
    <section id="process" className="py-24 bg-black relative border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 right-10 w-[600px] h-[600px] glow-violet opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-zinc-900 border border-white/10 text-zinc-300 text-xs font-mono mb-4">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>AGILE SPRINT ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            The 2-Week Delivery Process
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-mono leading-relaxed">
            A battle-tested 14-day sprint engineered to eliminate scope creep, maximize speed to
            market, and launch production-grade software without cut corners.
          </p>
        </div>

        {/* 6-Step Horizontal Progress Bar / Selector */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 mb-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isSelected = activeStep === idx;
            return (
              <button
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`text-left p-3.5 rounded-xl border transition-all duration-200 relative overflow-hidden ${
                  isSelected
                    ? "bg-zinc-900/90 border-emerald-500/60 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                    : "bg-black border-white/10 hover:border-white/20 hover:bg-zinc-950"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span
                    className={`font-mono text-sm font-extrabold ${
                      isSelected ? "text-emerald-400" : "text-zinc-500"
                    }`}
                  >
                    {step.number}
                  </span>
                  <span className="text-[10px] font-mono text-zinc-400">{step.days}</span>
                </div>
                <div className="text-xs font-bold text-white tracking-tight truncate">
                  {step.title}
                </div>
              </button>
            );
          })}
        </div>

        {/* Deep Dive Focused Card for the Selected Step */}
        <div className="amoled-card rounded-2xl p-6 sm:p-10 border border-white/15 relative overflow-hidden">
          <div className="flex flex-col lg:flex-row gap-8 lg:items-center justify-between">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl sm:text-3xl font-mono font-extrabold text-emerald-400">
                  {steps[activeStep].number}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-mono bg-zinc-900 border border-white/10 text-zinc-300">
                  {steps[activeStep].days}
                </span>
                <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                  {steps[activeStep].tag}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-3">
                {steps[activeStep].title}
              </h3>
              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed font-mono mb-6">
                {steps[activeStep].summary}
              </p>

              {/* Checklist details */}
              <div className="space-y-2.5">
                {steps[activeStep].details.map((detail, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span>{detail}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Deliverable Snapshot Box */}
            <div className="lg:max-w-xs w-full bg-black/80 rounded-xl p-5 border border-white/10 flex flex-col justify-between">
              <div>
                <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">
                  Key Sprint Milestone
                </span>
                <div className="text-sm font-semibold text-emerald-300 mb-3">
                  {steps[activeStep].deliverable}
                </div>
                <p className="text-xs text-zinc-500 leading-relaxed">
                  Verified with live demo review, staging environments, and client approval before
                  initiating the next sprint phase.
                </p>
              </div>

              <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                <button
                  disabled={activeStep === 0}
                  onClick={() => setActiveStep((prev) => Math.max(0, prev - 1))}
                  className="text-xs font-mono text-zinc-400 hover:text-white disabled:opacity-30 disabled:pointer-events-none"
                >
                  ← Previous
                </button>
                <button
                  disabled={activeStep === steps.length - 1}
                  onClick={() => setActiveStep((prev) => Math.min(steps.length - 1, prev + 1))}
                  className="text-xs font-mono text-emerald-400 hover:text-emerald-300 disabled:opacity-30 disabled:pointer-events-none flex items-center gap-1 font-semibold"
                >
                  <span>Next Phase</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 6 Step Full Grid Overview for Quick Scanning */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={idx}
                className="p-4 rounded-xl bg-zinc-950/60 border border-white/5 hover:border-white/15 transition-all"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono text-emerald-400 font-bold">
                      {step.number}
                    </span>
                    <span className="text-xs font-bold text-white">{step.title}</span>
                  </div>
                  <span className="text-[10px] font-mono text-zinc-500">{step.days}</span>
                </div>
                <p className="text-xs text-zinc-400 line-clamp-2">{step.summary}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
