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

const IconNews = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" fill="none" {...p}>
    <rect x="8" y="10" width="32" height="28" rx="4" stroke="#10b981" strokeWidth="2"/>
    <path d="M14 16h20M14 22h20M14 28h12" stroke="#22d3ee" strokeWidth="2"/>
    <rect x="28" y="26" width="6" height="6" rx="1" stroke="#10b981" strokeWidth="2"/>
    <circle cx="24" cy="6" r="3" fill="#22d3ee"/>
  </svg>
);

export default function PlanB() {
  const items = [
    { Icon: IconExcel, label: "Excel Training", link: "/excel-quiz" },
    { Icon: IconPPT, label: "PowerPoint Training" },
    { Icon: IconViz, label: "Data Visualization" },
    { Icon: IconNews, label: "Daily News Update" },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Nav />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <header className="mb-6" data-testid="section-planb-header">
          <h1 className="text-3xl md:text-5xl font-semibold" data-testid="text-planb-title">Plan B</h1>
          <p className="text-slate-300 mt-2" data-testid="text-planb-description">
            Stay Industry ready with in-demand skills, News, Interview Preparation and more
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
