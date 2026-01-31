import DocsContent from "@/components/docs/DocsContent";
import CopyBlock from "@/components/docs/CopyBlock";

export default function ExamplesPage() {
  return (
    <DocsContent>
      <h1>Promptus Examples</h1>
      <p>
        See how Promptus prompts translate into real builds. Each example shows
        a typical use case: what you describe, what structure you get, and how
        to use it in your builder. Copy the example prompts below to try them
        in the app.
      </p>

      <h2>SaaS Landing Page</h2>
      <p>
        A marketing page for a B2B product with clear value proposition and
        conversion focus.
      </p>
      <CopyBlock
        label="Example project description"
        content={`SaaS tool for team analytics. Need a landing page with hero, features grid, pricing tiers, testimonials, and contact CTA.`}
      />
      <ul>
        <li>
          <strong>Generated structure:</strong> Hero with headline and CTA,
          features section (3–6 items), pricing table or cards, testimonial
          strip, footer with signup or contact. Navbar and optional footer
          links.
        </li>
        <li>
          <strong>Builder output:</strong> Paste into Lovable, v0, or Bolt; you
          get a single-page landing layout ready to connect to your backend or
          auth.
        </li>
      </ul>

      <h2>Startup Waitlist Page</h2>
      <p>
        Simple one-section page to collect emails and explain the product in a
        few lines.
      </p>
      <CopyBlock
        label="Example project description"
        content={`AI writing assistant launching soon. Waitlist page with short pitch and email signup.`}
      />
      <ul>
        <li>
          <strong>Components:</strong> Hero (or single section) with headline,
          subtext, and email input; optional logo and social links. Minimal
          navbar or no navbar.
        </li>
        <li>
          <strong>Builder output:</strong> A focused page you can deploy and
          hook up to a mailing list or form backend.
        </li>
      </ul>

      <h2>Developer Portfolio</h2>
      <p>
        Personal site to showcase projects, skills, and contact. Promptus
        helps you get a clean, scannable layout.
      </p>
      <CopyBlock
        label="Example project description"
        content={`Developer portfolio: about me, skills, project cards with links and tech stack, contact form.`}
      />
      <ul>
        <li>
          <strong>How prompts create the layout:</strong> The app suggests
          sections like hero, about, projects grid, and contact. You pick
          &quot;portfolio&quot; as page type and add components (e.g. stats,
          cards, footer). Generated prompt describes section order, content
          placeholders, and style (e.g. minimal, dark).
        </li>
        <li>
          <strong>Result:</strong> A prompt that tells the builder to produce
          a portfolio-style page with consistent spacing, project cards, and
          CTA to contact—ready to fill with your real content.
        </li>
      </ul>

      <h2>Dashboard App</h2>
      <p>
        Internal tool or admin UI with sidebar, stats, tables, and charts.
        Ideal for a step-by-step Vibecoding flow.
      </p>
      <CopyBlock
        label="Example project description"
        content={`Analytics dashboard: sidebar nav, header, KPI cards, chart area, data table with filters.`}
      />
      <ul>
        <li>
          <strong>Dashboard Vibecoding flow:</strong> Choose the Vibecoding
          builder and a dashboard-style preset. Promptus outputs a prompt
          broken into steps (e.g. layout shell → sidebar → stats → chart →
          table). You paste step-by-step into Cursor, say &quot;next when
          done&quot;, and the AI builds one piece at a time.
        </li>
        <li>
          <strong>Expected output:</strong> A dashboard layout with sidebar
          navigation, header, stat cards, chart placeholder, and a table
          section—all described so the builder can generate consistent
          components and styling.
        </li>
      </ul>
    </DocsContent>
  );
}
