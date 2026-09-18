"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Compass,
  Music,
  FileText,
  Mic,
  Users,
  Sparkles,
  Zap,
  CheckCircle2,
  Activity,
  Layers,
  ArrowUpRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function SukoonCaseStudy() {
  const [viewMode, setViewMode] = useState<"video" | "screenshots">("video");
  const [activeScreenIndex, setActiveScreenIndex] = useState(1); // Default to Player
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [videoProgress, setVideoProgress] = useState(0);
  const [imageError, setImageError] = useState<Record<string, boolean>>({});
  const videoRef = useRef<HTMLVideoElement>(null);

  const screens = [
    {
      id: "feed",
      label: "Feed",
      title: "Discovery Feed",
      src: "/screenshots/home.png",
      tagline: "Apple Music RSS + iTunes Search API • Sub-150ms Ingestion",
      color: "rgba(16, 185, 129, 0.3)",
      badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-950/40",
    },
    {
      id: "player",
      label: "Player",
      title: "Lossless Player",
      src: "/screenshots/player.png",
      tagline: "ExoPlayer Dual-Queue Pre-Seeding • 24-bit Lossless • 7s Stall Watchdog",
      color: "rgba(6, 182, 212, 0.3)",
      badgeColor: "text-cyan-400 border-cyan-500/30 bg-cyan-950/40",
    },
    {
      id: "lyrics",
      label: "Lyrics",
      title: "Live Synced Lyrics",
      src: "/screenshots/lyrics.png",
      tagline: "LRCLIB Millisecond Timecode Parsing • Programmatic Centering",
      color: "rgba(139, 92, 246, 0.3)",
      badgeColor: "text-violet-400 border-violet-500/30 bg-violet-950/40",
    },
    {
      id: "studio",
      label: "Studio",
      title: "Studio Vocal Engine",
      src: "/screenshots/karaoke.png",
      tagline: "Raw 44.1kHz 16-bit PCM • Hardware Android MediaCodec Mixer",
      color: "rgba(245, 158, 11, 0.3)",
      badgeColor: "text-amber-400 border-amber-500/30 bg-amber-950/40",
    },
    {
      id: "jam",
      label: "Jam",
      title: "Sukoon Jam Mesh",
      src: "/screenshots/party.png",
      tagline: "HiveMQ MQTT over WebSockets • NTP Mathematical Drift Compensation",
      color: "rgba(16, 185, 129, 0.3)",
      badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-950/40",
    },
  ];

  const currentScreen = screens[activeScreenIndex];

  // Sync video play/pause
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
      subtitle: "Real-Time Indexing",
      detail: "Multithreaded iTunes & Apple Music API ingestion with edge caching.",
      metric: "< 85ms",
      badge: "Discovery",
      color: "text-emerald-400",
      glow: "rgba(16, 185, 129, 0.15)",
    },
    {
      title: "24-Bit Lossless",
      subtitle: "Custom Audio Pipeline",
      detail: "ExoPlayer dual-queue pre-seeding with zero mid-stream buffer drops.",
      metric: "44.1 kHz",
      badge: "ExoPlayer",
      color: "text-cyan-400",
      glow: "rgba(6, 182, 212, 0.15)",
    },
    {
      title: "Live Synced Lyrics",
      subtitle: "Sub-Millisecond Timing",
      detail: "LRCLIB engine with full Devanagari script support & auto-centering.",
      metric: "±2ms Sync",
      badge: "Typography",
      color: "text-violet-400",
      glow: "rgba(139, 92, 246, 0.15)",
    },
    {
      title: "Zero UI Jank",
      subtitle: "C++ MMKV Engine",
      detail: "Synchronous memory-mapped storage bypassing JavaScript bridge bottlenecks.",
      metric: "0.12ms Read",
      badge: "Native NDK",
      color: "text-amber-400",
      glow: "rgba(245, 158, 11, 0.15)",
    },
  ];

  return (
    <section
      id="featured-architecture"
      className="py-24 bg-black relative border-t border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FEATURED ARCHITECTURE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Sukoon Music Engine
          </h2>
          <p className="mt-3 text-sm sm:text-base text-zinc-400 font-mono">
            Cross-platform mobile streaming pipeline built with Expo 57, Kotlin MediaCodec, and
            HiveMQ MQTT.
          </p>

          {/* Segmented Pill Switcher */}
          <div className="mt-8 inline-flex items-center p-1 rounded-full bg-zinc-950 border border-white/10 shadow-xl">
            <button
              onClick={() => setViewMode("video")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-mono font-medium transition-all ${
                viewMode === "video"
                  ? "bg-white text-black shadow-sm font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span>🎬 Watch 60s Demo Video</span>
            </button>
            <button
              onClick={() => setViewMode("screenshots")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-mono font-medium transition-all ${
                viewMode === "screenshots"
                  ? "bg-white text-black shadow-sm font-semibold"
                  : "text-zinc-400 hover:text-white"
              }`}
            >
              <span>📱 Interactive Screenshots</span>
            </button>
          </div>
        </div>

        {/* SCREENSHOTS SUB-TAB SWITCHER (Shown only in screenshots mode) */}
        {viewMode === "screenshots" && (
          <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto px-2">
            {screens.map((screen, idx) => {
              const isActive = activeScreenIndex === idx;
              return (
                <button
                  key={screen.id}
                  onClick={() => setActiveScreenIndex(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono transition-all border ${
                    isActive
                      ? "bg-zinc-900 border-white/30 text-white shadow-md font-semibold"
                      : "bg-black border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  {screen.label}
                </button>
              );
            })}
          </div>
        )}

        {/* CENTERPIECE SMARTPHONE CHASSIS */}
        <div className="flex flex-col items-center justify-center mb-16 relative">
          {/* Dynamic Radial Ambient Backlight */}
          <div
            className="absolute w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 -z-10"
            style={{
              backgroundColor:
                viewMode === "video"
                  ? "rgba(16, 185, 129, 0.22)"
                  : currentScreen.color,
            }}
          />

          {/* Smartphone Titanium Bezel */}
          <div className="relative w-[300px] sm:w-[340px] rounded-[50px] p-3 bg-gradient-to-b from-zinc-700 via-zinc-900 to-black border-2 border-zinc-600 shadow-[0_0_80px_rgba(0,0,0,0.95)]">
            {/* Dynamic Island Notch */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30 border border-white/10 flex items-center justify-between px-3">
              <div className="w-2 h-2 rounded-full bg-zinc-900 border border-white/10" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
            </div>

            {/* Smartphone Screen Viewport */}
            <div className="relative w-full aspect-[9/19.5] rounded-[40px] bg-black overflow-hidden border border-white/15 group">
              {viewMode === "video" ? (
                /* 1. 60S DEMO VIDEO PLAYER */
                <div className="relative w-full h-full bg-black">
                  <video
                    ref={videoRef}
                    src="/demo.mp4"
                    autoPlay
                    loop
                    playsInline
                    muted={isMuted}
                    onTimeUpdate={handleTimeUpdate}
                    className="w-full h-full object-cover select-none cursor-pointer"
                    onClick={togglePlay}
                  />

                  {/* Floating Glass Overlay Controls */}
                  <div className="absolute top-12 right-3 z-30 flex items-center gap-1.5">
                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-full bg-black/70 border border-white/15 text-white backdrop-blur-md hover:bg-black transition-all flex items-center gap-1 group/sound"
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                      {isMuted ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-zinc-300" />
                          <span className="text-[10px] font-mono text-zinc-300 pr-1 hidden sm:inline-block">
                            Tap for sound
                          </span>
                        </>
                      ) : (
                        <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </button>
                  </div>

                  {/* Bottom Center Play/Pause Glass Button */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={togglePlay}
                      className="p-2.5 rounded-full bg-black/80 border border-white/20 text-white backdrop-blur-md hover:scale-105 transition-transform"
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-white" />
                      ) : (
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      )}
                    </button>
                  </div>

                  {/* Slim Glowing Video Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-150 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                      style={{ width: `${videoProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                /* 2. INTERACTIVE SCREENSHOTS */
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentScreen.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.2 }}
                    className="w-full h-full relative"
                  >
                    {imageError[currentScreen.id] ? (
                      /* Fallback Mockup View */
                      <div className="w-full h-full bg-gradient-to-b from-zinc-900 to-black p-6 flex flex-col justify-between font-mono">
                        <div className="pt-8">
                          <span
                            className={`text-[10px] px-2 py-0.5 rounded border ${currentScreen.badgeColor}`}
                          >
                            {currentScreen.title}
                          </span>
                          <h4 className="text-base font-bold text-white mt-3">
                            {currentScreen.title}
                          </h4>
                          <p className="text-xs text-zinc-400 mt-2">
                            {currentScreen.tagline}
                          </p>
                        </div>
                      </div>
                    ) : (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={currentScreen.src}
                        alt={currentScreen.title}
                        onError={() =>
                          setImageError((prev) => ({ ...prev, [currentScreen.id]: true }))
                        }
                        className="w-full h-full object-cover object-top select-none"
                      />
                    )}
                  </motion.div>
                </AnimatePresence>
              )}

              {/* Bottom Home Indicator Bar */}
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/30 rounded-full z-20 pointer-events-none" />
            </div>
          </div>

          {/* Active Screen Tagline in Screenshots mode */}
          {viewMode === "screenshots" && (
            <div className="mt-4 text-center">
              <span className="text-xs font-mono text-zinc-400">
                {currentScreen.tagline}
              </span>
            </div>
          )}
        </div>

        {/* 4-CARD COMPACT BENTO GRID OF SPECS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bentoSpecs.map((item, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-zinc-950/80 border border-white/[0.08] hover:border-white/20 transition-all group relative overflow-hidden"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-zinc-400">
                  {item.badge}
                </span>
                <span className={`text-xs font-mono font-bold ${item.color}`}>
                  {item.metric}
                </span>
              </div>

              <h4 className="text-base font-bold text-white tracking-tight mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-zinc-400 font-mono leading-relaxed">
                {item.detail}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
