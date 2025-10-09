import { Compass, Target, TrendingUp } from "lucide-react";

export default function HowItWorks() {
  const items = [
    {
      title: "Discover Your Path",
      desc: "5-minute AI quiz reveals your best-fit career across 8 sectors.",
      icon: Compass,
    },
    {
      title: "Get Your Blueprint",
      desc: "Receive Plan A (ideal path) + Plan B (future-proof backup) instantly.",
      icon: Target,
    },
    {
      title: "Start Growing",
      desc: "Access Pro tools today. Ultra deep-courses unlock as you progress.",
      icon: TrendingUp,
    },
  ];

  return (
    <section id="how-it-works" className="mt-10">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center" data-testid="text-how-it-works-title">How It Works</h2>
      <p className="text-slate-400 text-center mt-1" data-testid="text-how-it-works-subtitle">Three simple steps to clarity</p>

      <div className="grid md:grid-cols-3 gap-4 md:gap-6 mt-6">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <div key={it.title} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5" data-testid={`card-how-it-works-${i}`}>
              <div className="inline-flex items-center justify-center h-12 w-12 rounded-xl bg-emerald-500/10 text-emerald-400 mb-3" data-testid={`icon-how-it-works-${i}`}>
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mt-2" data-testid={`text-how-it-works-title-${i}`}>{it.title}</h3>
              <p className="text-slate-300 mt-2" data-testid={`text-how-it-works-desc-${i}`}>{it.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
