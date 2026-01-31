"use client";

import type { PromptConfig } from "@/lib/types";

export interface StyleSectionProps {
  config: PromptConfig;
  updateConfig: (partial: Partial<PromptConfig>) => void;
}

export default function StyleSection({
  config,
  updateConfig,
}: StyleSectionProps) {
  return <div className="text-sm text-muted-foreground">Style controls — connected</div>;
}
