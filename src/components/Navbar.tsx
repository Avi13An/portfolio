"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

const TABS = [
  { id: "intro", label: "INTRO" },
  { id: "proof-of-work", label: "PROOF OF WORK" },
  { id: "services", label: "SERVICES" },
  { id: "timeline", label: "TIMELINE" },
  { id: "contact", label: "CONTACT" },
];

export function Navbar() {
  const [activeTab, setActiveTab] = useState("intro");
  const isScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Handle Smooth Scroll on Tab Click
  const handleTabClick = (id: string) => {
    isScrollingRef.current = true;
    setActiveTab(id);

    const element = document.getElementById(id);
    if (element) {
      const yOffset = -70; // Header offset
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }

    if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    // Lock scroll-spy until smooth scroll finishes
    scrollTimeoutRef.current = setTimeout(() => {
      isScrollingRef.current = false;
    }, 900);
  };

  // Scroll-Spy Position Calculation
  useEffect(() => {
    const handleScroll = () => {
      if (isScrollingRef.current) return;

      const scrollY = window.scrollY;
      const viewportHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // If scrolled to bottom, lock to contact
      if (scrollY + viewportHeight >= documentHeight - 60) {
        setActiveTab("contact");
        return;
      }

      const offset = 220; // Trigger threshold
      const currentPos = scrollY + offset;

      for (let i = TABS.length - 1; i >= 0; i--) {
        const section = document.getElementById(TABS[i].id);
        if (section) {
          const top = section.offsetTop;
          if (currentPos >= top) {
            setActiveTab(TABS[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center">
      <nav className="p-1 rounded-full bg-black/85 backdrop-blur-2xl border border-white/[0.12] shadow-[0_12px_40px_rgba(0,0,0,0.9)] flex items-center max-w-[95vw] sm:max-w-fit overflow-x-auto no-scrollbar gap-0.5 sm:gap-1">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`relative px-3 sm:px-4 md:px-5 py-2 text-xs sm:text-[13px] tracking-wider uppercase font-medium rounded-full cursor-pointer transition-colors duration-200 select-none whitespace-nowrap focus:outline-none ${
                isActive ? "text-black font-semibold" : "text-zinc-400 hover:text-white"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeTabPill"
                  className="absolute inset-0 bg-white rounded-full shadow-[0_2px_15px_rgba(255,255,255,0.4)]"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          );
        })}
      </nav>
    </header>
  );
}

export default Navbar;
