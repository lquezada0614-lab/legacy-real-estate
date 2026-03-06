"use client";

import { useState } from "react";
import { Home, Calculator, CheckCircle } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GoldButton from "@/components/ui/GoldButton";
import { formatPrice, calculateMonthlyPayment, calculateMaxPurchasePrice } from "@/lib/utils";

export default function ToolsSection() {
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [income, setIncome] = useState(100000);
  const [downPayment, setDownPayment] = useState(50000);
  const [rate, setRate] = useState(6.5);
  const [monthlyRent, setMonthlyRent] = useState(2500);

  const maxPrice = calculateMaxPurchasePrice(income, downPayment, rate);
  const loanAmount = maxPrice - downPayment;
  const monthlyPayment = calculateMonthlyPayment(loanAmount, rate);
  const grossYield = maxPrice > 0 ? ((monthlyRent * 12) / maxPrice) * 100 : 0;

  const handleValuationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (address && email) {
      setSubmitted(true);
    }
  };

  const inputClasses =
    "w-full bg-luxury-charcoal border border-white/10 px-4 py-3 font-body text-sm text-white placeholder:text-white/20 focus:outline-none focus:border-gold/50 focus:ring-1 focus:ring-gold/30 transition-colors";

  return (
    <section id="tools" className="bg-luxury-black py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-16 md:mb-20">
            <p className="text-editorial mb-4">Interactive Tools</p>
            <h2 className="font-serif font-normal text-display-lg text-gold-gradient tracking-tighter">
              Your Toolkit
            </h2>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Home Valuation Card */}
          <ScrollReveal direction="left" delay={0.1}>
            <div className="bg-luxury-surface border border-white/5 hover:border-gold/20 p-8 transition-all duration-500 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 border border-gold/30 flex items-center justify-center">
                  <Home className="w-4 h-4 text-gold" />
                </div>
                <h3 className="font-heading text-sm uppercase tracking-wider text-white">
                  What&apos;s Your Home Worth?
                </h3>
              </div>

              <p className="text-white/30 font-body text-sm mb-6 leading-relaxed">
                Don&apos;t trust an algorithm. Get a valuation from an active
                investor who understands the real market.
              </p>

              {submitted ? (
                <div className="flex flex-col items-center py-8 text-center">
                  <CheckCircle className="w-10 h-10 text-emerald-500/80 mb-4" />
                  <p className="font-heading text-sm uppercase tracking-wider text-white mb-2">
                    Request Received
                  </p>
                  <p className="text-white/30 font-body text-sm">
                    I&apos;ll personally review your property and send results
                    within 24 hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleValuationSubmit} className="space-y-4">
                  <input
                    type="text"
                    placeholder="Enter your property address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className={inputClasses}
                    required
                  />
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClasses}
                    required
                  />
                  <GoldButton className="w-full">
                    Get My Free Valuation
                  </GoldButton>
                  <p className="text-white/15 text-[0.65rem] font-body text-center uppercase tracking-wider">
                    No obligation. Results delivered in 24 hours.
                  </p>
                </form>
              )}
            </div>
          </ScrollReveal>

          {/* Affordability Calculator Card */}
          <ScrollReveal direction="right" delay={0.2}>
            <div className="bg-luxury-surface border border-white/5 hover:border-gold/20 p-8 transition-all duration-500 h-full">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-9 h-9 border border-gold/30 flex items-center justify-center">
                  <Calculator className="w-4 h-4 text-gold" />
                </div>
                <h3 className="font-heading text-sm uppercase tracking-wider text-white">
                  Affordability & Yield
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-editorial text-white/20 mb-1 block">
                    Annual Income
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-sm">
                      $
                    </span>
                    <input
                      type="number"
                      value={income}
                      onChange={(e) => setIncome(Number(e.target.value))}
                      className={`${inputClasses} pl-7`}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-editorial text-white/20 mb-1 block">
                    Down Payment
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-sm">
                      $
                    </span>
                    <input
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className={`${inputClasses} pl-7`}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-editorial text-white/20 mb-1 block">
                    Interest Rate
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      step="0.1"
                      value={rate}
                      onChange={(e) => setRate(Number(e.target.value))}
                      className={`${inputClasses} pr-7`}
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-white/20 text-sm">
                      %
                    </span>
                  </div>
                </div>

                <div>
                  <label className="text-editorial text-white/20 mb-1 block">
                    Expected Monthly Rent
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20 text-sm">
                      $
                    </span>
                    <input
                      type="number"
                      value={monthlyRent}
                      onChange={(e) => setMonthlyRent(Number(e.target.value))}
                      className={`${inputClasses} pl-7`}
                    />
                  </div>
                </div>

                {/* Results */}
                <div className="mt-6 pt-4 border-t border-white/5 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-editorial text-white/20">
                      Max Purchase Price
                    </span>
                    <span className="font-heading font-medium text-gold text-sm">
                      {formatPrice(Math.round(maxPrice))}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-editorial text-white/20">
                      Est. Monthly Payment
                    </span>
                    <span className="font-heading font-medium text-white/60 text-sm">
                      {formatPrice(Math.round(monthlyPayment))}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-editorial text-white/20">
                      Gross Rental Yield
                    </span>
                    <span className="font-heading font-medium text-emerald-500/80 text-sm">
                      {grossYield.toFixed(1)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
