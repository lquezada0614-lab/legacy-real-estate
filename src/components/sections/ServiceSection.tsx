"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";

const services = [
  {
    index: "01",
    title: "THE NURSE",
    subtitle: "18 Years in Medical",
    description:
      "A career built on patient advocacy, meticulous attention to detail, and genuine care. These skills transfer directly to protecting your real estate interests.",
    gradient: "from-gold-dark/20 via-transparent to-transparent",
  },
  {
    index: "02",
    title: "THE AGENT",
    subtitle: "DRE Licensed",
    description:
      "Licensed with Legacy Real Estate. Expert market knowledge, strategic negotiations, and unwavering dedication to your goals.",
    gradient: "from-transparent via-gold/10 to-transparent",
  },
  {
    index: "03",
    title: "THE GUIDE",
    subtitle: "Active Investor",
    description:
      "Not just advice — proven results. Active real estate investor with a portfolio spanning flips, Airbnbs, and long-term rentals.",
    gradient: "from-transparent via-transparent to-gold-dark/20",
  },
];

export default function ServiceSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="services" className="relative bg-luxury-black py-24 md:py-32 overflow-hidden">
      {/* Animated background gradient based on active card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className={`absolute inset-0 bg-gradient-to-r ${services[activeIndex].gradient}`}
        />
      </AnimatePresence>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <ScrollReveal>
          <div className="mb-16 md:mb-24">
            <p className="text-editorial mb-4">What Sets Us Apart</p>
            <h2 className="font-serif font-normal text-display-lg text-gold-gradient tracking-tighter">
              Services
            </h2>
          </div>
        </ScrollReveal>

        {/* Service cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ScrollReveal key={service.index} delay={i * 0.15}>
              <motion.div
                onMouseEnter={() => setActiveIndex(i)}
                className={`group relative p-8 md:p-10 border transition-all duration-500 cursor-default ${
                  activeIndex === i
                    ? "border-gold/40 bg-white/[0.02]"
                    : "border-white/10 hover:border-white/20"
                }`}
              >
                {/* Index number */}
                <span className="text-editorial text-gold/40 block mb-8">
                  {service.index}
                </span>

                {/* Title */}
                <h3 className="font-serif font-normal text-2xl md:text-3xl text-white tracking-tight mb-2">
                  {service.title}
                </h3>

                {/* Subtitle */}
                <p className="text-editorial text-gold mb-6">
                  {service.subtitle}
                </p>

                {/* Thin gold line */}
                <div
                  className={`h-px mb-6 transition-all duration-500 ${
                    activeIndex === i
                      ? "w-16 bg-gold"
                      : "w-8 bg-white/20"
                  }`}
                />

                {/* Description */}
                <p className="text-white/40 font-body text-sm leading-relaxed">
                  {service.description}
                </p>

                {/* Active indicator dot */}
                <div
                  className={`absolute top-8 right-8 w-2 h-2 rounded-full transition-all duration-500 ${
                    activeIndex === i
                      ? "bg-gold scale-100"
                      : "bg-transparent scale-0"
                  }`}
                />
              </motion.div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
