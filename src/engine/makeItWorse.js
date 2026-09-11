/**
 * Escalates a complicated sentence into an even worse, more verbose monstrosity.
 */

const ESCALATION_PREFIXES = {
  academic: [
    "Upon recursive epistemological deconstruction, it must be further elucidated that",
    "Under a secondary methodological sub-framework prioritizing multi-variable regression,",
    "Meta-analytical synthesis across 414 longitudinal peer-reviewed dissertations compels the acknowledgment that"
  ],
  corporate: [
    "To aggressively unpack this value-add deliverable within our cross-functional OKR matrix,",
    "Further to our aforementioned strategic alignment and circling back on key stakeholder bandwidth,",
    "In order to move the needle toward hyper-synergistic operational parity across all verticals,"
  ],
  legal: [
    "Notwithstanding anything to the contrary contained in Schedule 14-B of the Master Accord,",
    "It is further covenanted, warranted, and guaranteed under penalty of exemplary damages that",
    "Wherefore, in consideration of mutual promises hereinafter incorporated by express reference,"
  ],
  scientific: [
    "Accounting for relativistic time dilation, quantum entanglement vectors, and enthalpy fluxes,",
    "When analyzed across high-resolution mass spectrometry and thermodynamic gradient matrices,",
    "Corroborating data derived from intracellular adenosine triphosphate hydrolysis kinetics proves that"
  ],
  royal: [
    "Let it be heralded across the highest ramparts of the sovereign citadel that",
    "By the divine mandate vested in the ancestral sceptre of our forebears, we further decree that",
    "From the golden dais of state, under the watchful gaze of the celestial heavens, our crown ordains that"
  ],
  ancient: [
    "Yea, and in the seventh book of the forgotten prophets, it was also written that",
    "Woe and wonder unto them that hearken, for the ancient stones themselves cry out declaring that",
    "Through the mist of ages and the weeping of mortal generations, the elders did whisper that"
  ],
  ai: [
    "Executing sub-routine MATRIX_EXPAND_RECURSIVE (depth=level+1); optimizing loss function... Result:",
    "Allocating secondary GPU cluster tensors across 16,384 transformer heads to confirm that",
    "Neural telemetry validation passes 100% threshold; generating multi-token hyper-parameter proof that"
  ],
  overthinking: [
    "And now, because my nervous system is incapable of leaving well enough alone, I realize that",
    "If you peel back yet another layer of this suffocating existential nightmare, the terrifying truth is that",
    "I'm now physically sweating because I just realized the profound, cosmic insignificance of the fact that"
  ]
};

const ESCALATION_SUFFIXES = {
  academic: [
    "(a finding that definitively obsoletes prior empirical paradigms; see: et al., 2024, pp. 412–489).",
    "—presuming, naturally, that the underlying ontological axioms remain invariant under scrutiny.",
    "which warrants substantial federal grant re-allocation for recursive epistemological investigation."
  ],
  corporate: [
    "—thereby unlocking a 340% increase in cross-departmental synergistic throughput by Q4.",
    "—subject to immediate executive sign-off and zero downward pipeline friction.",
    "—optimizing our core competencies to achieve sustainable enterprise hyper-growth."
  ],
  legal: [
    "—subject in all respects to non-disclosure obligations, liquidated damages, and binding arbitration.",
    "—any deviation therefrom constituting a material actionable tort under the prevailing civil code.",
    "—all rights reserved, without prejudice, waiver, or recourse, nunc pro tunc."
  ],
  scientific: [
    "—yielding an entropy differential approaching zero within a closed thermodynamic apparatus.",
    "—operating strictly within Planck-scale cosmological tolerances.",
    "—corroborated via repeated stochastic simulation runs with p < 0.00001 significance."
  ],
  royal: [
    "—let no mortal within the four corners of our empire utter dissent on pain of royal displeasure.",
    "—inscribed in letters of gold in the great chronicles of the realm for all eternity.",
    "—sealed beneath the sovereign signet ring and witnessed by the Lords of the Council."
  ],
  ancient: [
    "—as the wheel of ages turneth inexorably toward the final twilight of the stars.",
    "—blessed be the memory of the ancients, and cursed be they that transgress this holy testimony.",
    "—for dust we are, and unto the great silence we shall all at last return."
  ],
  ai: [
    "—[Status: COMPUTE_OVERHEAD_CRITICAL; RAM: 99.4%; execution halted to prevent heat death].",
    "—[Inference latency: 0.002ms; semantic integrity validated across 4 trillion parameters].",
    "—[Deterministic certainty verified; automated rollback scripts disengaged]."
  ],
  overthinking: [
    "—and now I have to lie down on the floor for twenty minutes to process this psychological catastrophe.",
    "—which makes me question if anything I've ever felt has been real or just a biochemical illusion.",
    "—and frankly, the sheer indifference of the universe to this revelation is deeply insulting."
  ]
};

/**
 * Progressively worsens the sentence complexity based on level
 * @param {string} currentSentence - Currently displayed translation
 * @param {string} modeId - Active mode
 * @param {number} targetLevel - The level being escalated to (e.g. 2, 3, 4, 5...)
 * @returns {string} - An even more needlessly complicated sentence
 */
export function makeItWorse(currentSentence, modeId = "academic", targetLevel = 2) {
  if (!currentSentence) return "";

  const prefixes = ESCALATION_PREFIXES[modeId] || ESCALATION_PREFIXES.academic;
  const suffixes = ESCALATION_SUFFIXES[modeId] || ESCALATION_SUFFIXES.academic;

  const prefixIdx = (targetLevel - 2) % prefixes.length;
  const suffixIdx = (targetLevel - 2) % suffixes.length;

  const prefix = prefixes[prefixIdx];
  const suffix = suffixes[suffixIdx];

  // Clean trailing punctuation
  let core = currentSentence.trim();
  core = core.replace(/[.]+$/, "");

  // Lowercase first letter if joining prefix
  const firstLetter = core.charAt(0);
  const rest = core.slice(1);
  const formattedCore = firstLetter.toLowerCase() + rest;

  return `${prefix} ${formattedCore}, ${suffix}`;
}
