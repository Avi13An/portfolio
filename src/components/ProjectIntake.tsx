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
  PartyPopper,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
    setTimeout(() => setCopied(false), 2200);
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
    <section id="intake" className="py-28 bg-black relative border-t border-white/[0.08] overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/10 blur-[170px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Massive Artistic Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE_CUSTOM }}
          className="max-w-3xl mx-auto text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-5 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>DIRECT INTAKE &amp; CONTACT HUB</span>
          </div>

          <h2 className="text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.08] mb-4 heading-metallic font-sans">
            Let&apos;s build something unforgettable.
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 font-mono">
            ⚡ Guaranteed response within 12–24 hours • Currently booking the next 2-week sprint.
          </p>
        </motion.div>

        {/* 3 BIG PROMINENT CHANNEL CARDS ABOVE THE FORM */}
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
            className="p-6 rounded-3xl bg-[#080808] border border-emerald-500/30 shadow-[0_0_30px_-10px_rgba(16,185,129,0.15)] flex flex-col justify-between group relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/40 px-2 py-0.5 rounded border border-emerald-500/30">
                  Direct Inbox
                </span>
              </div>
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                Official Email
              </div>
              <div className="text-sm sm:text-base font-bold text-white font-mono break-all mb-4">
                avitan.offic@gmail.com
              </div>
            </div>

            <div className="flex items-center gap-2 pt-3 border-t border-white/[0.06]">
              <button
                onClick={handleCopyEmail}
                className="flex-1 py-2 px-3 rounded-xl bg-neutral-900 border border-white/10 hover:border-emerald-500/50 text-xs font-mono text-neutral-300 hover:text-white transition-all flex items-center justify-center gap-1.5"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                    <span className="text-emerald-400 font-semibold">Copied!</span>
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
                className="py-2 px-3 rounded-xl bg-white text-black font-semibold text-xs font-mono hover:bg-neutral-200 transition-colors flex items-center justify-center gap-1 shrink-0"
              >
                <span>Send</span>
                <ArrowRight className="w-3.5 h-3.5" />
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
            className="p-6 rounded-3xl bg-[#080808] border border-violet-500/30 shadow-[0_0_30px_-10px_rgba(139,92,246,0.15)] flex flex-col justify-between group relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-violet-950/60 border border-violet-500/40 flex items-center justify-center text-violet-400">
                  <Linkedin className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-violet-400 bg-violet-950/40 px-2 py-0.5 rounded border border-violet-500/30">
                  Network
                </span>
              </div>
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                Professional Profile
              </div>
              <div className="text-base sm:text-lg font-bold text-white tracking-tight mb-1">
                Avi Tandon
              </div>
              <p className="text-xs text-neutral-400 font-mono">
                Full-Stack &amp; Systems MVP Developer
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-violet-400 group-hover:text-violet-300 transition-colors">
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
            className="p-6 rounded-3xl bg-[#080808] border border-cyan-500/30 shadow-[0_0_30px_-10px_rgba(6,182,212,0.15)] flex flex-col justify-between group relative overflow-hidden"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-cyan-950/60 border border-cyan-500/40 flex items-center justify-center text-cyan-400">
                  <Github className="w-5 h-5" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 bg-cyan-950/40 px-2 py-0.5 rounded border border-cyan-500/30">
                  Source Code
                </span>
              </div>
              <div className="text-xs font-mono text-neutral-400 uppercase tracking-wider mb-1">
                GitHub Repositories
              </div>
              <div className="text-base sm:text-lg font-bold text-white tracking-tight mb-1 font-mono">
                github.com/Avi13An
              </div>
              <p className="text-xs text-neutral-400 font-mono">
                Open-source modules &amp; architecture
              </p>
            </div>

            <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-xs font-mono text-cyan-400 group-hover:text-cyan-300 transition-colors">
              <span>Explore GitHub</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </div>
          </motion.a>
        </motion.div>

        {/* NATIVE DARK GLASS INTAKE FORM WITH GLOWING BORDER BEAM */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: EASE_CUSTOM }}
          className="relative rounded-3xl p-1 overflow-hidden"
        >
          {/* Subtle Rotating Neon Border Beam */}
          <div className="absolute -inset-[100%] animate-spin-slow opacity-30 bg-[conic-gradient(from_0deg,transparent_0deg,rgba(16,185,129,0.8)_120deg,transparent_180deg)] pointer-events-none" />

          {/* Form Container */}
          <div className="relative rounded-[22px] bg-[#080808]/95 backdrop-blur-2xl border border-white/10 p-6 sm:p-10 shadow-2xl">
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="py-14 px-4 text-center space-y-4"
                >
                  <div className="w-20 h-20 rounded-3xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(16,185,129,0.4)]">
                    <PartyPopper className="w-10 h-10" />
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                    Project Brief Queued!
                  </h3>

                  <p className="text-neutral-300 text-xs sm:text-sm max-w-md mx-auto font-mono leading-relaxed">
                    Thank you, <span className="text-emerald-400 font-semibold">{name}</span>. Your
                    brief for a <span className="text-white font-semibold">{projectType}</span> ({budget})
                    has been submitted. Your email client has been prepared.
                  </p>

                  <div className="pt-4">
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
                      className="w-full py-4 rounded-xl bg-white text-black font-semibold text-xs font-mono hover:bg-neutral-200 transition-all duration-200 flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(255,255,255,0.45)] group"
                    >
                      <span>Send Project Brief</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>

            {/* Subtle Fallback Link below */}
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
        </motion.div>
      </div>
    </section>
  );
}
