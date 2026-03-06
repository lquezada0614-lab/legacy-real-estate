"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import PropertyCard from "@/components/ui/PropertyCard";
import { listings } from "@/lib/data/listings";

const filters = [
  { label: "All", value: "all" },
  { label: "For Sale", value: "for-sale" },
  { label: "For Rent", value: "for-rent" },
  { label: "Investment", value: "investment" },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" as const },
  },
};

export default function ListingsGrid() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = listings.filter((listing) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "investment") return listing.type === "multi-family";
    return listing.status === activeFilter;
  });

  return (
    <section id="listings" className="bg-luxury-black py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial section header */}
        <ScrollReveal>
          <div className="mb-16 md:mb-20">
            <p className="text-editorial mb-4">Featured Collection</p>
            <h2 className="font-serif font-normal text-display-lg text-gold-gradient tracking-tighter">
              Properties
            </h2>
          </div>
        </ScrollReveal>

        {/* Filter Tabs */}
        <div className="flex items-center gap-8 mb-12 border-b border-white/5 pb-4">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`font-heading text-[0.65rem] uppercase tracking-[0.2em] pb-2 border-b-2 transition-all duration-300 -mb-[18px] ${
                activeFilter === filter.value
                  ? "border-gold text-gold"
                  : "border-transparent text-white/30 hover:text-white/60"
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Offset Grid */}
        <motion.div
          key={activeFilter}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {filtered.map((listing, i) => (
            <motion.div
              key={listing.id}
              variants={itemVariants}
              className={i % 5 === 0 ? "sm:row-span-2" : ""}
            >
              <PropertyCard listing={listing} featured={i % 5 === 0} />
            </motion.div>
          ))}
        </motion.div>

        {filtered.length === 0 && (
          <p className="text-center text-white/30 font-body py-16">
            No properties found in this category.
          </p>
        )}
      </div>
    </section>
  );
}
