import React from "react";
import { MODES } from "../engine/modes.js";

export function ModeSelector({ selectedMode, onSelectMode }) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold tracking-wider text-slate-300 uppercase font-mono flex items-center gap-2">
          <span>Choose Your Complication Mode</span>
          <span className="text-[11px] px-2 py-0.5 rounded bg-violet-500/20 text-violet-300 font-mono">
            8 Archetypes
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3">
        {MODES.map((mode) => {
          const isSelected = selectedMode === mode.id;

          return (
            <button
              key={mode.id}
              onClick={() => onSelectMode(mode.id)}
              className={`group relative text-left p-3.5 rounded-xl transition-all duration-200 cursor-pointer overflow-hidden border ${
                isSelected
                  ? `bg-[#14172c] border-violet-500/90 shadow-[0_0_22px_rgba(168,85,247,0.35)] ring-1 ring-violet-400/50`
                  : `bg-[#0e1122]/70 hover:bg-[#14172b]/80 border-white/10 hover:border-white/20 text-slate-400`
              }`}
            >
              {/* Active glow top bar */}
              {isSelected && (
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-violet-500 via-cyan-400 to-amber-400" />
              )}

              <div className="flex items-center justify-between mb-2">
                <span className="text-2xl filter drop-shadow-sm transition-transform group-hover:scale-110 duration-200">
                  {mode.emoji}
                </span>
                <span
                  className={`text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded-full ${
                    isSelected
                      ? "bg-violet-500/20 text-violet-300 font-semibold"
                      : "bg-white/5 text-slate-400"
                  }`}
                >
                  {mode.name}
                </span>
              </div>

              <div
                className={`text-sm font-bold mb-1 transition-colors ${
                  isSelected ? "text-white" : "text-slate-200 group-hover:text-white"
                }`}
              >
                {mode.name}
              </div>

              <p className="text-xs text-slate-400 leading-snug line-clamp-2">
                {mode.description}
              </p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
