import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { ArrowLeft, ArrowRight, Volume2, VolumeX } from "lucide-react";

interface QuizQuestion {
  q: string;
  options: string[];
  correctIndex: number;
  tag: string;
}

const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    q: "Which function best replaces VLOOKUP and can search left or right?",
    options: ["INDEX", "MATCH", "XLOOKUP", "HLOOKUP"],
    correctIndex: 2,
    tag: "Lookup"
  },
  {
    q: "Which combo returns a value when lookup column is left of the return column?",
    options: ["INDEX + MATCH", "VLOOKUP", "HLOOKUP", "OFFSET"],
    correctIndex: 0,
    tag: "Lookup"
  },
  {
    q: "What does the reference $A1 represent?",
    options: ["Relative column & row", "Absolute column, relative row", "Absolute row only", "Absolute column & row"],
    correctIndex: 1,
    tag: "References"
  },
  {
    q: "Which dynamic array function returns unique values from a list?",
    options: ["FILTER", "UNIQUE", "SORT", "SEQUENCE"],
    correctIndex: 1,
    tag: "Dynamic Arrays"
  },
  {
    q: "In a PivotTable, which action groups dates by month quickly?",
    options: ["Create a slicer", "Group Field", "Show Values As %", "Refresh"],
    correctIndex: 1,
    tag: "Pivot/Grouping"
  },
  {
    q: "Which function safely handles possible errors in a formula?",
    options: ["IFERROR", "ISERROR", "ERROR.TYPE", "IFNA only"],
    correctIndex: 0,
    tag: "Error Handling"
  },
  {
    q: "For counting rows matching two conditions (e.g., State & Crop), use:",
    options: ["COUNTIF", "SUMIF", "COUNTIFS", "AVERAGEIFS"],
    correctIndex: 2,
    tag: "Multi-Criteria Counts"
  },
  {
    q: "Power Query is best used to:",
    options: ["Create PivotCharts", "Clean & reshape imported data", "Add conditional formats", "Record macros"],
    correctIndex: 1,
    tag: "Power Query"
  },
  {
    q: "Which function joins text across a range with a delimiter, ignoring blanks?",
    options: ["TEXTJOIN", "CONCATENATE", "LEFT", "MID"],
    correctIndex: 0,
    tag: "Text Functions"
  },
  {
    q: "When charting categories across states, the best default choice is:",
    options: ["Column/Bar", "Pie", "Scatter", "Surface"],
    correctIndex: 0,
    tag: "Charts"
  }
];

const TIMER_SECONDS = 10;

export default function ExcelQuiz() {
  const [showIntro, setShowIntro] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(TIMER_SECONDS);
  const [questionTimes, setQuestionTimes] = useState<number[]>([]);
  const [wrongTags, setWrongTags] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const questionStartTime = useRef<number>(Date.now());

  const currentQuestion = QUIZ_QUESTIONS[currentIndex];
  const progress = ((currentIndex + 1) / QUIZ_QUESTIONS.length) * 100;

  // Timer logic
  useEffect(() => {
    if (showIntro || showResults || selectedAnswer !== null) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    questionStartTime.current = Date.now();
    setTimeLeft(TIMER_SECONDS);

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          handleTimeout();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [currentIndex, showIntro, showResults, selectedAnswer]);

  const handleTimeout = () => {
    const elapsed = (Date.now() - questionStartTime.current) / 1000;
    setQuestionTimes(prev => [...prev, elapsed]);
    setWrongTags(prev => [...prev, currentQuestion.tag]);
    setSelectedAnswer(-1); // Lock buttons by setting to invalid index
    
    if (timerRef.current) clearInterval(timerRef.current);
    
    setTimeout(() => {
      if (currentIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
      } else {
        setShowResults(true);
      }
    }, 1500);
  };

  const handleAnswer = (index: number) => {
    if (selectedAnswer !== null) return;

    const elapsed = (Date.now() - questionStartTime.current) / 1000;
    setQuestionTimes(prev => [...prev, elapsed]);
    setSelectedAnswer(index);

    if (index === currentQuestion.correctIndex) {
      setScore(prev => prev + 1);
    } else {
      setWrongTags(prev => [...prev, currentQuestion.tag]);
    }

    if (timerRef.current) clearInterval(timerRef.current);

    setTimeout(() => {
      if (currentIndex < QUIZ_QUESTIONS.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setSelectedAnswer(null);
      } else {
        setShowResults(true);
      }
    }, 1500);
  };

  // Save results when quiz finishes
  useEffect(() => {
    if (!showResults) return;

    const avgTime = questionTimes.length > 0 
      ? questionTimes.reduce((a, b) => a + b, 0) / questionTimes.length 
      : 0;
    const skillLevel = score >= 8 ? "Advanced" : score >= 4 ? "Intermediate" : "Beginner";
    
    // Count tag occurrences and get top 2 weaknesses
    const tagCounts: { [key: string]: number } = {};
    wrongTags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
    const weaknesses = Object.entries(tagCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 2)
      .map(([tag]) => tag);

    const result = {
      skillLevel,
      score,
      avgTimeSec: Math.round(avgTime * 10) / 10,
      weaknesses,
      completedAt: new Date().toISOString()
    };

    localStorage.setItem("excel_quiz_result", JSON.stringify(result));
  }, [showResults, score, questionTimes, wrongTags]);

  const startQuiz = () => {
    setShowIntro(false);
    questionStartTime.current = Date.now();
  };

  const getSkillColor = () => {
    if (score >= 8) return "text-green-500";
    if (score >= 4) return "text-amber-500";
    return "text-red-500";
  };

  const getSkillLevel = () => {
    if (score >= 8) return "Advanced";
    if (score >= 4) return "Intermediate";
    return "Beginner";
  };

  const avgTime = questionTimes.length > 0 
    ? Math.round((questionTimes.reduce((a, b) => a + b, 0) / questionTimes.length) * 10) / 10 
    : 0;

  // Get top 2 weaknesses
  const tagCounts: { [key: string]: number } = {};
  wrongTags.forEach(tag => {
    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  });
  const topWeaknesses = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([tag]) => tag);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1420] via-[#0f1530] to-[#0b1420]">
      {/* Header */}
      <div className="border-b border-slate-800 bg-[#101a28]/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/planb-webinars">
                <button type="button" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition" data-testid="button-back-planb">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </Link>
              <div>
                <h1 className="text-2xl md:text-3xl font-bold" data-testid="text-quiz-title">Excel Plan B — Entry Quiz</h1>
                <div className="flex items-center gap-2 mt-1">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-[#26A69A]/20 to-[#14B8A6]/20 text-[#26A69A] border border-[#26A69A]/30" data-testid="text-quiz-duration">
                    ⏱️ ~2–3 min • 10 questions
                  </span>
                </div>
              </div>
            </div>
            <button 
              type="button"
              onClick={() => setSoundEnabled(!soundEnabled)}
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
              data-testid="button-sound-toggle"
            >
              {soundEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Intro Modal */}
        {showIntro && (
          <div className="bg-[#101a28] rounded-2xl p-8 md:p-12 border border-[#1e2b3f] shadow-2xl" data-testid="intro-modal">
            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-[#26A69A] to-[#14B8A6] bg-clip-text text-transparent" data-testid="text-intro-title">
                Welcome! 👋
              </h2>
              <div className="space-y-4 text-[#9fb2c3] text-lg leading-relaxed max-w-2xl mx-auto">
                <p data-testid="text-intro-message">
                  This quick check helps us guide you better.
                </p>
                <p className="text-xl font-medium text-[#eef4f8]">
                  Don't worry if you don't know something—just answer honestly.
                </p>
                <p>
                  You'll see your skill level at the end.
                </p>
              </div>
              <button
                type="button"
                onClick={startQuiz}
                className="mt-8 px-8 py-4 rounded-xl bg-gradient-to-r from-[#26A69A] to-[#14B8A6] hover:opacity-90 transition font-bold text-lg inline-flex items-center gap-2"
                data-testid="button-start-quiz"
              >
                Start Quiz <ArrowRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}

        {/* Quiz Card */}
        {!showIntro && !showResults && (
          <div className="bg-[#101a28] rounded-2xl p-6 md:p-8 border border-[#1e2b3f] shadow-2xl space-y-6" data-testid="quiz-card">
            {/* Progress Dots */}
            <div className="flex items-center justify-center gap-2" data-testid="progress-dots">
              {QUIZ_QUESTIONS.map((_, idx) => (
                <div
                  key={idx}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    idx <= currentIndex ? 'bg-gradient-to-r from-[#26A69A] to-[#14B8A6] scale-110' : 'bg-slate-700'
                  }`}
                  data-testid={`dot-${idx}`}
                />
              ))}
            </div>

            {/* Status */}
            <div className="flex items-center justify-between text-sm text-[#9fb2c3]" data-testid="quiz-status">
              <span>Question {currentIndex + 1}/10</span>
              <span>Time left: {timeLeft}s</span>
            </div>

            {/* Timer Bar */}
            <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#26A69A] to-[#14B8A6] transition-all duration-1000 ease-linear"
                style={{ width: `${(timeLeft / TIMER_SECONDS) * 100}%` }}
                data-testid="timer-bar"
              />
            </div>

            {/* Question */}
            <div className="py-6">
              <h3 className="text-xl md:text-2xl font-semibold text-[#eef4f8] leading-relaxed" data-testid="text-question">
                {currentQuestion.q}
              </h3>
            </div>

            {/* Options */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {currentQuestion.options.map((option, idx) => {
                const isSelected = selectedAnswer === idx;
                const isCorrect = idx === currentQuestion.correctIndex;
                const showFeedback = selectedAnswer !== null;

                let buttonClass = "p-4 rounded-xl border-2 transition-all text-left font-medium ";
                
                if (showFeedback) {
                  if (isCorrect) {
                    buttonClass += "border-green-500 bg-green-500/20 text-green-400";
                  } else if (isSelected) {
                    buttonClass += "border-red-500 bg-red-500/20 text-red-400 animate-shake";
                  } else {
                    buttonClass += "border-slate-700 bg-slate-800/50 text-[#9fb2c3] opacity-50";
                  }
                } else {
                  buttonClass += "border-slate-700 bg-slate-800/50 text-[#eef4f8] hover:border-[#26A69A] hover:bg-[#26A69A]/10";
                }

                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleAnswer(idx)}
                    disabled={selectedAnswer !== null}
                    className={buttonClass}
                    data-testid={`button-option-${idx}`}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Results */}
        {showResults && (
          <div className="bg-[#101a28] rounded-2xl p-8 md:p-12 border border-[#1e2b3f] shadow-2xl space-y-8" data-testid="results-card">
            <div className="text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold" data-testid="text-results-title">
                Quiz Complete! 🎉
              </h2>

              {/* Skill Level */}
              <div className="space-y-2">
                <p className="text-[#9fb2c3]">Your Skill Level</p>
                <p className={`text-4xl md:text-5xl font-bold ${getSkillColor()}`} data-testid="text-skill-level">
                  {getSkillLevel()}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-md mx-auto" data-testid="results-stats">
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                  <p className="text-[#9fb2c3] text-sm">Score</p>
                  <p className="text-2xl font-bold text-[#eef4f8]">{score}/10 ({Math.round((score/10)*100)}%)</p>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                  <p className="text-[#9fb2c3] text-sm">Avg Time</p>
                  <p className="text-2xl font-bold text-[#eef4f8]">{avgTime}s</p>
                </div>
              </div>

              {/* Weak Areas */}
              {topWeaknesses.length > 0 && (
                <div className="space-y-3">
                  <p className="text-[#9fb2c3] text-sm">Areas to Focus On</p>
                  <div className="flex flex-wrap justify-center gap-2" data-testid="weakness-tags">
                    {topWeaknesses.map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 rounded-lg bg-amber-500/20 text-amber-400 border border-amber-500/30 text-sm font-medium"
                        data-testid={`tag-${idx}`}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <div className="pt-6">
                <Link href="/excel-orientation">
                  <button
                    type="button"
                    className="px-8 py-4 rounded-xl bg-gradient-to-r from-[#26A69A] to-[#14B8A6] hover:opacity-90 transition font-bold text-lg inline-flex items-center gap-2"
                    data-testid="button-start-orientation"
                  >
                    Start Orientation <ArrowRight className="w-5 h-5" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Shake Animation */}
      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-8px); }
          75% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.3s ease-in-out;
        }
      `}</style>
    </div>
  );
}
