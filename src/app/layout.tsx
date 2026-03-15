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
  metadataBase: new URL("https://alejandrahomes.org"),
  title: "Legacy Real Estate Inc | Central Valley Real Estate | Alejandra Gonzalez",
  description:
    "Legacy Real Estate Inc — Central Valley real estate brokerage. Luxury homes, investment properties, and foreclosure solutions in Fresno, Visalia, Tulare, Orosi, Dinuba & Reedley. Alejandra Gonzalez DRE #02207755.",
  keywords: [
    "Central Valley Real Estate",
    "Legacy Real Estate Fresno",
    "Legacy Real Estate Inc",
    "Alejandra Gonzalez real estate",
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
      "Luxury real estate services in California's Central Valley. Alejandra Gonzalez — Legacy Real Estate Inc, DRE #02207755.",
    url: "https://alejandrahomes.org",
    siteName: "Legacy Real Estate Inc",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Legacy Real Estate Inc | Central Valley Real Estate",
    description:
      "Luxury real estate services in California's Central Valley. Alejandra Gonzalez — Legacy Real Estate Inc, DRE #02207755.",
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
