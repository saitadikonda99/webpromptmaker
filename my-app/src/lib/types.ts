export type Framework = "nextjs" | "react" | "vue" | "svelte";

export type CssFramework = "tailwind" | "chakra" | "mui" | "none";

export type PageType =
  | "landing"
  | "dashboard"
  | "saas"
  | "portfolio"
  | "blog"
  | "ecommerce";

export type ThemeMode = "light" | "dark" | "system";

export type DesignStyle =
  | "minimal"
  | "modern"
  | "brutalist"
  | "glassmorphism"
  | "neubrutalism";

export type OutputFormat =
  | "code-only"
  | "with-explanations"
  | "step-by-step";

export type CodeStructure = "single-file" | "component-based";

export type BuilderMode =
  | "lovable"
  | "v0"
  | "bolt"
  | "vibecoding"
  | "generic";

const VALID_BUILDER_MODES: readonly BuilderMode[] = [
  "lovable",
  "v0",
  "bolt",
  "vibecoding",
  "generic",
];

/** Normalize config so builderMode is always a current mode (handles legacy chatgpt/cursor). */
export function normalizePromptConfig(config: PromptConfig): PromptConfig {
  if ((VALID_BUILDER_MODES as readonly string[]).includes(config.builderMode)) {
    return config;
  }
  return { ...config, builderMode: "vibecoding" };
}

export type Component =
  | "navbar"
  | "sidebar"
  | "hero"
  | "features"
  | "pricing"
  | "faq"
  | "footer"
  | "stats"
  | "charts"
  | "table";

const VALID_COMPONENTS: readonly Component[] = [
  "navbar",
  "sidebar",
  "hero",
  "features",
  "pricing",
  "faq",
  "footer",
  "stats",
  "charts",
  "table",
];

const VALID_FRAMEWORKS: readonly Framework[] = ["nextjs", "react", "vue", "svelte"];
const VALID_CSS_FRAMEWORKS: readonly CssFramework[] = ["tailwind", "chakra", "mui", "none"];
const VALID_PAGE_TYPES: readonly PageType[] = [
  "landing",
  "dashboard",
  "saas",
  "portfolio",
  "blog",
  "ecommerce",
];
const VALID_THEME_MODES: readonly ThemeMode[] = ["light", "dark", "system"];
const VALID_DESIGN_STYLES: readonly DesignStyle[] = [
  "minimal",
  "modern",
  "brutalist",
  "glassmorphism",
  "neubrutalism",
];
const VALID_OUTPUT_FORMATS: readonly OutputFormat[] = [
  "code-only",
  "with-explanations",
  "step-by-step",
];
const VALID_CODE_STRUCTURES: readonly CodeStructure[] = ["single-file", "component-based"];

export interface PromptConfig {
  version: "1.0";

  framework: Framework;
  cssFramework: CssFramework;

  pageType: PageType;

  components: Component[];

  theme: ThemeMode;
  colorScheme: {
    primary: string;
    accent: string;
  };

  designStyle: DesignStyle;
  animations: boolean;

  responsive: boolean;
  accessibility: boolean;
  seo: boolean;

  outputFormat: OutputFormat;
  codeStructure: CodeStructure;

  builderMode: BuilderMode;
}

export const DEFAULT_CONFIG: PromptConfig = {
    version: "1.0",
  
    framework: "nextjs",
    cssFramework: "tailwind",
  
    pageType: "landing",
  
    components: ["navbar", "hero", "features", "footer"],
  
    theme: "system",
    colorScheme: {
      primary: "#6366f1",
      accent: "#22d3ee",
    },
  
    designStyle: "modern",
    animations: true,
  
    responsive: true,
    accessibility: true,
    seo: true,
  
    outputFormat: "code-only",
    codeStructure: "component-based",
  
    builderMode: "vibecoding",
  };

/**
 * Parse and validate imported config JSON. Merges with DEFAULT_CONFIG for missing fields.
 * Returns null on malformed JSON or invalid structure. Safe for use with file uploads.
 */
export function parseImportedConfig(raw: unknown): PromptConfig | null {
  try {
    if (typeof raw !== "object" || raw === null || Array.isArray(raw)) return null;
    const obj = raw as Record<string, unknown>;
    const merged = { ...DEFAULT_CONFIG } as Record<string, unknown>;

    if (obj.version === "1.0") merged.version = "1.0";
    if (
      typeof obj.framework === "string" &&
      (VALID_FRAMEWORKS as readonly string[]).includes(obj.framework)
    ) {
      merged.framework = obj.framework;
    }
    if (
      typeof obj.cssFramework === "string" &&
      (VALID_CSS_FRAMEWORKS as readonly string[]).includes(obj.cssFramework)
    ) {
      merged.cssFramework = obj.cssFramework;
    }
    if (
      typeof obj.pageType === "string" &&
      (VALID_PAGE_TYPES as readonly string[]).includes(obj.pageType)
    ) {
      merged.pageType = obj.pageType;
    }
    if (Array.isArray(obj.components) && obj.components.every((c) => typeof c === "string")) {
      merged.components = (obj.components as string[]).filter((c) =>
        (VALID_COMPONENTS as readonly string[]).includes(c)
      );
    }
    if (
      typeof obj.theme === "string" &&
      (VALID_THEME_MODES as readonly string[]).includes(obj.theme)
    ) {
      merged.theme = obj.theme;
    }
    if (obj.colorScheme && typeof obj.colorScheme === "object" && !Array.isArray(obj.colorScheme)) {
      const cs = obj.colorScheme as Record<string, unknown>;
      merged.colorScheme = {
        primary: typeof cs.primary === "string" ? cs.primary : DEFAULT_CONFIG.colorScheme.primary,
        accent: typeof cs.accent === "string" ? cs.accent : DEFAULT_CONFIG.colorScheme.accent,
      };
    }
    if (
      typeof obj.designStyle === "string" &&
      (VALID_DESIGN_STYLES as readonly string[]).includes(obj.designStyle)
    ) {
      merged.designStyle = obj.designStyle;
    }
    if (typeof obj.animations === "boolean") merged.animations = obj.animations;
    if (typeof obj.responsive === "boolean") merged.responsive = obj.responsive;
    if (typeof obj.accessibility === "boolean") merged.accessibility = obj.accessibility;
    if (typeof obj.seo === "boolean") merged.seo = obj.seo;
    if (
      typeof obj.outputFormat === "string" &&
      (VALID_OUTPUT_FORMATS as readonly string[]).includes(obj.outputFormat)
    ) {
      merged.outputFormat = obj.outputFormat;
    }
    if (
      typeof obj.codeStructure === "string" &&
      (VALID_CODE_STRUCTURES as readonly string[]).includes(obj.codeStructure)
    ) {
      merged.codeStructure = obj.codeStructure;
    }
    if (
      typeof obj.builderMode === "string" &&
      (VALID_BUILDER_MODES as readonly string[]).includes(obj.builderMode)
    ) {
      merged.builderMode = obj.builderMode;
    }

    return normalizePromptConfig(merged as unknown as PromptConfig);
  } catch {
    return null;
  }
}
