import { useLocation } from "wouter";
import { Card } from "@/components/ui/card";
import { Brain, Zap, BookOpen } from "lucide-react";
import Nav from "@/components/Nav";

export default function Games() {
  const [, setLocation] = useLocation();

  function launchGame(gameId: string) {
    if (gameId === "flashcard") {
      setLocation("/flashcard-duel");
    } else if (gameId === "sprint") {
      setLocation("/games-hub?game=sprint");
    } else if (gameId === "word") {
      setLocation("/word-sprint");
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Nav />
      
      <main className="mx-auto max-w-5xl px-4 py-12">
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold" data-testid="text-games-title">
            Learning Games
          </h1>
          <p className="text-slate-400 mt-3 text-lg" data-testid="text-games-subtitle">
            Play your way to mastery with these brain-training games
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <GameCard
            title="Flashcard Duel"
            subtitle="Memory & Recall"
            description="Answer fast, build streaks, dominate the leaderboard. Designed for semantic memory and recall reinforcement."
            Icon={Brain}
            accent="emerald"
            onClick={() => launchGame("flashcard")}
          />
          
          <GameCard
            title="Number Sprint"
            subtitle="Math & Speed"
            description="Timed mental math challenges with instant feedback. Optimized for processing speed and computational fluency."
            Icon={Zap}
            accent="violet"
            onClick={() => launchGame("sprint")}
          />
          
          <GameCard
            title="Word Sprint"
            subtitle="Vocabulary & Language"
            description="Daily crossword puzzles with hints to build your vocabulary. Resets every day with fresh challenges."
            Icon={BookOpen}
            accent="amber"
            onClick={() => launchGame("word")}
          />
        </div>
      </main>
    </div>
  );
}

function GameCard({ title, subtitle, description, onClick, Icon, accent }: {
  title: string;
  subtitle: string;
  description: string;
  onClick: () => void;
  Icon: React.FC<{ className?: string }>;
  accent: "emerald" | "violet" | "amber";
}) {
  const accentColors = {
    emerald: {
      ring: "ring-emerald-400/40 hover:border-emerald-400/30",
      icon: "text-emerald-400",
      bg: "bg-emerald-500/10",
    },
    violet: {
      ring: "ring-violet-400/40 hover:border-violet-400/30",
      icon: "text-violet-400",
      bg: "bg-violet-500/10",
    },
    amber: {
      ring: "ring-amber-400/40 hover:border-amber-400/30",
      icon: "text-amber-400",
      bg: "bg-amber-500/10",
    },
  };
  
  const colors = accentColors[accent];
    
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-slate-700 transition-all ring-1 ${colors.ring} hover:scale-[1.02]`}
      data-testid={`button-game-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className={`h-16 w-16 rounded-xl ${colors.bg} flex items-center justify-center mb-4`}>
        <Icon className={`h-8 w-8 ${colors.icon}`} />
      </div>
      <div className="text-xl font-semibold" data-testid={`text-game-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
        {title}
      </div>
      <div className="text-xs uppercase tracking-wide text-slate-400 mt-1">
        {subtitle}
      </div>
      <p className="text-sm text-slate-300 mt-3">
        {description}
      </p>
    </button>
  );
}
