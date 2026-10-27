"use client";

import React from "react";

export interface LiquidMetalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function LiquidMetalButton({
  label,
  icon,
  className = "",
  children,
  type = "button",
  ...rest
}: LiquidMetalButtonProps) {
  return (
    <button
      type={type}
      className={`relative inline-flex items-center justify-center p-[2px] rounded-full overflow-hidden group cursor-pointer active:scale-[0.97] transition-transform duration-200 select-none w-auto ${className}`}
      {...rest}
    >
      {/* Primary Flowing Liquid Metal Layer */}
      <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,#ffd700_60deg,#ffffff_120deg,#ffd700_180deg,transparent_240deg,#ffffff_300deg,transparent_360deg)] animate-[spin_4s_linear_infinite] pointer-events-none" />

      {/* Secondary Blur Bloom Layer for Chromatic Glow */}
      <div className="absolute inset-[-100%] bg-[conic-gradient(from_0deg_at_50%_50%,transparent_0deg,#ffd700_60deg,#ffffff_120deg,#ffd700_180deg,transparent_240deg,#ffffff_300deg,transparent_360deg)] animate-[spin_4s_linear_infinite] opacity-70 blur-[3px] pointer-events-none" />

      {/* Inner Button Body */}
      <div className="relative z-10 w-full h-full bg-[#000000] rounded-full px-6 py-2.5 flex items-center justify-center transition-colors duration-200 group-hover:bg-[#08080A]">
        {icon && (
          <span className="shrink-0 mr-2 flex items-center text-current">
            {icon}
          </span>
        )}
        {label && (
          <span className="text-white font-medium text-xs sm:text-sm tracking-wide text-center whitespace-nowrap drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]">
            {label}
          </span>
        )}
        {children}
      </div>
    </button>
  );
}

export default LiquidMetalButton;
