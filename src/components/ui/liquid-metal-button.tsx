"use client";

import React, { useState, useEffect } from "react";
import { LiquidMetal } from "@paper-design/shaders-react";

export interface LiquidMetalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
  variant?: "gold" | "chrome" | "custom";
  colorBack?: string;
  colorTint?: string;
  borderWidth?: number;
  speed?: number;
  repetition?: number;
  distortion?: number;
  softness?: number;
  shiftRed?: number;
  shiftBlue?: number;
  angle?: number;
}

export function LiquidMetalButton({
  label,
  icon,
  className = "",
  children,
  variant = "chrome",
  colorBack,
  colorTint,
  borderWidth = 3,
  speed = 0.8,
  repetition = 3.5,
  distortion = 0.12,
  softness = 0.1,
  shiftRed = 0.25,
  shiftBlue = 0.25,
  angle = 60,
  type = "button",
  ...rest
}: LiquidMetalButtonProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Determine shader colors based on variant or custom overrides
  let resolvedColorBack = colorBack;
  let resolvedColorTint = colorTint;

  if (!resolvedColorBack || !resolvedColorTint) {
    if (variant === "gold") {
      resolvedColorBack = colorBack || "#705018";
      resolvedColorTint = colorTint || "#ffd700";
    } else {
      // Default to luxury chrome
      resolvedColorBack = colorBack || "#262629";
      resolvedColorTint = colorTint || "#ffffff";
    }
  }

  return (
    <button
      type={type}
      style={{ padding: `${borderWidth}px` }}
      className={`relative inline-flex items-center justify-center rounded-full transition-all duration-300 group cursor-pointer active:scale-[0.98] select-none shadow-[0_4px_25px_rgba(0,0,0,0.8)] overflow-hidden w-auto ${className}`}
      {...rest}
    >
      {/* Background Liquid Metal Continuous Flowing Shimmer */}
      <div className="absolute inset-0 w-full h-full pointer-events-none rounded-full overflow-hidden">
        {mounted ? (
          <LiquidMetal
            colorBack={resolvedColorBack}
            colorTint={resolvedColorTint}
            speed={speed}
            repetition={repetition}
            distortion={distortion}
            softness={softness}
            shiftRed={shiftRed}
            shiftBlue={shiftBlue}
            angle={angle}
            shape="none"
            fit="cover"
            style={{
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-r from-zinc-700 via-zinc-400 to-zinc-700 animate-pulse rounded-full" />
        )}
      </div>

      {/* Inner Core Container */}
      <div className="relative z-10 w-full h-full rounded-full bg-black/90 backdrop-blur-xl px-5 sm:px-6 py-2 sm:py-2.5 flex items-center justify-center gap-2 border border-white/10 group-hover:bg-black/75 transition-colors">
        {/* Left Inset Icon */}
        {icon && (
          <span className="shrink-0 flex items-center text-zinc-200 group-hover:text-white transition-colors">
            {icon}
          </span>
        )}

        {/* Dynamic Label */}
        {label && (
          <span className="font-semibold text-xs sm:text-sm tracking-wide text-white whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {label}
          </span>
        )}

        {children}
      </div>
    </button>
  );
}

export { LiquidMetal };
export default LiquidMetalButton;
