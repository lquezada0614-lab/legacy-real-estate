"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface Testimonial {
  name: string;
  subtitle: string;
  avatar: string;
  rating: number;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    name: "Maria & Carlos Ramirez",
    subtitle: "First-Time Home Buyers",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    rating: 5,
    text: "Alejandra made buying our first home feel effortless. Her background in healthcare gave her this incredible calm under pressure — even when we hit a snag during escrow, she handled everything with precision.",
  },
  {
    name: "David Chen",
    subtitle: "Real Estate Investor",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    rating: 5,
    text: "Her expertise in the Central Valley market helped me close on my first investment property in record time. The rental comps and ROI projections she provided were spot-on. Already working on deal number two together.",
  },
  {
    name: "Sarah Thompson",
    subtitle: "Home Seller",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    rating: 5,
    text: "We listed with Alejandra and had multiple offers within the first week. She priced our home perfectly using real market data — not just guesswork. We sold for $40K over asking.",
  },
  {
    name: "James & Priya Patel",
    subtitle: "Relocating Family",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    rating: 5,
    text: "Moving from the Bay Area to Fresno was a big decision. Alejandra understood exactly what we needed and found us the perfect home in a neighborhood we love. She went above and beyond.",
  },
  {
    name: "Robert Nguyen",
    subtitle: "Healthcare Professional",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
    rating: 5,
    text: "As a fellow nurse, I trusted Alejandra immediately. She understands our schedules, our financial goals, and how to build wealth through real estate. She is the real deal.",
  },
  {
    name: "Linda Garcia",
    subtitle: "Repeat Buyer",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    rating: 5,
    text: "This is my third transaction with Alejandra. Every single time she delivers — incredible communication, sharp negotiation, and genuine care. I would not work with anyone else.",
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-3.5 w-3.5 ${
            i < count
              ? "fill-[#C5A059] text-[#C5A059]"
              : "fill-transparent text-white/20"
          }`}
        />
      ))}
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="relative bg-neutral-950 py-20 md:py-28">
      <div className="mx-auto max-w-7xl px-6 md:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-4 font-sans text-xs uppercase tracking-[0.3em] text-[#C5A059]">
            Testimonials
          </p>
          <h2 className="font-serif text-4xl font-light tracking-tight text-white md:text-5xl lg:text-6xl">
            What My Clients{" "}
            <span className="italic text-[#C5A059]">Say.</span>
          </h2>
        </motion.div>

        <div className="columns-1 gap-6 md:columns-2 lg:columns-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              viewport={{ once: true }}
              className="mb-6 break-inside-avoid rounded-xl border border-white/20 md:border-white/10 bg-white/5 p-6 backdrop-blur-sm will-change-transform"
            >
              <div className="mb-4 flex items-center gap-3">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="font-sans text-sm font-medium text-white">
                    {t.name}
                  </p>
                  <p className="font-sans text-[11px] text-white/40">
                    {t.subtitle}
                  </p>
                </div>
              </div>
              <StarRating count={t.rating} />
              <p className="mt-3 font-sans text-sm font-light leading-relaxed text-white/70">
                &ldquo;{t.text}&rdquo;
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
