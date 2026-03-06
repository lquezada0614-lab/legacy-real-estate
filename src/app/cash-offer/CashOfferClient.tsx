"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Phone,
  Mail,
  Check,
  X,
  Clock,
  Shield,
  Handshake,
  Home,
  ArrowRight,
  BadgeDollarSign,
} from "lucide-react";
import { AIInputWithLoading } from "@/components/ui/ai-input-with-loading";

const traditionalItems = [
  { text: "6% Agent Commission", icon: X },
  { text: "2–3% Closing & Transaction Fees", icon: X },
  { text: "Months on Market", icon: X },
  { text: "Appraisal & Inspection Contingencies", icon: X },
  { text: "You Pay for Repairs & Cleanout", icon: X },
  { text: "Showings & Open Houses Required", icon: X },
];

const cashItems = [
  { text: "0% Agent Commission" },
  { text: "I Pay Your Closing & Transaction Fees" },
  { text: "Close as Fast as 14 Days" },
  { text: "Guaranteed Funds — No Financing Needed" },
  { text: "Absolutely No Repairs or Showings" },
  { text: "Sell Completely As-Is" },
];

const situations = [
  "Inherited or Probate Property",
  "Deferred Maintenance / Major Repairs Needed",
  "Facing Foreclosure or Pre-Foreclosure",
  "Divorce or Relocation",
  "Tired Landlord / Problem Tenants",
  "Code Violations or Tax Liens",
];

export default function CashOfferClient() {
  const [messages, setMessages] = useState<
    { question: string; answer: string }[]
  >([]);

  async function handleAISubmit(question: string) {
    console.log("[LEAD] Cash offer inquiry:", question);
    await new Promise((r) => setTimeout(r, 2000));
    setMessages((prev) => [
      ...prev,
      {
        question,
        answer: `Thanks for reaching out about "${question}". Alejandra will review your property details and get back to you within 24 hours with a no-obligation offer.`,
      },
    ]);
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans">
      {/* ── Emergency Contact Bar ─────────────────────────────────────── */}
      <div className="sticky top-0 z-50 border-b border-[#C5A059]/20 bg-neutral-950/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <p className="hidden text-xs uppercase tracking-[0.15em] text-[#C5A059] sm:block">
            Need to Sell Fast? Call Now
          </p>
          <div className="flex items-center gap-6">
            <a
              href="tel:+15599811026"
              className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-[#C5A059]"
            >
              <Phone className="h-3.5 w-3.5" />
              (559) 981-1026
            </a>
            <a
              href="mailto:alegonz086@gmail.com"
              className="flex items-center gap-2 text-sm text-white/70 transition-colors hover:text-[#C5A059]"
            >
              <Mail className="h-3.5 w-3.5" />
              alegonz086@gmail.com
            </a>
          </div>
        </div>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1600&auto=format&fit=crop"
            alt="Central Valley property"
            className="h-full w-full object-cover opacity-10"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/50 via-neutral-950/90 to-neutral-950" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 pb-20 pt-28 text-center md:pt-36">
          <p className="mb-4 font-sans text-xs uppercase tracking-[0.3em] text-[#C5A059]">
            Cash Home Buyers &bull; Central Valley
          </p>
          <h1 className="mb-6 font-serif text-4xl font-light leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
            Need to Sell Fast? Get a Guaranteed Cash Offer in Orosi &amp; the{" "}
            <span className="italic text-[#C5A059]">Central Valley.</span>
          </h1>
          <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-white/60 md:text-lg">
            Skip the showings, repairs, and months of uncertainty. Explore a guaranteed
            cash sale, completely as-is.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/home-valuation"
              className="group inline-flex items-center gap-3 rounded-lg border border-[#C5A059]/40 bg-[#C5A059]/10 px-8 py-4 font-sans text-sm font-semibold uppercase tracking-[0.15em] text-[#C5A059] transition-all hover:border-[#C5A059] hover:bg-[#C5A059]/20"
            >
              Submit Your Property Details
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <a
              href="tel:+15599811026"
              className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
            >
              <Phone className="h-4 w-4" />
              Or Call (559) 981-1026
            </a>
          </div>
        </div>
      </section>

      {/* ── The "As-Is" Problem ───────────────────────────────────────── */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div>
              <p className="mb-3 font-sans text-xs uppercase tracking-[0.3em] text-[#C5A059]">
                The Problem
              </p>
              <h2 className="mb-6 font-serif text-3xl font-light leading-tight text-white md:text-4xl">
                Traditional Buyers Want{" "}
                <span className="italic text-white/50">Move-In Ready.</span>
              </h2>
              <p className="mb-6 text-sm font-light leading-relaxed text-white/60">
                Most buyers rely on lender financing that requires inspections, appraisals, and
                a home in good condition. If your property has deferred maintenance, code
                violations, or is tied up in probate — traditional buyers walk away.
              </p>
              <p className="text-sm font-light leading-relaxed text-white/60">
                That doesn&apos;t mean your property is worthless. It means you need a different
                kind of buyer.
              </p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <h3 className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
                We Buy Properties In Any Condition
              </h3>
              <ul className="space-y-3">
                {situations.map((s) => (
                  <li key={s} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#C5A059]" />
                    <span className="text-sm text-white/70">{s}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── The Investor Advantage ────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <div className="rounded-2xl border border-[#C5A059]/20 bg-[#C5A059]/5 p-8 md:p-12">
          <div className="mb-6 flex items-center gap-3">
            <Shield className="h-8 w-8 text-[#C5A059]" />
            <h2 className="font-serif text-2xl font-light text-white md:text-3xl">
              The <span className="italic text-[#C5A059]">Investor Advantage</span>
            </h2>
          </div>
          <p className="mb-6 max-w-2xl text-sm font-light leading-relaxed text-white/70">
            Alejandra isn&apos;t just a licensed agent — she&apos;s a Partner &amp; active real estate investor
            in the Central Valley. That means she understands your property&apos;s true value,
            even when it needs work.
          </p>
          <div className="rounded-xl border border-[#C5A059]/10 bg-neutral-950/50 p-6">
            <p className="text-sm font-light leading-relaxed text-white/70">
              <strong className="text-white">
                &ldquo;When a traditional sale is off the table, I work directly with my network
                of trusted investors — or buy it myself — to provide you with a fair, all-cash
                solution. No middlemen, no hidden fees, no games.&rdquo;
              </strong>
            </p>
            <p className="mt-3 text-xs text-[#C5A059]">
              — Alejandra Gonzalez, Partner &amp; Real Estate Investor &bull; DRE #02207755
            </p>
          </div>
        </div>
      </section>

      {/* ── Comparison Table ──────────────────────────────────────────── */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <h2 className="mb-4 text-center font-serif text-3xl font-light text-white md:text-4xl">
            Traditional Listing vs.{" "}
            <span className="italic text-[#C5A059]">My Cash Offer</span>
          </h2>
          <p className="mb-12 text-center text-sm text-white/50">
            See the difference at a glance.
          </p>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Traditional */}
            <div className="rounded-2xl border border-white/10 bg-white/5 p-8">
              <div className="mb-6 flex items-center gap-3">
                <Home className="h-5 w-5 text-white/40" />
                <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.15em] text-white/60">
                  Traditional Listing
                </h3>
              </div>
              <ul className="space-y-4">
                {traditionalItems.map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400/70" />
                    <span className="text-sm text-white/50">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Cash Offer */}
            <div className="rounded-2xl border border-[#C5A059]/30 bg-[#C5A059]/5 p-8 shadow-[0_0_30px_rgba(197,160,89,0.06)]">
              <div className="mb-6 flex items-center gap-3">
                <BadgeDollarSign className="h-5 w-5 text-[#C5A059]" />
                <h3 className="font-sans text-sm font-semibold uppercase tracking-[0.15em] text-[#C5A059]">
                  My Cash Offer
                </h3>
              </div>
              <ul className="space-y-4">
                {cashItems.map((item) => (
                  <li key={item.text} className="flex items-start gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#C5A059]" />
                    <span className="text-sm font-medium text-white/80">
                      {item.text}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ──────────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="mb-12 text-center font-serif text-3xl font-light text-white md:text-4xl">
          How It <span className="italic text-[#C5A059]">Works</span>
        </h2>

        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              step: "01",
              title: "Submit Your Property",
              desc: "Share your address and basic details. No obligation, no pressure.",
              icon: Home,
            },
            {
              step: "02",
              title: "Receive Your Offer",
              desc: "Within 24 hours, get a fair, all-cash offer based on current market data.",
              icon: BadgeDollarSign,
            },
            {
              step: "03",
              title: "Close on Your Timeline",
              desc: "Pick your closing date — as fast as 14 days or whenever works for you.",
              icon: Handshake,
            },
          ].map((s) => {
            const Icon = s.icon;
            return (
              <div
                key={s.step}
                className="rounded-xl border border-white/10 bg-white/5 p-6 text-center backdrop-blur-sm"
              >
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10">
                  <Icon className="h-5 w-5 text-[#C5A059]" />
                </div>
                <p className="mb-1 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
                  Step {s.step}
                </p>
                <h3 className="mb-2 font-serif text-lg font-light text-white">
                  {s.title}
                </h3>
                <p className="text-xs font-light leading-relaxed text-white/50">
                  {s.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ── AI Input / Lead Gen ───────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-2xl px-6 py-20">
          <h2 className="mb-2 text-center font-serif text-2xl font-light text-white md:text-3xl">
            Questions About Your{" "}
            <span className="italic text-[#C5A059]">Property?</span>
          </h2>
          <p className="mb-8 text-center text-sm text-white/50">
            Whether it&apos;s inherited, distressed, or just needs to sell fast — ask below.
          </p>

          {messages.length > 0 && (
            <div className="mb-6 max-h-48 space-y-3 overflow-y-auto">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className="rounded-lg border border-white/5 bg-white/5 p-3"
                >
                  <p className="mb-1 text-xs text-white/40">
                    You asked: &ldquo;{msg.question}&rdquo;
                  </p>
                  <p className="text-sm text-[#C5A059]">{msg.answer}</p>
                </div>
              ))}
            </div>
          )}

          <AIInputWithLoading
            onSubmit={handleAISubmit}
            placeholder="e.g. I inherited a property in Orosi that needs major repairs — what are my options?"
          />
        </div>
      </section>

      {/* ── Final CTA ─────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-3xl px-6 py-20 text-center">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10">
          <Clock className="h-7 w-7 text-[#C5A059]" />
        </div>
        <h2 className="mb-4 font-serif text-3xl font-light text-white md:text-4xl">
          Time Is <span className="italic text-[#C5A059]">Equity.</span>
        </h2>
        <p className="mx-auto mb-8 max-w-xl text-sm font-light leading-relaxed text-white/60">
          Every month a distressed property sits, it costs you money — in taxes, maintenance,
          and lost opportunity. Let&apos;s get you a fair offer and move forward.
        </p>
        <Link
          href="/home-valuation"
          className="group inline-flex items-center gap-3 rounded-lg border border-[#C5A059]/40 bg-[#C5A059]/10 px-8 py-4 font-sans text-sm font-semibold uppercase tracking-[0.15em] text-[#C5A059] transition-all hover:border-[#C5A059] hover:bg-[#C5A059]/20"
        >
          Get Your Free Cash Offer
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </section>

      {/* ── Footer Nav ────────────────────────────────────────────────── */}
      <div className="border-t border-white/5 py-8 text-center">
        <Link
          href="/"
          className="text-xs uppercase tracking-widest text-white/50 transition-colors hover:text-white"
        >
          &larr; Back to Home
        </Link>
      </div>
    </main>
  );
}
