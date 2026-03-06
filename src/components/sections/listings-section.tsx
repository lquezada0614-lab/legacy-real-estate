"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ListingStatus = "Active" | "Sold" | "Leased";

interface Listing {
  id: number;
  address: string;
  city: string;
  price: string;
  beds: number;
  baths: number;
  sqft: string;
  image: string;
  status: ListingStatus;
}

const listings: Listing[] = [
  {
    id: 1,
    address: "4821 N Van Ness Blvd",
    city: "Fresno, CA",
    price: "$1,250,000",
    beds: 5,
    baths: 4,
    sqft: "4,200",
    image:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1200&auto=format&fit=crop",
    status: "Active",
  },
  {
    id: 2,
    address: "12755 Avenue 416",
    city: "Orosi, CA",
    price: "$875,000",
    beds: 4,
    baths: 3,
    sqft: "3,100",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
    status: "Active",
  },
  {
    id: 3,
    address: "1903 E Huntington Blvd",
    city: "Fresno, CA",
    price: "$720,000",
    beds: 3,
    baths: 2,
    sqft: "2,400",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
    status: "Sold",
  },
];

const tabs: ListingStatus[] = ["Active", "Sold", "Leased"];

export function ListingsSection() {
  const [activeTab, setActiveTab] = useState<ListingStatus>("Active");

  const filtered = listings.filter((l) => l.status === activeTab);

  return (
    <section id="listings" className="relative bg-neutral-950 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        {/* Header */}
        <div className="mb-16 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="mb-4 font-sans text-xs uppercase tracking-[0.3em] text-gold">
              Portfolio
            </p>
            <h2 className="font-serif text-4xl font-light tracking-tight text-white md:text-6xl">
              Exclusive <span className="italic">Listings</span>
            </h2>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative font-sans text-xs uppercase tracking-[0.2em] transition-colors ${
                  activeTab === tab ? "text-gold" : "text-white/40 hover:text-white/70"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.span
                    layoutId="tab-underline"
                    className="absolute -bottom-2 left-0 h-px w-full bg-gold"
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Listings Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {filtered.length > 0 ? (
              filtered.map((listing) => (
                <ListingCard key={listing.id} listing={listing} />
              ))
            ) : (
              <p className="col-span-full py-20 text-center font-sans text-sm text-white/30">
                No {activeTab.toLowerCase()} listings at this time.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}

function ListingCard({ listing }: { listing: Listing }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
      className="group cursor-pointer"
    >
      {/* Image — 3:4 portrait ratio */}
      <div className="relative aspect-[3/4] overflow-hidden bg-neutral-800">
        <img
          src={listing.image}
          alt={listing.address}
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100">
          <div className="w-full p-6">
            <button className="w-full border border-white/30 py-3 font-sans text-xs uppercase tracking-[0.2em] text-white transition-colors hover:border-gold hover:text-gold">
              View Details
            </button>
          </div>
        </div>
        {/* Status Badge */}
        <span className="absolute left-4 top-4 bg-black/60 px-3 py-1 font-sans text-[10px] uppercase tracking-[0.2em] text-gold backdrop-blur-sm">
          {listing.status}
        </span>
      </div>

      {/* Info */}
      <div className="mt-4">
        <p className="font-serif text-2xl font-light text-white">
          {listing.price}
        </p>
        <p className="mt-1 font-sans text-xs text-white/50">
          {listing.address}
        </p>
        <p className="font-sans text-xs text-white/30">{listing.city}</p>
        <div className="mt-3 flex gap-4 font-sans text-[10px] uppercase tracking-[0.15em] text-white/40">
          <span>{listing.beds} Beds</span>
          <span>{listing.baths} Baths</span>
          <span>{listing.sqft} Sqft</span>
        </div>
      </div>
    </motion.div>
  );
}
