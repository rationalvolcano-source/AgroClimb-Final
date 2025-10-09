import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Wind, Eye, Sprout, Sunrise, Moon } from "lucide-react";
import Nav from "@/components/Nav";
import WCStreamHeader from "@/components/WCStreamHeader";

// Deep Breathing Loop Component
function DeepBreathingLoop() {
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [count, setCount] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const startDelayRef = useRef<NodeJS.Timeout | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const phaseDurations = { inhale: 8, hold: 8, exhale: 8 };
  const phaseLabels = { inhale: "Breathe In", hold: "Hold", exhale: "Breathe Out" };

  useEffect(() => {
    if (!isRunning) return;

    const duration = phaseDurations[phase];
    
    if (count >= duration) {
      setPhase((currentPhase) => {
        if (currentPhase === "inhale") return "hold";
        if (currentPhase === "hold") return "exhale";
        return "inhale";
      });
      setCount(0);
      return;
    }

    timerRef.current = setTimeout(() => {
      setCount((prevCount) => prevCount + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [phase, count, phaseDurations, isRunning]);

  const duration = phaseDurations[phase];
  const progress = (count / duration) * 100;

  function handleStop() {
    setIsRunning(false);
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (startDelayRef.current) {
      clearTimeout(startDelayRef.current);
      startDelayRef.current = null;
    }
  }

  function handleStart() {
    // Clear any existing timers
    if (timerRef.current) clearTimeout(timerRef.current);
    if (startDelayRef.current) clearTimeout(startDelayRef.current);
    
    // Reset to initial state
    setPhase("inhale");
    setCount(0);
    setIsRunning(false);
    
    //Force a render with reset state, then start timer
    setTimeout(() => {
      setIsRunning(true);
    }, 0);
  }

  return (
    <Card className="bg-slate-900/60 border-slate-800 rounded-2xl p-6" data-testid="card-breathing">
      <div className="flex items-center gap-2 mb-4">
        <Wind className="h-5 w-5 text-emerald-400" />
        <h3 className="text-lg font-semibold">Deep Breathing Loop</h3>
      </div>
      <p className="text-sm text-slate-400 mb-6">8-8-8 breathing technique — autoplay looping timer</p>
      
      <div className="relative w-48 h-48 mx-auto mb-6">
        <svg className="transform -rotate-90" width="192" height="192">
          <circle cx="96" cy="96" r="80" fill="none" stroke="rgb(51 65 85)" strokeWidth="12" />
          <circle
            cx="96"
            cy="96"
            r="80"
            fill="none"
            stroke="rgb(52 211 153)"
            strokeWidth="12"
            strokeDasharray={`${2 * Math.PI * 80}`}
            strokeDashoffset={`${2 * Math.PI * 80 * (1 - progress / 100)}`}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="text-xl font-bold text-emerald-400" data-testid="text-breathing-phase">
            {phaseLabels[phase]}
          </div>
          <div className="text-sm text-slate-400 mt-1" data-testid="text-breathing-count">
            {count}/{duration}s
          </div>
        </div>
      </div>

      <div className="flex justify-center gap-3">
        {isRunning ? (
          <Button 
            onClick={handleStop} 
            variant="outline" 
            size="sm"
            className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10"
            data-testid="button-breathing-stop"
          >
            Stop
          </Button>
        ) : (
          <Button 
            onClick={handleStart} 
            className="bg-emerald-500 hover:bg-emerald-400"
            size="sm"
            data-testid="button-breathing-start"
          >
            Start
          </Button>
        )}
      </div>
    </Card>
  );
}

// 5-4-3-2-1 Grounding Component
function GroundingExercise() {
  const [currentStep, setCurrentStep] = useState(0);
  const [isActive, setIsActive] = useState(false);

  const steps = [
    "Find 5 things you can see around you",
    "Find 4 things you can touch",
    "Find 3 things you can hear",
    "Find 2 things you can smell",
    "Find 1 thing you can taste"
  ];

  function handleStart() {
    setIsActive(true);
    setCurrentStep(0);
  }

  function handleNext() {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setIsActive(false);
      setCurrentStep(0);
    }
  }

  function handleReset() {
    setIsActive(false);
    setCurrentStep(0);
  }

  return (
    <Card className="bg-slate-900/60 border-slate-800 rounded-2xl p-6" data-testid="card-grounding">
      <div className="flex items-center gap-2 mb-4">
        <Eye className="h-5 w-5 text-cyan-400" />
        <h3 className="text-lg font-semibold">5-4-3-2-1 Grounding</h3>
      </div>
      <p className="text-sm text-slate-400 mb-6">Interactive text walk-through to anchor yourself in the present</p>

      {!isActive ? (
        <div className="text-center py-8">
          <p className="text-slate-300 mb-6">A simple sensory exercise to calm anxiety and bring you back to the present moment.</p>
          <Button onClick={handleStart} className="bg-cyan-500 hover:bg-cyan-400" data-testid="button-grounding-start">
            Begin Exercise
          </Button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="min-h-[120px] flex items-center justify-center">
            <p className="text-lg text-slate-200 text-center" data-testid="text-grounding-step">
              {steps[currentStep]}
            </p>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-500" data-testid="text-grounding-progress">Step {currentStep + 1} of {steps.length}</span>
            <div className="flex gap-2">
              <Button onClick={handleReset} variant="outline" size="sm" data-testid="button-grounding-reset">
                Reset
              </Button>
              <Button onClick={handleNext} className="bg-cyan-500 hover:bg-cyan-400" size="sm" data-testid="button-grounding-next">
                {currentStep === steps.length - 1 ? "Complete" : "Next"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}

// Narration array defined outside component to prevent recreation on every render
const farmNarration = [
  "Close your eyes and imagine...",
  "Early dawn mist over green fields...",
  "The soft rustling of wheat in the gentle breeze...",
  "Birds chirping as the sun rises...",
  "The earth beneath your feet, solid and grounding...",
  "Peace flows through you like a quiet stream.",
  "You are calm, centered, and ready."
];

// Calm Farm Visualization Component
function CalmFarmVisualization() {
  const [currentLine, setCurrentLine] = useState(0);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (currentLine >= farmNarration.length - 1) {
      timerRef.current = setTimeout(() => {
        setCurrentLine(0);
      }, 3000);
    } else {
      timerRef.current = setTimeout(() => {
        setCurrentLine((prev) => prev + 1);
      }, 3000);
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [currentLine]);

  function toggleAudio() {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause();
        setAudioPlaying(false);
      } else {
        audioRef.current.play();
        setAudioPlaying(true);
      }
    }
  }

  return (
    <Card className="bg-slate-900/60 border-slate-800 rounded-2xl p-6" data-testid="card-visualization">
      <div className="flex items-center gap-2 mb-4">
        <Sprout className="h-5 w-5 text-emerald-400" />
        <h3 className="text-lg font-semibold">Calm Farm Visualization</h3>
      </div>
      <p className="text-sm text-slate-400 mb-6">Gentle guided imagery with ambient agri sounds</p>

      <div className="space-y-6">
        <div className="w-full h-40 bg-gradient-to-br from-emerald-900/30 to-cyan-900/30 rounded-lg flex items-center justify-center">
          <div className="min-h-[80px] flex items-center justify-center px-6">
            <p className="text-lg text-slate-200 text-center italic" data-testid="text-visualization-line">
              {farmNarration[currentLine]}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center gap-4">
          <span className="text-xs text-slate-500" data-testid="text-visualization-progress">
            {currentLine + 1} / {farmNarration.length} • Auto-progressing
          </span>
          <Button 
            onClick={toggleAudio}
            variant="outline"
            size="sm"
            className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10"
            data-testid="button-toggle-audio"
          >
            {audioPlaying ? "🔊 Pause Sound" : "🔇 Play Ambient Sound"}
          </Button>
        </div>
      </div>
      
      <audio 
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/audio/2022/05/13/audio_c0ca63d4fa.mp3"
        data-testid="audio-farm"
      />
    </Card>
  );
}

// Feeling Better Component
function FeelingBetter() {
  const [rating, setRating] = useState<number | null>(null);

  const emojis = ["😔", "😟", "😐", "🙂", "😊"];

  return (
    <Card className="bg-slate-900/60 border-slate-800 rounded-2xl p-6" data-testid="card-feeling-better">
      <h3 className="text-lg font-semibold mb-4 text-center">Feeling better?</h3>
      <div className="flex justify-center gap-4 mb-6">
        {emojis.map((emoji, index) => (
          <button
            key={index}
            onClick={() => setRating(index + 1)}
            className={`text-4xl transition-all ${
              rating === index + 1 ? "scale-125" : "scale-100 opacity-60 hover:opacity-100 hover:scale-110"
            }`}
            data-testid={`button-emoji-${index + 1}`}
          >
            {emoji}
          </button>
        ))}
      </div>
      {rating !== null && rating <= 2 && (
        <div className="text-center" data-testid="text-try-again">
          <p className="text-sm text-slate-400 mb-3">That's okay. Sometimes it takes a few tries.</p>
          <a 
            href="#" 
            onClick={(e) => { e.preventDefault(); setRating(null); }}
            className="text-sm text-emerald-400 hover:text-emerald-300 underline"
            data-testid="link-try-again"
          >
            Try again or take a short break
          </a>
        </div>
      )}
      {rating !== null && rating > 2 && (
        <p className="text-center text-sm text-emerald-400" data-testid="text-great">
          Great! You're ready to get back to studying. 📚
        </p>
      )}
    </Card>
  );
}

// Morning Yoga Component
function MorningYoga() {
  return (
    <Card className="bg-slate-900/60 border-slate-800 rounded-2xl p-6" data-testid="card-morning-yoga">
      <div className="flex items-center gap-2 mb-4">
        <Sunrise className="h-5 w-5 text-amber-400" />
        <h3 className="text-lg font-semibold">Morning Yoga</h3>
      </div>
      <p className="text-sm text-slate-400 mb-6">Start your day with gentle stretches and mindful breathing</p>
      
      <div className="aspect-video w-full bg-slate-800 rounded-lg overflow-hidden mb-4">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/VaoV1PrYft4"
          title="Morning Yoga"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          data-testid="iframe-morning-yoga"
        ></iframe>
      </div>
      
      <p className="text-xs text-slate-500 text-center">⏱ 15-20 minutes • Perfect for pre-study energizing</p>
    </Card>
  );
}

// Evening Yoga Component
function EveningYoga() {
  return (
    <Card className="bg-slate-900/60 border-slate-800 rounded-2xl p-6" data-testid="card-evening-yoga">
      <div className="flex items-center gap-2 mb-4">
        <Moon className="h-5 w-5 text-indigo-400" />
        <h3 className="text-lg font-semibold">Evening Yoga</h3>
      </div>
      <p className="text-sm text-slate-400 mb-6">Wind down with relaxing poses for better sleep and recovery</p>
      
      <div className="aspect-video w-full bg-slate-800 rounded-lg overflow-hidden mb-4">
        <iframe
          width="100%"
          height="100%"
          src="https://www.youtube.com/embed/BiWDsfZ3zbo"
          title="Evening Yoga"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
          data-testid="iframe-evening-yoga"
        ></iframe>
      </div>
      
      <p className="text-xs text-slate-500 text-center">⏱ 15-20 minutes • Ideal for post-study relaxation</p>
    </Card>
  );
}

// Main Wellness Centre Component
export default function WellnessCentre() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Nav />
      
      <main className="mx-auto max-w-7xl px-4 py-12">
        <div id="register-webinar">
          <WCStreamHeader />
        </div>

        {/* Section 1: Quick Calm */}
        <div className="mb-8" id="quick-calm">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2" data-testid="text-section-title">Quick Calm (Anxiety Relief)</h2>
            <p className="text-slate-400 mb-1">⏱ Duration: 2–3 minutes</p>
            <p className="text-lg text-emerald-400 italic">"When your thoughts scatter, breathe them back."</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <DeepBreathingLoop />
            <GroundingExercise />
            <CalmFarmVisualization />
          </div>

          <FeelingBetter />
        </div>

        {/* Section 2: Yoga Sessions */}
        <div className="mb-8" id="yoga-videos">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold mb-2" data-testid="text-yoga-section-title">Yoga Sessions</h2>
            <p className="text-slate-400">Strengthen body & mind through mindful movement</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <MorningYoga />
            <EveningYoga />
          </div>
        </div>
      </main>
    </div>
  );
}
