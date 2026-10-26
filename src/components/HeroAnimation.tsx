"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { ArrowDown, ArrowUpRight, RotateCcw, Sparkles, Terminal, Cpu, Mail } from "lucide-react";
import { motion, AnimatePresence, type Variants } from "framer-motion";

const EASE_CUSTOM: [number, number, number, number] = [0.16, 1, 0.3, 1];
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";
const TARGET_HEADLINE = "PORTFOLIO";
const INITIAL_NAME = "AVI TANDON";

type AnimationPhase = "drop" | "spill" | "morph" | "settled";

interface HalftoneParticle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originX: number;
  originY: number;
  targetX: number | null;
  targetY: number | null;
  brightness: number;
  size: number;
  baseAlpha: number;
  color: string;
}

export function HeroAnimation() {
  const [phase, setPhase] = useState<AnimationPhase>("drop");
  const [displayText, setDisplayText] = useState<string>(INITIAL_NAME);
  const [activeGlyphIndices, setActiveGlyphIndices] = useState<Set<number>>(new Set());
  const [replayKey, setReplayKey] = useState<number>(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<HalftoneParticle[]>([]);
  const hasProfileRef = useRef<boolean>(false);
  const profilePointsRef = useRef<{ x: number; y: number; brightness: number }[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);

  const stats = [
    { value: "2 Weeks", label: "Average MVP Turnaround" },
    { value: "<100ms", label: "Real-Time MQTT Sync" },
    { value: "44.1kHz", label: "Native Hardware Audio" },
    { value: "₹10k–₹18k", label: "Flagship Sprint Tier" },
  ];

  // Helper to clear all scheduled timeouts
  const clearTimers = useCallback(() => {
    timersRef.current.forEach((t) => clearTimeout(t));
    timersRef.current = [];
  }, []);

  // -------------------------------------------------------------
  // 5-PHASE STATE MACHINE TIMELINE
  // -------------------------------------------------------------
  const startChoreography = useCallback(() => {
    clearTimers();
    setPhase("drop");
    setDisplayText(INITIAL_NAME);
    setActiveGlyphIndices(new Set());

    // Phase 1 -> Phase 2 (at 1.1s)
    const t1 = setTimeout(() => {
      setPhase("spill");
    }, 1100);

    // Phase 2 -> Phase 3 (at 2.4s)
    const t2 = setTimeout(() => {
      setPhase("morph");
    }, 2400);

    // Phase 3 -> Phase 4 (at 3.3s)
    const t3 = setTimeout(() => {
      setPhase("settled");
      setDisplayText(TARGET_HEADLINE);
      setActiveGlyphIndices(new Set());
    }, 3300);

    timersRef.current.push(t1, t2, t3);
  }, [clearTimers]);

  useEffect(() => {
    startChoreography();
    return () => clearTimers();
  }, [startChoreography, replayKey]);

  // -------------------------------------------------------------
  // PHASE 3: MATRIX GLYPH TEXT MORPH (2.4s – 3.3s, 35ms ticks)
  // -------------------------------------------------------------
  useEffect(() => {
    if (phase !== "morph") return;

    const startTime = Date.now();
    const duration = 900; // 2.4s to 3.3s is 900ms
    const targetLen = TARGET_HEADLINE.length; // 9

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Determine how many characters have locked in
      // progress sweeps across 0 -> 1
      const lockThreshold = Math.floor(progress * (targetLen + 1));
      const activeIndices = new Set<number>();

      let result = "";
      for (let i = 0; i < targetLen; i++) {
        if (i < lockThreshold) {
          result += TARGET_HEADLINE[i];
        } else {
          // Random glyph
          const randGlyph = GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
          result += randGlyph;
          activeIndices.add(i);
        }
      }

      setDisplayText(result);
      setActiveGlyphIndices(activeIndices);

      if (progress >= 1) {
        clearInterval(interval);
        setDisplayText(TARGET_HEADLINE);
        setActiveGlyphIndices(new Set());
      }
    }, 35);

    return () => clearInterval(interval);
  }, [phase]);

  // -------------------------------------------------------------
  // PHASE 5: HALFTONE PARTICLE POINT-CLOUD CANVAS
  // -------------------------------------------------------------
  useEffect(() => {
    // Check for /profile.png in public/
    const img = new Image();
    img.src = "/profile.png";
    img.onload = () => {
      try {
        const offCanvas = document.createElement("canvas");
        const offCtx = offCanvas.getContext("2d");
        if (!offCtx) return;
        const size = 260;
        offCanvas.width = size;
        offCanvas.height = size;
        offCtx.drawImage(img, 0, 0, size, size);
        const imgData = offCtx.getImageData(0, 0, size, size);
        const data = imgData.data;
        const points: { x: number; y: number; brightness: number }[] = [];
        const step = 5;
        for (let py = 0; py < size; py += step) {
          for (let px = 0; px < size; px += step) {
            const idx = (py * size + px) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const a = data[idx + 3];
            if (a > 60) {
              const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
              if (lum > 0.18) {
                points.push({
                  x: (px - size / 2) * 1.5,
                  y: (py - size / 2) * 1.5,
                  brightness: lum,
                });
              }
            }
          }
        }
        if (points.length > 50) {
          hasProfileRef.current = true;
          profilePointsRef.current = points;
        }
      } catch {
        hasProfileRef.current = false;
      }
    };
    img.onerror = () => {
      hasProfileRef.current = false;
    };

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    // Initialize 550 particles
    const particleCount = 550;
    const particles: HalftoneParticle[] = [];
    const colors = [
      "rgba(16, 185, 129, ", // Emerald
      "rgba(6, 182, 212, ",  // Cyan
      "rgba(255, 255, 255, ", // Crisp white
    ];

    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        originX: x,
        originY: y,
        targetX: null,
        targetY: null,
        brightness: 0.5,
        size: Math.random() * 2 + 1,
        baseAlpha: Math.random() * 0.6 + 0.25,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    particlesRef.current = particles;

    let clock = 0;
    const render = () => {
      clock += 0.016;
      ctx.clearRect(0, 0, width, height);

      const centerX = width / 2;
      const centerY = height * 0.42;
      const isSettled = phase === "settled";
      const hasProfile = hasProfileRef.current && profilePointsRef.current.length > 0;
      const profilePoints = profilePointsRef.current;

      const pLen = particles.length;
      for (let i = 0; i < pLen; i++) {
        const p = particles[i];

        if (isSettled && hasProfile) {
          // Condense into Halftone 3D Particle Portrait
          const pt = profilePoints[i % profilePoints.length];
          const tx = centerX + pt.x + (mousePos.x - centerX) * 0.04;
          const ty = centerY - 20 + pt.y + (mousePos.y - centerY) * 0.04;

          p.x += (tx - p.x) * 0.055;
          p.y += (ty - p.y) * 0.055;
          p.size = 1.0 + pt.brightness * 2.4;

          ctx.fillStyle = p.color + (0.35 + pt.brightness * 0.55) + ")";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else if (isSettled && !hasProfile) {
          // Ambient Interactive Constellation gently attracting toward center text
          const angle = (i / pLen) * Math.PI * 2 + clock * 0.08;
          const radiusX = 320 + Math.sin(clock * 0.5 + i) * 60;
          const radiusY = 170 + Math.cos(clock * 0.5 + i) * 40;
          const tx = centerX + Math.cos(angle) * radiusX + (mousePos.x - centerX) * 0.03;
          const ty = centerY + Math.sin(angle) * radiusY + (mousePos.y - centerY) * 0.03;

          p.x += (tx - p.x) * 0.03;
          p.y += (ty - p.y) * 0.03;

          const alphaPulse = p.baseAlpha * (0.6 + 0.4 * Math.sin(clock * 1.5 + i));
          ctx.fillStyle = p.color + alphaPulse + ")";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Phases 1-3: Starfield particles scattered across void with gentle drift
          p.x += p.vx;
          p.y += p.vy;

          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;

          const twinkle = p.baseAlpha * (0.5 + 0.5 * Math.sin(clock * 2 + p.originX));
          ctx.fillStyle = p.color + twinkle + ")";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Constellation connection lines when settled without profile
      if (isSettled && !hasProfile) {
        for (let i = 0; i < 70; i += 2) {
          const p1 = particles[i];
          const p2 = particles[(i + 1) % pLen];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 90) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(16, 185, 129, ${0.12 * (1 - dist / 90)})`;
            ctx.lineWidth = 0.75;
            ctx.stroke();
          }
        }
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [phase, mousePos]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleReplay = () => {
    setReplayKey((k) => k + 1);
  };

  const detailsContainerVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: EASE_CUSTOM,
        staggerChildren: 0.1,
      },
    },
  };

  const detailsItemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: EASE_CUSTOM },
    },
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      className="relative min-h-[92vh] sm:min-h-screen pt-24 pb-16 md:pt-32 md:pb-24 flex flex-col justify-between items-center overflow-hidden bg-black text-white select-none"
    >
      {/* Halftone Point-Cloud HTML5 Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-0"
      />

      {/* Atmospheric Ambient Glow Spheres in Hero Background */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[520px] sm:w-[720px] h-[340px] sm:h-[420px] bg-emerald-500/10 blur-[150px] rounded-full pointer-events-none -z-10 animate-pulse" />
      <div className="absolute top-1/3 left-1/3 w-[350px] h-[350px] bg-cyan-500/[0.08] blur-[140px] rounded-full pointer-events-none -z-10" />

      {/* ------------------------------------------------------------- */}
      {/* TOP HUD TELEMETRY BAR (Reveals in Phase 4) */}
      {/* ------------------------------------------------------------- */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: phase === "settled" ? 1 : 0.4, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_CUSTOM }}
          className="flex items-center justify-between py-2 border-b border-white/[0.08] text-[11px] font-mono text-neutral-400"
        >
          {/* Status readout */}
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-neutral-300 font-semibold tracking-wider hidden sm:inline">
              SYS.STATUS //
            </span>
            <span className="text-emerald-400 font-semibold">
              {phase === "drop" && "PHASE 1 : LEVER DROP"}
              {phase === "spill" && "PHASE 2 : LETTER SPILL"}
              {phase === "morph" && "PHASE 3 : GLYPH MORPH"}
              {phase === "settled" && "NOMINAL // MVP ENGINE ONLINE"}
            </span>
          </div>

          {/* Center Identity */}
          <div className="hidden md:flex items-center gap-2 text-neutral-400">
            <Cpu className="w-3.5 h-3.5 text-cyan-400" />
            <span className="tracking-widest">AVI TANDON • DEV // REEL v2.6</span>
          </div>

          {/* Quick Replay Action */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleReplay}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-neutral-900/90 border border-white/10 hover:border-emerald-500/50 hover:text-white transition-all text-[10px] font-mono group"
              title="Replay 5-phase animation"
            >
              <RotateCcw className="w-3 h-3 text-neutral-400 group-hover:text-emerald-400 group-hover:-rotate-90 transition-transform" />
              <span>REPLAY REEL</span>
            </button>
          </div>
        </motion.div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* CENTERPIECE HERO STAGE: PHASES 1, 2, 3 & 4 */}
      {/* ------------------------------------------------------------- */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto relative z-10 py-6">
        {/* PHASE 1: THE LEVER DROP (0.0s – 1.1s) */}
        {phase === "drop" && (
          <div className="relative h-44 sm:h-56 flex flex-col items-center justify-center">
            {/* The Metallic Vertical Bar Lever */}
            <motion.div
              initial={{ y: -130, opacity: 0, rotateZ: 0 }}
              animate={{
                y: [-130, -18, -18],
                opacity: [0, 1, 1],
                rotateZ: [0, 0, 78],
              }}
              transition={{
                duration: 1.1,
                times: [0, 0.45, 0.72],
                ease: EASE_CUSTOM,
              }}
              style={{ transformOrigin: "bottom center" }}
              className="w-3 sm:w-3.5 h-16 sm:h-20 rounded-full bg-gradient-to-b from-white via-neutral-300 to-neutral-500 shadow-[0_0_30px_rgba(255,255,255,0.45)] border border-white/40"
            />

            {/* The Dot with Realistic Bounce Physics: [0, -32, 0, -10, 0] */}
            <motion.div
              initial={{ y: -160, opacity: 0 }}
              animate={{
                y: [-160, 0, -32, 0, -10, 0],
                opacity: 1,
              }}
              transition={{
                duration: 1.05,
                times: [0, 0.4, 0.6, 0.78, 0.9, 1.0],
                ease: EASE_CUSTOM,
              }}
              className="w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-white shadow-[0_0_25px_rgba(255,255,255,0.9),0_0_50px_rgba(16,185,129,0.5)] mt-3"
            />
          </div>
        )}

        {/* PHASE 2: KINETIC LETTER SPILL (1.1s – 2.4s) */}
        {phase === "spill" && (
          <div className="relative min-h-[140px] sm:min-h-[180px] flex flex-col items-center justify-center">
            {/* Rolling Dot */}
            <motion.div
              initial={{ x: -120, y: 0, opacity: 1, rotate: 0 }}
              animate={{
                x: [-120, 160, 280],
                rotate: [0, 540, 900],
                opacity: [1, 0.8, 0],
              }}
              transition={{ duration: 1.25, ease: EASE_CUSTOM }}
              className="absolute w-4 h-4 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] -bottom-2 z-20"
            />

            {/* Letters Tumble Out with 3D Rotation */}
            <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
              {INITIAL_NAME.split("").map((char, idx) => (
                <motion.span
                  key={idx}
                  initial={{
                    opacity: 0,
                    y: -45,
                    rotateZ: idx % 2 === 0 ? -42 : 42,
                    scale: 0.3,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    rotateZ: 0,
                    scale: 1,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: idx * 0.075,
                    ease: EASE_CUSTOM,
                  }}
                  className={`text-4xl sm:text-6xl md:text-7xl font-black tracking-tight font-sans ${
                    char === " " ? "w-4 sm:w-6" : "heading-metallic drop-shadow-[0_0_25px_rgba(255,255,255,0.25)]"
                  }`}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {/* PHASE 3: MATRIX GLYPH TEXT MORPH (2.4s – 3.3s) */}
        {phase === "morph" && (
          <div className="relative min-h-[140px] sm:min-h-[180px] flex flex-col items-center justify-center">
            <div className="flex items-center justify-center gap-1 sm:gap-2 flex-wrap">
              {displayText.split("").map((char, idx) => {
                const isActive = activeGlyphIndices.has(idx);
                return (
                  <motion.span
                    key={idx}
                    animate={{
                      scale: isActive ? [1, 1.15, 1] : 1,
                      textShadow: isActive
                        ? "0 0 25px rgba(6,182,212,0.9)"
                        : "0 0 15px rgba(255,255,255,0.4)",
                    }}
                    transition={{ duration: 0.12 }}
                    className={`text-5xl sm:text-7xl md:text-8xl font-black tracking-tight font-mono transition-colors ${
                      isActive
                        ? "text-cyan-400"
                        : "heading-metallic"
                    }`}
                  >
                    {char}
                  </motion.span>
                );
              })}
            </div>
          </div>
        )}

        {/* PHASE 4: REVEALED HEADLINE & HUD DETAILS (3.3s+) */}
        {phase === "settled" && (
          <motion.div
            variants={detailsContainerVariants}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center justify-center"
          >
            {/* Availability Eyebrow Pill */}
            <motion.div variants={detailsItemVariants} className="inline-block mb-4 sm:mb-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-950/80 border border-emerald-500/30 text-emerald-300 text-xs font-mono tracking-wide backdrop-blur-md shadow-[0_0_20px_rgba(16,185,129,0.15)]">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span>Available for Next Sprint</span>
              </div>
            </motion.div>

            {/* Bold Metallic Gradient PORTFOLIO Headline */}
            <motion.h1
              variants={detailsItemVariants}
              className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tight leading-[0.98] heading-metallic font-sans drop-shadow-[0_10px_40px_rgba(255,255,255,0.18)] mb-4"
            >
              PORTFOLIO
            </motion.h1>

            {/* Role Subline */}
            <motion.div variants={detailsItemVariants} className="mb-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold tracking-tight bg-gradient-to-r from-neutral-100 via-white to-neutral-400 bg-clip-text text-transparent font-sans">
                Avi Tandon • Full-Stack &amp; Systems MVP Developer
              </h2>
            </motion.div>

            {/* Core Value Proposition Subtitle */}
            <motion.p
              variants={detailsItemVariants}
              className="text-sm sm:text-base md:text-lg text-neutral-400 max-w-2xl mx-auto font-mono leading-relaxed mb-8 text-balance"
            >
              I turn ambitious ideas into production-ready MVPs and mobile/web applications in 2 weeks. Zero fluff, hardware-level performance.
            </motion.p>

            {/* Dual CTAs + Email Action Pill */}
            <motion.div
              variants={detailsItemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-3.5 w-full max-w-lg mb-10"
            >
              {/* Primary: Start a Sprint */}
              <motion.a
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#intake"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 rounded-xl bg-white text-black font-semibold text-xs font-mono hover:bg-neutral-200 transition-colors shadow-[0_0_25px_rgba(255,255,255,0.25)] hover:shadow-[0_0_40px_rgba(255,255,255,0.45)]"
              >
                <span>Start a Sprint</span>
                <ArrowUpRight className="w-4 h-4" />
              </motion.a>

              {/* Secondary: Explore Architecture */}
              <motion.a
                whileHover={{ y: -3, scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                href="#featured-architecture"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-950/80 text-neutral-200 font-medium text-xs font-mono border border-white/15 hover:border-emerald-500/50 hover:bg-zinc-900 transition-colors group backdrop-blur-md"
              >
                <span>Explore Architecture</span>
                <ArrowDown className="w-3.5 h-3.5 text-emerald-400 group-hover:translate-y-0.5 transition-transform" />
              </motion.a>

              {/* Direct Mailto Pill */}
              <motion.a
                whileHover={{ y: -2 }}
                href="mailto:avitan.offic@gmail.com"
                className="inline-flex items-center gap-1.5 px-4 py-3 rounded-xl bg-neutral-900/60 border border-white/10 hover:border-emerald-500/40 text-neutral-400 hover:text-white text-xs font-mono transition-colors"
                title="Send direct email"
              >
                <Mail className="w-3.5 h-3.5 text-emerald-400" />
                <span className="hidden md:inline">avitan.offic@gmail.com</span>
                <span className="md:hidden">Email</span>
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* ------------------------------------------------------------- */}
      {/* BOTTOM METRIC TICKER & TELEMETRY STRIP (Reveals in Phase 4) */}
      {/* ------------------------------------------------------------- */}
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: phase === "settled" ? 1 : 0.35, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_CUSTOM }}
          className="rounded-2xl bg-zinc-950/70 border border-white/[0.08] p-4 sm:p-5 backdrop-blur-xl shadow-2xl"
        >
          {/* Top Ticker Line */}
          <div className="text-center pb-3 mb-3 border-b border-white/[0.06] text-[11px] font-mono tracking-wider text-emerald-400">
            ⚡ 2-Week Turnaround • Sub-100ms Systems • Zero-Jank Architecture
          </div>

          {/* 4 Stats Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 divide-y sm:divide-y-0 sm:divide-x divide-white/[0.06]">
            {stats.map((item, idx) => (
              <div key={idx} className={`pt-2 sm:pt-0 ${idx > 0 ? "sm:pl-4" : ""}`}>
                <div className="text-xl sm:text-2xl font-extrabold text-white tracking-tight font-mono">
                  {item.value}
                </div>
                <div className="text-[11px] text-neutral-400 font-mono mt-0.5">{item.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
