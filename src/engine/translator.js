import { CURATED_TRANSLATIONS } from "./examples.js";
import { LEXICON } from "./lexicon.js";

/**
 * Main Complicated Translation Engine
 * @param {string} input - Original user sentence
 * @param {string} modeId - Selected complication mode (academic, corporate, legal, scientific, royal, ancient, ai, overthinking)
 * @param {number} variationIndex - Index to support 'Regenerate' cycling
 * @returns {string} - Unnecessarily complicated translated sentence
 */
export function translateSentence(input, modeId = "academic", variationIndex = 0) {
  if (!input || !input.trim()) {
    return "";
  }

  const cleanInput = input.trim();
  const normalizedKey = cleanInput.toLowerCase().replace(/[.,!?;:]+$/, "").trim() + ".";

  // Check if we have a curated translation for this exact benchmark
  if (CURATED_TRANSLATIONS[normalizedKey] && CURATED_TRANSLATIONS[normalizedKey][modeId]) {
    const list = CURATED_TRANSLATIONS[normalizedKey][modeId];
    const idx = Math.abs(variationIndex) % list.length;
    return list[idx];
  }

  // Also check without trailing punctuation match
  const strippedKey = cleanInput.toLowerCase().replace(/[.,!?;:]+$/, "").trim();
  for (const [key, modes] of Object.entries(CURATED_TRANSLATIONS)) {
    const cleanKey = key.replace(/[.,!?;:]+$/, "").trim();
    if (cleanKey === strippedKey && modes[modeId]) {
      const list = modes[modeId];
      const idx = Math.abs(variationIndex) % list.length;
      return list[idx];
    }
  }

  // Otherwise, run our dynamic semantic complication algorithm
  return generateDynamicComplication(cleanInput, modeId, variationIndex);
}

/**
 * Generates an authentic, hilarious complication for ANY custom sentence
 */
function generateDynamicComplication(text, modeId, seed = 0) {
  const modeLex = LEXICON[modeId] || LEXICON.academic;
  
  // Pick rotating intro and outro based on seed and text length
  const introIdx = Math.abs(seed + text.length) % modeLex.intros.length;
  const outroIdx = Math.abs(seed + 2 * text.length) % modeLex.outros.length;
  const intro = modeLex.intros[introIdx];
  const outro = modeLex.outros[outroIdx];

  // Tokenize and transform words
  const words = text.split(/\s+/);
  const transformedWords = words.map((rawWord) => {
    // Separate core word from trailing punctuation
    const match = rawWord.match(/^([a-zA-Z'’]+)([^a-zA-Z'’]*)$/);
    if (!match) return rawWord;
    
    const [, core, punct] = match;
    const lowerCore = core.toLowerCase();

    // Check dictionaries in priority
    if (modeLex.nouns && modeLex.nouns[lowerCore]) {
      return modeLex.nouns[lowerCore] + punct;
    }
    if (modeLex.verbs && modeLex.verbs[lowerCore]) {
      return modeLex.verbs[lowerCore] + punct;
    }
    if (modeLex.adjectives && modeLex.adjectives[lowerCore]) {
      return modeLex.adjectives[lowerCore] + punct;
    }

    return core + punct;
  });

  const middle = transformedWords.join(" ");

  // Flow middle naturally into intro and outro
  const formattedMiddle = middle.charAt(0).toLowerCase() + middle.slice(1).replace(/[.]+$/, "");

  return `${intro} ${formattedMiddle}, ${outro}`;
}
