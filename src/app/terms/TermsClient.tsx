"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function TermsClient() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans">
      <Navbar />

      <div className="mx-auto max-w-3xl px-6 pb-24 pt-32 md:px-10">
        <h1 className="font-serif text-4xl tracking-wide text-gold md:text-5xl">
          Terms &amp; Conditions
        </h1>
        <p className="mt-4 text-sm text-white/40">
          Effective Date: March 10, 2026 &bull; Last Updated: March 10, 2026
        </p>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-white/70">
          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Agreement to Terms</h2>
            <p>
              By accessing or using the website at{" "}
              <a href="https://www.alejandrahomes.org" className="text-gold hover:underline">
                www.alejandrahomes.org
              </a>{" "}
              or communicating with Legacy Real Estate Inc via SMS, phone, or email, you agree to be
              bound by these Terms and Conditions. If you do not agree with any part of these terms,
              please do not use our services.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">About Our Services</h2>
            <p>
              Legacy Real Estate Inc provides real estate brokerage services in California&apos;s
              Central Valley, including property valuations, buyer and seller representation,
              investment consulting, and market analysis. Alejandra Gonzalez is a licensed real
              estate agent (DRE #02207755) operating under Legacy Real Estate Inc.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">
              SMS Messaging Terms
            </h2>
            <p className="mb-4">
              <strong className="text-white">Program Name:</strong> Legacy Real Estate Lead
              Communications
            </p>
            <p className="mb-4">
              <strong className="text-white">Program Description:</strong> When you submit a form on
              our website (consultation request or home valuation) or text our business number, you
              may receive SMS messages from Legacy Real Estate Inc related to your real estate
              inquiry, including follow-up messages, property information, appointment confirmations,
              and market updates.
            </p>

            <div className="space-y-4 rounded border border-white/10 bg-white/5 p-6">
              <p>
                <strong className="text-white">Message Frequency:</strong> Message frequency varies
                based on your interaction and inquiry status. You will not receive more than 10
                messages per month unless you are actively engaged in a conversation.
              </p>
              <p>
                <strong className="text-white">Message &amp; Data Rates:</strong> Standard message
                and data rates may apply. Check with your wireless carrier for details about your
                messaging plan.
              </p>
              <p>
                <strong className="text-white">Opt-Out:</strong> You may opt out of SMS messages at
                any time by replying{" "}
                <strong className="text-lg text-white">STOP</strong> to any message from us. You
                will receive a one-time confirmation that you have been unsubscribed. After opting
                out, you will no longer receive SMS messages from us unless you re-subscribe.
              </p>
              <p>
                <strong className="text-white">Help:</strong> For assistance, reply{" "}
                <strong className="text-lg text-white">HELP</strong> to any message, or contact us
                directly at{" "}
                <a href="tel:+15599811026" className="text-gold hover:underline">
                  (559) 981-1026
                </a>{" "}
                or{" "}
                <a href="mailto:alegonz086@gmail.com" className="text-gold hover:underline">
                  alegonz086@gmail.com
                </a>
                .
              </p>
              <p>
                <strong className="text-white">Supported Carriers:</strong> Compatible with all
                major US carriers including AT&amp;T, T-Mobile, Verizon, Sprint, and others.
                Coverage is not available in all areas.
              </p>
            </div>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Consent to Communications</h2>
            <p>
              By submitting a form on our website or texting our business number, you expressly
              consent to receive SMS messages from Legacy Real Estate Inc at the phone number you
              provide. Your consent is not a condition of purchasing any services. You may revoke
              your consent at any time by replying <strong className="text-white">STOP</strong>.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Website Use</h2>
            <p className="mb-3">When using our website, you agree to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Provide accurate and complete information in all forms.</li>
              <li>Use the website only for lawful purposes related to real estate inquiries.</li>
              <li>
                Not attempt to interfere with the proper functioning of the website or its systems.
              </li>
              <li>
                Not use automated tools to scrape, extract, or collect data from the website without
                our written permission.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Property Information</h2>
            <p>
              Property valuations, market data, and estimates provided through our website or
              communications are for informational purposes only. They do not constitute a formal
              appraisal, and actual property values may differ. We rely on third-party data sources
              and make no guarantees regarding the accuracy of automated valuations.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Disclaimer of Warranties</h2>
            <p>
              Our website and services are provided on an &quot;as is&quot; and &quot;as
              available&quot; basis. Legacy Real Estate Inc makes no warranties, express or implied,
              regarding the accuracy, completeness, or reliability of the information provided. We
              are not responsible for errors, omissions, or any losses resulting from reliance on the
              information on our website.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Legacy Real Estate Inc and its agents shall not
              be liable for any indirect, incidental, special, consequential, or punitive damages
              arising from your use of our website or services, including but not limited to loss of
              profits, data, or other intangible losses.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Intellectual Property</h2>
            <p>
              All content on our website, including text, images, logos, graphics, and design, is the
              property of Legacy Real Estate Inc and is protected by copyright and other intellectual
              property laws. You may not reproduce, distribute, or use any content without our
              written permission.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites or services. We are not
              responsible for the content, privacy practices, or terms of any third-party sites. Your
              use of third-party services is at your own risk.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Governing Law</h2>
            <p>
              These Terms and Conditions are governed by the laws of the State of California without
              regard to conflict of law principles. Any disputes arising under these terms shall be
              resolved in the courts of Tulare County, California.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Changes to These Terms</h2>
            <p>
              We reserve the right to update these Terms and Conditions at any time. Changes will be
              posted on this page with an updated effective date. Your continued use of our website
              or services after changes are posted constitutes your acceptance of the revised terms.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Contact Us</h2>
            <p>
              If you have questions about these Terms and Conditions, please contact us:
            </p>
            <div className="mt-4 space-y-1">
              <p className="text-white/90">Legacy Real Estate Inc</p>
              <p>Alejandra Gonzalez, DRE #02207755</p>
              <p>
                Phone:{" "}
                <a href="tel:+15599811026" className="text-gold hover:underline">
                  (559) 981-1026
                </a>
              </p>
              <p>
                Email:{" "}
                <a href="mailto:alegonz086@gmail.com" className="text-gold hover:underline">
                  alegonz086@gmail.com
                </a>
              </p>
              <p>
                Website:{" "}
                <a href="https://www.alejandrahomes.org" className="text-gold hover:underline">
                  www.alejandrahomes.org
                </a>
              </p>
            </div>
          </section>

          <section className="rounded border border-white/10 bg-white/5 p-6">
            <p className="text-xs text-white/50">
              See also our{" "}
              <Link href="/privacy" className="text-gold hover:underline">
                Privacy Policy
              </Link>{" "}
              for details on how we collect, use, and protect your personal information.
            </p>
          </section>
        </div>

        <div className="mt-16 border-t border-white/5 pt-8">
          <Link
            href="/"
            className="font-sans text-sm text-gold hover:underline"
          >
            &larr; Back to Home
          </Link>
        </div>
      </div>

      <Footer />
    </main>
  );
}
