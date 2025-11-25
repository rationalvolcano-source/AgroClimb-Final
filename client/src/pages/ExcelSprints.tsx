import { Link } from 'wouter';
import { Database, Brain, BarChart3, Printer, Zap, Download, Trophy, ArrowLeft, BookOpen } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Sprint {
  id: number;
  title: string;
  description: string;
  Icon: LucideIcon;
  color: string;
  locked: boolean;
}

const SPRINTS: Sprint[] = [
  {
    id: 1,
    title: "Introduction to Excel",
    description: "Learn Excel basics: interface, cells, sheets, and navigation",
    Icon: BookOpen,
    color: "from-emerald-500 to-teal-500",
    locked: false
  },
  {
    id: 2,
    title: "Clean Messy Data",
    description: "Master data cleaning techniques and remove duplicates",
    Icon: Database,
    color: "from-blue-500 to-cyan-500",
    locked: false
  },
  {
    id: 3,
    title: "Formulas That Think",
    description: "Learn IF, XLOOKUP, and dynamic formulas",
    Icon: Brain,
    color: "from-purple-500 to-pink-500",
    locked: false
  },
  {
    id: 4,
    title: "Pivots & Charts",
    description: "Create data stories with PivotTables and visualizations",
    Icon: BarChart3,
    color: "from-green-500 to-emerald-500",
    locked: true
  },
  {
    id: 5,
    title: "Print-Ready Reports",
    description: "Design professional reports for presentations",
    Icon: Printer,
    color: "from-orange-500 to-amber-500",
    locked: true
  },
  {
    id: 6,
    title: "Quick Automation",
    description: "Use Flash Fill, Power Query, and shortcuts",
    Icon: Zap,
    color: "from-yellow-500 to-orange-500",
    locked: true
  },
  {
    id: 7,
    title: "Everyday Tricks",
    description: "Import PDFs, scrape web tables, and more",
    Icon: Download,
    color: "from-teal-500 to-cyan-500",
    locked: true
  },
  {
    id: 8,
    title: "Final Project",
    description: "Clean, analyze, and visualize real datasets",
    Icon: Trophy,
    color: "from-indigo-500 to-purple-500",
    locked: true
  }
];

export default function ExcelSprints() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1420] via-[#0f1530] to-[#0b1420]">
      {/* Header */}
      <div className="border-b border-slate-800 bg-[#101a28]/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/planb">
                <button type="button" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition" data-testid="button-back-planb">
                  <ArrowLeft className="w-5 h-5" />
                  <span className="text-sm font-medium hidden sm:inline">Back to Plan B</span>
                </button>
              </Link>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-[#26A69A] to-[#14B8A6] bg-clip-text text-transparent" data-testid="text-sprints-title">
                  Excel Sprints
                </h1>
                <p className="text-sm text-[#9fb2c3] mt-1">Master Excel in 8 focused sprints</p>
              </div>
            </div>
            <Link href="/excel-orientation" className="text-sm text-[#9fb2c3] hover:text-[#26A69A] transition hidden sm:block" data-testid="link-orientation">
              View Course Overview
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-[#eef4f8] mb-4">
            Your Learning Path
          </h2>
          <p className="text-lg text-[#9fb2c3] max-w-2xl mx-auto">
            Complete each sprint at your own pace. Each one takes ~20 minutes and builds real-world skills.
          </p>
        </div>

        {/* Sprints Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-testid="sprints-grid">
          {SPRINTS.map((sprint) => {
            const cardContent = (
              <div
                className={`relative group bg-[#101a28] rounded-2xl border border-[#1e2b3f] p-6 transition-all duration-300 ${
                  sprint.locked 
                    ? 'opacity-60 cursor-not-allowed' 
                    : 'hover:border-[#26A69A] hover:shadow-lg hover:shadow-[#26A69A]/20 cursor-pointer'
                }`}
                data-testid={`sprint-card-${sprint.id}`}
              >
              {/* Lock Badge */}
              {sprint.locked && (
                <div className="absolute top-4 right-4 bg-slate-700 text-slate-300 px-3 py-1 rounded-full text-xs font-medium" data-testid={`lock-badge-${sprint.id}`}>
                  Locked
                </div>
              )}

              {/* Icon */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${sprint.color} p-4 mb-4 flex items-center justify-center`}>
                <sprint.Icon className="w-8 h-8 text-white" data-testid={`icon-sprint-${sprint.id}`} />
              </div>

              {/* Sprint Number */}
              <div className="text-sm font-bold text-[#26A69A] mb-2" data-testid={`sprint-number-${sprint.id}`}>
                Sprint {sprint.id}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold text-[#eef4f8] mb-2" data-testid={`sprint-title-${sprint.id}`}>
                {sprint.title}
              </h3>

              {/* Description */}
              <p className="text-[#9fb2c3] text-sm leading-relaxed" data-testid={`sprint-desc-${sprint.id}`}>
                {sprint.description}
              </p>

              {/* Progress Indicator (if unlocked) */}
              {!sprint.locked && (
                <div className="mt-4 flex items-center gap-2">
                  <div className="flex-1 h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div className="h-full w-0 bg-gradient-to-r from-[#26A69A] to-[#14B8A6]" />
                  </div>
                  <span className="text-xs text-[#9fb2c3]">0%</span>
                </div>
              )}
            </div>
            );

            // Sprints 1 and 2 are clickable
            if (sprint.id === 1) {
              return (
                <a key={sprint.id} href="/sprint1.html" data-testid={`link-sprint-${sprint.id}`}>
                  {cardContent}
                </a>
              );
            }
            
            if (sprint.id === 2) {
              return (
                <a key={sprint.id} href="/sprint2.html" data-testid={`link-sprint-${sprint.id}`}>
                  {cardContent}
                </a>
              );
            }
            
            if (sprint.id === 3) {
              return (
                <a key={sprint.id} href="/sprint3.html" data-testid={`link-sprint-${sprint.id}`}>
                  {cardContent}
                </a>
              );
            }

            return <div key={sprint.id}>{cardContent}</div>;
          })}
        </div>

        {/* Coming Soon Notice */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-[#26A69A]/10 border border-[#26A69A]/30 rounded-xl">
            <Zap className="w-5 h-5 text-[#26A69A]" />
            <p className="text-[#26A69A] font-medium">
              Sprint content launching soon. Stay tuned!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
