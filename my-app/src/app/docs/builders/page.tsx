import DocsContent from "@/components/docs/DocsContent";

export default function BuildersPage() {
  return (
    <DocsContent>
      <h1>AI Website Builders Guide</h1>

      <h2>Supported Builders</h2>
      <p>
        WebPromptMaker supports multiple AI website builders. Each builder mode
        tailors the generated prompt to that tool&apos;s conventions and
        strengths. Supported builders:
      </p>
      <ul>
        <li>Lovable</li>
        <li>v0</li>
        <li>Bolt</li>
        <li>Emergent AI</li>
        <li>Vibecoding workflow</li>
        <li>Generic AI builders</li>
      </ul>

      <h2>Lovable Usage</h2>
      <p>
        Lovable is good for landing pages and fast UI generation. Prompts
        emphasize design polish, production-ready components, and deploy-ready
        code. Use Lovable mode when you want a polished, marketing-style page
        or app with minimal setup.
      </p>

      <h2>v0 Usage</h2>
      <p>
        v0 works well for Next.js and shadcn/ui apps. Prompts assume App Router,
        Server Components, and shadcn/ui components from <code>@/components/ui</code>.
        Use v0 mode when you&apos;re building a Next.js app with shadcn/ui and
        want prompts that match v0&apos;s patterns.
      </p>

      <h2>Bolt Usage</h2>
      <p>
        Bolt is aimed at full-stack and API-driven apps. Prompts include
        structure for API routes, server actions, and data fetching. Use Bolt
        mode when you need backend logic, database access, or server-side
        behavior in addition to the UI.
      </p>

      <h2>Emergent AI Usage</h2>
      <p>
        Emergent AI is for modern, production-ready apps with clean structure
        and fast iteration. Prompts emphasize component patterns, styling
        consistency, and deploy-ready output. Use Emergent AI mode when you
        want prompts tailored to Emergent AI&apos;s conventions and workflow.
      </p>

      <h2>Vibecoding Usage</h2>
      <p>
        Vibecoding is a step-by-step builder workflow (often used with Cursor).
        Prompts are split into discrete steps: layout, then each section (e.g.
        Navbar, Hero, Features), then polish. Use Vibecoding mode when you want
        to build incrementally and avoid overloading the AI with one huge prompt.
      </p>

      <h2>Generic Builders</h2>
      <p>
        Generic mode produces prompts that work in ChatGPT, Claude, or other
        conversational AI tools. The output is framework-agnostic and focuses on
        clear structure and requirements. Use Generic when you&apos;re pasting
        into a general-purpose AI that isn&apos;t tied to Lovable, v0, Bolt, or Emergent AI.
      </p>

      <h2>Choosing the Right Builder</h2>
      <ul>
        <li>
          <strong>Lovable</strong> — Landing pages, marketing sites, fast
          polished UI. Pick Lovable mode and paste into Lovable.
        </li>
        <li>
          <strong>v0</strong> — Next.js + shadcn/ui. Pick v0 mode and use the
          prompt in v0 or a similar Next.js–focused builder.
        </li>
        <li>
          <strong>Bolt</strong> — Full-stack, APIs, server actions. Pick Bolt
          mode when you need backend and data in the same flow.
        </li>
        <li>
          <strong>Emergent AI</strong> — Modern apps, clean structure, production-ready. Pick Emergent AI mode when building with Emergent AI.
        </li>
        <li>
          <strong>Vibecoding</strong> — Step-by-step in Cursor (or similar). Pick
          Vibecoding mode and follow one step at a time.
        </li>
        <li>
          <strong>Generic</strong> — ChatGPT, Claude, or any general AI. Pick
          Generic mode when the target isn&apos;t a dedicated website builder.
        </li>
      </ul>
    </DocsContent>
  );
}
