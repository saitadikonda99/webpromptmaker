import DocsContent from "@/components/docs/DocsContent";

export default function VibecodingPage() {
  return (
    <DocsContent>
      <h1>Vibecoding Guide</h1>

      <h2>What is Vibecoding?</h2>
      <p>
        Vibecoding is step-by-step AI-assisted development. Instead of asking
        the AI to build an entire app at once, you work through one small step
        at a time: generate a single step, run the builder prompt in your AI
        (e.g. Cursor), review the output, then move to the next step. This keeps
        the model focused and produces cleaner, more maintainable code.
      </p>

      <h2>Vibecoding Workflow</h2>
      <p>The process repeats for each step:</p>
      <ul>
        <li>
          <strong>Generate step</strong> — Use PromptForge in Vibecoding mode to
          get one step (e.g. &quot;STEP 2 — Navbar&quot;) with a paste-ready
          prompt and commit message.
        </li>
        <li>
          <strong>Run builder prompt</strong> — Paste the Cursor Prompt block
          into your AI builder and let it implement that step only.
        </li>
        <li>
          <strong>Review output</strong> — Check the code, fix anything needed,
          and commit using the suggested commit message.
        </li>
        <li>
          <strong>Continue to next step</strong> — Say &quot;next&quot; (or
          request the next step), then repeat until the app is complete.
        </li>
      </ul>

      <h2>Why Vibecoding Works Better</h2>
      <ul>
        <li>
          <strong>Less AI overload</strong> — One small task per step keeps
          context clear and reduces confusion or wrong assumptions.
        </li>
        <li>
          <strong>Cleaner architecture</strong> — Building in order (layout,
          then sections) encourages a logical structure instead of a big blob.
        </li>
        <li>
          <strong>Easier debugging</strong> — If something breaks, you know which
          step introduced it and can adjust that step only.
        </li>
        <li>
          <strong>Better learning</strong> — You see how each piece is built and
          can tweak prompts step by step to learn what works.
        </li>
      </ul>

      <h2>Recommended Workflow</h2>
      <p>Build in this order for a typical landing or app page:</p>
      <ol>
        <li>Layout — Set up the main layout (header, content area, footer shell).</li>
        <li>Navbar — Add navigation and mobile menu.</li>
        <li>Hero — Add hero section with headline and CTA.</li>
        <li>Features — Add feature cards or sections.</li>
        <li>Polish UI — Spacing, colors, responsiveness, and final tweaks.</li>
      </ol>

      <h2>Tips for Vibecoding</h2>
      <ul>
        <li>Always complete one step before asking for the next; don’t skip or merge steps.</li>
        <li>Use the exact &quot;Say next when done&quot; phrasing so the workflow stays consistent.</li>
        <li>Commit after each step so you can revert easily if needed.</li>
        <li>Keep the Cursor Prompt block copy-paste ready; avoid editing it mid-flow.</li>
        <li>If the AI goes off-track, paste the step again or refine the prompt and regenerate.</li>
      </ul>
    </DocsContent>
  );
}
