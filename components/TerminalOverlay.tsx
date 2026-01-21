export default function TerminalOverlay() {
  return (
    <div className="absolute -bottom-4 -right-4 w-80 bg-slate-900/90 backdrop-blur-xl border border-cyan-500/30 rounded-lg p-4 font-mono text-xs scanline">
      {/* Terminal Header */}
      <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-700">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
          <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
        </div>
        <div className="flex items-center gap-2 ml-auto">
          <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
          <span className="text-cyan-400 text-[10px] uppercase tracking-wider">
            System Active
          </span>
        </div>
        <span className="text-slate-500 text-[10px]">ID:78412.93</span>
      </div>

      {/* Terminal Content */}
      <div className="space-y-2">
        <div className="text-slate-300">
          <span className="text-cyan-400">/ </span>
          WORKOUT ANALYSIS COMPLETE
        </div>

        <div className="pl-4 space-y-1 text-slate-400 text-[11px]">
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">01</span>
            <span>30 min strength training (upper body)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">02</span>
            <span>20 min cardio (moderate intensity)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-cyan-400">03</span>
            <span>10 min flexibility (recovery)</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="pt-2 border-t border-slate-700">
          <div className="flex items-center justify-between text-[10px] mb-1">
            <span className="text-slate-500">PROCESSING</span>
            <span className="text-cyan-400">100%</span>
          </div>
          <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
            <div className="h-full w-full bg-gradient-to-r from-cyan-500 to-blue-500 animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Glow effect */}
      <div className="absolute inset-0 rounded-lg bg-cyan-500/5 blur-xl pointer-events-none"></div>
    </div>
  );
}
