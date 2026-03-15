"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function AccessibilityClient() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans">
      <Navbar />

      <div className="mx-auto max-w-3xl px-6 pb-24 pt-32 md:px-10">
        <h1 className="font-serif text-4xl tracking-wide text-gold md:text-5xl">
          Accessibility Statement
        </h1>
        <p className="mt-4 text-sm text-white/40">
          Our commitment to digital accessibility
        </p>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-white/70">
          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Our Commitment</h2>
            <p>
              Legacy Real Estate Inc and Alejandra Gonzalez are committed to ensuring
              digital accessibility for people with disabilities. We are continually
              improving the user experience for everyone and applying the relevant
              accessibility standards to ensure we provide equal access to all users.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Conformance Status</h2>
            <p>
              We strive to conform to the Web Content Accessibility Guidelines (WCAG) 2.1
              at Level AA. These guidelines explain how to make web content more accessible
              for people with disabilities and more user-friendly for everyone.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Measures Taken</h2>
            <p>We take the following measures to ensure accessibility:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6">
              <li>Semantic HTML markup for proper screen reader navigation</li>
              <li>Sufficient color contrast ratios for text readability</li>
              <li>Keyboard-navigable interactive elements</li>
              <li>Descriptive alt text for meaningful images</li>
              <li>Properly labeled form fields and controls</li>
              <li>Minimum touch target sizes of 44x44 pixels for interactive elements</li>
              <li>Responsive design that works across devices and screen sizes</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Known Limitations</h2>
            <p>
              While we strive for full accessibility, some content may not yet be fully
              accessible. We are actively working to identify and resolve any accessibility
              gaps. If you encounter any issues, please let us know.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Alternative Access</h2>
            <p>
              Should you require assistance in navigating our website or searching for
              real estate, please contact our office directly. We are happy to assist you
              with any real estate needs over the phone or in person.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Feedback</h2>
            <p>
              We welcome your feedback on the accessibility of our website. If you
              encounter accessibility barriers or have suggestions for improvement,
              please contact us:
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
            <p className="mt-4">
              We aim to respond to accessibility feedback within 2 business days.
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
