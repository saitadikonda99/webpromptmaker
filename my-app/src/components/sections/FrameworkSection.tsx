"use client";

import type { PromptConfig } from "@/lib/types";

export interface FrameworkSectionProps {
  config: PromptConfig;
  updateConfig: (partial: Partial<PromptConfig>) => void;
}

export default function FrameworkSection({
  config,
  updateConfig,
}: FrameworkSectionProps) {
  return <div className="text-sm text-muted-foreground">Framework controls — connected</div>;
}
