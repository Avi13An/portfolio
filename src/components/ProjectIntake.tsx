"use client";

import React, { useState } from "react";
import {
  Send,
  Sparkles,
  ExternalLink,
  Mail,
  Github,
  Linkedin,
  CheckCircle2,
  ArrowRight,
  Check,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function ProjectIntake() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [projectType, setProjectType] = useState("Web MVP");
  const [budget, setBudget] = useState("₹10k – ₹18k");
  const [details, setDetails] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const projectTypes = [
    { id: "web-mvp", label: "Web MVP" },
    { id: "mobile-app", label: "Mobile App" },
    { id: "real-time", label: "Real-Time Platform" },
    { id: "dashboard-saas", label: "Dashboard / SaaS" },
  ];

  const budgetOptions = [
    { id: "b1", label: "₹5k – ₹8k", tier: "Starter" },
    { id: "b2", label: "₹10k – ₹18k", tier: "Core MVP" },
    { id: "b3", label: "₹20k – ₹30k", tier: "Real-Time" },
    { id: "b4", label: "₹30k+", tier: "Enterprise" },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setErrorMessage("Please enter your name.");
      return;
    }
    if (!email.trim() || !email.includes("@")) {
      setErrorMessage("Please provide a valid email address.");
      return;
    }
    if (!details.trim()) {
      setErrorMessage("Please provide a brief summary of what you are building.");
      return;
    }

    setErrorMessage("");
    setIsSubmitted(true);

    const subject = encodeURIComponent(`Project Brief: ${projectType} (${budget}) - ${name}`);
    const body = encodeURIComponent(
      `Hi Avi,\n\nI would like to discuss a project:\n\n` +
        `• Name: ${name}\n` +
        `• Email: ${email}\n` +
        `• Project Type: ${projectType}\n` +
        `• Budget Tier: ${budget}\n\n` +
        `Project Scope & Details:\n${details}\n\n` +
        `Looking forward to hearing from you within 24 hours.`
    );

    const mailtoUrl = `mailto:avitan.offic@gmail.com?subject=${subject}&body=${body}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="intake" className="py-24 bg-black relative border-t border-white/[0.08] overflow-hidden">
      {/* Soft Ambient Neon Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>START A PROJECT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Let&apos;s Build Your Next MVP
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 font-mono">
            Direct intake with guaranteed written feasibility &amp; fixed sprint quote within 24 hours.
          </p>
        </div>

        {/* Seamless AMOLED Dark Glassmorphic Card */}
        <div className="bg-[#080808] border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
          {/* Subtle Emerald Spotlight in Corner */}
          <div className="absolute -top-32 -right-32 w-72 h-72 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />

          <AnimatePresence mode="wait">
            {isSubmitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="py-12 px-4 text-center space-y-4"
              >
                <div className="w-16 h-16 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(16,185,129,0.35)]">
                  <Check className="w-8 h-8" />
                </div>

                <h3 className="text-2xl font-extrabold text-white font-mono">
                  Project Brief Dispatched!
                </h3>

                <p className="text-zinc-400 text-xs sm:text-sm max-w-md mx-auto font-mono leading-relaxed">
                  Thank you, <span className="text-emerald-400 font-semibold">{name}</span>. Your
                  brief for a <span className="text-white font-semibold">{projectType}</span> ({budget})
                  has been dispatched to{" "}
                  <span className="text-emerald-300">avitan.offic@gmail.com</span>.
                </p>

                <div className="pt-3 flex items-center justify-center gap-3">
                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setDetails("");
                    }}
                    className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
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
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2.5">
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
                              : "bg-[#0d0d0d] border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
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
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2.5">
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
                              : "bg-[#0d0d0d] border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                          }`}
                        >
                          <span className="font-bold text-white text-xs">{opt.label}</span>
                          <span className="text-[10px] text-zinc-500">{opt.tier}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 3. Name & Email Inputs */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      3. Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Alex Sharma"
                      className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-3.5 py-3 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                      4. Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="alex@company.com"
                      className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-3.5 py-3 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                    />
                  </div>
                </div>

                {/* 4. Scope / Idea Textarea */}
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-1.5">
                    5. Project Brief / Requirements
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={details}
                    onChange={(e) => setDetails(e.target.value)}
                    placeholder="Briefly describe what you're building, target users, or link your PRD/wireframes..."
                    className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl p-3.5 text-xs font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none"
                  />
                </div>

                {errorMessage && (
                  <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono">
                    {errorMessage}
                  </div>
                )}

                {/* Submit Action */}
                <div>
                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-xl bg-white text-black font-semibold text-xs font-mono hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.35)] group"
                  >
                    <span>Send Project Brief</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>

          {/* Bottom Direct Connect Options & External Tally Link */}
          <div className="mt-8 pt-5 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-400">
            <div className="flex items-center gap-4">
              <a
                href="mailto:avitan.offic@gmail.com"
                className="hover:text-emerald-400 transition-colors flex items-center gap-1"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span>avitan.offic@gmail.com</span>
              </a>
              <a
                href="https://github.com/Avi13An"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-cyan-400 transition-colors flex items-center gap-1"
              >
                <Github className="w-3.5 h-3.5 text-cyan-400" />
                <span>GitHub</span>
              </a>
              <a
                href="https://www.linkedin.com/in/avi-tandon-029308329/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-violet-400 transition-colors flex items-center gap-1"
              >
                <Linkedin className="w-3.5 h-3.5 text-violet-400" />
                <span>LinkedIn</span>
              </a>
            </div>

            <a
              href="https://tally.so/r/RGOLX4"
              target="_blank"
              rel="noopener noreferrer"
              className="text-zinc-500 hover:text-zinc-300 transition-colors flex items-center gap-1"
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
