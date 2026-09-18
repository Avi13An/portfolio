"use client";

import React, { useState, useEffect } from "react";
import {
  Play,
  Pause,
  Volume2,
  Users,
  ShieldAlert,
  Cpu,
  Radio,
  Clock,
  CheckCircle2,
  Maximize2,
  Sparkles,
  Terminal,
  Zap,
  ArrowRight,
  Sliders,
  Layers,
  Code2,
} from "lucide-react";

export function SukoonCaseStudy() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(14); // seconds
  const [activeHighlight, setActiveHighlight] = useState<string>("stream");

  // Simulated 45s audio player timeline
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setProgress((prev) => (prev >= 45 ? 0 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

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
    <section id="featured-architecture" className="py-24 bg-black relative border-t border-white/10">
      {/* Background radial highlight */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] glow-emerald opacity-60 pointer-events-none" />
      <div className="absolute bottom-10 left-10 w-[500px] h-[500px] glow-cyan opacity-40 pointer-events-none" />

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

        {/* Visual & Video Showcase Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          {/* Main Visual / Video Demo Player Frame (7 cols) */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl bg-zinc-950 border border-white/15 p-1.5 shadow-2xl relative overflow-hidden group">
              {/* Window Header */}
              <div className="bg-black/80 px-4 py-3 rounded-t-xl border-b border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  <span className="ml-2 text-xs font-mono text-zinc-400">
                    Sukoon Audio Engine 45s Architecture Preview
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-zinc-500">
                  <span className="px-2 py-0.5 rounded bg-zinc-900 border border-white/10 text-emerald-400 text-[10px]">
                    44.1kHz • 320kbps
                  </span>
                </div>
              </div>

              {/* Video Showcase Frame / Interactive Demo Simulation */}
              <div className="relative aspect-video bg-zinc-950/90 flex flex-col justify-between p-6 overflow-hidden">
                {/* Visualizer background grid */}
                <div className="absolute inset-0 amoled-mesh opacity-20" />
                <div className="absolute -top-10 -right-10 w-64 h-64 bg-emerald-500/10 blur-[90px] rounded-full pointer-events-none" />

                {/* Top overlay in player */}
                <div className="relative z-10 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-mono flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
                        LIVE SYNC SESSION
                      </span>
                      <span className="text-xs font-mono text-zinc-500">Room #8492-DX</span>
                    </div>
                    <h3 className="text-white text-lg font-bold mt-2">
                      Spatial Symphony — High-Bitrate Native Mix
                    </h3>
                    <p className="text-zinc-400 text-xs font-mono">
                      Host: Avi • 4 Listeners Connected • HiveMQ Broker: Frankfurt
                    </p>
                  </div>

                  <div className="flex items-center gap-2 bg-black/70 border border-white/10 px-3 py-1.5 rounded-lg text-xs font-mono text-zinc-300">
                    <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
                    <span>±18ms sync drift</span>
                  </div>
                </div>

                {/* Center Dynamic Audio Waveform Equalizer */}
                <div className="relative z-10 py-6">
                  <div className="h-28 flex items-center justify-between gap-1 sm:gap-1.5 px-4 bg-black/60 rounded-xl border border-white/5 backdrop-blur-sm">
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
                      "animate-eq-3",
                      "animate-eq-2",
                      "animate-eq-6",
                      "animate-eq-7",
                    ].map((animClass, idx) => (
                      <div
                        key={idx}
                        className={`w-1.5 sm:w-2 rounded-full transition-all duration-300 ${
                          isPlaying
                            ? `${animClass} bg-gradient-to-t from-emerald-500 via-cyan-400 to-white shadow-[0_0_8px_rgba(16,185,129,0.5)]`
                            : "h-2 bg-zinc-800"
                        }`}
                        style={{ minHeight: isPlaying ? "8px" : "4px" }}
                      />
                    ))}
                  </div>

                  {/* Latency & Stall Watchdog Banner */}
                  <div className="flex items-center justify-between mt-3 text-[11px] font-mono text-zinc-400 px-1">
                    <span className="flex items-center gap-1 text-emerald-400">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      MediaCodec Buffer: 1024 frames (locked)
                    </span>
                    <span className="text-zinc-500">Stall Watchdog: 7.0s Active</span>
                  </div>
                </div>

                {/* Bottom Player Controls & 45-second scrubber */}
                <div className="relative z-10 space-y-2 bg-black/80 p-3.5 rounded-xl border border-white/10">
                  {/* Scrubber */}
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden relative cursor-pointer">
                    <div
                      className="bg-gradient-to-r from-emerald-500 to-cyan-400 h-full rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(16,185,129,0.7)]"
                      style={{ width: `${(progress / 45) * 100}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center hover:bg-zinc-200 transition-all shadow-md shadow-emerald-500/20"
                        aria-label={isPlaying ? "Pause audio engine demo" : "Play audio engine demo"}
                      >
                        {isPlaying ? (
                          <Pause className="w-4 h-4 fill-black" />
                        ) : (
                          <Play className="w-4 h-4 fill-black ml-0.5" />
                        )}
                      </button>
                      <div className="font-mono text-xs text-zinc-300">
                        <span>{formatTime(progress)}</span>
                        <span className="text-zinc-600 mx-1">/</span>
                        <span className="text-zinc-500">0:45 (Demo Clip)</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-xs font-mono text-zinc-400 bg-zinc-900 px-2 py-1 rounded border border-white/5">
                        <Volume2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span>PCM 16-Bit Stereo</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* High-Res Mobile Mockup Frame (5 cols) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-full max-w-[320px] rounded-[36px] bg-black p-3 border-2 border-zinc-700 shadow-2xl shadow-emerald-950/30 relative">
              {/* Phone speaker notch */}
              <div className="w-24 h-4 bg-zinc-900 rounded-full mx-auto mb-3 border border-white/10 flex items-center justify-center">
                <div className="w-8 h-1 bg-zinc-700 rounded-full" />
              </div>

              {/* Phone Screen Contents */}
              <div className="rounded-[28px] bg-zinc-950 border border-white/10 p-4 space-y-4 font-mono overflow-hidden">
                {/* Sukoon App Header */}
                <div className="flex items-center justify-between pb-2 border-b border-white/5">
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 rounded-md bg-emerald-500 flex items-center justify-center text-black font-extrabold text-[10px]">
                      S
                    </div>
                    <span className="text-xs font-bold text-white tracking-wide">Sukoon Engine</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/30">
                    EXPO 57
                  </span>
                </div>

                {/* Active Session Card */}
                <div className="rounded-xl bg-black border border-white/10 p-3 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-zinc-400">
                    <span>Collaborative Stream</span>
                    <span className="text-emerald-400 font-bold">QoS 1 ACTIVE</span>
                  </div>
                  <div className="text-xs font-bold text-white">Midnight Lo-Fi Master #03</div>
                  <div className="text-[10px] text-zinc-500">
                    Stream resolved via direct client worker (HTTP 200)
                  </div>
                </div>

                {/* Overdub Track Monitor */}
                <div className="rounded-xl bg-zinc-900/60 border border-white/5 p-3 space-y-2">
                  <div className="flex items-center justify-between text-[10px]">
                    <span className="text-zinc-400">Track 2: Vocal Overdub</span>
                    <span className="text-cyan-400">44.1kHz Rec</span>
                  </div>
                  <div className="w-full bg-zinc-950 h-2 rounded-full overflow-hidden flex items-center">
                    <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-400 w-3/4 animate-pulse rounded-full" />
                  </div>
                  <div className="flex justify-between text-[9px] text-zinc-500">
                    <span>Hardware Latency: 12ms</span>
                    <span>Zero Phase Drift</span>
                  </div>
                </div>

                {/* Room Participants */}
                <div className="space-y-1.5 pt-1">
                  <div className="text-[10px] text-zinc-500 uppercase tracking-wider">
                    Room Mesh (MQTT Sub-100ms)
                  </div>
                  {[
                    { name: "Avi (Host / Mobile)", status: "Master Clock", latency: "0ms" },
                    { name: "Sarah K.", status: "Synced (Frankfurt)", latency: "+22ms" },
                    { name: "David M.", status: "Synced (NYC)", latency: "+48ms" },
                  ].map((p, idx) => (
                    <div
                      key={idx}
                      className="flex items-center justify-between text-[11px] p-1.5 rounded-lg bg-black border border-white/5"
                    >
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                        <span className="text-zinc-300">{p.name}</span>
                      </div>
                      <span className="text-zinc-500 text-[10px]">{p.latency}</span>
                    </div>
                  ))}
                </div>

                {/* Phone Bottom Home Bar */}
                <div className="pt-2">
                  <div className="w-20 h-1 bg-zinc-700 rounded-full mx-auto" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Key Highlights Architecture Grid */}
        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white">
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
              const isSelected = activeHighlight === item.id;
              return (
                <div
                  key={item.id}
                  onClick={() => setActiveHighlight(item.id)}
                  className={`amoled-card rounded-2xl p-6 cursor-pointer relative overflow-hidden transition-all duration-300 border ${
                    isSelected
                      ? "border-emerald-500/60 shadow-[0_0_30px_rgba(16,185,129,0.15)] bg-zinc-950"
                      : "border-white/10 hover:border-white/20"
                  }`}
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

                  {/* Interactive Code / Technical Spec Drawer */}
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                      <span className="flex items-center gap-1.5 text-emerald-400">
                        <Code2 className="w-3.5 h-3.5" />
                        Production Implementation Snippet
                      </span>
                      <span className="text-[10px] text-zinc-500">Tap to inspect</span>
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
