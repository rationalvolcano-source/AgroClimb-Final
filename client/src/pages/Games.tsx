import { useState, useRef } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Brain, Zap, BookOpen, Gamepad2 } from "lucide-react";
import Nav from "@/components/Nav";

const STREAMS = [
  "JRF Horticulture",
  "Banking – English",
  "Banking – Quants & DI",
  "Banking – Logical Reasoning",
  "Banking – Financial & Banking Affairs",
  "ABM – VARC",
  "ABM – DILR",
  "ABM – QA",
  "Banking – Agri Affairs",
];

export type GameId = "flashcard" | "logic" | "sprint" | "word";

// Game allocation based on pedagogical rationale
const STREAM_GAMES: Record<string, GameId[]> = {
  "JRF Horticulture": ["flashcard"],
  "Banking – English": ["word"],
  "Banking – Quants & DI": ["sprint"],
  "Banking – Logical Reasoning": ["logic"],
  "Banking – Financial & Banking Affairs": ["flashcard"],
  "ABM – VARC": ["word"],
  "ABM – DILR": ["logic", "sprint"],
  "ABM – QA": ["sprint"],
  "Banking – Agri Affairs": ["flashcard"],
};

const GAME_INFO = {
  flashcard: {
    title: "Flashcard Duel",
    subtitle: "Rapid recall battles",
    description: "Answer fast, build streaks, dominate the leaderboard. Designed for semantic memory and recall reinforcement.",
    accent: "emerald" as const,
    Logo: LogoDuel,
  },
  logic: {
    title: "Logic Orchard",
    subtitle: "Reasoning • Match‑3",
    description: "Match symbols, unlock combos, train your LR muscle. Built for visual pattern recognition and fluid intelligence.",
    accent: "cyan" as const,
    Logo: LogoOrchard,
  },
  sprint: {
    title: "Number Sprint",
    subtitle: "Quants • Speed run",
    description: "Timed DI/QA sprints with clean visuals and instant feedback. Optimized for processing speed and computational fluency.",
    accent: "violet" as const,
    Logo: LogoSprint,
  },
  word: {
    title: "Word Sprint",
    subtitle: "Reading • Comprehension",
    description: "Race through passages, answer questions, build vocabulary. Sharpens reading comprehension and language intelligence.",
    accent: "amber" as const,
    Logo: LogoWord,
  },
};

export default function Games() {
  const [stream, setStream] = useState<string>("");
  const streamSelectorRef = useRef<HTMLDivElement>(null);
  const [, setLocation] = useLocation();

  const availableGames = stream ? STREAM_GAMES[stream] || [] : [];

  function scrollToStreamSelector() {
    streamSelectorRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  function launchGame(gameId: GameId) {
    if (!stream) return;
    
    if (gameId === "flashcard") {
      // Navigate to internal Flashcard Duel game
      setLocation("/flashcard-duel");
    } else {
      // Other games - under construction
      alert(`${GAME_INFO[gameId].title} is coming soon!`);
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Nav />
      
      <main className="mx-auto max-w-7xl px-4 py-12">
        <Hero onGameClick={scrollToStreamSelector} />
        
        <Card ref={streamSelectorRef} className="bg-slate-900/60 border-slate-800 p-6 mt-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex-1">
              <h3 className="text-lg font-semibold mb-1" data-testid="text-stream-selector-title">
                Choose Your Stream
              </h3>
              <p className="text-sm text-slate-400">
                Select your academic stream to see recommended games
              </p>
            </div>
            <Select value={stream} onValueChange={setStream}>
              <SelectTrigger className="bg-slate-950 border-slate-700 w-full sm:w-[320px]" data-testid="select-stream">
                <SelectValue placeholder="-- Select a stream --" />
              </SelectTrigger>
              <SelectContent className="bg-slate-950 border-slate-700">
                {STREAMS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </Card>

        {stream && availableGames.length > 0 && (
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6" data-testid="text-recommended-games">
              Recommended Games for {stream}
            </h2>
            <div className={`grid gap-6 ${availableGames.length === 1 ? 'md:grid-cols-1 max-w-xl' : availableGames.length === 2 ? 'md:grid-cols-2' : 'md:grid-cols-3'}`}>
              {availableGames.map((gameId) => {
                const game = GAME_INFO[gameId];
                return (
                  <GameCard
                    key={gameId}
                    title={game.title}
                    subtitle={game.subtitle}
                    description={game.description}
                    onClick={() => launchGame(gameId)}
                    Logo={game.Logo}
                    accent={game.accent}
                  />
                );
              })}
            </div>
          </div>
        )}

        {stream && availableGames.length === 0 && (
          <div className="mt-8 text-center py-12">
            <p className="text-slate-400">No games available for this stream yet.</p>
          </div>
        )}

        {!stream && (
          <div className="mt-8 text-center py-12">
            <p className="text-slate-400">Select a stream above to see your recommended games</p>
          </div>
        )}
      </main>
    </div>
  );
}

function Hero({ onGameClick }: { onGameClick: () => void }) {
  return (
    <Card className="bg-slate-900/60 border-slate-800 p-8">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight" data-testid="text-games-title">
            Play your way to mastery.
          </h1>
          <p className="text-slate-300 mt-4 text-lg" data-testid="text-games-subtitle">
            Pedagogically designed games for fast learning. Pick your stream and start.
          </p>
          <ul className="text-sm text-slate-400 grid grid-cols-2 gap-3 mt-6">
            <li className="flex items-center gap-2">
              <Gamepad2 className="h-4 w-4 text-emerald-400" />
              Recall & reinforcement
            </li>
            <li className="flex items-center gap-2">
              <Brain className="h-4 w-4 text-cyan-400" />
              Visual pattern recognition
            </li>
            <li className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-violet-400" />
              Processing speed
            </li>
            <li className="flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-amber-400" />
              Language intelligence
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <button type="button" onClick={onGameClick} className="transition-transform hover:scale-105" data-testid="button-hero-flashcard">
            <LogoDuel className="w-full" />
          </button>
          <button type="button" onClick={onGameClick} className="transition-transform hover:scale-105" data-testid="button-hero-logic">
            <LogoOrchard className="w-full" />
          </button>
          <button type="button" onClick={onGameClick} className="transition-transform hover:scale-105" data-testid="button-hero-sprint">
            <LogoSprint className="w-full" />
          </button>
          <button type="button" onClick={onGameClick} className="transition-transform hover:scale-105" data-testid="button-hero-word">
            <LogoWord className="w-full" />
          </button>
        </div>
      </div>
    </Card>
  );
}

function GameCard({ title, subtitle, description, onClick, Logo, accent }: {
  title: string;
  subtitle: string;
  description: string;
  onClick: () => void;
  Logo: React.FC<any>;
  accent: "emerald" | "cyan" | "violet" | "amber";
}) {
  const accentRing = accent === "emerald" 
    ? "ring-emerald-400/40 hover:border-emerald-400/30" 
    : accent === "cyan" 
    ? "ring-cyan-400/40 hover:border-cyan-400/30" 
    : accent === "violet"
    ? "ring-violet-400/40 hover:border-violet-400/30"
    : "ring-amber-400/40 hover:border-amber-400/30";
    
  return (
    <button
      onClick={onClick}
      className={`text-left rounded-2xl border border-slate-800 bg-slate-900/60 p-6 hover:border-slate-700 transition-all ring-1 ${accentRing}`}
      data-testid={`button-game-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <div className="h-28 flex items-center">
        <Logo className="h-20 w-auto mx-auto" />
      </div>
      <div className="mt-4">
        <div className="text-lg font-semibold" data-testid={`text-game-title-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {title}
        </div>
        <div className="text-xs uppercase tracking-wide text-slate-400 mt-1">
          {subtitle}
        </div>
        <p className="text-sm text-slate-300 mt-3">
          {description}
        </p>
      </div>
    </button>
  );
}

// ---------------- Logos (inline SVG) ----------------
function LogoDuel({ className = "h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 260 80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0" stopColor="#34d399" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="260" height="80" rx="16" fill="#0b1220" stroke="#1f2937" />
      <circle cx="40" cy="40" r="22" fill="url(#g1)" opacity="0.25" />
      <text x="40" y="46" textAnchor="middle" fontFamily="ui-sans-serif,system-ui" fontSize="18" fill="#34d399">VS</text>
      <text x="78" y="47" fontFamily="ui-sans-serif,system-ui" fontSize="22" fill="#e5e7eb">Flashcard Duel</text>
    </svg>
  );
}

function LogoOrchard({ className = "h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g2" x1="0" x2="1">
          <stop offset="0" stopColor="#22d3ee" />
          <stop offset="1" stopColor="#34d399" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="200" height="80" rx="16" fill="#0b1220" stroke="#1f2937" />
      <g transform="translate(26,18)">
        <rect x="0" y="20" width="24" height="24" rx="6" fill="url(#g2)" opacity="0.25" />
        <rect x="28" y="8" width="24" height="36" rx="6" fill="url(#g2)" opacity="0.35" />
        <rect x="56" y="0" width="24" height="44" rx="6" fill="url(#g2)" opacity="0.45" />
      </g>
      <text x="100" y="47" fontFamily="ui-sans-serif,system-ui" fontSize="22" fill="#e5e7eb" textAnchor="middle">Logic Orchard</text>
    </svg>
  );
}

function LogoSprint({ className = "h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g3" x1="0" x2="1">
          <stop offset="0" stopColor="#a78bfa" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="200" height="80" rx="16" fill="#0b1220" stroke="#1f2937" />
      <path d="M28 52c18-10 30-22 48-28 18-6 38-6 64-2" stroke="url(#g3)" strokeWidth="3" fill="none" />
      <text x="110" y="47" fontFamily="ui-sans-serif,system-ui" fontSize="22" fill="#e5e7eb" textAnchor="middle">Number Sprint</text>
    </svg>
  );
}

function LogoWord({ className = "h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g4" x1="0" x2="1">
          <stop offset="0" stopColor="#fbbf24" />
          <stop offset="1" stopColor="#f59e0b" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="200" height="80" rx="16" fill="#0b1220" stroke="#1f2937" />
      <g transform="translate(20,28)">
        <rect x="0" y="0" width="8" height="24" rx="2" fill="url(#g4)" opacity="0.6" />
        <rect x="12" y="0" width="8" height="24" rx="2" fill="url(#g4)" opacity="0.7" />
        <rect x="24" y="0" width="8" height="24" rx="2" fill="url(#g4)" opacity="0.8" />
        <rect x="36" y="0" width="8" height="24" rx="2" fill="url(#g4)" opacity="0.6" />
        <rect x="48" y="0" width="8" height="24" rx="2" fill="url(#g4)" opacity="0.9" />
      </g>
      <text x="84" y="47" fontFamily="ui-sans-serif,system-ui" fontSize="22" fill="#e5e7eb">Word Sprint</text>
    </svg>
  );
}
