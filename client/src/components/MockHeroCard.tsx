import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function MockHeroCard() {
  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden p-8 flex flex-col items-center justify-center text-center space-y-6 min-h-[320px] animate-[float_6s_ease-in-out_infinite]">
      <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 ring-1 ring-emerald-500/30 animate-[pulse-glow_2s_ease-in-out_infinite]">
        <Sparkles className="h-8 w-8 text-emerald-400" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold" data-testid="text-mock-title">Career Quiz</h3>
        <p className="text-slate-400 text-sm" data-testid="text-mock-subtitle">Discover where you fit best</p>
      </div>
      
      <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/30" data-testid="button-take-quiz">
        <Link href="/career-quiz">
          Take Quiz Now <ArrowRight className="ml-2 h-5 w-5" />
        </Link>
      </Button>
      
      <div className="text-xs text-slate-500" data-testid="text-quiz-info">Free • 5 minutes • AI-powered</div>
    </div>
  );
}
