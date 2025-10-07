import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function FeatureGrid() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-6">
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="bg-slate-900/60 border-slate-800 rounded-3xl">
          <CardHeader>
            <CardTitle data-testid="feature-title-1">Turn study into strategy.</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 text-sm" data-testid="feature-desc-1">
            Build momentum with micro-assignments, flashcard duels, and live alumni sessions.
            Your plan adapts every week based on effort and accuracy.
          </CardContent>
        </Card>
        <Card className="bg-slate-900/60 border-slate-800 rounded-3xl">
          <CardHeader>
            <CardTitle data-testid="feature-title-2">Mindspace: Focus that sticks</CardTitle>
          </CardHeader>
          <CardContent className="text-slate-300 text-sm" data-testid="feature-desc-2">
            Session timers, distraction shields and short audio prompts to beat procrastination and sustain flow.
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
