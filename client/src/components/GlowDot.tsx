interface GlowDotProps {
  className?: string;
  color?: string;
}

export default function GlowDot({ className = "", color = "from-emerald-400 to-emerald-600" }: GlowDotProps) {
  return (
    <div className={`absolute w-24 h-24 rounded-full bg-gradient-to-br ${color} opacity-20 blur-2xl ${className}`} />
  );
}
