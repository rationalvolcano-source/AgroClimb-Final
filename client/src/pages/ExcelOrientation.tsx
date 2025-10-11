import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { ArrowLeft, ArrowRight, Hand, Target, FastForward, FlaskConical, Clock, UserCheck, Package, Rocket } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface Step {
  id: string;
  Icon: LucideIcon;
  hero: string;
  title: string;
  farmerLine?: string;
  body?: string;
  bullets?: string[];
  steps?: string[];
  ctaText?: string;
  next?: string;
}

const STEPS: Step[] = [
  {
    id: "welcome",
    Icon: Hand,
    hero: "Welcome Aboard!",
    title: "welcome to excel, the smart way",
    farmerLine: "hey! i'm your guide. we'll keep this simple and useful.",
    body: "this course is hands-on, fast, and designed for real-life tasks."
  },
  {
    id: "skills",
    Icon: Target,
    hero: "What You Will Learn",
    title: "7 sprints • real skills",
    bullets: [
      "clean messy data",
      "formulas that think (IF, XLOOKUP)",
      "pivots & charts that tell stories",
      "print-ready reports",
      "quick automation (flash fill, power query)",
      "everyday tricks (pdf → excel, web tables)",
      "final mini-project to prove it"
    ]
  },
  {
    id: "flow",
    Icon: FastForward,
    hero: "Approach of Learning",
    title: "learn → try → reflect",
    steps: [
      "learn (10 min): fast examples you can skim as text",
      "challenge (8 min): timed task in a sandbox",
      "reflect (2 min): quick summary + tips"
    ]
  },
  {
    id: "quiz",
    Icon: FlaskConical,
    hero: "Stay Calm and Learn On",
    title: "be honest, not perfect",
    farmerLine: "don't worry if you don't know an answer.",
    body: "your skill level just helps us recommend the right sprints to start with."
  },
  {
    id: "timing",
    Icon: Clock,
    hero: "Flexible Learning Journey",
    title: "short & flexible",
    body: "each sprint ≈ 20 minutes. pause anytime. progress auto-saves; revisit any sprint you've completed."
  },
  {
    id: "coach",
    Icon: UserCheck,
    hero: "Help is Always Available",
    title: "help when you need it",
    body: "your AI tutor can hint, explain formulas, and show shortcuts.",
    farmerLine: "need a nudge? just ask."
  },
  {
    id: "project",
    Icon: Package,
    hero: "Prove Your Skills",
    title: "prove it in the real world",
    body: "clean, analyze, and visualize a dataset—then get instant feedback and a certificate."
  },
  {
    id: "cta",
    Icon: Rocket,
    hero: "Ready for Takeoff?",
    title: "ready to level up?",
    ctaText: "Start Orientation ▶",
    next: "sprint-map"
  }
];

export default function ExcelOrientation() {
  const [, setLocation] = useLocation();
  const [currentStepIndex, setCurrentStepIndex] = useState(() => {
    const saved = localStorage.getItem('lastOrientationStep');
    return saved ? parseInt(saved, 10) : 0;
  });
  const [fadeClass, setFadeClass] = useState('opacity-100');
  const [showRocketAnimation, setShowRocketAnimation] = useState(false);

  const currentStep = STEPS[currentStepIndex];
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === STEPS.length - 1;

  // Save progress to localStorage
  useEffect(() => {
    localStorage.setItem('lastOrientationStep', currentStepIndex.toString());
  }, [currentStepIndex]);

  const navigateToStep = (newIndex: number) => {
    if (newIndex < 0 || newIndex >= STEPS.length) return;
    
    setFadeClass('opacity-0');
    setTimeout(() => {
      setCurrentStepIndex(newIndex);
      setFadeClass('opacity-100');
    }, 150);
  };

  const handleNext = () => {
    if (!isLastStep) {
      navigateToStep(currentStepIndex + 1);
    }
  };

  const handleBack = () => {
    if (!isFirstStep) {
      navigateToStep(currentStepIndex - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem('orientationCompleted', 'true');
    setShowRocketAnimation(true);
    
    // Navigate after rocket animation completes (2 seconds)
    setTimeout(() => {
      setLocation('/excel-sprints');
    }, 2000);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' && !isLastStep) {
        handleNext();
      } else if (e.key === 'ArrowLeft' && !isFirstStep) {
        handleBack();
      } else if ((e.key === 'Enter' || e.key === ' ') && isLastStep) {
        e.preventDefault();
        handleComplete();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStepIndex, isFirstStep, isLastStep]);

  return (
    <div className="min-h-screen bg-[#0b1420] text-white flex items-center justify-center px-4 py-8">
      {/* Background gradient effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -left-1/4 w-96 h-96 bg-[#26A69A]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-1/4 w-96 h-96 bg-[#14B8A6]/10 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-2xl">
        {/* Main Card */}
        <div className="bg-[#101a28] rounded-2xl border border-[#1e2b3f] shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-[#26A69A]/20 to-[#14B8A6]/20 border-b border-[#1e2b3f] px-6 py-4">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-[#26A69A] to-[#14B8A6] bg-clip-text text-transparent text-center" data-testid="text-orientation-header">
              Excel Plan B – Orientation
            </h1>
          </div>

          {/* Content Area */}
          <div className="p-8 min-h-[400px] flex flex-col">
            <div className={`flex-1 transition-opacity duration-300 ${fadeClass}`}>
              {/* Avatar and Content */}
              <div className="flex gap-6 items-start mb-8">
                {/* Farmer Kiran Avatar */}
                <div className="flex-shrink-0">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#26A69A] to-[#14B8A6] flex items-center justify-center text-2xl border-2 border-[#26A69A]/50" data-testid="avatar-farmer-kiran">
                    👨‍🌾
                  </div>
                  <p className="text-xs text-[#9fb2c3] text-center mt-2" data-testid="text-avatar-name">Farmer Kiran</p>
                </div>

                {/* Step Content */}
                <div className="flex-1 space-y-4">
                  {/* Hero Section */}
                  <div className="mb-6">
                    <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#26A69A] to-[#14B8A6] bg-clip-text text-transparent mb-3" data-testid={`text-hero-${currentStep.id}`}>
                      {currentStep.hero}
                    </h2>
                  </div>

                  {/* Icon and Title */}
                  <div className="flex items-center gap-3">
                    <currentStep.Icon className="w-10 h-10 text-[#26A69A]" data-testid={`icon-step-${currentStep.id}`} />
                    <h3 className="text-xl font-semibold text-[#eef4f8]" data-testid={`text-title-${currentStep.id}`}>
                      {currentStep.title}
                    </h3>
                  </div>

                  {/* Farmer's Speech Bubble */}
                  {currentStep.farmerLine && (
                    <div className="bg-[#26A69A]/10 border border-[#26A69A]/30 rounded-xl p-4 relative" data-testid="farmer-speech-bubble">
                      <div className="absolute -left-2 top-4 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-r-8 border-r-[#26A69A]/30" />
                      <p className="text-[#26A69A] font-medium italic" data-testid={`text-farmer-line-${currentStep.id}`}>
                        "{currentStep.farmerLine}"
                      </p>
                    </div>
                  )}

                  {/* Body Text */}
                  {currentStep.body && (
                    <p className="text-[#9fb2c3] text-lg leading-relaxed" data-testid={`text-body-${currentStep.id}`}>
                      {currentStep.body}
                    </p>
                  )}

                  {/* Bullets List */}
                  {currentStep.bullets && (
                    <ul className="space-y-2" data-testid={`bullets-${currentStep.id}`}>
                      {currentStep.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-[#9fb2c3]" data-testid={`bullet-${idx}`}>
                          <span className="text-[#26A69A] mt-1">•</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* Steps List */}
                  {currentStep.steps && (
                    <ol className="space-y-2" data-testid={`steps-${currentStep.id}`}>
                      {currentStep.steps.map((step, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-[#9fb2c3]" data-testid={`step-${idx}`}>
                          <span className="text-[#26A69A] font-bold">{idx + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  )}
                </div>
              </div>
            </div>

            {/* Progress Dots */}
            <div className="flex items-center justify-center gap-1 mb-6" data-testid="progress-dots">
              {STEPS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => navigateToStep(idx)}
                  className="p-2 hover:bg-slate-800/50 rounded-lg transition-colors"
                  data-testid={`dot-${idx}`}
                  aria-label={`Go to step ${idx + 1}`}
                >
                  <div className={`h-3 rounded-full transition-all duration-300 ${
                    idx === currentStepIndex 
                      ? 'w-8 bg-gradient-to-r from-[#26A69A] to-[#14B8A6]' 
                      : idx < currentStepIndex
                      ? 'w-3 bg-[#26A69A]/50'
                      : 'w-3 bg-slate-700'
                  }`} />
                </button>
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between gap-4">
              <button
                type="button"
                onClick={handleBack}
                disabled={isFirstStep}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all ${
                  isFirstStep
                    ? 'opacity-40 cursor-not-allowed bg-slate-800 text-slate-500'
                    : 'bg-slate-800 text-[#eef4f8] hover:bg-slate-700'
                }`}
                data-testid="button-back"
                aria-label="Previous step"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>

              {isLastStep ? (
                <button
                  type="button"
                  onClick={handleComplete}
                  className="flex items-center gap-2 px-8 py-3 rounded-xl bg-gradient-to-r from-[#26A69A] to-[#14B8A6] hover:opacity-90 transition font-bold text-lg"
                  data-testid="button-start-orientation"
                  aria-label="Start orientation"
                >
                  {currentStep.ctaText}
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#26A69A] to-[#14B8A6] hover:opacity-90 transition font-medium"
                  data-testid="button-next"
                  aria-label="Next step"
                >
                  Next
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Back to Hub Link */}
        <div className="mt-6 text-center">
          <Link href="/planb-webinars" className="text-[#9fb2c3] hover:text-[#26A69A] transition text-sm" data-testid="link-back-hub">
            ← Back to Plan B Hub
          </Link>
        </div>
      </div>

      {/* Rocket Launch Animation Overlay */}
      {showRocketAnimation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0b1420]/95 backdrop-blur" data-testid="rocket-animation-overlay">
          <div className="relative">
            {/* Rocket */}
            <div className="rocket-launch">
              <Rocket className="w-24 h-24 text-[#26A69A]" />
            </div>
            {/* Text */}
            <div className="text-center mt-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-[#26A69A] to-[#14B8A6] bg-clip-text text-transparent mb-2">
                Let's Go! 🚀
              </h2>
              <p className="text-[#9fb2c3]">Taking you to the sprints...</p>
            </div>
          </div>
        </div>
      )}

      {/* Rocket Animation Styles */}
      <style>{`
        @keyframes rocketLaunch {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-100px) scale(1.1);
            opacity: 1;
          }
          100% {
            transform: translateY(-400px) scale(0.5);
            opacity: 0;
          }
        }
        
        .rocket-launch {
          animation: rocketLaunch 2s ease-out forwards;
        }
      `}</style>
    </div>
  );
}
