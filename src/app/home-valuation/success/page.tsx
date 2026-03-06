"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";

function ResultContent() {
  const searchParams = useSearchParams();
  const price = searchParams.get("price") ?? "N/A";
  const zestimate = searchParams.get("zestimate") ?? "N/A";
  const address = searchParams.get("address") ?? "Unknown";

  const displayValue = zestimate !== "N/A" ? zestimate : price;
  const formatted =
    displayValue !== "N/A"
      ? `$${Number(displayValue).toLocaleString()}`
      : "Pending Analysis";

  return (
    <div className="container mx-auto px-6 py-32 flex flex-col items-center justify-center text-center">
      {/* Success badge */}
      <div className="mb-8 flex h-20 w-20 items-center justify-center rounded-full border-2 border-[#C5A059]/40 bg-[#C5A059]/10">
        <svg
          className="h-10 w-10 text-[#C5A059]"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>

      <p className="mb-2 font-sans text-xs uppercase tracking-[0.3em] text-[#C5A059]">
        Evaluation Complete
      </p>

      <h1 className="font-serif text-4xl md:text-6xl mb-4">
        Home Evaluation <span className="text-[#C5A059] italic">Result</span>
      </h1>

      <p className="text-white/50 text-sm mb-12 max-w-lg">
        Based on current Zillow data, here is the estimated value for the property you submitted.
      </p>

      {/* Result card */}
      <div className="w-full max-w-lg bg-neutral-900 border border-white/10 rounded-lg p-10">
        <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-2">
          Property Address
        </p>
        <p className="font-serif text-lg text-white mb-8">{address}</p>

        <div className="border-t border-white/10 pt-8">
          <p className="text-xs uppercase tracking-[0.2em] text-white/40 mb-3">
            Estimated Value
          </p>
          <p className="font-serif text-5xl md:text-7xl font-light text-[#C5A059]">
            {formatted}
          </p>
        </div>

        {price !== "N/A" && zestimate !== "N/A" && (
          <div className="mt-8 flex justify-center gap-12 border-t border-white/10 pt-8">
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-white/30 mb-1">
                List Price
              </p>
              <p className="font-serif text-xl text-white">
                ${Number(price).toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-white/30 mb-1">
                Zestimate
              </p>
              <p className="font-serif text-xl text-[#C5A059]">
                ${Number(zestimate).toLocaleString()}
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-12 flex flex-col items-center gap-4">
        <Link
          href="/home-valuation"
          className="border border-[#C5A059]/40 px-8 py-3 font-sans text-xs uppercase tracking-[0.2em] text-[#C5A059] transition-all hover:border-[#C5A059] hover:bg-[#C5A059]/10"
        >
          Evaluate Another Property
        </Link>
        <Link
          href="/"
          className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors"
        >
          &larr; Back to Home
        </Link>
      </div>
    </div>
  );
}

export default function HomeValuationSuccess() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans">
      <Suspense
        fallback={
          <div className="flex min-h-screen items-center justify-center">
            <p className="text-white/50">Loading results...</p>
          </div>
        }
      >
        <ResultContent />
      </Suspense>
    </main>
  );
}
