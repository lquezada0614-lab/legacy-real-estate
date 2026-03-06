import type { Metadata } from "next";
import BlogClient from "./BlogClient";

export const metadata: Metadata = {
  title: "AB 2424 Foreclosure Help | Central Valley Market Trends 2026 | Legacy Real Estate",
  description:
    "Weekly data-driven insights on interest rates, median home prices, and foreclosure trends across Fresno, Visalia, and Tulare. AB 2424 foreclosure analysis and stop-foreclosure strategies for California homeowners.",
  keywords: [
    "AB 2424 Foreclosure Help",
    "Central Valley Market Trends 2026",
    "Stop Foreclosure California",
    "Fresno home prices",
    "Tulare real estate trends",
    "Visalia housing market",
    "AB 2424 listing pause",
    "Central Valley foreclosure filings",
    "interest rate forecast 2026",
  ],
};

export default function BlogPage() {
  return <BlogClient />;
}
