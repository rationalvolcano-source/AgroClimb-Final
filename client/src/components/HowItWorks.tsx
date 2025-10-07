import { motion } from "framer-motion";
import { ClipboardList, Target, RouteIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const steps = [
  {
    icon: ClipboardList,
    title: "Take Quiz",
    desc: "5 minutes, no fluff.",
  },
  {
    icon: Target,
    title: "See Your Fit",
    desc: "Get an honest, unbiased career recommendation: ABM, Banking, or JRF Horticulture.",
  },
  {
    icon: RouteIcon,
    title: "Get Plan or Redirect",
    desc: "If another path fits better, we recommend the right course elsewhere.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <motion.div 
        variants={fadeUp} 
        initial="hidden" 
        whileInView="show" 
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-extrabold mb-2" data-testid="text-how-it-works-title">How It Works</h2>
        <p className="text-slate-400" data-testid="text-how-it-works-subtitle">Three simple steps to clarity</p>
      </motion.div>
      
      <div className="grid md:grid-cols-3 gap-6">
        {steps.map((step, i) => {
          const Icon = step.icon;
          return (
            <motion.div 
              key={i} 
              variants={fadeUp} 
              initial="hidden" 
              whileInView="show" 
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="bg-card border-card-border hover:border-primary/30 transition-all rounded-2xl h-full">
                <CardHeader>
                  <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-primary/10 text-primary mb-3">
                    <Icon className="h-6 w-6" data-testid={`icon-step-${i}`} />
                  </div>
                  <h3 className="text-lg font-semibold" data-testid={`step-title-${i}`}>{step.title}</h3>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground" data-testid={`step-desc-${i}`}>{step.desc}</p>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
