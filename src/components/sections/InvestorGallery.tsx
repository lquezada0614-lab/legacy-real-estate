"use client";

import { motion } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import InvestmentCard from "@/components/ui/InvestmentCard";
import { investments } from "@/lib/data/investments";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
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

export default function InvestorGallery() {
  return (
    <section id="investments" className="bg-[#0A0A0A] py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="mb-16 md:mb-20">
            <p className="text-editorial mb-4">Investment Portfolio</p>
            <h2 className="font-serif font-normal text-display-lg text-gold-gradient tracking-tighter">
              Real Estate in Action
            </h2>
          </div>
        </ScrollReveal>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
        >
          {investments.map((project) => (
            <motion.div key={project.id} variants={itemVariants}>
              <InvestmentCard project={project} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
