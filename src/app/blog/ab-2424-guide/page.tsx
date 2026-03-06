import type { Metadata } from "next";
import AB2424Client from "./AB2424Client";

export const metadata: Metadata = {
  title:
    "The 90-Day Equity Shield: Navigating AB 2424 in the Central Valley | Legacy Real Estate",
  description:
    "Learn how California AB 2424 protects homeowners from foreclosure with two 45-day postponement triggers and a 67% Fair Market Value bidding floor. Expert guidance for Fresno, Visalia & Tulare County homeowners.",
  keywords: [
    "AB 2424 California 2026",
    "Fresno Foreclosure Help",
    "Visalia Real Estate Investor",
    "Legacy Real Estate",
    "stop foreclosure California",
    "AB 2424 listing pause",
    "Central Valley foreclosure protection",
    "67 percent fair market value",
    "trustee sale postponement",
  ],
  openGraph: {
    title: "The 90-Day Equity Shield: Navigating AB 2424 in the Central Valley",
    description:
      "How AB 2424 gives Central Valley homeowners 90 days of protection and a 67% FMV bidding floor at trustee sales.",
    url: "https://alejandrahomes.org/blog/ab-2424-guide",
    type: "article",
  },
};

export default function AB2424GuidePage() {
  return <AB2424Client />;
}
