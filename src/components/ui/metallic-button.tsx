"use client";

import React from "react";

export interface MetallicButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: React.ReactNode;
  className?: string;
  children?: React.ReactNode;
}

export function MetallicButton({
  label,
  icon,
  className = "",
  children,
  type = "button",
  ...rest
}: MetallicButtonProps) {
  return (
    <button
      type={type}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-full transition-all duration-300 group cursor-pointer px-6 py-2.5 h-10 min-w-[130px] w-auto bg-gradient-to-b from-white/[0.14] to-white/[0.02] backdrop-blur-xl border border-white/20 group-hover:border-white/40 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.45),inset_0_-1px_1px_0_rgba(0,0,0,0.8),0_4px_20px_rgba(0,0,0,0.5)] active:scale-[0.97] ${className}`}
      {...rest}
    >
      {/* Specular Light Sheen Sweeper */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-full">
        <div className="absolute top-0 bottom-0 left-0 w-[60%] h-full bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-[25deg] -translate-x-[150%] group-hover:translate-x-[250%] transition-transform duration-700 ease-out pointer-events-none" />
      </div>

      {/* Button Content */}
      <span className="relative z-10 font-medium text-xs sm:text-sm tracking-wide text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)] whitespace-nowrap flex items-center gap-2">
        {icon && <span className="shrink-0 flex items-center">{icon}</span>}
        {label && <span>{label}</span>}
        {children}
      </span>
    </button>
  );
}

export default MetallicButton;
