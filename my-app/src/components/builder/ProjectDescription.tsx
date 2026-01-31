"use client";

import type { PromptConfig } from "@/lib/types";

export interface ProjectDescriptionProps {
  config: PromptConfig;
  updateConfig: (partial: Partial<PromptConfig>) => void;
}

const PLACEHOLDER =
  "I run a digital agency and need a landing page with services, case studies, testimonials, and contact form.";

export default function ProjectDescription({
  config,
  updateConfig,
}: ProjectDescriptionProps) {
  return (
    <div className="space-y-2">
      <label
        htmlFor="project-description"
        className="text-sm font-medium text-foreground"
      >
        Describe your project
      </label>
      <textarea
        id="project-description"
        value={config.projectDescription}
        onChange={(e) => updateConfig({ projectDescription: e.target.value })}
        placeholder={PLACEHOLDER}
        rows={4}
        className="w-full resize-y rounded-xl border-2 border-border bg-card px-3 py-2.5 my-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 min-h-[100px] max-h-[240px]"
        aria-describedby="project-description-helper"
      />
      <p
        id="project-description-helper"
        className="text-xs text-muted-foreground"
      >
        Optional: describe your product for better prompts.
      </p>
    </div>
  );
}
