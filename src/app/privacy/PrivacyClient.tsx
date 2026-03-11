"use client";

import Link from "next/link";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export default function PrivacyClient() {
  return (
    <main className="min-h-screen bg-neutral-950 text-white font-sans">
      <Navbar />

      <div className="mx-auto max-w-3xl px-6 pb-24 pt-32 md:px-10">
        <h1 className="font-serif text-4xl tracking-wide text-gold md:text-5xl">
          Privacy Policy
        </h1>
        <p className="mt-4 text-sm text-white/40">
          Effective Date: March 10, 2026 &bull; Last Updated: March 10, 2026
        </p>

        <div className="mt-12 space-y-10 text-sm leading-relaxed text-white/70">
          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Introduction</h2>
            <p>
              Legacy Real Estate Inc (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects
              your privacy and is committed to protecting your personal information. This Privacy
              Policy explains how we collect, use, disclose, and safeguard your information when you
              visit our website at{" "}
              <a href="https://www.alejandrahomes.org" className="text-gold hover:underline">
                www.alejandrahomes.org
              </a>{" "}
              or communicate with us via SMS, phone, or email.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Information We Collect</h2>
            <p className="mb-3">
              We may collect the following types of personal information when you interact with us:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-white/90">Contact Information:</strong> Name, phone number,
                email address, and mailing address.
              </li>
              <li>
                <strong className="text-white/90">Property Information:</strong> Property address,
                estimated value, and details submitted through our home valuation or consultation
                forms.
              </li>
              <li>
                <strong className="text-white/90">Communication Data:</strong> SMS messages, emails,
                and phone call records related to your real estate inquiries.
              </li>
              <li>
                <strong className="text-white/90">Usage Data:</strong> Information about how you
                interact with our website, including pages visited, time spent, and referring URLs.
              </li>
              <li>
                <strong className="text-white/90">Device Information:</strong> Browser type,
                operating system, and IP address collected automatically through cookies and similar
                technologies.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">How We Use Your Information</h2>
            <p className="mb-3">We use the information we collect to:</p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Respond to your real estate inquiries and consultation requests.</li>
              <li>Provide property valuations and market analysis.</li>
              <li>
                Send SMS messages related to your inquiry, including follow-up communications and
                appointment confirmations.
              </li>
              <li>Improve our website, services, and customer experience.</li>
              <li>Comply with legal obligations and protect our rights.</li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">SMS Communications</h2>
            <p className="mb-3">
              By submitting a consultation request, home valuation form, or texting our business
              number, you consent to receive SMS messages from Legacy Real Estate Inc regarding your
              inquiry. These messages may include:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Responses to your questions about real estate services.</li>
              <li>Follow-up messages regarding your property inquiry.</li>
              <li>Appointment confirmations and reminders.</li>
            </ul>
            <p className="mt-3">
              Message and data rates may apply. Message frequency varies based on your interaction.
              You may opt out at any time by replying <strong className="text-white">STOP</strong>{" "}
              to any message. For help, reply <strong className="text-white">HELP</strong> or
              contact us at{" "}
              <a href="tel:+15599811026" className="text-gold hover:underline">
                (559) 981-1026
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Information Sharing</h2>
            <p className="mb-3">
              We do not sell, trade, or rent your personal information to third parties. We may share
              your information only in the following circumstances:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>
                <strong className="text-white/90">Service Providers:</strong> With trusted
                third-party services that help us operate our business (e.g., Twilio for SMS
                delivery), who are bound by confidentiality obligations.
              </li>
              <li>
                <strong className="text-white/90">Legal Requirements:</strong> When required by law,
                regulation, or legal process.
              </li>
              <li>
                <strong className="text-white/90">Business Transfers:</strong> In connection with a
                merger, acquisition, or sale of assets.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Data Security</h2>
            <p>
              We implement reasonable technical and organizational measures to protect your personal
              information from unauthorized access, alteration, disclosure, or destruction. However,
              no method of transmission over the internet or electronic storage is completely secure,
              and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Cookies</h2>
            <p>
              Our website may use cookies and similar tracking technologies to enhance your browsing
              experience. You can control cookie preferences through your browser settings. Disabling
              cookies may affect certain features of our website.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Your Rights</h2>
            <p className="mb-3">
              Under California law (including the CCPA), you have the right to:
            </p>
            <ul className="list-disc space-y-2 pl-6">
              <li>Request access to the personal information we hold about you.</li>
              <li>Request deletion of your personal information.</li>
              <li>Opt out of the sale of your personal information (we do not sell your data).</li>
              <li>Not be discriminated against for exercising your privacy rights.</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, contact us at{" "}
              <a href="mailto:alegonz086@gmail.com" className="text-gold hover:underline">
                alegonz086@gmail.com
              </a>{" "}
              or{" "}
              <a href="tel:+15599811026" className="text-gold hover:underline">
                (559) 981-1026
              </a>
              .
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Data Retention</h2>
            <p>
              We retain your personal information only for as long as necessary to fulfill the
              purposes outlined in this policy, or as required by law. When your information is no
              longer needed, we will securely delete or anonymize it.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Children&apos;s Privacy</h2>
            <p>
              Our services are not directed to individuals under the age of 18. We do not knowingly
              collect personal information from children. If we become aware that we have collected
              information from a child, we will take steps to delete it.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Changes will be posted on this
              page with an updated effective date. We encourage you to review this policy
              periodically.
            </p>
          </section>

          <section>
            <h2 className="mb-4 font-serif text-xl text-white">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us:
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
