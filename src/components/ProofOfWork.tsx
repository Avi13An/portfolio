"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  ExternalLink,
  Lock,
  Maximize2,
  X,
  Zap,
  AlertTriangle,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Smartphone,
  Globe,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import LiquidMetalButton from "@/components/ui/liquid-metal-button";

const EASE_CUSTOM: [number, number, number, number] = [0.16, 1, 0.3, 1];

const ORIGINAL_URL = "https://www.bentham.legal/";
const REVAMP_URL = "https://benthamrevamp.vercel.app/";

export function ProofOfWork() {
  // Primary Tab State
  const [powTab, setPowTab] = useState<"bentham" | "sukoon">("bentham");

  // Bentham Tab & Fullscreen States
  const [activeBenthamTab, setActiveBenthamTab] = useState<"legacy" | "revamp">("revamp");
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const activeBenthamUrl = activeBenthamTab === "legacy" ? ORIGINAL_URL : REVAMP_URL;
  const activeBenthamDisplayUrl =
    activeBenthamTab === "legacy"
      ? "https://www.bentham.legal"
      : "https://benthamrevamp.vercel.app";

  // Sukoon States
  const [sukoonMode, setSukoonMode] = useState<"video" | "screenshots">("video");
  const [activeScreenIndex, setActiveScreenIndex] = useState(1); // Default to Now Playing
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const videoRef = useRef<HTMLVideoElement>(null);

  const sukoonScreens = [
    {
      id: "discovery",
      label: "Discovery Feed",
      src: "/screenshots/home.png",
      tagline: "Apple Music RSS + iTunes Search API • Sub-150ms Ingestion",
    },
    {
      id: "player",
      label: "Now Playing",
      src: "/screenshots/player.png",
      tagline: "ExoPlayer Dual-Queue Pre-Seeding • 24-bit Lossless • 7s Stall Watchdog",
    },
    {
      id: "lyrics",
      label: "Synced Lyrics",
      src: "/screenshots/lyrics.png",
      tagline: "LRCLIB Millisecond Timecode Parsing • Programmatic Centering",
    },
    {
      id: "vocal",
      label: "Vocal Studio",
      src: "/screenshots/karaoke.png",
      tagline: "Raw 44.1kHz 16-bit PCM • Hardware Android MediaCodec Mixer",
    },
    {
      id: "jam",
      label: "Sukoon Jam",
      src: "/screenshots/party.png",
      tagline: "HiveMQ MQTT over WebSockets • NTP Mathematical Drift Compensation",
    },
  ];

  const currentScreen = sukoonScreens[activeScreenIndex];

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !videoRef.current.muted;
    setIsMuted(videoRef.current.muted);
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const progress = (videoRef.current.currentTime / videoRef.current.duration) * 100;
    setVideoProgress(isNaN(progress) ? 0 : progress);
  };

  // Fullscreen Scroll Lock & Escape Listener
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

  const bentoSpecs = [
    {
      title: "Sub-100ms Search",
      summary: "Real-time multithreaded indexed streaming queries.",
      metric: "< 85ms",
      badge: "Indexing",
      color: "text-white",
      accentBorder: "group-hover:border-white/30",
    },
    {
      title: "24-Bit Lossless",
      summary: "Dual-queue ExoPlayer pre-seeding with 7s stall watchdog.",
      metric: "44.1 kHz",
      badge: "ExoPlayer",
      color: "text-white",
      accentBorder: "group-hover:border-white/30",
    },
    {
      title: "Live Synced Lyrics",
      summary: "Millisecond LRCLIB parser with auto-centering & Devanagari.",
      metric: "±2ms Sync",
      badge: "Timing",
      color: "text-white",
      accentBorder: "group-hover:border-white/30",
    },
    {
      title: "Zero UI Jank",
      summary: "Direct memory-mapped C++ MMKV synchronous storage.",
      metric: "0.12ms Read",
      badge: "NDK C++",
      color: "text-white",
      accentBorder: "group-hover:border-white/30",
    },
  ];

  const specsContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const specCardVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: EASE_CUSTOM },
    },
  };

  return (
    <section
      id="featured-architecture"
      style={{ transform: "translateZ(0)" }}
      className={`py-24 bg-black relative border-t border-white/[0.08] ${
        isFullscreen ? "overflow-visible" : "overflow-hidden"
      }`}
    >
      {/* Anchor aliases for smooth navigation */}
      <span id="projects" className="absolute -top-24 pointer-events-none" />
      <span id="proof-of-work" className="absolute -top-24 pointer-events-none" />
      <span id="revamp-showcase" className="absolute -top-24 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. UNIFIED SECTION HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE_CUSTOM }}
          className="max-w-3xl mx-auto text-center mb-8"
        >
          {/* Eyebrow Badge */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.12] text-zinc-300 text-xs mb-4 shadow-[0_0_20px_rgba(255,255,255,0.05)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white/70 opacity-75"></span>
              <span className="relative inline-flex rounded-full w-2 h-2 bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]"></span>
            </span>
            <span>FEATURED CLIENT WORK • PROOF OF CONCEPT</span>
          </div>

          {/* Headline */}
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-[1.1] mb-4 heading-metallic">
            Production-Grade Engineering &amp; Design
          </h2>

          {/* Subline */}
          <p className="text-sm sm:text-base text-zinc-400 leading-relaxed mb-8 max-w-2xl mx-auto">
            Select a case study to inspect live architecture, performance metrics, and interactive systems.
          </p>

          {/* 2. PRIMARY SEGMENTED SWITCHER: Web Architecture vs Mobile Systems */}
          <div className="inline-flex items-center p-1.5 rounded-full bg-black/90 border border-white/[0.1] shadow-2xl relative backdrop-blur-md gap-1">
            {/* Tab 1: Web Architecture (Bentham) */}
            <button
              type="button"
              onClick={() => setPowTab("bentham")}
              className={`relative px-4 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm transition-all z-10 flex items-center gap-2 border ${
                powTab === "bentham"
                  ? "bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.25)] border-transparent"
                  : "bg-white/[0.03] text-zinc-400 border-white/[0.06] hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <Globe className={`w-3.5 h-3.5 shrink-0 ${powTab === "bentham" ? "text-black" : "text-zinc-400"}`} />
              <span>Web Architecture • Bentham</span>
            </button>

            {/* Tab 2: Mobile Systems (Sukoon) */}
            <button
              type="button"
              onClick={() => setPowTab("sukoon")}
              className={`relative px-4 sm:px-7 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm transition-all z-10 flex items-center gap-2 border ${
                powTab === "sukoon"
                  ? "bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.25)] border-transparent"
                  : "bg-white/[0.03] text-zinc-400 border-white/[0.06] hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              <Smartphone className={`w-3.5 h-3.5 shrink-0 ${powTab === "sukoon" ? "text-black" : "text-zinc-400"}`} />
              <span>Mobile Engine • Sukoon</span>
            </button>
          </div>
        </motion.div>

        {/* ------------------------------------------------------------- */}
        {/* VIEW 1: BENTHAM LEGAL REVAMP (Zero Content Loss, Active Iframe Only) */}
        {/* ------------------------------------------------------------- */}
        {powTab === "bentham" && (
          <motion.div
            key="bentham-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: EASE_CUSTOM }}
            style={{ transform: "translateZ(0)", willChange: "transform" }}
            className="w-full"
          >
            {/* Bentham Sub-controls */}
            <div className="flex flex-col items-center justify-center mb-8">
              {/* Segmented Sub-Toggle */}
              <div className="inline-flex items-center p-1.5 rounded-full bg-black/90 border border-white/[0.1] shadow-xl relative backdrop-blur-md gap-1">
                {/* Tab 1: Legacy Build */}
                <button
                  type="button"
                  onClick={() => setActiveBenthamTab("legacy")}
                  className={`relative px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm transition-all z-10 flex items-center gap-2 border ${
                    activeBenthamTab === "legacy"
                      ? "bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.25)] border-transparent"
                      : "bg-white/[0.03] text-zinc-400 border-white/[0.06] hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${activeBenthamTab === "legacy" ? "bg-black" : "bg-zinc-600"}`} />
                  <span>Legacy Client Build</span>
                </button>

                {/* Tab 2: Production Revamp */}
                <button
                  type="button"
                  onClick={() => setActiveBenthamTab("revamp")}
                  className={`relative px-4 sm:px-6 py-2 rounded-full text-xs sm:text-sm transition-all z-10 flex items-center gap-2 border ${
                    activeBenthamTab === "revamp"
                      ? "bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.25)] border-transparent"
                      : "bg-white/[0.03] text-zinc-400 border-white/[0.06] hover:text-white hover:bg-white/[0.06]"
                  }`}
                >
                  <span className={`w-2 h-2 rounded-full shrink-0 ${activeBenthamTab === "revamp" ? "bg-black" : "bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)] animate-pulse"}`} />
                  <span>Production Revamp (Live)</span>
                </button>
              </div>

              {/* Dynamic Impact Pill */}
              <div className="mt-4 flex items-center justify-center min-h-[38px]">
                <AnimatePresence mode="wait">
                  {activeBenthamTab === "legacy" ? (
                    <motion.div
                      key="legacy-pill"
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.25, ease: EASE_CUSTOM }}
                      className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/[0.03] border border-white/[0.1] text-zinc-400 text-xs shadow-inner text-center"
                    >
                      <AlertTriangle className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span>Status: 3.4s Load Time • Cluttered Information Architecture • Rigid Static Layout</span>
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
                      <span>Status: 0.4s FCP • 99 Core Web Vitals • Interactive Hero Sandbox • Next.js 15 &amp; Framer Motion</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* macOS Browser Chassis */}
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
                    <span className="truncate">{activeBenthamDisplayUrl}</span>
                  </div>
                </div>

                {/* Right Action Controls using LiquidMetal Buttons */}
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  {/* Open Live Site */}
                  <a
                    href={activeBenthamUrl}
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

              {/* Browser Body with Active-Only Iframe */}
              <div
                className={`w-full relative ${
                  isFullscreen ? "flex-1 min-h-0" : "h-[650px] sm:h-[750px] lg:h-[820px]"
                } bg-black overflow-hidden`}
              >
                {activeBenthamTab === "legacy" ? (
                  <iframe
                    key="legacy-bentham"
                    src={ORIGINAL_URL}
                    title="Bentham Legal Legacy Website"
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                  />
                ) : (
                  <iframe
                    key="revamp-bentham"
                    src={REVAMP_URL}
                    title="Avi's Bentham Legal Modern Revamp"
                    className="absolute inset-0 w-full h-full border-0"
                    loading="lazy"
                  />
                )}
              </div>
            </div>
          </motion.div>
        )}

        {/* ------------------------------------------------------------- */}
        {/* VIEW 2: SUKOON MOBILE ENGINE (Preload Metadata, Zero UI Jank) */}
        {/* ------------------------------------------------------------- */}
        {powTab === "sukoon" && (
          <motion.div
            key="sukoon-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: EASE_CUSTOM }}
            style={{ transform: "translateZ(0)", willChange: "transform" }}
            className="w-full flex flex-col items-center"
          >
            {/* Decluttered Tech Tags */}
            <div className="flex flex-wrap items-center justify-center gap-2.5 mb-6">
              <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.12] text-zinc-300 text-xs">
                React Native
              </span>
              <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.12] text-zinc-300 text-xs">
                C++ MMKV
              </span>
              <span className="px-3 py-1 rounded-full bg-white/[0.04] border border-white/[0.12] text-zinc-300 text-xs">
                HiveMQ MQTT
              </span>
            </div>

            {/* Sukoon Sub-Controls: Video vs Screenshots */}
            <div className="inline-flex items-center p-1.5 rounded-full bg-black/90 border border-white/[0.1] shadow-2xl backdrop-blur-md mb-8 gap-1">
              <button
                type="button"
                onClick={() => setSukoonMode("video")}
                className={`relative flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs transition-all border ${
                  sukoonMode === "video"
                    ? "bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.25)] border-transparent"
                    : "bg-white/[0.03] text-zinc-400 border-white/[0.06] hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <Play className={`w-3.5 h-3.5 ${sukoonMode === "video" ? "fill-black text-black" : "fill-current"}`} />
                <span>System Demo Video</span>
              </button>

              <button
                type="button"
                onClick={() => setSukoonMode("screenshots")}
                className={`relative flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs transition-all border ${
                  sukoonMode === "screenshots"
                    ? "bg-white text-black font-semibold shadow-[0_0_20px_rgba(255,255,255,0.25)] border-transparent"
                    : "bg-white/[0.03] text-zinc-400 border-white/[0.06] hover:text-white hover:bg-white/[0.06]"
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Interface Walkthrough</span>
              </button>
            </div>

            {/* Screenshot Mode Horizontal Switcher */}
            {sukoonMode === "screenshots" && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center gap-2 mb-8 overflow-x-auto px-2 no-scrollbar max-w-full"
              >
                {sukoonScreens.map((screen, idx) => {
                  const isActive = activeScreenIndex === idx;
                  return (
                    <button
                      key={screen.id}
                      type="button"
                      onClick={() => setActiveScreenIndex(idx)}
                      className={`px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap transition-all border ${
                        isActive
                          ? "bg-white text-black font-semibold shadow-lg border-transparent"
                          : "bg-black border-white/10 text-zinc-400 hover:text-white hover:border-white/25"
                      }`}
                    >
                      {screen.label}
                    </button>
                  );
                })}
              </motion.div>
            )}

            {/* Centerpiece Smartphone Chassis */}
            <div className="relative flex flex-col items-center justify-center my-6">
              {/* Smartphone Chassis */}
              <motion.div
                whileHover={{ y: -4, scale: 1.01 }}
                transition={{ duration: 0.4, ease: EASE_CUSTOM }}
                className="relative w-[300px] sm:w-[340px] rounded-[52px] p-3 bg-gradient-to-b from-zinc-700 via-zinc-900 to-black border-2 border-zinc-600 shadow-[0_0_90px_rgba(0,0,0,0.95)] group/chassis"
              >
                {/* Dynamic Island Notch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30 border border-white/10 flex items-center justify-between px-3">
                  <div className="w-2 h-2 rounded-full bg-zinc-900 border border-white/10" />
                  <div className="w-2.5 h-2.5 rounded-full bg-white/30 border border-white/40 animate-pulse" />
                </div>

                {/* Phone Screen Container */}
                <div className="relative w-full h-[600px] sm:h-[650px] rounded-[42px] overflow-hidden bg-black border border-white/10 flex items-center justify-center">
                  {sukoonMode === "video" ? (
                    /* Video Player */
                    <div className="relative w-full h-full bg-black flex items-center justify-center group/video">
                      <video
                        ref={videoRef}
                        src="/demo.mp4"
                        loop
                        playsInline
                        preload="metadata"
                        muted={isMuted}
                        onTimeUpdate={handleTimeUpdate}
                        className="w-full h-full object-cover select-none"
                      />

                      {/* Floating Glass Playback Controls */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 opacity-0 group-hover/video:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 pointer-events-auto">
                        {/* Top Status */}
                        <div className="flex items-center justify-between pt-6">
                          <span className="text-[10px] tracking-widest text-zinc-300 bg-black/80 px-2 py-0.5 rounded-full border border-white/20">
                            HD 60FPS STREAM
                          </span>
                          <button
                            type="button"
                            onClick={toggleMute}
                            className="p-2 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/90 transition-colors backdrop-blur-md"
                            title={isMuted ? "Unmute audio" : "Mute audio"}
                          >
                            {isMuted ? (
                              <VolumeX className="w-4 h-4 text-zinc-400" />
                            ) : (
                              <Volume2 className="w-4 h-4 text-white" />
                            )}
                          </button>
                        </div>

                        {/* Center Play/Pause Trigger */}
                        <div className="flex items-center justify-center">
                          <button
                            type="button"
                            onClick={togglePlay}
                            className="w-14 h-14 rounded-full bg-white/15 border border-white/30 text-white flex items-center justify-center hover:scale-110 active:scale-95 transition-all backdrop-blur-md shadow-2xl"
                          >
                            {isPlaying ? (
                              <Pause className="w-6 h-6 fill-current" />
                            ) : (
                              <Play className="w-6 h-6 fill-current translate-x-0.5" />
                            )}
                          </button>
                        </div>

                        {/* Bottom Progress Bar */}
                        <div className="w-full">
                          <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-white transition-all duration-150"
                              style={{ width: `${videoProgress}%` }}
                            />
                          </div>
                          <div className="flex justify-between items-center text-[10px] text-zinc-400 mt-2">
                            <span>SUKOON ENGINE</span>
                            <span className="text-white">44.1kHz PCM</span>
                          </div>
                        </div>
                      </div>

                      {/* Prominent Center Play Button when paused */}
                      {!isPlaying && (
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none group-hover/video:opacity-0 transition-opacity">
                          <div className="w-16 h-16 rounded-full bg-black/60 border border-white/40 text-white flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.2)] animate-pulse">
                            <Play className="w-7 h-7 fill-current translate-x-0.5" />
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    /* Interactive High-Res Screenshots with Crossfade */
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentScreen.id}
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 1.02 }}
                        transition={{ duration: 0.35, ease: EASE_CUSTOM }}
                        className="relative w-full h-full"
                      >
                        {imageError[currentScreen.id] ? (
                          <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-black">
                            <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-3 text-zinc-300">
                              <Smartphone className="w-6 h-6" />
                            </div>
                            <h4 className="text-sm font-bold text-white mb-1">
                              {currentScreen.label}
                            </h4>
                            <p className="text-xs text-zinc-400">
                              {currentScreen.tagline}
                            </p>
                          </div>
                        ) : (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={currentScreen.src}
                            alt={currentScreen.label}
                            onError={() =>
                              setImageError((prev) => ({ ...prev, [currentScreen.id]: true }))
                            }
                            className="w-full h-full object-cover object-top select-none"
                          />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  )}

                  {/* Glass reflection highlight */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.03] to-transparent pointer-events-none" />

                  {/* Home indicator */}
                  <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/30 rounded-full z-20 pointer-events-none" />
                </div>
              </motion.div>

              {/* Tagline in Screenshots Mode */}
              {sukoonMode === "screenshots" && (
                <div className="mt-4 text-center max-w-sm">
                  <span className="text-xs text-zinc-400">
                    {currentScreen.tagline}
                  </span>
                </div>
              )}
            </div>

            {/* 4-Card Bento Specs Grid */}
            <motion.div
              variants={specsContainerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 w-full mt-8"
            >
              {bentoSpecs.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={specCardVariants}
                  whileHover={{ y: -6, scale: 1.02 }}
                  transition={{ duration: 0.35, ease: EASE_CUSTOM }}
                  style={{ transform: "translateZ(0)" }}
                  className={`p-5 rounded-2xl bg-zinc-950/85 border border-white/[0.08] hover:border-white/25 transition-all group relative overflow-hidden backdrop-blur-md shadow-lg ${item.accentBorder}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] px-2 py-0.5 rounded bg-black border border-white/10 text-zinc-400">
                      {item.badge}
                    </span>
                    <span className={`text-xs font-bold ${item.color}`}>
                      {item.metric}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-white tracking-tight mb-1">
                    {item.title}
                  </h4>
                  <p className="text-xs text-zinc-400 leading-relaxed">
                    {item.summary}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
