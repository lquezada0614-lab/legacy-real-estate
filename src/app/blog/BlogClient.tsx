"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  TrendingDown,
  TrendingUp,
  Home,
  Activity,
  Clock,
  AlertTriangle,
  Phone,
  Mail,
  Shield,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from "recharts";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { SocialLinks } from "@/components/ui/social-links";
import { LeadModalProvider, useLeadModal } from "@/components/ui/LeadModal";
import { SITE_CONFIG } from "@/lib/constants";

// ── Chart Data ─────────────────────────────────────────────────────────────

const rateData = [
  { month: "Jan '24", rate: 7.5 },
  { month: "Mar '24", rate: 7.2 },
  { month: "May '24", rate: 7.0 },
  { month: "Jul '24", rate: 6.85 },
  { month: "Sep '24", rate: 6.6 },
  { month: "Nov '24", rate: 6.45 },
  { month: "Jan '25", rate: 6.3 },
  { month: "Mar '25", rate: 6.14 },
];

const medianPriceData = [
  { city: "Fresno", median: 435000, dom: 31 },
  { city: "Visalia", median: 390000, dom: 34 },
  { city: "Tulare", median: 404990, dom: 28 },
];

const foreclosureData = [
  { month: "Q1 '24", filings: 320 },
  { month: "Q2 '24", filings: 380 },
  { month: "Q3 '24", filings: 425 },
  { month: "Q4 '24", filings: 470 },
  { month: "Q1 '25", filings: 510 },
  { month: "Q2 '25", filings: 545 },
];

const GOLD = "#D4AF37";

// ── Custom Tooltip ─────────────────────────────────────────────────────────

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ value: number }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg border border-white/10 bg-neutral-900/95 px-4 py-2.5 backdrop-blur-xl">
      <p className="mb-1 font-sans text-[10px] uppercase tracking-[0.15em] text-white/40">{label}</p>
      <p className="font-serif text-lg text-white">{typeof payload[0].value === "number" && payload[0].value > 1000 ? `$${(payload[0].value / 1000).toFixed(0)}k` : payload[0].value}</p>
    </div>
  );
}

// ── Stat Card ──────────────────────────────────────────────────────────────

function StatCard({ label, value, sub, icon: Icon, accent = false }: { label: string; value: string; sub?: string; icon: React.ElementType; accent?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className={`rounded-2xl border p-4 md:p-6 backdrop-blur-xl will-change-transform ${accent ? "border-[#C5A059]/30 md:border-[#C5A059]/20 bg-[#C5A059]/5" : "border-white/20 md:border-white/10 bg-white/5"}`}
    >
      <div className="mb-3 flex items-center gap-3">
        <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${accent ? "border border-[#C5A059]/20 bg-[#C5A059]/10" : "border border-white/10 bg-white/5"}`}>
          <Icon className="h-4 w-4" style={{ color: GOLD }} />
        </div>
        <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/40">{label}</p>
      </div>
      <p className="font-serif text-3xl font-light text-white">{value}</p>
      {sub && <p className="mt-1 font-sans text-xs text-white/40">{sub}</p>}
    </motion.div>
  );
}

// ── Blog Content (wrapped in provider) ─────────────────────────────────────

function BlogContent() {
  const { open: openModal } = useLeadModal();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const xAxisTickProps = isMobile
    ? { fontSize: 8, fill: "rgba(255,255,255,0.3)", interval: 1 as const }
    : { fontSize: 10, fill: "rgba(255,255,255,0.3)", interval: 0 as const };

  return (
    <main className="relative min-h-screen bg-black text-white font-sans">
      {/* Grid background pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative z-10">
        {/* ── Header ─────────────────────────────────────────────────────── */}
        <header className="mx-auto max-w-6xl px-6 pb-12 pt-28 md:pt-36">
          <Link
            href="/"
            className="mb-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-[#C5A059]"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <p className="mb-4 font-sans text-xs uppercase tracking-[0.3em]" style={{ color: GOLD }}>
              Legacy Intelligence Report &bull; March 2026
            </p>
            <h1 className="mb-4 font-serif text-3xl font-light leading-tight tracking-tight text-white md:text-7xl">
              Central Valley{" "}
              <span className="italic" style={{ color: GOLD }}>
                Market Pulse
              </span>
            </h1>
            <p className="max-w-2xl font-sans text-base font-light leading-relaxed text-white/50">
              A data-driven analysis of interest rates, median home prices, and
              foreclosure trends across Fresno, Visalia, and Tulare County.
              Updated weekly for investors and homeowners.
            </p>
          </motion.div>
        </header>

        {/* ── Main Content Grid ──────────────────────────────────────────── */}
        <div className="mx-auto max-w-6xl px-6 pb-24">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_320px]">
            {/* ── Left Column: Tabs + Charts ───────────────────────────── */}
            <div>
              <Tabs defaultValue="rates">
                <TabsList className="mb-8 flex-nowrap overflow-x-auto scrollbar-hide max-w-full md:flex-wrap">
                  <TabsTrigger value="rates">Interest Rates</TabsTrigger>
                  <TabsTrigger value="pricing">Local Pricing</TabsTrigger>
                  <TabsTrigger value="foreclosures">Foreclosure Trends</TabsTrigger>
                </TabsList>

                {/* ── Tab: Interest Rates ─────────────────────────────── */}
                <TabsContent value="rates">
                  <div className="space-y-6">
                    {/* Bento Stats */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <StatCard icon={Activity} label="Current Rate" value="6.14%" sub="30-Year Fixed National Avg" />
                      <StatCard icon={TrendingDown} label="12-Mo Change" value="-1.36%" sub="Down from 7.50% peak" />
                      <StatCard icon={Clock} label="Forecast" value="Sub-6%" sub="Expected by Q4 2026" />
                    </div>

                    {/* Chart */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="rounded-2xl border border-white/20 md:border-white/10 bg-white/5 p-4 md:p-6 backdrop-blur-xl will-change-transform"
                    >
                      <h3 className="mb-1 font-serif text-xl font-light text-white">
                        30-Year Fixed Mortgage Rate
                      </h3>
                      <p className="mb-6 font-sans text-xs text-white/40">
                        Jan 2024 &mdash; Mar 2026
                      </p>
                      <div className="h-56 md:h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={rateData} margin={{ top: 10, right: 10, left: isMobile ? -20 : -10, bottom: 0 }}>
                            <defs>
                              <linearGradient id="rateGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={GOLD} stopOpacity={0.25} />
                                <stop offset="100%" stopColor={GOLD} stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="month" tick={xAxisTickProps} axisLine={false} tickLine={false} />
                            <YAxis domain={[5.5, 8]} tick={{ fontSize: 10, fill: "rgba(255,255,255,0.3)" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `${v}%`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="rate" stroke={GOLD} strokeWidth={2} fill="url(#rateGradient)" dot={{ r: 4, fill: GOLD, strokeWidth: 0 }} activeDot={{ r: 6, fill: GOLD }} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </motion.div>

                    {/* Analysis */}
                    <div className="rounded-2xl border border-white/20 md:border-white/10 bg-white/5 p-4 md:p-6 backdrop-blur-xl will-change-transform">
                      <h3 className="mb-3 font-serif text-lg font-light text-white">Analysis</h3>
                      <p className="font-sans text-sm font-light leading-relaxed text-white/60">
                        Mortgage rates have steadily declined from their October 2023 peak of 7.79%
                        to the current 6.14%. This 1.36-point drop translates to approximately $190/month
                        in savings on a $400,000 loan. For Central Valley buyers, this opens a window of
                        opportunity &mdash; especially in markets like Fresno and Tulare where inventory
                        remains elevated. Economists project rates may dip below 6% by late 2026, further
                        boosting purchasing power.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                {/* ── Tab: Local Pricing ──────────────────────────────── */}
                <TabsContent value="pricing">
                  <div className="space-y-6">
                    {/* Bento Stats */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <StatCard icon={Home} label="Fresno Median" value="$435k" sub="31 days on market" />
                      <StatCard icon={Home} label="Visalia Median" value="$390k" sub="34 days on market" />
                      <StatCard icon={Home} label="Tulare Median" value="$404,990" sub="28 days on market" />
                    </div>

                    {/* Chart */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="rounded-2xl border border-white/20 md:border-white/10 bg-white/5 p-4 md:p-6 backdrop-blur-xl will-change-transform"
                    >
                      <h3 className="mb-1 font-serif text-xl font-light text-white">
                        Median Home Price by City
                      </h3>
                      <p className="mb-6 font-sans text-xs text-white/40">
                        Current quarter &mdash; Central Valley
                      </p>
                      <div className="h-56 md:h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={medianPriceData} margin={{ top: 10, right: 10, left: isMobile ? -20 : -10, bottom: 0 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="city" tick={{ fontSize: isMobile ? 9 : 11, fill: "rgba(255,255,255,0.5)" }} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: isMobile ? 8 : 10, fill: "rgba(255,255,255,0.3)" }} axisLine={false} tickLine={false} tickFormatter={(v: number) => `$${(v / 1000).toFixed(0)}k`} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="median" fill={GOLD} radius={[6, 6, 0, 0]} barSize={isMobile ? 40 : 60} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </motion.div>

                    {/* Analysis */}
                    <div className="rounded-2xl border border-white/20 md:border-white/10 bg-white/5 p-4 md:p-6 backdrop-blur-xl will-change-transform">
                      <h3 className="mb-3 font-serif text-lg font-light text-white">Analysis</h3>
                      <p className="font-sans text-sm font-light leading-relaxed text-white/60">
                        Fresno leads the Central Valley in median price at $435,000, reflecting strong demand
                        in the metro core. Tulare County at $404,990 has seen the fastest appreciation (+8.2% YoY),
                        driven by Bay Area migration and affordability relative to Fresno. Visalia remains the
                        most accessible market at $390,000 with slightly longer days on market (34), presenting
                        opportunities for negotiation. All three markets show healthy absorption rates, with
                        Tulare&apos;s 28-day DOM signaling the tightest inventory conditions.
                      </p>
                    </div>
                  </div>
                </TabsContent>

                {/* ── Tab: Foreclosure Trends ─────────────────────────── */}
                <TabsContent value="foreclosures">
                  <div className="space-y-6">
                    {/* Bento Stats */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <StatCard icon={TrendingUp} label="YoY Growth" value="+32%" sub="Foreclosure filings" accent />
                      <StatCard icon={AlertTriangle} label="Active NODs" value="545" sub="Q2 2025 filings" accent />
                      <StatCard icon={Shield} label="AB 2424" value="Active" sub="Listing pause protection" accent />
                    </div>

                    {/* Chart */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6 }}
                      viewport={{ once: true }}
                      className="rounded-2xl border border-[#C5A059]/30 md:border-[#C5A059]/20 bg-[#C5A059]/5 p-4 md:p-6 backdrop-blur-xl will-change-transform"
                    >
                      <h3 className="mb-1 font-serif text-xl font-light text-white">
                        Foreclosure Filings &mdash; Central Valley
                      </h3>
                      <p className="mb-6 font-sans text-xs text-white/40">
                        Quarterly NOD filings &mdash; 2024&ndash;2025
                      </p>
                      <div className="h-56 md:h-72">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={foreclosureData} margin={{ top: 10, right: 10, left: isMobile ? -20 : -10, bottom: 0 }}>
                            <defs>
                              <linearGradient id="foreclosureGradient" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor={GOLD} stopOpacity={0.3} />
                                <stop offset="100%" stopColor={GOLD} stopOpacity={0} />
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                            <XAxis dataKey="month" tick={xAxisTickProps} axisLine={false} tickLine={false} />
                            <YAxis tick={{ fontSize: isMobile ? 8 : 10, fill: "rgba(255,255,255,0.3)" }} axisLine={false} tickLine={false} />
                            <Tooltip content={<CustomTooltip />} />
                            <Area type="monotone" dataKey="filings" stroke={GOLD} strokeWidth={2} fill="url(#foreclosureGradient)" dot={{ r: 4, fill: GOLD, strokeWidth: 0 }} activeDot={{ r: 6, fill: GOLD }} />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </motion.div>

                    {/* AB 2424 Callout */}
                    <div className="rounded-2xl border border-[#C5A059]/30 md:border-[#C5A059]/20 bg-[#C5A059]/5 p-4 md:p-6 backdrop-blur-xl will-change-transform">
                      <div className="mb-3 flex items-center gap-3">
                        <Shield className="h-5 w-5" style={{ color: GOLD }} />
                        <h3 className="font-serif text-lg font-light text-white">
                          California AB 2424 &mdash; What It Means for You
                        </h3>
                      </div>
                      <p className="mb-4 font-sans text-sm font-light leading-relaxed text-white/60">
                        AB 2424 allows homeowners in pre-foreclosure to pause the sale process and list their
                        property with a licensed agent. This gives distressed homeowners the chance to sell at
                        market value rather than losing equity to a trustee sale. With a 32% YoY increase in
                        foreclosure filings across the Central Valley, this legislation is more relevant than ever.
                      </p>
                      <Link href="/foreclosures">
                        <LiquidButton size="lg">
                          Learn About Your Options
                        </LiquidButton>
                      </Link>
                    </div>

                    {/* Analysis */}
                    <div className="rounded-2xl border border-white/20 md:border-white/10 bg-white/5 p-4 md:p-6 backdrop-blur-xl will-change-transform">
                      <h3 className="mb-3 font-serif text-lg font-light text-white">Analysis</h3>
                      <p className="font-sans text-sm font-light leading-relaxed text-white/60">
                        Central Valley foreclosure filings have risen 32% year-over-year, with 545 Notices of
                        Default recorded in Q2 2025 alone. This trend is driven by pandemic-era forbearance
                        expirations and adjustable-rate mortgage resets. For investors, this represents a
                        significant opportunity to acquire below-market properties. For homeowners, AB 2424
                        provides a critical safety net &mdash; the ability to list with an agent before the
                        trustee sale date, preserving equity that would otherwise be lost.
                      </p>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>

            {/* ── Right Sidebar ────────────────────────────────────────── */}
            <aside className="space-y-6">
              {/* Agent Card */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="sticky top-28 space-y-6"
              >
                <div className="rounded-2xl border border-white/20 md:border-white/10 bg-white/5 p-4 md:p-6 backdrop-blur-xl will-change-transform">
                  <div className="mb-4 flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full border border-[#C5A059]/30 bg-[#C5A059]/10">
                      <span className="font-serif text-xl" style={{ color: GOLD }}>AG</span>
                    </div>
                    <div>
                      <p className="font-serif text-lg font-light text-white">{SITE_CONFIG.name}</p>
                      <p className="font-sans text-[10px] uppercase tracking-[0.15em] text-white/40">
                        {SITE_CONFIG.title}
                      </p>
                    </div>
                  </div>

                  <p className="mb-4 font-sans text-xs leading-relaxed text-white/50">
                    18 years in the medical field — from Valley Children&apos;s in Madera to
                    Senior Nursing Assistant at Kaiser Permanente Fresno. Now leveraging that
                    precision and empathy to serve Central Valley investors and homeowners.
                  </p>

                  <div className="mb-4 space-y-2.5">
                    <a href={`tel:+1${SITE_CONFIG.phone.replace(/\D/g, "")}`} className="flex items-center gap-3 font-sans text-xs text-white/50 transition-colors hover:text-[#C5A059]">
                      <Phone className="h-3.5 w-3.5" />
                      {SITE_CONFIG.phone}
                    </a>
                    <a href={`mailto:${SITE_CONFIG.email}`} className="flex items-center gap-3 font-sans text-xs text-white/50 transition-colors hover:text-[#C5A059]">
                      <Mail className="h-3.5 w-3.5" />
                      {SITE_CONFIG.email}
                    </a>
                  </div>

                  <SocialLinks />

                  <p className="mt-4 font-sans text-[10px] uppercase tracking-[0.15em] text-white/20">
                    DRE #{SITE_CONFIG.dreNumber}
                  </p>
                </div>

                {/* Quick Links */}
                <div className="rounded-2xl border border-white/20 md:border-white/10 bg-white/5 p-4 md:p-6 backdrop-blur-xl will-change-transform">
                  <p className="mb-4 font-sans text-[10px] uppercase tracking-[0.2em] text-white/40">
                    Quick Tools
                  </p>
                  <div className="flex flex-col gap-3">
                    <Link href="/home-valuation" className="font-sans text-sm text-white/50 transition-colors hover:text-[#C5A059]">
                      Home Valuation
                    </Link>
                    <Link href="/affordability-calculator" className="font-sans text-sm text-white/50 transition-colors hover:text-[#C5A059]">
                      Affordability Calculator
                    </Link>
                    <Link href="/foreclosures" className="font-sans text-sm text-white/50 transition-colors hover:text-[#C5A059]">
                      Foreclosure Options
                    </Link>
                    <Link href="/cash-offer" className="font-sans text-sm text-white/50 transition-colors hover:text-[#C5A059]">
                      Cash Offer
                    </Link>
                  </div>
                </div>
              </motion.div>
            </aside>
          </div>
        </div>
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

export default function BlogClient() {
  return (
    <LeadModalProvider>
      <BlogContent />
    </LeadModalProvider>
  );
}
