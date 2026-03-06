"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";

const listings = [
  {
    id: 1,
    title: "The Orosi Estate",
    location: "Orosi, CA • Central Valley",
    price: "$2,450,000",
    description: "5 Bed • 4.5 Bath • 4,200 Sq Ft",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2671&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Highland Manor",
    location: "Visalia, CA • Northside",
    price: "$1,895,000",
    description: "4 Bed • 3 Bath • Pool & Spa",
    image: "https://images.unsplash.com/photo-1600596542815-e32c630bd1ba?q=80&w=2674&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Sanger Vineyard",
    location: "Sanger, CA • Wine Country",
    price: "$3,200,000",
    description: "Estate Winery • 12 Acres • Custom Build",
    image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?q=80&w=2670&auto=format&fit=crop"
  }
];

export function PortfolioSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % listings.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + listings.length) % listings.length);
  };

  const currentListing = listings[currentIndex];

  return (
    <section className="relative h-screen w-full overflow-hidden bg-neutral-950 text-white flex flex-col md:flex-row">

      {/* --- LEFT SIDE: CONTENT --- */}
      <div className="relative z-10 flex h-1/2 w-full flex-col justify-between p-8 md:h-full md:w-1/2 md:p-20">

        {/* Header / Controls */}
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <span className="font-sans text-xs tracking-[0.2em] text-[#C5A059]">
            EXCLUSIVE PORTFOLIO • NR.{currentIndex + 1}
          </span>
          <div className="flex gap-6">
             <button onClick={prevSlide} className="text-[#C5A059] hover:text-white hover:scale-110 transition-all duration-300"><ArrowLeft size={32}/></button>
             <button onClick={nextSlide} className="text-[#C5A059] hover:text-white hover:scale-110 transition-all duration-300"><ArrowRight size={32}/></button>
          </div>
        </div>

        {/* Dynamic Title */}
        <div className="my-auto py-10">
          <AnimatePresence mode="wait">
            <motion.h2
              key={currentListing.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[0.9] font-light tracking-tight"
            >
              {currentListing.title}
            </motion.h2>
          </AnimatePresence>
        </div>

        {/* Footer / Info */}
        <div className="flex items-end justify-between border-t border-white/10 pt-8">
          <div>
            <AnimatePresence mode="wait">
               <motion.div
                 key={currentListing.id}
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 transition={{ duration: 0.4, delay: 0.1 }}
               >
                 <p className="font-serif text-2xl md:text-3xl text-[#C5A059] mb-2">{currentListing.price}</p>
                 <p className="font-sans text-xs tracking-widest text-white/60 uppercase">{currentListing.description}</p>
               </motion.div>
            </AnimatePresence>
          </div>

          <div className="hidden md:block text-right">
             <div className="flex items-center gap-2 text-white/50 mb-1">
               <MapPin size={14} />
               <span className="text-xs tracking-widest uppercase">Location</span>
             </div>
             <p className="font-serif text-lg">{currentListing.location}</p>
          </div>
        </div>

      </div>

      {/* --- RIGHT SIDE: IMAGE --- */}
      <div className="relative h-1/2 w-full md:h-full md:w-1/2 overflow-hidden bg-neutral-900">
         <AnimatePresence mode="wait">
            <motion.img
              key={currentListing.id}
              src={currentListing.image}
              alt={currentListing.title}
              initial={{ scale: 1.1, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="absolute inset-0 h-full w-full object-cover"
            />
         </AnimatePresence>
         {/* Gradient Overlay for blending */}
         <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-transparent to-transparent z-10" />
      </div>

    </section>
  );
}
