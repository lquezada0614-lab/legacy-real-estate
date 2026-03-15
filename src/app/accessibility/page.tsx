import type { Metadata } from "next";
import AccessibilityClient from "./AccessibilityClient";

export const metadata: Metadata = {
  title: "Accessibility Statement | Legacy Real Estate Inc",
  description:
    "Accessibility Statement for Legacy Real Estate Inc — our commitment to making our website accessible to all users.",
  openGraph: {
    title: "Accessibility Statement | Legacy Real Estate Inc",
    description:
      "Accessibility Statement for Legacy Real Estate Inc — our commitment to digital accessibility.",
    url: "https://www.alejandrahomes.org/accessibility",
    type: "website",
  },
};

export default function AccessibilityPage() {
  return <AccessibilityClient />;
}
