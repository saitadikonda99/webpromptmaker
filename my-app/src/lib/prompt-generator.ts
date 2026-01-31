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

/** Detailed component descriptions: layout, purpose, UI structure, interaction hints. */
const COMPONENT_DETAIL_MAP: Record<Component, string> = {
  navbar: "Fixed top bar. Logo (left), nav links (center/right), CTA button. Mobile: hamburger menu with slide-out drawer. Sticky on scroll.",
  sidebar: "Left-side vertical nav. Icon + label links, collapsible groups. Mobile: overlay drawer with backdrop. Active state highlighting.",
  hero: "Full-width section. Large headline (h1), supporting subtext, primary CTA button, optional secondary CTA. Background image or gradient. Centered or left-aligned layout.",
  features: "3-column responsive grid (1 col mobile, 2 col tablet, 3 col desktop). Each card: icon (top), title (h3), description paragraph. Consistent card height, subtle hover lift.",
  pricing: "2-3 tier horizontal cards. Each tier: plan name, price, feature list (checkmarks), CTA button. Highlight recommended tier with border/badge. Mobile: vertical stack.",
  faq: "Accordion component. Question as trigger, answer expands below. One open at a time or multi-open. Chevron icon rotates on toggle. Smooth height animation.",
  footer: "Multi-column layout. Logo + tagline, link groups (Product, Company, Legal), social icons row, copyright line. Mobile: stacked single column.",
  stats: "Horizontal row of metric cards (2-4). Each: large number, label, optional trend indicator (up/down arrow + percentage). Mobile: 2-column grid.",
  charts: "Chart container with title, legend, and responsive chart (line/bar/pie). Use charting library (Recharts, Chart.js). Include loading and empty states.",
  table: "Data table with column headers, sortable columns, row hover, pagination or infinite scroll. Mobile: horizontal scroll or card view. Filter/search input above.",
};

/** Build structured component detail descriptions. */
function buildComponentDetails(components: Component[]): string {
  if (components.length === 0) {
    return "";
  }
  return components
    .map((c) => `**${componentLabel(c)}:** ${COMPONENT_DETAIL_MAP[c]}`)
    .join("\n\n");
}

/** Remove repeated blank lines; keep at most one newline between lines. */
export function cleanPrompt(text: string): string {
  return text
    .replace(/\n{3,}/g, "\n\n")
    .replace(/^\n+|\n+$/g, "");
}

/**
 * Infer components to add from project description keywords.
 * Returns components to merge (no duplicates with existing selection).
 * - dashboard → stats, charts, table, sidebar
 * - portfolio → features (projects), hero, footer
 * - ecommerce → features (product grid), table, pricing
 * - blog → features (article list)
 */
export function extractIntentComponents(description: string): Component[] {
  if (!description?.trim()) return [];
  const lower = description.toLowerCase();
  const out: Component[] = [];

  if (/\bdashboard\b/.test(lower) || /\banalytics\b/.test(lower) || /\bdata\s*(heavy|viz|table)\b/.test(lower)) {
    out.push("sidebar", "stats", "charts", "table");
  }
  if (/\bportfolio\b/.test(lower) || /\bprojects\b/.test(lower) || /\bskills\b/.test(lower) || /\bcontact\b/.test(lower)) {
    out.push("hero", "features", "footer");
  }
  if (/\becommerce\b/.test(lower) || /\bstore\b/.test(lower) || /\bproduct\s*grid\b/.test(lower) || /\bcart\b/.test(lower) || /\bshop\b/.test(lower)) {
    out.push("features", "table", "pricing");
  }
  if (/\bblog\b/.test(lower) || /\barticles?\b/.test(lower) || /\bposts\b/.test(lower)) {
    out.push("features");
  }

  return [...new Set(out)];
}

/**
 * Merge user-selected components with intent-inferred ones, no duplicates.
 */
function mergeComponents(selected: Component[], inferred: Component[]): Component[] {
  const seen = new Set(selected);
  for (const c of inferred) {
    seen.add(c);
  }
  return [...seen];
}

/**
 * Generate final prompt text from config: template + placeholder replacement + cleanup.
 * Uses projectDescription for "User Intent" and merges inferred components from description.
 */
export function generatePrompt(config: PromptConfig): string {
  const template = getTemplate(config.builderMode);

  const inferred = extractIntentComponents(config.projectDescription ?? "");
  const components = mergeComponents(config.components, inferred);

  const componentsList = formatComponents(components);
  const componentDetails = buildComponentDetails(components);

  const descriptionBlock =
    config.projectDescription?.trim() ?
      `## User Intent\n"${config.projectDescription.trim()}"\n\n`
    : "";

  const replacements: Record<string, string> = {
    [PLACEHOLDERS.PROJECT_DESCRIPTION]: descriptionBlock,
    [PLACEHOLDERS.PAGE_TYPE]: config.pageType,
    [PLACEHOLDERS.FRAMEWORK]: formatFramework(config.framework),
    [PLACEHOLDERS.CSS_FRAMEWORK]: formatCssFramework(config.cssFramework),
    [PLACEHOLDERS.THEME]: config.theme,
    [PLACEHOLDERS.PRIMARY_COLOR]: config.colorScheme.primary,
    [PLACEHOLDERS.ACCENT_COLOR]: config.colorScheme.accent,
    [PLACEHOLDERS.DESIGN_STYLE]: config.designStyle,
    [PLACEHOLDERS.COMPONENTS_LIST]: componentsList,
    [PLACEHOLDERS.COMPONENT_DETAILS]: componentDetails,
    [PLACEHOLDERS.RESPONSIVE]: config.responsive 
      ? "Mobile-first responsive. Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px). Stack on mobile, expand on desktop." 
      : "Fixed desktop layout (1024px+ optimized)",
    [PLACEHOLDERS.ANIMATIONS]: config.animations 
      ? "Subtle animations: fade-in on scroll, hover scale/lift, smooth transitions (150-300ms ease-out), loading skeletons" 
      : "No animations. Static UI only.",
    [PLACEHOLDERS.ACCESSIBILITY]: config.accessibility 
      ? "WCAG 2.1 AA: semantic HTML, ARIA labels, keyboard navigation, focus indicators, color contrast 4.5:1+, screen reader friendly" 
      : "Standard HTML markup",
    [PLACEHOLDERS.OUTPUT_FORMAT]: config.outputFormat,
  };

  let result = template;
  for (const [placeholder, value] of Object.entries(replacements)) {
    result = result.split(placeholder).join(value);
  }

  return cleanPrompt(result);
}
