import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { 
  Compass, 
  Mic, 
  Laptop, 
  Users, 
  Brain,
  Send,
  ArrowRight,
  Sparkles
} from "lucide-react";
import { motion } from "framer-motion";

const ctaItems = [
  {
    title: "Career Counselling",
    description: "1-on-1 guidance from industry experts",
    icon: Compass,
    href: "https://t.me/+uQNpa83oEmIxOTA9",
    isExternal: true,
    gradient: "from-emerald-500 to-emerald-600",
    shadowColor: "shadow-emerald-500/30",
  },
  {
    title: "Interview Prep",
    description: "Master your interview skills",
    icon: Mic,
    href: "/interview-prep",
    isExternal: false,
    gradient: "from-cyan-500 to-cyan-600",
    shadowColor: "shadow-cyan-500/30",
  },
  {
    title: "Digital Upskilling",
    description: "Learn in-demand digital skills",
    icon: Laptop,
    href: "/digital-skills",
    isExternal: false,
    gradient: "from-teal-500 to-teal-600",
    shadowColor: "shadow-teal-500/30",
  },
  {
    title: "Alumni Webinars",
    description: "Learn from successful alumni",
    icon: Users,
    href: "/alumni-webinars",
    isExternal: false,
    gradient: "from-emerald-400 to-cyan-500",
    shadowColor: "shadow-emerald-400/30",
  },
  {
    title: "Career Quiz",
    description: "Discover your ideal career path",
    icon: Brain,
    href: "/career-quiz",
    isExternal: false,
    gradient: "from-cyan-400 to-emerald-500",
    shadowColor: "shadow-cyan-400/30",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 px-4 py-1.5 mb-4">
          <Sparkles className="h-4 w-4 text-emerald-400" />
          <span className="text-sm text-emerald-400 font-medium">Start Your Journey</span>
        </div>
        <h2 className="text-2xl md:text-3xl font-semibold" data-testid="cta-headline">
          Everything You Need to <span className="text-emerald-400">Succeed</span>
        </h2>
        <p className="text-slate-300 mt-2 max-w-2xl mx-auto" data-testid="cta-subheadline">
          Access expert guidance, skill-building resources, and personalized career planning
        </p>
      </div>

      <motion.div
        className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {ctaItems.map((item, index) => {
          const Icon = item.icon;
          const content = (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`relative group cursor-pointer rounded-2xl bg-slate-900/60 border border-slate-800 p-5 text-center transition-all duration-300 hover:border-slate-700 hover:bg-slate-900/80 ${item.shadowColor} hover:shadow-lg`}
              data-testid={`cta-card-${index}`}
            >
              <div className={`mx-auto w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center mb-4 shadow-lg ${item.shadowColor} group-hover:scale-110 transition-transform duration-300`}>
                <Icon className="h-7 w-7 text-white" />
              </div>
              <h3 className="font-semibold text-white text-sm md:text-base mb-1" data-testid={`cta-title-${index}`}>
                {item.title}
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed" data-testid={`cta-description-${index}`}>
                {item.description}
              </p>
              {item.isExternal && (
                <div className="mt-3 inline-flex items-center gap-1 text-xs text-cyan-400">
                  <Send className="h-3 w-3" />
                  <span>Join on Telegram</span>
                </div>
              )}
              {!item.isExternal && (
                <div className="mt-3 inline-flex items-center gap-1 text-xs text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Explore</span>
                  <ArrowRight className="h-3 w-3" />
                </div>
              )}
            </motion.div>
          );

          if (item.isExternal) {
            return (
              <a
                key={index}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                data-testid={`cta-link-${index}`}
              >
                {content}
              </a>
            );
          }

          return (
            <Link key={index} href={item.href} data-testid={`cta-link-${index}`}>
              {content}
            </Link>
          );
        })}
      </motion.div>

      <div className="mt-10 text-center">
        <div className="rounded-3xl bg-gradient-to-br from-emerald-600/20 to-cyan-600/10 border border-emerald-500/30 p-6 shadow-2xl shadow-emerald-500/10 inline-block">
          <p className="text-slate-300 mb-4">Not sure where to start?</p>
          <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-400/40 transition-shadow" data-testid="button-cta-quiz">
            <Link href="/career-quiz">
              Take the Career Quiz <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
