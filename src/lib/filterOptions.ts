export const DECADE_OPTIONS = [
  { value: "any", label: "Beliebig" },
  { value: "1970", label: "1970er" },
  { value: "1980", label: "1980er" },
  { value: "1990", label: "1990er" },
  { value: "2000", label: "2000er" },
  { value: "2010", label: "2010er" },
  { value: "2020", label: "2020er" },
] as const;

export const RUNTIME_OPTIONS = [
  { value: "any", label: "Beliebig" },
  { value: "90", label: "≤ 90 Min." },
  { value: "120", label: "≤ 120 Min." },
] as const;

export const RATING_OPTIONS = [
  { value: "any", label: "Beliebig" },
  { value: "6", label: "≥ 6" },
  { value: "7", label: "≥ 7" },
  { value: "8", label: "≥ 8" },
] as const;

export type DecadeValue = (typeof DECADE_OPTIONS)[number]["value"];
export type RuntimeValue = (typeof RUNTIME_OPTIONS)[number]["value"];
export type RatingValue = (typeof RATING_OPTIONS)[number]["value"];
