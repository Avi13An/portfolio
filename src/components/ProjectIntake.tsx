"use client";

import React, { useState } from "react";
import {
  Send,
  Sparkles,
  ExternalLink,
  Mail,
  Github,
  Linkedin,
  Clock,
  CheckCircle2,
  Zap,
  ArrowRight,
  ShieldCheck,
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

    // Formulate prefilled mailto string
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
    <section id="intake" className="py-24 bg-black relative border-t border-white/10 overflow-hidden">
      {/* Soft Ambient Neon Glows */}
      <div className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 -left-40 w-[500px] h-[500px] bg-cyan-500/10 blur-[150px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>START AN MVP PROJECT</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Let&apos;s Build Your Next MVP
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-mono leading-relaxed">
            Have an ambitious concept? Tell me about your architecture, timeline, and goals. I
            respond with a preliminary technical scope and timeline breakdown within 24 hours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: 100% Native AMOLED Dark Glassmorphic Intake Form (8 cols) */}
          <div className="lg:col-span-8">
            <div className="bg-[#080808]/90 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
              {/* Soft emerald backdrop inner glow */}
              <div className="absolute -top-32 -right-32 w-80 h-80 bg-emerald-500/10 blur-[100px] pointer-events-none rounded-full" />
              <div className="absolute -bottom-32 -left-32 w-80 h-80 bg-cyan-500/5 blur-[100px] pointer-events-none rounded-full" />

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    className="py-12 px-4 text-center space-y-5"
                  >
                    {/* Glowing Checkmark Badge */}
                    <div className="w-20 h-20 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_40px_rgba(16,185,129,0.35)]">
                      <Check className="w-10 h-10" />
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
                      Project Brief Dispatched!
                    </h3>

                    <p className="text-zinc-400 text-sm max-w-lg mx-auto font-mono leading-relaxed">
                      Thank you, <span className="text-emerald-400 font-semibold">{name}</span>. Your brief for a{" "}
                      <span className="text-white font-semibold">{projectType}</span> ({budget}) has
                      been composed. An email client link was triggered to{" "}
                      <span className="text-emerald-300 underline">avitan.offic@gmail.com</span>.
                    </p>

                    <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
                      <a
                        href={`mailto:avitan.offic@gmail.com?subject=${encodeURIComponent(
                          `Project Brief: ${projectType} (${budget}) - ${name}`
                        )}&body=${encodeURIComponent(details)}`}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs font-mono hover:bg-zinc-200 transition-colors shadow-lg"
                      >
                        <Mail className="w-3.5 h-3.5" />
                        <span>Reopen Mail Client</span>
                      </a>

                      <button
                        onClick={() => {
                          setIsSubmitted(false);
                          setDetails("");
                        }}
                        className="px-5 py-2.5 rounded-xl bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white hover:bg-zinc-800 transition-colors"
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
                    className="space-y-7 relative z-10"
                  >
                    {/* 1. Project Type Selector */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                        1. Project Category
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {projectTypes.map((item) => {
                          const active = projectType === item.label;
                          return (
                            <button
                              type="button"
                              key={item.id}
                              onClick={() => setProjectType(item.label)}
                              className={`py-3 px-3 rounded-xl border text-xs font-mono font-medium transition-all text-center flex items-center justify-center gap-1.5 ${
                                active
                                  ? "bg-emerald-950/40 border-emerald-500/60 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/50"
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
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                        2. Target Investment (INR Tiers)
                      </label>
                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                        {budgetOptions.map((opt) => {
                          const active = budget === opt.label;
                          return (
                            <button
                              type="button"
                              key={opt.id}
                              onClick={() => setBudget(opt.label)}
                              className={`py-3 px-3 rounded-xl border text-xs font-mono transition-all text-center flex flex-col items-center justify-center gap-0.5 ${
                                active
                                  ? "bg-emerald-950/40 border-emerald-500/60 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.15)] ring-1 ring-emerald-500/50"
                                  : "bg-[#0d0d0d] border-white/10 text-zinc-400 hover:border-white/20 hover:text-zinc-200"
                              }`}
                            >
                              <span className="font-bold text-white text-[13px]">{opt.label}</span>
                              <span className="text-[10px] text-zinc-500">{opt.tier}</span>
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* 3. Name & Email Inputs */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                          3. Your Name
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Alex Sharma"
                          className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3.5 text-xs sm:text-sm font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                          4. Email Address
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="alex@company.com"
                          className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl px-4 py-3.5 text-xs sm:text-sm font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                        />
                      </div>
                    </div>

                    {/* 4. Scope / Idea Textarea */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                        5. Project Scope &amp; Deliverables
                      </label>
                      <textarea
                        rows={4}
                        required
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                        placeholder="Briefly describe what you're building, target users, specific APIs (MQTT, audio, payment), or links to Figma wireframes..."
                        className="w-full bg-[#0d0d0d] border border-white/10 rounded-xl p-4 text-xs sm:text-sm font-mono text-white placeholder-neutral-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/50 transition-all resize-none"
                      />
                    </div>

                    {errorMessage && (
                      <div className="p-3 rounded-lg bg-red-950/40 border border-red-500/40 text-red-300 text-xs font-mono">
                        {errorMessage}
                      </div>
                    )}

                    {/* Submit Button */}
                    <div>
                      <button
                        type="submit"
                        className="w-full py-4 rounded-xl bg-white text-black font-semibold text-sm font-mono hover:bg-zinc-200 transition-all flex items-center justify-center gap-2.5 shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_35px_rgba(255,255,255,0.4)] group"
                      >
                        <span>Send Project Brief</span>
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>

              {/* External Tally Option Below Form */}
              <div className="mt-8 pt-5 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-mono text-zinc-500">
                <span>Direct client intake • 24h guaranteed written response</span>
                <a
                  href="https://tally.so/r/RGOLX4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-zinc-400 hover:text-emerald-400 transition-colors"
                >
                  <span>Prefer standard form? Open on Tally</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Direct Connect, SLA & Pricing Summary (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Response Guarantee Card */}
            <div className="amoled-card rounded-2xl p-6 border border-white/10 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">24-Hour SLA</h4>
                  <p className="text-[11px] text-zinc-400 font-mono">Guaranteed Turnaround</p>
                </div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed font-mono">
                Every inquiry receives a written technical feasibility breakdown, recommended tech
                stack, and fixed sprint quote within 1 business day.
              </p>
            </div>

            {/* Quick INR Sprint Guide */}
            <div className="amoled-card rounded-2xl p-6 border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400">
                <Zap className="w-3.5 h-3.5 text-emerald-400" />
                <span>INR Sprint Packages</span>
              </div>

              <div className="space-y-2 pt-1 font-mono">
                <div className="p-2.5 rounded-lg bg-black border border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <div className="text-white font-semibold">Starter / Prototype</div>
                    <div className="text-[10px] text-zinc-500">2–4 Days Delivery</div>
                  </div>
                  <span className="text-emerald-400 font-bold">₹5k – ₹8k</span>
                </div>

                <div className="p-2.5 rounded-lg bg-black border border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <div className="text-white font-semibold">Lean Core MVP</div>
                    <div className="text-[10px] text-zinc-500">7–10 Days Delivery</div>
                  </div>
                  <span className="text-emerald-300 font-bold">₹10k – ₹18k</span>
                </div>

                <div className="p-2.5 rounded-lg bg-black border border-white/5 flex items-center justify-between text-xs">
                  <div>
                    <div className="text-white font-semibold">Real-Time System</div>
                    <div className="text-[10px] text-zinc-500">2 Weeks Delivery</div>
                  </div>
                  <span className="text-cyan-400 font-bold">₹20k – ₹30k</span>
                </div>
              </div>
            </div>

            {/* Direct Connect Options */}
            <div className="amoled-card rounded-2xl p-6 border border-white/10 space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                Verified Direct Channels
              </h4>

              <a
                href="mailto:avitan.offic@gmail.com"
                className="flex items-center justify-between p-3 rounded-xl bg-black border border-white/5 hover:border-emerald-500/40 hover:bg-zinc-950 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400" />
                  <span className="text-xs font-mono text-zinc-300 group-hover:text-white">
                    avitan.offic@gmail.com
                  </span>
                </div>
                <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400" />
              </a>

              <a
                href="https://github.com/Avi13An"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-black border border-white/5 hover:border-cyan-500/40 hover:bg-zinc-950 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400" />
                  <span className="text-xs font-mono text-zinc-300 group-hover:text-white">
                    github.com/Avi13An
                  </span>
                </div>
                <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400" />
              </a>

              <a
                href="https://www.linkedin.com/in/avi-tandon-029308329/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-black border border-white/5 hover:border-violet-500/40 hover:bg-zinc-950 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-4 h-4 text-zinc-400 group-hover:text-violet-400" />
                  <span className="text-xs font-mono text-zinc-300 group-hover:text-white truncate max-w-[190px]">
                    linkedin.com/in/avi-tandon
                  </span>
                </div>
                <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400" />
              </a>
            </div>

            {/* NDA & IP Security Badge */}
            <div className="rounded-xl bg-zinc-950/80 p-4 border border-white/5 space-y-1 text-zinc-400 text-xs font-mono">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>100% IP &amp; Code Ownership</span>
              </div>
              <p className="text-[11px] text-zinc-500">
                Mutual NDA signed prior to project kick-off. You retain full ownership of all
                code, intellectual property, repositories, and cloud credentials.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
