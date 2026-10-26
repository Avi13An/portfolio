"use client";

import React, { useState, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Zap,
  Smartphone,
  Layers,
} from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const EASE_CUSTOM: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function SukoonCaseStudy() {
  const [viewMode, setViewMode] = useState<"video" | "screenshots">("video");
  const [activeScreenIndex, setActiveScreenIndex] = useState(1); // Default to Now Playing
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const videoRef = useRef<HTMLVideoElement>(null);

  const screens = [
    {
      id: "discovery",
      label: "Discovery Feed",
      src: "/screenshots/home.png",
      tagline: "Apple Music RSS + iTunes Search API • Sub-150ms Ingestion",
      color: "rgba(16, 185, 129, 0.35)",
    },
    {
      id: "player",
      label: "Now Playing",
      src: "/screenshots/player.png",
      tagline: "ExoPlayer Dual-Queue Pre-Seeding • 24-bit Lossless • 7s Stall Watchdog",
      color: "rgba(6, 182, 212, 0.35)",
    },
    {
      id: "lyrics",
      label: "Synced Lyrics",
      src: "/screenshots/lyrics.png",
      tagline: "LRCLIB Millisecond Timecode Parsing • Programmatic Centering",
      color: "rgba(139, 92, 246, 0.35)",
    },
    {
      id: "vocal",
      label: "Vocal Studio",
      src: "/screenshots/karaoke.png",
      tagline: "Raw 44.1kHz 16-bit PCM • Hardware Android MediaCodec Mixer",
      color: "rgba(245, 158, 11, 0.35)",
    },
    {
      id: "jam",
      label: "Sukoon Jam",
      src: "/screenshots/party.png",
      tagline: "HiveMQ MQTT over WebSockets • NTP Mathematical Drift Compensation",
      color: "rgba(16, 185, 129, 0.35)",
    },
  ];

  const currentScreen = screens[activeScreenIndex];

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

  const bentoSpecs = [
    {
      title: "Sub-100ms Search",
      summary: "Real-time multithreaded indexed streaming queries.",
      metric: "< 85ms",
      badge: "Indexing",
      color: "text-emerald-400",
      accentBorder: "group-hover:border-emerald-500/50",
    },
    {
      title: "24-Bit Lossless",
      summary: "Dual-queue ExoPlayer pre-seeding with 7s stall watchdog.",
      metric: "44.1 kHz",
      badge: "ExoPlayer",
      color: "text-cyan-400",
      accentBorder: "group-hover:border-cyan-500/50",
    },
    {
      title: "Live Synced Lyrics",
      summary: "Millisecond LRCLIB parser with auto-centering & Devanagari.",
      metric: "±2ms Sync",
      badge: "Timing",
      color: "text-violet-400",
      accentBorder: "group-hover:border-violet-500/50",
    },
    {
      title: "Zero UI Jank",
      summary: "Direct memory-mapped C++ MMKV synchronous storage.",
      metric: "0.12ms Read",
      badge: "NDK C++",
      color: "text-amber-400",
      accentBorder: "group-hover:border-amber-500/50",
    },
  ];

  const specsContainerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
      },
    },
  };

  const specCardVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE_CUSTOM },
    },
  };

  return (
    <section
      id="featured-architecture"
      className="py-24 bg-black relative border-t border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header with Viewport Entrance */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8, ease: EASE_CUSTOM }}
          className="max-w-2xl mx-auto text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-950/40 border border-cyan-500/30 text-cyan-400 text-xs mb-4 shadow-[0_0_20px_rgba(6,182,212,0.15)]">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span>PRODUCTION CASE STUDY // 01 • NATIVE AUDIO ENGINE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight leading-tight heading-metallic mb-3">
            Sukoon Architecture
          </h2>

          <p className="text-sm sm:text-base text-neutral-400 leading-relaxed mb-6">
            Cross-platform mobile streaming pipeline built with custom Kotlin MediaCodec mixing, 7s stall watchdog, and sub-100ms MQTT drift compensation.
          </p>

          {/* Colorful Glowing Tech Tags */}
          <div className="flex flex-wrap items-center justify-center gap-2.5 mb-8">
            <span className="px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs shadow-[0_0_15px_rgba(6,182,212,0.2)]">
              React Native (Cyan)
            </span>
            <span className="px-3 py-1 rounded-full bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs shadow-[0_0_15px_rgba(16,185,129,0.2)]">
              C++ MMKV (Emerald)
            </span>
            <span className="px-3 py-1 rounded-full bg-violet-950/60 border border-violet-500/40 text-violet-300 text-xs shadow-[0_0_15px_rgba(139,92,246,0.2)]">
              MQTT (Violet)
            </span>
          </div>

          {/* Segmented Top Control Pill with Spring Tabs */}
          <div className="inline-flex items-center p-1 rounded-full bg-zinc-950/90 border border-white/15 shadow-2xl backdrop-blur-md">
            <button
              onClick={() => setViewMode("video")}
              className={`relative flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-medium transition-colors ${
                viewMode === "video" ? "text-black font-semibold" : "text-neutral-400 hover:text-white"
              }`}
            >
              {viewMode === "video" && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 bg-white rounded-full shadow-md z-0"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">🎬 Watch 60s Demo Video</span>
            </button>

            <button
              onClick={() => setViewMode("screenshots")}
              className={`relative flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-medium transition-colors ${
                viewMode === "screenshots" ? "text-black font-semibold" : "text-neutral-400 hover:text-white"
              }`}
            >
              {viewMode === "screenshots" && (
                <motion.div
                  layoutId="activePill"
                  className="absolute inset-0 bg-white rounded-full shadow-md z-0"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">📱 Interactive Screenshots</span>
            </button>
          </div>
        </motion.div>

        {/* Screenshot Mode Horizontal Tab Switcher */}
        {viewMode === "screenshots" && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-2 mb-8 overflow-x-auto px-2 no-scrollbar"
          >
            {screens.map((screen, idx) => {
              const isActive = activeScreenIndex === idx;
              return (
                <button
                  key={screen.id}
                  onClick={() => setActiveScreenIndex(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs whitespace-nowrap transition-all border ${
                    isActive
                      ? "bg-zinc-900 border-white/40 text-white shadow-lg font-semibold"
                      : "bg-black border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  {screen.label}
                </button>
              );
            })}
          </motion.div>
        )}

        {/* CENTERPIECE PHONE CHASSIS with Dramatic Scroll Zoom Reveal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: EASE_CUSTOM }}
          className="flex flex-col items-center justify-center mb-16 relative"
        >
          {/* Dynamic Ambient Glow Backlight */}
          <div
            className="absolute w-[360px] sm:w-[520px] h-[360px] sm:h-[520px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 -z-10 animate-pulse"
            style={{
              backgroundColor:
                viewMode === "video"
                  ? "rgba(16, 185, 129, 0.28)"
                  : currentScreen.color,
            }}
          />

          {/* Smartphone Titanium Chassis */}
          <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            transition={{ duration: 0.4, ease: EASE_CUSTOM }}
            className="relative w-[300px] sm:w-[340px] rounded-[52px] p-3 bg-gradient-to-b from-zinc-700 via-zinc-900 to-black border-2 border-zinc-600 shadow-[0_0_90px_rgba(0,0,0,0.95)] group/chassis"
          >
            {/* Dynamic Island Notch */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30 border border-white/10 flex items-center justify-between px-3">
              <div className="w-2 h-2 rounded-full bg-zinc-900 border border-white/10" />
              <div className="w-2.5 h-2.5 rounded-full bg-cyan-500/40 border border-cyan-400/50 animate-pulse" />
            </div>

            {/* Phone Screen Container */}
            <div className="relative w-full h-[600px] sm:h-[650px] rounded-[42px] overflow-hidden bg-black border border-white/10 flex items-center justify-center">
              {viewMode === "video" ? (
                /* Native Video Player with Floating Glass Controls */
                <div className="relative w-full h-full bg-black flex items-center justify-center group/video">
                  <video
                    ref={videoRef}
                    src="/demo.mp4"
                    autoPlay
                    loop
                    playsInline
                    muted={isMuted}
                    onTimeUpdate={handleTimeUpdate}
                    className="w-full h-full object-cover select-none"
                  />

                  {/* Floating Glass Playback Controls */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 opacity-0 group-hover/video:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-6 pointer-events-auto">
                    {/* Top Status */}
                    <div className="flex items-center justify-between pt-6">
                      <span className="text-[10px] tracking-widest text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-500/30">
                        HD 60FPS STREAM
                      </span>
                      <button
                        onClick={toggleMute}
                        className="p-2 rounded-full bg-black/60 border border-white/20 text-white hover:bg-black/90 transition-colors backdrop-blur-md"
                        title={isMuted ? "Unmute audio" : "Mute audio"}
                      >
                        {isMuted ? (
                          <VolumeX className="w-4 h-4 text-neutral-400" />
                        ) : (
                          <Volume2 className="w-4 h-4 text-emerald-400" />
                        )}
                      </button>
                    </div>

                    {/* Center Play/Pause Trigger */}
                    <div className="flex items-center justify-center">
                      <button
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
                          className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 transition-all duration-150"
                          style={{ width: `${videoProgress}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[10px] text-neutral-400 mt-2">
                        <span>SUKOON ENGINE</span>
                        <span className="text-emerald-400">44.1kHz PCM</span>
                      </div>
                    </div>
                  </div>
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
                      <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-neutral-950">
                        <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-white/10 flex items-center justify-center mb-3 text-emerald-400">
                          <Smartphone className="w-6 h-6" />
                        </div>
                        <h4 className="text-sm font-bold text-white mb-1">
                          {currentScreen.label}
                        </h4>
                        <p className="text-xs text-neutral-400">
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

          {/* Active Screen Tagline in Screenshots mode */}
          {viewMode === "screenshots" && (
            <div className="mt-4 text-center">
              <span className="text-xs text-neutral-400">
                {currentScreen.tagline}
              </span>
            </div>
          )}
        </motion.div>

        {/* 4-CARD BENTO SPECS GRID with Staggered Cascades & Hover Physics */}
        <motion.div
          variants={specsContainerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
        >
          {bentoSpecs.map((item, idx) => (
            <motion.div
              key={idx}
              variants={specCardVariants}
              whileHover={{ y: -6, scale: 1.02 }}
              transition={{ duration: 0.35, ease: EASE_CUSTOM }}
              className={`p-5 rounded-2xl bg-zinc-950/85 border border-white/[0.08] hover:border-white/25 transition-all group relative overflow-hidden backdrop-blur-md shadow-lg ${item.accentBorder}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] px-2 py-0.5 rounded bg-black border border-white/10 text-neutral-400">
                  {item.badge}
                </span>
                <span className={`text-xs font-bold ${item.color}`}>
                  {item.metric}
                </span>
              </div>

              <h4 className="text-base font-bold text-white tracking-tight mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-neutral-400 leading-relaxed">
                {item.summary}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
