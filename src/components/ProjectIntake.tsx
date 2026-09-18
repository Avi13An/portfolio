"use client";

import React, { useEffect } from "react";
import {
  Sparkles,
  ExternalLink,
  Mail,
  Github,
  Linkedin,
  Clock,
  CheckCircle2,
  Send,
  Zap,
} from "lucide-react";

export function ProjectIntake() {
  // Dynamically load Tally embed script if not already present
  useEffect(() => {
    const existingScript = document.querySelector(
      'script[src="https://tally.so/widgets/embed.js"]'
    );
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = "https://tally.so/widgets/embed.js";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

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
          {/* Left Column: Live Tally Form Embed Container (8 cols) */}
          <div className="lg:col-span-8 space-y-4">
            {/* Embed Header Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 bg-zinc-950 rounded-xl border border-white/10">
              <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span>Direct Intake Questionnaire (Secure Tally Form)</span>
              </div>

              <div className="flex items-center gap-2">
                <a
                  href="https://tally.so/r/RGOLX4"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-900 border border-white/10 hover:border-emerald-500/40 text-xs font-mono text-zinc-300 hover:text-white transition-colors"
                >
                  <span>Open Form in New Tab</span>
                  <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
                </a>
              </div>
            </div>

            {/* Embedded Live Tally iframe */}
            <div className="amoled-card rounded-2xl p-1 sm:p-2 border border-white/15 relative overflow-hidden shadow-2xl">
              <iframe
                data-tally-src="https://tally.so/r/RGOLX4?transparentBackground=1"
                src="https://tally.so/r/RGOLX4?transparentBackground=1"
                width="100%"
                height="600"
                frameBorder="0"
                marginHeight={0}
                marginWidth={0}
                title="Start an MVP Project"
                className="w-full rounded-2xl border border-white/10 bg-neutral-950/60 min-h-[600px]"
              />
            </div>

            {/* Direct Email Fallback Strip */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 p-4 rounded-xl bg-zinc-950/90 border border-white/10 font-mono text-xs text-zinc-400">
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Prefer email over forms?</span>
              </div>
              <a
                href="mailto:avitan.offic@gmail.com?subject=Project%20Inquiry%20-%20Avi%20Tandon"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white text-black font-semibold hover:bg-zinc-200 transition-colors shadow-sm"
              >
                <span>Email avitan.offic@gmail.com</span>
                <Send className="w-3 h-3" />
              </a>
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
                <CheckCircle2 className="w-3.5 h-3.5" />
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
