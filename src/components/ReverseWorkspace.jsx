import React, { useState } from "react";
import { ArrowRight, Copy, Check, Sparkles, RotateCcw, ArrowDown } from "lucide-react";
import { reverseTranslate } from "../engine/reverseTranslator.js";
import { countWords } from "../engine/statistics.js";

const DEFAULT_COMPLEX_EXAMPLE =
  "The biological entity currently designated as myself is experiencing an acute physiological requirement for nutritional intake.";

export function ReverseWorkspace() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [stats, setStats] = useState(null);
  const [copied, setCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSimplify = () => {
    if (!input.trim()) return;
    setIsLoading(true);

    setTimeout(() => {
      const result = reverseTranslate(input);
      setOutput(result.simplified);
      setStats({
        wordsRemoved: result.wordsRemoved,
        complexityReduced: result.complexityReduced,
        meaningRecovered: result.meaningRecovered
      });
      setIsLoading(false);
    }, 450);
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInsertExample = () => {
    setInput(DEFAULT_COMPLEX_EXAMPLE);
  };

  const wordCount = countWords(input);

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-8 text-left">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-medium mb-4">
          <RotateCcw size={13} className="text-cyan-400" />
          <span>Restoring Common Sense</span>
        </div>

        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3">
          Reverse the{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
            Nonsense.
          </span>
        </h1>
        <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
          Turn unnecessarily complicated sentences back into normal human language.
        </p>
      </div>

      {/* Two-part Workspace (Input top / Output bottom or 2 columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Left / Input Card */}
        <div className="p-6 rounded-2xl bg-[#0e1122]/80 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold tracking-wider text-cyan-400 uppercase">
                Input — Complex Gibberish
              </span>
              <span className="text-xs font-mono text-slate-400">{wordCount} words</span>
            </div>

            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Paste something unnecessarily complicated…"
              rows={5}
              className="w-full p-4 rounded-xl bg-black/30 border border-white/10 focus:border-cyan-500/80 focus:ring-2 focus:ring-cyan-500/20 text-white placeholder-slate-500 text-base leading-relaxed resize-none transition-all outline-none mb-4"
            />

            {/* Quick Example Button */}
            <div className="mb-4">
              <button
                type="button"
                onClick={handleInsertExample}
                className="text-xs px-3 py-2 rounded-lg bg-white/5 hover:bg-cyan-500/20 border border-white/10 text-cyan-300 transition-all text-left flex items-center gap-2"
              >
                <Sparkles size={13} className="shrink-0" />
                <span className="line-clamp-1">Try: “The biological entity currently designated as myself...”</span>
              </button>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSimplify}
            disabled={!input.trim() || isLoading}
            className={`w-full py-3.5 px-6 rounded-xl font-bold tracking-wider text-sm flex items-center justify-center gap-2.5 uppercase transition-all duration-300 cursor-pointer ${
              !input.trim() || isLoading
                ? "bg-white/5 border border-white/10 text-slate-500 cursor-not-allowed"
                : "bg-gradient-to-r from-cyan-600 to-violet-600 hover:from-cyan-500 hover:to-violet-500 text-white shadow-[0_0_25px_rgba(6,182,212,0.4)] border border-cyan-400/40 hover:scale-[1.01] active:scale-[0.99]"
            }`}
          >
            <span>SIMPLIFY</span>
            <ArrowRight size={18} />
          </button>
        </div>

        {/* Right / Output Card */}
        <div className="p-6 rounded-2xl bg-[#0e1122]/80 border border-white/10 backdrop-blur-xl shadow-xl flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold tracking-wider text-emerald-400 uppercase">
                Output — Normal Human English
              </span>
              {output && (
                <span className="text-xs font-mono text-emerald-400 px-2 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                  Clarity Restored
                </span>
              )}
            </div>

            <div className="min-h-[160px] rounded-xl bg-black/30 border border-white/10 p-5 flex flex-col justify-center">
              {isLoading ? (
                <div className="py-6 flex flex-col items-center justify-center text-center">
                  <div className="w-8 h-8 rounded-full border-2 border-cyan-500/20 border-t-cyan-400 animate-spin mb-3" />
                  <p className="text-sm text-cyan-300 font-mono animate-pulse">
                    Stripping intellectual pretentiousness…
                  </p>
                </div>
              ) : output ? (
                <div>
                  <p className="text-xl font-medium text-white font-sans leading-relaxed">
                    “{output}”
                  </p>
                </div>
              ) : (
                <div className="text-center py-6 text-slate-400">
                  <p className="text-sm font-medium">Simple sentence will appear here.</p>
                  <p className="text-xs text-slate-500 mt-1">
                    Free from academic jargon, corporate synergy, and legal clauses.
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Copy Button */}
          {output && !isLoading ? (
            <div className="pt-4 border-t border-white/5 mt-4">
              <button
                type="button"
                onClick={handleCopy}
                className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold font-mono flex items-center justify-center gap-2 border transition-all cursor-pointer ${
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
                    <span>Copy Clean Sentence</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            <div className="pt-4 border-t border-white/5 mt-4 text-center">
              <span className="text-[11px] font-mono text-slate-600">
                Awaiting complex text
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Reverse Statistics */}
      {stats && (
        <div className="p-6 rounded-2xl bg-[#0e1122]/90 border border-white/10 backdrop-blur-xl shadow-xl">
          <h3 className="text-xs font-mono font-bold tracking-wider text-slate-400 uppercase mb-4">
            Reverse Metrics
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-black/30 border border-white/10 text-center">
              <div className="text-xs font-mono text-slate-400 uppercase mb-1">
                Words Removed
              </div>
              <div className="text-3xl font-extrabold text-cyan-400 font-mono">
                {stats.wordsRemoved}
              </div>
              <span className="text-[10px] text-slate-500">Unnecessary fluff deleted</span>
            </div>

            <div className="p-4 rounded-xl bg-black/30 border border-white/10 text-center">
              <div className="text-xs font-mono text-slate-400 uppercase mb-1">
                Complexity Reduced
              </div>
              <div className="text-3xl font-extrabold text-emerald-400 font-mono">
                {stats.complexityReduced}
              </div>
              <span className="text-[10px] text-slate-500">Back to sanity</span>
            </div>

            <div className="p-4 rounded-xl bg-black/30 border border-white/10 text-center">
              <div className="text-xs font-mono text-slate-400 uppercase mb-1">
                Meaning Recovered
              </div>
              <div className="text-3xl font-extrabold text-violet-400 font-mono">
                {stats.meaningRecovered}
              </div>
              <span className="text-[10px] text-slate-500">Exact same point</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
