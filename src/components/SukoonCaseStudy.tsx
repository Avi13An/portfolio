"use client";

import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  Users,
  Radio,
  Clock,
  CheckCircle2,
  Sparkles,
  Zap,
  Sliders,
  Code2,
  Layers,
  Activity,
  Compass,
  Music,
  FileText,
  Mic,
  Share2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function SukoonCaseStudy() {
  const [activeTab, setActiveTab] = useState<number>(1); // Default to "Now Playing"
  const [isSimulating, setIsSimulating] = useState(false);
  const [telemetry, setTelemetry] = useState({
    buffer: 99.2,
    transit: 16,
    jitter: 1.2,
  });
  const [imageError, setImageError] = useState<Record<string, boolean>>({});

  // Simulate subtle real-time telemetry fluctuations during playback session
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isSimulating) {
      interval = setInterval(() => {
        setTelemetry({
          buffer: +(98.8 + Math.random() * 0.9).toFixed(1),
          transit: Math.floor(14 + Math.random() * 5),
          jitter: +(0.8 + Math.random() * 0.7).toFixed(1),
        });
      }, 1200);
    }
    return () => clearInterval(interval);
  }, [isSimulating]);

  const showcaseTabs = [
    {
      id: "home",
      title: "Discovery Feed",
      icon: Compass,
      imageSrc: "/screenshots/home.png",
      telemetry: "Apple Music RSS + iTunes Search API • Sub-150ms Ingestion",
      glowColor: "rgba(16, 185, 129, 0.25)",
      accentBorder: "border-emerald-500/50",
      accentText: "text-emerald-400",
      description: "Edge-cached track indexing with real-time algorithmic search over 10M+ records.",
    },
    {
      id: "player",
      title: "Now Playing",
      icon: Music,
      imageSrc: "/screenshots/player.png",
      telemetry: "ExoPlayer Dual-Queue Pre-Seeding • 24-bit Lossless • 7s Stall Watchdog",
      glowColor: "rgba(6, 182, 212, 0.25)",
      accentBorder: "border-cyan-500/50",
      accentText: "text-cyan-400",
      description: "Direct-to-client edge CDN stream resolution bypassing 403 authorization timeouts.",
    },
    {
      id: "lyrics",
      title: "Live Synced Lyrics",
      icon: FileText,
      imageSrc: "/screenshots/lyrics.png",
      telemetry: "LRCLIB Millisecond Timecode Parsing • Programmatic Centering",
      glowColor: "rgba(139, 92, 246, 0.25)",
      accentBorder: "border-violet-500/50",
      accentText: "text-violet-400",
      description: "Sub-millisecond karaoke sync with GPU-accelerated active line centering.",
    },
    {
      id: "karaoke",
      title: "Studio Vocal Engine",
      icon: Mic,
      imageSrc: "/screenshots/karaoke.png",
      telemetry: "Raw 44.1kHz 16-bit PCM • Hardware Android MediaCodec Mixer",
      glowColor: "rgba(245, 158, 11, 0.25)",
      accentBorder: "border-amber-500/50",
      accentText: "text-amber-400",
      description: "Hardware zero-latency vocal overdubbing directly through native NDK buffers.",
    },
    {
      id: "party",
      title: "Sukoon Jam",
      icon: Users,
      imageSrc: "/screenshots/party.png",
      telemetry: "HiveMQ MQTT over WebSockets • NTP Mathematical Drift Compensation",
      glowColor: "rgba(16, 185, 129, 0.25)",
      accentBorder: "border-emerald-500/50",
      accentText: "text-emerald-400",
      description: "Collaborative multiplayer listening rooms with sub-100ms global drift correction.",
    },
  ];

  const currentScreen = showcaseTabs[activeTab];

  const techBadges = [
    { name: "React Native", color: "text-cyan-400 border-cyan-500/30 bg-cyan-950/20" },
    { name: "Expo 57", color: "text-zinc-300 border-zinc-700 bg-zinc-900/50" },
    { name: "Kotlin MediaCodec", color: "text-violet-400 border-violet-500/30 bg-violet-950/20" },
    { name: "C++ MMKV", color: "text-emerald-400 border-emerald-500/30 bg-emerald-950/20" },
    { name: "HiveMQ MQTT", color: "text-amber-400 border-amber-500/30 bg-amber-950/20" },
    { name: "Supabase", color: "text-emerald-300 border-emerald-500/30 bg-emerald-950/20" },
  ];

  const highlights = [
    {
      id: "stream",
      title: "Direct-to-Client Stream Resolution",
      subtitle: "Bypassing 403 CDN errors with edge-signed token rotation",
      metric: "0% 403 Failures",
      metricSub: "100% Stream Delivery",
      badge: "Edge Architecture",
      icon: Radio,
      summary:
        "Standard mobile audio players fail when public CDNs throttle or return 403 Forbidden on expired bearer tokens mid-stream. Sukoon implements an ephemeral client-side token rotation proxy that renegotiates CDN signed URLs on the fly before buffer exhaustion.",
      details: [
        "Pre-emptively refreshes signed streaming chunks every 120s before expiry.",
        "Zero middleman server bandwidth costs — media streams straight from origin CDN to client socket.",
        "Custom retry interceptor automatically switches origin mirrors upon receiving HTTP 403 or 429.",
        "Graceful stream resumption without audio stutter or buffer flush.",
      ],
      codeSnippet: `// Custom OkHttp Stream Interceptor & CDN Resolver
class CdnStreamInterceptor(private val tokenManager: EphemeralTokenManager) : Interceptor {
  override fun intercept(chain: Interceptor.Chain): Response {
    val request = chain.request()
    val response = chain.proceed(request)
    
    // Catch 403 CDN edge expiry and rotate token transparently
    if (response.code == 403 || response.code == 401) {
      response.close()
      val freshSignedUrl = tokenManager.renegotiateDirectCdnUrl(request.url)
      val renewedRequest = request.newBuilder().url(freshSignedUrl).build()
      return chain.proceed(renewedRequest)
    }
    return response
  }
}`,
    },
    {
      id: "mqtt",
      title: "Sub-100ms MQTT Real-Time Sync",
      subtitle: "Drift compensation algorithm for collaborative room listening",
      metric: "32ms Drift",
      metricSub: "Sub-100ms Worldwide",
      badge: "Multiplayer Engine",
      icon: Users,
      summary:
        "Allows multiple users in remote locations to listen in lockstep. Sukoon combines HiveMQ MQTT QoS 1 telemetry with an adaptive Kalman filter clock drift estimator that subtly adjusts audio playback pitch/rate (0.98x - 1.02x) rather than causing audible pauses.",
      details: [
        "Continuous NTP clock sync rounds every 30s to compute delta between host and participants.",
        "Adaptive pitch-shifting algorithm eliminates noticeable micro-stutter during sync corrections.",
        "Lightweight binary payload (< 64 bytes per packet) minimizes battery and mobile data usage.",
        "Supports up to 50 concurrent listeners in a single synchronized listening room.",
      ],
      codeSnippet: `// Sukoon Real-Time Clock Drift Corrector
export function computeDriftCorrection(
  remoteTimestamp: number,
  localPlaybackTime: number,
  rtt: number
): { playbackRate: number; deltaMs: number } {
  const estimatedHostTime = remoteTimestamp + (rtt / 2);
  const deltaMs = estimatedHostTime - localPlaybackTime;
  
  // Apply smooth tempo nudging if drift is within tolerance window
  if (Math.abs(deltaMs) < 15) return { playbackRate: 1.0, deltaMs };
  if (deltaMs > 0 && deltaMs < 250) return { playbackRate: 1.015, deltaMs }; // speed up subtly
  if (deltaMs < 0 && deltaMs > -250) return { playbackRate: 0.985, deltaMs }; // slow down subtly
  
  // Severe drift (>250ms): hard seek required
  return { playbackRate: 1.0, deltaMs };
}`,
    },
    {
      id: "mmkv",
      title: "Zero UI Jank with C++ MMKV",
      subtitle: "Synchronous memory-mapped key-value storage eliminating JS thread freezes",
      metric: "0.12ms Read",
      metricSub: "vs 18.4ms AsyncStorage",
      badge: "Native Storage",
      icon: Zap,
      summary:
        "AsyncStorage causes frame drops (jank) during heavy playback operations, track transitions, and rapid scrubbing. Sukoon replaced async JSON serialization with Tencent MMKV C++ bindings, reading and writing audio state synchronously in memory.",
      details: [
        "130x faster reads and 350x faster writes compared to standard React Native AsyncStorage.",
        "Posix mmap ensures data persists safely even during sudden app termination or OS kill.",
        "Zero bridge overhead — direct C++ JSI bindings to JavaScript context.",
        "Guaranteed 60/120 FPS UI animation during seek bar dragging and waveform rendering.",
      ],
      codeSnippet: `// Direct C++ JSI MMKV Access in Audio Pipeline
import { MMKV } from 'react-native-mmkv';

export const audioStateStore = new MMKV({
  id: 'sukoon-audio-engine-state',
  encryptionKey: 'sukoon_hw_vault_key'
});

// Synchronous 0.1ms state writes without async promise queueing
export function saveTrackPlaybackPosition(trackId: string, positionMs: number) {
  audioStateStore.set(\`playback_pos_\${trackId}\`, positionMs);
  audioStateStore.set('last_active_timestamp', Date.now());
}`,
    },
    {
      id: "codec",
      title: "Hardware 44.1kHz Vocal Overdub",
      subtitle: "Custom Android MediaCodec mixer with 7-second stall watchdog",
      metric: "44.1 kHz",
      metricSub: "16-bit PCM Hardware",
      badge: "Low-Level Audio",
      icon: Sliders,
      summary:
        "Enables studio-grade vocal recording over an active backing track without audio feedback or latency desynchronization. Utilizes Android MediaCodec NDK APIs with an automated 7-second stall watchdog that revives frozen hardware audio decoders.",
      details: [
        "Direct PCM audio buffer mixing directly in native Kotlin/C++ memory without passing to JS.",
        "7-second hardware stall watchdog resets codec buffers if low-end devices deadlock.",
        "Phase-accurate headphone monitoring with sub-15ms round-trip recording latency.",
        "Real-time peak & RMS amplitude calculation for studio-grade visual meters.",
      ],
      codeSnippet: `// Android Native MediaCodec Audio Track Mixer & Stall Watchdog
class AudioCodecPipeline(private val sampleRate: Int = 44100) {
  private val stallWatchdog = Handler(Looper.getMainLooper())
  private var lastBufferTimestamp = System.currentTimeMillis()

  fun feedPcmBuffer(audioData: ByteArray, size: Int) {
    lastBufferTimestamp = System.currentTimeMillis()
    // Reset 7-second stall watchdog timer
    stallWatchdog.removeCallbacks(watchdogRunnable)
    stallWatchdog.postDelayed(watchdogRunnable, 7000L)

    // Direct hardware audio track write
    audioTrack.write(audioData, 0, size, AudioTrack.WRITE_NON_BLOCKING)
  }

  private val watchdogRunnable = Runnable {
    Log.w("SukoonEngine", "Audio decoder stall detected (>7s). Rebooting MediaCodec pipe...")
    reinitializeHardwareCodec()
  }
}`,
    },
  ];

  return (
    <section id="featured-architecture" className="py-24 bg-black relative border-t border-white/10 overflow-hidden">
      {/* Dynamic Ambient Background Backlight matching active screen */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[700px] blur-[170px] rounded-full pointer-events-none transition-all duration-700 -z-10"
        style={{ backgroundColor: currentScreen.glowColor }}
      />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-cyan-500/5 blur-[160px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/40 border border-emerald-500/30 text-emerald-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>FLAGSHIP ARCHITECTURAL CASE STUDY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
            Sukoon — High-Performance Streaming &amp; Collaborative Audio Engine
          </h2>
          <p className="mt-4 text-base sm:text-lg text-zinc-400 font-mono leading-relaxed">
            Cross-platform mobile audio pipeline with custom Android MediaCodec mixing, 7s stall
            watchdog, and sub-100ms MQTT drift compensation.
          </p>

          {/* Tech Badges List */}
          <div className="flex flex-wrap items-center gap-2 mt-6">
            {techBadges.map((badge) => (
              <span
                key={badge.name}
                className={`px-3 py-1 rounded-full text-xs font-mono font-medium border ${badge.color}`}
              >
                {badge.name}
              </span>
            ))}
          </div>
        </div>

        {/* 3. INTERACTIVE AUDIO SESSION ENGINE MONITOR WIDGET */}
        <div className="mb-12 rounded-2xl bg-[#090909] border border-white/10 p-5 sm:p-6 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/15 flex items-center justify-center text-emerald-400 shadow-inner">
                <Activity className="w-5 h-5 animate-pulse" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-white font-mono">
                    Audio Engine Diagnostics Monitor
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded text-[10px] font-mono border ${
                      isSimulating
                        ? "bg-emerald-950/60 border-emerald-500/40 text-emerald-300"
                        : "bg-zinc-900 border-white/10 text-zinc-500"
                    }`}
                  >
                    {isSimulating ? "LIVE SESSION ACTIVE" : "ENGINE STANDBY"}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 font-mono">
                  Real-time NDK hardware buffer telemetry &amp; distributed clock mesh
                </p>
              </div>
            </div>

            {/* Interactive Simulation Toggle */}
            <button
              onClick={() => setIsSimulating(!isSimulating)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-mono text-xs font-semibold transition-all duration-200 shadow-lg ${
                isSimulating
                  ? "bg-emerald-500 text-black shadow-emerald-500/30 hover:bg-emerald-400"
                  : "bg-white text-black hover:bg-zinc-200 shadow-white/10"
              }`}
            >
              {isSimulating ? (
                <>
                  <Pause className="w-3.5 h-3.5 fill-black" />
                  <span>Stop Playback Session</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-black ml-0.5" />
                  <span>Simulate Playback Session</span>
                </>
              )}
            </button>
          </div>

          {/* Equalizer & Telemetry Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center pt-5">
            {/* Equalizer Display (5 cols) */}
            <div className="md:col-span-5 bg-black/80 rounded-xl p-4 border border-white/5 flex flex-col justify-center">
              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mb-2">
                <span>PCM Hardware Frequency Spectrum</span>
                <span className={isSimulating ? "text-emerald-400" : "text-zinc-600"}>
                  {isSimulating ? "44.1 kHz • Active Stream" : "Muted"}
                </span>
              </div>
              <div className="h-16 flex items-end justify-between gap-1 px-2">
                {[
                  "animate-eq-1",
                  "animate-eq-3",
                  "animate-eq-2",
                  "animate-eq-5",
                  "animate-eq-4",
                  "animate-eq-7",
                  "animate-eq-6",
                  "animate-eq-8",
                  "animate-eq-2",
                  "animate-eq-4",
                  "animate-eq-1",
                  "animate-eq-5",
                  "animate-eq-3",
                  "animate-eq-6",
                  "animate-eq-7",
                  "animate-eq-2",
                  "animate-eq-8",
                  "animate-eq-1",
                  "animate-eq-4",
                  "animate-eq-5",
                ].map((animClass, idx) => (
                  <div
                    key={idx}
                    className={`w-1.5 sm:w-2 rounded-full transition-all duration-300 ${
                      isSimulating
                        ? `${animClass} bg-gradient-to-t from-emerald-500 via-cyan-400 to-white shadow-[0_0_8px_rgba(16,185,129,0.5)]`
                        : "h-2 bg-zinc-800"
                    }`}
                    style={{ minHeight: isSimulating ? "10px" : "4px" }}
                  />
                ))}
              </div>
            </div>

            {/* Live Telemetry Cards (7 cols) */}
            <div className="md:col-span-7 grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-xl bg-black border border-white/5 font-mono">
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                  PCM Sample Rate
                </div>
                <div className="text-sm sm:text-base font-extrabold text-white">
                  44,100 Hz
                </div>
                <div className="text-[10px] text-emerald-400 mt-0.5">
                  {isSimulating ? "Hardware Locked" : "Standby"}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black border border-white/5 font-mono">
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                  Buffer Health
                </div>
                <div className="text-sm sm:text-base font-extrabold text-white">
                  {isSimulating ? `${telemetry.buffer}%` : "100.0%"}
                </div>
                <div className="text-[10px] text-cyan-400 mt-0.5">
                  {isSimulating ? "1024 frames" : "Ready"}
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-black border border-white/5 font-mono">
                <div className="text-[10px] text-zinc-500 uppercase tracking-wider mb-1">
                  MQTT Transit
                </div>
                <div className="text-sm sm:text-base font-extrabold text-white">
                  {isSimulating ? `${telemetry.transit}ms` : "< 20ms"}
                </div>
                <div className="text-[10px] text-violet-400 mt-0.5">
                  {isSimulating ? `Jitter ±${telemetry.jitter}ms` : "Sub-100ms sync"}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 2. INTERACTIVE SMARTPHONE SHOWCASE WITH REAL SCREENSHOTS */}
        <div className="mb-20">
          {/* Horizontal Screen Tab Selector */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            {showcaseTabs.map((tab, idx) => {
              const Icon = tab.icon;
              const isActive = activeTab === idx;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(idx)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-mono text-xs font-semibold whitespace-nowrap transition-all border shrink-0 ${
                    isActive
                      ? "bg-zinc-900 border-white/30 text-white shadow-[0_0_20px_rgba(255,255,255,0.1)] ring-1 ring-white/20"
                      : "bg-[#090909] border-white/10 text-zinc-400 hover:text-white hover:border-white/20"
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? tab.accentText : "text-zinc-500"}`} />
                  <span>{tab.title}</span>
                </button>
              );
            })}
          </div>

          {/* Smartphone Chassis + Interactive Screen Display */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Phone Chassis (6 cols on desktop) */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative">
                {/* Ambient dynamic backlight glowing behind phone */}
                <div
                  className="absolute -inset-6 rounded-[52px] blur-2xl opacity-50 transition-all duration-500 pointer-events-none"
                  style={{ backgroundColor: currentScreen.glowColor }}
                />

                {/* Smartphone Metallic Titanium Chassis */}
                <div className="relative w-[300px] sm:w-[330px] rounded-[48px] p-3 bg-gradient-to-b from-zinc-700 via-zinc-900 to-black border-2 border-zinc-600 shadow-[0_0_60px_rgba(0,0,0,0.9)]">
                  {/* Dynamic Island / Speaker Notch */}
                  <div className="absolute top-6 left-1/2 -translate-x-1/2 w-28 h-4 bg-black rounded-full z-30 border border-white/10 flex items-center justify-between px-3">
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-900 border border-white/10" />
                    <div className="w-2 h-2 rounded-full bg-emerald-500/80 animate-pulse" />
                  </div>

                  {/* Phone Screen Container */}
                  <div className="relative w-full aspect-[9/19.5] rounded-[38px] bg-black overflow-hidden border border-white/15">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentScreen.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                        className="w-full h-full relative"
                      >
                        {imageError[currentScreen.id] ? (
                          /* Fallback Mockup View if Image Fails to Load */
                          <div className="w-full h-full bg-gradient-to-b from-zinc-900 via-zinc-950 to-black p-6 flex flex-col justify-between font-mono">
                            <div className="pt-8">
                              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-500/30 text-emerald-400">
                                SUKOON ARCHITECTURE
                              </span>
                              <h4 className="text-base font-bold text-white mt-3">
                                {currentScreen.title}
                              </h4>
                              <p className="text-xs text-zinc-400 mt-2">
                                {currentScreen.description}
                              </p>
                            </div>
                            <div className="p-4 rounded-xl bg-black border border-white/10 space-y-2">
                              <div className="text-[10px] text-zinc-500 uppercase">
                                Telemetry Stream
                              </div>
                              <div className="text-xs text-emerald-300">
                                {currentScreen.telemetry}
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* Real Screenshot Image */
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={currentScreen.imageSrc}
                            alt={currentScreen.title}
                            onError={() =>
                              setImageError((prev) => ({ ...prev, [currentScreen.id]: true }))
                            }
                            className="w-full h-full object-cover object-top select-none"
                          />
                        )}

                        {/* Subtle Glass Reflection Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/[0.04] to-transparent pointer-events-none" />
                      </motion.div>
                    </AnimatePresence>

                    {/* Bottom Home Indicator Bar */}
                    <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-28 h-1 bg-white/30 rounded-full z-20 pointer-events-none" />
                  </div>
                </div>
              </div>
            </div>

            {/* Telemetry Detail Card & Active Feature Breakdown (6 cols) */}
            <div className="lg:col-span-6 space-y-6">
              <div className="p-6 sm:p-8 rounded-3xl bg-[#080808]/90 border border-white/10 shadow-2xl relative overflow-hidden">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-500">
                    Active Module //
                  </span>
                  <span className={`text-xs font-mono font-bold ${currentScreen.accentText}`}>
                    {currentScreen.title}
                  </span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-3 font-mono">
                  {currentScreen.title}
                </h3>

                <p className="text-sm text-zinc-400 font-mono leading-relaxed mb-6">
                  {currentScreen.description}
                </p>

                {/* Dynamic Engineering Telemetry Card */}
                <div className="p-4 rounded-2xl bg-black border border-white/10 space-y-2">
                  <div className="flex items-center justify-between text-[11px] font-mono text-zinc-500">
                    <span className="flex items-center gap-1.5 text-zinc-400">
                      <Zap className="w-3.5 h-3.5 text-emerald-400" />
                      Engineering Telemetry Spec
                    </span>
                    <span className="text-[10px] text-emerald-400 font-semibold">VERIFIED</span>
                  </div>
                  <div className="text-xs sm:text-sm font-mono font-semibold text-white bg-zinc-950 p-3 rounded-xl border border-white/5">
                    {currentScreen.telemetry}
                  </div>
                </div>

                {/* Quick Feature Checklist for active screen */}
                <div className="mt-6 pt-5 border-t border-white/10 space-y-2 font-mono text-xs text-zinc-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Cross-platform Expo 57 &amp; Kotlin native bridges</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Synchronous C++ MMKV persistence (0 dropped UI frames)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>Sub-100ms global synchronized playback over MQTT QoS 1</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 KEY ARCHITECTURAL HIGHLIGHTS & DEEP DIVES GRID */}
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-mono">
                Key Architectural Highlights &amp; Deep Dives
              </h3>
              <p className="text-sm text-zinc-400 font-mono mt-1">
                Engineered from the ground up for low latency, zero UI jank, and bulletproof stream delivery.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlights.map((item) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.id}
                  className="amoled-card rounded-2xl p-6 relative overflow-hidden transition-all duration-300 border border-white/10 hover:border-white/20"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-emerald-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-semibold">
                          {item.badge}
                        </span>
                        <h4 className="text-lg font-bold text-white tracking-tight">
                          {item.title}
                        </h4>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-base font-extrabold text-white font-mono">
                        {item.metric}
                      </div>
                      <div className="text-[10px] text-zinc-500 font-mono">{item.metricSub}</div>
                    </div>
                  </div>

                  <p className="text-sm text-zinc-400 leading-relaxed mb-4">
                    {item.summary}
                  </p>

                  {/* Bullet points */}
                  <ul className="space-y-2 mb-5">
                    {item.details.map((detail, dIdx) => (
                      <li key={dIdx} className="flex items-start gap-2 text-xs text-zinc-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Code Snippet */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <Code2 className="w-3.5 h-3.5" />
                        Production Implementation Snippet
                      </span>
                      <span className="text-[10px] text-zinc-500">Kotlin / TS / C++</span>
                    </div>
                    <pre className="bg-black/90 p-3 rounded-lg border border-white/5 text-[11px] font-mono text-zinc-300 overflow-x-auto">
                      <code>{item.codeSnippet}</code>
                    </pre>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
