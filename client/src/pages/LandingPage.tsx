import GradientBG from "@/components/GradientBG";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import SocialProof from "@/components/SocialProof";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { useSEO } from "@/hooks/useSEO";

export default function LandingPage() {
  useSEO({
    title: "Career Guidance for BSc Agriculture & Horticulture Students India",
    description: "Free career guidance for BSc Agriculture, BSc Horticulture students. Discover your path - ICAR JRF, IBPS AFO Banking, Agribusiness MBA, Government Jobs. Take our AI career quiz and get personalized guidance from successful alumni.",
    keywords: "BSc Agriculture career, BSc Horticulture jobs India, ICAR JRF preparation, IBPS AFO exam, agriculture career guidance, BSc Agriculture government jobs, agribusiness MBA CAT, career after BSc agriculture, horticulture career options",
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
      <SocialProof />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
