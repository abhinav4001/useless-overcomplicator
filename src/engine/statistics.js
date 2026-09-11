export function countWords(text) {
  if (!text || !text.trim()) return 0;
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function calculateStats(originalText, translatedText, complexityLevel = 1) {
  const origWords = countWords(originalText);
  const transWords = countWords(translatedText);

  if (origWords === 0 || transWords === 0) {
    return {
      origWords: 0,
      transWords: 0,
      complexityIncrease: "+0%",
      newInformation: "0%",
      uselessnessScore: 0,
      verdict: "Awaiting input..."
    };
  }

  // Calculate percentage increase in word count
  const rawIncrease = Math.round(((transWords - origWords) / Math.max(1, origWords)) * 100);
  const complexityIncrease = `+${Math.max(0, rawIncrease)}%`;

  // Calculate uselessness score (0 to 100)
  // Depends primarily on length ratio and complexity level multiplier
  const expansionRatio = (transWords - origWords) / Math.max(1, transWords);
  const levelBonus = (complexityLevel - 1) * 4;
  let rawScore = Math.round((expansionRatio * 95) + 12 + levelBonus);

  // Bound between 18% and 100%
  const uselessnessScore = Math.min(100, Math.max(18, rawScore));

  let verdict = "Barely complicated.";
  if (uselessnessScore <= 30) {
    verdict = "Barely complicated.";
  } else if (uselessnessScore <= 60) {
    verdict = "We’re getting unnecessarily serious.";
  } else if (uselessnessScore <= 80) {
    verdict = "This could have been much simpler.";
  } else if (uselessnessScore <= 95) {
    verdict = "Congratulations. Nobody asked for this.";
  } else {
    verdict = "Peak uselessness achieved.";
  }

  return {
    origWords,
    transWords,
    complexityIncrease,
    newInformation: "0%",
    uselessnessScore,
    verdict
  };
}
