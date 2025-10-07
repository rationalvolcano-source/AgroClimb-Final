const testimonials = [
  {
    quote: "The quiz nailed my fit and the alumni calls kept me consistent.",
    name: "Ananya, ABM",
  },
  {
    quote: "Flashcard Duel makes revision addictive. My mock scores jumped in 2 weeks.",
    name: "Rishi, JRF Horti",
  },
  {
    quote: "Ultra plan's weekly upskilling helped me switch to an analyst role.",
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
