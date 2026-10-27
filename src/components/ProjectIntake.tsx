"use client";

import React, { useState } from "react";
import {
  Sparkles,
  ExternalLink,
  Mail,
  Github,
  Linkedin,
  Check,
  Copy,
  ArrowRight,
  Zap,
  PartyPopper,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LiquidMetalButton from "@/components/ui/liquid-metal-button";

const EASE_CUSTOM: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function ProjectIntake() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("Web MVP");
  const [budget, setBudget] = useState("₹10k – ₹18k");
  const [details, setDetails] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const projectTypes = [
    "Web MVP",
    "Mobile App",
    "Real-Time Platform",
    "Dashboard / SaaS",
  ];

  const budgetTiers = [
    "₹5k – ₹8k (Starter)",
    "₹10k – ₹18k (Core MVP)",
    "₹20k – ₹30k (Flagship)",
    "₹30k+ (Enterprise)",
  ];

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("avitan.offic@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) {
      setErrorMessage("Please enter both your name and email.");
      return;
    }
    setErrorMessage("");
    setIsSubmitted(true);

    const subject = encodeURIComponent(`Project Brief: ${projectType} from ${name}`);
    const body = encodeURIComponent(
      `Hi Avi,\n\nI'm reaching out about a new project.\n\nProject Type: ${projectType}\nEstimated Budget: ${budget}\n\nDetails:\n${details || "No details provided yet."}\n\nBest,\n${name} (${email})`
    );

    const mailtoUrl = `mailto:avitan.offic@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="py-24 bg-black relative border-t border-white/[0.08] overflow-hidden">
      {/* Anchor alias for smooth navigation */}
      <span id="intake" className="absolute -top-24 pointer-events-none" />
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE_CUSTOM }}
          className="max-w-2xl mx-auto text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.12] text-zinc-300 text-xs mb-4 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DIRECT INTAKE &amp; CONTACT HUB</span>
          </div>

          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.08] mb-3 heading-metallic">
            Let&apos;s build something unforgettable.
          </h2>

          <p className="text-sm sm:text-base text-zinc-400 flex items-center justify-center gap-1.5">
            <Zap className="w-3.5 h-3.5 text-zinc-300 inline shrink-0" />
            <span>Guaranteed response within 12–24h • Currently booking next sprint.</span>
          </p>
        </motion.div>

        {/* 3 PROMINENT CHANNEL CARDS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.7, ease: EASE_CUSTOM }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10"
        >
          {/* 1. EMAIL CARD */}
          <motion.div
            whileHover={{ y: -6, scale: 1.015 }}
            transition={{ duration: 0.3, ease: EASE_CUSTOM }}
            className="p-6 rounded-3xl bg-zinc-950/85 backdrop-blur-xl border border-white/[0.1] hover:border-white/25 shadow-[0_0_30px_-10px_rgba(0,0,0,0.8)] flex flex-col justify-between group relative overflow-hidden transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/15 flex items-center justify-center text-white shadow-inner">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-zinc-300 bg-white/[0.05] px-2 py-0.5 rounded border border-white/10">
                  Direct Inbox
                </span>
              </div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1">
                Official Email
              </div>
              <div className="text-sm sm:text-base font-bold text-white break-all mb-4">
                avitan.offic@gmail.com
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06]">
              <button
                onClick={handleCopyEmail}
                className="flex-1 py-2 px-3 rounded-xl bg-zinc-900 border border-white/10 hover:border-white/30 text-xs text-zinc-300 hover:text-white transition-all flex items-center justify-center gap-1.5"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-white" />
                    <span className="text-white font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>

              <a
                href="mailto:avitan.offic@gmail.com"
                className="py-2 px-4 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors flex items-center justify-center shrink-0 shadow-md"
              >
                <span>Send</span>
              </a>
            </div>
          </motion.div>

          {/* 2. LINKEDIN CARD */}
          <motion.a
            href="https://www.linkedin.com/in/avi-tandon-029308329/"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -6, scale: 1.015 }}
            transition={{ duration: 0.3, ease: EASE_CUSTOM }}
            className="p-6 rounded-3xl bg-zinc-950/85 backdrop-blur-xl border border-white/[0.1] hover:border-white/25 shadow-[0_0_30px_-10px_rgba(0,0,0,0.8)] flex flex-col justify-between group relative overflow-hidden transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/15 flex items-center justify-center text-white shadow-inner">
                  <Linkedin className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-zinc-300 bg-white/[0.05] px-2 py-0.5 rounded border border-white/10">
                  Network
                </span>
              </div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1">
                Professional Profile
              </div>
              <div className="text-base sm:text-lg font-bold text-white tracking-tight mb-1">
                Avi Tandon
              </div>
              <p className="text-xs text-zinc-400">
                Full-Stack &amp; Systems MVP Developer
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400 group-hover:text-white transition-colors">
              <span>Connect on LinkedIn</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </motion.a>

          {/* 3. GITHUB CARD */}
          <motion.a
            href="https://github.com/Avi13An"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ y: -6, scale: 1.015 }}
            transition={{ duration: 0.3, ease: EASE_CUSTOM }}
            className="p-6 rounded-3xl bg-zinc-950/85 backdrop-blur-xl border border-white/[0.1] hover:border-white/25 shadow-[0_0_30px_-10px_rgba(0,0,0,0.8)] flex flex-col justify-between group relative overflow-hidden transition-colors"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/15 flex items-center justify-center text-white shadow-inner">
                  <Github className="w-5 h-5" />
                </div>
                <span className="text-[10px] uppercase tracking-wider text-zinc-300 bg-white/[0.05] px-2 py-0.5 rounded border border-white/10">
                  Source Code
                </span>
              </div>
              <div className="text-xs text-zinc-400 uppercase tracking-wider mb-1">
                GitHub Repositories
              </div>
              <div className="text-base sm:text-lg font-bold text-white tracking-tight mb-1">
                github.com/Avi13An
              </div>
              <p className="text-xs text-zinc-400">
                Open-source modules &amp; architecture
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs text-zinc-400 group-hover:text-white transition-colors">
              <span>Explore GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </motion.a>
        </motion.div>

        {/* NATIVE DARK GLASS INTAKE FORM WITH ROTATING BORDER BEAM */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE_CUSTOM }}
          className="relative rounded-3xl p-1 overflow-hidden"
        >
          {/* Subtle Rotating Monochrome Border Beam */}
          <div className="absolute -inset-[100%] animate-spin-slow opacity-25 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(255,255,255,0.4)_120deg,transparent_180deg)] pointer-events-none" />

          {/* Form Container */}
          <div className="relative rounded-[22px] bg-zinc-950/90 backdrop-blur-2xl border border-white/10 p-6 sm:p-10 shadow-2xl">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                /* Celebration Confirmation Screen */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-12 px-4 text-center flex flex-col items-center justify-center"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white/[0.05] border border-white/20 flex items-center justify-center text-white mb-6 shadow-[0_0_30px_rgba(255,255,255,0.15)]">
                    <PartyPopper className="w-8 h-8 animate-bounce" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight mb-2">
                    Project Brief Created!
                  </h3>

                  <p className="text-sm text-zinc-400 max-w-md mx-auto mb-6">
                    Your email client should have opened with the pre-filled brief. If not, click below to send it directly.
                  </p>

                  <div className="p-4 rounded-xl bg-black border border-white/10 max-w-md w-full text-left mb-6 text-xs text-zinc-300 space-y-1">
                    <div><span className="text-zinc-500">From:</span> {name} ({email})</div>
                    <div><span className="text-zinc-500">Type:</span> {projectType}</div>
                    <div><span className="text-zinc-500">Tier:</span> {budget}</div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-white text-xs hover:bg-zinc-800 transition-colors"
                    >
                      ← Submit Another Brief
                    </button>

                    <a
                      href="mailto:avitan.offic@gmail.com"
                      className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs hover:bg-neutral-200 transition-colors shadow-lg"
                    >
                      Open Email App
                    </a>
                  </div>
                </motion.div>
              ) : (
                /* Native Glass Form */
                <form key="form" onSubmit={handleSubmit} className="space-y-6">
                  {errorMessage && (
                    <div className="p-3 rounded-xl bg-white/[0.05] border border-white/20 text-zinc-200 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  {/* Name and Email Inputs */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-300 mb-2">
                        Your Name <span className="text-white">*</span>
                      </label>
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Satya Nadella"
                        className="w-full px-4 py-3 rounded-xl bg-black/80 border border-white/10 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-300 mb-2">
                        Email Address <span className="text-white">*</span>
                      </label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="satya@microsoft.com"
                        className="w-full px-4 py-3 rounded-xl bg-black/80 border border-white/10 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all"
                      />
                    </div>
                  </div>

                  {/* Project Type Chips */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-300 mb-2.5">
                      What are we building?
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {projectTypes.map((type) => {
                        const isSelected = projectType === type;
                        return (
                          <button
                            key={type}
                            type="button"
                            onClick={() => setProjectType(type)}
                            className={`py-2.5 px-3 rounded-xl text-xs transition-all border text-center ${
                              isSelected
                                ? "bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.2)] border-transparent"
                                : "bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                            }`}
                          >
                            {type}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Budget Selector Chips */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-300 mb-2.5">
                      Expected INR Budget
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {budgetTiers.map((tier) => {
                        const isSelected = budget === tier;
                        return (
                          <button
                            key={tier}
                            type="button"
                            onClick={() => setBudget(tier)}
                            className={`py-2.5 px-3 rounded-xl text-xs transition-all border text-center ${
                              isSelected
                                ? "bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.2)] border-transparent"
                                : "bg-white/[0.03] border-white/10 text-zinc-400 hover:text-white hover:bg-white/[0.06]"
                            }`}
                          >
                            {tier}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Scope Details Textarea */}
                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-300 mb-2">
                      Project Details &amp; Target Timeline
                    </label>
                    <textarea
                      rows={4}
                      value={details}
                      onChange={(e) => setDetails(e.target.value)}
                      placeholder="Tell me about the MVP core flow, integrations (Stripe, Supabase, Native Media), or existing codebase..."
                      className="w-full px-4 py-3 rounded-xl bg-black/80 border border-white/10 text-white text-sm placeholder:text-zinc-600 focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 transition-all resize-none"
                    />
                  </div>

                  {/* Submit Button */}
                  <div className="flex justify-center pt-2">
                    <LiquidMetalButton
                      type="submit"
                      label="Deploy Next Sprint"
                      className="w-full"
                    />
                  </div>

                  {/* External Tally Fallback Link */}
                  <div className="pt-2 text-center">
                    <a
                      href="https://tally.so/r/RGOLX4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-zinc-400 hover:text-white transition-colors inline-flex items-center gap-1 group"
                    >
                      <span>Prefer standard form? Open on Tally</span>
                      <ExternalLink className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                  </div>
                </form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
