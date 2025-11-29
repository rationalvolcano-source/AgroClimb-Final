import Nav from "@/components/Nav";
import { Check, Newspaper, Clock, Bell, BookOpen, TrendingUp } from "lucide-react";
import { useSEO } from "@/hooks/useSEO";

const highlights = [
  { icon: Newspaper, text: "Daily curated news updates" },
  { icon: Clock, text: "5-minute morning read" },
  { icon: BookOpen, text: "Exam-focused content" },
  { icon: Bell, text: "WhatsApp notifications" },
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

export default function DailyNews() {
  useSEO({
    title: "Daily Agriculture News & Current Affairs for Exams India",
    description: "Daily curated news updates for IBPS AFO, NABARD, FCI exam preparation. Agriculture sector news, banking current affairs, government schemes, and market trends. 5-minute morning read for agriculture students.",
    keywords: "agriculture current affairs daily, IBPS AFO current affairs, NABARD exam news, agriculture sector news India, farming policy updates, agriculture GK daily, banking current affairs agriculture",
    canonicalPath: "/daily-news",
  });

  const whatsappMessage = encodeURIComponent(
    "Hi, I want to join the Daily News Update WhatsApp group for agriculture and exam-related current affairs."
  );
  const whatsappLink = `https://wa.me/918250904021?text=${whatsappMessage}`;

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
            Get daily news updates directly on WhatsApp. Stay ahead with curated content for your exam preparation.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-orange-500 hover:bg-orange-400 text-slate-950 font-semibold transition-colors"
            data-testid="button-join-whatsapp"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
            Join Daily News Group on WhatsApp
          </a>
          <p className="text-slate-400 text-sm mt-4">
            +91 82509 04021
          </p>
        </section>
      </main>
    </div>
  );
}
