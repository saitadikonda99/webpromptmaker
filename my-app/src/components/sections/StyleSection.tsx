"use client";

import type { DesignStyle, PromptConfig } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

export interface StyleSectionProps {
  config: PromptConfig;
  updateConfig: (partial: Partial<PromptConfig>) => void;
}

const DESIGN_STYLE_OPTIONS: { value: DesignStyle; label: string }[] = [
  { value: "minimal", label: "Minimal" },
  { value: "modern", label: "Modern" },
  { value: "brutalist", label: "Brutalist" },
  { value: "glassmorphism", label: "Glassmorphism" },
  { value: "neubrutalism", label: "Neubrutalism" },
];

const FEATURE_TOGGLES: {
  key: keyof Pick<PromptConfig, "animations" | "responsive" | "accessibility" | "seo">;
  label: string;
}[] = [
  { key: "animations", label: "Animations" },
  { key: "responsive", label: "Responsive" },
  { key: "accessibility", label: "Accessibility" },
  { key: "seo", label: "SEO" },
];

export default function StyleSection({
  config,
  updateConfig,
}: StyleSectionProps) {
  return (
    <div className="space-y-4">
        <div className="space-y-2">
          <span className="text-sm font-medium text-foreground">Design style</span>
          <Select
            value={config.designStyle}
            onValueChange={(value) =>
              updateConfig({ designStyle: value as DesignStyle })
            }
          >
            <SelectTrigger id="design-style" className="w-full rounded-xl border-2 border-border my-2">
              <SelectValue placeholder="Select style" />
            </SelectTrigger>
            <SelectContent>
              {DESIGN_STYLE_OPTIONS.map(({ value, label }) => (
                <SelectItem key={value} value={value}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Features: button-style options (same as Framework / tech stack) */}
        <div className="space-y-3">
          <span className="text-sm font-medium text-foreground">Features</span>
          <div className="flex flex-col gap-2 my-2">
            {FEATURE_TOGGLES.map(({ key, label }) => {
              const isSelected = config[key];
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => updateConfig({ [key]: !isSelected })}
                  aria-label={isSelected ? `Disable ${label}` : `Enable ${label}`}
                  aria-pressed={isSelected}
                  className={cn(
                    "flex w-full items-center rounded-xl border-2 px-4 py-2.5 text-left text-sm font-medium transition-colors",
                    isSelected
                      ? "border-primary bg-primary/10 text-foreground"
                      : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-muted/50"
                  )}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      </div>
  );
}
