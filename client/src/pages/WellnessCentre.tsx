import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Home, Sunrise, Moon, Wind, Lightbulb, Heart, Video, type LucideIcon } from "lucide-react";

// Utility functions
const todayKey = () => new Date().toISOString().slice(0, 10);

function useLocalVar<T>(key: string, defaultVal: T): [T, (val: T) => void] {
  const storageKey = `wellness_${key}`;
  const [val, setVal] = useState<T>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : defaultVal;
    } catch {
      return defaultVal;
    }
  });
  
  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(val));
  }, [val, storageKey]);
  
  return [val, setVal];
}

// Styles hook
function useStyles() {
  useEffect(() => {
    const id = "wellness-styles";
    if (document.getElementById(id)) return;
    const style = document.createElement("style");
    style.id = id;
    style.textContent = `
      .wellness-container {
        min-height: 100vh;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        padding: 80px 16px 40px;
      }
      .wellness-inner {
        max-width: 1200px;
        margin: 0 auto;
      }
      .wellness-card {
        background: rgba(255, 255, 255, 0.95);
        border-radius: 16px;
        padding: 24px;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      }
      .wellness-title {
        font-size: 28px;
        font-weight: 800;
        color: #4c51bf;
        margin-bottom: 8px;
      }
      .wellness-subtitle {
        font-size: 15px;
        color: #718096;
        line-height: 1.6;
      }
      .wellness-grid-2 {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 16px;
      }
      .wellness-tile-head {
        display: flex;
        justify-content: space-between;
        align-items: flex-start;
        margin-bottom: 16px;
        gap: 16px;
      }
      .wellness-tile-title {
        font-weight: 700;
        font-size: 18px;
        color: #5a67d8;
      }
      .wellness-tip {
        font-size: 13px;
        color: #a0aec0;
        margin-top: 4px;
      }
      .wellness-kpi {
        display: flex;
        gap: 12px;
        margin-top: 16px;
      }
      .wellness-kpi-box {
        flex: 1;
        background: #f7fafc;
        border-radius: 12px;
        padding: 16px;
        text-align: center;
      }
      .wellness-kpi-label {
        font-size: 12px;
        color: #718096;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        margin-bottom: 8px;
      }
      .wellness-kpi-value {
        font-size: 24px;
        font-weight: 800;
        color: #5a67d8;
      }
      .wellness-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .wellness-list li {
        padding: 12px 0;
        border-bottom: 1px solid #e2e8f0;
        color: #4a5568;
        line-height: 1.6;
      }
      .wellness-list li:last-child {
        border-bottom: none;
      }
      .wellness-check {
        display: flex;
        align-items: center;
        gap: 8px;
        font-size: 15px;
        color: #4a5568;
        cursor: pointer;
      }
      .wellness-check input[type="checkbox"] {
        width: 20px;
        height: 20px;
        cursor: pointer;
        accent-color: #5a67d8;
      }
      .wellness-video-container {
        position: relative;
        width: 100%;
        padding-bottom: 56.25%;
        background: #f7fafc;
        border-radius: 12px;
        overflow: hidden;
        margin-top: 12px;
      }
      .wellness-video-container iframe {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .wellness-video-placeholder {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #a0aec0;
        font-size: 14px;
      }
      .wellness-breathing-circle {
        width: 200px;
        height: 200px;
        margin: 24px auto;
        position: relative;
      }
      .wellness-breathing-svg {
        transform: rotate(-90deg);
      }
      .wellness-breathing-text {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        text-align: center;
      }
      .wellness-breathing-phase {
        font-size: 18px;
        font-weight: 700;
        color: #5a67d8;
      }
      .wellness-breathing-count {
        font-size: 14px;
        color: #718096;
        margin-top: 4px;
      }
    `;
    document.head.appendChild(style);
  }, []);
}

// Video Tile Component
function VideoTile({ title, storageKey, defaultTip, icon: Icon }: { title: string; storageKey: string; defaultTip: string; icon: LucideIcon }) {
  const [url, setUrl] = useLocalVar(storageKey, "");
  const [editing, setEditing] = useState(false);
  const [tempUrl, setTempUrl] = useState("");

  function handleEdit() {
    setTempUrl(url);
    setEditing(true);
  }

  function handleSave() {
    setUrl(tempUrl);
    setEditing(false);
  }

  function handleCancel() {
    setEditing(false);
    setTempUrl("");
  }

  function getEmbedUrl(rawUrl: string) {
    if (!rawUrl) return "";
    if (rawUrl.includes("youtube.com/watch")) {
      const videoId = new URL(rawUrl).searchParams.get("v");
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (rawUrl.includes("youtu.be/")) {
      const videoId = rawUrl.split("youtu.be/")[1].split("?")[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (rawUrl.includes("vimeo.com/")) {
      const videoId = rawUrl.split("vimeo.com/")[1].split("?")[0];
      return `https://player.vimeo.com/video/${videoId}`;
    }
    return rawUrl;
  }

  const embedUrl = getEmbedUrl(url);

  return (
    <div className="wellness-card" data-testid={`video-tile-${storageKey}`}>
      <div className="wellness-tile-head">
        <div className="flex items-center gap-2">
          <Icon className="h-5 w-5 text-indigo-500" />
          <div className="wellness-tile-title">{title}</div>
        </div>
        {!editing && (
          <Button variant="ghost" size="sm" onClick={handleEdit} data-testid={`button-edit-${storageKey}`}>
            {url ? "Change" : "Add"}
          </Button>
        )}
      </div>
      
      {editing ? (
        <div className="space-y-3">
          <Input
            placeholder="Paste YouTube, Vimeo, or MP4 URL..."
            value={tempUrl}
            onChange={(e) => setTempUrl(e.target.value)}
            data-testid={`input-url-${storageKey}`}
          />
          <div className="flex gap-2">
            <Button onClick={handleSave} size="sm" className="flex-1" data-testid={`button-save-${storageKey}`}>
              Save
            </Button>
            <Button onClick={handleCancel} variant="outline" size="sm" className="flex-1" data-testid={`button-cancel-${storageKey}`}>
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <>
          {embedUrl ? (
            <div className="wellness-video-container">
              <iframe
                src={embedUrl}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                data-testid={`iframe-${storageKey}`}
              />
            </div>
          ) : (
            <div className="wellness-video-container">
              <div className="wellness-video-placeholder" data-testid={`placeholder-${storageKey}`}>
                {defaultTip}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

// Breathing Tool Component
function BreathingTool() {
  const [running, setRunning] = useState(false);
  const [phase, setPhase] = useState<"inhale" | "hold" | "exhale">("inhale");
  const [count, setCount] = useState(0);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const phaseDurations = { inhale: 4, hold: 7, exhale: 8 };
  const phaseLabels = { inhale: "Breathe In", hold: "Hold", exhale: "Breathe Out" };

  useEffect(() => {
    if (!running) return;

    const duration = phaseDurations[phase];
    if (count >= duration) {
      const nextPhase = phase === "inhale" ? "hold" : phase === "hold" ? "exhale" : "inhale";
      setPhase(nextPhase);
      setCount(0);
      return;
    }

    timerRef.current = setTimeout(() => {
      setCount(count + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [running, phase, count]);

  function handleStart() {
    setRunning(true);
    setPhase("inhale");
    setCount(0);
  }

  function handleStop() {
    setRunning(false);
    setPhase("inhale");
    setCount(0);
    if (timerRef.current) clearTimeout(timerRef.current);
  }

  const duration = phaseDurations[phase];
  const progress = (count / duration) * 100;

  return (
    <div className="wellness-card" data-testid="breathing-tool">
      <div className="flex items-center gap-2 mb-2">
        <Wind className="h-5 w-5 text-indigo-500" />
        <div className="wellness-tile-title">Anxiety Alleviation</div>
      </div>
      <div className="wellness-tip">4-7-8 breathing technique — scientifically proven to calm your nervous system</div>
      
      <div className="wellness-breathing-circle">
        <svg className="wellness-breathing-svg" width="200" height="200">
          <circle cx="100" cy="100" r="90" fill="none" stroke="#e2e8f0" strokeWidth="12" />
          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="#5a67d8"
            strokeWidth="12"
            strokeDasharray={`${2 * Math.PI * 90}`}
            strokeDashoffset={`${2 * Math.PI * 90 * (1 - progress / 100)}`}
            style={{ transition: "stroke-dashoffset 1s linear" }}
          />
        </svg>
        <div className="wellness-breathing-text">
          <div className="wellness-breathing-phase" data-testid="breathing-phase">
            {running ? phaseLabels[phase] : "Ready"}
          </div>
          <div className="wellness-breathing-count" data-testid="breathing-count">
            {running ? `${count}/${duration}s` : "Click Start"}
          </div>
        </div>
      </div>

      <div className="flex justify-center">
        {!running ? (
          <Button onClick={handleStart} className="bg-indigo-600 hover:bg-indigo-700" data-testid="button-breathing-start">
            Start
          </Button>
        ) : (
          <Button onClick={handleStop} variant="outline" data-testid="button-breathing-stop">
            Stop
          </Button>
        )}
      </div>
    </div>
  );
}

// Mental Sharpness Tips Component
function SharpnessTips() {
  return (
    <div className="wellness-card" data-testid="sharpness-tips">
      <div className="flex items-center gap-2 mb-2">
        <Lightbulb className="h-5 w-5 text-indigo-500" />
        <div className="wellness-tile-title">Tricks to Stay Mentally Sharp</div>
      </div>
      <div className="wellness-tip">Science-backed micro-habits for sustained focus</div>
      <ul className="wellness-list">
        <li data-testid="tip-0">
          <b>Hydrate first thing:</b> 300–500 ml water after waking supports attention.
        </li>
        <li data-testid="tip-1">
          <b>Light exposure:</b> 2–5 minutes of morning sunlight anchors your body clock.
        </li>
        <li data-testid="tip-2">
          <b>90/20 rule:</b> Study 90 minutes, move for 2–5 minutes, then continue.
        </li>
        <li data-testid="tip-3">
          <b>Eyes & neck reset:</b> 20–20–20: every 20 minutes, look 20 feet away for 20 seconds.
        </li>
        <li data-testid="tip-4">
          <b>Micro journaling:</b> Write one line: "Today I'll complete ___."
        </li>
        <li data-testid="tip-5">
          <b>Protein + fiber breakfast:</b> stabilizes energy for morning sessions.
        </li>
      </ul>
    </div>
  );
}

// Daily Check-in Component
function CheckIn() {
  const [log, setLog] = useLocalVar<string[]>("checkins", []);
  const today = todayKey();
  const practiced = log.includes(today);

  function toggle() {
    if (practiced) {
      setLog(log.filter((d) => d !== today));
    } else {
      setLog([...log, today]);
    }
  }

  // Calculate streak
  let streak = 0;
  const now = new Date();
  while (true) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - streak);
    const key = d.toISOString().slice(0, 10);
    if (log.includes(key)) streak++;
    else break;
  }

  return (
    <div className="wellness-card" data-testid="check-in">
      <div className="wellness-tile-head">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Heart className="h-5 w-5 text-indigo-500" />
            <div className="wellness-tile-title">Daily Wellness Check‑in</div>
          </div>
          <div className="wellness-tip">Mark your practice once a day. Builds consistency and motivation.</div>
        </div>
        <label className="wellness-check">
          <input
            type="checkbox"
            checked={practiced}
            onChange={toggle}
            data-testid="checkbox-practiced"
          />
          I practiced today
        </label>
      </div>
      <div className="wellness-kpi">
        <div className="wellness-kpi-box">
          <div className="wellness-kpi-label">Current Streak</div>
          <div className="wellness-kpi-value" data-testid="value-streak">
            {streak} day{streak === 1 ? "" : "s"}
          </div>
        </div>
        <div className="wellness-kpi-box">
          <div className="wellness-kpi-label">Total Check‑ins</div>
          <div className="wellness-kpi-value" data-testid="value-total">
            {log.length}
          </div>
        </div>
      </div>
      <div className="wellness-tip" style={{ marginTop: "16px" }}>
        Data is stored locally on this device. You can safely refresh or come back later.
      </div>
    </div>
  );
}

// Main Wellness Centre Component
export default function WellnessCentre() {
  useStyles();

  return (
    <div className="wellness-container">
      <div className="wellness-inner">
        <div className="wellness-card" data-testid="wellness-header">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              <div className="wellness-title">Wellness Centre — Placeholders Ready</div>
              <div className="wellness-subtitle">
                A calm corner inside The Agri Vision: quick tools and slots for guided videos. Add links now; upload full classes later.
              </div>
            </div>
            <a href="/" data-testid="link-home-wellness">
              <Button variant="ghost" size="icon" className="shrink-0">
                <Home className="h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>

        <div className="wellness-grid-2" style={{ marginTop: 16 }}>
          <VideoTile
            title="Daily Morning Yoga"
            storageKey="morning_yoga"
            defaultTip="Morning flow — video coming soon"
            icon={Sunrise}
          />
          <VideoTile
            title="Daily Night Yoga (Wind Down)"
            storageKey="night_yoga"
            defaultTip="Night routine — video coming soon"
            icon={Moon}
          />
        </div>

        <div className="wellness-grid-2" style={{ marginTop: 16 }}>
          <BreathingTool />
          <SharpnessTips />
        </div>

        <div style={{ marginTop: 16 }}>
          <CheckIn />
        </div>
      </div>
    </div>
  );
}
