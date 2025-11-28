import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Zap, Calculator, Compass, Trophy, RotateCcw } from "lucide-react";

// =============================
// NUMBER SPRINT - Mental Math Speed
// =============================
function NumberSprint() {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [operator, setOperator] = useState("+");
  const [options, setOptions] = useState<number[]>([]);
  const [correct, setCorrect] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [timeLeft, setTimeLeft] = useState(60);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const generateQuestion = () => {
    const ops = ["+", "-", "×"];
    const op = ops[Math.floor(Math.random() * ops.length)];
    let a, b, answer;

    if (op === "+") {
      a = Math.floor(Math.random() * 50) + 10;
      b = Math.floor(Math.random() * 50) + 10;
      answer = a + b;
    } else if (op === "-") {
      a = Math.floor(Math.random() * 50) + 30;
      b = Math.floor(Math.random() * 30) + 1;
      answer = a - b;
    } else {
      a = Math.floor(Math.random() * 12) + 2;
      b = Math.floor(Math.random() * 12) + 2;
      answer = a * b;
    }

    setNum1(a);
    setNum2(b);
    setOperator(op);
    setCorrect(answer);

    // Generate wrong options
    const wrongOptions = new Set<number>();
    while (wrongOptions.size < 3) {
      const offset = Math.floor(Math.random() * 20) - 10;
      const wrongVal: number = answer + offset;
      if (wrongVal !== answer && wrongVal > 0) {
        wrongOptions.add(wrongVal);
      }
    }

    const allOptions = [answer, ...Array.from(wrongOptions)];
    setOptions(allOptions.sort(() => Math.random() - 0.5));
  };

  const startGame = () => {
    setScore(0);
    setStreak(0);
    setTimeLeft(60);
    setGameOver(false);
    setGameStarted(true);
    generateQuestion();
  };

  useEffect(() => {
    if (gameStarted && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0) {
      setGameOver(true);
    }
  }, [timeLeft, gameStarted]);

  const checkAnswer = (ans: number) => {
    if (ans === correct) {
      setScore(score + 10 + streak * 2);
      setStreak(streak + 1);
    } else {
      setStreak(0);
    }
    generateQuestion();
  };

  if (!gameStarted) {
    return (
      <div className="text-center">
        <div className="text-6xl mb-4">🧮</div>
        <h2 className="text-2xl font-bold text-[#eef4f8] mb-2">Number Sprint</h2>
        <p className="text-[#9fb2c3] mb-6">Solve as many math problems as you can in 60 seconds!</p>
        <button
          onClick={startGame}
          className="px-8 py-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white rounded-xl font-bold text-lg hover:opacity-90 transition"
          data-testid="button-start-sprint"
        >
          Start Game
        </button>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="text-center">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#eef4f8] mb-2">Time's Up!</h2>
        <p className="text-4xl font-bold text-[#26A69A] mb-6">{score} points</p>
        <button
          onClick={startGame}
          className="px-6 py-3 bg-teal-600 text-white rounded-xl font-medium hover:bg-teal-500 transition flex items-center gap-2 mx-auto"
          data-testid="button-restart-sprint"
        >
          <RotateCcw className="w-5 h-5" />
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-medium text-[#9fb2c3]">
          ⏱️ {timeLeft}s
        </div>
        <div className="text-lg font-medium text-[#26A69A]">
          Score: {score}
        </div>
        {streak > 1 && (
          <div className="text-lg font-medium text-yellow-400">
            🔥 {streak}x
          </div>
        )}
      </div>

      <div className="text-5xl font-bold text-[#eef4f8] mb-8">
        {num1} {operator} {num2} = ?
      </div>

      <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => checkAnswer(opt)}
            className="p-4 bg-[#1e2b3f] text-white text-2xl font-bold rounded-xl hover:bg-[#26A69A] transition"
            data-testid={`button-answer-${idx}`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}

// =============================
// EQUATION SNAP - Match Equations
// =============================
function EquationSnap() {
  const [equation, setEquation] = useState("");
  const [answer, setAnswer] = useState(0);
  const [displayedAnswer, setDisplayedAnswer] = useState(0);
  const [isMatch, setIsMatch] = useState(false);
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const generateQuestion = () => {
    const a = Math.floor(Math.random() * 20) + 5;
    const b = Math.floor(Math.random() * 20) + 5;
    const ops = ["+", "-", "×"];
    const op = ops[Math.floor(Math.random() * ops.length)];
    
    let correctAnswer;
    if (op === "+") correctAnswer = a + b;
    else if (op === "-") correctAnswer = a - b;
    else correctAnswer = a * b;

    setEquation(`${a} ${op} ${b}`);
    setAnswer(correctAnswer);

    // 50% chance of showing correct answer
    const showCorrect = Math.random() > 0.5;
    setIsMatch(showCorrect);
    
    if (showCorrect) {
      setDisplayedAnswer(correctAnswer);
    } else {
      const offset = Math.floor(Math.random() * 10) + 1;
      setDisplayedAnswer(correctAnswer + (Math.random() > 0.5 ? offset : -offset));
    }
    
    setFeedback(null);
  };

  const startGame = () => {
    setScore(0);
    setLives(3);
    setGameOver(false);
    setGameStarted(true);
    generateQuestion();
  };

  const handleSnap = (userSaysMatch: boolean) => {
    if (userSaysMatch === isMatch) {
      setScore(score + 10);
      setFeedback("correct");
    } else {
      setLives(lives - 1);
      setFeedback("wrong");
      if (lives <= 1) {
        setGameOver(true);
        return;
      }
    }
    setTimeout(() => generateQuestion(), 500);
  };

  if (!gameStarted) {
    return (
      <div className="text-center">
        <div className="text-6xl mb-4">⚡</div>
        <h2 className="text-2xl font-bold text-[#eef4f8] mb-2">Equation Snap</h2>
        <p className="text-[#9fb2c3] mb-6">Is the equation correct? Snap if it matches, Skip if it doesn't!</p>
        <button
          onClick={startGame}
          className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-bold text-lg hover:opacity-90 transition"
          data-testid="button-start-snap"
        >
          Start Game
        </button>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="text-center">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#eef4f8] mb-2">Game Over!</h2>
        <p className="text-4xl font-bold text-[#26A69A] mb-6">{score} points</p>
        <button
          onClick={startGame}
          className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-medium hover:bg-indigo-500 transition flex items-center gap-2 mx-auto"
          data-testid="button-restart-snap"
        >
          <RotateCcw className="w-5 h-5" />
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-medium text-red-400">
          {"❤️".repeat(lives)}
        </div>
        <div className="text-lg font-medium text-[#26A69A]">
          Score: {score}
        </div>
      </div>

      <div className={`text-4xl font-bold mb-2 transition ${feedback === "correct" ? "text-green-400" : feedback === "wrong" ? "text-red-400" : "text-[#eef4f8]"}`}>
        {equation} = {displayedAnswer}
      </div>
      
      <p className="text-[#9fb2c3] mb-8">Is this equation correct?</p>

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => handleSnap(true)}
          className="px-8 py-4 bg-green-600 text-white text-xl font-bold rounded-xl hover:bg-green-500 transition"
          data-testid="button-snap"
        >
          ✓ SNAP!
        </button>
        <button
          onClick={() => handleSnap(false)}
          className="px-8 py-4 bg-red-600 text-white text-xl font-bold rounded-xl hover:bg-red-500 transition"
          data-testid="button-skip"
        >
          ✗ SKIP
        </button>
      </div>
    </div>
  );
}

// =============================
// DIRECTION DASH - Follow Directions
// =============================
function DirectionDash() {
  const directions = ["North", "South", "East", "West"];
  const [question, setQuestion] = useState("");
  const [correct, setCorrect] = useState("");
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [gameOver, setGameOver] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const opposites: { [key: string]: string } = {
    North: "South",
    South: "North",
    East: "West",
    West: "East",
  };

  const generateQuestion = () => {
    const templates = [
      () => {
        const dir = directions[Math.floor(Math.random() * 4)];
        return { story: `You're facing ${dir}. Which way is behind you?`, answer: opposites[dir] };
      },
      () => {
        const dir = directions[Math.floor(Math.random() * 4)];
        return { story: `The sun rises in the East. You're facing ${dir}. Turn right. Which way are you facing?`, answer: turnRight(dir) };
      },
      () => {
        const dir = directions[Math.floor(Math.random() * 4)];
        return { story: `You're walking ${dir}. Turn around and walk. Which direction are you going?`, answer: opposites[dir] };
      },
      () => {
        const dir = directions[Math.floor(Math.random() * 4)];
        return { story: `Face ${dir}, then turn left twice. Which way are you facing?`, answer: opposites[dir] };
      },
    ];

    const template = templates[Math.floor(Math.random() * templates.length)];
    const { story, answer } = template();
    setQuestion(story);
    setCorrect(answer);
    setFeedback(null);
  };

  const turnRight = (dir: string): string => {
    const order = ["North", "East", "South", "West"];
    const idx = order.indexOf(dir);
    return order[(idx + 1) % 4];
  };

  const startGame = () => {
    setScore(0);
    setLives(3);
    setGameOver(false);
    setGameStarted(true);
    generateQuestion();
  };

  const checkChoice = (ans: string) => {
    if (ans === correct) {
      setScore(score + 10);
      setFeedback("correct");
    } else {
      setLives(lives - 1);
      setFeedback("wrong");
      if (lives <= 1) {
        setGameOver(true);
        return;
      }
    }
    setTimeout(() => generateQuestion(), 500);
  };

  if (!gameStarted) {
    return (
      <div className="text-center">
        <div className="text-6xl mb-4">🧭</div>
        <h2 className="text-2xl font-bold text-[#eef4f8] mb-2">Direction Dash</h2>
        <p className="text-[#9fb2c3] mb-6">Follow the directions and choose the correct answer!</p>
        <button
          onClick={startGame}
          className="px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl font-bold text-lg hover:opacity-90 transition"
          data-testid="button-start-direction"
        >
          Start Game
        </button>
      </div>
    );
  }

  if (gameOver) {
    return (
      <div className="text-center">
        <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-[#eef4f8] mb-2">Game Over!</h2>
        <p className="text-4xl font-bold text-[#26A69A] mb-6">{score} points</p>
        <button
          onClick={startGame}
          className="px-6 py-3 bg-purple-600 text-white rounded-xl font-medium hover:bg-purple-500 transition flex items-center gap-2 mx-auto"
          data-testid="button-restart-direction"
        >
          <RotateCcw className="w-5 h-5" />
          Play Again
        </button>
      </div>
    );
  }

  return (
    <div className="text-center">
      <div className="flex justify-between items-center mb-6">
        <div className="text-lg font-medium text-red-400">
          {"❤️".repeat(lives)}
        </div>
        <div className="text-lg font-medium text-[#26A69A]">
          Score: {score}
        </div>
      </div>

      <p className={`text-xl mb-8 transition ${feedback === "correct" ? "text-green-400" : feedback === "wrong" ? "text-red-400" : "text-[#eef4f8]"}`}>
        {question}
      </p>

      <div className="grid grid-cols-2 gap-4 max-w-xs mx-auto">
        {directions.map((d) => (
          <button
            key={d}
            onClick={() => checkChoice(d)}
            className="p-4 bg-purple-600 text-white text-lg font-bold rounded-xl hover:bg-purple-500 transition"
            data-testid={`button-dir-${d.toLowerCase()}`}
          >
            {d}
          </button>
        ))}
      </div>
    </div>
  );
}

// =============================
// GAMES HUB - Main Menu
// =============================
export default function GamesHub() {
  const [game, setGame] = useState<string | null>(null);

  const games = [
    {
      id: "sprint",
      title: "Number Sprint",
      description: "Race against time solving math problems",
      icon: Calculator,
      color: "from-teal-500 to-emerald-500",
      bgColor: "bg-teal-700",
    },
    {
      id: "snap",
      title: "Equation Snap",
      description: "Match equations with their answers",
      icon: Zap,
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-700",
    },
    {
      id: "direction",
      title: "Direction Dash",
      description: "Test your directional thinking",
      icon: Compass,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-700",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0b1420] via-[#0f1530] to-[#0b1420]">
      {/* Header */}
      <div className="border-b border-slate-800 bg-[#101a28]/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link href="/planb">
              <button className="flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition" data-testid="button-back-planb">
                <ArrowLeft className="w-5 h-5" />
                <span className="text-sm font-medium hidden sm:inline">Back</span>
              </button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#26A69A] to-[#14B8A6] bg-clip-text text-transparent" data-testid="text-games-title">
                Math & Logic Games
              </h1>
              <p className="text-sm text-[#9fb2c3]">Sharpen your mind with fun challenges</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-2xl mx-auto px-4 py-12">
        {!game && (
          <>
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-[#eef4f8] mb-2">Choose Your Game</h2>
              <p className="text-[#9fb2c3]">Pick a game and start playing!</p>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {games.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGame(g.id)}
                  className={`p-6 ${g.bgColor} rounded-2xl text-left hover:opacity-90 transition flex items-center gap-4`}
                  data-testid={`button-game-${g.id}`}
                >
                  <div className={`p-3 rounded-xl bg-white/10`}>
                    <g.icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{g.title}</h3>
                    <p className="text-white/80 text-sm">{g.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}

        {game && (
          <div className="bg-[#101a28] border border-slate-800 rounded-2xl p-6">
            {game === "sprint" && <NumberSprint />}
            {game === "snap" && <EquationSnap />}
            {game === "direction" && <DirectionDash />}

            <button
              onClick={() => setGame(null)}
              className="mt-8 w-full p-3 bg-slate-700 text-white rounded-xl hover:bg-slate-600 transition"
              data-testid="button-back-menu"
            >
              Back to Menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
