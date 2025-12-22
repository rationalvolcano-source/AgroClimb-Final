import GradientBG from "@/components/GradientBG";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

export default function LandingPage() {
  useSEO({
    title: "Agriculture Career Guidance & Career Plan | Horticulture Career Quiz",
    description: "Get your personalized agriculture career plan in 5 minutes. Free agriculture career guidance and horticulture career guidance for BSc students in India. Discover your best path - ICAR JRF, IBPS AFO Banking, MBA, Government Jobs with our AI career quiz.",
    keywords: "agriculture career guidance, agriculture career plan, horticulture career guidance, horticulture career plan, BSc Agriculture career, BSc Horticulture jobs, ICAR JRF, IBPS AFO, career after BSc agriculture, horticulture career options",
    canonicalPath: "/",
  });

  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-50">
      <GradientBG />
      <Nav />
      <Hero />
      <div className="max-w-6xl mx-auto px-4 py-6">
        <HowItWorks />
        <Features />
      </div>
      <CTA />
      <Footer />
    </div>
  );
}
