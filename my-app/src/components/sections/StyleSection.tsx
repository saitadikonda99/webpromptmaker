"use client";

import type { DesignStyle, PromptConfig } from "@/lib/types";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
      <h3 className="text-sm font-medium text-foreground">
        Style & Behavior
      </h3>

      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="design-style" className="text-foreground">
            Design style
          </Label>
          <Select
            value={config.designStyle}
            onValueChange={(value) =>
              updateConfig({ designStyle: value as DesignStyle })
            }
          >
            <SelectTrigger id="design-style" className="w-full">
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

        <div className="space-y-3">
          <Label className="text-foreground">Features</Label>
          <ul className="flex flex-col gap-3">
            {FEATURE_TOGGLES.map(({ key, label }) => (
              <li key={key} className="flex items-center gap-3">
                <Checkbox
                  id={`style-${key}`}
                  checked={config[key]}
                  onCheckedChange={(checked) =>
                    updateConfig({ [key]: checked === true })
                  }
                />
                <Label
                  htmlFor={`style-${key}`}
                  className="cursor-pointer font-normal text-foreground"
                >
                  {label}
                </Label>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
