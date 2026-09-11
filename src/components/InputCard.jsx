import React from "react";
import { ArrowRight, Sparkles, CornerDownLeft } from "lucide-react";
import { DEFAULT_EXAMPLES } from "../engine/examples.js";
import { countWords } from "../engine/statistics.js";

export function InputCard({
  input,
  onChangeInput,
  onComplicate,
  onSelectExample,
  isLoading
}) {
  const wordCount = countWords(input);
  const charCount = input.length;

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === "Enter") {
      e.preventDefault();
      if (input.trim() && !isLoading) {
        onComplicate();
      }
    }
  };

  return (
    <div className="flex flex-col justify-between h-full p-5 sm:p-6 rounded-2xl bg-[#0e1122]/80 border border-white/10 backdrop-blur-xl shadow-xl">
      <div>
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-mono font-bold tracking-wider text-violet-400 uppercase">
            01 — Enter Your Simple Sentence
          </span>
          <div className="text-xs font-mono text-slate-400">
            <span>{wordCount} words</span> • <span>{charCount} chars</span>
          </div>
        </div>

        {/* Textarea */}
        <div className="relative mb-4">
          <textarea
            value={input}
            onChange={(e) => onChangeInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type something painfully simple…"
            rows={4}
            className="w-full p-4 rounded-xl bg-black/30 border border-white/10 focus:border-violet-500/80 focus:ring-2 focus:ring-violet-500/20 text-white placeholder-slate-500 text-base leading-relaxed resize-none transition-all outline-none"
          />
        </div>

        {/* Example chips */}
        <div className="mb-6">
          <div className="text-[11px] font-mono text-slate-400 uppercase tracking-wider mb-2.5 flex items-center gap-1.5">
            <Sparkles size={11} className="text-violet-400" />
            <span>Painfully simple examples:</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {DEFAULT_EXAMPLES.map((eg, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => onSelectExample(eg)}
                className="text-xs px-3 py-1.5 rounded-lg bg-white/5 hover:bg-violet-600/20 hover:text-violet-300 border border-white/10 hover:border-violet-500/40 text-slate-300 transition-all cursor-pointer text-left"
              >
                {eg}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Primary Complicate Button */}
      <div className="pt-4 border-t border-white/5">
        <button
          type="button"
          onClick={onComplicate}
          disabled={!input.trim() || isLoading}
          className={`w-full py-3.5 px-6 rounded-xl font-bold tracking-wider text-sm flex items-center justify-center gap-2.5 uppercase transition-all duration-300 shadow-lg cursor-pointer ${
            !input.trim() || isLoading
              ? "bg-white/5 border border-white/10 text-slate-500 cursor-not-allowed"
              : "bg-gradient-to-r from-violet-600 via-purple-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-white shadow-[0_0_25px_rgba(139,92,246,0.5)] hover:shadow-[0_0_35px_rgba(139,92,246,0.7)] hover:scale-[1.01] active:scale-[0.99] border border-violet-400/40"
          }`}
        >
          <span>COMPLICATE</span>
          <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}
