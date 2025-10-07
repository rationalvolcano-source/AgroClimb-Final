import { motion } from "framer-motion";
import { ShieldCheck, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import MockHeroCard from "./MockHeroCard";
import GlowDot from "./GlowDot";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 pt-14 pb-10 grid md:grid-cols-2 gap-8 items-center">
      <motion.div variants={fadeUp} initial="hidden" animate="show" className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/30 px-3 py-1 text-emerald-200 text-xs animate-[pulse-glow_3s_ease-in-out_infinite]" data-testid="badge-proof">
          <ShieldCheck className="h-3.5 w-3.5"/> AI-guided, exam-proven learning
        </div>
        <h1 className="text-3xl md:text-5xl font-semibold leading-tight" data-testid="text-headline">
          Find your direction in minutes. <span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">Stay ahead</span> all year.
        </h1>
        <p className="text-slate-300 text-base md:text-lg max-w-xl" data-testid="text-subheadline">
          Built for Agri students who want clarity, speed, and results — not confusion. Your AI mentor is ready.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Button size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/40 transition-shadow" data-testid="button-quiz-primary">
            Get My Career Plan → <PlayCircle className="ml-2 h-5 w-5" />
          </Button>
          <Button size="lg" variant="secondary" data-testid="button-games">
            Explore Interactive Games
          </Button>
        </div>
        <ul className="text-sm text-slate-400 grid grid-cols-1 sm:grid-cols-3 gap-2 max-w-xl mt-2">
          <li data-testid="text-feature-1">Up-skilling for Plan B (Excel, PPT, AI)</li>
          <li data-testid="text-feature-2">Alumni Connect – live workshops</li>
          <li data-testid="text-feature-3">Flashcards • PYQs • Notes</li>
        </ul>
      </motion.div>
      <motion.div variants={fadeUp} initial="hidden" animate="show" className="relative">
        <div className="rounded-3xl bg-gradient-to-br from-slate-800/60 to-slate-900/60 p-3 border border-slate-700 shadow-2xl">
          <MockHeroCard />
        </div>
        <GlowDot className="top-10 -right-6" />
        <GlowDot className="bottom-10 -left-6" color="from-emerald-400 to-cyan-400" />
      </motion.div>
    </section>
  );
}
