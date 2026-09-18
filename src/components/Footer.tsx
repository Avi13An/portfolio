"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, Cpu, Mail, Github, Linkedin } from "lucide-react";

export function Footer() {
  const [time, setTime] = useState<string>("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour12: false,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-black border-t border-white/10 py-12 text-zinc-400 font-mono text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/15 flex items-center justify-center text-emerald-400">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <div className="text-white font-semibold text-sm">AVI TANDON</div>
              <div className="text-[11px] text-zinc-400">
                Full-Stack &amp; Systems MVP Developer
              </div>
            </div>
          </div>

          {/* Direct Social & Contact Anchors */}
          <div className="flex items-center gap-4">
            <a
              href="mailto:avitan.offic@gmail.com"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-zinc-950 border border-white/10 hover:border-emerald-500/40 hover:text-emerald-300 transition-all text-zinc-300"
            >
              <Mail className="w-3.5 h-3.5 text-emerald-400" />
              <span>avitan.offic@gmail.com</span>
            </a>
            <a
              href="https://github.com/Avi13An"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-lg bg-zinc-950 border border-white/10 hover:border-cyan-500/40 hover:text-cyan-300 transition-all text-zinc-400"
            >
              <Github className="w-4 h-4" />
            </a>
            <a
              href="https://www.linkedin.com/in/avi-tandon-029308329/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-lg bg-zinc-950 border border-white/10 hover:border-violet-500/40 hover:text-violet-300 transition-all text-zinc-400"
            >
              <Linkedin className="w-4 h-4" />
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-zinc-950 px-3 py-1.5 rounded-lg border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-zinc-300">LOCAL CLOCK: {time || "16:10:00"} IST</span>
            </div>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-zinc-400 hover:text-white px-3 py-1.5 rounded-lg bg-zinc-950 border border-white/10 hover:border-white/20 transition-all"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-zinc-500 text-[11px]">
          <div>
            © {new Date().getFullYear()} Avi Tandon. All rights reserved. Deploy-ready for Vercel.
          </div>
          <div className="flex items-center gap-2">
            <span>Pure AMOLED #000000 Engine</span>
            <span>•</span>
            <span>Next.js 15 App Router</span>
            <span>•</span>
            <span>Tailwind CSS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
