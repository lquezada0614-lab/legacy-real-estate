"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Suggestion {
  display: string;
  zpid: number;
}

export default function HomeValuationPage() {
  const router = useRouter();
  const [address, setAddress] = useState("");
  const [zpid, setZpid] = useState<number | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleAddressChange(value: string) {
    setAddress(value);
    setZpid(null);

    if (debounceRef.current) clearTimeout(debounceRef.current);

    if (value.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    debounceRef.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `http://localhost:8000/autocomplete?query=${encodeURIComponent(value)}`
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
    setZpid(s.zpid);
    setShowSuggestions(false);
    setSuggestions([]);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    if (!zpid) {
      setError("Please select an address from the suggestions.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("http://localhost:8000/submit-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ first_name: firstName, last_name: lastName, phone, email, address: String(zpid) }),
      });

      if (!res.ok) {
        const data = await res.json();
        const detail = data.detail;
        throw new Error(
          Array.isArray(detail) ? detail.join(", ") : detail ?? "Something went wrong"
        );
      }

      const data = await res.json();
      const { price, zestimate, address: propAddress } = data.property_data;

      const params = new URLSearchParams({
        price: String(price),
        zestimate: String(zestimate),
        address: String(propAddress),
      });

      router.push(`/home-valuation/success?${params.toString()}`);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to fetch valuation");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans">
      <div className="container mx-auto px-6 py-32 flex flex-col items-center justify-center text-center">
        <h1 className="font-serif text-5xl md:text-7xl mb-6">
          Your Home&apos;s <span className="text-[#C5A059] italic">True Value.</span>
        </h1>
        <p className="text-white/70 max-w-2xl mb-12 font-light">
          Automated estimates are a starting point. As a licensed broker and investor,
          I provide a comprehensive market analysis based on real data and renovation potential.
        </p>

        <form onSubmit={handleSubmit} className="w-full max-w-md bg-neutral-900 p-8 rounded-lg border border-white/10">
          {/* Address input with autocomplete */}
          <div ref={wrapperRef} className="relative mb-4">
            <input
              type="text"
              placeholder="Start typing a property address..."
              value={address}
              onChange={(e) => handleAddressChange(e.target.value)}
              required
              autoComplete="off"
              className="w-full bg-neutral-950 border border-white/20 p-4 rounded text-white focus:border-[#C5A059] outline-none transition-colors"
            />
            {showSuggestions && suggestions.length > 0 && (
              <ul className="absolute z-50 left-0 right-0 mt-1 max-h-60 overflow-y-auto rounded border border-white/10 bg-neutral-900 shadow-xl">
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

          <div className="grid grid-cols-2 gap-3 mb-4">
            <input
              type="text"
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
              className="w-full bg-neutral-950 border border-white/20 p-4 rounded text-white focus:border-[#C5A059] outline-none transition-colors"
            />
            <input
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
              className="w-full bg-neutral-950 border border-white/20 p-4 rounded text-white focus:border-[#C5A059] outline-none transition-colors"
            />
          </div>

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="w-full bg-neutral-950 border border-white/20 p-4 rounded mb-4 text-white focus:border-[#C5A059] outline-none transition-colors"
          />

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full bg-neutral-950 border border-white/20 p-4 rounded mb-6 text-white focus:border-[#C5A059] outline-none transition-colors"
          />

          {error && <p className="text-red-400 text-sm mb-4">{error}</p>}

          <p className="text-[10px] leading-relaxed text-[#C5A059]/60 mb-4">
            By providing your phone number, you agree to receive text messages from Alejandra Gonzalez regarding real estate services. Message and data rates may apply. Reply STOP to opt out.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#C5A059] text-black font-bold py-4 rounded uppercase tracking-widest hover:bg-white transition-colors disabled:opacity-50"
          >
            {loading ? "Analyzing..." : "Get Free Report"}
          </button>
        </form>

        <Link href="/" className="mt-8 text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors">
          &larr; Back to Home
        </Link>
      </div>
    </main>
  );
}
