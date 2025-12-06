import Nav from "@/components/Nav";
import { Check, Calendar, Clock, Users, MessageCircle } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { EnrollmentGate, DirectWhatsAppLink } from "@/components/EnrollmentGate";

const curriculum = [
  {
    module: "Excel Mastery",
    weeks: "Weeks 1-3",
    topics: [
      "Excel basics & navigation",
      "Data entry & formatting",
      "Essential formulas (SUM, AVERAGE, IF, VLOOKUP)",
      "Pivot Tables & data summarization",
      "Charts & data visualization",
      "Print-ready reports",
    ],
  },
  {
    module: "Data Visualization",
    weeks: "Weeks 4-5",
    topics: [
      "Choosing the right chart types",
      "Creating impactful dashboards",
      "Color theory & visual hierarchy",
      "Storytelling with data",
      "Real-world agricultural data projects",
    ],
  },
  {
    module: "PowerPoint Excellence",
    weeks: "Weeks 6-7",
    topics: [
      "Professional slide design",
      "Master layouts & themes",
      "Animations & transitions",
      "Presenting with confidence",
      "Creating pitch decks & reports",
    ],
  },
];

const highlights = [
  { icon: Calendar, text: "Weekly live sessions on Zoom" },
  { icon: Clock, text: "1-2 hours per session" },
  { icon: Users, text: "Small batch for personal attention" },
  { icon: MessageCircle, text: "WhatsApp group for doubt clearing" },
];

export default function DigitalSkills() {
  useSEO({
    title: "Digital Skills Training - Excel, PowerPoint for Agriculture Students",
    description: "Learn Excel, Data Visualization & PowerPoint in 7 weeks. Live Zoom classes for BSc Agriculture, Horticulture students. Build skills for agribusiness, banking exams, and corporate jobs.",
    keywords: "Excel training agriculture students, PowerPoint course BSc Agriculture, digital skills agribusiness, data visualization agriculture, Excel for IBPS AFO, Excel course India",
    canonicalPath: "/digital-skills",
  });

  const whatsappMessage = "Hi, I want to join the Digital Skills Zoom training group for Excel, Data Visualization & PowerPoint classes.";

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Nav />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-10" data-testid="section-digital-skills-header">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v12h16V6H4zm11 3l3-2v8l-3-2v-4z"/>
              </svg>
              LIVE ZOOM CLASSES
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3" data-testid="text-digital-skills-title">
            Digital Skills Training
          </h1>
          <p className="text-slate-300 text-lg" data-testid="text-digital-skills-subtitle">
            Master Excel, Data Visualization & PowerPoint in 7 weeks with live weekly Zoom sessions
          </p>
        </header>

        <section className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {highlights.map(({ icon: Icon, text }, i) => (
            <div 
              key={i} 
              className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800"
              data-testid={`highlight-${i}`}
            >
              <Icon className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              <span className="text-sm text-slate-300">{text}</span>
            </div>
          ))}
        </section>

        <section className="mb-10" data-testid="section-curriculum">
          <h2 className="text-2xl font-semibold mb-6">What You'll Learn</h2>
          <div className="space-y-6">
            {curriculum.map(({ module, weeks, topics }, moduleIndex) => (
              <div 
                key={module} 
                className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden"
                data-testid={`curriculum-module-${moduleIndex}`}
              >
                <div className="p-5 border-b border-slate-800 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-slate-50">{module}</h3>
                    <span className="text-sm text-emerald-400 font-medium">{weeks}</span>
                  </div>
                </div>
                <div className="p-5">
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {topics.map((topic, topicIndex) => (
                      <li 
                        key={topicIndex} 
                        className="flex items-start gap-2 text-slate-300"
                        data-testid={`topic-${moduleIndex}-${topicIndex}`}
                      >
                        <Check className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 to-cyan-500/10 p-6 md:p-8 text-center" data-testid="section-cta">
          <h2 className="text-2xl font-bold mb-3">Ready to Join?</h2>
          <p className="text-slate-300 mb-6 max-w-lg mx-auto">
            Sign up to join our training group. You'll receive class schedules, Zoom links, and practice materials.
          </p>
          <EnrollmentGate
            program="digital-skills"
            buttonText="Sign Up for Training"
            buttonClassName="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold transition-colors"
            programTitle="Digital Skills Training"
            programDescription="You'll receive class schedules, Zoom links, and practice materials for Excel, Data Visualization & PowerPoint."
            whatsappMessage={whatsappMessage}
          />
          <p className="text-slate-400 text-sm mt-4">
            <DirectWhatsAppLink 
              buttonText="Skip sign up? Message us directly" 
              whatsappMessage={whatsappMessage}
              program="digital-skills"
            />
          </p>
        </section>
      </main>
    </div>
  );
}
