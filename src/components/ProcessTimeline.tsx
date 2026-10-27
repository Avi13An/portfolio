"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { TiltCard } from "@/components/ui/tilt-card";
import { AnimatedCounter } from "@/components/ui/animated-counter";

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
      summary: "Production launch, complete IP transfer & Loom walkthrough.",
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
    <section id="timeline" className="py-24 bg-black relative overflow-hidden">
      {/* Anchor aliases for smooth navigation */}
      <span id="process" className="absolute -top-24 pointer-events-none" />
      <span id="about" className="absolute -top-24 pointer-events-none" />
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE_CUSTOM }}
          className="max-w-2xl mx-auto text-center mb-14"
        >
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight heading-metallic">
            Predictable <AnimatedCounter to={14} />-Day Delivery
          </h2>
        </motion.div>

        {/* 4-Step Visual Milestones with Glowing Nodes */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 relative"
        >
          {steps.map((item, idx) => (
            <motion.div
              key={item.step}
              variants={itemVariants}
              className="h-full"
            >
              <TiltCard className="p-6 h-full flex flex-col justify-between relative group">
                <div>
                  {/* Node & Step Indicator */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]" />
                      <span className="text-base font-extrabold text-white">
                        {item.step}
                      </span>
                    </div>
                    <span className="text-[11px] text-zinc-400 px-2.5 py-1 rounded-full bg-zinc-900 border border-white/10">
                      {item.days}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white tracking-tight mb-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.summary}
                  </p>
                </div>

                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-3.5 top-1/2 -translate-y-1/2 z-20 text-zinc-700 group-hover:text-zinc-500 transition-colors">
                    <ArrowRight className="w-4 h-4" />
                  </div>
                )}
              </TiltCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default ProcessTimeline;
