"use client";

import type { Component, PromptConfig } from "@/lib/types";

export interface ConfigPanelProps {
  config: PromptConfig;
  updateConfig: (partial: Partial<PromptConfig>) => void;
  toggleComponent: (component: Component) => void;
  resetConfig: () => void;
}

export default function ConfigPanel({
  config,
  updateConfig,
  toggleComponent,
  resetConfig,
}: ConfigPanelProps) {
  return (
    <div className="space-y-6">
      {/* Placeholder: config controls will go here */}
      <p className="text-sm text-muted-foreground">
        Config panel — framework: {config.framework}, theme: {config.theme}
      </p>
    </div>
  );
}
