import React from "react";
import { TrendingUp, FileText, Sparkles, AlertCircle, Award } from "lucide-react";

export function StatsCard({ stats, hasTranslated }) {
  if (!hasTranslated) {
    return null; // As requested: "Do not show fake statistics before the first translation."
  }

  const {
    origWords,
    transWords,
    complexityIncrease,
    newInformation,
    uselessnessScore,
    verdict
  } = stats;

  // Circular gauge calculations
  const radius = 48;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (uselessnessScore / 100) * circumference;

  return (
    <div className="p-6 sm:p-7 rounded-2xl bg-[#0e1122]/90 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden transition-all duration-300">
      {/* Ambient background glow */}
      <div className="absolute -right-16 -top-16 w-64 h-64 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -left-16 -bottom-16 w-64 h-64 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6 border-b border-white/5 pb-4">
        <div>
          <h3 className="text-base font-bold text-white tracking-wide flex items-center gap-2 font-mono">
            <Award className="text-amber-400" size={18} />
            <span>Translation Statistics</span>
          </h3>
          <p className="text-xs text-slate-400 font-sans mt-0.5">
            Real-time telemetry on linguistic inflation
          </p>
        </div>

        {/* Humorous verdict pill */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono font-medium shadow-[0_0_12px_rgba(139,92,246,0.15)] self-start sm:self-auto">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
          <span>“{verdict}”</span>
        </div>
      </div>

      {/* Main Grid: 4 Metric Cards + Large Circular Gauge */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
        {/* Metric Cards (8 cols on desktop) */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          {/* Original Words */}
          <div className="p-4 rounded-xl bg-black/30 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
              Original Words
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-white font-mono">
              {origWords}
            </div>
            <span className="text-[10px] text-slate-500 mt-1">Direct & simple</span>
          </div>

          {/* Translated Words */}
          <div className="p-4 rounded-xl bg-black/30 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
              Translated Words
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-cyan-400 font-mono">
              {transWords}
            </div>
            <span className="text-[10px] text-slate-500 mt-1">Unnecessary bulk</span>
          </div>

          {/* Complexity Increase */}
          <div className="p-4 rounded-xl bg-black/30 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
              Complexity
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-violet-400 font-mono">
              {complexityIncrease}
            </div>
            <span className="text-[10px] text-emerald-400 mt-1">Heavy inflation</span>
          </div>

          {/* New Information */}
          <div className="p-4 rounded-xl bg-black/30 border border-white/10 hover:border-white/20 transition-all flex flex-col justify-between">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2">
              New Info
            </span>
            <div className="text-2xl sm:text-3xl font-extrabold text-amber-400 font-mono">
              {newInformation}
            </div>
            <span className="text-[10px] text-slate-500 mt-1">Zero added value</span>
          </div>
        </div>

        {/* Circular Progress Gauge for Uselessness Score (4 cols on desktop) */}
        <div className="md:col-span-4 flex flex-col items-center justify-center p-4 rounded-xl bg-black/40 border border-white/10 relative">
          <div className="relative flex items-center justify-center">
            <svg className="w-32 h-32 -rotate-90 transform" viewBox="0 0 120 120">
              {/* Background circle */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                className="text-slate-800"
                strokeWidth="10"
                stroke="currentColor"
                fill="transparent"
              />
              {/* Gradient definition */}
              <defs>
                <linearGradient id="uselessGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#06b6d4" />
                  <stop offset="50%" stopColor="#8b5cf6" />
                  <stop offset="100%" stopColor="#f59e0b" />
                </linearGradient>
              </defs>
              {/* Animated Progress Ring */}
              <circle
                cx="60"
                cy="60"
                r={radius}
                stroke="url(#uselessGradient)"
                strokeWidth="10"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="transparent"
                style={{
                  transition: "stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)"
                }}
              />
            </svg>

            {/* Inner text */}
            <div className="absolute flex flex-col items-center justify-center text-center">
              <span className="text-2xl font-black font-mono text-white tracking-tight">
                {uselessnessScore}%
              </span>
              <span className="text-[10px] font-mono uppercase tracking-widest text-slate-400">
                Useless
              </span>
            </div>
          </div>

          <div className="mt-2 text-center">
            <span className="text-xs font-mono font-bold text-slate-300 block">
              Uselessness Score
            </span>
            <span className="text-[11px] text-violet-400 font-mono">
              Formula: (Words - Meaning) × Ego
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
