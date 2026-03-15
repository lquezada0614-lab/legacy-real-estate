"use client";

import { motion } from "framer-motion";
import Script from "next/script";

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
          <h2 className="font-serif text-3xl font-light tracking-tight text-white md:text-5xl lg:text-6xl">
            What My Clients{" "}
            <span className="italic text-[#C5A059]">Say.</span>
          </h2>
        </motion.div>

        {/* Elfsight Google Reviews Widget */}
        <Script
          src="https://elfsightcdn.com/platform.js"
          strategy="lazyOnload"
        />
        <div
          className="elfsight-app-b88b6ca0-3139-4f0a-8e2d-adb06dc825fb"
          data-elfsight-app-lazy
        />
      </div>
    </section>
  );
}
