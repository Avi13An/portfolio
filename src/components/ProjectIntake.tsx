"use client";

import React, { useState } from "react";
import {
  Send,
  Sparkles,
  ExternalLink,
  Mail,
  Github,
  Linkedin,
  Check,
  Copy,
  ArrowRight,
  CheckCircle2,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    { id: "web", label: "Web MVP" },
    { id: "mobile", label: "Mobile App" },
    { id: "realtime", label: "Real-Time Platform" },
    { id: "dashboard", label: "Dashboard / SaaS" },
  ];

  const budgetOptions = [
    { id: "b1", label: "₹5k – ₹8k", tier: "Starter" },
    { id: "b2", label: "₹10k – ₹18k", tier: "Core MVP" },
    { id: "b3", label: "₹20k – ₹30k", tier: "Real-Time" },
    { id: "b4", label: "₹30k+", tier: "Enterprise" },
  ];

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("avitan.offic@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (!details.trim()) {
      setErrorMessage("Please share a few sentences about what you want to build.");
      return;
    }

    setErrorMessage("");
    setIsSubmitted(true);

    const subject = encodeURIComponent(`Project Brief: ${projectType} (${budget}) - ${name}`);
    const body = encodeURIComponent(
      `Hi Avi,\n\nI would like to discuss a project:\n\n` +
        `• Name: ${name}\n` +
        `• Email: ${email}\n` +
        `• Category: ${projectType}\n` +
        `• Budget Tier: ${budget}\n\n` +
        `Scope & Goals:\n${details}\n\n` +
        `Looking forward to your 24h technical breakdown.`
    );

    const mailtoUrl = `mailto:avitan.offic@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="intake" className="py-24 bg-black relative border-t border-white/[0.08] overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>START AN MVP SPRINT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-tight heading-metallic">
            Let&apos;s Build Your Product
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 font-mono">
            Direct intake with technical scope &amp; fixed quote in 24 hours.
          </p>
        </div>

        {/* High-Visibility Ambient Neon Container */}
        <div className="ring-1 ring-emerald-500/40 shadow-[0_0_60px_-15px_rgba(16,185,129,0.2)] bg-[#080808]/90 backdrop-blur-2xl rounded-3xl p-6 sm:p-10 relative overflow-hidden">
          {/* Subtle Ambient Radial Highlights */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />
          <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-cyan-500/10 blur-[100px] pointer-events-none rounded-full" />

          {/* Quick Channels Action Dock */}
          <div className="mb-8 p-4 rounded-2xl bg-neutral-950/90 border border-white/10 flex flex-wrap items-center justify-between gap-3 relative z-10">
            {/* Direct Email + Copy Pill */}
            <div className="flex items-center gap-2">
              <a
                href="mailto:avitan.offic@gmail.com"
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs font-mono text-white hover:border-emerald-500/50 transition-colors"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>avitan.offic@gmail.com</span>
              </a>

              <button
                onClick={handleCopyEmail}
                className="px-3 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs font-mono text-neutral-400 hover:text-white hover:border-white/20 transition-all flex items-center gap-1.5"
                title="Copy Email"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>
            </div>

            {/* Social Pill Links */}
            <div className="flex items-center gap-2">
              <a
                href="https://www.linkedin.com/in/avi-tandon-029308329/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs font-mono text-neutral-300 hover:text-white hover:border-violet-500/50 transition-all"
              >
                <Linkedin className="w-3.5 h-3.5 text-violet-400" />
                <span>LinkedIn</span>
                <ExternalLink className="w-3 h-3 text-neutral-500" />
              </a>

              <a
                href="https://github.com/Avi13An"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-neutral-900 border border-white/10 text-xs font-mono text-neutral-300 hover:text-white hover:border-cyan-500/50 transition-all"
              >
                <Github className="w-3.5 h-3.5 text-cyan-400" />
                <span>GitHub</span>
                <ExternalLink className="w-3 h-3 text-neutral-500" />
              </a>
            </div>
          </div>

          {/* Response Guarantee Tag */}
          <div className="mb-8 flex items-center justify-center gap-2 text-xs font-mono text-emerald-400/90 bg-emerald-950/30 border border-emerald-500/20 py-2 px-4 rounded-xl text-center">
            <Zap className="w-3.5 h-3.5 animate-pulse shrink-0" />
            <span>⚡ Guaranteed response within 12–24 hours • Currently booking next sprint</span>
          </div>

          {/* Native Dark Glass Form */}
          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                className="py-12 px-4 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(16,185,129,0.35)]">
                  <Check className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-extrabold text-white font-mono">
                  Project Brief Dispatched!
                </h3>

                <p className="text-neutral-400 text-xs sm:text-sm max-w-md mx-auto font-mono leading-relaxed">
                  Thank you, <span className="text-emerald-400 font-semibold">{name}</span>. Your
                  brief for a <span className="text-white font-semibold">{projectType}</span> ({budget})
                  has been queued for review. Check your email for our response.
                </p>

                <div className="pt-2">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setDetails("");
                    }}
                    className="px-5 py-2.5 rounded-xl bg-neutral-900 border border-white/10 text-xs font-mono text-neutral-300 hover:text-white transition-colors"
                  >
                    Submit Another Brief
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="space-y-6 relative z-10"
              >
                {/* 1. Project Type Selector */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2.5">
                    1. Project Category
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {projectTypes.map((item) => {
                      const active = projectType === item.label;
                      return (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => setProjectType(item.label)}
                          className={`py-2.5 px-3 rounded-xl border text-xs font-mono transition-all text-center flex items-center justify-center gap-1.5 ${
                            active
                              ? "bg-emerald-950/40 border-emerald-500/60 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/50 font-semibold"
                              : "bg-neutral-950/80 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
                          }`}
                        >
                          {active && <CheckCircle2 className="w-3 h-3 text-emerald-400" />}
                          <span>{item.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Budget Selection */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-2.5">
                    2. Target Investment (INR Tiers)
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {budgetOptions.map((opt) => {
                      const active = budget === opt.label;
                      return (
                        <button
                          type="button"
                          key={opt.id}
                          onClick={() => setBudget(opt.label)}
                          className={`py-2.5 px-3 rounded-xl border text-xs font-mono transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
                            active
                              ? "bg-emerald-950/40 border-emerald-500/60 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/50 font-semibold"
                              : "bg-neutral-950/80 border-neutral-800 text-neutral-400 hover:border-neutral-700 hover:text-neutral-200"
                          }`}
                        >
                          <span className="font-bold text-white text-xs">{opt.label}</span>
                          <span className="text-[10px] text-neutral-500">{opt.tier}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Name & Email Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      3. Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Sharma"
                      className="w-full bg-neutral-950/80 border border-neutral-800 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 font-mono text-xs sm:text-sm placeholder-neutral-500 transition-all outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                      4. Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full bg-neutral-950/80 border border-neutral-800 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl px-4 py-3 font-mono text-xs sm:text-sm placeholder-neutral-500 transition-all outline-none"
                    />
                  </div>
                </div>

                {/* 4. Scope / Details Textarea */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-neutral-400 mb-1.5">
                    5. Project Scope &amp; Target Deliverables
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Briefly describe what you're building, target audience, or link to PRD/Figma..."
                    className="w-full bg-neutral-950/80 border border-neutral-800 text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 rounded-xl p-3.5 font-mono text-xs sm:text-sm placeholder-neutral-500 transition-all outline-none resize-none"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono">
                    {errorMessage}
                  </div>
                )}

                {/* Glowing Send Brief Button */}
                <div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-white text-black font-semibold text-xs font-mono hover:bg-neutral-200 transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] group"
                  >
                    <span>Send Project Brief</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Subtle Fallback Text below */}
          <div className="mt-8 pt-5 border-t border-white/[0.06] text-center text-xs font-mono text-neutral-500">
            <a
              href="https://tally.so/r/RGOLX4"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-neutral-300 transition-colors inline-flex items-center gap-1"
            >
              <span>Prefer standard form? Open on Tally</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
