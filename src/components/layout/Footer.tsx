"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLeadModal } from "@/components/ui/LeadModal";
import { SocialLinks } from "@/components/ui/social-links";

const quickLinks = [
  { label: "About", href: "#about" },
  { label: "Market Pulse", href: "#market-pulse" },
  { label: "Cash Offer", href: "/cash-offer" },
  { label: "Investor Blog", href: "/blog" },
  { label: "Contact", href: "#contact" },
];

export function Footer() {
  const { open: openModal } = useLeadModal();

  return (
    <footer id="contact" className="relative border-t border-white/5 bg-neutral-950">
      <div className="mx-auto max-w-7xl px-6 py-20 md:px-10 md:py-28">
        <div className="grid grid-cols-1 gap-16 md:grid-cols-2 lg:grid-cols-4">
          {/* Col 1 — Brand */}
          <div>
            <p className="font-serif text-xl tracking-wide text-gold">
              LEGACY REAL ESTATE INC
            </p>
            <p className="mt-4 font-serif text-sm italic text-white/40">
              Building Wealth. Delivering Care.
            </p>
            <p className="mt-6 font-sans text-xs leading-relaxed text-white/30">
              Luxury real estate services in California&apos;s Central Valley.
              Where healthcare precision meets investment excellence.
            </p>
            <SocialLinks className="mt-6" />
          </div>

          {/* Col 2 — Contact */}
          <div>
            <p className="mb-6 font-sans text-xs uppercase tracking-[0.2em] text-white/50">
              Contact
            </p>
            <div className="space-y-4 font-sans text-sm text-white/70">
              <p>
                <span className="text-[10px] uppercase tracking-[0.15em] text-white/30">
                  Phone
                </span>
                <br />
                <a
                  href="tel:+15599811026"
                  className="inline-block min-h-[44px] leading-[44px] transition-colors hover:text-gold"
                >
                  (559) 981-1026
                </a>
              </p>
              <p>
                <span className="text-[10px] uppercase tracking-[0.15em] text-white/30">
                  Email
                </span>
                <br />
                <a
                  href="mailto:alegonz086@gmail.com"
                  className="inline-block min-h-[44px] leading-[44px] transition-colors hover:text-gold"
                >
                  alegonz086@gmail.com
                </a>
              </p>
              <p>
                <span className="text-[10px] uppercase tracking-[0.15em] text-white/30">
                  License
                </span>
                <br />
                DRE #02207755
              </p>
            </div>
          </div>

          {/* Col 3 — Quick Links */}
          <div>
            <p className="mb-6 font-sans text-xs uppercase tracking-[0.2em] text-white/50">
              Quick Links
            </p>
            <div className="flex flex-col gap-3">
              {quickLinks.map((link) => {
                const isRoute = link.href.startsWith("/");
                const Comp = isRoute ? Link : "a";
                return (
                  <Comp
                    key={link.label}
                    href={link.href}
                    className="font-sans text-sm text-white/50 transition-colors hover:text-gold min-h-[44px] flex items-center"
                  >
                    {link.label}
                  </Comp>
                );
              })}
            </div>
          </div>

          {/* Col 4 — CTA */}
          <div className="flex flex-col justify-between">
            <div>
              <p className="mb-6 font-sans text-xs uppercase tracking-[0.2em] text-white/50">
                Start Your Journey
              </p>
              <p className="mb-8 font-sans text-sm font-light leading-relaxed text-white/50">
                Ready to build your real estate portfolio? Let&apos;s create a
                strategy tailored to your goals.
              </p>
            </div>
            <motion.button
              onClick={openModal}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="block border border-gold bg-gold/10 px-8 py-4 text-center font-serif text-lg tracking-wide text-gold transition-colors hover:bg-gold/20"
            >
              Let&apos;s Talk
            </motion.button>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-20 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/20">
            &copy; 2026 Alejandra Gonzalez &bull; Legacy Real Estate Inc
          </p>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/20">
            California&apos;s Central Valley
          </p>
        </div>
      </div>
    </footer>
  );
}
