import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Books",
    price: "₹600",
    bullets: ["Complete PDFs & PYQs", "Topic-wise tests", "Starter roadmap"],
    cta: "Buy Books",
    highlight: false,
  },
  {
    name: "Pro",
    price: "₹2,000",
    bullets: ["Interactive games", "Recorded classes", "Alumni Connect (2×/week)", "Adaptive study plan"],
    cta: "Go Pro",
    highlight: false,
  },
  {
    name: "Ultra",
    price: "₹5,000",
    bullets: ["Your AI-powered finishing school — polish every week, grow every month."],
    cta: "Get Ultra",
    highlight: true,
  },
];

export default function PricingTeaser() {
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 py-12">
      <div className="grid md:grid-cols-3 gap-6">
        {tiers.map((t, i) => (
          <Card 
            key={i} 
            className={`rounded-3xl border ${t.highlight ? "border-emerald-500/60 shadow-emerald-500/20 shadow-xl" : "border-slate-800"} bg-slate-900/60`}
            data-testid={`pricing-card-${i}`}
          >
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span data-testid={`tier-name-${i}`}>{t.name}</span>
                {t.highlight && (
                  <span className="text-xs px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-300 ring-1 ring-emerald-500/30" data-testid="badge-popular">Popular</span>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-semibold mb-3" data-testid={`tier-price-${i}`}>{t.price}</div>
              <ul className="text-sm text-slate-300 space-y-2 mb-4">
                {t.bullets.map((b, j) => (
                  <li key={j} className="flex items-start gap-2" data-testid={`tier-bullet-${i}-${j}`}>
                    <span className="text-emerald-400">•</span>
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
              <Button className="w-full bg-emerald-500 hover:bg-emerald-400 text-white" data-testid={`button-${t.cta.toLowerCase().replace(/\s+/g, '-')}`}>
                {t.cta}
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <p className="text-xs text-slate-500 mt-3 text-center" data-testid="text-free-trial">3 free game plays per Gmail before upgrade lock.</p>
    </section>
  );
}
