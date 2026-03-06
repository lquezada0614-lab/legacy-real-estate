"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { LuxuryBackground } from "@/components/ui/luxury-background";
import { AIInputWithLoading } from "@/components/ui/ai-input-with-loading";

const stats = [
  { value: "18", label: "Years Medical" },
  { value: "Top 1%", label: "Client Service" },
  { value: "DRE", label: "#02207755" },
];

export function AboutSection() {
  const [messages, setMessages] = useState<
    { question: string; answer: string }[]
  >([]);

  async function handleAISubmit(question: string) {
    console.log("[LEAD] AI Inquiry:", question);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setMessages((prev) => [
      ...prev,
      {
        question,
        answer: `Thanks! I've received your inquiry about "${question}". I'll reach out to you soon!`,
      },
    ]);
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Legacy Real Estate Inc",
    description:
      "Luxury real estate brokerage serving California's Central Valley — Fresno, Visalia, Tulare, Orosi, Dinuba & Reedley.",
    url: "https://www.alejandrahomes.org",
    telephone: "+15599811026",
    email: "alegonz086@gmail.com",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Fresno",
      addressRegion: "CA",
      addressCountry: "US",
    },
    broker: {
      "@type": "Person",
      name: "Leo Quezada",
      jobTitle: "Broker",
      identifier: "DRE #02165291",
    },
    employee: {
      "@type": "Person",
      name: "Alejandra Gonzalez",
      jobTitle: "Partner & Real Estate Investor",
      identifier: "DRE #02207755",
    },
    areaServed: [
      "Fresno", "Visalia", "Tulare", "Orosi", "Dinuba", "Reedley",
    ],
    sameAs: [
      "https://www.instagram.com/alejandra.gzlz_",
      "https://www.facebook.com/alejandra.gonzalez.625115",
    ],
  };

  return (
    <section id="about" className="relative overflow-hidden bg-neutral-900 py-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <LuxuryBackground />
      <div className="relative z-10 mx-auto grid min-h-screen max-w-7xl grid-cols-1 lg:grid-cols-2">
        {/* Left — Portrait */}
        <div className="relative min-h-[60vh] lg:min-h-screen">
          <motion.img
            initial={{ opacity: 0, scale: 1.05 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2 }}
            viewport={{ once: true }}
            src="/images/alejandra-portrait.jpg"
            alt="Alejandra Gonzalez — Legacy Real Estate agent serving Orosi, Dinuba, and Reedley in California's Central Valley"
            className="h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-neutral-900/80 lg:block hidden" />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent lg:hidden" />
        </div>

        {/* Right — Editorial Copy */}
        <div className="relative flex flex-col justify-center px-6 py-20 md:px-16 lg:py-0">
          {/* Gold vertical accent line */}
          <div className="absolute left-0 top-1/2 hidden h-32 w-px -translate-y-1/2 bg-gold/40 lg:block" />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mb-6 font-sans text-xs uppercase tracking-[0.3em] text-gold"
          >
            The Story
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            viewport={{ once: true }}
            className="mb-8 font-serif text-4xl font-light leading-tight tracking-tight text-white md:text-5xl lg:text-6xl"
          >
            From Critical Care
            <br />
            to Critical{" "}
            <span className="italic text-gold">Investments.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="mb-12 max-w-lg space-y-4"
          >
            <p className="font-sans text-sm font-light leading-relaxed text-white/70">
              With 18 years in the medical field — from 7 years as a Nursing
              Assistant at Valley Children&apos;s in Madera to her current role as
              Senior Nursing Assistant at Kaiser Permanente in Fresno — Alejandra
              Gonzalez brings unparalleled precision and composure to every real
              estate transaction.
            </p>
            <p className="font-sans text-sm font-light leading-relaxed text-white/70">
              Specializing in California&apos;s Central Valley, she bridges the
              gap between healthcare professionals seeking wealth-building
              opportunities and the luxury properties that deliver lasting
              returns.
            </p>
          </motion.div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="flex gap-12 border-t border-white/10 pt-8"
          >
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-2xl font-light text-white md:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 font-sans text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>

          {/* AI Input Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="mt-12 max-w-lg"
          >
            <h3 className="mb-4 font-serif text-xl font-light text-white md:text-2xl">
              Ask me about the{" "}
              <span className="italic text-gold">Central Valley Market</span>
            </h3>

            {messages.length > 0 && (
              <div className="mb-4 max-h-48 space-y-3 overflow-y-auto">
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className="rounded-lg border border-white/5 bg-white/5 p-3"
                  >
                    <p className="text-xs text-white/40 mb-1">
                      You asked: &ldquo;{msg.question}&rdquo;
                    </p>
                    <p className="text-sm text-[#C5A059]">{msg.answer}</p>
                  </div>
                ))}
              </div>
            )}

            <AIInputWithLoading onSubmit={handleAISubmit} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
