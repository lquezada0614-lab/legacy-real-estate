import type { Metadata } from "next";
import ForeclosureClient from "./ForeclosureClient";

export const metadata: Metadata = {
  title: "Foreclosure Options & Help | Central Valley Real Estate",
  description:
    "Learn how to protect your equity and pause foreclosure with CA AB 2424. Free consultation with a licensed broker in California's Central Valley.",
};

export default function ForeclosuresPage() {
  return <ForeclosureClient />;
}
