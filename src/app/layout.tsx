import type { Metadata } from "next";
import { Playfair_Display, Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "500", "600"],
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500"],
});

export const metadata: Metadata = {
  title: "Legacy Real Estate Fresno | Central Valley Real Estate | Broker Leo Quezada",
  description:
    "Legacy Real Estate Inc — Central Valley real estate brokerage led by Broker Leo Quezada (DRE #02165291). Luxury homes, investment properties, and foreclosure solutions in Fresno, Visalia, Tulare, Orosi, Dinuba & Reedley.",
  keywords: [
    "Central Valley Real Estate",
    "Legacy Real Estate Fresno",
    "Broker Leo Quezada",
    "Fresno real estate agent",
    "Visalia homes for sale",
    "Tulare County real estate",
    "Orosi real estate",
    "Dinuba homes",
    "Reedley properties",
    "Central Valley investment properties",
  ],
  openGraph: {
    title: "Legacy Real Estate Inc | Central Valley Real Estate",
    description:
      "Luxury real estate services in California's Central Valley. Led by Broker Leo Quezada — DRE #02165291.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(
        "min-h-screen bg-neutral-950 font-sans antialiased text-white",
        playfair.variable,
        manrope.variable
      )}>
        {children}
      </body>
    </html>
  );
}
