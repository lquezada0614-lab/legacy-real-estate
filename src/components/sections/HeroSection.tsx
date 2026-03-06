"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import GoldButton from "@/components/ui/GoldButton";
import BlueprintBackground from "@/components/ui/BlueprintBackground";

const slideUp = {
  hidden: { opacity: 0, y: 100 },
  visible: (delay: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] },
  }),
};

export default function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen bg-luxury-black overflow-hidden"
    >
      <BlueprintBackground />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] min-h-screen">
        {/* Left: Text content */}
        <div className="flex flex-col justify-center px-6 sm:px-10 lg:px-16 xl:px-24 py-32 lg:py-20">
          {/* Overline */}
          <motion.p
            custom={0.2}
            initial="hidden"
            animate="visible"
            variants={slideUp}
            className="text-editorial mb-8 lg:mb-12"
          >
            Legacy Real Estate
          </motion.p>

          {/* Main headline */}
          <div className="hero-heading">
            <motion.h1
              custom={0.4}
              initial="hidden"
              animate="visible"
              variants={slideUp}
              className="font-serif font-normal text-display-xl text-gold-gradient"
            >
              Building
            </motion.h1>

            <motion.h1
              custom={0.6}
              initial="hidden"
              animate="visible"
              variants={slideUp}
              className="font-serif font-normal text-display-xl text-gold-gradient -mt-1 sm:-mt-2"
            >
              Wealth<span className="text-gold-light">.</span>
            </motion.h1>
          </div>

          {/* Subtitle */}
          <motion.p
            custom={0.9}
            initial="hidden"
            animate="visible"
            variants={slideUp}
            className="font-serif italic font-normal text-gold-light/60 tracking-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl mt-4 lg:mt-6"
          >
            Delivering Care.
          </motion.p>

          {/* Thin gold line */}
          <motion.div
            custom={1.0}
            initial="hidden"
            animate="visible"
            variants={slideUp}
            className="h-px w-16 bg-gold/40 mt-8 lg:mt-12"
          />

          {/* Body text */}
          <motion.p
            custom={1.1}
            initial="hidden"
            animate="visible"
            variants={slideUp}
            className="text-white/40 font-body text-sm sm:text-base max-w-md mt-6 leading-relaxed"
          >
            From 18 years in the medical field to expert real estate investing.
            Your advocate in the market.
          </motion.p>

          {/* CTA */}
          <motion.div
            custom={1.3}
            initial="hidden"
            animate="visible"
            variants={slideUp}
            className="mt-8 lg:mt-12"
          >
            <GoldButton href="#listings" size="lg">
              Explore Properties
            </GoldButton>
          </motion.div>
        </div>

        {/* Right: Cinematic image */}
        <div className="relative hidden lg:block overflow-hidden">
          <div className="absolute inset-0 animate-slow-zoom">
            <Image
              src="/images/headshot.jpg"
              alt="Alejandra Gonzalez - Partner & Real Estate Investor"
              fill
              className="object-cover"
              priority
              sizes="(min-width: 1024px) 45vw, 0vw"
            />
          </div>
          {/* Left-edge gradient overlay */}
          <div className="absolute inset-0 bg-hero-overlay" />
          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-luxury-black to-transparent" />
        </div>
      </div>
    </section>
  );
}
