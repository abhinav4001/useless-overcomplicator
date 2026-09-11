import React, { useState } from "react";
import { Copy, Check, RefreshCw, AlertTriangle, Flame } from "lucide-react";
import confetti from "canvas-confetti";

export function OutputCard({
  output,
  complexityLevel,
  onMakeItWorse,
  onRegenerate,
  isLoading,
  loadingMessage,
  selectedModeName
}) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleMakeWorseClick = () => {
    onMakeItWorse();
    // Fire funny little confetti on high complexity levels (Level 3+)
    if (complexityLevel >= 2) {
      try {
        confetti({
          particleCount: 35,
          spread: 60,
          origin: { y: 0.7 },
          colors: ["#a855f7", "#06b6d4", "#f59e0b"]
        });
      } catch {}
    }
  };

  return (
    <div className="flex flex-col justify-between h-full p-5 sm:p-6 rounded-2xl bg-[#0e1122]/80 border border-white/10 backdrop-blur-xl shadow-xl relative overflow-hidden">
      <div>
        {/* Header with Title & Level Badge */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
            02 — Complicated Translation
          </span>
          {output && !isLoading && (
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-violet-500/20 text-violet-300 border border-violet-500/30">
                <Flame size={12} className="text-amber-400" />
                Complexity Level {complexityLevel}
              </span>
            </div>
          )}
        </div>

        {/* Content Area */}
        <div className="min-h-[160px] rounded-xl bg-black/30 border border-white/10 p-5 flex flex-col justify-center relative overflow-hidden">
          {isLoading ? (
            /* Funny Loading State */
            <div className="py-8 flex flex-col items-center justify-center text-center">
              <div className="w-10 h-10 rounded-full border-2 border-violet-500/20 border-t-violet-400 animate-spin mb-4" />
              <p className="text-sm text-violet-300 font-mono animate-pulse font-medium">
                {loadingMessage || "Adding unnecessary vocabulary…"}
              </p>
              <span className="text-xs text-slate-500 mt-1 font-mono">
                Optimizing meaningless verbosity...
              </span>
            </div>
          ) : output ? (
            /* Complicated Output Text */
            <div className="relative">
              <p className="text-base sm:text-lg text-slate-100 font-sans leading-relaxed selection:bg-violet-500/30">
                “{output}”
              </p>
              <div className="mt-3 flex items-center justify-between text-xs text-slate-500 font-mono">
                <span>Mode: {selectedModeName}</span>
                <span>Semantic Drift: 0.00%</span>
              </div>
            </div>
          ) : (
            /* Empty State */
            <div className="py-8 flex flex-col items-center justify-center text-center px-4">
              <p className="text-base font-medium text-slate-300 mb-1.5">
                Your unnecessarily complicated sentence will appear here.
              </p>
              <p className="text-xs text-slate-500">
                We promise it will be more complicated than necessary.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      {output && !isLoading ? (
        <div className="pt-5 border-t border-white/5 mt-4 flex flex-col gap-3">
          <div className="grid grid-cols-2 gap-2.5">
            {/* Copy Button */}
            <button
              type="button"
              onClick={handleCopy}
              className={`py-2.5 px-4 rounded-xl text-xs font-semibold font-mono flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                copied
                  ? "bg-emerald-500/20 border-emerald-500/50 text-emerald-300"
                  : "bg-white/5 hover:bg-white/10 border-white/10 text-slate-300 hover:text-white"
              }`}
            >
              {copied ? (
                <>
                  <Check size={14} className="text-emerald-400" />
                  <span>Copied ✓</span>
                </>
              ) : (
                <>
                  <Copy size={14} />
                  <span>Copy</span>
                </>
              )}
            </button>

            {/* Regenerate Button */}
            <button
              type="button"
              onClick={onRegenerate}
              className="py-2.5 px-4 rounded-xl text-xs font-semibold font-mono flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 hover:text-white transition-all cursor-pointer"
            >
              <RefreshCw size={14} />
              <span>Regenerate ↻</span>
            </button>
          </div>

          {/* MAKE IT WORSE Button */}
          <button
            type="button"
            onClick={handleMakeWorseClick}
            className="w-full py-3 px-5 rounded-xl font-bold font-mono text-xs tracking-wider uppercase flex items-center justify-center gap-2 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20 hover:from-amber-500/30 hover:to-red-500/30 text-amber-300 border border-amber-500/40 hover:border-amber-400/70 shadow-[0_0_20px_rgba(245,158,11,0.2)] hover:shadow-[0_0_25px_rgba(245,158,11,0.35)] transition-all cursor-pointer active:scale-[0.99]"
          >
            <Flame size={16} className="text-orange-400 animate-bounce" />
            <span>MAKE IT WORSE (Level {complexityLevel + 1})</span>
          </button>
        </div>
      ) : (
        <div className="pt-4 border-t border-white/5 mt-4 text-center">
          <span className="text-[11px] font-mono text-slate-600">
            Awaiting input to begin complication pipeline
          </span>
        </div>
      )}
    </div>
  );
}
