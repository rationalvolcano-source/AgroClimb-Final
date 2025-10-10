import { useState, useEffect, useRef } from "react";
import { Link } from "wouter";
import { Upload, ArrowLeft, Play } from "lucide-react";

// Dynamically load pdf.js
declare global {
  interface Window {
    pdfjsLib: any;
  }
}

interface Question {
  question: string;
  options: string[];
  correct_answer: string;
}

const MODES = {
  Easy: { time: 14, rounds: 10, aiAccuracy: 0.55 },
  Difficult: { time: 10, rounds: 12, aiAccuracy: 0.70 },
  Legendary: { time: 7, rounds: 14, aiAccuracy: 0.85 },
};

export default function FlashcardDuel() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [mode, setMode] = useState<keyof typeof MODES>("Easy");
  const [gameState, setGameState] = useState<"upload" | "ready" | "playing" | "ended">("upload");
  const [currentRound, setCurrentRound] = useState(0);
  const [playerScore, setPlayerScore] = useState(0);
  const [aiScore, setAiScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [combo, setCombo] = useState(0);
  const [legendaryMeter, setLegendaryMeter] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [totalAnswered, setTotalAnswered] = useState(0);
  const [showComboPopup, setShowComboPopup] = useState(false);
  const [resultFeedback, setResultFeedback] = useState<"correct" | "wrong" | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const currentQuestion = questions[currentRound];
  const modeConfig = MODES[mode];
  const accuracy = totalAnswered > 0 ? Math.round((correctCount / totalAnswered) * 100) : 0;

  // Parse PDF text
  const parsePDF = (text: string): Question[] => {
    const parsed: Question[] = [];
    const lines = text.split("\n").map((l) => l.trim()).filter((l) => l);
    
    let currentQ: Partial<Question> | null = null;
    // Updated pattern to handle both "A) Option" and "(A) Option" formats
    const optionPattern = /^\(?([A-D])\)\s*(.+?)(\s*\(C\))?$/i;

    for (const line of lines) {
      if (line.match(/^Q\d+\./i)) {
        if (currentQ && currentQ.question && currentQ.options) {
          parsed.push(currentQ as Question);
        }
        currentQ = { question: line.replace(/^Q\d+\.\s*/i, ""), options: [], correct_answer: "" };
      } else if (currentQ && optionPattern.test(line)) {
        const match = line.match(optionPattern);
        if (match) {
          const optionText = match[2].trim();
          currentQ.options!.push(optionText);
          if (match[3]) {
            currentQ.correct_answer = optionText;
          }
        }
      }
    }
    
    if (currentQ && currentQ.question && currentQ.options) {
      parsed.push(currentQ as Question);
    }
    
    return parsed.filter((q) => q.correct_answer);
  };

  // Load pdf.js if not already loaded
  useEffect(() => {
    if (!window.pdfjsLib) {
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
      script.onload = () => {
        if (window.pdfjsLib) {
          window.pdfjsLib.GlobalWorkerOptions.workerSrc = 
            'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        }
      };
      document.head.appendChild(script);
    }
  }, []);

  // Handle PDF upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      let text = "";
      
      if (file.type === "application/pdf") {
        // Handle PDF files with pdf.js
        if (!window.pdfjsLib) {
          alert("PDF library is loading. Please try again in a moment.");
          return;
        }
        
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await window.pdfjsLib.getDocument({ data: arrayBuffer }).promise;
        
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          
          // Preserve line breaks by checking hasEOL or adding newlines between items
          const pageText = content.items.map((item: any, index: number) => {
            const nextItem = content.items[index + 1];
            const str = item.str;
            
            // Add newline if item has EOL marker or if there's a significant Y-position change
            if (item.hasEOL || (nextItem && Math.abs(item.transform[5] - nextItem.transform[5]) > 5)) {
              return str + '\n';
            }
            return str + ' ';
          }).join('');
          
          text += pageText + '\n';
        }
      } else {
        // Handle text files
        text = await file.text();
      }
      
      const parsed = parsePDF(text);
      
      if (parsed.length > 0) {
        setQuestions(parsed);
        setGameState("ready");
        alert(`✅ Questions Loaded: ${parsed.length} found`);
      } else {
        alert("❌ No valid questions found. Check file format.\n\nExpected format:\nQ1. Question text?\nA) Option 1 (C)\nB) Option 2\nC) Option 3\nD) Option 4");
      }
    } catch (error) {
      alert("❌ Error reading file. Please try again.");
      console.error(error);
    }
  };

  // Start game
  const startGame = () => {
    setGameState("playing");
    setCurrentRound(0);
    setPlayerScore(0);
    setAiScore(0);
    setStreak(0);
    setCombo(0);
    setLegendaryMeter(0);
    setCorrectCount(0);
    setTotalAnswered(0);
    setSelectedAnswer(null);
    setResultFeedback(null);
    setTimeLeft(modeConfig.time);
  };

  // Timer countdown
  useEffect(() => {
    if (gameState === "playing" && timeLeft > 0) {
      timerRef.current = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    } else if (gameState === "playing" && timeLeft === 0) {
      handleTimeout();
    }
  }, [timeLeft, gameState]);

  // AI answer logic
  const getAIAnswer = () => {
    const correct = Math.random() < modeConfig.aiAccuracy;
    if (correct) {
      return currentQuestion.correct_answer;
    } else {
      const wrongOptions = currentQuestion.options.filter((o) => o !== currentQuestion.correct_answer);
      return wrongOptions[Math.floor(Math.random() * wrongOptions.length)];
    }
  };

  // Handle player answer
  const handleAnswer = (answer: string) => {
    if (selectedAnswer) return;
    
    setSelectedAnswer(answer);
    setTotalAnswered(totalAnswered + 1);
    
    const isCorrect = answer === currentQuestion.correct_answer;
    setResultFeedback(isCorrect ? "correct" : "wrong");
    
    // Player scoring
    if (isCorrect) {
      setPlayerScore(playerScore + 12);
      setStreak(streak + 1);
      setCorrectCount(correctCount + 1);
      
      const newCombo = combo + 1;
      setCombo(newCombo);
      
      if (newCombo % 3 === 0) {
        setShowComboPopup(true);
        setPlayerScore((s) => s + 25);
        setTimeout(() => setShowComboPopup(false), 1500);
      }
      
      setLegendaryMeter(Math.min(100, legendaryMeter + 20));
    } else {
      setStreak(0);
      setCombo(0);
    }
    
    // AI scoring
    const aiAnswer = getAIAnswer();
    if (aiAnswer === currentQuestion.correct_answer) {
      setAiScore(aiScore + 10);
    }
    
    // Next round
    setTimeout(() => {
      if (currentRound + 1 < modeConfig.rounds && currentRound + 1 < questions.length) {
        setCurrentRound(currentRound + 1);
        setTimeLeft(modeConfig.time);
        setSelectedAnswer(null);
        setResultFeedback(null);
      } else {
        setGameState("ended");
      }
    }, 1500);
  };

  // Handle timeout
  const handleTimeout = () => {
    if (selectedAnswer) return;
    
    setTotalAnswered(totalAnswered + 1);
    setStreak(0);
    setCombo(0);
    setResultFeedback("wrong");
    
    // AI gets bonus on timeout
    setAiScore(aiScore + 3);
    
    setTimeout(() => {
      if (currentRound + 1 < modeConfig.rounds && currentRound + 1 < questions.length) {
        setCurrentRound(currentRound + 1);
        setTimeLeft(modeConfig.time);
        setSelectedAnswer(null);
        setResultFeedback(null);
      } else {
        setGameState("ended");
      }
    }, 1500);
  };

  const getResult = () => {
    if (playerScore > aiScore) return "🏆 Victory!";
    if (playerScore === aiScore) return "🤝 Draw!";
    return "💔 Defeat!";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1420] via-[#0f1a2e] to-[#14332e] text-[#eef4f8]">
      {/* Header */}
      <div className="border-b border-slate-800 bg-[#101a28]/80 backdrop-blur">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/games">
                <button type="button" className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition" data-testid="button-back-games">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </Link>
              <h1 className="text-2xl md:text-3xl font-bold" data-testid="text-game-title">⚡ Flashcard Duel</h1>
            </div>
            {gameState === "upload" && (
              <label className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#26A69A] to-[#14B8A6] hover:opacity-90 transition cursor-pointer font-semibold" data-testid="button-upload-pdf">
                <Upload className="w-4 h-4 inline mr-2" />
                📥 Upload PDF
                <input
                  type="file"
                  accept=".pdf,.txt"
                  onChange={handleFileUpload}
                  className="hidden"
                  data-testid="input-pdf-upload"
                />
              </label>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Upload State */}
        {gameState === "upload" && (
          <div className="text-center py-20" data-testid="upload-state">
            <div className="text-6xl mb-6">📄</div>
            <h2 className="text-2xl font-bold mb-4" data-testid="text-upload-title">Upload Your Question PDF</h2>
            <p className="text-[#9fb2c3] max-w-md mx-auto" data-testid="text-upload-instructions">
              Upload a PDF with questions formatted with (C) marking the correct answer
            </p>
          </div>
        )}

        {/* Ready State */}
        {gameState === "ready" && (
          <div className="max-w-md mx-auto text-center py-12" data-testid="ready-state">
            <div className="bg-[#101a28] rounded-3xl p-8 border border-slate-800">
              <h2 className="text-2xl font-bold mb-6" data-testid="text-mode-title">Choose Your Mode</h2>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as keyof typeof MODES)}
                className="w-full bg-[#0b1420] border border-slate-700 rounded-lg px-4 py-3 mb-6 outline-none"
                data-testid="select-mode"
              >
                <option value="Easy">Easy (14s, 10 rounds)</option>
                <option value="Difficult">Difficult (10s, 12 rounds)</option>
                <option value="Legendary">Legendary (7s, 14 rounds)</option>
              </select>
              <button
                type="button"
                onClick={startGame}
                className="w-full px-6 py-4 rounded-lg bg-gradient-to-r from-[#26A69A] to-[#14B8A6] hover:opacity-90 transition font-bold text-lg"
                data-testid="button-start-duel"
              >
                <Play className="w-5 h-5 inline mr-2" />
                ▶ Start Duel
              </button>
              <p className="text-[#9fb2c3] text-sm mt-4" data-testid="text-questions-count">
                {questions.length} questions loaded
              </p>
            </div>
          </div>
        )}

        {/* Playing State */}
        {gameState === "playing" && currentQuestion && (
          <div className="grid md:grid-cols-3 gap-6" data-testid="playing-state">
            {/* Left: Question Card */}
            <div className="md:col-span-2">
              <div className={`bg-[#101a28] rounded-3xl p-6 border border-slate-800 transition-all ${
                resultFeedback === "correct" ? "border-[#22c55e] shadow-[0_0_30px_rgba(34,197,94,0.3)]" :
                resultFeedback === "wrong" ? "border-[#ef4444] animate-shake" : ""
              }`}>
                {/* Timer Bar */}
                <div className="mb-4">
                  <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-[#26A69A] to-[#14B8A6] transition-all duration-1000"
                      style={{ width: `${(timeLeft / modeConfig.time) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Question */}
                <h3 className="text-xl font-semibold mb-6" data-testid="text-question">
                  {currentQuestion.question}
                </h3>

                {/* Options */}
                <div className="space-y-3">
                  {currentQuestion.options.map((option, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAnswer(option)}
                      disabled={!!selectedAnswer}
                      className={`w-full text-left px-4 py-3 rounded-lg transition ${
                        selectedAnswer === option && option === currentQuestion.correct_answer
                          ? "bg-[#22c55e] text-white"
                          : selectedAnswer === option && option !== currentQuestion.correct_answer
                          ? "bg-[#ef4444] text-white"
                          : selectedAnswer && option === currentQuestion.correct_answer
                          ? "bg-[#22c55e] text-white"
                          : "bg-slate-800 hover:bg-slate-700"
                      } ${!selectedAnswer ? "cursor-pointer" : "cursor-not-allowed"}`}
                      data-testid={`button-option-${idx}`}
                    >
                      {option}
                    </button>
                  ))}
                </div>

                {/* Meta Row */}
                <div className="mt-6 flex justify-between text-sm text-[#9fb2c3]">
                  <span data-testid="text-round">Round {currentRound + 1}/{modeConfig.rounds}</span>
                  <span data-testid="text-streak">Streak: {streak}</span>
                  <span data-testid="text-accuracy">Accuracy: {accuracy}%</span>
                </div>
              </div>
            </div>

            {/* Right: Scores & Meter */}
            <div className="space-y-4">
              {/* Scores */}
              <div className="bg-[#101a28] rounded-3xl p-4 border border-slate-800">
                <div className="text-center mb-3">
                  <div className="text-sm text-[#9fb2c3]">Your Score</div>
                  <div className="text-3xl font-bold text-[#26A69A]" data-testid="text-player-score">{playerScore}</div>
                </div>
                <div className="border-t border-slate-800 pt-3 text-center">
                  <div className="text-sm text-[#9fb2c3]">AI Score</div>
                  <div className="text-3xl font-bold text-[#ef4444]" data-testid="text-ai-score">{aiScore}</div>
                </div>
              </div>

              {/* Legendary Meter */}
              <div className="bg-[#101a28] rounded-3xl p-4 border border-slate-800">
                <div className="text-sm text-[#9fb2c3] mb-2" data-testid="text-legendary-meter">Legendary Meter</div>
                <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-[#f59e0b] to-[#ef4444] transition-all"
                    style={{ width: `${legendaryMeter}%` }}
                  />
                </div>
              </div>

              {/* Tips */}
              <div className="bg-[#101a28] rounded-3xl p-4 border border-slate-800">
                <div className="text-sm text-[#9fb2c3]" data-testid="text-tip">
                  💡 <strong>Tip:</strong> 3 correct answers = Combo bonus!
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Ended State */}
        {gameState === "ended" && (
          <div className="max-w-md mx-auto text-center py-12" data-testid="ended-state">
            <div className="bg-[#101a28] rounded-3xl p-8 border border-slate-800">
              <h2 className="text-3xl font-bold mb-4" data-testid="text-result">{getResult()}</h2>
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <div className="text-sm text-[#9fb2c3]">Your Score</div>
                  <div className="text-2xl font-bold text-[#26A69A]">{playerScore}</div>
                </div>
                <div>
                  <div className="text-sm text-[#9fb2c3]">AI Score</div>
                  <div className="text-2xl font-bold text-[#ef4444]">{aiScore}</div>
                </div>
              </div>
              <div className="text-[#9fb2c3] mb-6" data-testid="text-final-stats">
                Accuracy: {accuracy}% • Streak: {streak}
              </div>
              <button
                type="button"
                onClick={startGame}
                className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-[#26A69A] to-[#14B8A6] hover:opacity-90 transition font-bold"
                data-testid="button-play-again"
              >
                Play Again
              </button>
            </div>
          </div>
        )}

        {/* Combo Popup */}
        {showComboPopup && (
          <div className="fixed inset-0 flex items-center justify-center pointer-events-none z-50" data-testid="combo-popup">
            <div className="bg-gradient-to-r from-[#f59e0b] to-[#ef4444] text-white px-8 py-4 rounded-2xl text-2xl font-bold animate-bounce">
              🔥 Combo x3 +25 XP
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-10px); }
          75% { transform: translateX(10px); }
        }
        .animate-shake {
          animation: shake 0.3s;
        }
      `}</style>
    </div>
  );
}
