import { Link } from "wouter";
import Nav from "@/components/Nav";
import { Puzzle, Users } from "lucide-react";

export default function PlanBWebinarsHub() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Nav />
      <main className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-12" data-testid="section-hub-header">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="text-hub-title">
            Plan B & Webinars
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto" data-testid="text-hub-description">
            Choose your path: upskill for alternate income or connect with alumni experts.{" "}
            <Link href="/#pricing" className="text-emerald-400 hover:text-emerald-300 underline transition-colors" data-testid="link-unlock-pro">
              Unlock with a Pro plan
            </Link>
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Plan B Option */}
          <Link href="/planb" data-testid="link-planb-hub">
            <div className="group relative rounded-3xl border border-slate-800 bg-slate-900/60 p-8 hover:border-emerald-500/50 transition-all cursor-pointer" data-testid="card-planb-option">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-emerald-500/10 text-emerald-400 mb-6 group-hover:scale-110 transition-transform">
                  <Puzzle className="h-8 w-8" />
                </div>
                
                <h2 className="text-3xl font-bold mb-3" data-testid="text-planb-title">Plan B Skills</h2>
                <p className="text-slate-300 mb-6" data-testid="text-planb-description">
                  Practical upskilling in Excel, PowerPoint, AI tools, Data Visualization, and more. 
                  Build alternate income streams and industry readiness.
                </p>
                
                <div className="inline-flex items-center text-emerald-400 font-medium group-hover:translate-x-2 transition-transform">
                  Explore Plan B →
                </div>
              </div>
            </div>
          </Link>

          {/* Alumni Webinars Option */}
          <Link href="/alumni-webinars" data-testid="link-webinars-hub">
            <div className="group relative rounded-3xl border border-slate-800 bg-slate-900/60 p-8 hover:border-cyan-500/50 transition-all cursor-pointer" data-testid="card-webinars-option">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative">
                <div className="inline-flex items-center justify-center h-16 w-16 rounded-2xl bg-cyan-500/10 text-cyan-400 mb-6 group-hover:scale-110 transition-transform">
                  <Users className="h-8 w-8" />
                </div>
                
                <h2 className="text-3xl font-bold mb-3" data-testid="text-webinars-title">Alumni Webinars</h2>
                <p className="text-slate-300 mb-6" data-testid="text-webinars-description">
                  Weekly ₹9 live sessions with alumni for real insights, motivation, and personalized doubt-clearing.
                </p>
                
                <div className="inline-flex items-center text-cyan-400 font-medium group-hover:translate-x-2 transition-transform">
                  Join Webinars →
                </div>
              </div>
            </div>
          </Link>
        </div>
      </main>
    </div>
  );
}
