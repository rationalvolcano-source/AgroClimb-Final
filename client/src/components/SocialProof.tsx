import { useEffect, useRef, useState } from "react";

const stats = [
  { label: "Quiz Completions", value: "25k+", numValue: 25, suffix: "k+" },
  { label: "Study Minutes/Day", value: "38", numValue: 38, suffix: "" },
  { label: "Alumni Sessions", value: "2 / week", numValue: 2, suffix: " / week" },
  { label: "Courses & Notes", value: "120+", numValue: 120, suffix: "+" },
];

function CountUp({ target, suffix, duration = 1200 }: { target: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            setHasAnimated(true);
            
            if (prefersReducedMotion) {
              setCount(target);
              return;
            }

            const startTime = Date.now();
            const animate = () => {
              const now = Date.now();
              const progress = Math.min((now - startTime) / duration, 1);
              
              // easeOut cubic
              const easeOut = 1 - Math.pow(1 - progress, 3);
              
              setCount(Math.floor(easeOut * target));
              
              if (progress < 1) {
                requestAnimationFrame(animate);
              } else {
                setCount(target);
              }
            };
            
            requestAnimationFrame(animate);
          }
        });
      },
      { threshold: 0.15 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [target, duration, hasAnimated]);

  return (
    <div ref={ref} aria-live="polite">
      {count}{suffix}
    </div>
  );
}

export default function SocialProof() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-6">
      <div className="rounded-2xl border border-slate-800 bg-slate-900/50 p-4 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
        {stats.map((s, i) => (
          <div key={i} className="space-y-1">
            <div className="text-xl md:text-2xl font-semibold" data-testid={`stat-value-${i}`}>
              <CountUp target={s.numValue} suffix={s.suffix} />
            </div>
            <div className="text-xs text-slate-400" data-testid={`stat-label-${i}`}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
