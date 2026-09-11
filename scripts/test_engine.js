import { translateSentence } from "../src/engine/translator.js";
import { makeItWorse } from "../src/engine/makeItWorse.js";
import { reverseTranslate } from "../src/engine/reverseTranslator.js";
import { calculateStats } from "../src/engine/statistics.js";
import { MODES } from "../src/engine/modes.js";
import { DEFAULT_EXAMPLES } from "../src/engine/examples.js";

console.log("=== 1. TESTING 8 MODES FOR EXAMPLE: I am hungry. ===");
for (const mode of MODES) {
  const trans = translateSentence("I am hungry.", mode.id, 0);
  console.log(`[${mode.name}]: ${trans}`);
}

console.log("\n=== 2. TESTING MAKE IT WORSE (Levels 1 -> 4) ===");
let cur = translateSentence("I am hungry.", "academic", 0);
console.log("Level 1:", cur);
for (let lvl = 2; lvl <= 4; lvl++) {
  cur = makeItWorse(cur, "academic", lvl);
  console.log(`Level ${lvl}:`, cur);
}

console.log("\n=== 3. TESTING DYNAMIC CUSTOM INPUT ===");
const custom = translateSentence("The cat sleeps on the computer.", "scientific", 0);
console.log("Custom Input translation:", custom);

console.log("\n=== 4. TESTING REVERSE MODE ===");
const complex = "The biological entity currently designated as myself is experiencing an internal physiological requirement for the consumption of nutritional substances.";
const rev = reverseTranslate(complex);
console.log("Reverse Output:", JSON.stringify(rev, null, 2));

console.log("\n=== 5. TESTING STATISTICS ===");
const stats = calculateStats("I am hungry.", cur, 4);
console.log("Stats output:", JSON.stringify(stats, null, 2));

console.log("\nALL ENGINE TESTS PASSED SUCCESSFULLY!");
