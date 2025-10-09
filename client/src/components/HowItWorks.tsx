export default function HowItWorks() {
  const items = [
    {
      title: "Take Quiz",
      desc: "5 minutes • 8 career clusters • no fluff.",
      icon: "🧭",
    },
    {
      title: "See Your Fit (Plan A + Plan B)",
      desc: "Get an unbiased recommendation for your best career path today — plus a practical Plan B to stay future-proof.",
      icon: "✨",
    },
    {
      title: "Start with Pro • Ultra Rolling Out",
      desc: "Begin with Pro (for everyone now). Ultra subject-deep courses roll out gradually for every pathway.",
      icon: "🚀",
    },
  ];

  return (
    <section id="how-it-works" className="mt-10">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center" data-testid="text-how-it-works-title">How It Works</h2>
      <p className="text-slate-400 text-center mt-1" data-testid="text-how-it-works-subtitle">Three simple steps to clarity</p>

      <div className="grid md:grid-cols-3 gap-4 md:gap-6 mt-6">
        {items.map((it, i) => (
          <div key={it.title} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5" data-testid={`card-how-it-works-${i}`}>
            <div className="text-2xl" data-testid={`icon-how-it-works-${i}`}>{it.icon}</div>
            <h3 className="text-xl font-semibold mt-2" data-testid={`text-how-it-works-title-${i}`}>{it.title}</h3>
            <p className="text-slate-300 mt-2" data-testid={`text-how-it-works-desc-${i}`}>{it.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
