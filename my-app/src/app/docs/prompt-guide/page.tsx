import DocsContent from "@/components/docs/DocsContent";

export default function PromptGuidePage() {
  return (
    <DocsContent>
      <h1>Prompt Writing Guide</h1>

      <h2>Why Good Prompts Matter</h2>
      <p>
        Better prompts lead to better AI output. When you clearly describe
        what you want—components, style, and behavior—the builder can produce
        more accurate, maintainable code. Vague or overloaded prompts often
        result in generic or messy output. Spending a minute on structure pays
        off in the final result.
      </p>

      <h2>Good Prompt Structure</h2>
      <p>Effective prompts for AI website builders usually include:</p>
      <ul>
        <li>
          <strong>What to build</strong> — A short summary (e.g. landing page
          for a SaaS, portfolio, dashboard) so the AI knows the overall goal.
        </li>
        <li>
          <strong>Components needed</strong> — Which sections to include:
          navbar, hero, features, pricing, footer, etc. This avoids missing or
          extra sections.
        </li>
        <li>
          <strong>Design style</strong> — Minimal, modern, brutalist, or other.
          Mention colors or mood if it matters (e.g. dark theme, blue accent).
        </li>
        <li>
          <strong>Behavior requirements</strong> — Responsive layout, animations,
          accessibility, or specific interactions (e.g. contact form, waitlist).
        </li>
      </ul>

      <h2>Example Good Prompt</h2>
      <p>Here&apos;s a structured project description suitable for a landing page:</p>
      <blockquote>
        I need a landing page for a B2B SaaS product. Include a sticky navbar
        with logo and CTA, a hero with headline and subheadline, a features
        section with three cards (icons + titles + short descriptions), a
        pricing section with two tiers, an FAQ accordion, and a footer with
        links and copyright. Use a modern, minimal style with a blue primary
        color. Mobile-first responsive, subtle hover animations, and
        accessible markup (semantic HTML, ARIA where needed).
      </blockquote>
      <p>
        This gives the AI a clear scope (landing, B2B SaaS), a full component
        list, style (modern, minimal, blue), and behavior (responsive,
        animations, accessibility).
      </p>

      <h2>Common Mistakes</h2>
      <ul>
        <li>
          <strong>Too vague prompts</strong> — &quot;Make a website&quot; or
          &quot;Build something cool&quot; give the AI little to work with.
          Specify page type, key sections, and style.
        </li>
        <li>
          <strong>Asking for everything at once</strong> — Long, unfocused
          prompts can confuse the model. Break big projects into steps
          (e.g. with Vibecoding) or focus on one page or flow at a time.
        </li>
        <li>
          <strong>Missing layout details</strong> — If you care about
          responsiveness, structure, or specific components, say so. Otherwise
          you may get a desktop-only or generic layout.
        </li>
      </ul>

      <h2>Tips for Better Results</h2>
      <ul>
        <li>Start with one sentence: what is this page or app for?</li>
        <li>List the sections you want (navbar, hero, features, etc.) so nothing is forgotten.</li>
        <li>Mention design style and one or two behavior needs (responsive, dark mode, animations).</li>
        <li>Use WebPromptMaker&apos;s project description and presets to get a structured prompt, then tweak.</li>
        <li>For step-by-step control, use Vibecoding mode and one section per step.</li>
      </ul>
    </DocsContent>
  );
}
