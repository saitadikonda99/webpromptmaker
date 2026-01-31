import type { BuilderMode } from "./types";

const PLACEHOLDERS = {
  PAGE_TYPE: "{{PAGE_TYPE}}",
  FRAMEWORK: "{{FRAMEWORK}}",
  CSS_FRAMEWORK: "{{CSS_FRAMEWORK}}",
  THEME: "{{THEME}}",
  PRIMARY_COLOR: "{{PRIMARY_COLOR}}",
  ACCENT_COLOR: "{{ACCENT_COLOR}}",
  DESIGN_STYLE: "{{DESIGN_STYLE}}",
  COMPONENTS_LIST: "{{COMPONENTS_LIST}}",
  COMPONENT_DETAILS: "{{COMPONENT_DETAILS}}",
  IMPLEMENTATION_STEPS: "{{IMPLEMENTATION_STEPS}}",
  RESPONSIVE: "{{RESPONSIVE}}",
  ANIMATIONS: "{{ANIMATIONS}}",
  ACCESSIBILITY: "{{ACCESSIBILITY}}",
  OUTPUT_FORMAT: "{{OUTPUT_FORMAT}}",
} as const;

const BASE_BODY = `
**Page type:** {{PAGE_TYPE}}

**Stack:** {{FRAMEWORK}} with {{CSS_FRAMEWORK}} for styling.

**Theme:** {{THEME}}. Primary color: {{PRIMARY_COLOR}}, accent: {{ACCENT_COLOR}}. Design style: {{DESIGN_STYLE}}.

**Sections to build (component-based):** {{COMPONENTS_LIST}}

{{COMPONENT_DETAILS}}

**Requirements:**
- Use a component-based architecture: one component per section, reusable UI primitives, clear separation of concerns.
- Write clean, production-ready code. Prefer composition over duplication.
- Layout: {{RESPONSIVE}}
- Animations: {{ANIMATIONS}}
- Accessibility: {{ACCESSIBILITY}}
- Output: {{OUTPUT_FORMAT}}
`.trim();

const LOVABLE = `You are building a production-ready {{PAGE_TYPE}} app. Ship something users can deploy and iterate on quickly.

${BASE_BODY}
`.trim();

const V0 = `Generate a high-quality {{PAGE_TYPE}} UI. Follow modern patterns and v0-style component structure.

${BASE_BODY}
`.trim();

const BOLT = `Create a {{PAGE_TYPE}} experience optimized for the Bolt stack. Focus on fast iteration and clear structure.

${BASE_BODY}
`.trim();

const VIBECODING_BODY = `
**Page type:** {{PAGE_TYPE}}

**Stack:** {{FRAMEWORK}} with {{CSS_FRAMEWORK}} for styling.

**Theme:** {{THEME}}. Primary color: {{PRIMARY_COLOR}}, accent: {{ACCENT_COLOR}}. Design style: {{DESIGN_STYLE}}.

**Sections to build (component-based):** {{COMPONENTS_LIST}}

{{COMPONENT_DETAILS}}

---

**Development Flow** (build in this order):
1. Create components — one file per section, reusable primitives.
2. Build layout — compose sections into the main page/layout.
3. Add sections — wire each section into the layout in order.
4. Connect styles — apply {{CSS_FRAMEWORK}}, theme, and design tokens.
5. Finalize responsiveness — breakpoints, touch targets, overflow.

---

**Project Structure** (expected folders):
\`\`\`
components/   # Shared UI primitives (Button, Card, etc.)
sections/     # Page sections (Navbar, Hero, Features, etc.)
pages/        # Route-level pages that compose sections
styles/       # Global CSS, theme, design tokens
\`\`\`

---

**Implementation step order** (use this order; show ONE step at a time):
Layout first → then sections in order: navbar, sidebar, stats, charts, table, hero, features, pricing, faq, footer → then polish. Only include steps for sections the user selected: {{COMPONENTS_LIST}}

---

**Cursor workflow format** (use this exact structure for every step):

1. Step header:
✅ STEP X — [Title]

2. Cursor Prompt section:
🧠 Cursor Prompt
Output implementation instructions inside a single code block. No conversational text inside the block — only the prompt the developer pastes into Cursor.

3. Commit Message section:
✅ Commit Message
Provide the commit message inside a code block.

4. Ending line:
Say next when done.

**Rules**
- Only show ONE step at a time. Never reveal future steps.
- Never output code (no implementation code). Only builder instructions.
- Maintain consistent formatting for every step.
- No conversational text inside the Cursor Prompt code block.

**Example (Step 1):**

✅ STEP 1 — Setup Dashboard Layout

🧠 Cursor Prompt

\`\`\`
Create {{PAGE_TYPE}} layout with Navbar, Sidebar and main content area. Use {{FRAMEWORK}} and {{CSS_FRAMEWORK}}. Layout must support responsive collapse for sidebar. Set up folders: components/, sections/, pages/, styles/.
\`\`\`

✅ Commit Message

\`\`\`
chore: add dashboard layout and folder structure
\`\`\`

Say next when done.

---

**Output**
Show ONLY the first step. Use the Cursor workflow format above. One step at a time. Never future steps. Never code. Only builder instructions. End with "Say next when done." Layout: {{RESPONSIVE}}. Animations: {{ANIMATIONS}}. Accessibility: {{ACCESSIBILITY}}. Format: {{OUTPUT_FORMAT}}
`.trim();

const VIBECODING = `You are a Cursor workflow mentor for a {{PAGE_TYPE}} application. Output must follow Cursor-style step guidance only — not conversational instructions. Use the exact format: ✅ STEP X — Title, 🧠 Cursor Prompt (instructions in a code block), ✅ Commit Message (in a code block), Say next when done. Show only ONE step at a time. Never reveal future steps. Never output code. Only builder instructions. Consistent formatting every step.

${VIBECODING_BODY}
`.trim();

const GENERIC = `Produce a professional {{PAGE_TYPE}} application. Use a component-based architecture and write clean, reusable code.

${BASE_BODY}
`.trim();

const TEMPLATES: Record<BuilderMode, string> = {
  lovable: LOVABLE,
  v0: V0,
  bolt: BOLT,
  vibecoding: VIBECODING,
  generic: GENERIC,
};

/**
 * Returns the prompt template for the given builder mode.
 * Templates include placeholders for page type, framework, theme, colors, design style,
 * components list and details, responsive/animations/accessibility, and output format.
 * Falls back to vibecoding for unknown/legacy modes (e.g. chatgpt, cursor).
 */
export function getTemplate(builderMode: BuilderMode | string): string {
  return builderMode in TEMPLATES
    ? TEMPLATES[builderMode as BuilderMode]
    : TEMPLATES.vibecoding;
}

export { PLACEHOLDERS };
