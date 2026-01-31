"use client";

import { useState } from "react";
import { toast } from "sonner";
import type { PromptConfig } from "@/lib/types";
import { applyPreset, type PresetKey, PRESETS } from "@/lib/presets";
import { trackEvent } from "@/lib/analytics";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface PresetSelectorProps {
  config: PromptConfig;
  updateConfig: (partial: Partial<PromptConfig>) => void;
  resetConfig: () => void;
}

const PRESET_LABELS: Record<PresetKey, string> = {
  "saas-landing": "SaaS Landing",
  "indie-dashboard": "Indie Dashboard",
  "ai-waitlist": "AI Waitlist",
  "developer-portfolio": "Developer Portfolio",
  "notion-dashboard": "Notion Dashboard",
};

const PRESET_KEYS: PresetKey[] = [
  "saas-landing",
  "indie-dashboard",
  "ai-waitlist",
  "developer-portfolio",
  "notion-dashboard",
];

export default function PresetSelector({
  config,
  updateConfig,
  resetConfig,
}: PresetSelectorProps) {
  const [activeKey, setActiveKey] = useState<PresetKey | null>(null);

  function handlePreset(key: PresetKey) {
    const next = applyPreset(config, PRESETS[key]);
    updateConfig(next);
    setActiveKey(key);
    trackEvent("preset_applied", { preset: key });
    toast.success("Preset applied");
  }

  function handleReset() {
    resetConfig();
    setActiveKey(null);
    toast.success("Configuration reset");
  }

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {PRESET_KEYS.map((key) => (
          <Button
            key={key}
            type="button"
            variant={activeKey === key ? "default" : "outline"}
            size="sm"
            className={cn(
              "h-auto py-2 text-left font-normal transition-colors duration-150",
              activeKey === key && "ring-2 ring-primary ring-offset-2"
            )}
            onClick={() => handlePreset(key)}
            aria-label={`Apply ${PRESET_LABELS[key]} preset`}
            aria-pressed={activeKey === key}
          >
            {PRESET_LABELS[key]}
          </Button>
        ))}
      </div>
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="text-muted-foreground transition-colors duration-150"
        onClick={handleReset}
        aria-label="Reset configuration to default"
      >
        Reset to default
      </Button>
    </div>
  );
}
