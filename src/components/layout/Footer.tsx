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
                Alejandra Gonzalez · DRE #02207755
                <br />
                <span className="text-white/40">Legacy Real Estate Inc · CalDRE #02165291</span>
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

        {/* Fair Housing Statement */}
        <div className="mt-16 border-t border-white/5 pt-8">
          <div className="flex items-start gap-4">
            <svg
              className="mt-0.5 h-8 w-8 flex-shrink-0 text-white/30"
              viewBox="0 0 24 24"
              fill="currentColor"
              aria-label="Equal Housing Opportunity"
            >
              <path d="M12 3L2 9v1h2v10h16V10h2V9L12 3zm0 1.5L20 9h-1v10H5V9H4l8-4.5zM7 11h10v1H7v-1zm0 2.5h10v1H7v-1zm0 2.5h10v1H7v-1z" />
            </svg>
            <p className="font-sans text-[10px] leading-relaxed text-white/25">
              <span className="font-medium text-white/35">Equal Housing Opportunity.</span>{" "}
              We are pledged to the letter and spirit of U.S. policy for the achievement
              of equal housing opportunity throughout the Nation. We encourage and support
              an affirmative advertising and marketing program in which there are no barriers
              to obtaining housing because of race, color, religion, sex, handicap, familial
              status, or national origin. This site complies with the Fair Housing Act of 1968,
              as amended.
            </p>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/20">
            &copy; 2026 Alejandra Gonzalez &bull; Legacy Real Estate Inc
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/privacy"
              className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/20 transition-colors hover:text-gold"
            >
              Privacy Policy
            </Link>
            <span className="text-white/10">|</span>
            <Link
              href="/terms"
              className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/20 transition-colors hover:text-gold"
            >
              Terms &amp; Conditions
            </Link>
            <span className="text-white/10">|</span>
            <Link
              href="/fair-housing"
              className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/20 transition-colors hover:text-gold"
            >
              Fair Housing
            </Link>
            <span className="text-white/10">|</span>
            <Link
              href="/accessibility"
              className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/20 transition-colors hover:text-gold"
            >
              Accessibility
            </Link>
          </div>
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-white/20">
            California&apos;s Central Valley
          </p>
        </div>
      </div>
    </footer>
  );
}
