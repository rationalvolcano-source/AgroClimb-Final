import type { ReactNode, SVGProps } from "react";
import { Link } from "wouter";
import Nav from "@/components/Nav";

const Card = ({ children, clickable = false }: { children: ReactNode; clickable?: boolean }) => (
  <div className={`rounded-3xl border border-slate-800 bg-slate-900/60 p-6 transition ${
    clickable ? 'hover:border-emerald-500/50 cursor-pointer group' : 'hover:border-slate-700'
  }`}>
    {children}
  </div>
);

const Title = ({ children }: { children: ReactNode }) => (
  <h3 className="mt-4 text-lg font-semibold text-slate-50">{children}</h3>
);

const IconExcel = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" fill="none" {...p}>
    <rect x="4" y="8" width="40" height="32" rx="6" stroke="#10b981" strokeWidth="2"/>
    <path d="M16 8v32M8 16h12M8 24h12M8 32h12" stroke="#22d3ee" strokeWidth="2"/>
    <path d="M28 18l6 12M34 18l-6 12" stroke="#10b981" strokeWidth="2"/>
  </svg>
);

const IconPPT = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" fill="none" {...p}>
    <rect x="6" y="10" width="36" height="28" rx="4" stroke="#10b981" strokeWidth="2"/>
    <circle cx="20" cy="24" r="8" stroke="#22d3ee" strokeWidth="2"/>
    <path d="M18 20h4a3 3 0 0 1 0 6h-4v-6z" stroke="#10b981" strokeWidth="2"/>
    <path d="M28 17h10M28 23h10M28 29h10" stroke="#22d3ee" strokeWidth="2"/>
  </svg>
);

const IconViz = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" fill="none" {...p}>
    <path d="M8 38h32" stroke="#1f2937" strokeWidth="2"/>
    <rect x="10" y="26" width="6" height="10" rx="2" fill="#10b981"/>
    <rect x="20" y="20" width="6" height="16" rx="2" fill="#22d3ee"/>
    <rect x="30" y="12" width="6" height="24" rx="2" fill="#10b981"/>
    <path d="M10 12l10 6 10-8 8 4" stroke="#22d3ee" strokeWidth="2"/>
  </svg>
);

const IconAIAcademia = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" fill="none" {...p}>
    <path d="M24 10l18 8-18 8L6 18l18-8z" stroke="#10b981" strokeWidth="2"/>
    <path d="M12 23v5c0 3 6 6 12 6s12-3 12-6v-5" stroke="#22d3ee" strokeWidth="2"/>
    <rect x="20" y="6" width="8" height="8" rx="2" stroke="#22d3ee" strokeWidth="2"/>
    <path d="M24 6v-3M28 8h3M20 8h-3M24 14v3" stroke="#10b981" strokeWidth="2"/>
  </svg>
);

const IconAIManagers = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" fill="none" {...p}>
    <rect x="10" y="14" width="28" height="20" rx="4" stroke="#10b981" strokeWidth="2"/>
    <path d="M18 14v-4h12v4" stroke="#22d3ee" strokeWidth="2"/>
    <path d="M16 26h16" stroke="#22d3ee" strokeWidth="2"/>
    <rect x="22" y="22" width="4" height="8" rx="1" fill="#10b981"/>
    <rect x="32" y="6" width="8" height="8" rx="2" stroke="#22d3ee" strokeWidth="2"/>
    <path d="M36 6V3M40 10h3M32 10h-3M36 14v3" stroke="#10b981" strokeWidth="2"/>
  </svg>
);

const IconDSAI = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" fill="none" {...p}>
    <circle cx="12" cy="24" r="4" stroke="#10b981" strokeWidth="2"/>
    <circle cx="36" cy="16" r="4" stroke="#22d3ee" strokeWidth="2"/>
    <circle cx="36" cy="32" r="4" stroke="#22d3ee" strokeWidth="2"/>
    <circle cx="24" cy="24" r="4" stroke="#10b981" strokeWidth="2"/>
    <path d="M16 24h4M28 24h4M24 20V8M24 28v12" stroke="#22d3ee" strokeWidth="2"/>
  </svg>
);

const IconIntern = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" fill="none" {...p}>
    <path d="M10 30l6 6 16-16" stroke="#10b981" strokeWidth="2"/>
    <rect x="6" y="10" width="36" height="28" rx="6" stroke="#22d3ee" strokeWidth="2"/>
    <path d="M18 16h12v8H18z" stroke="#10b981" strokeWidth="2"/>
  </svg>
);

export default function PlanB() {
  const items = [
    { Icon: IconExcel, label: "Excel Training", link: "/excel-quiz" },
    { Icon: IconPPT, label: "PowerPoint Training" },
    { Icon: IconViz, label: "Data Visualization" },
    { Icon: IconAIAcademia, label: "AI for Academics & Research" },
    { Icon: IconAIManagers, label: "AI for Managers" },
    { Icon: IconDSAI, label: "Data Science using AI" },
    { Icon: IconIntern, label: "Internship Opportunities" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Nav />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-6" data-testid="section-planb-header">
          <h1 className="text-3xl md:text-5xl font-semibold" data-testid="text-planb-title">Plan B (Preview)</h1>
          <p className="text-slate-300 mt-2" data-testid="text-planb-description">
            Practical upskilling tracks to build alternate income and industry readiness.
          </p>
        </header>

        <section className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {items.map(({ Icon, label, link }, i) => {
            const content = (
              <>
                <div className="h-28 grid place-items-center" data-testid={`icon-planb-${i}`}>
                  <Icon className="w-20 h-20" />
                </div>
                <Title>{label}</Title>
              </>
            );

            return link ? (
              <Link key={label} href={link}>
                <Card clickable>{content}</Card>
              </Link>
            ) : (
              <Card key={label}>{content}</Card>
            );
          })}
        </section>
      </main>
    </div>
  );
}
