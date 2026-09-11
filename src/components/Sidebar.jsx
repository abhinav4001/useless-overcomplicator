import React, { useState } from "react";
import { Sparkles, ArrowLeftRight, Info, Moon, Sun, Menu, X, Scroll } from "lucide-react";

export function Sidebar({ currentTab, onSelectTab, theme, onToggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navItems = [
    { id: "translate", label: "Translate", icon: Sparkles },
    { id: "reverse", label: "Reverse Mode", icon: ArrowLeftRight },
    { id: "about", label: "About", icon: Info }
  ];

  const handleSelect = (id) => {
    onSelectTab(id);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Top Navigation */}
      <header className="md:hidden flex items-center justify-between px-5 py-4 border-b border-white/10 bg-[#080911]/90 backdrop-blur-md sticky top-0 z-40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-violet-600 to-cyan-500 flex items-center justify-center text-lg shadow-[0_0_12px_rgba(139,92,246,0.5)]">
            📜
          </div>
          <div>
            <h1 className="text-sm font-bold tracking-wider uppercase text-white font-mono leading-none">
              Complicated
            </h1>
            <span className="text-[10px] text-violet-400 font-mono tracking-widest leading-none">
              TRANSLATOR
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onToggleTheme}
            aria-label="Toggle Theme"
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white transition-colors"
          >
            {theme === "dark" ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation Menu"
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-slate-300 hover:text-white"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-[65px] bg-[#080911]/95 backdrop-blur-xl border-b border-white/10 p-5 z-30 flex flex-col gap-2 animate-fadeIn">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleSelect(item.id)}
                className={`flex items-center gap-3 w-full px-4 py-3 rounded-xl font-medium text-sm transition-all ${
                  active
                    ? "bg-gradient-to-r from-violet-600/30 to-cyan-500/20 text-white border border-violet-500/50 shadow-[0_0_15px_rgba(139,92,246,0.3)]"
                    : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon size={18} className={active ? "text-violet-400" : "text-slate-400"} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* Desktop Left Sidebar */}
      <aside className="hidden md:flex flex-col justify-between w-64 lg:w-72 shrink-0 min-h-screen border-r border-white/10 bg-[#080911]/80 backdrop-blur-xl p-6 sticky top-0 h-screen">
        <div>
          {/* Logo & Tagline */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-2.5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-violet-600 via-purple-600 to-cyan-400 flex items-center justify-center text-xl shadow-[0_0_18px_rgba(139,92,246,0.6)]">
                📜
              </div>
              <div>
                <div className="text-xs font-semibold tracking-widest text-slate-400 uppercase font-mono">
                  COMPLICATED
                </div>
                <div className="text-base font-extrabold tracking-wider text-white font-mono leading-none">
                  TRANSLATOR
                </div>
              </div>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed font-sans pl-0.5">
              Making simple things unnecessarily serious.
            </p>
          </div>

          {/* Nav Items */}
          <nav className="flex flex-col gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleSelect(item.id)}
                  className={`flex items-center gap-3.5 px-4 py-3 rounded-xl font-medium text-sm transition-all duration-200 text-left ${
                    active
                      ? "bg-gradient-to-r from-violet-600/25 to-cyan-500/15 text-white border border-violet-500/40 shadow-[0_0_18px_rgba(139,92,246,0.25)] font-semibold"
                      : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.04] border border-transparent"
                  }`}
                >
                  <Icon size={18} className={active ? "text-violet-400" : "text-slate-400"} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom Area */}
        <div className="pt-6 border-t border-white/10 flex flex-col gap-4">
          <div className="flex items-center justify-between px-2">
            <span className="text-xs text-slate-400 font-mono">Appearance</span>
            <button
              onClick={onToggleTheme}
              className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-medium text-slate-300 transition-all"
            >
              {theme === "dark" ? (
                <>
                  <Sun size={14} className="text-amber-400" />
                  <span>Light</span>
                </>
              ) : (
                <>
                  <Moon size={14} className="text-violet-400" />
                  <span>Dark</span>
                </>
              )}
            </button>
          </div>

          <div className="px-3 py-2 rounded-lg bg-white/[0.03] border border-white/5 text-[11px] text-slate-400 text-center font-mono">
            v1.0 • Pure Satire Product
          </div>
        </div>
      </aside>
    </>
  );
}
