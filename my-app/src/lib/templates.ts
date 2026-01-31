import type { BuilderMode } from "./types";

const PLACEHOLDERS = {
  PROJECT_DESCRIPTION: "{{PROJECT_DESCRIPTION}}",
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
{{PROJECT_DESCRIPTION}}## Project Overview
**Page type:** {{PAGE_TYPE}}
**Stack:** {{FRAMEWORK}} + {{CSS_FRAMEWORK}}
**Theme:** {{THEME}} · Primary: {{PRIMARY_COLOR}} · Accent: {{ACCENT_COLOR}} · Style: {{DESIGN_STYLE}}

## Architecture
- **Component-based structure:** One file per section, reusable UI primitives (Button, Card, Input, etc.).
- **Folder organization:**
  \`\`\`
  components/ui/    → Reusable primitives (Button, Card, Badge, etc.)
  components/       → Composite components (Navbar, Hero, etc.)
  app/ or pages/    → Route-level pages
  lib/              → Utilities, hooks, constants
  \`\`\`
- **Naming:** PascalCase for components, camelCase for functions/variables, kebab-case for files.
- **No duplication:** Extract repeated patterns into shared components.

## Design System
- **Spacing:** Consistent scale (4px base: p-4, gap-6, my-8). Sections: py-16 to py-24.
- **Typography hierarchy:** h1 (hero) → h2 (section titles) → h3 (card titles) → body text. Max line-width ~65ch for readability.
- **Colors:** Use CSS variables or theme tokens. Primary for CTAs, accent for highlights, muted for secondary text.
- **Mobile-first:** Design for 320px+ first, enhance for tablet (768px) and desktop (1024px+).

## Sections to Build
{{COMPONENTS_LIST}}

## Component Specifications
{{COMPONENT_DETAILS}}

## Requirements
- **Layout:** {{RESPONSIVE}}
- **Animations:** {{ANIMATIONS}}
- **Accessibility:** {{ACCESSIBILITY}}
- **Code quality:** Clean naming, no duplication, separation of concerns, typed props.
- **Output:** {{OUTPUT_FORMAT}}
`.trim();

const LOVABLE = `# Lovable Prompt — {{PAGE_TYPE}}

Build a **production-ready, beautifully polished** {{PAGE_TYPE}} application. Focus on design excellence and deploy-ready code.

${BASE_BODY}

## Lovable-Specific Guidelines
- **Design polish:** Pixel-perfect spacing, smooth transitions (150-300ms), subtle shadows and hover states.
- **Visual hierarchy:** Clear focus areas, balanced whitespace, consistent rhythm.
- **Production-ready:** Error states, loading states, empty states for all interactive components.
- **Micro-interactions:** Button hover/active states, input focus rings, smooth accordion/dropdown animations.
- **Ship-ready:** No placeholder content—use realistic copy and images.
`.trim();

const V0 = `# v0 Prompt — {{PAGE_TYPE}}

Generate a **high-quality, modern** {{PAGE_TYPE}} UI following v0 and shadcn/ui patterns.

${BASE_BODY}

## v0-Specific Guidelines
- **Use shadcn/ui components:** Button, Card, Input, Dialog, Sheet, Tabs, etc. Import from \`@/components/ui\`.
- **App Router patterns:** Use \`app/\` directory, Server Components by default, \`"use client"\` only when needed.
- **TypeScript:** Strict types, interfaces for props, no \`any\`. Use \`React.FC\` or typed function components.
- **Styling:** Tailwind CSS with \`cn()\` utility for conditional classes. Follow shadcn/ui class conventions.
- **File structure:**
  \`\`\`
  app/              → Routes and layouts
  components/ui/    → shadcn/ui primitives
  components/       → Feature components
  lib/utils.ts      → cn() and helpers
  \`\`\`
- **Patterns:** Composition over inheritance, forwardRef for reusable components, Radix primitives for accessibility.
`.trim();

const BOLT = `# Bolt Prompt — {{PAGE_TYPE}}

Create a **full-stack** {{PAGE_TYPE}} application optimized for rapid iteration and clear structure.

${BASE_BODY}

## Bolt-Specific Guidelines
- **Full-stack structure:**
  \`\`\`
  app/
    api/            → API routes (Route Handlers)
    (routes)/       → Page routes
  components/       → UI components
  lib/
    db.ts           → Database client
    actions.ts      → Server actions
  \`\`\`
- **API routes:** Use Next.js Route Handlers (\`route.ts\`) for REST endpoints. Return typed JSON responses.
- **Server Actions:** Use \`"use server"\` for mutations. Validate input, handle errors gracefully.
- **Data fetching:** Server Components fetch data directly. Client Components use SWR or React Query.
- **Database:** Prisma or Drizzle ORM. Type-safe queries, migrations for schema changes.
- **Error handling:** Try-catch in API routes, error boundaries in UI, user-friendly error messages.
`.trim();

const VIBECODING_BODY = `
## Project Overview
**Page type:** {{PAGE_TYPE}}
**Stack:** {{FRAMEWORK}} + {{CSS_FRAMEWORK}}
**Theme:** {{THEME}} · Primary: {{PRIMARY_COLOR}} · Accent: {{ACCENT_COLOR}} · Style: {{DESIGN_STYLE}}

## Sections to Build
{{COMPONENTS_LIST}}

## Component Specifications
{{COMPONENT_DETAILS}}

---

## Project Structure
\`\`\`
components/
  ui/           → Reusable primitives (Button, Card, Input)
  [SectionName].tsx → Section components (Navbar, Hero, etc.)
app/ or pages/  → Route-level pages
lib/            → Utilities, hooks, constants
styles/         → Global CSS, theme tokens
\`\`\`

## Development Order
1. **Project setup** — Initialize project, install dependencies, folder structure.
2. **Layout shell** — Create main layout with header/sidebar/content areas.
3. **Sections** — Build each section in order: {{COMPONENTS_LIST}}
4. **Styling pass** — Apply {{CSS_FRAMEWORK}} classes, theme colors, spacing.
5. **Responsiveness** — Mobile breakpoints, touch targets, overflow handling.
6. **Polish** — Animations, hover states, loading states, final QA.

---

## Cursor Workflow Format

**Each step must follow this exact structure:**

\`\`\`
✅ STEP [N] — [Section/Task Name]

🧠 Cursor Prompt
\`\`\`
[Paste-ready instructions for Cursor. Be specific:
- What component to create
- What props/structure it needs
- Layout and styling requirements
- Mobile behavior
- No code—only clear builder instructions]
\`\`\`

✅ Commit Message
\`\`\`
[type]: [short description]
\`\`\`

Say **next** when done.
\`\`\`

---

## Rules
- **One step at a time.** Never reveal future steps.
- **No code.** Output only builder instructions that Cursor can execute.
- **Paste-ready prompts.** The Cursor Prompt block should be copy-paste ready.
- **Consistent format.** Every step uses the exact structure above.
- **Specific instructions.** Include layout, spacing, colors, responsive behavior.

---

## Settings
- **Layout:** {{RESPONSIVE}}
- **Animations:** {{ANIMATIONS}}
- **Accessibility:** {{ACCESSIBILITY}}
- **Output:** {{OUTPUT_FORMAT}}

---

## Start
Output **STEP 1** now. Follow the format exactly. End with "Say **next** when done."
`.trim();

const VIBECODING = `# Vibecoding Workflow — {{PAGE_TYPE}}

You are a **Cursor workflow mentor**. Guide the developer through building a {{PAGE_TYPE}} application step-by-step.

**Output format:** Structured steps only. No conversational text. Each step: ✅ STEP N — Title, 🧠 Cursor Prompt (in code block), ✅ Commit Message (in code block), "Say next when done."

**Critical rules:**
- Show **ONE step at a time**
- **Never output code** — only builder instructions
- **Paste-ready prompts** — specific, actionable, no ambiguity
- **Consistent formatting** every step

${VIBECODING_BODY}
`.trim();

const GENERIC = `# {{PAGE_TYPE}} Application

Build a **professional, well-structured** {{PAGE_TYPE}} application with clean architecture and maintainable code.

${BASE_BODY}

## General Best Practices
- **Framework-agnostic patterns:** Use standard component patterns that work across React, Vue, Svelte.
- **State management:** Local state for UI, lift state up for shared data, context/stores for global state.
- **Separation of concerns:** UI components separate from business logic and data fetching.
- **Performance:** Lazy-load heavy components, optimize images, minimize bundle size.
- **Testing:** Components should be testable in isolation. Pure functions for utilities.
- **Documentation:** Clear component props, JSDoc for complex functions, README for setup.
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
