import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

export const metadata: Metadata = {
  title: "Privacy Policy | Legacy Real Estate Inc",
  description:
    "Privacy Policy for Legacy Real Estate Inc — how we collect, use, and protect your personal information.",
  openGraph: {
    title: "Privacy Policy | Legacy Real Estate Inc",
    description:
      "Privacy Policy for Legacy Real Estate Inc — how we collect, use, and protect your personal information.",
    url: "https://www.alejandrahomes.org/privacy",
    type: "website",
  },
};

export default function PrivacyPage() {
  return <PrivacyClient />;
}
