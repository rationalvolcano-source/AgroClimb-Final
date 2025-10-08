import GradientBG from "@/components/GradientBG";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import SocialProof from "@/components/SocialProof";
import ValueProps from "@/components/ValueProps";
import FeatureGrid from "@/components/FeatureGrid";
import PricingTeaser from "@/components/PricingTeaser";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function LandingPage() {
  return (
    <div className="min-h-screen w-full bg-slate-950 text-slate-50">
      <GradientBG />
      <Nav />
      <Hero />
      <HowItWorks />
      <SocialProof />
      <ValueProps />
      <FeatureGrid />
      <PricingTeaser />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
}
