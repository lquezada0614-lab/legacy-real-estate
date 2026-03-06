"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { LiquidButton } from "@/components/ui/liquid-glass-button";

/*
 * TODO: IDX/MLS Embed Integration
 * Replace the placeholder listings below with a live IDX feed or MLS embed script.
 * Options:
 *   - iHomefinder / IDX Broker embed <script> tag
 *   - Spark API / RETS feed via server action
 *   - Manual CSV import from MLS export
 * When ready, swap the `cityListings` data with real API responses.
 */

type City = "Visalia" | "Fresno" | "Tulare" | "Dinuba";

interface Listing {
  id: number;
  address: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
}

const cityZillowUrls: Record<City, string> = {
  Visalia: "https://www.zillow.com/visalia-ca/",
  Fresno: "https://www.zillow.com/fresno-ca/",
  Tulare: "https://www.zillow.com/tulare-ca/",
  Dinuba: "https://www.zillow.com/dinuba-ca/",
};

const cityListings: Record<City, Listing[]> = {
  Visalia: [
    { id: 1, address: "3201 S Mooney Blvd", price: "$485,000", beds: 4, baths: 2, sqft: "2,100", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop" },
    { id: 2, address: "1520 W Caldwell Ave", price: "$375,000", beds: 3, baths: 2, sqft: "1,650", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop" },
    { id: 3, address: "4810 W Whitendale Ave", price: "$520,000", beds: 4, baths: 3, sqft: "2,400", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop" },
    { id: 4, address: "2200 S Court St", price: "$310,000", beds: 3, baths: 2, sqft: "1,450", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=800&auto=format&fit=crop" },
  ],
  Fresno: [
    { id: 5, address: "4821 N Van Ness Blvd", price: "$1,250,000", beds: 5, baths: 4, sqft: "4,200", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop" },
    { id: 6, address: "1903 E Huntington Blvd", price: "$720,000", beds: 3, baths: 2, sqft: "2,400", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop" },
    { id: 7, address: "6330 N Palm Ave", price: "$590,000", beds: 4, baths: 3, sqft: "2,800", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop" },
    { id: 8, address: "2901 E Shields Ave", price: "$445,000", beds: 3, baths: 2, sqft: "1,900", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=800&auto=format&fit=crop" },
    { id: 9, address: "7744 N First St", price: "$680,000", beds: 4, baths: 3, sqft: "3,100", image: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?q=80&w=800&auto=format&fit=crop" },
  ],
  Tulare: [
    { id: 10, address: "850 E Prosperity Ave", price: "$340,000", beds: 3, baths: 2, sqft: "1,600", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop" },
    { id: 11, address: "1425 S Blackstone St", price: "$298,000", beds: 3, baths: 2, sqft: "1,400", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=800&auto=format&fit=crop" },
    { id: 12, address: "2200 W Tulare Ave", price: "$415,000", beds: 4, baths: 2, sqft: "2,000", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop" },
    { id: 13, address: "560 N Cherry St", price: "$275,000", beds: 2, baths: 1, sqft: "1,100", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop" },
  ],
  Dinuba: [
    { id: 14, address: "1130 E El Monte Way", price: "$320,000", beds: 3, baths: 2, sqft: "1,500", image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=800&auto=format&fit=crop" },
    { id: 15, address: "450 S Alta Ave", price: "$285,000", beds: 3, baths: 2, sqft: "1,350", image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=800&auto=format&fit=crop" },
    { id: 16, address: "900 W Tulare St", price: "$365,000", beds: 4, baths: 2, sqft: "1,800", image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop" },
    { id: 17, address: "220 N L St", price: "$248,000", beds: 2, baths: 1, sqft: "1,050", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&auto=format&fit=crop" },
  ],
};

const cities: City[] = ["Visalia", "Fresno", "Tulare", "Dinuba"];

export function ExclusivePortfolio() {
  const [activeCity, setActiveCity] = useState<City>("Visalia");
  const listings = cityListings[activeCity];

  return (
    <section className="relative bg-neutral-950 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="mb-16 text-center">
          <p className="mb-4 font-sans text-xs uppercase tracking-[0.3em] text-[#C5A059]">
            Exclusive Portfolio &bull; NR.2
          </p>
          <h2 className="font-serif text-4xl font-light tracking-tight text-white md:text-6xl">
            Central Valley{" "}
            <span className="italic text-[#C5A059]">Homes</span>
          </h2>
        </div>

        {/* City Tabs — Glassmorphism (horizontally scrollable on mobile) */}
        <div className="mb-12 flex justify-center">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide rounded-xl border border-white/20 md:border-white/10 bg-white/5 p-1.5 backdrop-blur-sm will-change-transform max-w-full">
            {cities.map((city) => (
              <button
                key={city}
                onClick={() => setActiveCity(city)}
                className={`relative shrink-0 rounded-lg px-5 py-3 min-h-[44px] font-sans text-xs uppercase tracking-[0.15em] transition-all duration-300 ${
                  activeCity === city
                    ? "bg-[#C5A059]/20 text-[#C5A059] shadow-[0_0_12px_rgba(197,160,89,0.15)]"
                    : "text-white/40 hover:text-white/70"
                }`}
              >
                {activeCity === city && (
                  <motion.span
                    layoutId="city-tab-bg"
                    className="absolute inset-0 rounded-lg border border-[#C5A059]/30 bg-[#C5A059]/10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{city}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Listing Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCity}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {listings.map((listing) => (
              <div
                key={listing.id}
                className="group rounded-xl border border-white/20 md:border-white/10 bg-white/5 backdrop-blur-sm will-change-transform transition-all duration-500 hover:border-[#C5A059]/20 hover:shadow-[0_0_30px_rgba(197,160,89,0.06)]"
              >
                {/* Image */}
                <div className="relative aspect-[4/3] overflow-hidden rounded-t-xl bg-neutral-800">
                  <img
                    src={listing.image}
                    alt={`${listing.address} — Legacy Real Estate listing in Central Valley`}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className="absolute left-3 top-3 rounded-md bg-black/60 px-2.5 py-1 font-sans text-[10px] uppercase tracking-[0.15em] text-[#C5A059] backdrop-blur-sm">
                    {activeCity}, CA
                  </span>
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <p className="font-serif text-2xl font-light text-white">
                    {listing.price}
                  </p>
                  <p className="mt-1 font-sans text-xs text-white/50">
                    {listing.address}
                  </p>
                  <div className="mt-3 flex gap-4 font-sans text-[10px] uppercase tracking-[0.15em] text-white/30">
                    <span>{listing.beds} Beds</span>
                    <span>{listing.baths} Baths</span>
                    <span>{listing.sqft} Sqft</span>
                  </div>

                  <div className="mt-5">
                    <Link
                      href={cityZillowUrls[activeCity]}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <LiquidButton size="sm" className="w-full">
                        View Details
                      </LiquidButton>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Browse All CTA */}
        <div className="mt-12 text-center">
          <Link
            href={cityZillowUrls[activeCity]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-sans text-xs uppercase tracking-[0.2em] text-white/40 transition-colors hover:text-[#C5A059]"
          >
            Browse All {activeCity} Listings
            <span className="block h-px w-10 bg-current transition-all" />
          </Link>
        </div>
      </div>
    </section>
  );
}
