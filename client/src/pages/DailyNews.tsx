import Nav from "@/components/Nav";
import { Check, Newspaper, Clock, Bell, BookOpen, TrendingUp, Send } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";
import { EnrollmentGate, DirectTelegramLink } from "@/components/EnrollmentGate";

const highlights = [
  { icon: Newspaper, text: "Daily curated news updates" },
  { icon: Clock, text: "5-minute morning read" },
  { icon: BookOpen, text: "Exam-focused content" },
  { icon: Send, text: "Telegram notifications" },
];

const whatYouGet = [
  "Agriculture sector updates & policy changes",
  "Banking & finance current affairs",
  "Government scheme announcements",
  "Market trends & commodity prices",
  "Research breakthroughs & innovations",
  "Important dates & exam notifications",
  "Quick revision facts & one-liners",
  "Weekly PDF compilations",
];

const categories = [
  { name: "Agriculture News", desc: "Crop updates, MSP, farming policies" },
  { name: "Banking & Economy", desc: "RBI updates, market news, financial policies" },
  { name: "Government Schemes", desc: "New schemes, eligibility, deadlines" },
  { name: "Exam Updates", desc: "Notifications, results, important dates" },
];

const TELEGRAM_LINK = "https://t.me/+0dQoa5KZak02MDk9";

export default function DailyNews() {
  useSEO({
    title: "Daily Agriculture News & Current Affairs for Exams India",
    description: "Daily curated news updates for IBPS AFO, NABARD, FCI exam preparation. Agriculture sector news, banking current affairs, government schemes, and market trends. 5-minute morning read for agriculture students.",
    keywords: "agriculture current affairs daily, IBPS AFO current affairs, NABARD exam news, agriculture sector news India, farming policy updates, agriculture GK daily, banking current affairs agriculture",
    canonicalPath: "/daily-news",
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Nav />
      <main className="max-w-4xl mx-auto px-4 py-8">
        <header className="mb-10" data-testid="section-daily-news-header">
          <div className="flex items-center gap-2 mb-3">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-orange-500/20 text-orange-400 text-sm font-medium">
              <TrendingUp className="w-4 h-4" />
              DAILY UPDATES
            </span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-3" data-testid="text-daily-news-title">
            Daily News Update
          </h1>
          <p className="text-slate-300 text-lg" data-testid="text-daily-news-subtitle">
            Stay informed with curated agricultural news, current affairs, and exam-relevant updates every day
          </p>
        </header>

        <section className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {highlights.map(({ icon: Icon, text }, i) => (
            <div 
              key={i} 
              className="flex items-center gap-3 p-4 rounded-xl bg-slate-900/60 border border-slate-800"
              data-testid={`highlight-${i}`}
            >
              <Icon className="w-5 h-5 text-orange-400 flex-shrink-0" />
              <span className="text-sm text-slate-300">{text}</span>
            </div>
          ))}
        </section>

        <section className="mb-10" data-testid="section-categories">
          <h2 className="text-2xl font-semibold mb-6">News Categories</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {categories.map((cat, i) => (
              <div 
                key={i}
                className="rounded-xl border border-slate-800 bg-slate-900/60 p-5"
                data-testid={`category-${i}`}
              >
                <h3 className="text-lg font-semibold text-orange-400 mb-1">{cat.name}</h3>
                <p className="text-sm text-slate-400">{cat.desc}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-10" data-testid="section-what-you-get">
          <h2 className="text-2xl font-semibold mb-6">What You'll Get</h2>
          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-6">
            <ul className="grid sm:grid-cols-2 gap-3">
              {whatYouGet.map((item, i) => (
                <li 
                  key={i} 
                  className="flex items-start gap-2 text-slate-300"
                  data-testid={`benefit-${i}`}
                >
                  <Check className="w-4 h-4 text-orange-400 mt-0.5 flex-shrink-0" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="rounded-2xl border border-orange-500/30 bg-gradient-to-br from-orange-500/10 to-amber-500/10 p-6 md:p-8 text-center" data-testid="section-cta">
          <h2 className="text-2xl font-bold mb-3">Join Our News Group</h2>
          <p className="text-slate-300 mb-6 max-w-lg mx-auto">
            Sign up to get daily news updates. Stay ahead with curated content for your exam preparation.
          </p>
          <EnrollmentGate
            program="daily-news"
            buttonText="Get Daily Updates"
            buttonClassName="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-400 text-slate-950 font-semibold transition-colors"
            programTitle="Daily News Updates"
            programDescription="You'll receive daily curated news about agriculture, banking current affairs, government schemes, and exam notifications."
            telegramLink={TELEGRAM_LINK}
          />
          <p className="text-slate-400 text-sm mt-4">
            <DirectTelegramLink 
              buttonText="Skip sign up? Join directly" 
              telegramLink={TELEGRAM_LINK}
              program="daily-news"
            />
          </p>
        </section>
      </main>
    </div>
  );
}
