"use client";

import React from "react";
import { ArrowRight, Calendar } from "lucide-react";
import { motion, type Variants } from "framer-motion";

const EASE_CUSTOM: [number, number, number, number] = [0.16, 1, 0.3, 1];

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
      title: "Core Engines & Logic",
      days: "Days 4–8",
      summary: "Auth, payments, native device bridges & real-time WebSocket sync.",
    },
    {
      step: "03",
      title: "Polish & Edge Cases",
      days: "Days 9–12",
      summary: "Offline resilience, optimistic UI, 60fps micro-animations & QA.",
    },
    {
      step: "04",
      title: "Ship & Handover",
      days: "Days 13–14",
      summary: "Vercel / AWS production launch, complete IP transfer & Loom walkthrough.",
    },
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE_CUSTOM },
    },
  };

  return (
    <section id="process" className="py-20 bg-black relative border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-white/10 text-zinc-300 text-xs font-mono mb-4">
            <Calendar className="w-3.5 h-3.5 text-emerald-400" />
            <span>THE 2-WEEK SPRINT</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight leading-tight heading-metallic">
            Predictable 14-Day Delivery
          </h2>
          <p className="mt-2 text-sm sm:text-base text-neutral-400 font-mono">
            Zero fluff, zero scope creep. From technical spec to live production deployment.
          </p>
        </motion.div>

        {/* 4-Step Horizontal Flow Bar with Viewport Stagger */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 relative"
        >
          {steps.map((item, idx) => (
            <motion.div
              key={item.step}
              variants={itemVariants}
              whileHover={{ y: -5, scale: 1.02 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="p-5 rounded-2xl bg-[#080808] border border-white/[0.08] hover:border-white/20 transition-colors flex flex-col justify-between relative group"
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
                <p className="text-xs text-neutral-400 font-mono leading-relaxed">
                  {item.summary}
                </p>
              </div>

              {idx < steps.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 text-zinc-700">
                  <ArrowRight className="w-4 h-4" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
