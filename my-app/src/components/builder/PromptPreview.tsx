"use client";

import type { PromptConfig } from "@/lib/types";

export interface PromptPreviewProps {
  config: PromptConfig;
}

export default function PromptPreview({ config }: PromptPreviewProps) {
  return (
    <div className="space-y-4">
      {/* Placeholder: generated prompt output will go here */}
      <p className="text-sm text-muted-foreground">
        Preview — pageType: {config.pageType}, components: {config.components.join(", ")}
      </p>
    </div>
  );
}
