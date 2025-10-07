import { CheckCircle2, TrendingUp } from "lucide-react";

export default function MockHeroCard() {
  return (
    <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
      <div className="bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 px-4 py-3 border-b border-slate-800">
        <div className="text-sm font-medium" data-testid="text-mock-title">Career Pathway Quiz</div>
      </div>
      <div className="p-4 space-y-4">
        <div className="space-y-2">
          <div className="text-xs text-slate-400" data-testid="text-question-label">Question 3 of 10</div>
          <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full w-[30%] bg-gradient-to-r from-emerald-500 to-cyan-500" data-testid="progress-bar" />
          </div>
        </div>
        
        <div className="space-y-3">
          <div className="text-sm" data-testid="text-question">Which area interests you most?</div>
          
          <div className="space-y-2">
            {["Agribusiness Management", "Banking & Finance", "Research (JRF Horticulture)"].map((option, i) => (
              <button
                key={i}
                className="w-full text-left px-3 py-2 rounded-md border border-slate-700 hover:border-emerald-500/50 hover:bg-slate-800/50 transition-all text-sm"
                data-testid={`button-option-${i}`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-2 pt-2">
          <div className="flex items-center gap-1.5 text-xs text-emerald-400">
            <TrendingUp className="h-3.5 w-3.5" />
            <span data-testid="text-analytics">AI analyzing your fit...</span>
          </div>
        </div>
      </div>
    </div>
  );
}
