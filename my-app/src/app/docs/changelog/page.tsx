import DocsContent from "@/components/docs/DocsContent";

export default function ChangelogPage() {
  return (
    <DocsContent>
      <h1>Changelog</h1>
      <p>
        Notable updates and features. New entries are added at the top; add
        new sections below for future releases.
      </p>

      <h2>v1.1 — Intent Improvements</h2>
      <ul>
        <li>Project description support</li>
        <li>Context-aware components</li>
        <li>Improved prompts</li>
      </ul>

      <h2>v1.0 — Initial Release</h2>
      <ul>
        <li>Vibecoding workflow added</li>
        <li>Builder prompt generation</li>
        <li>Presets system</li>
        <li>Docs system</li>
        <li>Clean prompt UI</li>
      </ul>
    </DocsContent>
  );
}
