"use client";

import type { PromptConfig } from "@/lib/types";

export interface ThemeSectionProps {
  config: PromptConfig;
  updateConfig: (partial: Partial<PromptConfig>) => void;
}

export default function ThemeSection({
  config,
  updateConfig,
}: ThemeSectionProps) {
  return <div className="text-sm text-muted-foreground">Theme controls — connected</div>;
}
