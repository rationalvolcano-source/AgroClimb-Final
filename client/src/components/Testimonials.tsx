const testimonials = [
  {
    quote: "AgroClimb didn't just tell me my path — it showed me how to reach it.",
    name: "Ananya, ABM",
  },
  {
    quote: "The interview prep guidance helped me crack my first banking interview confidently.",
    name: "Rishi, JRF Horti",
  },
  {
    quote: "Weekly upskilling sessions helped me switch to an analyst role in 3 months.",
    name: "Meera, Banking",
  },
];

export default function Testimonials() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-12">
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 grid md:grid-cols-3 gap-6">
        {testimonials.map((t, i) => (
          <div key={i} className="space-y-3">
            <p className="text-slate-200" data-testid={`testimonial-quote-${i}`}>"{t.quote}"</p>
            <div className="text-sm text-slate-400" data-testid={`testimonial-name-${i}`}>— {t.name}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
