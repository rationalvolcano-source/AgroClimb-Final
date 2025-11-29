import { useState } from "react";
import Nav from "@/components/Nav";
import { Check, Calendar, Clock, Users, MessageCircle, ChevronDown } from "lucide-react";
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
  { icon: MessageCircle, text: "WhatsApp support group" },
];

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

  const getExamLabel = () => {
    if (selectedExam === "other" && otherExam.trim()) {
      return otherExam.trim();
    }
    const option = examOptions.find(o => o.value === selectedExam);
    return option?.label || "Interview Prep";
  };

  const getWhatsAppLink = () => {
    const examName = getExamLabel();
    const message = encodeURIComponent(
      `Hi, I want to join the Interview Prep Zoom training group. I am preparing for: ${examName}`
    );
    return `https://wa.me/918250904021?text=${message}`;
  };

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
            Send us a message on WhatsApp to join our interview prep group. You'll receive session schedules, Zoom links, and practice materials.
          </p>
          
          {isFormValid ? (
            <a
              href={getWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-purple-500 hover:bg-purple-400 text-white font-semibold transition-colors"
              data-testid="button-join-whatsapp"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Join Interview Prep Group on WhatsApp
            </a>
          ) : (
            <div className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-700 text-slate-400 font-semibold cursor-not-allowed">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Select your exam first
            </div>
          )}
          
          <p className="text-slate-400 text-sm mt-4">
            +91 82509 04021
          </p>
        </section>
      </main>
    </div>
  );
}
