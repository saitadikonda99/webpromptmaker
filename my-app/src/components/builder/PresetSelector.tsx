"use client";

import type { PromptConfig } from "@/lib/types";

export interface PresetSelectorProps {
  config: PromptConfig;
  updateConfig: (partial: Partial<PromptConfig>) => void;
  resetConfig: () => void;
}

export default function PresetSelector({
  config,
  updateConfig,
  resetConfig,
}: PresetSelectorProps) {
  return <div className="text-sm text-muted-foreground">Preset controls — connected</div>;
}
