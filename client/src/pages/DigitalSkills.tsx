import Nav from "@/components/Nav";
import { Check, Calendar, Clock, Users, MessageCircle } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

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

  const whatsappMessage = encodeURIComponent(
    "Hi, I want to join the Digital Skills Zoom training group for Excel, Data Visualization & PowerPoint classes."
  );
  const whatsappLink = `https://wa.me/918250904021?text=${whatsappMessage}`;

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
            Send us a message on WhatsApp to join our training group. You'll receive class schedules, Zoom links, and practice materials.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold transition-colors"
            data-testid="button-join-whatsapp"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Join Training Group on WhatsApp
          </a>
          <p className="text-slate-400 text-sm mt-4">
            +91 82509 04021
          </p>
        </section>
      </main>
    </div>
  );
}
