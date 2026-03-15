"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function FairHousingClient() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans">
      <Navbar />

      <div className="mx-auto max-w-3xl px-6 pb-24 pt-32 md:px-10">
        <h1 className="font-serif text-4xl tracking-wide text-gold md:text-5xl">
          Fair Housing Statement
        </h1>
        <p className="mt-4 text-sm text-white/40">
          Equal Housing Opportunity
        </p>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-white/70">
          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Our Commitment</h2>
            <p>
              Legacy Real Estate Inc and Alejandra Gonzalez (DRE #02207755) are committed
              to compliance with all federal, state, and local fair housing laws. We are
              pledged to the letter and spirit of U.S. policy for the achievement of equal
              housing opportunity throughout the Nation.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Federal Fair Housing Act</h2>
            <p>
              The Fair Housing Act of 1968, as amended, prohibits discrimination in the sale,
              rental, and financing of dwellings, and in other housing-related transactions,
              based on:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Race</li>
              <li>Color</li>
              <li>National origin</li>
              <li>Religion</li>
              <li>Sex (including gender identity and sexual orientation)</li>
              <li>Familial status (including children under 18 living with parents or legal custodians, pregnant women, and people securing custody of children under 18)</li>
              <li>Disability (physical or mental)</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">California Fair Employment and Housing Act</h2>
            <p>
              In addition to federal protections, California law (Government Code Section 12955)
              provides additional protections against housing discrimination based on:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>All federally protected classes listed above</li>
              <li>Marital status</li>
              <li>Ancestry</li>
              <li>Source of income</li>
              <li>Sexual orientation</li>
              <li>Gender identity and gender expression</li>
              <li>Genetic information</li>
              <li>Veteran or military status</li>
              <li>Immigration status (California Civil Code Section 1940.3)</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">What This Means for You</h2>
            <p>
              We encourage and support an affirmative advertising and marketing program in
              which there are no barriers to obtaining housing because of any protected
              characteristic. All real estate advertised on this website is subject to the
              Federal Fair Housing Act and the California Fair Employment and Housing Act.
            </p>
            <p className="mt-4">
              We will not knowingly accept any advertising for real estate that is in
              violation of any applicable law. All persons are hereby informed that all
              dwellings advertised on this website are available on an equal opportunity basis.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Filing a Complaint</h2>
            <p>
              If you believe you have been discriminated against in a housing transaction,
              you may file a complaint with:
            </p>
            <ul className="mt-4 list-disc space-y-3 pl-6">
              <li>
                <span className="text-white">U.S. Department of Housing and Urban Development (HUD)</span>
                <br />
                Phone: (800) 669-9777
                <br />
                Website: hud.gov
              </li>
              <li>
                <span className="text-white">California Department of Fair Employment and Housing (DFEH)</span>
                <br />
                Phone: (800) 884-1684
                <br />
                Website: dfeh.ca.gov
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Contact Us</h2>
            <p>
              If you have questions about our fair housing practices, please contact us:
            </p>
            <p className="mt-4">
              Alejandra Gonzalez · DRE #02207755
              <br />
              Legacy Real Estate Inc · CalDRE #02165291
              <br />
              Phone:{" "}
              <a href="tel:+15599811026" className="text-gold hover:underline">
                (559) 981-1026
              </a>
              <br />
              Email:{" "}
              <a href="mailto:alegonz086@gmail.com" className="text-gold hover:underline">
                alegonz086@gmail.com
              </a>
            </p>
          </section>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8">
          <Link
            href="/"
            className="font-sans text-sm text-gold transition-colors hover:text-gold/70"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
