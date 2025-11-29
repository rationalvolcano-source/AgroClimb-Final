import { Brain, Puzzle, Users, TrendingUp, Newspaper } from "lucide-react";
import { Link } from "wouter";

export default function Features() {
  const data = [
    { 
      icon: Brain, 
      title: "Career Guidance Quiz", 
      desc: "AI-powered fit analysis across 5 career paths—Research, Academics, Agribusiness, Banking & Govt Jobs.",
      link: "/career-quiz"
    },
    { 
      icon: TrendingUp, 
      title: "Interview Prep", 
      desc: "Exam-specific guidance for ABM, IBPS SO-AFO & more. Master self-presentation and common questions.",
      link: "/interview-prep"
    },
    { 
      icon: Puzzle, 
      title: "Digital Skills", 
      desc: "7-week live Zoom training—Excel, Data Visualization & PowerPoint for career-ready skills.",
      link: "/digital-skills"
    },
    { 
      icon: Newspaper, 
      title: "Daily News", 
      desc: "Stay updated with curated agricultural news and current affairs for competitive exams.",
      link: "/daily-news"
    },
    { 
      icon: Users, 
      title: "Alumni Webinars", 
      desc: "Live sessions for real insights, motivation & personalized doubt-clearing from industry professionals.",
      link: "/alumni-webinars"
    },
  ];

  return (
    <section id="features" className="mt-12">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center" data-testid="text-features-title">Features</h2>
      <p className="text-slate-400 text-center mt-1" data-testid="text-features-subtitle">Focused tools for learning, clarity & momentum</p>

      <div className="grid md:grid-cols-3 gap-4 md:gap-6 mt-6">
        {data.map((f, i) => {
          const Icon = f.icon;
          const CardContent = (
            <>
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-cyan-500/10 text-cyan-400 mb-3" data-testid={`icon-feature-${i}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mt-2" data-testid={`text-feature-title-${i}`}>{f.title}</h3>
              <p className="text-slate-300 mt-2 text-sm" data-testid={`text-feature-desc-${i}`}>{f.desc}</p>
            </>
          );

          if ('link' in f && f.link) {
            return (
              <Link key={f.title} href={f.link}>
                <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5 hover:border-emerald-500/50 transition-colors cursor-pointer" data-testid={`card-feature-${i}`}>
                  {CardContent}
                </div>
              </Link>
            );
          }

          return (
            <div key={f.title} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5" data-testid={`card-feature-${i}`}>
              {CardContent}
            </div>
          );
        })}
      </div>
    </section>
  );
}
