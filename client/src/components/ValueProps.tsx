import { motion } from "framer-motion";
import { GraduationCap, LineChart, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const items = [
  {
    icon: GraduationCap,
    title: "Career Guidance Quiz",
    desc: "A 100% unbiased, data-backed fit analysis for ABM, Banking, and JRF Horticulture. If your strengths align better with another path, AgroClimb will suggest trusted alternatives instead of forcing a mismatch.",
  },
  {
    icon: TrendingUp,
    title: "Digital Skills Training",
    desc: "7-week live Zoom program covering Excel, Data Visualization & PowerPoint for career-ready skills.",
  },
  {
    icon: Users,
    title: "Alumni Webinars",
    desc: "Live sessions for real insights, motivation & personalized doubt-clearing from industry professionals.",
  },
  {
    icon: LineChart,
    title: "Interview Prep",
    desc: "Exam-specific guidance for ABM, IBPS SO-AFO & more. Master self-presentation and ace your interviews.",
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
              {cardContent}
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
