import { Link } from "wouter";

export default function Plans() {
  return (
    <section id="plans" className="mt-12">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center" data-testid="text-plans-title">Plans</h2>
      <p className="text-slate-400 text-center mt-1" data-testid="text-plans-subtitle">Start with Pro today • Ultra courses rolling out for every pathway</p>

      <div className="grid md:grid-cols-3 gap-6 mt-6">
        {/* Books */}
        <div id="buy-books" className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6" data-testid="card-plan-books">
          <h3 className="text-2xl font-bold" data-testid="text-plan-books-title">Books</h3>
          <div className="text-4xl font-extrabold mt-2" data-testid="text-plan-books-price">₹600</div>
          <ul className="text-slate-300 mt-3 space-y-2">
            <li data-testid="text-plan-books-feature-0">Complete PDFs & PYQs</li>
            <li data-testid="text-plan-books-feature-1">Topic-wise tests</li>
            <li data-testid="text-plan-books-feature-2">Starter roadmap</li>
          </ul>
          <a href="#buy-books" className="mt-5 inline-block px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500" data-testid="link-buy-books">Buy Books</a>
        </div>

        {/* Pro */}
        <div id="buy-pro" className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 ring-1 ring-emerald-400/30" data-testid="card-plan-pro">
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold" data-testid="text-plan-pro-title">Pro</h3>
            <span className="text-xs px-2 py-1 rounded-full bg-emerald-700/40 border border-emerald-700/60" data-testid="badge-plan-pro-popular">Most Popular</span>
          </div>
          <div className="text-4xl font-extrabold mt-2" data-testid="text-plan-pro-price">₹1 999</div>
          <ul className="text-slate-300 mt-3 space-y-2">
            <li data-testid="text-plan-pro-feature-0">Interactive games (Flashcard Duel, Logic Orchard, Number Sprint)</li>
            <li data-testid="text-plan-pro-feature-1">AI study roadmap & dashboard</li>
            <li data-testid="text-plan-pro-feature-2"><b>Free access to ₹9 alumni webinars</b></li>
            <li data-testid="text-plan-pro-feature-3">Recorded class previews</li>
            <li className="text-slate-400" data-testid="text-plan-pro-feature-4"><b>Pro = your starter toolkit</b> —not a full course.</li>
          </ul>
          <a href="#buy-pro" className="mt-5 inline-block px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500" data-testid="link-buy-pro">Go Pro</a>
        </div>

        {/* Ultra */}
        <div id="ultra-waitlist" className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6" data-testid="card-plan-ultra">
          <h3 className="text-2xl font-bold" data-testid="text-plan-ultra-title">Ultra</h3>
          <div className="text-4xl font-extrabold mt-2" data-testid="text-plan-ultra-price">₹4 999</div>
          <ul className="text-slate-300 mt-3 space-y-2">
            <li data-testid="text-plan-ultra-feature-0">Your AI-powered finishing school</li>
            <li data-testid="text-plan-ultra-feature-1">Deep subject courses rolling out for every pathway</li>
            <li data-testid="text-plan-ultra-feature-2">Full recorded classes + mentor webinars</li>
            <li data-testid="text-plan-ultra-feature-3">Books & PYQs integration</li>
          </ul>
          <a href="#ultra-waitlist" className="mt-5 inline-block px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700" data-testid="link-ultra-waitlist">Join Ultra Waitlist</a>
          <div className="text-xs text-slate-400 mt-2" data-testid="text-plan-ultra-note">Existing Ultra users get new subjects free as released.</div>
        </div>
      </div>

      <div className="text-center mt-6" id="plan-b">
        <Link href="/planb" className="inline-flex items-center gap-2 text-emerald-400 underline hover:text-emerald-300 transition-colors" data-testid="link-plan-b">
          Plan B (Preview): Practical upskilling for alternate income
        </Link>
      </div>
    </section>
  );
}
