"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Shield,
  FileText,
  Handshake,
  Scale,
  AlertTriangle,
  Phone,
  Mail,
  MessageCircle,
} from "lucide-react";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { SocialLinks } from "@/components/ui/social-links";
import { LeadModalProvider, useLeadModal } from "@/components/ui/LeadModal";
import { SITE_CONFIG } from "@/lib/constants";

const GOLD = "#D4AF37";

// ── Timeline Data ───────────────────────────────────────────────────────────

const timelineSteps = [
  {
    day: "Day 1",
    title: "Notice of Default Filed",
    description:
      "The lender records a Notice of Default (NOD) with the county recorder. The homeowner has been 90+ days behind on mortgage payments. The foreclosure clock begins.",
    icon: AlertTriangle,
  },
  {
    day: "Day 1 \u2013 45",
    title: "Trigger 1: Listing Agreement",
    description:
      "The homeowner enters a listing agreement with a licensed real estate agent. This triggers the first 45-day postponement of the trustee sale, giving the agent time to market the property at fair market value.",
    icon: FileText,
    highlight: true,
  },
  {
    day: "Day 46 \u2013 90",
    title: "Trigger 2: Purchase Agreement",
    description:
      "Once a bona fide purchase offer is received and a purchase agreement is executed, a second 45-day postponement is activated. This provides time for escrow, inspections, and closing \u2014 up to 90 total days of protection.",
    icon: Handshake,
    highlight: true,
  },
  {
    day: "At Sale",
    title: "67% FMV Bidding Floor",
    description:
      "If the property still goes to trustee sale, AB 2424 establishes a minimum bid of 67% of appraised fair market value. This prevents predatory lowball bids and preserves homeowner equity that would otherwise be lost.",
    icon: Scale,
  },
];

// ── Article Content ─────────────────────────────────────────────────────────

function ArticleContent() {
  const { open: openModal } = useLeadModal();

  return (
    <main className="relative min-h-screen bg-black text-white font-sans">
      {/* Grid background */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header className="mx-auto max-w-4xl px-6 pb-12 pt-28 md:pt-36">
          <Link
            href="/blog"
            className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-[#C5A059]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Market Pulse
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="mb-6 flex flex-wrap items-center gap-3">
              <span className="rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.2em]" style={{ color: GOLD }}>
                AB 2424
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.2em] text-white/40">
                Foreclosure Defense
              </span>
              <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.2em] text-white/40">
                March 2026
              </span>
            </div>

            <h1 className="mb-6 font-serif text-3xl font-light leading-tight tracking-tight text-white md:text-6xl lg:text-7xl">
              The 90-Day{" "}
              <span className="italic" style={{ color: GOLD }}>
                Equity Shield
              </span>
            </h1>
            <p className="mb-2 font-serif text-xl font-light text-white/60 md:text-2xl">
              Navigating AB 2424 in the Central Valley
            </p>
            <p className="max-w-2xl font-sans text-sm font-light leading-relaxed text-white/40">
              How California&apos;s landmark foreclosure legislation gives Fresno,
              Visalia, and Tulare County homeowners up to 90 days of protection
              and a fair market value safety net at trustee sales.
            </p>
          </motion.div>
        </header>

        {/* ── Article Body ───────────────────────────────────────────────── */}
        <article className="mx-auto max-w-4xl px-6 pb-24">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_280px]">
            {/* ── Main Column ──────────────────────────────────────────── */}
            <div className="space-y-10">
              {/* Intro */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl"
              >
                <h2 className="mb-4 font-serif text-2xl font-light text-white md:text-3xl">
                  What Is AB 2424?
                </h2>
                <div className="space-y-4 font-sans text-sm font-light leading-relaxed text-white/60">
                  <p>
                    California Assembly Bill 2424, signed into law in 2024 and effective
                    January 1, 2025, is the most significant piece of foreclosure reform
                    legislation in the state since the Homeowner Bill of Rights. It directly
                    addresses the inequity that occurs when distressed properties are sold at
                    trustee sales far below their actual market value.
                  </p>
                  <p>
                    For Central Valley homeowners &mdash; where foreclosure filings have surged
                    32% year-over-year &mdash; AB 2424 provides two critical protections: a
                    structured postponement system totaling up to 90 days, and a minimum
                    bidding floor of 67% of fair market value at trustee sales.
                  </p>
                  <p>
                    At Legacy Real Estate, we&apos;ve already helped homeowners across Fresno,
                    Visalia, and Tulare County activate these protections to preserve tens of
                    thousands of dollars in equity that would otherwise have been lost.
                  </p>
                </div>
              </motion.section>

              {/* The Two Triggers */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <h2 className="mb-8 font-serif text-2xl font-light text-white md:text-3xl">
                  The Two 45-Day{" "}
                  <span className="italic" style={{ color: GOLD }}>
                    Postponement Triggers
                  </span>
                </h2>

                {/* Timeline */}
                <div className="relative space-y-6">
                  {/* Vertical line */}
                  <div className="absolute left-5 top-6 bottom-6 w-px bg-gradient-to-b from-[#C5A059]/40 via-[#C5A059]/20 to-transparent" />

                  {timelineSteps.map((step, i) => (
                    <motion.div
                      key={step.title}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}
                      viewport={{ once: true }}
                      className={`relative rounded-2xl border p-5 md:p-6 pl-14 md:pl-16 backdrop-blur-xl ${
                        step.highlight
                          ? "border-[#C5A059]/30 bg-[#C5A059]/5"
                          : "border-white/10 bg-white/5"
                      }`}
                    >
                      {/* Icon circle */}
                      <div
                        className={`absolute left-3 top-5 flex h-10 w-10 items-center justify-center rounded-full border ${
                          step.highlight
                            ? "border-[#C5A059]/40 bg-[#C5A059]/15"
                            : "border-white/10 bg-white/5"
                        }`}
                      >
                        <step.icon className="h-4 w-4" style={{ color: GOLD }} />
                      </div>

                      <p
                        className="mb-1 font-sans text-[10px] uppercase tracking-[0.2em]"
                        style={{ color: step.highlight ? GOLD : "rgba(255,255,255,0.4)" }}
                      >
                        {step.day}
                      </p>
                      <h3 className="mb-2 font-serif text-lg font-light text-white">
                        {step.title}
                      </h3>
                      <p className="font-sans text-sm font-light leading-relaxed text-white/60">
                        {step.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.section>

              {/* 67% FMV Deep Dive */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-[#C5A059]/30 bg-[#C5A059]/5 p-6 md:p-8 backdrop-blur-xl"
              >
                <div className="mb-4 flex items-center gap-3">
                  <Scale className="h-5 w-5" style={{ color: GOLD }} />
                  <h2 className="font-serif text-2xl font-light text-white md:text-3xl">
                    The 67% Fair Market Value Floor
                  </h2>
                </div>
                <div className="space-y-4 font-sans text-sm font-light leading-relaxed text-white/60">
                  <p>
                    Before AB 2424, properties at trustee sales could be purchased for
                    the outstanding loan balance &mdash; often far below actual market value.
                    A home worth $435,000 in Fresno could be acquired for as little as
                    $180,000 if that was the remaining mortgage balance. The homeowner
                    would lose over $250,000 in equity overnight.
                  </p>
                  <p>
                    AB 2424 changes this by requiring a minimum opening bid of 67% of the
                    property&apos;s appraised fair market value. Using the same Fresno example,
                    the minimum bid would now be approximately $291,450 &mdash; preserving
                    over $110,000 in equity for the homeowner compared to the old system.
                  </p>
                </div>

                {/* Comparison cards */}
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-xl border border-white/10 bg-black/30 p-4">
                    <p className="mb-1 font-sans text-[10px] uppercase tracking-[0.2em] text-white/30">
                      Before AB 2424
                    </p>
                    <p className="font-serif text-2xl font-light text-white/50">
                      $180,000
                    </p>
                    <p className="mt-1 font-sans text-xs text-white/30">
                      Bid at remaining loan balance
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#C5A059]/30 bg-[#C5A059]/10 p-4">
                    <p className="mb-1 font-sans text-[10px] uppercase tracking-[0.2em]" style={{ color: GOLD }}>
                      With AB 2424
                    </p>
                    <p className="font-serif text-2xl font-light text-white">
                      $291,450
                    </p>
                    <p className="mt-1 font-sans text-xs" style={{ color: GOLD }}>
                      67% of $435k Fair Market Value
                    </p>
                  </div>
                </div>
              </motion.section>

              {/* Central Valley Impact */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl"
              >
                <h2 className="mb-4 font-serif text-2xl font-light text-white md:text-3xl">
                  Impact on{" "}
                  <span className="italic" style={{ color: GOLD }}>
                    Central Valley Markets
                  </span>
                </h2>
                <div className="space-y-4 font-sans text-sm font-light leading-relaxed text-white/60">
                  <p>
                    The Central Valley has been one of California&apos;s hardest-hit regions
                    for foreclosures in 2025&ndash;2026. With 545 Notice of Default filings
                    in Q2 2025 alone &mdash; a 32% increase year-over-year &mdash; AB 2424
                    protections are not theoretical. They are being activated daily.
                  </p>
                  <p>
                    <strong className="text-white/80">Fresno County</strong> leads with the
                    highest volume of filings, driven by pandemic-era forbearance expirations
                    and adjustable-rate mortgage resets.{" "}
                    <strong className="text-white/80">Tulare County</strong> has seen the
                    fastest growth rate, with filings up 41% in smaller cities like Visalia,
                    Dinuba, and Orosi.{" "}
                    <strong className="text-white/80">For investors</strong>, this creates
                    acquisition opportunities &mdash; but only when working with agents who
                    understand the AB 2424 timeline and bidding requirements.
                  </p>
                </div>

                {/* Stats row */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  {[
                    { value: "545", label: "Q2 NOD Filings" },
                    { value: "+32%", label: "YoY Increase" },
                    { value: "90", label: "Days Protection" },
                  ].map((stat) => (
                    <div key={stat.label} className="text-center">
                      <p className="font-serif text-2xl font-light text-white md:text-3xl">
                        {stat.value}
                      </p>
                      <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.15em] text-white/30">
                        {stat.label}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.section>

              {/* For Investors */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 md:p-8 backdrop-blur-xl"
              >
                <h2 className="mb-4 font-serif text-2xl font-light text-white md:text-3xl">
                  What This Means for{" "}
                  <span className="italic" style={{ color: GOLD }}>Investors</span>
                </h2>
                <div className="space-y-4 font-sans text-sm font-light leading-relaxed text-white/60">
                  <p>
                    AB 2424 does not eliminate investor opportunities &mdash; it restructures
                    them. The 67% FMV floor means trustee sale acquisitions still offer
                    33% below-market pricing. Combined with rising foreclosure volume, the
                    deal flow is increasing, not decreasing.
                  </p>
                  <p>
                    The key for Visalia and Fresno investors is timing. The two 45-day
                    postponement windows create a predictable timeline that sophisticated
                    investors can plan around. Working with an agent who tracks NOD filings
                    and understands the AB 2424 calendar is essential.
                  </p>
                </div>
              </motion.section>

              {/* ── Bottom CTA ──────────────────────────────────────────── */}
              <motion.section
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="rounded-2xl border border-[#C5A059]/30 bg-gradient-to-br from-[#C5A059]/10 to-[#C5A059]/5 p-8 md:p-10 backdrop-blur-xl"
              >
                <div className="mb-2 flex items-center gap-3">
                  <Shield className="h-6 w-6" style={{ color: GOLD }} />
                  <p className="font-sans text-[10px] uppercase tracking-[0.3em]" style={{ color: GOLD }}>
                    Take Action Today
                  </p>
                </div>
                <h2 className="mb-4 font-serif text-2xl font-light text-white md:text-3xl">
                  Facing Foreclosure? You Have{" "}
                  <span className="italic" style={{ color: GOLD }}>Options.</span>
                </h2>
                <p className="mb-8 max-w-lg font-sans text-sm font-light leading-relaxed text-white/60">
                  Whether you&apos;re a homeowner seeking AB 2424 protection or an investor
                  looking to navigate the Central Valley foreclosure market, Alejandra
                  Gonzalez and Legacy Real Estate are here to guide you through every step.
                </p>

                <div className="flex flex-col gap-4 sm:flex-row">
                  <Link href="/cash-offer">
                    <LiquidButton size="xl">
                      Get a Cash Offer
                    </LiquidButton>
                  </Link>
                  <a
                    href="https://wa.me/15599811026"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <LiquidButton size="xl">
                      <MessageCircle className="mr-2 h-4 w-4 inline-block" />
                      WhatsApp Alejandra
                    </LiquidButton>
                  </a>
                </div>

                <p className="mt-6 font-sans text-[10px] uppercase tracking-[0.15em] text-white/20">
                  DRE #{SITE_CONFIG.dreNumber} &bull; {SITE_CONFIG.brokerage} &bull; DRE #02165291
                </p>
              </motion.section>
            </div>

            {/* ── Sidebar ────────────────────────────────────────────────── */}
            <aside className="hidden lg:block">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="sticky top-28 space-y-6"
              >
                {/* Agent Card */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10">
                      <span className="font-serif text-lg" style={{ color: GOLD }}>AG</span>
                    </div>
                    <div>
                      <p className="font-serif text-base font-light text-white">{SITE_CONFIG.name}</p>
                      <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-white/40">
                        AB 2424 Specialist
                      </p>
                    </div>
                  </div>

                  <div className="mb-4 space-y-2">
                    <a href={`tel:+1${SITE_CONFIG.phone.replace(/\D/g, "")}`} className="flex items-center gap-2 font-sans text-xs text-white/50 transition-colors hover:text-[#C5A059]">
                      <Phone className="h-3.5 w-3.5" />
                      {SITE_CONFIG.phone}
                    </a>
                    <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-2 font-sans text-xs text-white/50 transition-colors hover:text-[#C5A059]">
                      <Mail className="h-3.5 w-3.5" />
                      {SITE_CONFIG.email}
                    </a>
                  </div>

                  <SocialLinks />
                </div>

                {/* Table of Contents */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                  <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.2em] text-white/40">
                    In This Article
                  </p>
                  <div className="flex flex-col gap-2">
                    {[
                      "What Is AB 2424?",
                      "Two Postponement Triggers",
                      "67% FMV Bidding Floor",
                      "Central Valley Impact",
                      "What It Means for Investors",
                    ].map((item) => (
                      <p key={item} className="font-sans text-xs text-white/40 transition-colors hover:text-white/70 cursor-default">
                        {item}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Quick Links */}
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-xl">
                  <p className="mb-3 font-sans text-[10px] uppercase tracking-[0.2em] text-white/40">
                    Related
                  </p>
                  <div className="flex flex-col gap-2">
                    <Link href="/foreclosures" className="font-sans text-xs text-white/50 transition-colors hover:text-[#C5A059]">
                      Foreclosure Options
                    </Link>
                    <Link href="/cash-offer" className="font-sans text-xs text-white/50 transition-colors hover:text-[#C5A059]">
                      Cash Offer
                    </Link>
                    <Link href="/blog" className="font-sans text-xs text-white/50 transition-colors hover:text-[#C5A059]">
                      Market Pulse Report
                    </Link>
                  </div>
                </div>
              </motion.div>
            </aside>
          </div>
        </article>
      </div>

      {/* ── Floating CTA ───────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <button onClick={openModal}>
          <LiquidButton size="xl">
            Consult with Ale
          </LiquidButton>
        </button>
      </motion.div>
    </main>
  );
}

// ── Wrapper with LeadModalProvider ──────────────────────────────────────────

export default function AB2424Client() {
  return (
    <LeadModalProvider>
      <ArticleContent />
    </LeadModalProvider>
  );
}
