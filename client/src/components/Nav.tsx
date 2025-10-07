import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoPath from "@assets/image_1759852944967.png";
import { useEffect, useState } from "react";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/70 border-b border-slate-800 transition-all duration-300">
      <div className={`mx-auto max-w-7xl px-4 flex items-center justify-between gap-4 transition-all duration-300 ${scrolled ? 'py-2' : 'py-3'}`}>
        <div className="flex items-center gap-3">
          <img src={logoPath} alt="The Agri Vision" className="h-8 w-8" data-testid="img-logo" />
          <span className="font-semibold tracking-tight" data-testid="text-brand">The Agri Vision</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="#features" className="text-slate-300 hover:text-slate-50 transition-colors" data-testid="link-features">Features</a>
          <a href="#pricing" className="text-slate-300 hover:text-slate-50 transition-colors" data-testid="link-pricing">Plans</a>
          <a href="#faq" className="text-slate-300 hover:text-slate-50 transition-colors" data-testid="link-faq">FAQ</a>
          <a href="/books" className="text-slate-300 hover:text-slate-50 transition-colors" data-testid="link-books">Books</a>
          <a href="/swm" className="text-slate-300 hover:text-slate-50 transition-colors" data-testid="link-binaural">SWM</a>
          <a href="/wellness" className="text-slate-300 hover:text-slate-50 transition-colors" data-testid="link-wellness">Wellness Centre</a>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden md:inline-flex" data-testid="button-signin">Sign in</Button>
          <div className="relative group">
            <Button className="bg-emerald-500 hover:bg-emerald-400 text-white" data-testid="button-quiz-cta">
              <span className="hidden sm:inline">Get My Career Plan →</span>
              <span className="sm:hidden">Plan →</span>
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <div className="hidden md:block absolute top-full mt-1 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <span className="text-xs text-slate-400 whitespace-nowrap">Takes 5 minutes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
