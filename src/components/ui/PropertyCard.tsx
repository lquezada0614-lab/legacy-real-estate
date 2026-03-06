"use client";

import { motion } from "framer-motion";
import type { Listing } from "@/types";
import { formatPrice } from "@/lib/utils";

interface PropertyCardProps {
  listing: Listing;
  featured?: boolean;
}

export default function PropertyCard({
  listing,
  featured = false,
}: PropertyCardProps) {
  const statusConfig = {
    "for-sale": { label: "For Sale", bg: "bg-gold/90", text: "text-luxury-black" },
    "for-rent": { label: "For Rent", bg: "bg-white/10", text: "text-white" },
    pending: { label: "Pending", bg: "bg-luxury-red/80", text: "text-white" },
    sold: { label: "Sold", bg: "bg-luxury-darkGray", text: "text-white/60" },
  };

  const status = statusConfig[listing.status];
  const isRental = listing.status === "for-rent";

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={`group bg-luxury-surface border border-white/5 hover:border-gold/30 transition-all duration-500 overflow-hidden ${
        featured ? "h-full" : ""
      }`}
    >
      {/* Top: Price & Address (editorial style) */}
      <div className="p-5 pb-3">
        <p className="font-heading text-xs uppercase tracking-[0.2em] text-gold/70 mb-1">
          {formatPrice(listing.price)}
          {isRental && (
            <span className="text-white/30 ml-1">/mo</span>
          )}
        </p>
        <p className="font-heading text-[0.6rem] uppercase tracking-[0.2em] text-white/30 truncate">
          {listing.address.street}, {listing.address.city}
        </p>
      </div>

      {/* Image area (portrait 3:4) */}
      <div
        className={`relative overflow-hidden ${
          featured ? "aspect-[3/5]" : "aspect-[3/4]"
        }`}
      >
        <div className="w-full h-full bg-gradient-to-br from-luxury-charcoal to-luxury-darkGray flex items-center justify-center">
          <span className="text-white/10 font-heading text-xs uppercase tracking-widest">
            Property
          </span>
        </div>

        {/* Status badge */}
        <span
          className={`absolute top-3 right-3 ${status.bg} ${status.text} text-[0.6rem] font-heading font-semibold uppercase tracking-wider px-3 py-1`}
        >
          {status.label}
        </span>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gold/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Bottom: Minimal stats */}
      <div className="p-5 pt-3 flex items-center gap-3 text-white/30 text-[0.65rem] font-heading uppercase tracking-[0.15em]">
        <span>{listing.beds}BD</span>
        <span className="w-px h-3 bg-white/10" />
        <span>{listing.baths}BA</span>
        <span className="w-px h-3 bg-white/10" />
        <span>{listing.sqft.toLocaleString()} SF</span>
      </div>
    </motion.div>
  );
}
