"use client";

import React from "react";
import { ArrowRight, CheckCircle2, Calendar, Sparkles } from "lucide-react";

export function ProcessTimeline() {
  const steps = [
    {
      step: "01",
      title: "Architecture & UI",
      days: "Days 1–3",
      summary: "Database schemas, API contracts & clickable Tailwind interfaces.",
    },
    {
      step: "02",
      title: "Core Logic & APIs",
      days: "Days 4–9",
      summary: "Authentication, database RLS, Stripe billing & real-time sockets.",
    },
    {
      step: "03",
      title: "Automated QA",
      days: "Days 10–12",
      summary: "Synthetic load stress testing, latency audits & mobile device matrix.",
    },
    {
      step: "04",
      title: "Deploy & Handoff",
      days: "Days 13–14",
      summary: "Vercel / AWS production launch, complete IP transfer & Loom walkthrough.",
    },
  ];

  return (
    <section id="process" className="py-20 bg-black relative border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-zinc-300 text-xs font-mono mb-4">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>THE 2-WEEK SPRINT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
            Predictable 14-Day Delivery
          </h2>
          <p className="mt-2 text-sm sm:text-base text-zinc-400 font-mono">
            Zero fluff, zero scope creep. From technical spec to live production deployment.
          </p>
        </div>

        {/* 4-Step Horizontal Flow Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {steps.map((item, idx) => (
            <div
              key={item.step}
              className="p-5 rounded-2xl bg-[#080808] border border-white/[0.08] hover:border-white/20 transition-all flex flex-col justify-between relative group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-extrabold font-mono text-emerald-400">
                    {item.step}
                  </span>
                  <span className="text-[11px] font-mono text-zinc-400 px-2 py-0.5 rounded bg-zinc-900 border border-white/5">
                    {item.days}
                  </span>
                </div>
                <h4 className="text-base font-bold text-white tracking-tight mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                  {item.summary}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-zinc-700">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
