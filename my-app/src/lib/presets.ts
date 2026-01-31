import type { PromptConfig } from "./types";
import { DEFAULT_CONFIG } from "./types";

export type PresetKey =
  | "saas-landing"
  | "startup-waitlist"
  | "analytics-dashboard"
  | "developer-portfolio"
  | "ai-tool-landing";

export const PRESETS: Record<PresetKey, Partial<PromptConfig>> = {
  "saas-landing": {
    pageType: "saas",
    framework: "nextjs",
    cssFramework: "tailwind",
    components: ["navbar", "hero", "features", "pricing", "faq", "footer"],
    theme: "light",
    colorScheme: { primary: "#155dfc", accent: "#06b6d4" },
    designStyle: "modern",
    animations: true,
    responsive: true,
    accessibility: true,
    seo: true,
  },
  "startup-waitlist": {
    pageType: "landing",
    framework: "nextjs",
    cssFramework: "tailwind",
    components: ["navbar", "hero", "features", "footer"],
    theme: "dark",
    colorScheme: { primary: "#a855f7", accent: "#ec4899" },
    designStyle: "modern",
    animations: true,
    responsive: true,
    accessibility: true,
    seo: true,
  },
  "analytics-dashboard": {
    pageType: "dashboard",
    framework: "nextjs",
    cssFramework: "tailwind",
    components: ["sidebar", "navbar", "stats", "charts", "table"],
    theme: "dark",
    colorScheme: { primary: "#8b5cf6", accent: "#06b6d4" },
    designStyle: "minimal",
    animations: true,
    responsive: true,
    accessibility: true,
    seo: false,
  },
  "developer-portfolio": {
    pageType: "portfolio",
    framework: "nextjs",
    cssFramework: "tailwind",
    components: ["navbar", "hero", "features", "footer"],
    theme: "system",
    colorScheme: { primary: "#0ea5e9", accent: "#14b8a6" },
    designStyle: "minimal",
    animations: true,
    responsive: true,
    accessibility: true,
    seo: true,
  },
  "ai-tool-landing": {
    pageType: "saas",
    framework: "nextjs",
    cssFramework: "tailwind",
    components: ["navbar", "hero", "features", "faq", "footer"],
    theme: "dark",
    colorScheme: { primary: "#6366f1", accent: "#22d3ee" },
    designStyle: "modern",
    animations: true,
    responsive: true,
    accessibility: true,
    seo: true,
  },
};

/**
 * Merge a preset into the current config. Preserves version and fills
 * unspecified fields from DEFAULT_CONFIG so the result is a full PromptConfig.
 */
export function applyPreset(
  currentConfig: PromptConfig,
  presetConfig: Partial<PromptConfig>
): PromptConfig {
  const merged: PromptConfig = {
    ...DEFAULT_CONFIG,
    ...currentConfig,
    ...presetConfig,
    version: "1.0",
  };
  merged.colorScheme = {
    ...DEFAULT_CONFIG.colorScheme,
    ...currentConfig.colorScheme,
    ...(presetConfig.colorScheme ?? {}),
  };
  return merged;
}
