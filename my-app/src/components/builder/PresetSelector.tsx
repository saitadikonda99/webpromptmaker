"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { PromptConfig } from "@/lib/types";
import { applyPreset, type PresetKey, PRESETS } from "@/lib/presets";
import { cn } from "@/lib/utils";

export interface PresetSelectorProps {
  config: PromptConfig;
  updateConfig: (partial: Partial<PromptConfig>) => void;
}

const PRESET_LABELS: Record<PresetKey, string> = {
  "saas-landing": "SaaS Product Landing",
  "startup-waitlist": "Startup Waitlist Page",
  "analytics-dashboard": "Analytics Dashboard",
  "developer-portfolio": "Developer Portfolio",
  "ai-tool-landing": "AI Tool Landing Page",
};

const PRESET_KEYS: PresetKey[] = [
  "saas-landing",
  "startup-waitlist",
  "analytics-dashboard",
  "developer-portfolio",
  "ai-tool-landing",
];

export default function PresetSelector({
  config,
  updateConfig,
}: PresetSelectorProps) {
  const [activeKey, setActiveKey] = useState<PresetKey | null>(null);

  function handlePreset(key: PresetKey) {
    const next = applyPreset(config, PRESETS[key]);
    updateConfig(next);
    setActiveKey(key);
    toast.success("Preset applied");
  }

  function handleClearPreset() {
    setActiveKey(null);
    toast.success("Preset cleared");
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        {PRESET_KEYS.map((key) => {
          const isSelected = activeKey === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => handlePreset(key)}
              aria-label={`Apply ${PRESET_LABELS[key]} preset`}
              aria-pressed={isSelected}
              className={cn(
                "flex flex-col items-start rounded-xl border-2 px-4 py-3 text-left transition-colors",
                isSelected
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-card hover:border-primary/50 hover:bg-muted/50 text-foreground"
              )}
            >
              <span className="font-medium">{PRESET_LABELS[key]}</span>
              <span
                className={cn(
                  "mt-0.5 text-xs",
                  isSelected ? "text-primary" : "text-muted-foreground"
                )}
              >
                {isSelected ? "Selected" : "Tap to select"}
              </span>
            </button>
          );
        })}
      </div>
      <button
        type="button"
        onClick={handleClearPreset}
        className="text-muted-foreground text-xs transition-colors hover:text-foreground"
        aria-label="Clear preset selection"
      >
        Clear preset
      </button>
    </div>
  );
}
