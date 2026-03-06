"use client";

import Image from "next/image";
import { HeartPulse, Award, TrendingUp } from "lucide-react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GoldDivider from "@/components/ui/GoldDivider";

const stats = [
  { icon: HeartPulse, value: "18", label: "Years in Medical" },
  { icon: Award, value: "Licensed", label: "Real Estate Agent" },
  { icon: TrendingUp, value: "Active", label: "Investor & Host" },
];

export default function AboutSection() {
  return (
    <section id="about" className="bg-luxury-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[600px]">
        {/* Left: Headshot Panel */}
        <ScrollReveal direction="left" className="h-full">
          <div className="bg-luxury-charcoal h-full flex items-center justify-center py-16 px-8 lg:py-0">
            <div className="relative">
              {/* Gold ring decoration */}
              <div className="absolute -inset-4 rounded-full border border-gold/20" />
              <div className="w-56 h-56 md:w-72 md:h-72 rounded-full border-2 border-gold bg-luxury-darkGray flex items-center justify-center overflow-hidden">
                <Image
                  src="/images/headshot.jpg"
                  alt="Alejandra Gonzalez - Partner & Real Estate Investor"
                  width={288}
                  height={288}
                  className="object-cover w-full h-full"
                  priority
                />
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Right: Text Panel */}
        <ScrollReveal direction="right" className="h-full">
          <div className="flex flex-col justify-center py-16 px-8 lg:px-16">
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-gold" />
              <span className="text-gold font-heading text-sm font-semibold uppercase tracking-widest">
                About
              </span>
            </div>

            <h2 className="font-heading text-3xl md:text-4xl font-bold text-luxury-charcoal mb-6">
              From Bedside to Business
            </h2>

            <p className="text-luxury-mediumGray font-body text-base leading-relaxed mb-4">
              For 18 years, I&apos;ve dedicated my career to the medical field —
              starting as a Nursing Assistant at Valley Children&apos;s in Madera
              for 7 years, and now serving as a Senior Nursing Assistant at
              Kaiser Permanente in Fresno. That experience didn&apos;t just shape
              my character — it became the foundation of my real estate practice.
            </p>

            <p className="text-luxury-mediumGray font-body text-base leading-relaxed mb-8">
              Real estate requires the same patience, advocacy, and attention to
              detail as the medical field. I don&apos;t just close deals — I take
              care of people. Whether you&apos;re buying your first home,
              investing in rental properties, or looking to build generational
              wealth, I bring the same level of dedication and precision that
              kept my patients safe.
            </p>

            <GoldDivider className="mb-8 justify-start" />

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <stat.icon className="w-6 h-6 text-gold mx-auto mb-2" />
                  <p className="font-heading font-bold text-xl text-luxury-charcoal">
                    {stat.value}
                  </p>
                  <p className="text-luxury-mediumGray text-xs font-body mt-1">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
