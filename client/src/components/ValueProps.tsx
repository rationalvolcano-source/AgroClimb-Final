import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Gamepad2, LineChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "wouter";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const items = [
  {
    icon: GraduationCap,
    title: "Career Guidance Quiz",
    desc: "A 100% unbiased, data-backed fit analysis for ABM, Banking, and JRF Horticulture. If your strengths align better with another path, The Agri Vision will suggest trusted alternatives instead of forcing a mismatch.",
  },
  {
    icon: BookOpen,
    title: "Notes, PYQs & Mocks",
    desc: "High-yield content by topic and difficulty, with spaced repetition.",
  },
  {
    icon: Gamepad2,
    title: "Interactive Games",
    desc: "Study without fatigue — quiz duels, runners, and match-3 recall to make practice stick.",
  },
  {
    icon: LineChart,
    title: "Recorded Classes",
    desc: "Learn anytime from top educators. Structured lessons with topic-wise clarity and exam-ready focus.",
  },
];

export default function ValueProps() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid md:grid-cols-4 gap-4">
        {items.map((it, i) => {
          const Icon = it.icon;
          const cardContent = (
            <Card className="bg-slate-900/60 border-slate-800 hover:border-slate-700 transition-all rounded-2xl h-full">
              <CardHeader>
                <div className="inline-flex items-center justify-center h-10 w-10 rounded-xl bg-emerald-500/10 text-emerald-300">
                  <Icon className="h-5 w-5" data-testid={`icon-${i}`} />
                </div>
                <CardTitle className="text-base mt-3" data-testid={`card-title-${i}`}>{it.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-slate-400" data-testid={`card-desc-${i}`}>{it.desc}</p>
              </CardContent>
            </Card>
          );
          
          return (
            <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
              {it.title === "Notes, PYQs & Mocks" ? (
                <Link href="/books" className="block cursor-pointer">
                  {cardContent}
                </Link>
              ) : it.title === "Interactive Games" ? (
                <Link href="/games" className="block cursor-pointer">
                  {cardContent}
                </Link>
              ) : (
                cardContent
              )}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
