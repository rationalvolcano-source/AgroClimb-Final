import { Brain, FlaskConical, Gamepad2, BookOpen, Video, Heart, Puzzle, Users } from "lucide-react";

export default function Features() {
  const data = [
    { 
      icon: Brain, 
      title: "Career Guidance Quiz", 
      desc: "AI-powered fit analysis across 8 career clusters—Academia to Banking, Corporate to Entrepreneurship." 
    },
    { 
      icon: FlaskConical, 
      title: "Subject Recommender", 
      desc: "Academic path? Get precise subject recommendations starting with Horticulture JRF." 
    },
    { 
      icon: Gamepad2, 
      title: "Interactive Games", 
      desc: "Master recall, reasoning, and speed through Flashcard Duel, Logic Orchard & Number Sprint." 
    },
    { 
      icon: BookOpen, 
      title: "Books & PYQs", 
      desc: "High-yield PDFs and topic-wise practice tests. Single titles or complete bundles." 
    },
    { 
      icon: Video, 
      title: "Recorded Classes", 
      desc: "Learn anytime with expert educators. Ultra courses expand pathway-by-pathway." 
    },
    { 
      icon: Heart, 
      title: "Wellness Centre", 
      desc: "Free micro-sessions for focus and calm. Embedded tools for sustainable study habits." 
    },
    { 
      icon: Puzzle, 
      title: "Plan B Skills", 
      desc: "Practical upskilling in Excel, PPT, AI tools, freelancing & agri-consulting. Coming soon." 
    },
    { 
      icon: Users, 
      title: "Alumni Webinars", 
      desc: "Weekly ₹9 live sessions for real insights, motivation & personalized doubt-clearing." 
    },
  ];

  return (
    <section id="features" className="mt-12">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center" data-testid="text-features-title">Features</h2>
      <p className="text-slate-400 text-center mt-1" data-testid="text-features-subtitle">Focused tools for learning, clarity & momentum</p>

      <div className="grid md:grid-cols-4 gap-4 md:gap-6 mt-6">
        {data.map((f, i) => {
          const Icon = f.icon;
          return (
            <div key={f.title} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5" data-testid={`card-feature-${i}`}>
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-cyan-500/10 text-cyan-400 mb-3" data-testid={`icon-feature-${i}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-semibold mt-2" data-testid={`text-feature-title-${i}`}>{f.title}</h3>
              <p className="text-slate-300 mt-2 text-sm" data-testid={`text-feature-desc-${i}`}>{f.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
