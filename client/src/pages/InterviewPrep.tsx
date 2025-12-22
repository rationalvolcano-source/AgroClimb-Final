import { useState } from "react";
import Nav from "@/components/Nav";
import { Check, Calendar, Clock, Users, Send, ChevronDown } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const examOptions = [
  { value: "", label: "Select your target exam" },
  { value: "abm-cat", label: "ABM / CAT" },
  { value: "ibps-so-afo", label: "IBPS SO-AFO" },
  { value: "other", label: "Others" },
];

const highlights = [
  { icon: Calendar, text: "Weekly live mock sessions" },
  { icon: Clock, text: "1-2 hours per session" },
  { icon: Users, text: "One-on-one feedback" },
  { icon: Send, text: "Telegram support group" },
];

const TELEGRAM_LINK = "https://t.me/+uQNpa83oEmIxOTA9";

const whatYouLearn = [
  "Professional introduction & self-presentation",
  "Common interview questions & best answers",
  "Body language & communication skills",
  "Technical/domain-specific preparation",
  "Group discussion techniques",
  "Handling stress & difficult questions",
  "Mock interviews with real-time feedback",
  "Post-interview follow-up strategies",
];

export default function InterviewPrep() {
  useSEO({
    title: "Interview Preparation - IBPS AFO, CAT, Agriculture Jobs India",
    description: "Prepare for IBPS AFO, CAT/MBA, and agriculture job interviews. Live mock sessions, one-on-one feedback, body language tips. Boost your confidence for banking and agribusiness interviews.",
    keywords: "IBPS AFO interview preparation, CAT interview tips, agriculture job interview, NABARD interview preparation, agribusiness MBA interview, banking interview agriculture",
    canonicalPath: "/interview-prep",
  });

  const [selectedExam, setSelectedExam] = useState("");
  const [otherExam, setOtherExam] = useState("");

  const isFormValid = selectedExam && (selectedExam !== "other" || otherExam.trim());

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Nav />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-10" data-testid="section-interview-prep-header">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-sm font-medium">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v12h16V6H4zm11 3l3-2v8l-3-2v-4z"/>
              </svg>
              LIVE ZOOM SESSIONS
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3" data-testid="text-interview-prep-title">
            Interview Preparation
          </h1>
          <p className="text-slate-300 text-lg" data-testid="text-interview-prep-subtitle">
            Ace your interviews with live mock sessions, expert feedback, and proven strategies
          </p>
        </header>

        <section className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {highlights.map(({ icon: Icon, text }, i) => (
            <div 
              key={i} 
              className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800"
              data-testid={`highlight-${i}`}
            >
              <Icon className="w-5 h-5 text-purple-400 flex-shrink-0" />
              <span className="text-sm text-slate-300">{text}</span>
            </div>
          ))}
        </section>

        <section className="mb-10" data-testid="section-exam-selection">
          <h2 className="text-2xl font-semibold mb-6">Which interview are you preparing for?</h2>
          
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <div className="relative mb-4">
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                className="w-full appearance-none bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 pr-10 text-slate-50 focus:outline-none focus:border-purple-500 transition-colors cursor-pointer"
                data-testid="select-exam-type"
              >
                {examOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400 pointer-events-none" />
            </div>

            {selectedExam === "other" && (
              <div className="mt-4">
                <label className="block text-sm text-slate-400 mb-2">Please specify your exam:</label>
                <input
                  type="text"
                  value={otherExam}
                  onChange={(e) => setOtherExam(e.target.value)}
                  placeholder="e.g., UPSC, State PSC, Bank PO..."
                  className="w-full bg-slate-800 border border-slate-700 rounded-xl px-4 py-3 text-slate-50 placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
                  data-testid="input-other-exam"
                />
              </div>
            )}
          </div>
        </section>

        <section className="mb-10" data-testid="section-curriculum">
          <h2 className="text-2xl font-semibold mb-6">What You'll Learn</h2>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <ul className="grid sm:grid-cols-2 gap-3">
              {whatYouLearn.map((topic, i) => (
                <li 
                  key={i} 
                  className="flex items-start gap-2 text-slate-300"
                  data-testid={`topic-${i}`}
                >
                  <Check className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{topic}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-2xl border border-purple-500/30 bg-gradient-to-br from-purple-500/10 to-cyan-500/10 p-6 md:p-8 text-center" data-testid="section-cta">
          <h2 className="text-2xl font-bold mb-3">Ready to Join?</h2>
          <p className="text-slate-300 mb-6 max-w-lg mx-auto">
            Join our Telegram group to get interview prep support. You'll receive session schedules, Zoom links, and practice materials.
          </p>
          
          {isFormValid ? (
            <a
              href={TELEGRAM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-500 hover:bg-purple-400 text-white font-semibold transition-colors"
              data-testid="button-join-telegram"
            >
              <Send className="w-5 h-5" />
              Join Interview Prep Telegram Group
            </a>
          ) : (
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-700 text-slate-400 font-semibold cursor-not-allowed">
              <Send className="w-5 h-5" />
              Select your exam first
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
