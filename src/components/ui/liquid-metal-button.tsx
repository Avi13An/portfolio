"use client";

import React from "react";

export interface LiquidMetalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode;
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function LiquidMetalButton({
  children,
  label,
  icon,
  className = "",
  size = "md",
  disabled,
  ...props
}: LiquidMetalButtonProps) {
  const sizeStyles = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-2.5 text-xs sm:text-sm",
    lg: "px-8 py-3.5 text-sm sm:text-base",
  };

  const content = children ?? label;

  return (
    <button
      disabled={disabled}
      className={`relative group inline-flex items-center justify-center p-[2px] rounded-full overflow-hidden bg-transparent border-0 outline-none cursor-pointer select-none transition-all duration-150 active:translate-y-[2px] active:scale-[0.985] active:shadow-[inset_0_2px_4px_rgba(0,0,0,0.95),0_2px_4px_rgba(0,0,0,0.6)] disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {/* 1. Outer 3D Chassis Drop-Shadow & Rim */}
      <span className="absolute inset-0 rounded-full border border-white/10 shadow-[0_8px_20px_-4px_rgba(0,0,0,0.9),0_3px_6px_rgba(0,0,0,0.7)] pointer-events-none" />

      {/* 2. Perimeter Shimmer Beam (Constant Linear 8s Glide) */}
      <span className="pointer-events-none absolute inset-0 rounded-full [border:2px_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]">
        <span className="absolute aspect-square w-28 sm:w-36 animate-[border-beam_8s_linear_infinite] [background:radial-gradient(ellipse_at_center,#ffffff,rgba(255,255,255,0.75)_35%,rgba(255,255,255,0.15)_60%,transparent_75%)] [offset-anchor:50%_50%] [offset-path:rect(0_auto_auto_0_round_9999px)]" />
      </span>

      {/* 3. Ambient Silver Bloom */}
      <span className="pointer-events-none absolute inset-0 rounded-full opacity-35 blur-[2px] [border:1px_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]">
        <span className="absolute aspect-square w-24 sm:w-32 animate-[border-beam_8s_linear_infinite] [background:radial-gradient(circle,#ffffff,transparent_70%)] [offset-anchor:50%_50%] [offset-path:rect(0_auto_auto_0_round_9999px)]" />
      </span>

      {/* 4. Sculpted 3D Keycap Core with Inset Chamfer Lighting */}
      <span
        className={`relative z-10 w-full h-full rounded-full bg-gradient-to-b from-[#1b1b20] via-[#0e0e11] to-[#040405] border-t border-white/25 border-b border-black/90 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.5),inset_0_-2px_4px_0_rgba(0,0,0,0.95)] group-hover:from-[#222228] group-hover:via-[#121216] group-hover:to-[#060608] transition-colors duration-200 flex items-center justify-center gap-2 text-white font-medium tracking-wide whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] ${sizeStyles[size]}`}
      >
        {icon && <span className="text-white/80 flex items-center justify-center shrink-0">{icon}</span>}
        <span>{content}</span>
      </span>
    </button>
  );
}

export default LiquidMetalButton;
