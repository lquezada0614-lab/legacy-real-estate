import { Navbar } from "@/components/layout/Navbar";
import { HeroSection } from "@/components/ui/hero-section";
import { AboutSection } from "@/components/sections/about-section";
import { MarketPulse } from "@/components/sections/MarketPulse";
import { ExclusivePortfolio } from "@/components/sections/ExclusivePortfolio";
import { Testimonials } from "@/components/sections/testimonials";
import { Footer } from "@/components/layout/Footer";
import { LeadModalProvider } from "@/components/ui/LeadModal";

export default function Home() {
  return (
    <LeadModalProvider>
      <main>
        <Navbar />
        <HeroSection />
        <AboutSection />
        <MarketPulse />
        <ExclusivePortfolio />
        <Testimonials />
        <Footer />
      </main>
    </LeadModalProvider>
  );
}
