import type { Metadata } from "next";
import CashOfferClient from "./CashOfferClient";

export const metadata: Metadata = {
  title: "Sell My House Fast Fresno | Central Valley Cash Home Buyers | Legacy Real Estate",
  description:
    "Get a guaranteed all-cash offer on your home in Fresno, Visalia, Orosi & California's Central Valley. Avoid foreclosure, no repairs, no showings, close in as fast as 14 days.",
  keywords: [
    "Sell my house fast Fresno",
    "Central Valley Cash Home Buyers",
    "Avoid Foreclosure Visalia",
    "cash home buyers Orosi",
    "sell house as is California",
    "cash offer Fresno",
    "distressed property buyer Central Valley",
    "inherited property cash offer",
    "stop foreclosure Tulare County",
  ],
};

export default function CashOfferPage() {
  return <CashOfferClient />;
}
