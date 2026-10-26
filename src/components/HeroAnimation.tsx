"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const EASE_CUSTOM: [number, number, number, number] = [0.16, 1, 0.3, 1];
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*";
const INITIAL_NAME = "AVI TANDON";
const TARGET_HEADLINE = "PORTFOLIO";

type Phase = "lever" | "spill" | "morph" | "settled";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  origPtX: number;
  origPtY: number;
  targetX: number;
  targetY: number;
  size: number;
  alpha: number;
  targetAlpha: number;
  brightness: number;
}

// Procedural 3D halftone silhouette matrix of head & shoulders (~3,800 points, high density)
function generateProceduralBust(): { x: number; y: number; brightness: number }[] {
  const points: { x: number; y: number; brightness: number }[] = [];
  const step = 2.6; // High density sampling for crisp upscaled definition

  for (let y = -155; y <= 150; y += step) {
    for (let x = -135; x <= 135; x += step) {
      let inside = false;
      let lum = 0;

      // 1. Head (Cranium & Face)
      if (y < 20) {
        const headY = y + 70; // cranium center at y = -70
        const headX = x;
        const taper = y > -55 ? 1 - ((y + 55) / 75) * 0.42 : 1;
        const rx = 52 * taper;
        const ry = 66;
        const dHead = (headX * headX) / (rx * rx) + (headY * headY) / (ry * ry);

        if (dHead <= 1) {
          inside = true;
          const z = Math.sqrt(Math.max(0, 1 - dHead));
          const nx = headX / rx;
          const ny = headY / ry;
          const nz = z;
          const dotLight = nx * 0.35 - ny * 0.45 + nz * 0.82;
          lum = Math.max(0.22, Math.min(1, dotLight));

          // Anatomical feature shading
          if (y > -78 && y < -58 && Math.abs(x) < 30 && Math.abs(x) > 10) {
            lum *= 0.62; // eye socket shadow
          } else if (y > -72 && y < -42 && Math.abs(x) < 7) {
            lum = Math.min(1, lum * 1.35); // nose ridge
          } else if (y > -32 && y < -20 && Math.abs(x) < 15) {
            lum *= 0.72; // mouth contour
          }
        }
      }

      // 2. Neck
      if (!inside && y >= 15 && y <= 60) {
        const neckW = 22 + (y - 15) * 0.22;
        if (Math.abs(x) <= neckW) {
          inside = true;
          const nx = x / neckW;
          const nz = Math.sqrt(Math.max(0, 1 - nx * nx));
          lum = Math.max(0.25, nx * 0.3 + nz * 0.7);
        }
      }

      // 3. Shoulders & Torso
      if (!inside && y > 45 && y <= 150) {
        const progress = (y - 45) / 105;
        const shoulderW = 28 + Math.sin(progress * Math.PI * 0.72) * 105;
        if (Math.abs(x) <= shoulderW) {
          inside = true;
          const nx = x / shoulderW;
          const nz = Math.sqrt(Math.max(0, 1 - nx * nx));
          lum = Math.max(0.2, nx * 0.25 - (y / 150) * 0.28 + nz * 0.75);
          if (Math.abs(Math.abs(x) - (y - 40) * 0.58) < 4 && y < 95) {
            lum = Math.min(1, lum * 1.3); // collarbone highlight
          }
        }
      }

      if (inside && lum > 0.18) {
        const jitterX = (Math.random() - 0.5) * 1.0;
        const jitterY = (Math.random() - 0.5) * 1.0;
        points.push({
          x: x + jitterX,
          y: y + jitterY,
          brightness: lum,
        });
      }
    }
  }
  return points;
}

export function HeroAnimation() {
  const [phase, setPhase] = useState<Phase>("lever");
  const [displayText, setDisplayText] = useState<string>(INITIAL_NAME);
  const [activeGlyphIndices, setActiveGlyphIndices] = useState<Set<number>>(new Set());

  const sectionRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const animationFrameRef = useRef<number | null>(null);
  const timersRef = useRef<NodeJS.Timeout[]>([]);
  const phaseRef = useRef<Phase>("lever");
  phaseRef.current = phase;

  // -------------------------------------------------------------
  // 1. REFINED AUTOPLAY SEQUENCE
  // 0.0s – 1.0s: Lever drops & tilts
  // 1.0s – 3.2s: Letters tumble out into "AVI TANDON" & hold dead-center
  // 3.2s – 4.0s: Rapid matrix scramble morph into "PORTFOLIO" (dead-center)
  // 4.0s+: "settled" -> "PORTFOLIO" smoothly slides down to bottom
  // -------------------------------------------------------------
  useEffect(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];

    setPhase("lever");
    setDisplayText(INITIAL_NAME);
    setActiveGlyphIndices(new Set());

    // 1.0s: Letters tumble out into "AVI TANDON" (holds steady dead-center until 3.2s)
    const t1 = setTimeout(() => {
      setPhase("spill");
    }, 1000);

    // 3.2s: Matrix scramble morph triggers across 35ms ticks
    const t2 = setTimeout(() => {
      setPhase("morph");
    }, 3200);

    // 4.0s: Scramble completes, settled state begins (bottom slide initiates)
    const t3 = setTimeout(() => {
      setPhase("settled");
      setDisplayText(TARGET_HEADLINE);
      setActiveGlyphIndices(new Set());
    }, 4000);

    timersRef.current.push(t1, t2, t3);

    return () => {
      timersRef.current.forEach(clearTimeout);
    };
  }, []);

  // -------------------------------------------------------------
  // 2. MATRIX GLYPH SCRAMBLER MORPH (3.2s – 4.0s, 35ms interval)
  // -------------------------------------------------------------
  useEffect(() => {
    if (phase !== "morph") return;

    const startTime = Date.now();
    const duration = 800; // 3.2s to 4.0s is 800ms
    const targetLen = TARGET_HEADLINE.length; // 9

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const lockThreshold = Math.floor(progress * (targetLen + 1));
      const activeIndices = new Set<number>();

      let result = "";
      for (let i = 0; i < targetLen; i++) {
        if (i < lockThreshold) {
          result += TARGET_HEADLINE[i];
        } else {
          result += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
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
  // 3. CANVAS ENGINE: 3D HALFTONE PARTICLE PORTRAIT ASSEMBLY
  // (Dead-center on both axes, upscaled to fill 55%-65% of viewport)
  // -------------------------------------------------------------
  useEffect(() => {
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

      // Upscaled dimensions filling 55% to 65% of the viewport
      const targetHeight = Math.min(height * 0.62, width * 0.72);
      const scale = targetHeight / 310;
      const offsetX = width / 2;
      const offsetY = height / 2 - 25;

      const particles = particlesRef.current;
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.targetX = offsetX + p.origPtX * scale;
        p.targetY = offsetY + p.origPtY * scale;
      }
    };
    window.addEventListener("resize", handleResize);

    const img = new Image();
    img.src = "/profile.png";

    const initParticles = (pts: { x: number; y: number; brightness: number }[]) => {
      const targetHeight = Math.min(height * 0.62, width * 0.72);
      const scale = targetHeight / 310;
      const offsetX = width / 2;
      const offsetY = height / 2 - 25;

      const particles: Particle[] = [];

      for (let i = 0; i < pts.length; i++) {
        const pt = pts[i];
        const spawnX = Math.random() * width;
        const spawnY = Math.random() * height;

        particles.push({
          x: spawnX,
          y: spawnY,
          vx: (Math.random() - 0.5) * 0.35,
          vy: (Math.random() - 0.5) * 0.35,
          origPtX: pt.x,
          origPtY: pt.y,
          targetX: offsetX + pt.x * scale,
          targetY: offsetY + pt.y * scale,
          brightness: pt.brightness,
          size: (0.95 + pt.brightness * 1.7) * Math.min(scale, 1.35),
          alpha: 0.08,
          targetAlpha: 0.25 + pt.brightness * 0.65,
        });
      }
      particlesRef.current = particles;
    };

    img.onload = () => {
      try {
        const offCanvas = document.createElement("canvas");
        const offCtx = offCanvas.getContext("2d");
        if (!offCtx) {
          initParticles(generateProceduralBust());
          return;
        }
        const sampleSize = 240;
        offCanvas.width = sampleSize;
        offCanvas.height = sampleSize;
        offCtx.drawImage(img, 0, 0, sampleSize, sampleSize);
        const imgData = offCtx.getImageData(0, 0, sampleSize, sampleSize);
        const data = imgData.data;
        const sampled: { x: number; y: number; brightness: number }[] = [];
        const step = 2; // High-density sampling every 2 pixels

        for (let py = 0; py < sampleSize; py += step) {
          for (let px = 0; px < sampleSize; px += step) {
            const idx = (py * sampleSize + px) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const a = data[idx + 3];
            if (a > 60) {
              const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
              if (lum > 0.18) {
                sampled.push({
                  x: (px - sampleSize / 2) * 1.25,
                  y: (py - sampleSize / 2) * 1.25,
                  brightness: lum,
                });
              }
            }
          }
        }

        if (sampled.length > 500) {
          initParticles(sampled);
        } else {
          initParticles(generateProceduralBust());
        }
      } catch {
        initParticles(generateProceduralBust());
      }
    };

    img.onerror = () => {
      initParticles(generateProceduralBust());
    };

    // Render loop with IntersectionObserver to eliminate background CPU/GPU lag
    let isVisible = true;
    let isRunning = false;

    const render = () => {
      if (!isVisible) {
        isRunning = false;
        return;
      }
      ctx.clearRect(0, 0, width, height);

      const currentPhase = phaseRef.current;
      const isSettled = currentPhase === "settled";
      const particles = particlesRef.current;
      const pLen = particles.length;

      for (let i = 0; i < pLen; i++) {
        const p = particles[i];

        if (isSettled) {
          // Sharp halftone face assembly: smooth lerp into upscaled target coordinates
          p.x += (p.targetX - p.x) * 0.045;
          p.y += (p.targetY - p.y) * 0.045;
          p.alpha += (p.targetAlpha - p.alpha) * 0.045;
        } else {
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }

        ctx.fillStyle = `rgba(255, 255, 255, ${p.alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameRef.current = requestAnimationFrame(render);
    };

    const startLoop = () => {
      if (!isRunning && isVisible) {
        isRunning = true;
        animationFrameRef.current = requestAnimationFrame(render);
      }
    };

    const stopLoop = () => {
      isRunning = false;
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
        animationFrameRef.current = null;
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.02 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    startLoop();

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      stopLoop();
    };
  }, []);

  return (
    <section
      id="hero"
      ref={sectionRef}
      style={{ transform: "translateZ(0)", willChange: "transform" }}
      className="relative min-h-screen w-full flex flex-col justify-between items-center overflow-hidden bg-black text-white select-none"
    >
      {/* 3D Halftone Particle Point-Cloud Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-10"
      />

      {/* ------------------------------------------------------------- */}
      {/* MINIMAL TOP NAV (Fades in at 4.0s+ in Settled Phase) */}
      {/* ------------------------------------------------------------- */}
      <div className="w-full fixed top-0 left-0 right-0 z-20 px-6 sm:px-12 md:px-16 py-6 sm:py-8 pointer-events-none">
        <AnimatePresence>
          {phase === "settled" && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE_CUSTOM }}
              className="flex items-center justify-between w-full pointer-events-auto"
            >
              {/* Left Identity */}
              <a
                href="#hero"
                className="text-xs sm:text-sm font-bold tracking-widest text-white hover:opacity-80 transition-opacity"
              >
                AVI TANDON
              </a>

              {/* Right Minimal Menu */}
              <nav className="flex items-center gap-4 sm:gap-8 text-[11px] sm:text-xs tracking-widest text-zinc-400">
                <a href="#hero" className="hover:text-white transition-colors">
                  HOME
                </a>
                <a
                  href="#featured-architecture"
                  className="hover:text-white transition-colors"
                >
                  ABOUT
                </a>
                <a href="#services" className="hover:text-white transition-colors">
                  SERVICES
                </a>
                <a href="#process" className="hover:text-white transition-colors">
                  PROJECTS
                </a>
                <a href="#intake" className="hover:text-white transition-colors">
                  CONTACT
                </a>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* CENTERPIECE HERO STAGE: 0.0s – 4.0s+ */}
      {/* Smoothly glides down from center (y: 0) to bottom (calc(40vh - 3.5rem)) */}
      {/* ------------------------------------------------------------- */}
      <motion.div
        animate={{ y: phase === "settled" ? "calc(40vh - 3.5rem)" : 0 }}
        transition={{ duration: 0.9, ease: EASE_CUSTOM }}
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center my-auto relative z-30 flex flex-col items-center justify-center overflow-visible"
      >
        {/* PHASE 1: LEVER DROP & TILT (0.0s – 1.0s) */}
        {phase === "lever" && (
          <div className="relative h-32 sm:h-44 flex flex-col items-center justify-center">
            {/* Vertical metallic bar drops from above, then tilts right like a lever */}
            <motion.div
              initial={{ y: -90, opacity: 0, rotateZ: 0 }}
              animate={{
                y: [-90, -14, -14],
                opacity: [0, 1, 1],
                rotateZ: [0, 0, 65],
              }}
              transition={{
                duration: 0.8,
                times: [0, 0.45, 1],
                ease: EASE_CUSTOM,
              }}
              style={{ transformOrigin: "bottom center" }}
              className="w-2.5 sm:w-3 h-14 sm:h-18 rounded-full bg-gradient-to-b from-white via-neutral-300 to-neutral-500 shadow-[0_0_25px_rgba(255,255,255,0.4)] border border-white/30"
            />
            {/* Center dot forming exclamation mark base with bounce */}
            <motion.div
              initial={{ y: -60, scale: 0.6, opacity: 0 }}
              animate={{ y: [-60, 0, -15, 0], scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, times: [0, 0.5, 0.75, 1], ease: EASE_CUSTOM }}
              className="w-3.5 h-3.5 bg-white rounded-full shadow-[0_0_20px_white,0_0_35px_rgba(255,255,255,0.8)] mt-2"
            />
          </div>
        )}

        {/* PHASE 2: KINETIC LETTER SPILL & HOLD: "AVI TANDON" (1.0s – 3.2s) */}
        {phase === "spill" && (
          <div className="w-full flex items-center justify-center text-center overflow-visible">
            <div className="flex items-center justify-center gap-1 sm:gap-2 flex-nowrap overflow-visible">
              {INITIAL_NAME.split("").map((char, idx) => (
                <motion.span
                  key={idx}
                  initial={{
                    opacity: 0,
                    y: -30,
                    scale: 0.5,
                    rotateZ: idx % 2 === 0 ? -25 : 25,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    rotateZ: 0,
                  }}
                  transition={{
                    duration: 0.35,
                    delay: idx * 0.035,
                    ease: EASE_CUSTOM,
                  }}
                  className={`text-[8.5vw] sm:text-[7.5vw] md:text-[6.5vw] lg:text-[6vw] font-black tracking-tight whitespace-nowrap leading-none select-none ${
                    char === " " ? "w-3 sm:w-6" : "heading-metallic drop-shadow-[0_15px_40px_rgba(255,255,255,0.18)]"
                  }`}
                >
                  {char}
                </motion.span>
              ))}
            </div>
          </div>
        )}

        {/* PHASE 3: MATRIX GLYPH TEXT MORPH (3.2s – 4.0s, 35ms ticks) */}
        {phase === "morph" && (
          <div className="w-full flex items-center justify-center text-center overflow-visible">
            <div className="flex items-center justify-center gap-0.5 sm:gap-1.5 flex-nowrap overflow-visible">
              {displayText.split("").map((char, idx) => {
                const isActive = activeGlyphIndices.has(idx);
                return (
                  <span
                    key={idx}
                    className={`text-[8.5vw] sm:text-[7.5vw] md:text-[6.5vw] lg:text-[6vw] font-black tracking-tight whitespace-nowrap leading-none transition-colors select-none ${
                      isActive ? "text-cyan-400 drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]" : "heading-metallic"
                    }`}
                  >
                    {char}
                  </span>
                );
              })}
            </div>
          </div>
        )}

        {/* PHASE 4: SETTLED (4.0s+) — "PORTFOLIO" positioned cleanly at bottom with zero cutoff */}
        {phase === "settled" && (
          <motion.div
            initial={{ opacity: 0.85 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease: EASE_CUSTOM }}
            className="w-full flex items-center justify-center text-center overflow-visible"
          >
            <h1 className="text-[8.5vw] sm:text-[7.5vw] md:text-[6.5vw] lg:text-[6vw] font-black tracking-tight whitespace-nowrap px-4 leading-none heading-metallic drop-shadow-[0_15px_40px_rgba(255,255,255,0.14)] select-none">
              PORTFOLIO
            </h1>
          </motion.div>
        )}
      </motion.div>

      {/* Empty bottom spacer */}
      <div className="h-6 sm:h-10" />
    </section>
  );
}
