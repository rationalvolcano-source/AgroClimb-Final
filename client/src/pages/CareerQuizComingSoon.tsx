import Nav from "@/components/Nav";
import { Sparkles } from "lucide-react";

export default function CareerQuizComingSoon() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Nav />
      <main className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-emerald-500/10 text-emerald-400 mb-6">
          <Sparkles className="h-10 w-10" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="text-coming-soon-title">
          Career Guidance Quiz Coming Soon!
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto" data-testid="text-coming-soon-description">
          We're building an AI-powered quiz to help you discover your perfect career path across 8 clusters.
        </p>
      </main>
    </div>
  );
}
