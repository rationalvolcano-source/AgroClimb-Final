import type { SVGProps } from "react";
import { Link } from "wouter";
import Nav from "@/components/Nav";

const IconDigitalSkills = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" fill="none" {...p}>
    <rect x="4" y="8" width="40" height="28" rx="4" stroke="#10b981" strokeWidth="2"/>
    <path d="M4 32h40" stroke="#10b981" strokeWidth="2"/>
    <rect x="18" y="36" width="12" height="4" rx="1" stroke="#22d3ee" strokeWidth="2"/>
    <path d="M12 16l4 4-4 4M20 24h8" stroke="#22d3ee" strokeWidth="2" strokeLinecap="round"/>
    <rect x="30" y="14" width="8" height="12" rx="1" stroke="#10b981" strokeWidth="2"/>
    <path d="M32 18h4M32 22h4" stroke="#22d3ee" strokeWidth="1.5"/>
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

const IconInterview = (p: SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 48 48" fill="none" {...p}>
    <circle cx="24" cy="14" r="6" stroke="#22d3ee" strokeWidth="2"/>
    <path d="M14 38c0-6 4-10 10-10s10 4 10 10" stroke="#10b981" strokeWidth="2"/>
    <rect x="10" y="32" width="28" height="12" rx="3" stroke="#10b981" strokeWidth="2"/>
    <path d="M18 36h12M18 40h8" stroke="#22d3ee" strokeWidth="2"/>
    <circle cx="38" cy="12" r="3" fill="#10b981"/>
    <circle cx="10" cy="12" r="3" fill="#22d3ee"/>
  </svg>
);

const IconZoom = () => (
  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-medium">
    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 4h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2zm0 2v12h16V6H4zm11 3l3-2v8l-3-2v-4z"/>
    </svg>
    LIVE
  </span>
);

export default function PlanBWebinarsHub() {
  const options = [
    {
      Icon: IconDigitalSkills,
      label: "Digital Skills",
      description: "Weekly live Zoom classes covering Excel, Data Visualization & PowerPoint",
      link: "/digital-skills",
      hasLive: true,
      color: "emerald",
    },
    {
      Icon: IconNews,
      label: "Daily News Update",
      description: "Stay informed with curated agricultural news and current affairs",
      link: null,
      hasLive: false,
      color: "cyan",
    },
    {
      Icon: IconInterview,
      label: "Interview Prep",
      description: "Live Zoom sessions for mock interviews and communication skills",
      link: "/interview-prep",
      hasLive: true,
      color: "purple",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Nav />
      <main className="max-w-5xl mx-auto px-4 py-8">
        <header className="mb-10 text-center" data-testid="section-upskilling-header">
          <h1 className="text-3xl md:text-5xl font-semibold" data-testid="text-upskilling-title">Upskilling</h1>
          <p className="text-slate-300 mt-3 max-w-2xl mx-auto" data-testid="text-upskilling-description">
            Join our live weekly Zoom classes and stay industry-ready with in-demand skills
          </p>
        </header>

        <section className="grid md:grid-cols-3 gap-6">
          {options.map(({ Icon, label, description, link, hasLive, color }, i) => {
            const borderColor = color === "emerald" ? "hover:border-emerald-500/50" : 
                               color === "cyan" ? "hover:border-cyan-500/50" : 
                               "hover:border-purple-500/50";
            
            const content = (
              <div className={`group relative rounded-3xl border border-slate-800 bg-slate-900/60 p-6 transition-all h-full ${link ? `cursor-pointer ${borderColor}` : 'opacity-60'}`} data-testid={`card-option-${i}`}>
                <div className="flex flex-col items-center text-center">
                  <div className="h-24 grid place-items-center mb-4" data-testid={`icon-option-${i}`}>
                    <Icon className="w-16 h-16" />
                  </div>
                  
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-slate-50">{label}</h3>
                    {hasLive && <IconZoom />}
                  </div>
                  
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {description}
                  </p>
                  
                  {link ? (
                    <div className="mt-4 inline-flex items-center text-emerald-400 font-medium text-sm group-hover:translate-x-1 transition-transform">
                      Learn More →
                    </div>
                  ) : (
                    <div className="mt-4 inline-flex items-center text-slate-500 font-medium text-sm">
                      Coming Soon
                    </div>
                  )}
                </div>
              </div>
            );

            return link ? (
              <Link key={label} href={link} data-testid={`link-option-${i}`}>
                {content}
              </Link>
            ) : (
              <div key={label}>
                {content}
              </div>
            );
          })}
        </section>
        
        <div className="mt-12 text-center">
          <p className="text-slate-400 text-sm">
            Have questions? Contact us on{" "}
            <a 
              href="https://wa.me/918250904021?text=Hi%2C%20I%20have%20a%20question%20about%20the%20upskilling%20courses"
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 underline transition-colors"
              data-testid="link-whatsapp-contact"
            >
              WhatsApp
            </a>
          </p>
        </div>
      </main>
    </div>
  );
}
