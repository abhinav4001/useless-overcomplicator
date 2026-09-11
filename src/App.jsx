import React, { useState, useRef } from "react";
import { Sidebar } from "./components/Sidebar.jsx";
import { HeaderHero } from "./components/HeaderHero.jsx";
import { ModeSelector } from "./components/ModeSelector.jsx";
import { InputCard } from "./components/InputCard.jsx";
import { OutputCard } from "./components/OutputCard.jsx";
import { StatsCard } from "./components/StatsCard.jsx";
import { ReverseWorkspace } from "./components/ReverseWorkspace.jsx";
import { AboutSection } from "./components/AboutSection.jsx";
import { Footer } from "./components/Footer.jsx";
import { useTheme } from "./hooks/useTheme.js";
import { translateSentence } from "./engine/translator.js";
import { makeItWorse } from "./engine/makeItWorse.js";
import { calculateStats } from "./engine/statistics.js";
import { MODES } from "./engine/modes.js";

const LOADING_MESSAGES = [
  "Adding unnecessary vocabulary…",
  "Removing clarity…",
  "Consulting the thesaurus…",
  "Making this much harder than necessary…",
  "Increasing word count for no reason…"
];

export function App() {
  const { theme, toggleTheme } = useTheme();
  const [currentTab, setCurrentTab] = useState("translate");

  // Translation workspace state
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [selectedMode, setSelectedMode] = useState("academic");
  const [complexityLevel, setComplexityLevel] = useState(1);
  const [variationIndex, setVariationIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState(LOADING_MESSAGES[0]);
  const [hasTranslated, setHasTranslated] = useState(false);

  const loaderIntervalRef = useRef(null);

  const currentModeObj = MODES.find((m) => m.id === selectedMode) || MODES[0];

  const triggerLoadingAnimation = (onComplete) => {
    setIsLoading(true);
    let msgIdx = 0;
    setLoadingMessage(LOADING_MESSAGES[msgIdx]);

    if (loaderIntervalRef.current) clearInterval(loaderIntervalRef.current);

    loaderIntervalRef.current = setInterval(() => {
      msgIdx = (msgIdx + 1) % LOADING_MESSAGES.length;
      setLoadingMessage(LOADING_MESSAGES[msgIdx]);
    }, 180);

    setTimeout(() => {
      clearInterval(loaderIntervalRef.current);
      onComplete();
      setIsLoading(false);
    }, 550);
  };

  const handleComplicate = () => {
    if (!input.trim()) return;

    triggerLoadingAnimation(() => {
      const translated = translateSentence(input, selectedMode, variationIndex);
      setOutput(translated);
      setComplexityLevel(1);
      setHasTranslated(true);
    });
  };

  const handleModeChange = (modeId) => {
    setSelectedMode(modeId);
    // If output is already generated, re-complicate with new mode
    if (input.trim() && output) {
      triggerLoadingAnimation(() => {
        const translated = translateSentence(input, modeId, variationIndex);
        setOutput(translated);
        setComplexityLevel(1);
      });
    }
  };

  const handleSelectExample = (exampleText) => {
    setInput(exampleText);
    // Automatically trigger translation for instant user delight
    triggerLoadingAnimation(() => {
      const translated = translateSentence(exampleText, selectedMode, 0);
      setOutput(translated);
      setComplexityLevel(1);
      setVariationIndex(0);
      setHasTranslated(true);
    });
  };

  const handleRegenerate = () => {
    if (!input.trim()) return;
    const nextVar = variationIndex + 1;
    setVariationIndex(nextVar);

    triggerLoadingAnimation(() => {
      const translated = translateSentence(input, selectedMode, nextVar);
      setOutput(translated);
      setComplexityLevel(1);
    });
  };

  const handleMakeItWorse = () => {
    if (!output) return;
    const nextLevel = complexityLevel + 1;
    const worsened = makeItWorse(output, selectedMode, nextLevel);
    setOutput(worsened);
    setComplexityLevel(nextLevel);
  };

  // Compute dynamic stats
  const stats = calculateStats(input, output, complexityLevel);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#070913] text-slate-100 selection:bg-violet-500/30 selection:text-white">
      {/* Navigation Sidebar */}
      <Sidebar
        currentTab={currentTab}
        onSelectTab={setCurrentTab}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      {/* Main Content Area */}
      <main className="flex-1 px-4 sm:px-8 lg:px-12 py-6 sm:py-10 max-w-7xl mx-auto w-full overflow-y-auto">
        {currentTab === "translate" && (
          <div className="animate-fadeIn">
            {/* Header Hero */}
            <HeaderHero />

            {/* Mode Selection */}
            <ModeSelector
              selectedMode={selectedMode}
              onSelectMode={handleModeChange}
            />

            {/* Two-Column Translation Workspace */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 items-stretch">
              <InputCard
                input={input}
                onChangeInput={setInput}
                onComplicate={handleComplicate}
                onSelectExample={handleSelectExample}
                isLoading={isLoading}
              />

              <OutputCard
                output={output}
                complexityLevel={complexityLevel}
                onMakeItWorse={handleMakeItWorse}
                onRegenerate={handleRegenerate}
                isLoading={isLoading}
                loadingMessage={loadingMessage}
                selectedModeName={currentModeObj.name}
              />
            </div>

            {/* Translation Statistics Card (Shown only after first translation) */}
            <StatsCard stats={stats} hasTranslated={hasTranslated} />
          </div>
        )}

        {currentTab === "reverse" && (
          <div className="animate-fadeIn">
            <ReverseWorkspace />
          </div>
        )}

        {currentTab === "about" && (
          <div className="animate-fadeIn">
            <AboutSection onBackToTranslate={() => setCurrentTab("translate")} />
          </div>
        )}

        {/* Minimal Footer */}
        <Footer />
      </main>
    </div>
  );
}

export default App;
