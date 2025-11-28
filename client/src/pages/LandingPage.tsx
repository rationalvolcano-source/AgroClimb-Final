import GradientBG from "@/components/GradientBG";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Features from "@/components/Features";
import SocialProof from "@/components/SocialProof";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

export default function LandingPage() {
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
