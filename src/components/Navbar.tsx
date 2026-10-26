"use client";

import React, { useState, useEffect } from "react";
import { ArrowUpRight, Menu, X, Cpu } from "lucide-react";
import MetallicButton from "@/components/ui/metallic-button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Featured Architecture", href: "#featured-architecture" },
    { name: "What I Build", href: "#services" },
    { name: "2-Week Process", href: "#process" },
    { name: "Project Intake", href: "#intake" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "opacity-100 pointer-events-auto bg-black/90 backdrop-blur-md border-b border-white/10 shadow-2xl py-3.5 translate-y-0"
          : "opacity-0 pointer-events-none -translate-y-4 py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Brand Logo / Identity */}
          <a
            href="#hero"
            className="flex items-center gap-3 group focus:outline-none"
          >
            <div className="w-9 h-9 rounded-lg bg-zinc-950 border border-white/15 flex items-center justify-center text-zinc-100 text-sm font-bold shadow-inner group-hover:border-emerald-500/50 group-hover:text-emerald-400 transition-colors">
              <Cpu className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-tight text-white flex items-center gap-1.5">
                AVI TANDON
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </span>
              <span className="text-[11px] text-zinc-400 hidden sm:inline-block">
                Full-Stack &amp; Systems MVP Developer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 rounded-full bg-zinc-950/80 border border-white/10 px-3 py-1.5 backdrop-blur-md shadow-inner">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-xs font-medium text-zinc-400 hover:text-white rounded-full hover:bg-white/5 transition-all duration-150"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Status & Metallic CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>Available for MVP Sprints</span>
            </div>

            <a href="#intake">
              <MetallicButton
                label="Start a Sprint"
                icon={<ArrowUpRight className="w-3.5 h-3.5 text-zinc-200" />}
              />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <a href="#intake">
              <MetallicButton
                label="Start"
                className="min-w-0 px-4 h-9 text-xs"
              />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-400 hover:text-white bg-zinc-900 border border-white/10 rounded-lg"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 pb-4 border-t border-white/10 bg-black/95 rounded-2xl p-4 space-y-2">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>Available for 2-Week MVP Delivery</span>
            </div>
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-zinc-900 rounded-lg"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2">
              <a
                href="#intake"
                onClick={() => setMobileMenuOpen(false)}
                className="block w-full"
              >
                <MetallicButton
                  label="Start a Sprint"
                  icon={<ArrowUpRight className="w-4 h-4" />}
                  className="w-full"
                />
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
