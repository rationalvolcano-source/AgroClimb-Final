export default function Features() {
  const data = [
    { icon: "🎯", title: "Career Guidance Quiz", desc: "AI-guided fit across 8 clusters — from Academia/Research to Banking/ABM, Corporate, Govt, NGO, Boards, Entrepreneurship & Diversified roles." },
    { icon: "🧪", title: "Subject Recommender", desc: "If you lean academic, take the second quiz to pinpoint your subject — starting with Horticulture JRF, more coming soon." },
    { icon: "🎮", title: "Interactive Games", desc: "Flashcard Duel, Logic Orchard & Number Sprint — fun recall, reasoning and speed training." },
    { icon: "📚", title: "Books & PYQs", desc: "High-yield PDFs and topic-wise tests. Buy single titles or bundled collections." },
    { icon: "🎥", title: "Recorded Classes", desc: "Learn anytime from top educators. Ultra courses expand pathway-by-pathway." },
    { icon: "🧘", title: "Wellness Centre (Free)", desc: "Micro-sessions for focus & calm — with embedded YouTube autoplay for steady study rhythm." },
    { icon: "🧩", title: "Plan B (Coming Soon)", desc: "Practical upskilling in Excel • PPT • AI tools • Freelancing • Agri-consulting." },
    { icon: "📣", title: "Alumni Webinars", desc: "Weekly ₹9 live sessions for insights, motivation & doubt-clearing." },
  ];

  return (
    <section id="features" className="mt-12">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center" data-testid="text-features-title">Features</h2>
      <p className="text-slate-400 text-center mt-1" data-testid="text-features-subtitle">Focused tools for learning, clarity & momentum</p>

      <div className="grid md:grid-cols-4 gap-4 md:gap-6 mt-6">
        {data.map((f, i) => (
          <div key={f.title} className="rounded-3xl border border-slate-800 bg-slate-900/60 p-5" data-testid={`card-feature-${i}`}>
            <div className="text-2xl" data-testid={`icon-feature-${i}`}>{f.icon}</div>
            <h3 className="text-lg font-semibold mt-2" data-testid={`text-feature-title-${i}`}>{f.title}</h3>
            <p className="text-slate-300 mt-2" data-testid={`text-feature-desc-${i}`}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
