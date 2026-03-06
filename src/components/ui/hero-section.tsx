"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { LiquidButton } from "@/components/ui/liquid-glass-button";
import { useLeadModal } from "@/components/ui/LeadModal";

export function HeroSection() {
  const { open: openModal } = useLeadModal();

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-neutral-950 text-white flex flex-col md:flex-row">

      {/* LEFT SIDE: CONTENT */}
      <div className="relative z-20 flex w-full flex-col justify-center px-5 py-24 md:h-full md:w-1/2 md:px-20 md:py-0 bg-neutral-950">
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-4 md:mb-6 font-sans text-[10px] md:text-xs uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#C5A059]"
        >
          Legacy Real Estate Inc • DRE #02165291
        </motion.p>

        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.6, duration: 1, type: "spring", stiffness: 50 }}
            className="font-serif text-4xl md:text-7xl lg:text-8xl font-light leading-[1.1] tracking-tight text-white mb-2"
          >
            Building <br />
            <span className="text-[#C5A059] italic">Wealth.</span>
          </motion.h1>
        </div>

        <div className="overflow-hidden pb-3 mb-6 md:mb-8">
          <motion.h1
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            transition={{ delay: 0.8, duration: 1, type: "spring", stiffness: 50 }}
            className="font-serif text-3xl md:text-7xl lg:text-8xl font-light leading-[1.1] tracking-tight text-white"
          >
            Delivering <span className="italic text-white/50">Care.</span>
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="max-w-md border-l border-white/20 pl-6"
        >
           <p className="font-sans text-sm font-light leading-relaxed text-white/70 mb-8">
             Bridging the gap between critical care and critical investments.
             A real estate journey defined by precision, empathy, and strategy.
           </p>

           <div className="flex flex-col items-start gap-6">
             <button
               onClick={openModal}
               className="group flex items-center gap-4 text-sm uppercase tracking-widest text-white hover:text-[#C5A059] transition-colors min-h-[44px]"
             >
               Book Consultation
               <span className="block h-[1px] w-12 bg-white group-hover:w-20 group-hover:bg-[#C5A059] transition-all duration-300" />
             </button>

             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-xl">
               <Link href="/home-valuation">
                 <LiquidButton size="hero" className="w-full">
                   Home Valuation
                 </LiquidButton>
               </Link>

               <Link href="/affordability-calculator">
                 <LiquidButton size="hero" className="w-full">
                   Affordability Calculator
                 </LiquidButton>
               </Link>

               <Link href="/foreclosures">
                 <LiquidButton size="hero" className="w-full">
                   Foreclosures
                 </LiquidButton>
               </Link>

               <Link href="/cash-offer">
                 <LiquidButton size="hero" className="w-full">
                   Cash Offer
                 </LiquidButton>
               </Link>
             </div>
           </div>
        </motion.div>
      </div>

      {/* RIGHT SIDE: VIDEO LOOP */}
      <div className="relative h-[40vh] w-full md:h-full md:w-1/2 bg-neutral-900">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 1.5 }}
           className="h-full w-full"
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source src="/videos/luxury-tour.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-transparent opacity-50" />
        </motion.div>
      </div>
    </div>
  );
}
