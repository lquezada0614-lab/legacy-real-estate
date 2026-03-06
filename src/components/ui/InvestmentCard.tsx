"use client";

import { motion } from "framer-motion";
import { TrendingUp, Home, Building2 } from "lucide-react";
import type { Investment } from "@/types";
import { formatPrice } from "@/lib/utils";

interface InvestmentCardProps {
  project: Investment;
}

export default function InvestmentCard({ project }: InvestmentCardProps) {
  const typeConfig = {
    flip: { label: "Flip", icon: TrendingUp, color: "bg-gold/90" },
    airbnb: { label: "Airbnb", icon: Home, color: "bg-luxury-red/80" },
    "long-term-rental": { label: "Rental", icon: Building2, color: "bg-white/10" },
  };

  const config = typeConfig[project.type];
  const Icon = config.icon;

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-luxury-surface overflow-hidden border border-white/5 hover:border-gold/30 transition-all duration-500"
    >
      {/* Image placeholder */}
      <div className="relative aspect-[4/3] bg-luxury-charcoal flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black/80 via-transparent to-transparent z-10" />

        <div className="text-gold/15 flex flex-col items-center gap-2">
          <Icon className="w-10 h-10" />
          <span className="text-editorial text-white/20">{project.location}</span>
        </div>

        {/* Type badge */}
        <span
          className={`absolute top-3 left-3 z-20 ${config.color} text-white text-[0.6rem] font-heading font-semibold uppercase tracking-wider px-3 py-1`}
        >
          {config.label}
        </span>

        {/* ROI tag */}
        <span className="absolute top-3 right-3 z-20 bg-emerald-700/80 text-white text-[0.6rem] font-heading font-semibold uppercase tracking-wider px-3 py-1">
          {project.tag}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-heading text-sm uppercase tracking-wider text-white mb-1">
          {project.title}
        </h3>
        <p className="text-editorial text-white/20 mb-3">{project.location}</p>
        <p className="text-white/30 text-sm font-body leading-relaxed mb-4">
          {project.description}
        </p>

        <div className="flex items-center justify-between pt-3 border-t border-white/5">
          <div>
            <p className="text-editorial text-white/20 mb-1">Purchase</p>
            <p className="text-white/60 font-heading text-sm font-medium">
              {formatPrice(project.purchasePrice)}
            </p>
          </div>
          {project.monthlyIncome ? (
            <div className="text-right">
              <p className="text-editorial text-white/20 mb-1">Monthly</p>
              <p className="text-gold font-heading text-sm font-medium">
                {formatPrice(project.monthlyIncome)}
              </p>
            </div>
          ) : project.roi > 0 ? (
            <div className="text-right">
              <p className="text-editorial text-white/20 mb-1">Value</p>
              <p className="text-gold font-heading text-sm font-medium">
                {formatPrice(project.currentValue)}
              </p>
            </div>
          ) : (
            <div className="text-right">
              <p className="text-editorial text-white/20 mb-1">Status</p>
              <p className="text-gold font-heading text-sm font-medium">
                In Progress
              </p>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
