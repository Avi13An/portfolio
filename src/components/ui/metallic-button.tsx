"use client";

import React, { useRef, useEffect, useCallback } from "react";

export interface MetallicButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: React.ReactNode;
  viewMode?: "text" | "icon";
  baseColor?: string;
  sheenColor?: string;
  bandCount?: number;
  edgeBlur?: number;
  flowAngle?: number;
  zoom?: number;
  warp?: number;
  redFringe?: number;
  blueFringe?: number;
  idleSpeed?: number;
  hoverSpeed?: number;
  clickSpeed?: number;
  className?: string;
  children?: React.ReactNode;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function hexToRgb(hex: string): [number, number, number] {
  let c = hex.trim().replace(/^#/, "");
  if (c.length === 3) {
    c = c
      .split("")
      .map((ch) => ch + ch)
      .join("");
  }
  const num = parseInt(c || "000000", 16);
  return [
    ((num >> 16) & 255) / 255,
    ((num >> 8) & 255) / 255,
    (num & 255) / 255,
  ];
}

// ---------------------------------------------------------------------------
// GLSL Shaders
// ---------------------------------------------------------------------------
const VERTEX_SHADER = `#version 300 es
in vec2 a_position;
out vec2 v_uv;

void main() {
  v_uv = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

in vec2 v_uv;
out vec4 fragColor;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec3 u_base_color;
uniform vec3 u_sheen_color;
uniform float u_band_count;
uniform float u_edge_blur;
uniform float u_flow_angle;
uniform float u_zoom;
uniform float u_warp;
uniform float u_red_fringe;
uniform float u_blue_fringe;
uniform vec2 u_ripple_pos;
uniform float u_ripple_time;

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);

  // Directional flow vector
  float rad = radians(u_flow_angle);
  vec2 dir = vec2(cos(rad), sin(rad));

  // Dynamic click ripple physics
  float distToRipple = length(gl_FragCoord.xy - u_ripple_pos);
  float ripple = 0.0;
  if (u_ripple_time > 0.0) {
    float waveDist = u_ripple_time * 420.0;
    float diff = distToRipple - waveDist;
    float decay = exp(-u_ripple_time * 2.8) * exp(-diff * diff * 0.0035);
    ripple = sin(diff * 0.09) * decay * 0.38;
  }

  // Linear projection coordinate with ripple dispersion
  float coord = dot(uv, dir) * u_zoom + u_time * 0.55 + ripple;

  // Warp wave distortion
  if (u_warp > 0.0) {
    coord += sin(dot(uv, vec2(-dir.y, dir.x)) * 5.0) * u_warp * 0.45;
  }

  // Chromatic dispersion bands
  float baseBand = sin(coord * u_band_count);
  float redBand = sin((coord + u_red_fringe * 0.12) * u_band_count);
  float blueBand = sin((coord - u_blue_fringe * 0.12) * u_band_count);

  // Smooth edge blur transitions
  float smoothVal = mix(0.12, 0.85, clamp(u_edge_blur, 0.0, 1.0));
  float r = smoothstep(-smoothVal, smoothVal, redBand);
  float g = smoothstep(-smoothVal, smoothVal, baseBand);
  float b = smoothstep(-smoothVal, smoothVal, blueBand);

  // Optical Fresnel rim reflections
  vec2 centerDist = (v_uv - 0.5) * 2.0;
  float fresnel = pow(clamp(length(centerDist), 0.0, 1.0), 2.2) * 0.65;

  // Specular highlight crest
  float specular = pow(max(0.0, g), 3.2) * 0.55;

  vec3 metalCol = mix(u_base_color, u_sheen_color, vec3(r, g, b));
  metalCol += fresnel * u_sheen_color * 0.75;
  metalCol += specular * vec3(1.0);

  fragColor = vec4(metalCol, 1.0);
}
`;

// ---------------------------------------------------------------------------
// WebGL2 Mount Component
// ---------------------------------------------------------------------------
interface MetallicShaderMountProps {
  baseColor: string;
  sheenColor: string;
  bandCount: number;
  edgeBlur: number;
  flowAngle: number;
  zoom: number;
  warp: number;
  redFringe: number;
  blueFringe: number;
  speedRef: React.MutableRefObject<number>;
  rippleRef: React.MutableRefObject<{ x: number; y: number; time: number }>;
}

function MetallicShaderMount({
  baseColor,
  sheenColor,
  bandCount,
  edgeBlur,
  flowAngle,
  zoom,
  warp,
  redFringe,
  blueFringe,
  speedRef,
  rippleRef,
}: MetallicShaderMountProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: false,
      antialias: true,
      powerPreference: "low-power",
    });
    if (!gl) return;

    // Compile helper
    const compileShader = (type: number, src: string) => {
      const s = gl.createShader(type);
      if (!s) return null;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        gl.deleteShader(s);
        return null;
      }
      return s;
    };

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);

    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      gl.deleteProgram(prog);
      return;
    }

    gl.useProgram(prog);

    // Fullscreen quad buffer
    const posLoc = gl.getAttribLocation(prog, "a_position");
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uRes = gl.getUniformLocation(prog, "u_resolution");
    const uTime = gl.getUniformLocation(prog, "u_time");
    const uBase = gl.getUniformLocation(prog, "u_base_color");
    const uSheen = gl.getUniformLocation(prog, "u_sheen_color");
    const uBands = gl.getUniformLocation(prog, "u_band_count");
    const uBlur = gl.getUniformLocation(prog, "u_edge_blur");
    const uAngle = gl.getUniformLocation(prog, "u_flow_angle");
    const uZoom = gl.getUniformLocation(prog, "u_zoom");
    const uWarp = gl.getUniformLocation(prog, "u_warp");
    const uRed = gl.getUniformLocation(prog, "u_red_fringe");
    const uBlue = gl.getUniformLocation(prog, "u_blue_fringe");
    const uRipPos = gl.getUniformLocation(prog, "u_ripple_pos");
    const uRipTime = gl.getUniformLocation(prog, "u_ripple_time");

    // Static uniform uploads
    const [br, bg, bb] = hexToRgb(baseColor);
    const [sr, sg, sb] = hexToRgb(sheenColor);
    gl.uniform3f(uBase, br, bg, bb);
    gl.uniform3f(uSheen, sr, sg, sb);
    gl.uniform1f(uBands, bandCount);
    gl.uniform1f(uBlur, edgeBlur);
    gl.uniform1f(uAngle, flowAngle);
    gl.uniform1f(uZoom, zoom);
    gl.uniform1f(uWarp, warp);
    gl.uniform1f(uRed, redFringe);
    gl.uniform1f(uBlue, blueFringe);

    let animId: number | null = null;
    let isVisible = true;
    let simTime = Math.random() * 100;
    let lastT = performance.now();

    // ResizeObserver for fluid dynamic dimensions
    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = Math.round(rect.width * dpr);
      const h = Math.round(rect.height * dpr);
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = Math.max(1, w);
        canvas.height = Math.max(1, h);
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    // Animation Loop
    const loop = (now: number) => {
      if (!isVisible) {
        animId = null;
        return;
      }
      const dt = Math.min((now - lastT) * 0.001, 0.1);
      lastT = now;

      simTime += dt * speedRef.current;

      gl.useProgram(prog);
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, simTime);

      // Ripple updates
      const rip = rippleRef.current;
      if (rip.time >= 0) {
        rip.time += dt;
        gl.uniform2f(uRipPos, rip.x * (canvas.width / (canvas.clientWidth || 1)), canvas.height - rip.y * (canvas.height / (canvas.clientHeight || 1)));
        gl.uniform1f(uRipTime, rip.time);
        if (rip.time > 1.8) {
          rip.time = -1;
        }
      } else {
        gl.uniform1f(uRipTime, -1.0);
      }

      gl.drawArrays(gl.TRIANGLES, 0, 6);
      animId = requestAnimationFrame(loop);
    };

    // IntersectionObserver to pause loop when off-screen
    const intObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible && !animId) {
          lastT = performance.now();
          animId = requestAnimationFrame(loop);
        }
      },
      { threshold: 0.01 }
    );
    intObserver.observe(canvas);

    animId = requestAnimationFrame(loop);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      intObserver.disconnect();
      gl.deleteProgram(prog);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buf);
    };
  }, [
    baseColor,
    sheenColor,
    bandCount,
    edgeBlur,
    flowAngle,
    zoom,
    warp,
    redFringe,
    blueFringe,
    speedRef,
    rippleRef,
  ]);

  return <canvas ref={canvasRef} className="w-full h-full block" />;
}

// ---------------------------------------------------------------------------
// MetallicButton Component
// ---------------------------------------------------------------------------
export default function MetallicButton({
  label,
  icon,
  viewMode = "text",
  baseColor = "#060608",
  sheenColor = "#d4d4d8",
  bandCount = 4.5,
  edgeBlur = 0.5,
  flowAngle = 45,
  zoom = 7.5,
  warp = 0.25,
  redFringe = 0.2,
  blueFringe = 0.25,
  idleSpeed = 0.6,
  hoverSpeed = 1.3,
  clickSpeed = 2.6,
  className = "",
  children,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onMouseDown,
  type = "button",
  ...rest
}: MetallicButtonProps) {
  const buttonRef = useRef<HTMLButtonElement | null>(null);
  const speedRef = useRef<number>(idleSpeed);
  const rippleRef = useRef<{ x: number; y: number; time: number }>({
    x: 0,
    y: 0,
    time: -1,
  });

  const handleMouseEnter = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      speedRef.current = hoverSpeed;
      onMouseEnter?.(e);
    },
    [hoverSpeed, onMouseEnter]
  );

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      speedRef.current = idleSpeed;
      onMouseLeave?.(e);
    },
    [idleSpeed, onMouseLeave]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        rippleRef.current = {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
          time: 0.01,
        };
      }
      speedRef.current = clickSpeed;
      onMouseDown?.(e);
    },
    [clickSpeed, onMouseDown]
  );

  // DYNAMIC FLUID WIDTH: Auto-expands based on content length
  const shellClass =
    viewMode === "icon"
      ? "h-[46px] w-[46px] min-w-[46px] p-0 rounded-full"
      : "min-w-[140px] px-6 h-[46px] w-auto inline-flex items-center justify-center gap-2 rounded-full";

  return (
    <button
      ref={buttonRef}
      type={type}
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseDown={handleMouseDown}
      className={`relative group inline-flex items-center justify-center overflow-hidden transition-all duration-300 border border-white/20 hover:border-white/50 shadow-[0_0_20px_rgba(255,255,255,0.08)] hover:shadow-[0_0_30px_rgba(255,255,255,0.22)] active:scale-[0.98] ${shellClass} ${className}`}
      {...rest}
    >
      {/* WebGL2 Metallic Shader Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none rounded-full overflow-hidden">
        <MetallicShaderMount
          baseColor={baseColor}
          sheenColor={sheenColor}
          bandCount={bandCount}
          edgeBlur={edgeBlur}
          flowAngle={flowAngle}
          zoom={zoom}
          warp={warp}
          redFringe={redFringe}
          blueFringe={blueFringe}
          speedRef={speedRef}
          rippleRef={rippleRef}
        />
      </div>

      {/* Surface Rim Highlights */}
      <div className="absolute inset-0 rounded-full border border-white/20 pointer-events-none group-hover:border-white/40 transition-colors" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-transparent to-white/10 pointer-events-none" />

      {/* Foreground Content */}
      <span className="relative z-10 flex items-center justify-center gap-2 text-white font-medium text-xs sm:text-sm tracking-wide leading-none select-none drop-shadow-[0_1px_3px_rgba(0,0,0,0.9)]">
        {icon && <span className="shrink-0">{icon}</span>}
        {label && <span>{label}</span>}
        {children}
      </span>
    </button>
  );
}

export { MetallicButton };
