"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useLeadModal } from "@/components/ui/LeadModal";

const navLinks = [
  { label: "About", href: "#about" },
  { label: "Market Pulse", href: "#market-pulse" },
  { label: "Cash Offer", href: "/cash-offer" },
  { label: "Investor Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { open: openModal } = useLeadModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-black/90 backdrop-blur-md border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 md:px-10">
        {/* Brand */}
        <a href="#" className="font-serif text-lg tracking-wide text-gold">
          LEGACY REAL ESTATE INC
        </a>

        {/* Desktop Links */}
        <div className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => {
            const isRoute = link.href.startsWith("/");
            const Comp = isRoute ? Link : "a";
            return (
              <Comp
                key={link.label}
                href={link.href}
                className="relative font-sans text-xs uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-gold group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-gold transition-all duration-300 group-hover:w-full" />
              </Comp>
            );
          })}
          <button
            onClick={openModal}
            className="ml-2 border border-gold/40 px-6 py-2.5 font-sans text-xs uppercase tracking-[0.2em] text-gold transition-all hover:border-gold hover:bg-gold/10"
          >
            Book Consultation
          </button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="flex flex-col gap-1.5 md:hidden"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-px w-6 bg-white transition-all duration-300 ${
              mobileOpen ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`block h-px w-6 bg-white transition-all duration-300 ${
              mobileOpen ? "-translate-y-[3.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-white/5 bg-black/95 backdrop-blur-md md:hidden"
          >
            <div className="flex flex-col gap-6 px-6 py-8">
              {navLinks.map((link) => {
                const isRoute = link.href.startsWith("/");
                const Comp = isRoute ? Link : "a";
                return (
                  <Comp
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="font-sans text-sm uppercase tracking-[0.2em] text-white/70 transition-colors hover:text-gold min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </Comp>
                );
              })}
              <button
                onClick={() => { setMobileOpen(false); openModal(); }}
                className="mt-2 border border-gold/40 px-6 py-3 text-center font-sans text-sm uppercase tracking-[0.2em] text-gold transition-all hover:bg-gold/10"
              >
                Book Consultation
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
