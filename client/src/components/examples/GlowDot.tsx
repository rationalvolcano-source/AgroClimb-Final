import GlowDot from '../GlowDot';

export default function GlowDotExample() {
  return (
    <div className="relative h-40 bg-slate-900">
      <GlowDot className="top-10 left-10" />
      <GlowDot className="bottom-10 right-10" color="from-cyan-400 to-cyan-600" />
    </div>
  );
}
