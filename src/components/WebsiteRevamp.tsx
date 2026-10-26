"use client";

import React, { useState, useRef, useEffect, useCallback } from "react";
import {
  Sparkles,
  ExternalLink,
  ChevronsLeftRight,
  RotateCcw,
  Sliders,
  Columns,
  Zap,
  CheckCircle2,
  Lock,
  Globe,
} from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const EASE_CUSTOM: [number, number, number, number] = [0.16, 1, 0.3, 1];

const ORIGINAL_URL = "https://www.bentham.legal/";
const REVAMP_URL = "https://benthamrevamp.vercel.app/";

export function WebsiteRevamp() {
  const [viewMode, setViewMode] = useState<"slider" | "sideBySide">("slider");
  const [sliderPos, setSliderPos] = useState<number>(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [iframeKey, setIframeKey] = useState<number>(0);

  const containerRef = useRef<HTMLDivElement | null>(null);

  // Dragging logic for the Split Slider
  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const clampedPos = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(clampedPos);
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      handleMove(e.clientX);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      handleMove(e.touches[0].clientX);
    };

    const onEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onEnd);
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("touchend", onEnd);
    }

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onEnd);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onEnd);
    };
  }, [isDragging, handleMove]);

  const handleReset = () => {
    setSliderPos(50);
    setIframeKey((k) => k + 1);
  };

  return (
    <section
      id="revamp-showcase"
      className="py-24 bg-black relative border-t border-white/[0.08] overflow-hidden"
    >
      {/* Ambient background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-cyan-500/[0.07] blur-[170px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[400px] bg-violet-500/[0.06] blur-[160px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE_CUSTOM }}
          className="max-w-3xl mx-auto text-center mb-10"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4 shadow-[0_0_20px_rgba(16,185,129,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>PRODUCTION CASE STUDY // 02 • FULL-STACK WEB REVAMP</span>
          </div>

          {/* Metallic Headline */}
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-4 heading-metallic font-sans">
            Bentham Legal — From Static Architecture to High-Performance Platform
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 font-mono leading-relaxed mb-6">
            Legacy Webflow corporate website rebuilt into a sub-second Next.js 15 enterprise platform with real-time responsive typography and interactive legal intake.
          </p>

          {/* Quick Impact Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3 mb-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/50 border border-emerald-500/40 text-emerald-300 text-xs font-mono">
              <Zap className="w-3.5 h-3.5 text-emerald-400" />
              <span>0.4s FCP (from 3.4s)</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-cyan-950/50 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
              <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" />
              <span>100/100 Next.js 15 + Tailwind</span>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-violet-950/50 border border-violet-500/40 text-violet-300 text-xs font-mono">
              <Sparkles className="w-3.5 h-3.5 text-violet-400" />
              <span>Live Interactive Preview</span>
            </div>
          </div>

          {/* Mode Switcher & Controls */}
          <div className="inline-flex items-center gap-1.5 p-1 rounded-full bg-zinc-950/90 border border-white/10 shadow-xl backdrop-blur-md">
            <button
              onClick={() => setViewMode("slider")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium transition-all ${
                viewMode === "slider"
                  ? "bg-white text-black shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Interactive Split Slider</span>
            </button>
            <button
              onClick={() => setViewMode("sideBySide")}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono font-medium transition-all ${
                viewMode === "sideBySide"
                  ? "bg-white text-black shadow-md"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <Columns className="w-3.5 h-3.5" />
              <span>Side-by-Side Dual View</span>
            </button>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* OPTION C: INTERACTIVE SPLIT SLIDER VIEW */}
        {/* ------------------------------------------------------------- */}
        {viewMode === "slider" && (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: EASE_CUSTOM }}
            className="w-full rounded-2xl sm:rounded-3xl bg-zinc-950/90 border border-white/10 shadow-[0_0_60px_-15px_rgba(6,182,212,0.15)] overflow-hidden"
          >
            {/* macOS Browser Header Bar */}
            <div className="px-4 py-3 bg-[#0a0a0d] border-b border-white/[0.08] flex items-center justify-between gap-4">
              {/* Traffic light window controls */}
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
                <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
              </div>

              {/* URL Pill Readout */}
              <div className="flex-1 max-w-md mx-auto hidden sm:flex items-center justify-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/10 text-[11px] font-mono text-zinc-400">
                <Lock className="w-3 h-3 text-emerald-400" />
                <span className="truncate">
                  {sliderPos < 50 ? "Original: bentham.legal" : "Revamped: benthamrevamp.vercel.app"}
                </span>
                <span className="text-zinc-600">({Math.round(sliderPos)}% Split)</span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={handleReset}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-zinc-900 border border-white/10 hover:border-white/30 text-zinc-300 hover:text-white text-xs font-mono transition-colors"
                  title="Reset slider position & iframes"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span className="hidden md:inline">Reset</span>
                </button>
                <a
                  href={REVAMP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 px-3 py-1 rounded-md bg-cyan-950/80 border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 text-xs font-mono transition-colors"
                >
                  <span>Open Revamp</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Viewport Frame with Draggable Split Slider */}
            <div
              ref={containerRef}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              className={`relative w-full h-[520px] sm:h-[620px] md:h-[700px] overflow-hidden select-none bg-black ${
                isDragging ? "cursor-ew-resize" : ""
              }`}
            >
              {/* Layer 1: Left / Underneath = Original Website */}
              <div className="absolute inset-0 w-full h-full bg-[#0d0d10]">
                {/* Header Tag */}
                <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded-md bg-black/80 border border-white/20 backdrop-blur-md flex items-center gap-2 text-xs font-mono text-zinc-300 shadow-xl pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  <span>ORIGINAL // bentham.legal</span>
                </div>

                <iframe
                  key={`orig-${iframeKey}`}
                  src={ORIGINAL_URL}
                  title="Bentham Legal Original Website"
                  className={`w-full h-full border-0 ${
                    isDragging ? "pointer-events-none" : "pointer-events-auto"
                  }`}
                  loading="lazy"
                />
              </div>

              {/* Layer 2: Right / On Top = Revamped Platform (Clipped by sliderPos) */}
              <div
                style={{
                  clipPath: `inset(0 0 0 ${sliderPos}%)`,
                }}
                className="absolute inset-0 w-full h-full bg-black z-10"
              >
                {/* Header Tag */}
                <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded-md bg-cyan-950/90 border border-cyan-500/40 backdrop-blur-md flex items-center gap-2 text-xs font-mono text-cyan-300 shadow-xl pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                  <span>REVAMP // Next.js 15 + Tailwind</span>
                </div>

                <iframe
                  key={`revamp-${iframeKey}`}
                  src={REVAMP_URL}
                  title="Bentham Legal Revamped Platform"
                  className={`w-full h-full border-0 ${
                    isDragging ? "pointer-events-none" : "pointer-events-auto"
                  }`}
                  loading="lazy"
                />
              </div>

              {/* Vertical Glowing Divider Handle */}
              <div
                style={{ left: `${sliderPos}%` }}
                className="absolute top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-emerald-400 to-violet-400 -translate-x-1/2 z-30 pointer-events-none shadow-[0_0_20px_rgba(6,182,212,0.8)]"
              >
                {/* Draggable Knob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-zinc-950 border-2 border-cyan-400 shadow-[0_0_25px_rgba(6,182,212,0.9)] flex items-center justify-center text-cyan-300 pointer-events-auto cursor-ew-resize hover:scale-110 active:scale-95 transition-transform">
                  <ChevronsLeftRight className="w-4 h-4" />
                </div>
              </div>

              {/* Drag Hint at Bottom */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 px-3 py-1 rounded-full bg-black/85 border border-white/15 text-[11px] font-mono text-zinc-300 backdrop-blur-md shadow-lg pointer-events-none">
                ↔ Drag slider to compare performance &amp; UI
              </div>
            </div>
          </motion.div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* OPTION B: SIDE-BY-SIDE DUAL VIEW */}
        {/* ------------------------------------------------------------- */}
        {viewMode === "sideBySide" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE_CUSTOM }}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {/* Left Card: Original Bentham */}
            <div className="rounded-2xl bg-zinc-950/90 border border-white/10 shadow-xl overflow-hidden flex flex-col">
              <div className="px-4 py-3 bg-[#0a0a0d] border-b border-white/[0.08] flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="text-xs font-mono font-medium text-zinc-300">
                    Legacy: bentham.legal
                  </span>
                </div>
                <a
                  href={ORIGINAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] font-mono text-zinc-400 hover:text-white"
                >
                  <span>Visit</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="w-full h-[480px] sm:h-[560px] bg-black">
                <iframe
                  src={ORIGINAL_URL}
                  title="Bentham Original"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>

            {/* Right Card: Revamped Platform */}
            <div className="rounded-2xl bg-zinc-950/90 border border-cyan-500/30 shadow-[0_0_35px_-5px_rgba(6,182,212,0.15)] overflow-hidden flex flex-col">
              <div className="px-4 py-3 bg-[#0a0a0d] border-b border-cyan-500/30 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <span className="text-xs font-mono font-semibold text-cyan-300">
                    Production Revamp: benthamrevamp.vercel.app
                  </span>
                </div>
                <a
                  href={REVAMP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-[11px] font-mono text-cyan-400 hover:text-cyan-300"
                >
                  <span>Visit</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <div className="w-full h-[480px] sm:h-[560px] bg-black">
                <iframe
                  src={REVAMP_URL}
                  title="Bentham Revamped"
                  className="w-full h-full border-0"
                  loading="lazy"
                />
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
