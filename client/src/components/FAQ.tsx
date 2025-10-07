import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const items = [
  {
    q: "What do I get free?",
    a: "Career Quiz, dashboard access, and 3 free plays of Interactive Games.",
  },
  {
    q: "How are plans different?",
    a: "Books = content access; Pro = games + alumni connect + adaptive plan; Ultra = weekly upskilling + priority support.",
  },
  {
    q: "Can I switch tracks?",
    a: "Yes—your plan adapts as you learn and you can explore ABM, Banking, and JRF Horticulture.",
  },
];

export default function FAQ() {
  return (
    <section id="faq" className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid md:grid-cols-3 gap-6">
        {items.map((f, i) => (
          <Card key={i} className="bg-slate-900/60 border-slate-800 rounded-3xl">
            <CardHeader>
              <CardTitle className="text-base" data-testid={`faq-question-${i}`}>{f.q}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-slate-400" data-testid={`faq-answer-${i}`}>{f.a}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}
