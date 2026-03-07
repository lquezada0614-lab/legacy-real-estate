"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, Mail, Shield, Clock, Home, DollarSign, FileText, Gavel, ArrowRight } from "lucide-react";
import { AIInputWithLoading } from "@/components/ui/ai-input-with-loading";


const timeline = [
  {
    phase: "Day 1–120",
    title: "Missed Payments & Lender Contact",
    description:
      "After 1–4 missed payments, your lender will reach out with loss mitigation options. This is your first window to act — do not ignore these communications.",
    icon: Clock,
  },
  {
    phase: "Day 121+",
    title: "Notice of Default (NOD)",
    description:
      "The lender files a Notice of Default with the county recorder. Under California law, you have a 90-day reinstatement period to bring the loan current or negotiate alternatives.",
    icon: FileText,
  },
  {
    phase: "21 Days Before Sale",
    title: "Notice of Trustee Sale",
    description:
      "A sale date is set and publicly recorded. The countdown to auction begins. This is the critical moment to engage a licensed broker.",
    icon: Gavel,
  },
  {
    phase: "Sale Day",
    title: "The Auction",
    description:
      "If no action is taken, the property is sold at public auction to the highest bidder. Any remaining equity above the debt is lost if unclaimed.",
    icon: Home,
  },
];

const options = [
  {
    title: "Refinance",
    description:
      "Use the 45-day postponement to find a new lender, restructure your debt, and keep your home with more favorable terms.",
    icon: DollarSign,
  },
  {
    title: "Traditional Sale",
    description:
      "Sell on the open market to maximize your equity. A market-rate sale almost always returns more than an auction price.",
    icon: Home,
  },
  {
    title: "Short Sale",
    description:
      "If you owe more than the home is worth, negotiate with the bank to accept less than the balance — avoiding a full foreclosure on your record.",
    icon: FileText,
  },
];

export default function ForeclosureClient() {
  const [messages, setMessages] = useState<
    { question: string; answer: string }[]
  >([]);

  async function handleAISubmit(question: string) {
    console.log("[LEAD] Foreclosure inquiry:", question);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, history: messages }),
      });
      const data = await res.json();
      if (data.answer) {
        setMessages((prev) => [...prev, { question, answer: data.answer }]);
        return;
      }
      if (!res.ok) throw new Error(data.error || "Request failed");
      setMessages((prev) => [...prev, { question, answer: data.answer }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          question,
          answer:
            "I'm having trouble connecting right now. Please call Alejandra directly at (559) 981-1026 for immediate assistance.",
        },
      ]);
    }
  }

  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans">
      {/* ── Emergency Contact Bar ─────────────────────────────────────── */}
      <div className="sticky top-0 z-50 border-b border-[#C5A059]/20 bg-neutral-950/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3">
          <p className="hidden text-xs uppercase tracking-[0.15em] text-[#C5A059] sm:block">
            Facing Foreclosure? Get Help Now
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
            src="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1600&auto=format&fit=crop"
            alt="Professional consultation"
            className="h-full w-full object-cover opacity-15"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-neutral-950/60 via-neutral-950/90 to-neutral-950" />
        </div>

        <div className="relative mx-auto max-w-4xl px-6 pb-20 pt-28 text-center md:pt-36">
          <p className="mb-4 font-sans text-xs uppercase tracking-[0.3em] text-[#C5A059]">
            California Foreclosure Help 2026
          </p>
          <h1 className="mb-6 font-serif text-3xl font-light leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
            Facing Foreclosure in the Central Valley?{" "}
            <span className="italic text-[#C5A059]">
              You Have More Options Than You Think.
            </span>
          </h1>
          <p className="mx-auto max-w-2xl text-base font-light leading-relaxed text-white/60 md:text-lg">
            New 2026 California laws (AB 2424) provide homeowners with legal ways to pause
            the process. Let&apos;s protect your equity together.
          </p>
        </div>
      </section>

      {/* ── 4-Step Timeline ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-4xl px-6 py-20">
        <h2 className="mb-4 text-center font-serif text-3xl font-light text-white md:text-4xl">
          The Foreclosure <span className="italic text-[#C5A059]">Timeline</span>
        </h2>
        <p className="mb-16 text-center text-sm text-white/50">
          Understanding where you are in the process is the first step to stopping it.
        </p>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 hidden h-full w-px bg-gradient-to-b from-[#C5A059]/60 via-[#C5A059]/20 to-transparent md:left-8 md:block" />

          <div className="space-y-12">
            {timeline.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={i} className="relative flex gap-6 md:gap-8">
                  {/* Icon circle */}
                  <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 md:h-16 md:w-16">
                    <Icon className="h-5 w-5 text-[#C5A059] md:h-6 md:w-6" />
                  </div>

                  <div className="pt-1">
                    <p className="mb-1 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
                      {step.phase}
                    </p>
                    <h3 className="mb-2 font-serif text-xl font-light text-white md:text-2xl">
                      {step.title}
                    </h3>
                    <p className="max-w-xl text-sm font-light leading-relaxed text-white/60">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── AB 2424 — Agent Advantage ─────────────────────────────────── */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-4xl px-6 py-20">
          <div className="rounded-2xl border border-[#C5A059]/20 bg-[#C5A059]/5 p-8 md:p-12">
            <div className="mb-6 flex items-center gap-3">
              <Shield className="h-8 w-8 text-[#C5A059]" />
              <h2 className="font-serif text-2xl font-light text-white md:text-3xl">
                The Power of a <span className="italic text-[#C5A059]">Licensed Agent</span>
              </h2>
            </div>

            <div className="mb-8 rounded-xl border border-[#C5A059]/10 bg-neutral-950/50 p-6">
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-[#C5A059]">
                California AB 2424 — Your Legal Shield
              </p>
              <p className="text-sm font-light leading-relaxed text-white/70">
                Under <strong className="text-white">California Assembly Bill 2424</strong>, if a
                homeowner submits a valid listing agreement with a licensed broker at least{" "}
                <strong className="text-white">5 business days before the scheduled sale</strong>,
                the trustee is <strong className="text-white">legally required to postpone the
                sale for 45 days</strong>. This gives you time to explore every option available.
              </p>
            </div>

            <h3 className="mb-6 font-serif text-xl font-light text-white">
              What You Can Do With Those 45 Days:
            </h3>

            <div className="grid gap-4 md:grid-cols-3">
              {options.map((opt) => {
                const Icon = opt.icon;
                return (
                  <div
                    key={opt.title}
                    className="rounded-xl border border-white/10 bg-white/5 p-5"
                  >
                    <Icon className="mb-3 h-5 w-5 text-[#C5A059]" />
                    <h4 className="mb-2 font-sans text-sm font-semibold uppercase tracking-wide text-white">
                      {opt.title}
                    </h4>
                    <p className="text-xs font-light leading-relaxed text-white/50">
                      {opt.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ── AI Input / Lead Gen ───────────────────────────────────────── */}
      <section className="mx-auto max-w-2xl px-6 py-20">
        <h2 className="mb-2 text-center font-serif text-2xl font-light text-white md:text-3xl">
          Have Questions About Your{" "}
          <span className="italic text-[#C5A059]">Notice of Default?</span>
        </h2>
        <p className="mb-8 text-center text-sm text-white/50">
          Ask below or reach out directly — every situation is different and time matters.
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
          placeholder="e.g. I received a Notice of Default last week — what are my options?"
        />
      </section>

      {/* ── CTA — Equity Analysis ─────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-white/[0.02]">
        <div className="mx-auto max-w-3xl px-6 py-20 text-center">
          <h2 className="mb-4 font-serif text-3xl font-light text-white md:text-4xl">
            Your Home Still Has{" "}
            <span className="italic text-[#C5A059]">Equity.</span>
          </h2>
          <p className="mx-auto mb-8 max-w-xl text-sm font-light leading-relaxed text-white/60">
            Even in pre-foreclosure, your property may be worth significantly more than
            what you owe. A free equity analysis shows you exactly where you stand — and
            what you could walk away with.
          </p>
          <Link
            href="/home-valuation"
            className="group inline-flex items-center gap-3 rounded-lg border border-[#C5A059]/40 bg-[#C5A059]/10 px-8 py-4 font-sans text-sm font-semibold uppercase tracking-[0.15em] text-[#C5A059] transition-all hover:border-[#C5A059] hover:bg-[#C5A059]/20"
          >
            Request a Free Equity Analysis
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
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
