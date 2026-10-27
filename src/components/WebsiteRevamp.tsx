"use client";

import React, { useState, useEffect } from "react";
import {
  ExternalLink,
  Lock,
  Maximize2,
  X,
  Zap,
  AlertTriangle,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import LiquidMetalButton from "@/components/ui/liquid-metal-button";

const EASE_CUSTOM: [number, number, number, number] = [0.16, 1, 0.3, 1];

const ORIGINAL_URL = "https://www.bentham.legal/";
const REVAMP_URL = "https://benthamrevamp.vercel.app/";

export function WebsiteRevamp() {
  const [activeTab, setActiveTab] = useState<"legacy" | "revamp">("revamp");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const activeUrl = activeTab === "legacy" ? ORIGINAL_URL : REVAMP_URL;
  const activeDisplayUrl =
    activeTab === "legacy"
      ? "https://www.bentham.legal"
      : "https://benthamrevamp.vercel.app";

  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isFullscreen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFullscreen) {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen]);

  return (
    <section
      id="revamp-showcase"
      className={`py-24 bg-black relative border-t border-white/[0.08] ${
        isFullscreen ? "overflow-visible" : "overflow-hidden"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. HEADER & CONTROLS */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE_CUSTOM }}
          className="max-w-3xl mx-auto text-center mb-10"
        >
          {/* Eyebrow */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.12] text-zinc-300 text-xs mb-4 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/70 opacity-75"></span>
              <span className="relative inline-flex rounded-full w-2 h-2 bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]"></span>
            </span>
            <span>CASE STUDY // 02 • FULL-STACK WEB REVAMP</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-4 heading-metallic">
            Bentham Legal — Production Revamp Showcase
          </h2>

          {/* Subline */}
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-8">
            Toggle between the legacy client architecture and my modernized,
            high-conversion rebuild.
          </p>

          {/* Segmented Toggle */}
          <div className="inline-flex items-center p-1.5 rounded-full bg-black/90 border border-white/[0.1] shadow-2xl relative backdrop-blur-md gap-1">
            {/* Tab 1: Legacy Website */}
            <button
              type="button"
              onClick={() => setActiveTab("legacy")}
              className={`relative px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm transition-all z-10 flex items-center gap-2 border ${
                activeTab === "legacy"
                  ? "bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.25)] border-transparent"
                  : "bg-white/[0.03] text-zinc-400 border-white/[0.06] hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${activeTab === "legacy" ? "bg-black" : "bg-zinc-600"}`} />
              <span>Legacy Client Build</span>
            </button>

            {/* Tab 2: Avi's Revamp */}
            <button
              type="button"
              onClick={() => setActiveTab("revamp")}
              className={`relative px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm transition-all z-10 flex items-center gap-2 border ${
                activeTab === "revamp"
                  ? "bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.25)] border-transparent"
                  : "bg-white/[0.03] text-zinc-400 border-white/[0.06] hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <span className={`w-2 h-2 rounded-full shrink-0 ${activeTab === "revamp" ? "bg-black" : "bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)] animate-pulse"}`} />
              <span>Production Revamp (Live)</span>
            </button>
          </div>

          {/* Rapid-Fire Contrast Status Pill */}
          <div className="mt-5 flex items-center justify-center min-h-[40px]">
            <AnimatePresence mode="wait">
              {activeTab === "legacy" ? (
                <motion.div
                  key="legacy-pill"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: EASE_CUSTOM }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.1] text-zinc-400 text-xs shadow-inner text-center"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                  <span>
                    Status: 3.4s Load Time • Cluttered Information Architecture • Rigid Static Layout
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="revamp-pill"
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.25, ease: EASE_CUSTOM }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/[0.15] text-white text-xs shadow-[0_0_25px_rgba(255,255,255,0.06)] text-center"
                >
                  <Zap className="w-3.5 h-3.5 text-white shrink-0" />
                  <span>
                    Status: 0.4s FCP • 99 Core Web Vitals • Interactive Hero Sandbox • Next.js 15 &amp; Framer Motion
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* 2. EXPANSIVE FULL-WIDTH BROWSER CHASSIS */}
        <div
          className={
            isFullscreen
              ? "fixed inset-0 z-50 rounded-none h-screen w-screen bg-[#0A0A0E] flex flex-col shadow-2xl"
              : "w-full rounded-2xl sm:rounded-3xl bg-[#0A0A0E] border border-white/[0.1] shadow-2xl overflow-hidden flex flex-col"
          }
        >
          {/* Browser Header Bar */}
          <div className="px-4 py-3 bg-[#0a0a0d] border-b border-white/[0.08] flex items-center justify-between gap-3 shrink-0 select-none">
            {/* Left: Window Dots */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => isFullscreen && setIsFullscreen(false)}
                title={isFullscreen ? "Exit Fullscreen" : "Close"}
                className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-zinc-600 transition-opacity"
              />
              <span className="w-3 h-3 rounded-full bg-zinc-800" />
              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                title={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
                className="w-3 h-3 rounded-full bg-zinc-700 hover:bg-zinc-600 transition-opacity"
              />
            </div>

            {/* Center: Clean URL Pill */}
            <div className="flex-1 max-w-xs sm:max-w-md mx-2 flex items-center justify-center">
              <div className="w-full flex items-center justify-center gap-2 px-3 py-1.5 rounded-lg bg-black/60 border border-white/[0.08] text-xs text-zinc-300 shadow-inner">
                <Lock className="w-3 h-3 text-zinc-400 shrink-0" />
                <span className="truncate">{activeDisplayUrl}</span>
              </div>
            </div>

            {/* Right Action Controls */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Open Live Site */}
              <a
                href={activeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <LiquidMetalButton
                  label="Open Live Site"
                  icon={<ExternalLink className="w-3.5 h-3.5" />}
                />
              </a>

              {/* Fullscreen View / Exit Fullscreen */}
              <LiquidMetalButton
                onClick={() => setIsFullscreen(!isFullscreen)}
                label={isFullscreen ? "Exit Fullscreen" : "Fullscreen View"}
                icon={
                  isFullscreen ? (
                    <X className="w-3.5 h-3.5 text-zinc-300" />
                  ) : (
                    <Maximize2 className="w-3.5 h-3.5 text-zinc-300" />
                  )
                }
              />
            </div>
          </div>

          {/* Browser Body with Dual Mounted Iframes */}
          <div
            className={`w-full relative ${
              isFullscreen
                ? "flex-1 min-h-0"
                : "h-[650px] sm:h-[750px] lg:h-[820px]"
            } bg-black overflow-hidden`}
          >
            {/* Iframe 1: Legacy Bentham */}
            <iframe
              src={ORIGINAL_URL}
              title="Bentham Legal Legacy Website"
              className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-300 ${
                activeTab === "legacy"
                  ? "opacity-100 z-10 pointer-events-auto"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
              loading="lazy"
            />

            {/* Iframe 2: Avi's Modern Revamp */}
            <iframe
              src={REVAMP_URL}
              title="Avi's Bentham Legal Modern Revamp"
              className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-300 ${
                activeTab === "revamp"
                  ? "opacity-100 z-10 pointer-events-auto"
                  : "opacity-0 z-0 pointer-events-none"
              }`}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
