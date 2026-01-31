import DocsContent from "@/components/docs/DocsContent";

export default function GettingStartedPage() {
  return (
    <DocsContent>
      <h1>Getting Started with PromptForge</h1>

      <h2>What is PromptForge?</h2>
      <p>
        PromptForge generates optimized prompts for AI website builders. You
        describe your project, pick components and style, and get ready-to-paste
        prompts tailored to your chosen builder (Lovable, v0, Bolt, Vibecoding,
        or generic AI).
      </p>

      <h2>How PromptForge Works</h2>
      <p>
        The workflow is simple: describe your project in your own words,
        configure page type and components, then generate prompts. Use those
        prompts in your AI builder to generate or refine your app, and iterate
        as needed.
      </p>

      <h2>Basic Workflow</h2>
      <ol>
        <li>
          <strong>Describe project</strong> — Use the project description box to
          explain what you’re building (e.g. landing page, dashboard, portfolio).
          Optional keywords like &quot;dashboard&quot; or &quot;portfolio&quot;
          can add relevant sections automatically.
        </li>
        <li>
          <strong>Configure components</strong> — Choose a preset or pick
          components (navbar, hero, features, pricing, footer, etc.) and set
          framework, theme, and style.
        </li>
        <li>
          <strong>Generate prompts</strong> — The app builds a full prompt for
          your selected builder. Copy or download it.
        </li>
        <li>
          <strong>Use prompts in builder</strong> — Paste the prompt into
          Lovable, v0, Bolt, Cursor (Vibecoding), or any generic AI builder to
          generate or refine your app.
        </li>
        <li>
          <strong>Iterate</strong> — Adjust description and config, regenerate,
          and paste again until you’re happy with the result.
        </li>
      </ol>

      <h2>Supported Builders</h2>
      <p>PromptForge can tailor prompts for:</p>
      <ul>
        <li>Lovable</li>
        <li>v0</li>
        <li>Bolt</li>
        <li>Vibecoding (Cursor)</li>
        <li>Generic AI builders</li>
      </ul>

      <h2>Tips for Best Results</h2>
      <ul>
        <li>Write a clear project description; it influences both the prompt text and suggested components.</li>
        <li>Pick the builder mode that matches where you’ll paste the prompt (Lovable, v0, Bolt, Vibecoding, or Generic).</li>
        <li>Start with a preset, then tweak components and style instead of building from scratch.</li>
        <li>Use &quot;Copy&quot; or &quot;Download&quot; to save the prompt and paste it in one go.</li>
        <li>For Vibecoding, follow the step-by-step format and use &quot;Say next when done&quot; between steps.</li>
      </ul>
    </DocsContent>
  );
}
