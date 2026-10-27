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
      className={`relative group inline-flex items-center justify-center p-[1.5px] rounded-full overflow-hidden bg-transparent border-0 outline-none cursor-pointer select-none active:scale-[0.98] transition-transform duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
      {...props}
    >
      {/* 1. Base Hairline Frosted Border */}
      <span className="absolute inset-0 rounded-full border border-white/15 pointer-events-none" />

      {/* 2. Perimeter Shimmer Beam (Pure Monochrome White/Silver, travels at constant linear speed) */}
      <span
        className="pointer-events-none absolute inset-0 rounded-full [border:1.5px_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]"
      >
        <span
          className="absolute aspect-square w-28 sm:w-36 animate-[border-beam_8s_linear_infinite] [background:radial-gradient(ellipse_at_center,#ffffff,rgba(255,255,255,0.75)_35%,rgba(255,255,255,0.15)_60%,transparent_75%)] [offset-anchor:50%_50%] [offset-path:rect(0_auto_auto_0_round_9999px)]"
        />
      </span>

      {/* 3. Subtle Ambient Light Bloom */}
      <span
        className="pointer-events-none absolute inset-0 rounded-full opacity-40 blur-[2px] [border:1px_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]"
      >
        <span
          className="absolute aspect-square w-24 sm:w-32 animate-[border-beam_8s_linear_infinite] [background:radial-gradient(circle,#ffffff,transparent_70%)] [offset-anchor:50%_50%] [offset-path:rect(0_auto_auto_0_round_9999px)]"
        />
      </span>

      {/* 4. Pure Black Inner Button Body with Specular Sheen */}
      <span
        className={`relative z-10 w-full h-full rounded-full bg-[#000000] group-hover:bg-[#070709] transition-colors duration-200 flex items-center justify-center gap-2 text-white font-medium tracking-wide whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.9)] ${sizeStyles[size]}`}
      >
        {icon && <span className="text-white/80 flex items-center justify-center shrink-0">{icon}</span>}
        <span>{content}</span>
      </span>
    </button>
  );
}

export default LiquidMetalButton;
