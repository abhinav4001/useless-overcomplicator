import React from "react";
import { Sparkles, Terminal } from "lucide-react";

export function HeaderHero() {
  return (
    <div className="relative mb-8 text-left">
      {/* Humorous badge */}
      <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-xs font-mono font-medium mb-4 shadow-[0_0_15px_rgba(139,92,246,0.15)]">
        <Sparkles size={13} className="text-violet-400 animate-pulse" />
        <span>Same meaning. More words. Zero additional value.</span>
      </div>

      {/* Main Heading */}
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-3 leading-tight">
        Why say it simple when you can say it{" "}
        <span className="relative inline-block text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-purple-300 to-cyan-400">
          complicated
          <span className="absolute -bottom-1 left-0 w-full h-[3px] bg-gradient-to-r from-violet-500 to-cyan-400 rounded-full opacity-80" />
        </span>
        ?
      </h1>

      {/* Subtitle */}
      <p className="text-base sm:text-lg text-slate-300 max-w-2xl font-normal leading-relaxed">
        Turn everyday sentences into unnecessarily sophisticated nonsense.
      </p>
    </div>
  );
}
