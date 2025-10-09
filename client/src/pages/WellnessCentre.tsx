import { useState, useEffect, useRef, type ReactNode } from "react";
import Nav from "@/components/Nav";
import WCStreamHeader from "@/components/WCStreamHeader";

/* ---------- Helper Components ---------- */
const Card = ({ children }: { children: ReactNode }) => (
  <div className="rounded-3xl border border-slate-800 bg-slate-900/60 p-6 hover:border-slate-700 transition">
    {children}
  </div>
);

const H2 = ({ children }: { children: ReactNode }) => (
  <h2 className="text-2xl md:text-3xl font-extrabold">{children}</h2>
);

const Sub = ({ children }: { children: ReactNode }) => (
  <p className="text-slate-400 mt-1 text-sm">{children}</p>
);

/* ---------- Yoga Block with Start/End ---------- */
function YogaBlock({ title, emoji, slot, videoId }: { title: string; emoji: string; slot: string; videoId: string }) {
  const [playing, setPlaying] = useState(false);
  
  return (
    <Card>
      <div className="text-3xl" aria-hidden="true" data-testid={`emoji-${videoId}`}>{emoji}</div>
      <h3 className="text-lg font-semibold mt-2" data-testid={`title-${videoId}`}>{title}</h3>
      <Sub>{slot}</Sub>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition"
          onClick={() => setPlaying(true)}
          data-testid={`button-start-${videoId}`}
        >
          Start Session
        </button>
        <button
          type="button"
          className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
          onClick={() => setPlaying(false)}
          data-testid={`button-end-${videoId}`}
        >
          End Session
        </button>
      </div>

      {playing && (
        <div className="mt-4 aspect-video w-full rounded-xl overflow-hidden border border-slate-800 bg-black" data-testid={`video-container-${videoId}`}>
          <iframe
            title={title}
            className="w-full h-full"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            data-testid={`iframe-${videoId}`}
          />
        </div>
      )}
    </Card>
  );
}

/* ---------- 2-Minute Breathing Reset ---------- */
function BreathingReset() {
  const [on, setOn] = useState(false);
  const [phase, setPhase] = useState("Ready");
  const [sec, setSec] = useState(0);

  useEffect(() => {
    if (!on) return;
    
    let t = 0;
    setPhase("Inhale");
    setSec(4);
    
    const id = setInterval(() => {
      t++;
      const step = t % 16; // 4+4+4+4
      if (step === 0) { setPhase("Inhale"); setSec(4); }
      else if (step === 4) { setPhase("Hold"); setSec(4); }
      else if (step === 8) { setPhase("Exhale"); setSec(4); }
      else if (step === 12) { setPhase("Hold"); setSec(4); }
      else { setSec((s) => (s > 0 ? s - 1 : 4)); }
    }, 1000);
    
    return () => clearInterval(id);
  }, [on]);

  return (
    <Card>
      <div className="text-3xl" aria-hidden="true">💨</div>
      <h3 className="text-lg font-semibold mt-2" data-testid="title-breathing">2-Minute Breathing Reset</h3>
      <Sub>Box-breathing timer with soft pacing. Use between study blocks.</Sub>

      <div className="mt-3 flex gap-2">
        <button 
          type="button"
          className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition" 
          onClick={() => setOn(true)}
          data-testid="button-start-breathing"
        >
          Start
        </button>
        <button 
          type="button"
          className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition" 
          onClick={() => { setOn(false); setPhase("Ready"); setSec(0); }}
          data-testid="button-end-breathing"
        >
          End
        </button>
      </div>

      {on && (
        <div className="mt-4 grid place-items-center" data-testid="breathing-display">
          <div className="text-3xl font-semibold" data-testid="text-breathing-phase">{phase}</div>
          <div className="text-5xl font-extrabold mt-2" data-testid="text-breathing-sec">{sec}</div>
          <div className="mt-2 text-slate-400 text-xs">Cycle auto-repeats</div>
        </div>
      )}
    </Card>
  );
}

/* ---------- Focus Soundscape with Pomodoro + Tasks ---------- */
function FocusSoundscape() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [on, setOn] = useState(false);
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [task, setTask] = useState("");
  const [done, setDone] = useState<string[]>([]);

  useEffect(() => {
    if (!on || !running) return;
    
    const id = setInterval(() => {
      setSeconds((s) => {
        if (s <= 1) {
          setRunning(false);
          if (audioRef.current) audioRef.current.pause();
          return 0;
        }
        return s - 1;
      });
    }, 1000);
    
    return () => clearInterval(id);
  }, [on, running]);

  const fmt = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const ss = (s % 60).toString().padStart(2, "0");
    return `${m}:${ss}`;
  };

  const startFocus = () => {
    setOn(true);
    setRunning(true);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const endFocus = () => {
    setRunning(false);
    setOn(false);
    setSeconds(25 * 60);
    if (audioRef.current) audioRef.current.pause();
  };

  const addTask = () => {
    if (!task.trim()) return;
    setDone((d) => [...d, task.trim()]);
    setTask("");
  };

  return (
    <Card>
      <div className="text-3xl" aria-hidden="true">🎧</div>
      <h3 className="text-lg font-semibold mt-2" data-testid="title-focus">Focus Soundscape</h3>
      <Sub>Relaxing instrumental music while you focus — with optional task tracking.</Sub>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button 
          type="button"
          className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition" 
          onClick={startFocus}
          data-testid="button-start-focus"
        >
          Start Focus
        </button>
        <button 
          type="button"
          className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition" 
          onClick={endFocus}
          data-testid="button-end-focus"
        >
          End Focus
        </button>

        <div className="flex gap-2 ml-auto text-xs">
          <button 
            type="button"
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition" 
            onClick={() => setSeconds(15 * 60)}
            data-testid="button-15min"
          >
            15m
          </button>
          <button 
            type="button"
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition" 
            onClick={() => setSeconds(25 * 60)}
            data-testid="button-25min"
          >
            25m
          </button>
          <button 
            type="button"
            className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 transition" 
            onClick={() => setSeconds(45 * 60)}
            data-testid="button-45min"
          >
            45m
          </button>
        </div>
      </div>

      <audio ref={audioRef} loop preload="metadata">
        <source src="/focus.mp3" type="audio/mpeg" />
      </audio>

      {on && (
        <div className="mt-4 grid md:grid-cols-2 gap-4" data-testid="focus-active">
          <div className="rounded-xl border border-slate-800 p-4 text-center">
            <div className="text-5xl font-extrabold" data-testid="text-timer">{fmt(seconds)}</div>
            <div className="mt-3 flex justify-center gap-2">
              {!running ? (
                <button 
                  type="button"
                  className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition" 
                  onClick={() => setRunning(true)}
                  data-testid="button-resume"
                >
                  Resume
                </button>
              ) : (
                <button 
                  type="button"
                  className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition" 
                  onClick={() => setRunning(false)}
                  data-testid="button-pause"
                >
                  Pause
                </button>
              )}
              <button 
                type="button"
                className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition" 
                onClick={() => setSeconds(25 * 60)}
                data-testid="button-reset"
              >
                Reset
              </button>
            </div>
          </div>

          <div className="rounded-xl border border-slate-800 p-4">
            <div className="text-sm text-slate-400">Task (optional)</div>
            <div className="mt-1 flex gap-2">
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 outline-none text-slate-100"
                placeholder="What will you complete this session?"
                data-testid="input-task"
              />
              <button 
                type="button"
                className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition" 
                onClick={addTask}
                data-testid="button-add-task"
              >
                Add
              </button>
            </div>
            {!!done.length && (
              <ul className="mt-3 text-sm list-disc pl-5 space-y-1" data-testid="list-tasks">
                {done.map((t, i) => (
                  <li key={i} className="text-slate-300" data-testid={`task-${i}`}>{t}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </Card>
  );
}

/* ---------- 5-4-3-2-1 Grounding Tool ---------- */
function GroundingTool() {
  const [on, setOn] = useState(false);
  const [step, setStep] = useState(5);
  
  const reset = () => { 
    setStep(5); 
    setOn(false); 
  };

  return (
    <Card>
      <div className="text-3xl" aria-hidden="true">🧠</div>
      <h3 className="text-lg font-semibold mt-2" data-testid="title-grounding">5-4-3-2-1 Grounding</h3>
      <Sub>Lower anxiety in ~60 seconds by labeling senses.</Sub>

      <div className="mt-3 flex gap-2">
        <button 
          type="button"
          className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition" 
          onClick={() => { setOn(true); setStep(5); }}
          data-testid="button-start-grounding"
        >
          Start
        </button>
        <button 
          type="button"
          className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition" 
          onClick={reset}
          data-testid="button-end-grounding"
        >
          End
        </button>
      </div>

      {on && (
        <div className="mt-4" data-testid="grounding-active">
          <div className="text-slate-300" data-testid="text-grounding-step">
            {step === 5 && "Name 5 things you can see."}
            {step === 4 && "Name 4 things you can feel."}
            {step === 3 && "Name 3 things you can hear."}
            {step === 2 && "Name 2 things you can smell."}
            {step === 1 && "Name 1 thing you can taste."}
          </div>
          <div className="mt-3 flex gap-2">
            {step > 1 ? (
              <button 
                type="button"
                className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition" 
                onClick={() => setStep(step - 1)}
                data-testid="button-next-grounding"
              >
                Next
              </button>
            ) : (
              <button 
                type="button"
                className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition" 
                onClick={reset}
                data-testid="button-finish-grounding"
              >
                Finish
              </button>
            )}
            <button 
              type="button"
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition" 
              onClick={reset}
              data-testid="button-reset-grounding"
            >
              Reset
            </button>
          </div>
        </div>
      )}
    </Card>
  );
}

/* ---------- Weekly Reflection ---------- */
function WeeklyReflection() {
  const [on, setOn] = useState(false);
  const [text, setText] = useState("");
  
  return (
    <Card>
      <div className="text-3xl" aria-hidden="true">📅</div>
      <h3 className="text-lg font-semibold mt-2" data-testid="title-reflection">Weekly Reflection</h3>
      <Sub>Quick journaling to check goals & stress.</Sub>

      <div className="mt-3 flex gap-2">
        <button 
          type="button"
          className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition" 
          onClick={() => setOn(true)}
          data-testid="button-start-reflection"
        >
          Start
        </button>
        <button 
          type="button"
          className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition" 
          onClick={() => { setOn(false); setText(""); }}
          data-testid="button-end-reflection"
        >
          End
        </button>
      </div>

      {on && (
        <div className="mt-4">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full h-28 bg-slate-950 border border-slate-700 rounded-lg p-3 outline-none text-slate-100"
            placeholder="Wins, blockers, mood, next steps..."
            data-testid="textarea-reflection"
          />
        </div>
      )}
    </Card>
  );
}

/* ---------- Micro-Stretch Routine ---------- */
function MicroStretch() {
  const [on, setOn] = useState(false);
  
  return (
    <Card>
      <div className="text-3xl" aria-hidden="true">🌿</div>
      <h3 className="text-lg font-semibold mt-2" data-testid="title-stretch">Micro-Stretch Routine</h3>
      <Sub>5-minute posture + eye relief.</Sub>

      <div className="mt-3 flex gap-2">
        <button 
          type="button"
          className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition" 
          onClick={() => setOn(true)}
          data-testid="button-start-stretch"
        >
          Start
        </button>
        <button 
          type="button"
          className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition" 
          onClick={() => setOn(false)}
          data-testid="button-end-stretch"
        >
          End
        </button>
      </div>

      {on && (
        <div className="mt-4 aspect-video w-full rounded-xl overflow-hidden border border-slate-800 bg-black" data-testid="stretch-video-container">
          <iframe
            title="Micro Stretch"
            className="w-full h-full"
            src="https://www.youtube.com/embed/g_tea8ZNk5A?autoplay=1&mute=0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            data-testid="iframe-stretch"
          />
        </div>
      )}
    </Card>
  );
}

/* ---------- Main Wellness Page ---------- */
export default function WellnessCentre() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Nav />
      <main className="max-w-6xl mx-auto px-4 py-8">
        <WCStreamHeader />

        <section className="text-center mt-6 mb-8" data-testid="section-intro">
          <H2>Daily Mind-Body Reset</H2>
          <Sub>Free tools for mental clarity, focus & physical balance — built for agri learners.</Sub>
        </section>

        <section id="yoga-videos" className="grid md:grid-cols-2 gap-6" data-testid="section-yoga">
          <YogaBlock
            title="Morning Yoga — Rise & Focus"
            emoji="🌅"
            slot="Stream window: 6 AM–9 AM IST • ~10 min"
            videoId="inpok4MKVLM"
          />
          <YogaBlock
            title="Evening Yoga — Relax & Reset"
            emoji="🌙"
            slot="Stream window: 9 PM–11 PM IST • ~10 min"
            videoId="v7AYKMP6rOE"
          />
        </section>

        <section id="quick-calm" className="mt-10" data-testid="section-tools">
          <H2>Quick Calm Tools</H2>
          <div className="grid md:grid-cols-3 gap-6 mt-4">
            <BreathingReset />
            <FocusSoundscape />
            <GroundingTool />
            <WeeklyReflection />
            <MicroStretch />
            
            <Card>
              <div className="text-3xl" aria-hidden="true">☀️</div>
              <h3 className="text-lg font-semibold mt-2" data-testid="title-motivational">Motivational Thought</h3>
              <Sub>30-second mantra/quote to boost optimism.</Sub>
              <div className="mt-3 flex gap-2">
                <button type="button" className="px-3 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition" data-testid="button-start-motivational">Start</button>
                <button type="button" className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition" data-testid="button-end-motivational">End</button>
              </div>
            </Card>
          </div>
        </section>

        <section className="text-center mt-10" data-testid="section-footer">
          <p className="text-slate-400 text-sm">
            Wellness is free for all. Practice daily for best results.
          </p>
        </section>
      </main>
    </div>
  );
}
