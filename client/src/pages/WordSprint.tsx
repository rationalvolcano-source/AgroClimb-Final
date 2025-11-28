import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ArrowLeft, Lightbulb, RotateCcw, Trophy, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Nav from "@/components/Nav";

interface CrosswordClue {
  number: number;
  clue: string;
  answer: string;
  hint: string;
  row: number;
  col: number;
  direction: "across" | "down";
}

interface CrosswordPuzzle {
  id: string;
  date: string;
  theme: string;
  grid: string[][];
  clues: CrosswordClue[];
}

const PUZZLES: CrosswordPuzzle[] = [
  {
    id: "day1",
    date: "2025-01-01",
    theme: "Agricultural Terms",
    grid: [
      ["C", "R", "O", "P", "#"],
      ["#", "#", "#", "L", "#"],
      ["A", "R", "E", "A", "#"],
      ["#", "#", "#", "N", "#"],
      ["D", "I", "R", "T", "#"],
    ],
    clues: [
      { number: 1, clue: "Plants grown for food or profit", answer: "CROP", hint: "Think wheat, rice, or corn", row: 0, col: 0, direction: "across" },
      { number: 2, clue: "Region or zone of land", answer: "AREA", hint: "Farm ___ or cultivation ___", row: 2, col: 0, direction: "across" },
      { number: 3, clue: "Earth or soil matter", answer: "DIRT", hint: "Found on the ground", row: 4, col: 0, direction: "across" },
      { number: 4, clue: "Vegetation or flora", answer: "PLANT", hint: "It grows from a seed", row: 0, col: 3, direction: "down" },
    ],
  },
  {
    id: "day2",
    date: "2025-01-02",
    theme: "Banking Terms",
    grid: [
      ["L", "O", "A", "N", "#"],
      ["#", "#", "#", "#", "#"],
      ["R", "A", "T", "E", "#"],
      ["#", "#", "#", "#", "#"],
      ["B", "A", "N", "K", "#"],
    ],
    clues: [
      { number: 1, clue: "Money borrowed from a bank", answer: "LOAN", hint: "Home ___ or car ___", row: 0, col: 0, direction: "across" },
      { number: 2, clue: "Interest percentage", answer: "RATE", hint: "Fixed or floating", row: 2, col: 0, direction: "across" },
      { number: 3, clue: "Financial institution", answer: "BANK", hint: "Where you deposit money", row: 4, col: 0, direction: "across" },
    ],
  },
  {
    id: "day3",
    date: "2025-01-03",
    theme: "Research Terms",
    grid: [
      ["D", "A", "T", "A", "#"],
      ["#", "#", "#", "#", "#"],
      ["T", "E", "S", "T", "#"],
      ["#", "#", "#", "#", "#"],
      ["N", "O", "T", "E", "#"],
    ],
    clues: [
      { number: 1, clue: "Information collected for research", answer: "DATA", hint: "Numbers and facts", row: 0, col: 0, direction: "across" },
      { number: 2, clue: "Examination or assessment", answer: "TEST", hint: "Hypothesis ___", row: 2, col: 0, direction: "across" },
      { number: 3, clue: "Written observation", answer: "NOTE", hint: "Take a ___", row: 4, col: 0, direction: "across" },
    ],
  },
];

function getTodaysPuzzle(): CrosswordPuzzle {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  return PUZZLES[dayOfYear % PUZZLES.length];
}

function getStorageKey(): string {
  const today = new Date().toISOString().split('T')[0];
  return `wordSprint_${today}`;
}

export default function WordSprint() {
  const puzzle = getTodaysPuzzle();
  const [userGrid, setUserGrid] = useState<string[][]>(() => {
    const saved = localStorage.getItem(getStorageKey());
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return puzzle.grid.map(row => row.map(cell => cell === "#" ? "#" : ""));
      }
    }
    return puzzle.grid.map(row => row.map(cell => cell === "#" ? "#" : ""));
  });
  
  const [selectedCell, setSelectedCell] = useState<{ row: number; col: number } | null>(null);
  const [selectedClue, setSelectedClue] = useState<CrosswordClue | null>(null);
  const [showHint, setShowHint] = useState<number | null>(null);
  const [hintsUsed, setHintsUsed] = useState<Set<number>>(() => {
    const saved = localStorage.getItem(`${getStorageKey()}_hints`);
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });
  const [completed, setCompleted] = useState(false);

  useEffect(() => {
    localStorage.setItem(getStorageKey(), JSON.stringify(userGrid));
  }, [userGrid]);

  useEffect(() => {
    localStorage.setItem(`${getStorageKey()}_hints`, JSON.stringify(Array.from(hintsUsed)));
  }, [hintsUsed]);

  useEffect(() => {
    checkCompletion();
  }, [userGrid]);

  function checkCompletion() {
    let allCorrect = true;
    for (let r = 0; r < puzzle.grid.length; r++) {
      for (let c = 0; c < puzzle.grid[r].length; c++) {
        if (puzzle.grid[r][c] !== "#" && userGrid[r][c] !== puzzle.grid[r][c]) {
          allCorrect = false;
          break;
        }
      }
      if (!allCorrect) break;
    }
    setCompleted(allCorrect);
  }

  function handleCellClick(row: number, col: number) {
    if (puzzle.grid[row][col] === "#") return;
    setSelectedCell({ row, col });
    
    const clue = puzzle.clues.find(c => 
      (c.direction === "across" && c.row === row && col >= c.col && col < c.col + c.answer.length) ||
      (c.direction === "down" && c.col === col && row >= c.row && row < c.row + c.answer.length)
    );
    if (clue) setSelectedClue(clue);
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (!selectedCell) return;
    
    const { row, col } = selectedCell;
    
    if (e.key.match(/^[a-zA-Z]$/)) {
      const newGrid = [...userGrid.map(r => [...r])];
      newGrid[row][col] = e.key.toUpperCase();
      setUserGrid(newGrid);
      
      if (selectedClue) {
        if (selectedClue.direction === "across" && col < selectedClue.col + selectedClue.answer.length - 1) {
          setSelectedCell({ row, col: col + 1 });
        } else if (selectedClue.direction === "down" && row < selectedClue.row + selectedClue.answer.length - 1) {
          setSelectedCell({ row: row + 1, col });
        }
      }
    } else if (e.key === "Backspace") {
      const newGrid = [...userGrid.map(r => [...r])];
      newGrid[row][col] = "";
      setUserGrid(newGrid);
      
      if (selectedClue) {
        if (selectedClue.direction === "across" && col > selectedClue.col) {
          setSelectedCell({ row, col: col - 1 });
        } else if (selectedClue.direction === "down" && row > selectedClue.row) {
          setSelectedCell({ row: row - 1, col });
        }
      }
    } else if (e.key === "ArrowRight" && col < puzzle.grid[0].length - 1) {
      let nextCol = col + 1;
      while (nextCol < puzzle.grid[0].length && puzzle.grid[row][nextCol] === "#") nextCol++;
      if (nextCol < puzzle.grid[0].length) setSelectedCell({ row, col: nextCol });
    } else if (e.key === "ArrowLeft" && col > 0) {
      let nextCol = col - 1;
      while (nextCol >= 0 && puzzle.grid[row][nextCol] === "#") nextCol--;
      if (nextCol >= 0) setSelectedCell({ row, col: nextCol });
    } else if (e.key === "ArrowDown" && row < puzzle.grid.length - 1) {
      let nextRow = row + 1;
      while (nextRow < puzzle.grid.length && puzzle.grid[nextRow][col] === "#") nextRow++;
      if (nextRow < puzzle.grid.length) setSelectedCell({ row: nextRow, col });
    } else if (e.key === "ArrowUp" && row > 0) {
      let nextRow = row - 1;
      while (nextRow >= 0 && puzzle.grid[nextRow][col] === "#") nextRow--;
      if (nextRow >= 0) setSelectedCell({ row: nextRow, col });
    }
  }

  function useHint(clueNumber: number) {
    setShowHint(clueNumber);
    setHintsUsed(prev => new Set(Array.from(prev).concat([clueNumber])));
  }

  function resetPuzzle() {
    setUserGrid(puzzle.grid.map(row => row.map(cell => cell === "#" ? "#" : "")));
    setHintsUsed(new Set());
    setShowHint(null);
    setCompleted(false);
  }

  const acrossClues = puzzle.clues.filter(c => c.direction === "across");
  const downClues = puzzle.clues.filter(c => c.direction === "down");

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Nav />
      
      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link href="/games" data-testid="button-back">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold" data-testid="text-title">Word Sprint</h1>
            <p className="text-slate-400 text-sm flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Daily Crossword - {puzzle.theme}
            </p>
          </div>
          <Button variant="outline" size="sm" onClick={resetPuzzle} data-testid="button-reset">
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        </div>

        {completed && (
          <Card className="bg-emerald-500/20 border-emerald-500/40 p-4 mb-6">
            <div className="flex items-center gap-3">
              <Trophy className="h-8 w-8 text-emerald-400" />
              <div>
                <p className="font-semibold text-emerald-300" data-testid="text-completed">Puzzle Complete!</p>
                <p className="text-sm text-slate-300">
                  Great job! Hints used: {hintsUsed.size}. Come back tomorrow for a new puzzle.
                </p>
              </div>
            </div>
          </Card>
        )}

        <div className="grid lg:grid-cols-[1fr_320px] gap-6">
          <Card 
            className="bg-slate-900/60 border-slate-800 p-4 sm:p-6"
            tabIndex={0}
            onKeyDown={handleKeyDown}
            data-testid="card-grid"
          >
            <div className="overflow-x-auto">
              <div 
                className="grid gap-0.5 mx-auto w-fit"
                style={{ gridTemplateColumns: `repeat(${puzzle.grid[0].length}, minmax(32px, 40px))` }}
              >
                {puzzle.grid.map((row, rowIndex) =>
                  row.map((cell, colIndex) => {
                    const isBlocked = cell === "#";
                    const isSelected = selectedCell?.row === rowIndex && selectedCell?.col === colIndex;
                    const isInSelectedWord = selectedClue && (
                      (selectedClue.direction === "across" && 
                        rowIndex === selectedClue.row && 
                        colIndex >= selectedClue.col && 
                        colIndex < selectedClue.col + selectedClue.answer.length) ||
                      (selectedClue.direction === "down" && 
                        colIndex === selectedClue.col && 
                        rowIndex >= selectedClue.row && 
                        rowIndex < selectedClue.row + selectedClue.answer.length)
                    );
                    
                    const clueNumber = puzzle.clues.find(c => c.row === rowIndex && c.col === colIndex)?.number;
                    const userLetter = userGrid[rowIndex]?.[colIndex] || "";
                    const isCorrect = userLetter === cell;

                    return (
                      <button
                        key={`${rowIndex}-${colIndex}`}
                        onClick={() => handleCellClick(rowIndex, colIndex)}
                        disabled={isBlocked}
                        className={`
                          aspect-square min-w-[32px] min-h-[32px] relative text-lg font-bold
                          ${isBlocked 
                            ? "bg-slate-950" 
                            : isSelected 
                              ? "bg-amber-500/40 border-amber-400" 
                              : isInSelectedWord 
                                ? "bg-amber-500/20 border-amber-400/50"
                                : "bg-slate-800 border-slate-700 hover:bg-slate-700"
                          }
                          ${!isBlocked && "border"}
                          transition-colors
                        `}
                        data-testid={`cell-${rowIndex}-${colIndex}`}
                      >
                        {clueNumber && (
                          <span className="absolute top-0.5 left-1 text-[10px] text-slate-400 font-normal">
                            {clueNumber}
                          </span>
                        )}
                        <span className={userLetter && isCorrect && completed ? "text-emerald-400" : ""}>
                          {userLetter}
                        </span>
                      </button>
                    );
                  })
                )}
              </div>
            </div>
            <p className="text-xs text-slate-500 text-center mt-4">
              Click a cell and type to fill. Use arrow keys to navigate.
            </p>
          </Card>

          <div className="space-y-4">
            <Card className="bg-slate-900/60 border-slate-800 p-4">
              <h3 className="font-semibold mb-3 text-amber-400">Across</h3>
              <div className="space-y-2">
                {acrossClues.map((clue) => (
                  <div key={`across-${clue.number}`}>
                    <button
                      onClick={() => {
                        setSelectedCell({ row: clue.row, col: clue.col });
                        setSelectedClue(clue);
                      }}
                      className={`text-left text-sm w-full p-2 rounded hover:bg-slate-800 transition-colors ${
                        selectedClue?.number === clue.number && selectedClue?.direction === "across"
                          ? "bg-amber-500/20"
                          : ""
                      }`}
                      data-testid={`clue-across-${clue.number}`}
                    >
                      <span className="font-medium text-slate-300">{clue.number}.</span>{" "}
                      <span className="text-slate-400">{clue.clue}</span>
                    </button>
                    {showHint === clue.number && (
                      <p className="text-xs text-amber-400 ml-6 mt-1">Hint: {clue.hint}</p>
                    )}
                    {!hintsUsed.has(clue.number) && (
                      <button
                        onClick={() => useHint(clue.number)}
                        className="text-xs text-slate-500 hover:text-amber-400 ml-6 flex items-center gap-1"
                        data-testid={`hint-across-${clue.number}`}
                      >
                        <Lightbulb className="h-3 w-3" /> Show hint
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            <Card className="bg-slate-900/60 border-slate-800 p-4">
              <h3 className="font-semibold mb-3 text-cyan-400">Down</h3>
              <div className="space-y-2">
                {downClues.map((clue) => (
                  <div key={`down-${clue.number}`}>
                    <button
                      onClick={() => {
                        setSelectedCell({ row: clue.row, col: clue.col });
                        setSelectedClue(clue);
                      }}
                      className={`text-left text-sm w-full p-2 rounded hover:bg-slate-800 transition-colors ${
                        selectedClue?.number === clue.number && selectedClue?.direction === "down"
                          ? "bg-cyan-500/20"
                          : ""
                      }`}
                      data-testid={`clue-down-${clue.number}`}
                    >
                      <span className="font-medium text-slate-300">{clue.number}.</span>{" "}
                      <span className="text-slate-400">{clue.clue}</span>
                    </button>
                    {showHint === clue.number && (
                      <p className="text-xs text-cyan-400 ml-6 mt-1">Hint: {clue.hint}</p>
                    )}
                    {!hintsUsed.has(clue.number) && (
                      <button
                        onClick={() => useHint(clue.number)}
                        className="text-xs text-slate-500 hover:text-cyan-400 ml-6 flex items-center gap-1"
                        data-testid={`hint-down-${clue.number}`}
                      >
                        <Lightbulb className="h-3 w-3" /> Show hint
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
