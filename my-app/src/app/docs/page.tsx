import Link from "next/link";
import DocsContent from "@/components/docs/DocsContent";

export default function DocsPage() {
  return (
    <DocsContent>
      <h1>Documentation</h1>
      <p>
        Welcome to Promptus docs. Use this guide to get started, learn
        vibecoding, choose a builder, and write better prompts.
      </p>

      <h2>Overview</h2>
      <p>
        Promptus helps you generate optimized prompts for AI website builders.
        You describe your project, configure components and style, then copy or
        download a prompt tailored to Lovable, v0, Bolt, Vibecoding, or generic
        AI tools.
      </p>

      <h2>Quick Links</h2>
      <ul>
        <li>
          <Link href="/docs/getting-started">
            Getting Started
          </Link>
          — Onboarding and basic workflow.
        </li>
        <li>
          <Link href="/docs/examples">
            Examples
          </Link>
          — Real use cases and expected output.
        </li>
        <li>
          <Link href="/docs/vibecoding">
            Vibecoding Guide
          </Link>
          — Step-by-step AI-assisted development.
        </li>
        <li>
          <Link href="/docs/builders">
            AI Builders Guide
          </Link>
          — Lovable, v0, Bolt, Vibecoding, and generic builders.
        </li>
        <li>
          <Link href="/docs/prompt-guide">
            Prompt Writing Guide
          </Link>
          — How to write better prompts.
        </li>
        <li>
          <Link href="/docs/changelog">
            Changelog
          </Link>
          — Release history and updates.
        </li>
      </ul>

      <h2>Next Steps</h2>
      <p>
        Start with <Link href="/docs/getting-started">Getting Started</Link> to
        set up your first prompt, or jump to the guide that matches your
        builder.
      </p>
    </DocsContent>
  );
}
