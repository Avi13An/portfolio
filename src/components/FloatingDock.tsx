"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Check, ArrowUpRight, Copy } from "lucide-react";

const EASE_CUSTOM: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function FloatingDock() {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText("avitan.offic@gmail.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <motion.div
      initial={{ y: 60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: EASE_CUSTOM, delay: 0.5 }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 max-w-[94vw] sm:max-w-fit pointer-events-auto"
    >
      <div className="flex items-center gap-2 sm:gap-3 bg-black/85 backdrop-blur-2xl border border-emerald-500/30 rounded-full px-3 sm:px-5 py-2 sm:py-2.5 shadow-[0_10px_35px_-10px_rgba(16,185,129,0.35)] ring-1 ring-white/10">
        {/* Pulsing Status Dot & Text */}
        <div className="flex items-center gap-2 pr-1 border-r border-white/10 hidden sm:flex">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[11px] font-mono text-emerald-300 font-medium whitespace-nowrap">
            Available for Next Sprint
          </span>
        </div>

        {/* Email Copy Pill */}
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 hover:border-emerald-500/50 text-zinc-300 hover:text-white transition-all text-xs font-mono group"
          title="Click to copy email address"
        >
          <Mail className="w-3.5 h-3.5 text-emerald-400" />
          <span className="hidden md:inline">avitan.offic@gmail.com</span>
          <span className="md:hidden">Email</span>

          <AnimatePresence mode="wait">
            {copied ? (
              <motion.span
                key="copied"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="flex items-center gap-1 text-emerald-400 font-bold ml-1 text-[11px]"
              >
                <Check className="w-3 h-3" />
                <span>Copied!</span>
              </motion.span>
            ) : (
              <Copy className="w-3 h-3 text-zinc-500 group-hover:text-zinc-300 ml-0.5" />
            )}
          </AnimatePresence>
        </button>

        {/* Start Project Button */}
        <a
          href="#intake"
          className="flex items-center gap-1.5 px-3.5 sm:px-4 py-1.5 rounded-full bg-white text-black font-semibold text-xs font-mono hover:bg-zinc-200 transition-all shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,255,255,0.5)] shrink-0"
        >
          <span>Start Project</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </motion.div>
  );
}
