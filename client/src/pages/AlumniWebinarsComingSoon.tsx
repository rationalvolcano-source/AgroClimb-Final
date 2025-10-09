import Nav from "@/components/Nav";
import { Users } from "lucide-react";

export default function AlumniWebinarsComingSoon() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Nav />
      <main className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="inline-flex items-center justify-center h-20 w-20 rounded-full bg-cyan-500/10 text-cyan-400 mb-6">
          <Users className="h-10 w-10" />
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4" data-testid="text-coming-soon-title">
          Alumni Webinars Coming Soon!
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl mx-auto" data-testid="text-coming-soon-description">
          Weekly ₹9 live sessions for real insights, motivation & personalized doubt-clearing.
        </p>
      </main>
    </div>
  );
}
