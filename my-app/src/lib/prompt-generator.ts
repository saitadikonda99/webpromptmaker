import type {
  Component,
  CssFramework,
  Framework,
  PromptConfig,
} from "./types";
import { getTemplate, PLACEHOLDERS } from "./templates";

/** Capitalize first letter for display (e.g. "nextjs" → "Next.js"). */
export function formatFramework(framework: Framework): string {
  const labels: Record<Framework, string> = {
    nextjs: "Next.js",
    react: "React",
    vue: "Vue",
    svelte: "Svelte",
  };
  return labels[framework];
}

/** Format CSS framework for display. */
function formatCssFramework(css: CssFramework): string {
  const labels: Record<CssFramework, string> = {
    tailwind: "Tailwind CSS",
    chakra: "Chakra UI",
    mui: "MUI",
    none: "None",
  };
  return labels[css];
}

/** Component display label (capitalize). */
function componentLabel(c: Component): string {
  return c.charAt(0).toUpperCase() + c.slice(1);
}

/** Build bullet list of component names. Handles empty list. */
export function formatComponents(components: Component[]): string {
  if (components.length === 0) {
    return "None specified. Suggest a minimal set (e.g. Navbar, Hero, Footer) based on page type.";
  }
  return components.map((c) => `- ${componentLabel(c)}`).join("\n");
}

/** Short detail description per component. */
const COMPONENT_DETAIL_MAP: Record<Component, string> = {
  navbar: "Logo, nav links, optional CTA",
  sidebar: "Nav links, collapsible on mobile",
  hero: "Headline, subtext, primary CTA",
  features: "Grid layout of feature cards",
  pricing: "Pricing tiers with comparison",
  faq: "Accordion-style Q&A",
  footer: "Links, social icons, copyright",
  stats: "Metrics / KPIs display",
  charts: "Chart components (e.g. line, bar)",
  table: "Data table with sort/filter",
};

/** Build structured component detail descriptions. */
function buildComponentDetails(components: Component[]): string {
  if (components.length === 0) {
    return "";
  }
  return components
    .map((c) => `${componentLabel(c)} → ${COMPONENT_DETAIL_MAP[c]}`)
    .join("\n");
}

/** Remove repeated blank lines; keep at most one newline between lines. */
export function cleanPrompt(text: string): string {
  return text
    .replace(/\n{3,}/g, "\n\n")
    .replace(/^\n+|\n+$/g, "");
}

/**
 * Generate final prompt text from config: template + placeholder replacement + cleanup.
 */
export function generatePrompt(config: PromptConfig): string {
  const template = getTemplate(config.builderMode);

  const componentsList = formatComponents(config.components);
  const componentDetails = buildComponentDetails(config.components);

  const replacements: Record<string, string> = {
    [PLACEHOLDERS.PAGE_TYPE]: config.pageType,
    [PLACEHOLDERS.FRAMEWORK]: formatFramework(config.framework),
    [PLACEHOLDERS.CSS_FRAMEWORK]: formatCssFramework(config.cssFramework),
    [PLACEHOLDERS.THEME]: config.theme,
    [PLACEHOLDERS.PRIMARY_COLOR]: config.colorScheme.primary,
    [PLACEHOLDERS.ACCENT_COLOR]: config.colorScheme.accent,
    [PLACEHOLDERS.DESIGN_STYLE]: config.designStyle,
    [PLACEHOLDERS.COMPONENTS_LIST]: componentsList,
    [PLACEHOLDERS.COMPONENT_DETAILS]: componentDetails,
    [PLACEHOLDERS.RESPONSIVE]: config.responsive ? "Responsive (mobile-first)" : "Fixed layout",
    [PLACEHOLDERS.ANIMATIONS]: config.animations ? "Include subtle animations" : "No animations",
    [PLACEHOLDERS.ACCESSIBILITY]: config.accessibility ? "WCAG-aware, semantic HTML, ARIA where needed" : "Basic markup",
    [PLACEHOLDERS.OUTPUT_FORMAT]: config.outputFormat,
  };

  let result = template;
  for (const [placeholder, value] of Object.entries(replacements)) {
    result = result.split(placeholder).join(value);
  }

  return cleanPrompt(result);
}
