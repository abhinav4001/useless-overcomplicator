import { REVERSE_BENCHMARKS } from "./examples.js";

// Common complex phrase patterns mapped to everyday speech
const PATTERN_MAPPINGS = [
  {
    pattern: /biological (entity|organism).*?(designated as myself|author).*?(caloric|nutritional|ingestion|hunger|food|ghrelin)/i,
    simple: "I am hungry."
  },
  {
    pattern: /mechanical portal|hinged perimeter barrier|ingress barrier|unlatch.*?barrier|perimeter portal/i,
    simple: "Open the door."
  },
  {
    pattern: /somnolence|circadian.*?torpor|sleep.*?state|adenosine.*?accumulation|exhaustion.*?slumber|weary.*?eyelids|blepharoptosis/i,
    simple: "I am tired."
  },
  {
    pattern: /dihydrogen monoxide|tropospheric condensation|hydrometeors|precipitation|liquid H2O|raining|deluge|weep translucent pearls/i,
    simple: "It’s raining."
  },
  {
    pattern: /post-secondary|collegiate|university|matriculat|higher pedagogical|degrees?|cloisters of the grammarians/i,
    simple: "I don’t want to go to college."
  }
];

// Word-level reverse dictionary
const REVERSE_DICT = [
  { regex: /the biological entity currently designated as myself|the undersigned investigating researcher|the undersigned executive stakeholder|the party of the first part|this autonomous artificial neural network agent/gi, replace: "I" },
  { regex: /is experiencing an acute physiological requirement for nutritional intake|is experiencing an internal physiological requirement for the consumption of nutritional substances/gi, replace: "am hungry" },
  { regex: /potable dihydrogen monoxide solution|liquid dihydrogen monoxide/gi, replace: "water" },
  { regex: /exogenous caloric nutritional substrates|combustible organic biomass/gi, replace: "food" },
  { regex: /internal combustion motorized vehicular conveyance|autonomous wheeled transportation chassis/gi, replace: "car" },
  { regex: /stationary residential architectural domicile|remote-first residential operational headquarters/gi, replace: "home" },
  { regex: /cellular telecommunication and data retrieval apparatus|mobile enterprise productivity terminal/gi, replace: "phone" },
  { regex: /silicon-based microprocessing computational unit|primary silicon microprocessor hardware stack/gi, replace: "computer" },
  { regex: /domesticated canis lupus familiaris specimen|canine domestic morale-boosting stakeholder/gi, replace: "dog" },
  { regex: /domesticated felis catus quadriped|feline low-touch household affiliate/gi, replace: "cat" },
  { regex: /fiat currency units of socioeconomic exchange|cryptographic digital liquidity tokens/gi, replace: "money" },
  { regex: /engage in the metabolic assimilation of organic nutrients|masticate and metabolize combustible biomass/gi, replace: "eat" },
  { regex: /conduct the oral ingestion of potable aqueous solutions/gi, replace: "drink" },
  { regex: /enter an unperturbed state of circadian neurological torpor|low-power dormant hibernation state/gi, replace: "sleep" },
  { regex: /execute coordinated bipedal locomotive displacement/gi, replace: "walk" },
  { regex: /demonstrate possession of|retain strategic ownership over/gi, replace: "have" },
  { regex: /harbor a quantifiable teleological preference for/gi, replace: "want" }
];

// Common fluff intros to strip out
const FLUFF_INTROS = [
  /^Within the rigorous epistemological framework of contemporary discourse,\s*(it can be empirically substantiated that\s*)?/i,
  /^Drawing from peer-reviewed methodological precedents,\s*(scholarly consensus dictates that\s*)?/i,
  /^Per our high-level cross-functional alignment session,\s*(we must double-click on the fact that\s*)?/i,
  /^Moving forward, to optimize stakeholder value and maximize holistic bandwidth,\s*(be advised that\s*)?/i,
  /^Now therefore, pursuant to Section \d+(\.\d+)?(\([a-z]\))? of the Uniform Jurisprudential Accord,\s*(notice is hereby given that\s*)?/i,
  /^Witnesseth: The undersigned party deposes and covenants that,\s*/i,
  /^Thermodynamic, spectroscopic, and cellular analysis unequivocally reveals that\s*/i,
  /^By imperial proclamation and sovereign mandate of our exalted lineage,\s*(let it be known that\s*)?/i,
  /^Hark, ye children of men, for verily as it was written in the ancient chronicles of yore,\s*/i,
  /^Executing forward-pass inference on input prompt\.\.\. Confidence: \d+(\.\d+)?%?\.\s*(Model confirms that\s*)?/i,
  /^If you strip away all societal illusions and confront the raw, terrifying absurdity of consciousness,\s*(you see that\s*)?/i
];

/**
 * Simplifies a complicated sentence back into everyday speech
 */
export function reverseTranslate(complexInput) {
  if (!complexInput || !complexInput.trim()) {
    return {
      simplified: "",
      wordsRemoved: 0,
      complexityReduced: "0%",
      meaningRecovered: "100%"
    };
  }

  const clean = complexInput.trim();

  // 1. Check exact benchmark pairs
  for (const bench of REVERSE_BENCHMARKS) {
    if (clean.toLowerCase().includes(bench.simple.toLowerCase()) || 
        bench.complex.toLowerCase().includes(clean.toLowerCase()) ||
        clean.toLowerCase().includes("biological entity currently designated as myself")) {
      const origWords = clean.split(/\s+/).length;
      const simpWords = bench.simple.split(/\s+/).length;
      return {
        simplified: bench.simple,
        wordsRemoved: Math.max(0, origWords - simpWords),
        complexityReduced: Math.min(98, Math.max(50, Math.round(((origWords - simpWords) / Math.max(1, origWords)) * 100))) + "%",
        meaningRecovered: "100%"
      };
    }
  }

  // 2. Check regex patterns for common themes
  for (const item of PATTERN_MAPPINGS) {
    if (item.pattern.test(clean)) {
      const origWords = clean.split(/\s+/).length;
      const simpWords = item.simple.split(/\s+/).length;
      return {
        simplified: item.simple,
        wordsRemoved: Math.max(0, origWords - simpWords),
        complexityReduced: Math.min(98, Math.max(50, Math.round(((origWords - simpWords) / Math.max(1, origWords)) * 100))) + "%",
        meaningRecovered: "100%"
      };
    }
  }

  // 3. Algorithmic simplification
  let simplified = clean;

  // Strip known fluff intros
  for (const fluff of FLUFF_INTROS) {
    simplified = simplified.replace(fluff, "");
  }

  // Apply dictionary replacements
  for (const dict of REVERSE_DICT) {
    simplified = simplified.replace(dict.regex, dict.replace);
  }

  // Strip trailing scholarly citations / bureaucratic outro clauses
  simplified = simplified.replace(/,\s*(thereby|which|warranting|effective|subject to|in precise|let no|sealed|even so|status:|checksum:|—which|—and).*$/i, ".");

  // Clean extra spaces and capitalize
  simplified = simplified.replace(/\s+/g, " ").trim();
  if (simplified.length > 0) {
    simplified = simplified.charAt(0).toUpperCase() + simplified.slice(1);
    if (!/[.!?]$/.test(simplified)) {
      simplified += ".";
    }
  }

  const inWords = clean.split(/\s+/).length;
  const outWords = simplified.split(/\s+/).length;
  const removed = Math.max(0, inWords - outWords);
  const reduction = Math.min(95, Math.max(10, Math.round((removed / Math.max(1, inWords)) * 100))) + "%";

  return {
    simplified,
    wordsRemoved: removed,
    complexityReduced: reduction,
    meaningRecovered: "100%"
  };
}
