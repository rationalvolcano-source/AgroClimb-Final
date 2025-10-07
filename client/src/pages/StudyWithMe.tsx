import { useEffect, useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, RotateCcw, Volume2, VolumeX, Download, Home } from "lucide-react";

// ---------- Utilities ----------
const pad = (n: number) => (n < 10 ? `0${n}` : `${n}`);
const fmtTime = (seconds: number) => {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${pad(m)}:${pad(s)}`;
};

const todayKey = (d = new Date()) => d.toISOString().slice(0, 10);
const loadSessions = () => {
  try { return JSON.parse(localStorage.getItem("agrivision_swm_sessions") || "[]"); } catch { return []; }
};
const saveSessions = (arr: any[]) => localStorage.setItem("agrivision_swm_sessions", JSON.stringify(arr));

// ---------- Goal Tracking ----------
// Goals are stored with each session

// ---------- Audio Engine (Binaural Beats) ----------
function useBinaural({ carrier = 220, beat = 6, volume = 0.15 }) {
  const ctxRef = useRef<AudioContext | null>(null);
  const nodesRef = useRef<any>(null);
  const [isOn, setIsOn] = useState(false);

  const start = () => {
    if (isOn) return;
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    ctxRef.current = ctx;

    const merger = ctx.createChannelMerger(2);
    const gain = ctx.createGain();
    gain.gain.value = volume;

    const oscL = ctx.createOscillator();
    const oscR = ctx.createOscillator();
    oscL.type = "sine"; oscR.type = "sine";
    oscL.frequency.value = carrier - beat / 2;
    oscR.frequency.value = carrier + beat / 2;

    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass"; filter.frequency.value = 1200;

    const noiseBuf = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const data = noiseBuf.getChannelData(0);
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < data.length; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
      data[i] *= 0.05;
      b6 = white * 0.115926;
    }
    const noise = ctx.createBufferSource();
    noise.buffer = noiseBuf; noise.loop = true;
    const noiseGain = ctx.createGain(); noiseGain.gain.value = 0.05;

    oscL.connect(merger, 0, 0);
    oscR.connect(merger, 0, 1);
    merger.connect(filter);
    noise.connect(noiseGain).connect(filter);
    filter.connect(gain).connect(ctx.destination);

    oscL.start(); oscR.start(); noise.start();

    nodesRef.current = { oscL, oscR, noise, gain };
    setIsOn(true);
  };

  const stop = () => {
    const ctx = ctxRef.current; const nodes = nodesRef.current;
    if (!ctx || !nodes) return;
    const t = ctx.currentTime;
    nodes.gain.gain.linearRampToValueAtTime(0.0001, t + 0.8);
    setTimeout(() => { ctx.close(); ctxRef.current = null; nodesRef.current = null; setIsOn(false); }, 820);
  };

  const setVolume = (v: number) => {
    const nodes = nodesRef.current; if (nodes) nodes.gain.gain.value = v;
  };

  const retune = (carrierNew: number, beatNew: number) => {
    const nodes = nodesRef.current; if (!nodes) return;
    nodes.oscL.frequency.value = carrierNew - beatNew / 2;
    nodes.oscR.frequency.value = carrierNew + beatNew / 2;
  };

  return { isOn, start, stop, setVolume, retune };
}

// ---------- Stats helpers ----------
function computeStats(sessions: any[]) {
  const now = new Date();
  const last14 = Array.from({ length: 14 }, (_, i) => {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - (13 - i));
    const key = todayKey(d);
    const total = sessions.filter(s => s.date === key).reduce((a, b) => a + b.duration, 0);
    return { key, minutes: Math.round(total / 60) };
  });

  const thisWeekStart = new Date(now);
  const day = thisWeekStart.getDay();
  const diffToMon = (day + 6) % 7;
  thisWeekStart.setDate(now.getDate() - diffToMon);
  const weekMinutes = sessions
    .filter(s => new Date(s.date) >= thisWeekStart)
    .reduce((a, b) => a + Math.round(b.duration / 60), 0);

  let streak = 0; let offset = 0;
  while (true) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - offset);
    const key = todayKey(d);
    const any = sessions.some(s => s.date === key);
    if (any) { streak++; offset++; } else { break; }
  }

  const totalMinutes = Math.round(sessions.reduce((a, b) => a + b.duration, 0) / 60);
  const avg = sessions.length ? Math.round(totalMinutes / sessions.length) : 0;

  return { last14, weekMinutes, streak, totalMinutes, avg };
}

// ---------- Bar Chart ----------
function MiniBarChart({ data }: { data: any[] }) {
  const max = Math.max(30, ...data.map(d => d.minutes));
  const h = 120; const w = 14 * 18 + 20;
  return (
    <svg width={w} height={h} role="img" aria-label="Study minutes last 14 days">
      {data.map((d, i) => {
        const barH = (d.minutes / max) * (h - 30);
        const x = 10 + i * 18; const y = h - 20 - barH;
        return (
          <g key={d.key}>
            <rect x={x} y={y} width={12} height={barH} rx={3} fill="#10b981" opacity={0.9} />
          </g>
        );
      })}
      <text x={10} y={h - 6} fill="#94a3b8" fontSize="10">Last 14 days</text>
    </svg>
  );
}

// ---------- Main Component ----------
export default function StudyWithMe() {
  const [minutes, setMinutes] = useState(30);
  const [secondsLeft, setSecondsLeft] = useState(minutes * 60);
  const [running, setRunning] = useState(false);

  const [carrier, setCarrier] = useState(220);
  const [beat, setBeat] = useState(6);
  const [volume, setVolume] = useState(0.12);
  const audio = useBinaural({ carrier, beat, volume });

  const [sessions, setSessions] = useState(() => loadSessions());
  const stats = useMemo(() => computeStats(sessions), [sessions]);

  const [targetGoal, setTargetGoal] = useState("");
  const [actualAchievement, setActualAchievement] = useState("");
  const [showAchievementInput, setShowAchievementInput] = useState(false);

  useEffect(() => { setSecondsLeft(minutes * 60); }, [minutes]);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => {
      setSecondsLeft((s) => {
        if (s <= 1) { clearInterval(id); handleFinish(); return 0; }
        return s - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [running]);

  function handleStart() {
    setRunning(true);
    if (!audio.isOn) audio.start();
    setShowAchievementInput(false);
  }
  function handlePause() { setRunning(false); }
  function handleReset() { 
    setRunning(false); 
    setSecondsLeft(minutes * 60);
    setShowAchievementInput(false);
    setActualAchievement("");
  }

  function handleFinish() {
    setRunning(false);
    if (audio.isOn) audio.stop();
    setShowAchievementInput(true);
  }

  function saveSession() {
    const dur = minutes * 60 - secondsLeft;
    const entry = { 
      date: todayKey(), 
      duration: dur, 
      carrier, 
      beat,
      targetGoal: targetGoal || "No goal set",
      actualAchievement: actualAchievement || "Not recorded"
    };
    const next = [...sessions, entry];
    setSessions(next); 
    saveSessions(next);
    setShowAchievementInput(false);
    setTargetGoal("");
    setActualAchievement("");
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify(sessions, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url; a.download = `agrivision_swm_sessions_${todayKey()}.json`; a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-slate-950 py-20 px-4">
      <div className="mx-auto max-w-7xl space-y-6">
        <Card className="bg-slate-900/60 border-slate-800" data-testid="card-header">
          <CardHeader>
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <CardTitle className="text-3xl font-bold" data-testid="title-swm">Study With Me — Focus Mode</CardTitle>
                <p className="text-slate-400 mt-2" data-testid="text-subtitle">
                  Play ambient binaural beats, set a timer, and let your momentum build. After you start, you can dim your screen or turn it face-down to reduce exposure. Your progress is logged privately on this device.
                </p>
              </div>
              <a href="/" data-testid="link-home">
                <Button variant="ghost" size="icon" className="shrink-0">
                  <Home className="h-5 w-5" />
                </Button>
              </a>
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 flex-wrap">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 min-w-[120px]" data-testid="kpi-week">
                <div className="text-xs text-slate-400">This Week</div>
                <div className="text-2xl font-bold text-emerald-400">{stats.weekMinutes} min</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 min-w-[120px]" data-testid="kpi-streak">
                <div className="text-xs text-slate-400">Streak</div>
                <div className="text-2xl font-bold text-emerald-400">{stats.streak} day{stats.streak === 1 ? "" : "s"}</div>
              </div>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl px-4 py-3 min-w-[120px]" data-testid="kpi-avg">
                <div className="text-xs text-slate-400">Avg / Session</div>
                <div className="text-2xl font-bold text-emerald-400">{stats.avg} min</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-slate-900/60 border-slate-800" data-testid="card-timer">
            <CardHeader>
              <div className="flex justify-between items-start gap-4 flex-wrap">
                <div>
                  <Label className="text-slate-400">Timer</Label>
                  <div className="text-6xl font-bold tracking-tight mt-2" data-testid="text-timer">{fmtTime(secondsLeft)}</div>
                </div>
                <div className="space-y-1">
                  <Label className="text-xs text-slate-400">Session length (minutes)</Label>
                  <Input
                    type="number"
                    min={5}
                    max={180}
                    value={minutes}
                    onChange={(e) => setMinutes(parseInt(e.target.value || "0"))}
                    className="w-24 bg-slate-800 border-slate-700"
                    data-testid="input-minutes"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {!running && (
                  <Button onClick={handleStart} className="bg-emerald-500 hover:bg-emerald-400" data-testid="button-start">
                    <Play className="h-4 w-4 mr-2" /> Start Focus
                  </Button>
                )}
                {running && (
                  <Button onClick={handlePause} variant="secondary" data-testid="button-pause">
                    <Pause className="h-4 w-4 mr-2" /> Pause
                  </Button>
                )}
                <Button onClick={handleReset} variant="secondary" data-testid="button-reset">
                  <RotateCcw className="h-4 w-4 mr-2" /> Reset
                </Button>
                {audio.isOn ? (
                  <Button onClick={audio.stop} variant="secondary" data-testid="button-audio-stop">
                    <VolumeX className="h-4 w-4 mr-2" /> Stop Audio
                  </Button>
                ) : (
                  <Button onClick={audio.start} className="bg-emerald-500 hover:bg-emerald-400" data-testid="button-audio-start">
                    <Volume2 className="h-4 w-4 mr-2" /> Play Ambient
                  </Button>
                )}
              </div>

              <div className="space-y-3">
                <div className="space-y-1">
                  <Label className="text-xs text-slate-400">Mode</Label>
                  <Select value={beat.toString()} onValueChange={(v) => { const val = parseFloat(v); setBeat(val); audio.retune(carrier, val); }}>
                    <SelectTrigger className="bg-slate-800 border-slate-700" data-testid="select-mode">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="4">Deep Calm (4Hz)</SelectItem>
                      <SelectItem value="6">Focus/Clarity (6Hz)</SelectItem>
                      <SelectItem value="8">Memory (8Hz)</SelectItem>
                      <SelectItem value="10">Alert Memory (10Hz)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs text-slate-400">Carrier Frequency</Label>
                  <Select value={carrier.toString()} onValueChange={(v) => { const val = parseInt(v); setCarrier(val); audio.retune(val, beat); }}>
                    <SelectTrigger className="bg-slate-800 border-slate-700" data-testid="select-carrier">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="180">Warm (180Hz)</SelectItem>
                      <SelectItem value="220">Neutral (220Hz)</SelectItem>
                      <SelectItem value="260">Bright (260Hz)</SelectItem>
                      <SelectItem value="320">Airy (320Hz)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-1">
                  <Label className="text-xs text-slate-400">Volume</Label>
                  <Slider
                    value={[volume]}
                    onValueChange={([v]) => { setVolume(v); audio.setVolume(v); }}
                    max={0.35}
                    step={0.01}
                    className="py-2"
                    data-testid="slider-volume"
                  />
                </div>
              </div>

              <p className="text-xs text-slate-500" data-testid="text-tip">
                Tip: Start audio + timer, then dim your screen or place the phone face-down to avoid over-exposure.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 border-slate-800" data-testid="card-goals">
            <CardHeader>
              <Label className="text-slate-400">Goal Tracking</Label>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs text-slate-400">Target Goal</Label>
                <Input
                  placeholder="e.g., Complete Chapter 5, Solve 10 problems"
                  value={targetGoal}
                  onChange={(e) => setTargetGoal(e.target.value)}
                  className="bg-slate-800 border-slate-700"
                  data-testid="input-target-goal"
                />
                <p className="text-xs text-slate-500">What do you plan to accomplish this session?</p>
              </div>

              {showAchievementInput && (
                <div className="space-y-2 pt-4 border-t border-slate-700">
                  <Label className="text-xs text-emerald-400">Session Complete! Record Your Achievement</Label>
                  <Input
                    placeholder="What did you actually accomplish?"
                    value={actualAchievement}
                    onChange={(e) => setActualAchievement(e.target.value)}
                    className="bg-slate-800 border-slate-700"
                    data-testid="input-actual-achievement"
                  />
                  <Button 
                    onClick={saveSession} 
                    className="w-full bg-emerald-500 hover:bg-emerald-400"
                    data-testid="button-save-session"
                  >
                    Save Session
                  </Button>
                </div>
              )}

              {!showAchievementInput && targetGoal && (
                <div className="bg-slate-800/50 border border-slate-700 rounded-lg p-3">
                  <div className="text-xs text-slate-400 mb-1">Current Goal</div>
                  <div className="text-sm text-slate-200" data-testid="text-current-goal">{targetGoal}</div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-slate-900/60 border-slate-800" data-testid="card-stats">
            <CardHeader>
              <Label className="text-slate-400">Your Momentum</Label>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-3">
                <MiniBarChart data={stats.last14} />
              </div>
              <div className="flex gap-4 flex-wrap">
                <div>
                  <div className="text-xs text-slate-400">Total Minutes</div>
                  <div className="text-2xl font-bold" data-testid="text-total-minutes">{stats.totalMinutes}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400">Sessions</div>
                  <div className="text-2xl font-bold" data-testid="text-sessions">{sessions.length}</div>
                </div>
                <div>
                  <Button variant="secondary" size="sm" onClick={exportJSON} data-testid="button-export">
                    <Download className="h-4 w-4 mr-2" /> Export JSON
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-slate-900/60 border-slate-800" data-testid="card-history">
          <CardHeader>
            <Label className="text-slate-400">Session Log (recent)</Label>
            <p className="text-xs text-slate-500 mt-1">Stored locally on this device only.</p>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 gap-4 text-sm">
              <div className="text-slate-400 text-xs">Date</div>
              <div className="text-slate-400 text-xs">Duration</div>
              <div className="text-slate-400 text-xs">Mode</div>
              <div className="text-slate-400 text-xs">Carrier</div>
              <div className="text-slate-400 text-xs">Target Goal</div>
              <div className="text-slate-400 text-xs">Achievement</div>
              {sessions.slice(-10).reverse().map((s: any, i: number) => (
                <div key={`session-${i}`} className="contents">
                  <div data-testid={`history-date-${i}`}>{s.date}</div>
                  <div data-testid={`history-duration-${i}`}>{Math.round(s.duration / 60)} min</div>
                  <div data-testid={`history-beat-${i}`}>{s.beat} Hz</div>
                  <div data-testid={`history-carrier-${i}`}>{s.carrier} Hz</div>
                  <div data-testid={`history-goal-${i}`} className="text-slate-400">{s.targetGoal || "—"}</div>
                  <div data-testid={`history-achievement-${i}`} className="text-emerald-400">{s.actualAchievement || "—"}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
