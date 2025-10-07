import { motion } from "framer-motion";
import { GraduationCap, BookOpen, Gamepad2, LineChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const items = [
  {
    icon: GraduationCap,
    title: "Career Guidance Quiz",
    desc: "Discover your true fit across Agri and allied domains with our data-driven quiz. Based on your responses, you'll get a personalized plan—or, if another field suits you better, we'll recommend the right course elsewhere.",
  },
  {
    icon: BookOpen,
    title: "Notes, PYQs & Mocks",
    desc: "High-yield content organized by topic and difficulty with spaced repetition.",
  },
  {
    icon: Gamepad2,
    title: "Interactive Games",
    desc: "Study that doesn't feel like study—quiz duels, runners, and match-3 for recall.",
  },
  {
    icon: LineChart,
    title: "Adaptive Engine",
    desc: "Next-best-item suggestions to keep you in the sweet spot of challenge.",
  },
];

export default function ValueProps() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid md:grid-cols-4 gap-4">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <motion.div key={i} variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
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
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
