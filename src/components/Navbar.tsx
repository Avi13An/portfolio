"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const EASE_CUSTOM: [number, number, number, number] = [0.16, 1, 0.3, 1];

const TABS = [
  { id: "hero", label: "HOME" },
  { id: "about", label: "ABOUT" },
  { id: "services", label: "SERVICES" },
  { id: "projects", label: "PROJECTS" },
  { id: "contact", label: "CONTACT" },
];

export function Navbar() {
  const [activeTab, setActiveTab] = useState<string>("hero");

  // Smooth scroll click handler
  const handleTabClick = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Active section observer on scroll
  useEffect(() => {
    const handleScroll = () => {
      // Pin to contact if at the very bottom
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 60
      ) {
        setActiveTab("contact");
        return;
      }

      // Pin to hero if at the very top
      if (window.scrollY < 120) {
        setActiveTab("hero");
        return;
      }

      const sections = [
        { id: "hero", offset: document.getElementById("hero")?.offsetTop ?? 0 },
        { id: "projects", offset: document.getElementById("projects")?.offsetTop ?? 0 },
        { id: "services", offset: document.getElementById("services")?.offsetTop ?? 0 },
        { id: "about", offset: document.getElementById("about")?.offsetTop ?? 0 },
        { id: "contact", offset: document.getElementById("contact")?.offsetTop ?? 0 },
      ].sort((a, b) => a.offset - b.offset);

      const scrollPosition = window.scrollY + 280;

      let current = sections[0].id;
      for (const s of sections) {
        if (scrollPosition >= s.offset) {
          current = s.id;
        }
      }
      setActiveTab(current);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center"
      aria-label="Main Navigation"
    >
      <div className="p-1 sm:p-1.5 rounded-full bg-black/80 backdrop-blur-xl border border-white/[0.12] shadow-[0_8px_32px_rgba(0,0,0,0.8)] flex items-center max-w-[95vw] sm:max-w-fit overflow-x-auto no-scrollbar gap-0.5 sm:gap-1">
        {TABS.map((tab) => {
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.id)}
              className="relative px-3.5 sm:px-5 py-1.5 sm:py-2 text-[11px] sm:text-xs font-semibold tracking-wider transition-colors rounded-full cursor-pointer flex items-center justify-center whitespace-nowrap focus:outline-none"
              role="tab"
              aria-selected={isActive}
            >
              {/* Continuous Sliding Pill via Framer Motion layoutId */}
              {isActive && (
                <motion.div
                  layoutId="activeNavTab"
                  className="absolute inset-0 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,0.3)] z-0"
                  transition={{ type: "spring", stiffness: 450, damping: 35 }}
                />
              )}

              {/* Tab Text */}
              <span
                className={`relative z-10 select-none transition-colors ${
                  isActive
                    ? "text-black font-bold"
                    : "text-zinc-400 hover:text-white"
                }`}
              >
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

export default Navbar;
