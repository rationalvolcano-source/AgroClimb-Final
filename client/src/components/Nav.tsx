import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Nav() {
  return (
    <div className="sticky top-0 z-40 backdrop-blur-md bg-slate-950/70 border-b border-slate-800">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Sparkles className="h-5 w-5 text-emerald-400" data-testid="icon-logo" />
          <span className="font-semibold tracking-tight" data-testid="text-brand">TAV Career Compass</span>
        </div>
        <div className="hidden md:flex items-center gap-6 text-sm">
          <a href="#features" className="text-slate-300 hover:text-slate-50 transition-colors" data-testid="link-features">Features</a>
          <a href="#pricing" className="text-slate-300 hover:text-slate-50 transition-colors" data-testid="link-pricing">Plans</a>
          <a href="#faq" className="text-slate-300 hover:text-slate-50 transition-colors" data-testid="link-faq">FAQ</a>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" className="hidden md:inline-flex" data-testid="button-signin">Sign in</Button>
          <Button className="bg-emerald-500 hover:bg-emerald-400 text-white" data-testid="button-quiz-cta">
            <span className="hidden sm:inline">Get My Career Plan →</span>
            <span className="sm:hidden">Plan →</span>
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
