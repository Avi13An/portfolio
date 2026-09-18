"use client";

import React, { useState } from "react";
import {
  Send,
  Calendar,
  CheckCircle2,
  Mail,
  MessageSquare,
  Sparkles,
  ExternalLink,
  Github,
  Linkedin,
  Twitter,
  Clock,
  Code,
} from "lucide-react";

export function ProjectIntake() {
  const [activeTab, setActiveTab] = useState<"form" | "tally">("form");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "Rapid MVP (2-Week Launch)",
    budget: "$10k - $20k",
    timeline: "Immediate (< 2 Weeks)",
    details: "",
  });

  const projectTypes = [
    "Rapid MVP (2-Week Launch)",
    "Mobile App (React Native/Expo)",
    "Real-Time & Audio Engine",
    "SaaS Dashboard & Internal Tool",
    "Architecture Audit & Consulting",
  ];

  const budgetRanges = ["$5,000 – $10,000", "$10,000 – $20,000", "$20,000+"];

  const timelines = ["Immediate (< 2 Weeks)", "Within 1 Month", "Flexible / Exploring"];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <section id="intake" className="py-24 bg-black relative border-t border-white/10">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 w-[500px] h-[500px] glow-emerald opacity-30 pointer-events-none -z-10" />
      <div className="absolute bottom-10 left-10 w-[400px] h-[400px] glow-cyan opacity-20 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>START A PROJECT</span>
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
          {/* Left Column: Intake View (8 cols) */}
          <div className="lg:col-span-8">
            {/* Toggle Tabs: Interactive Intake Form vs. Tally.so Embed */}
            <div className="flex items-center gap-2 mb-6 p-1 bg-zinc-950 rounded-xl border border-white/10 w-fit">
              <button
                onClick={() => setActiveTab("form")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeTab === "form"
                    ? "bg-white text-black shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Interactive Intake Form</span>
              </button>
              <button
                onClick={() => setActiveTab("tally")}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-mono font-medium transition-all ${
                  activeTab === "tally"
                    ? "bg-white text-black shadow-sm"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Tally.so / Cal.com Embed</span>
              </button>
            </div>

            {/* TAB 1: Custom Interactive Form */}
            {activeTab === "form" && (
              <div className="amoled-card rounded-2xl p-6 sm:p-8 border border-white/15 relative">
                {isSubmitted ? (
                  <div className="py-12 text-center space-y-4">
                    <div className="w-16 h-16 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(16,185,129,0.3)]">
                      <CheckCircle2 className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-white font-mono">
                      Project Intake Received!
                    </h3>
                    <p className="text-zinc-400 text-sm max-w-md mx-auto font-mono">
                      Thank you, <span className="text-emerald-400">{formData.name}</span>. I have
                      logged your requirements for a{" "}
                      <span className="text-white">{formData.projectType}</span>. I will review your
                      scope and reach out at <span className="text-white">{formData.email}</span> within
                      24 hours.
                    </p>
                    <div className="pt-4">
                      <button
                        onClick={() => setIsSubmitted(false)}
                        className="px-4 py-2 rounded-lg bg-zinc-900 border border-white/10 text-xs font-mono text-zinc-300 hover:text-white"
                      >
                        Submit Another Inquiry
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Project Scope Selection */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                        1. What type of project are you building?
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {projectTypes.map((type) => (
                          <button
                            type="button"
                            key={type}
                            onClick={() => setFormData({ ...formData, projectType: type })}
                            className={`p-3 text-left rounded-xl border text-xs font-mono transition-all ${
                              formData.projectType === type
                                ? "bg-emerald-950/30 border-emerald-500/50 text-emerald-300 shadow-sm"
                                : "bg-black border-white/10 text-zinc-400 hover:border-white/20 hover:text-white"
                            }`}
                          >
                            {type}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Timeline & Budget Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {/* Timeline */}
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                          2. Desired Timeline
                        </label>
                        <select
                          value={formData.timeline}
                          onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-3 text-xs font-mono text-white focus:outline-none focus:border-emerald-500/60"
                        >
                          {timelines.map((time) => (
                            <option key={time} value={time} className="bg-zinc-950 text-white">
                              {time}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Budget */}
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                          3. Estimated Budget
                        </label>
                        <select
                          value={formData.budget}
                          onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-3 text-xs font-mono text-white focus:outline-none focus:border-emerald-500/60"
                        >
                          {budgetRanges.map((b) => (
                            <option key={b} value={b} className="bg-zinc-950 text-white">
                              {b}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Name and Email */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                          4. Your Name
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Alex Miller"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-3 text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/60"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                          5. Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="alex@company.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-3 text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/60"
                        />
                      </div>
                    </div>

                    {/* Project Overview Details */}
                    <div>
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                        6. Project Overview / PRD Links / Key Requirements
                      </label>
                      <textarea
                        rows={4}
                        required
                        placeholder="Briefly describe what you're building, target users, any specific APIs, audio/video specs, or links to Figma wireframes..."
                        value={formData.details}
                        onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                        className="w-full bg-black border border-white/10 rounded-xl px-3.5 py-3 text-xs font-mono text-white placeholder:text-zinc-600 focus:outline-none focus:border-emerald-500/60"
                      />
                    </div>

                    {/* Submit Button */}
                    <button
                      type="submit"
                      className="w-full py-4 rounded-xl bg-white text-black font-semibold text-sm hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(255,255,255,0.2)] hover:shadow-[0_0_35px_rgba(255,255,255,0.35)]"
                    >
                      <Send className="w-4 h-4" />
                      <span>Submit Project Intake (24h Guaranteed Response)</span>
                    </button>
                  </form>
                )}
              </div>
            )}

            {/* TAB 2: Tally.so / Cal.com Embed Container */}
            {activeTab === "tally" && (
              <div className="amoled-card rounded-2xl p-6 border border-white/15 relative overflow-hidden">
                <div className="mb-4 flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                    <span>Direct Embed Container (Tally.so / Cal.com)</span>
                  </div>
                  <a
                    href="https://tally.so"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[11px] font-mono text-zinc-500 hover:text-zinc-300 flex items-center gap-1"
                  >
                    <span>Powered by Tally</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

                {/* Embed Placeholder Frame */}
                <div className="rounded-xl bg-black border border-white/10 min-h-[480px] flex flex-col items-center justify-center p-8 text-center">
                  <div className="w-14 h-14 rounded-2xl bg-zinc-950 border border-white/10 flex items-center justify-center text-emerald-400 mb-4 shadow-inner">
                    <Code className="w-7 h-7" />
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">Tally.so Embed Ready</h4>
                  <p className="text-xs text-zinc-400 font-mono max-w-md mb-6 leading-relaxed">
                    Paste your Tally Form ID or embed URL in the component to activate live form
                    submission, or schedule directly via Cal.com.
                  </p>

                  <div className="bg-zinc-950 p-4 rounded-xl border border-white/10 text-left font-mono text-xs text-zinc-400 max-w-lg w-full mb-6">
                    <p className="text-zinc-500 mb-2">// Simply replace src with your Tally ID:</p>
                    <code className="text-emerald-300 block overflow-x-auto">
                      &lt;iframe src=&quot;https://tally.so/embed/YOUR_FORM_ID&quot; width=&quot;100%&quot;
                      height=&quot;500&quot; frameBorder=&quot;0&quot; /&gt;
                    </code>
                  </div>

                  <a
                    href="mailto:contact@avitandon.dev?subject=Project%20Inquiry%20-%202-Week%20MVP"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-zinc-900 border border-white/15 text-xs font-mono text-white hover:bg-zinc-800 transition-colors"
                  >
                    <Mail className="w-4 h-4 text-emerald-400" />
                    <span>Or Email Directly: contact@avitandon.dev</span>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Fast-Track Contact & Guarantees (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Response Guarantee Card */}
            <div className="amoled-card rounded-2xl p-6 border border-white/10 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-950/50 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">24-Hour SLA</h4>
                  <p className="text-[11px] text-zinc-500 font-mono">Guaranteed Turnaround</p>
                </div>
              </div>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Every inquiry receives a written technical feasibility breakdown, recommended tech
                stack, and preliminary milestone schedule within 1 business day.
              </p>
            </div>

            {/* Direct Connect Options */}
            <div className="amoled-card rounded-2xl p-6 border border-white/10 space-y-4">
              <h4 className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                Direct Channels
              </h4>

              <a
                href="mailto:contact@avitandon.dev"
                className="flex items-center justify-between p-3 rounded-xl bg-black border border-white/5 hover:border-emerald-500/40 hover:bg-zinc-950 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-zinc-400 group-hover:text-emerald-400" />
                  <span className="text-xs font-mono text-zinc-300 group-hover:text-white">
                    contact@avitandon.dev
                  </span>
                </div>
                <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400" />
              </a>

              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-black border border-white/5 hover:border-cyan-500/40 hover:bg-zinc-950 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Github className="w-4 h-4 text-zinc-400 group-hover:text-cyan-400" />
                  <span className="text-xs font-mono text-zinc-300 group-hover:text-white">
                    github.com/avitandon
                  </span>
                </div>
                <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400" />
              </a>

              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-black border border-white/5 hover:border-violet-500/40 hover:bg-zinc-950 transition-all group"
              >
                <div className="flex items-center gap-3">
                  <Linkedin className="w-4 h-4 text-zinc-400 group-hover:text-violet-400" />
                  <span className="text-xs font-mono text-zinc-300 group-hover:text-white">
                    linkedin.com/in/avitandon
                  </span>
                </div>
                <ExternalLink className="w-3 h-3 text-zinc-600 group-hover:text-zinc-400" />
              </a>
            </div>

            {/* NDA & IP Security Badge */}
            <div className="rounded-xl bg-zinc-950/80 p-4 border border-white/5 space-y-1 text-zinc-400 text-xs font-mono">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>100% IP &amp; Code Ownership</span>
              </div>
              <p className="text-[11px] text-zinc-500">
                Mutual NDA signed prior to code handoff. You own all repositories, credentials, and
                infrastructure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
