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

/* ---------- Focus Soundscape: Select soundtrack + time limit ---------- */
function FocusSoundscape() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [soundtrack, setSoundtrack] = useState("Euphoria");
  const [timeLimit, setTimeLimit] = useState(25);
  const [remaining, setRemaining] = useState(0);

  const soundtracks = {
    Euphoria: "/ambient-background-347405_1760011359751.mp3",
    Ambrossia: "/ambient-background-339939_1760011815059.mp3",
    Elixir: "/solitude-dark-ambient-music-354468_1760011815058.mp3",
  };

  useEffect(() => {
    if (!started || finished) return;

    const id = setInterval(() => {
      setRemaining((r) => {
        if (r <= 1) {
          setFinished(true);
          if (audioRef.current) audioRef.current.pause();
          return 0;
        }
        return r - 1;
      });
    }, 1000);

    return () => clearInterval(id);
  }, [started, finished]);

  const startSoundscape = () => {
    setStarted(true);
    setFinished(false);
    setRemaining(timeLimit * 60);
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  const restartSoundscape = () => {
    setStarted(false);
    setFinished(false);
    setRemaining(0);
    if (audioRef.current) audioRef.current.pause();
  };

  const fmt = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const ss = (s % 60).toString().padStart(2, "0");
    return `${m}:${ss}`;
  };

  return (
    <Card>
      <div className="text-3xl" aria-hidden="true">🎧</div>
      <h3 className="text-lg font-semibold mt-2" data-testid="title-focus">Focus Soundscape</h3>
      <Sub>Select your soundtrack and set a time limit for focused work.</Sub>

      {!started && !finished && (
        <div className="mt-4 space-y-4">
          <div>
            <label className="text-sm text-slate-400 block mb-2">Choose Soundtrack:</label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(soundtracks).map((name) => (
                <button
                  key={name}
                  type="button"
                  className={`px-4 py-2 rounded-lg transition ${
                    soundtrack === name
                      ? "bg-emerald-600 hover:bg-emerald-500"
                      : "bg-slate-800 hover:bg-slate-700"
                  }`}
                  onClick={() => setSoundtrack(name)}
                  data-testid={`button-soundtrack-${name.toLowerCase()}`}
                >
                  {name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm text-slate-400 block mb-2">Time Limit (minutes):</label>
            <input
              type="number"
              value={timeLimit}
              onChange={(e) => setTimeLimit(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 outline-none text-slate-100"
              min="1"
              data-testid="input-time-limit"
            />
          </div>

          <button
            type="button"
            className="w-full px-4 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition font-semibold"
            onClick={startSoundscape}
            data-testid="button-start-soundscape"
          >
            Start Soundscape
          </button>
        </div>
      )}

      {started && !finished && (
        <div className="mt-4 text-center" data-testid="soundscape-playing">
          <div className="text-sm text-slate-400 mb-2">Now Playing: {soundtrack}</div>
          <div className="text-5xl font-extrabold mb-4" data-testid="text-remaining">{fmt(remaining)}</div>
          <button
            type="button"
            className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 transition"
            onClick={restartSoundscape}
            data-testid="button-stop-soundscape"
          >
            Stop
          </button>
        </div>
      )}

      {finished && (
        <div className="mt-4 text-center" data-testid="soundscape-finished">
          <div className="text-lg font-semibold mb-2">Session Complete!</div>
          <div className="text-slate-400 mb-4">Your focus session has ended.</div>
          <button
            type="button"
            className="px-4 py-3 rounded-lg bg-emerald-600 hover:bg-emerald-500 transition font-semibold"
            onClick={restartSoundscape}
            data-testid="button-restart-soundscape"
          >
            Start New Session
          </button>
        </div>
      )}

      <audio ref={audioRef} loop preload="metadata">
        <source src={soundtracks[soundtrack as keyof typeof soundtracks]} type="audio/mpeg" />
      </audio>
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
