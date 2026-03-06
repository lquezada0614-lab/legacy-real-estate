"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function AffordabilityCalculatorPage() {
  const [income, setIncome] = useState(120000);
  const [debts, setDebts] = useState(500);
  const [downPayment, setDownPayment] = useState(50000);
  const [interestRate, setInterestRate] = useState(6.5);
  const [homePrice, setHomePrice] = useState(0);

  // Simple 28/36 Rule Calculation
  useEffect(() => {
    const monthlyIncome = income / 12;
    const maxFrontEnd = monthlyIncome * 0.28;
    const maxBackEnd = (monthlyIncome * 0.36) - debts;
    const maxMonthlyPayment = Math.min(maxFrontEnd, maxBackEnd);

    const r = interestRate / 100 / 12;
    const n = 30 * 12; // 30 Year Fixed

    if (r > 0 && maxMonthlyPayment > 0) {
      const discountFactor = (Math.pow(1 + r, n) - 1) / (r * Math.pow(1 + r, n));
      const maxLoan = maxMonthlyPayment * discountFactor;
      setHomePrice(Math.floor(maxLoan + downPayment));
    } else {
      setHomePrice(0);
    }
  }, [income, debts, downPayment, interestRate]);

  const monthlyPayment = (() => {
    const loan = Math.max(0, homePrice - downPayment);
    const r = interestRate / 100 / 12;
    const n = 30 * 12;
    if (r > 0 && loan > 0) {
      return Math.round((loan * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1));
    }
    return 0;
  })();

  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-[#C5A059] selection:text-black">
      <div className="container mx-auto px-6 py-32 flex flex-col items-center justify-center">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="font-sans text-xs uppercase tracking-[0.3em] text-[#C5A059] mb-4">
            Financial Planning
          </p>
          <h1 className="font-serif text-5xl md:text-7xl mb-6">
            Purchasing <span className="text-[#C5A059] italic">Power.</span>
          </h1>
          <p className="text-white/70 max-w-xl mx-auto font-light leading-relaxed">
            Understand your budget before you browse. This tool uses bank-standard ratios
            to estimate your comfortable price range.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full max-w-5xl">

          {/* INPUTS COLUMN */}
          <div className="bg-neutral-900/50 p-8 rounded-2xl border border-white/5 backdrop-blur-sm">
            <h3 className="font-serif text-2xl mb-8 border-b border-white/10 pb-4">Your Financials</h3>

            <div className="space-y-6">
              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Annual Household Income</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">$</span>
                  <input
                    type="number"
                    value={income}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-white/10 p-4 pl-8 rounded text-lg focus:border-[#C5A059] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Monthly Debts (Car, Cards, Loans)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">$</span>
                  <input
                    type="number"
                    value={debts}
                    onChange={(e) => setDebts(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-white/10 p-4 pl-8 rounded text-lg focus:border-[#C5A059] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Available Down Payment</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30">$</span>
                  <input
                    type="number"
                    value={downPayment}
                    onChange={(e) => setDownPayment(Number(e.target.value))}
                    className="w-full bg-neutral-950 border border-white/10 p-4 pl-8 rounded text-lg focus:border-[#C5A059] outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase tracking-widest text-white/50 mb-2">Interest Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                  className="w-full bg-neutral-950 border border-white/10 p-4 rounded text-lg focus:border-[#C5A059] outline-none transition-colors"
                />
              </div>
            </div>
          </div>

          {/* RESULTS COLUMN */}
          <div className="flex flex-col justify-center bg-[#C5A059] text-neutral-950 p-8 rounded-2xl relative overflow-hidden">
            <div className="relative z-10">
              <p className="text-neutral-900/60 uppercase tracking-widest text-sm font-semibold mb-2">Estimated Budget</p>
              <h2 className="font-serif text-6xl md:text-7xl lg:text-8xl font-medium tracking-tighter mb-4">
                ${homePrice.toLocaleString()}
              </h2>
              <p className="text-neutral-900/70 max-w-sm font-light leading-relaxed mb-8">
                Based on the 28/36 qualifying rule with a 30-year fixed mortgage at {interestRate}% interest.
              </p>

              <div className="grid grid-cols-2 gap-6 border-t border-neutral-900/20 pt-6">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-900/50 mb-1">Monthly Payment</p>
                  <p className="font-serif text-2xl">${monthlyPayment.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-900/50 mb-1">Down Payment</p>
                  <p className="font-serif text-2xl">${downPayment.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-900/50 mb-1">Loan Amount</p>
                  <p className="font-serif text-2xl">${Math.max(0, homePrice - downPayment).toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-neutral-900/50 mb-1">Loan Term</p>
                  <p className="font-serif text-2xl">30 Years</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <Link href="/" className="mt-12 text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors">
          &larr; Back to Home
        </Link>
      </div>
    </main>
  );
}
