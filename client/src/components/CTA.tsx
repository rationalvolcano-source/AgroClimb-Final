import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function CTA() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="rounded-3xl bg-gradient-to-br from-emerald-600/20 to-cyan-600/10 border border-emerald-500/30 p-8 text-center shadow-2xl shadow-emerald-500/10">
        <h3 className="text-2xl md:text-3xl font-semibold" data-testid="cta-headline">Ready to discover where you fit best?</h3>
        <p className="text-slate-300 mt-2" data-testid="cta-subheadline">5 minutes. 1 quiz. A personalized roadmap to your best-fit career.</p>
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button asChild size="lg" className="bg-emerald-500 hover:bg-emerald-400 text-white shadow-lg shadow-emerald-500/30 hover:shadow-emerald-400/40 transition-shadow" data-testid="button-cta-quiz">
            <Link href="/career-quiz">
              Get My Career Plan → <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
