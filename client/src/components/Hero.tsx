import { motion } from "framer-motion";
import { ShieldCheck, PlayCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import MockHeroCard from "./MockHeroCard";
import GlowDot from "./GlowDot";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Hero() {
  return (
    <section className="relative mx-auto max-w-7xl px-4 pt-14 pb-10 grid md:grid-cols-2 gap-8 items-center overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-25">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-blob" />
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-emerald-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000" />
      </div>
      <motion.div variants={fadeUp} initial="hidden" animate="show" className="space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 ring-1 ring-emerald-500/30 px-3 py-1 text-emerald-200 text-xs animate-[pulse-glow_3s_ease-in-out_infinite]" data-testid="badge-proof">
          <ShieldCheck className="h-3.5 w-3.5"/> AI-guided, exam-proven learning
        </div>
        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight" data-testid="text-headline">
          Find your Agri career fit in 5 minutes. <span className="text-emerald-400 drop-shadow-[0_0_15px_rgba(52,211,153,0.5)]">Stay confident</span> all year.
        </h1>
        <p className="text-slate-300 text-base md:text-lg max-w-xl" data-testid="text-subheadline">
          With AI-backed quizzes, personalized pathways, and outcome-first guidance — your path becomes clear, not crowded.
        </p>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/25 hover:shadow-emerald-400/40 transition-shadow" data-testid="button-quiz-primary">
            <Link href="/career-quiz">
              Get My Career Plan → <PlayCircle className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
        <ul className="text-sm text-slate-400 grid grid-cols-1 sm:grid-cols-2 gap-2 max-w-xl mt-2">
          <li data-testid="text-feature-1">
            <Link href="/planb" className="hover:text-emerald-400 transition-colors">
              Up-skilling for Plan B (Excel, PPT, AI)
            </Link>
          </li>
          <li data-testid="text-feature-2">
            <Link href="/alumni-webinars" className="hover:text-emerald-400 transition-colors">
              Alumni Connect – live workshops
            </Link>
          </li>
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
