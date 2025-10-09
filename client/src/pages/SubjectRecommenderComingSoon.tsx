import Nav from "@/components/Nav";
import { FlaskConical } from "lucide-react";

export default function SubjectRecommenderComingSoon() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Nav />
      <main className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-cyan-500/10 text-cyan-400 mb-6">
          <FlaskConical className="h-10 w-10" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="text-coming-soon-title">
          Subject Recommender Coming Soon!
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto" data-testid="text-coming-soon-description">
          Get precise subject recommendations for your academic path, starting with Horticulture JRF.
        </p>
      </main>
    </div>
  );
}
