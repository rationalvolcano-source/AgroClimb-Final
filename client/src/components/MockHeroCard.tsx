import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function MockHeroCard() {
  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden p-8 flex flex-col items-center justify-center text-center space-y-6 min-h-[320px]">
      <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 ring-1 ring-emerald-500/30">
        <Sparkles className="h-8 w-8 text-emerald-400" />
      </div>
      
      <div className="space-y-2">
        <h3 className="text-2xl font-semibold" data-testid="text-mock-title">Career Quiz</h3>
        <p className="text-slate-400 text-sm" data-testid="text-mock-subtitle">Discover your best-fit pathway</p>
      </div>
      
      <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-white" data-testid="button-take-quiz">
        Take Quiz Now <ArrowRight className="ml-2 h-5 w-5" />
      </Button>
      
      <div className="text-xs text-slate-500" data-testid="text-quiz-info">Free • 5 minutes • AI-powered</div>
    </div>
  );
}
