import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Star } from "lucide-react";
import Nav from "@/components/Nav";

const duelBaseUrl = "https://duel-quiz-react.lovable.app/";

const STREAMS = [
  "JRF Horticulture",
  "Banking – English",
  "Banking – Quants & Data Interpretation",
  "Banking – Logical Reasoning",
  "Banking – Financial & Banking Affairs",
  "ABM – VARC",
  "ABM – DILR",
  "ABM – QA",
  "Banking – Agri Affairs",
];

export type GameId = "flashcard" | "logic" | "sprint";

export default function Games() {
  const [pendingGame, setPendingGame] = useState<GameId | null>(null);
  const [stream, setStream] = useState<string>("");

  function openChooser(game: GameId) {
    setPendingGame(game);
  }

  function startGame() {
    if (!pendingGame || !stream) return;
    if (pendingGame === "flashcard") {
      const url = new URL(duelBaseUrl);
      url.searchParams.set("stream", stream);
      window.open(url.toString(), "_blank", "noopener,noreferrer");
    }
    setPendingGame(null);
    setStream("");
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Nav />
      
      <main className="mx-auto max-w-7xl px-4 py-12">
        <Hero />
        
        <div className="grid md:grid-cols-3 gap-6 mt-8">
          <GameCard
            title="Flashcard Duel"
            subtitle="Rapid recall battles"
            description="Answer fast, build streaks, dominate the leaderboard."
            onClick={() => openChooser("flashcard")}
            Logo={LogoDuel}
            accent="emerald"
          />
          <GameCard
            title="Logic Orchard"
            subtitle="Reasoning • Match‑3"
            description="Match symbols, unlock combos, train your LR muscle."
            onClick={() => openChooser("logic")}
            Logo={LogoOrchard}
            accent="cyan"
          />
          <GameCard
            title="Number Sprint"
            subtitle="Quants • Speed run"
            description="Timed DI/QA sprints with clean visuals and instant feedback."
            onClick={() => openChooser("sprint")}
            Logo={LogoSprint}
            accent="violet"
          />
        </div>
      </main>

      <ChooserModal
        open={!!pendingGame}
        onClose={() => setPendingGame(null)}
        onStart={startGame}
        value={stream}
        setValue={setStream}
        game={pendingGame}
      />
    </div>
  );
}

function Hero() {
  return (
    <Card className="bg-slate-900/60 border-slate-800 p-8">
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl md:text-5xl font-bold leading-tight" data-testid="text-games-title">
            Play your way to mastery.
          </h1>
          <p className="text-slate-300 mt-4 text-lg" data-testid="text-games-subtitle">
            Three visually clean games designed for fast learning. Pick a stream and start.
          </p>
          <ul className="text-sm text-slate-400 grid grid-cols-2 gap-3 mt-6">
            <li className="flex items-center gap-2">
              <Star className="h-4 w-4 text-emerald-400" />
              Fast loads
            </li>
            <li className="flex items-center gap-2">
              <Star className="h-4 w-4 text-emerald-400" />
              Minimal deps
            </li>
            <li className="flex items-center gap-2">
              <Star className="h-4 w-4 text-emerald-400" />
              Clean typography
            </li>
            <li className="flex items-center gap-2">
              <Star className="h-4 w-4 text-emerald-400" />
              Mobile‑friendly
            </li>
          </ul>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <LogoDuel className="w-full" />
          <LogoOrchard className="w-full" />
          <LogoSprint className="w-full" />
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
  accent: "emerald" | "cyan" | "violet";
}) {
  const accentRing = accent === "emerald" 
    ? "ring-emerald-400/40 hover:border-emerald-400/30" 
    : accent === "cyan" 
    ? "ring-cyan-400/40 hover:border-cyan-400/30" 
    : "ring-violet-400/40 hover:border-violet-400/30";
    
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

function ChooserModal({ open, onClose, onStart, value, setValue, game }: {
  open: boolean;
  onClose: () => void;
  onStart: () => void;
  value: string;
  setValue: (v: string) => void;
  game: GameId | null;
}) {
  const gameTitle = game === "flashcard" 
    ? "Flashcard Duel" 
    : game === "logic" 
    ? "Logic Orchard" 
    : "Number Sprint";

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="bg-slate-900 border-slate-800">
        <DialogHeader>
          <DialogTitle data-testid="text-chooser-title">Choose your stream</DialogTitle>
          <DialogDescription className="text-slate-400">
            Select a stream to launch <span className="font-semibold text-slate-300">{gameTitle}</span>.
          </DialogDescription>
        </DialogHeader>
        
        <Select value={value} onValueChange={setValue}>
          <SelectTrigger className="bg-slate-950 border-slate-700" data-testid="select-stream">
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

        <div className="flex items-center gap-3 justify-end mt-4">
          <Button 
            variant="outline" 
            onClick={onClose}
            data-testid="button-cancel"
          >
            Cancel
          </Button>
          <Button 
            onClick={onStart} 
            disabled={!value}
            className="bg-emerald-600 hover:bg-emerald-500"
            data-testid="button-start-game"
          >
            Start
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}

// ---------------- Logos (inline SVG) ----------------
function LogoDuel({ className = "h-16" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 80" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="g1" x1="0" x2="1">
          <stop offset="0" stopColor="#34d399" />
          <stop offset="1" stopColor="#22d3ee" />
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="200" height="80" rx="16" fill="#0b1220" stroke="#1f2937" />
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
