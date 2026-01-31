import Link from "next/link";
import DocsContent from "@/components/docs/DocsContent";

const DOC_CARDS = [
  {
    href: "/docs/getting-started",
    title: "Getting Started",
    description: "Onboarding, basic workflow, and first prompt.",
  },
  {
    href: "/docs/vibecoding",
    title: "Vibecoding Guide",
    description: "Step-by-step AI-assisted development in Cursor.",
  },
  {
    href: "/docs/builders",
    title: "AI Builders Guide",
    description: "Lovable, v0, Bolt, Emergent AI, Vibecoding, and generic builders.",
  },
  {
    href: "/docs/prompt-guide",
    title: "Prompt Writing Guide",
    description: "How to write clearer, more effective prompts.",
  },
  {
    href: "/docs/examples",
    title: "Examples",
    description: "Real use cases and copyable example prompts.",
  },
  {
    href: "/docs/changelog",
    title: "Changelog",
    description: "Release history and product updates.",
  },
] as const;

export default function DocsPage() {
  return (
    <DocsContent>
      <h1>WebPromptMaker Documentation</h1>
      <p>
        WebPromptMaker helps you generate optimized prompts for AI website builders.
        Describe your project, configure components and style, then copy or
        download a prompt tailored to Lovable, v0, Bolt, Emergent AI, Vibecoding, or generic
        AI tools. This documentation explains how to get started, use each
        builder, and write better prompts.
      </p>

      <h2>Quick Start</h2>
      <ol className="space-y-2">
        <li>
          <strong>Describe your project</strong> — Use the project description
          box to explain what you&apos;re building (e.g. landing page,
          dashboard, portfolio).
        </li>
        <li>
          <strong>Configure components</strong> — Pick a preset or choose
          sections (navbar, hero, features, pricing, footer) and set framework,
          theme, and style.
        </li>
        <li>
          <strong>Generate prompt</strong> — The app builds a full prompt for
          your selected builder. Copy or download it.
        </li>
        <li>
          <strong>Build with your AI builder</strong> — Paste the prompt into
          Lovable, v0, Bolt, Emergent AI, Cursor (Vibecoding), or any generic AI builder to
          generate or refine your app.
        </li>
      </ol>

      <h2>Documentation Sections</h2>
      <p className="mb-6 text-muted-foreground">
        Jump to the guide that matches what you need.
      </p>
      <div className="grid gap-4 sm:grid-cols-2">
        {DOC_CARDS.map(({ href, title, description }) => (
          <Link
            key={href}
            href={href}
            className="group block no-underline rounded-lg border border-border/60 bg-card p-4 shadow-sm transition-colors hover:no-underline hover:border-primary/40 hover:bg-muted/30 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background"
          >
            <p className="font-semibold text-foreground group-hover:text-primary">
              {title}
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              {description}
            </p>
          </Link>
        ))}
      </div>
    </DocsContent>
  );
}
