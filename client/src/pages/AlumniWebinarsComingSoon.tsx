import Nav from "@/components/Nav";
import { Check, Calendar, Clock, Users, Send, Target } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { EnrollmentGate, DirectTelegramLink } from "@/components/EnrollmentGate";

const webinarModules = [
  {
    module: "Career Goal Setting",
    weeks: "Sessions 1-2",
    topics: [
      "Identifying your strengths & interests",
      "Mapping career paths in agriculture",
      "Setting SMART career goals",
      "Creating a 1-year action plan",
      "Building your professional network",
    ],
  },
  {
    module: "Industry Insights",
    weeks: "Sessions 3-4",
    topics: [
      "Day in the life of agri professionals",
      "Banking sector opportunities (IBPS, RBI)",
      "Research career paths (JRF, SRF, Scientist)",
      "Agribusiness & startup opportunities",
      "Government job preparation strategies",
    ],
  },
  {
    module: "Personal Branding",
    weeks: "Sessions 5-6",
    topics: [
      "Resume building for freshers",
      "LinkedIn profile optimization",
      "Interview preparation tips",
      "Salary negotiation basics",
      "Q&A with successful alumni",
    ],
  },
];

const highlights = [
  { icon: Calendar, text: "Weekly live sessions on Zoom" },
  { icon: Clock, text: "1-2 hours per session" },
  { icon: Users, text: "Learn from successful alumni" },
  { icon: Send, text: "Telegram group for networking" },
];

const TELEGRAM_LINK = "https://t.me/+n8xbzrqBXb1iOGI1";

export default function AlumniWebinarsComingSoon() {
  useSEO({
    title: "Alumni Webinars - Career Mentorship for Agriculture Students",
    description: "Learn from successful agriculture alumni. Career goal setting, industry insights, resume building, and interview preparation. Live Zoom sessions with professionals from banking, research, and agribusiness.",
    keywords: "agriculture career mentorship, alumni webinars agriculture, career guidance BSc Agriculture, agriculture industry insights, resume building freshers agriculture, agriculture career counselling",
    canonicalPath: "/alumni-webinars",
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Nav />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-10" data-testid="section-webinars-header">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-400 text-sm font-medium">
              <Target className="w-4 h-4" />
              CAREER GOAL
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3" data-testid="text-webinars-title">
            Alumni Webinars
          </h1>
          <p className="text-slate-300 text-lg" data-testid="text-webinars-subtitle">
            Get career guidance from successful alumni through live weekly Zoom sessions
          </p>
        </header>

        <section className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {highlights.map(({ icon: Icon, text }, i) => (
            <div 
              key={i} 
              className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800"
              data-testid={`highlight-${i}`}
            >
              <Icon className="w-5 h-5 text-cyan-400 flex-shrink-0" />
              <span className="text-sm text-slate-300">{text}</span>
            </div>
          ))}
        </section>

        <section className="mb-10" data-testid="section-curriculum">
          <h2 className="text-2xl font-semibold mb-6">What You'll Learn</h2>
          <div className="space-y-6">
            {webinarModules.map(({ module, weeks, topics }, moduleIndex) => (
              <div 
                key={module} 
                className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden"
                data-testid={`webinar-module-${moduleIndex}`}
              >
                <div className="p-5 border-b border-slate-800 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-slate-50">{module}</h3>
                    <span className="text-sm text-cyan-400 font-medium">{weeks}</span>
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
                        <Check className="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" />
                        <span className="text-sm">{topic}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-2xl border border-cyan-500/30 bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 p-6 md:p-8 text-center" data-testid="section-cta">
          <h2 className="text-2xl font-bold mb-3">Ready to Join?</h2>
          <p className="text-slate-300 mb-6 max-w-lg mx-auto">
            Sign up to join our webinar group. You'll receive session schedules, Zoom links, and exclusive resources.
          </p>
          <EnrollmentGate
            program="webinars"
            buttonText="Register for Webinars"
            buttonClassName="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold transition-colors"
            programTitle="Alumni Webinars"
            programDescription="You'll receive session schedules, Zoom links, and access to career guidance sessions with successful alumni."
            telegramLink={TELEGRAM_LINK}
          />
          <p className="text-slate-400 text-sm mt-4">
            <DirectTelegramLink 
              buttonText="Skip sign up? Join directly" 
              telegramLink={TELEGRAM_LINK}
              program="webinars"
            />
          </p>
        </section>
      </main>
    </div>
  );
}
