import type { Metadata } from "next";
import TermsClient from "./TermsClient";

export const metadata: Metadata = {
  title: "Terms & Conditions | Legacy Real Estate Inc",
  description:
    "Terms and Conditions for Legacy Real Estate Inc — SMS messaging terms, service terms, and usage policies.",
  openGraph: {
    title: "Terms & Conditions | Legacy Real Estate Inc",
    description:
      "Terms and Conditions for Legacy Real Estate Inc — SMS messaging terms, service terms, and usage policies.",
    url: "https://www.alejandrahomes.org/terms",
    type: "website",
  },
};

export default function TermsPage() {
  return <TermsClient />;
}
