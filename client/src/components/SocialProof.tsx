const stats = [
  { label: "Quiz Completions", value: "25k+" },
  { label: "Study Minutes/Day", value: "38" },
  { label: "Alumni Sessions", value: "2 / week" },
  { label: "Courses & Notes", value: "120+" },
];

export default function SocialProof() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {stats.map((s, i) => (
          <div key={i} className="space-y-1">
            <div className="text-xl md:text-2xl font-semibold" data-testid={`stat-value-${i}`}>{s.value}</div>
            <div className="text-xs text-slate-400" data-testid={`stat-label-${i}`}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
