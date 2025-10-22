import { ArrowRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import logoPath from "@assets/image_1761115104637.webp";
import { useEffect, useState } from "react";
import { Link, useLocation } from "wouter";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();
  const isLandingPage = location === '/';

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
        <Link href="/" className="flex items-center gap-1.5 sm:gap-2.5 hover:opacity-80 transition-opacity -ml-2">
          <img src={logoPath} alt="AgroClimb" className="h-7 w-7 sm:h-8 sm:w-8" data-testid="img-logo" />
          <span className="font-semibold tracking-tight text-sm sm:text-base" data-testid="text-brand">AgroClimb</span>
        </Link>
        <div className="flex items-center gap-3 sm:gap-6 text-xs sm:text-sm ml-4">
          {isLandingPage ? (
            <>
              <a href="#features" className="hidden sm:inline text-slate-300 hover:text-slate-50 transition-colors" data-testid="link-features">Features</a>
              <a href="#pricing" className="hidden sm:inline text-slate-300 hover:text-slate-50 transition-colors" data-testid="link-pricing">Plans</a>
            </>
          ) : (
            <Button asChild variant="ghost" size="sm">
              <Link href="/" data-testid="link-home">
                <Home className="h-4 w-4 sm:mr-2" />
                <span className="hidden sm:inline">Home</span>
              </Link>
            </Button>
          )}
          <Link href="/books" className="text-slate-300 hover:text-slate-50 transition-colors" data-testid="link-books">Books</Link>
          <Link href="/games" className="text-slate-300 hover:text-slate-50 transition-colors" data-testid="link-games">Games</Link>
          <Link href="/planb-webinars" className="text-slate-300 hover:text-slate-50 transition-colors" data-testid="link-planb-webinars">
            <span className="hidden md:inline">Plan B & Webinars</span>
            <span className="md:hidden">Plan B</span>
          </Link>
          <Link href="/swm" className="text-slate-300 hover:text-slate-50 transition-colors" data-testid="link-binaural">SWM</Link>
          <Link href="/wellness" className="text-slate-300 hover:text-slate-50 transition-colors hidden sm:inline" data-testid="link-wellness">Wellness</Link>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden md:inline-flex" data-testid="button-signin">Sign in</Button>
          <div className="relative group">
            <Button asChild className="bg-emerald-500 hover:bg-emerald-400 text-white" data-testid="button-quiz-cta">
              <Link href="/career-quiz">
                <span className="hidden sm:inline">Get My Career Plan →</span>
                <span className="sm:hidden">Plan →</span>
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
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
