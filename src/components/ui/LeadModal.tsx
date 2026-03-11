"use client";

import { useState, useEffect, useCallback, useRef, createContext, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Suggestion {
  display: string;
  zpid: number;
}

// ── Context so any component can open the modal ─────────────────────────

type LeadModalContextType = { open: () => void };
const LeadModalContext = createContext<LeadModalContextType>({ open: () => {} });
export const useLeadModal = () => useContext(LeadModalContext);

// ── Provider + Modal ────────────────────────────────────────────────────

export function LeadModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <LeadModalContext.Provider value={{ open }}>
      {children}
      <LeadModal isOpen={isOpen} onClose={close} />
    </LeadModalContext.Provider>
  );
}

// ── The Modal ───────────────────────────────────────────────────────────

function LeadModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const addrWrapperRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [message, setMessage] = useState("");

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  // Close suggestions on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (addrWrapperRef.current && !addrWrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleAddressChange(value: string) {
    setAddress(value);
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (value.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }
    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `/api/autocomplete?query=${encodeURIComponent(value)}`
        );
        const data = await res.json();
        setSuggestions(data.results ?? []);
        setShowSuggestions(true);
      } catch {
        setSuggestions([]);
      }
    }, 300);
  }

  function selectSuggestion(s: Suggestion) {
    setAddress(s.display);
    setShowSuggestions(false);
    setSuggestions([]);
  }

  function resetForm() {
    setName(""); setPhone(""); setAddress("");
    setSuggestions([]); setShowSuggestions(false);
    setStatus("idle"); setMessage("");
  }

  function handleClose() {
    onClose();
    // Reset after animation
    setTimeout(resetForm, 300);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setMessage("");

    try {
      const res = await fetch("/api/book-consultation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          phone: phone.trim(),
          address: address.trim(),
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setMessage("Thank you! Alejandra will be in touch soon.");
        setName(""); setPhone(""); setAddress("");
      } else {
        setStatus("error");
        setMessage(data.detail || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setMessage("Cannot reach the server. Please try again later.");
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-sm p-4"
          onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="relative w-full max-w-md rounded-xl border border-[#C5A059]/30 bg-neutral-900 p-8"
          >
            {/* Close button */}
            <button
              onClick={handleClose}
              className="absolute right-4 top-4 text-white/40 transition-colors hover:text-[#C5A059]"
              aria-label="Close"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>

            {/* Header */}
            <h3 className="font-serif text-2xl text-[#C5A059] mb-1">
              Schedule a Consultation
            </h3>
            <p className="font-sans text-sm text-white/50 mb-8 leading-relaxed">
              Tell me about yourself and the property you&apos;re interested in.
              I&apos;ll reach out within 24 hours.
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-white/60 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full rounded-lg border border-[#C5A059]/20 bg-white/5 px-4 py-3 font-sans text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-[#C5A059]"
                />
              </div>
              <div>
                <label className="block font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-white/60 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="(559) 981-1026"
                  className="w-full rounded-lg border border-[#C5A059]/20 bg-white/5 px-4 py-3 font-sans text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-[#C5A059]"
                />
              </div>
              <div ref={addrWrapperRef} className="relative">
                <label className="block font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-white/60 mb-2">
                  Property Address of Interest
                </label>
                <input
                  type="text"
                  required
                  value={address}
                  onChange={(e) => handleAddressChange(e.target.value)}
                  autoComplete="off"
                  placeholder="Start typing an address..."
                  className="w-full rounded-lg border border-[#C5A059]/20 bg-white/5 px-4 py-3 font-sans text-sm text-white placeholder:text-white/25 outline-none transition-colors focus:border-[#C5A059]"
                />
                {showSuggestions && suggestions.length > 0 && (
                  <ul className="absolute z-50 left-0 right-0 mt-1 max-h-48 overflow-y-auto rounded-lg border border-white/10 bg-neutral-900 shadow-xl">
                    {suggestions.map((s) => (
                      <li key={s.zpid}>
                        <button
                          type="button"
                          onClick={() => selectSuggestion(s)}
                          className="w-full px-4 py-3 text-left text-sm text-white/80 hover:bg-[#C5A059]/10 hover:text-white transition-colors"
                        >
                          {s.display}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <button
                type="submit"
                disabled={status === "sending"}
                className="w-full rounded-lg border border-[#C5A059]/40 bg-[#C5A059]/10 py-3.5 font-sans text-sm font-semibold uppercase tracking-[0.15em] text-[#C5A059] transition-all hover:bg-[#C5A059]/20 disabled:opacity-50"
              >
                {status === "sending" ? "Sending..." : "Send My Info"}
              </button>
            </form>

            {/* Status message */}
            {message && (
              <p className={`mt-4 text-center font-sans text-sm ${
                status === "success" ? "text-green-400" : "text-red-400"
              }`}>
                {message}
              </p>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
