// data.ts
export type Screen = "home" | "shop" | "consult" | "dashboard";

export interface Concern {
  id: string;
  label: string;
  emoji: string;
}

export const CONCERNS: Concern[] = [
  { id: "acne", label: "Acne & Breakouts", emoji: "🌿" },
  { id: "dry", label: "Dryness & Flaking", emoji: "💧" },
  { id: "aging", label: "Fine Lines & Aging", emoji: "✨" },
  { id: "pigment", label: "Hyperpigmentation", emoji: "☀️" },
  { id: "sensitive", label: "Sensitivity & Redness", emoji: "🌸" },
  { id: "dull", label: "Dullness & Uneven Tone", emoji: "🍃" },
];

export const SKIN_TYPES = ["Oily", "Dry", "Combination", "Normal", "Sensitive"];