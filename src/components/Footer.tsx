"use client";

import React, { useState, useEffect } from "react";
import { ArrowUp, Terminal, Cpu, Heart } from "lucide-react";

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
            <div className="w-7 h-7 rounded bg-zinc-900 border border-white/15 flex items-center justify-center text-emerald-400">
              <Cpu className="w-3.5 h-3.5" />
            </div>
            <div>
              <div className="text-white font-semibold">AVI TANDON // DEV LAB</div>
              <div className="text-[11px] text-zinc-500">
                Production-Ready MVPs &amp; Low-Latency Audio Engines
              </div>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 bg-zinc-950 px-3 py-1.5 rounded-lg border border-white/10">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="text-zinc-300">LOCAL CLOCK: {time || "15:15:00"} IST</span>
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
