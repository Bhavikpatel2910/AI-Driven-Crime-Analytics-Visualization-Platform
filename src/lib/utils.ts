import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Deterministic pseudo-random generator (mulberry32) — stable mock data, no Math.random. */
export function seeded(seed: number) {
  let a = seed >>> 0;
  return () => {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function fmt(n: number): string {
  return n.toLocaleString("en-IN");
}

export function pct(n: number, digits = 1): string {
  return `${n > 0 ? "+" : ""}${n.toFixed(digits)}%`;
}

export function classifyChange(n: number): "up" | "down" | "flat" {
  if (n > 0.5) return "up";
  if (n < -0.5) return "down";
  return "flat";
}
