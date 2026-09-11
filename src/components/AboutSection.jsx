import React from "react";
import { HelpCircle, ArrowLeft, ShieldAlert } from "lucide-react";

export function AboutSection({ onBackToTranslate }) {
  return (
    <div className="max-w-2xl mx-auto text-left">
      <div className="mb-6">
        <button
          onClick={onBackToTranslate}
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 hover:text-white px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 transition-colors"
        >
          <ArrowLeft size={14} />
          <span>Back to Translator</span>
        </button>
      </div>

      <div className="p-7 sm:p-9 rounded-2xl bg-[#0e1122]/90 border border-white/10 backdrop-blur-xl shadow-2xl relative overflow-hidden">
        {/* Glow */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-violet-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono font-medium mb-6">
          <HelpCircle size={14} className="text-violet-400" />
          <span>Philosophical Rationale</span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-white mb-4 tracking-tight">
          Why does this exist?
        </h1>

        <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8">
          “Because not every problem needs solving. Complicated Translator takes perfectly understandable sentences and makes them unnecessarily difficult to understand.”
        </p>

        {/* The 3 Core Metrics */}
        <div className="grid grid-cols-3 gap-3.5 p-5 rounded-xl bg-black/40 border border-white/10 text-center font-mono">
          <div>
            <div className="text-[11px] text-slate-500 uppercase">Purpose</div>
            <div className="text-2xl sm:text-3xl font-black text-rose-400 mt-1">0%</div>
          </div>
          <div className="border-x border-white/10">
            <div className="text-[11px] text-slate-500 uppercase">Complexity</div>
            <div className="text-2xl sm:text-3xl font-black text-violet-400 mt-1">100%</div>
          </div>
          <div>
            <div className="text-[11px] text-slate-500 uppercase">Usefulness</div>
            <div className="text-base sm:text-xl font-bold text-amber-400 mt-1.5 sm:mt-2">
              Questionable
            </div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={onBackToTranslate}
            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white font-bold text-xs font-mono tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)]"
          >
            Produce More Nonsense →
          </button>
        </div>
      </div>
    </div>
  );
}
