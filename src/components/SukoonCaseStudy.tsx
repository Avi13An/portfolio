"use client";

import React, { useState, useRef } from "react";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Sparkles,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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
      summary: "Real-time indexed multi-threaded streaming queries.",
      metric: "< 85ms",
      badge: "Indexing",
      color: "text-emerald-400",
      accentBorder: "group-hover:border-emerald-500/40",
    },
    {
      title: "24-Bit Lossless",
      summary: "Dual-queue ExoPlayer pre-seeding with 7s stall watchdog.",
      metric: "44.1 kHz",
      badge: "ExoPlayer",
      color: "text-cyan-400",
      accentBorder: "group-hover:border-cyan-500/40",
    },
    {
      title: "Live Synced Lyrics",
      summary: "Millisecond LRCLIB parser with auto-centering & Devanagari support.",
      metric: "±2ms Sync",
      badge: "Timing",
      color: "text-violet-400",
      accentBorder: "group-hover:border-violet-500/40",
    },
    {
      title: "Zero UI Jank",
      summary: "Direct memory-mapped C++ MMKV storage.",
      metric: "0.12ms Read",
      badge: "NDK C++",
      color: "text-amber-400",
      accentBorder: "group-hover:border-amber-500/40",
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
            <span>FEATURED SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight leading-tight heading-metallic">
            Sukoon Architecture
          </h2>
          <p className="mt-3 text-sm sm:text-base text-neutral-400 font-mono">
            Cross-platform mobile streaming pipeline built with Expo 57, Kotlin MediaCodec, and
            HiveMQ MQTT.
          </p>

          {/* Segmented Top Control Pill */}
          <div className="mt-8 inline-flex items-center p-1 rounded-full bg-neutral-950/90 border border-white/15 shadow-2xl backdrop-blur-md">
            <button
              onClick={() => setViewMode("video")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-mono font-medium transition-all duration-200 ${
                viewMode === "video"
                  ? "bg-white text-black shadow-md font-semibold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <span>🎬 Watch 60s Demo Video</span>
            </button>
            <button
              onClick={() => setViewMode("screenshots")}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2 rounded-full text-xs font-mono font-medium transition-all duration-200 ${
                viewMode === "screenshots"
                  ? "bg-white text-black shadow-md font-semibold"
                  : "text-neutral-400 hover:text-white"
              }`}
            >
              <span>📱 Interactive Screenshots</span>
            </button>
          </div>
        </div>

        {/* Screenshot Mode Horizontal Tab Switcher */}
        {viewMode === "screenshots" && (
          <div className="flex items-center justify-center gap-2 mb-8 overflow-x-auto px-2 no-scrollbar">
            {screens.map((screen, idx) => {
              const isActive = activeScreenIndex === idx;
              return (
                <button
                  key={screen.id}
                  onClick={() => setActiveScreenIndex(idx)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono whitespace-nowrap transition-all border ${
                    isActive
                      ? "bg-neutral-900 border-white/40 text-white shadow-lg font-semibold"
                      : "bg-black border-white/10 text-neutral-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  {screen.label}
                </button>
              );
            })}
          </div>
        )}

        {/* CENTERPIECE PHONE CHASSIS */}
        <div className="flex flex-col items-center justify-center mb-16 relative">
          {/* Dynamic Ambient Glow Backlight that shifts with active screen / video */}
          <div
            className="absolute w-[360px] sm:w-[500px] h-[360px] sm:h-[500px] rounded-full blur-[140px] pointer-events-none transition-all duration-700 -z-10"
            style={{
              backgroundColor:
                viewMode === "video"
                  ? "rgba(16, 185, 129, 0.25)"
                  : currentScreen.color,
            }}
          />

          {/* Smartphone Titanium Chassis */}
          <div className="relative w-[300px] sm:w-[340px] rounded-[52px] p-3 bg-gradient-to-b from-zinc-700 via-zinc-900 to-black border-2 border-zinc-600 shadow-[0_0_90px_rgba(0,0,0,0.95)]">
            {/* Dynamic Island Notch */}
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-24 h-4 bg-black rounded-full z-30 border border-white/10 flex items-center justify-between px-3">
              <div className="w-2 h-2 rounded-full bg-zinc-900 border border-white/10" />
              <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
            </div>

            {/* Smartphone Viewport Screen */}
            <div className="relative w-full aspect-[9/19.5] rounded-[42px] bg-black overflow-hidden border border-white/15 group">
              {viewMode === "video" ? (
                /* Native HTML5 <video> */
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

                  {/* Floating Glass Sound Toggle */}
                  <div className="absolute top-12 right-3 z-30">
                    <button
                      onClick={toggleMute}
                      className="p-2 rounded-full bg-black/70 border border-white/20 text-white backdrop-blur-md hover:bg-black transition-all flex items-center gap-1.5 shadow-lg"
                      aria-label={isMuted ? "Unmute video" : "Mute video"}
                    >
                      {isMuted ? (
                        <>
                          <VolumeX className="w-3.5 h-3.5 text-neutral-300" />
                          <span className="text-[10px] font-mono text-neutral-300 pr-1 hidden sm:inline-block">
                            Tap for sound
                          </span>
                        </>
                      ) : (
                        <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </button>
                  </div>

                  {/* Floating Glass Play/Pause Control on hover */}
                  <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <button
                      onClick={togglePlay}
                      className="p-3 rounded-full bg-black/80 border border-white/25 text-white backdrop-blur-md hover:scale-105 transition-transform shadow-xl"
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                    >
                      {isPlaying ? (
                        <Pause className="w-4 h-4 fill-white" />
                      ) : (
                        <Play className="w-4 h-4 fill-white ml-0.5" />
                      )}
                    </button>
                  </div>

                  {/* Glowing Emerald Timeline Progress Bar */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10 z-20">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-150 shadow-[0_0_10px_rgba(16,185,129,0.9)]"
                      style={{ width: `${videoProgress}%` }}
                    />
                  </div>
                </div>
              ) : (
                /* Interactive Screenshots Cross-Fade */
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentScreen.id}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.22, ease: "easeInOut" }}
                    className="w-full h-full relative"
                  >
                    {imageError[currentScreen.id] ? (
                      <div className="w-full h-full bg-gradient-to-b from-neutral-900 to-black p-6 flex flex-col justify-between font-mono">
                        <div className="pt-8">
                          <span className="text-[10px] px-2 py-0.5 rounded border border-white/10 text-neutral-300">
                            {currentScreen.label}
                          </span>
                          <h4 className="text-base font-bold text-white mt-3">
                            {currentScreen.label}
                          </h4>
                          <p className="text-xs text-neutral-400 mt-2">
                            {currentScreen.tagline}
                          </p>
                        </div>
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
          </div>

          {/* Active Screen Tagline in Screenshots mode */}
          {viewMode === "screenshots" && (
            <div className="mt-4 text-center">
              <span className="text-xs font-mono text-neutral-400">
                {currentScreen.tagline}
              </span>
            </div>
          )}
        </div>

        {/* 4-CARD BENTO SPECS GRID (Punchy, bold metrics) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {bentoSpecs.map((item, idx) => (
            <div
              key={idx}
              className={`p-5 rounded-2xl bg-neutral-950/80 border border-white/[0.08] hover:border-white/20 transition-all group relative overflow-hidden backdrop-blur-md ${item.accentBorder}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-black border border-white/10 text-neutral-400">
                  {item.badge}
                </span>
                <span className={`text-xs font-mono font-bold ${item.color}`}>
                  {item.metric}
                </span>
              </div>

              <h4 className="text-base font-bold text-white tracking-tight mb-1">
                {item.title}
              </h4>
              <p className="text-xs text-neutral-400 font-mono leading-relaxed">
                {item.summary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
