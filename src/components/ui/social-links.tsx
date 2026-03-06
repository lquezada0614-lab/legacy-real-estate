"use client";

import { Instagram, Facebook, MessageCircle } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

const links = [
  {
    label: "Instagram",
    href: SITE_CONFIG.social.instagram,
    icon: Instagram,
    hoverColor: "hover:text-[#E1306C] hover:border-[#E1306C]/40 hover:bg-[#E1306C]/10 hover:shadow-[0_0_12px_rgba(225,48,108,0.15)]",
  },
  {
    label: "Facebook",
    href: SITE_CONFIG.social.facebook,
    icon: Facebook,
    hoverColor: "hover:text-[#1877F2] hover:border-[#1877F2]/40 hover:bg-[#1877F2]/10 hover:shadow-[0_0_12px_rgba(24,119,242,0.15)]",
  },
  {
    label: "WhatsApp",
    href: SITE_CONFIG.social.whatsapp,
    icon: MessageCircle,
    hoverColor: "hover:text-[#25D366] hover:border-[#25D366]/40 hover:bg-[#25D366]/10 hover:shadow-[0_0_12px_rgba(37,211,102,0.15)]",
  },
];

export function SocialLinks({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      {links.map((link) => {
        const Icon = link.icon;
        return (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={link.label}
            className={`group flex h-14 w-14 items-center justify-center rounded-xl border border-white/20 md:border-white/10 bg-white/5 backdrop-blur-sm will-change-transform transition-all duration-300 ${link.hoverColor}`}
          >
            <Icon className="h-6 w-6 text-white/50 transition-colors duration-300 group-hover:text-inherit" />
          </a>
        );
      })}
    </div>
  );
}
