"use client";

import type { PromptConfig, ThemeMode } from "@/lib/types";
import { Sun, Moon, Monitor } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ThemeSectionProps {
  config: PromptConfig;
  updateConfig: (partial: Partial<PromptConfig>) => void;
}

const THEME_OPTIONS: { value: ThemeMode; label: string; icon: typeof Sun }[] = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
];

// Curated color presets for primary colors (11 colors + custom = 12 for 6x2 grid)
const PRIMARY_PRESETS = [
  { color: "#155dfc", name: "Blue" },
  { color: "#7c3aed", name: "Violet" },
  { color: "#a855f7", name: "Purple" },
  { color: "#ec4899", name: "Pink" },
  { color: "#f43f5e", name: "Rose" },
  { color: "#ef4444", name: "Red" },
  { color: "#f97316", name: "Orange" },
  { color: "#eab308", name: "Yellow" },
  { color: "#22c55e", name: "Green" },
  { color: "#14b8a6", name: "Teal" },
  { color: "#171717", name: "Black" },
];

// Curated color presets for accent colors (11 colors + custom = 12 for 6x2 grid)
const ACCENT_PRESETS = [
  { color: "#06b6d4", name: "Cyan" },
  { color: "#22c55e", name: "Green" },
  { color: "#84cc16", name: "Lime" },
  { color: "#eab308", name: "Yellow" },
  { color: "#f97316", name: "Orange" },
  { color: "#f43f5e", name: "Rose" },
  { color: "#ec4899", name: "Pink" },
  { color: "#a855f7", name: "Purple" },
  { color: "#3b82f6", name: "Blue" },
  { color: "#14b8a6", name: "Teal" },
  { color: "#737373", name: "Gray" },
];

interface ColorPickerProps {
  label: string;
  value: string;
  presets: { color: string; name: string }[];
  onChange: (color: string) => void;
}

function ColorPicker({ label, value, presets, onChange }: ColorPickerProps) {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-foreground">{label}</span>
        {/* Hex input inline with label */}
        <div className="flex items-center gap-2 rounded-lg border border-border bg-muted/50 px-2 py-1">
          <div
            className="size-4 shrink-0 rounded shadow-sm ring-1 ring-black/10"
            style={{ backgroundColor: value }}
          />
          <input
            type="text"
            value={value}
            onChange={(e) => {
              const v = e.target.value;
              if (/^#[0-9a-fA-F]{0,6}$/.test(v) || v === "") {
                onChange(v || "#000000");
              }
            }}
            onBlur={(e) => {
              const v = e.target.value;
              if (!/^#[0-9a-fA-F]{6}$/.test(v)) {
                onChange("#000000");
              }
            }}
            placeholder="#000000"
            className="w-[72px] bg-transparent font-mono text-xs text-foreground placeholder:text-muted-foreground focus:outline-none"
            maxLength={7}
          />
        </div>
      </div>

      {/* Color swatches grid - compact size */}
      <div className="grid w-fit grid-cols-6 gap-1">
        {presets.map(({ color, name }) => {
          const isSelected = value.toLowerCase() === color.toLowerCase();
          return (
            <button
              key={color}
              type="button"
              onClick={() => onChange(color)}
              title={name}
              aria-label={`Select ${name}`}
              aria-pressed={isSelected}
              className={cn(
                "group relative size-6 shrink-0 rounded-md transition-all duration-150",
                "ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
                isSelected
                  ? "ring-2 ring-primary ring-offset-0.5 z-10"
                  : "hover:ring-2 hover:ring-border hover:ring-offset-0.5"
              )}
              style={{ backgroundColor: color }}
            >
              {isSelected && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <svg
                    className="size-2.5"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke={isLightColor(color) ? "#000" : "#fff"}
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
              )}
            </button>
          );
        })}

        {/* Custom color picker button with native input overlay */}
        <label
          title="Custom color"
          aria-label="Choose custom color"
          className={cn(
            "relative size-6 shrink-0 rounded-md cursor-pointer transition-all duration-150",
            "ring-offset-background focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1",
            "hover:ring-2 hover:ring-border hover:ring-offset-0.5"
          )}
          style={{
            background: "conic-gradient(from 0deg, #ef4444, #f97316, #eab308, #22c55e, #06b6d4, #3b82f6, #8b5cf6, #ec4899, #ef4444)",
          }}
        >
          <span className="absolute inset-0.5 rounded-sm bg-card flex items-center justify-center pointer-events-none">
            <span className="text-[8px] font-bold text-muted-foreground leading-none">+</span>
          </span>
          {/* Native color input - positioned to fill the button but invisible */}
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="absolute inset-0 size-full cursor-pointer opacity-0"
          />
        </label>
      </div>
    </div>
  );
}

/** Check if a hex color is light (for contrast). */
function isLightColor(hex: string): boolean {
  const c = hex.replace("#", "");
  const r = parseInt(c.substring(0, 2), 16);
  const g = parseInt(c.substring(2, 4), 16);
  const b = parseInt(c.substring(4, 6), 16);
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return luminance > 0.5;
}

export default function ThemeSection({
  config,
  updateConfig,
}: ThemeSectionProps) {
  return (
    <div className="space-y-5">
      {/* Theme mode selector */}
      <div className="space-y-2">
        <span className="text-sm font-medium text-foreground">Theme mode</span>
        <div className="grid grid-cols-3 gap-1">
          {THEME_OPTIONS.map(({ value, label, icon: Icon }) => {
            const isSelected = config.theme === value;
            return (
              <button
                key={value}
                type="button"
                onClick={() => updateConfig({ theme: value })}
                aria-label={`Select ${label} theme`}
                aria-pressed={isSelected}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-lg border-2 px-1.5 py-1.5 text-[11px] font-medium transition-colors",
                  isSelected
                    ? "border-primary bg-primary/10 text-foreground"
                    : "border-border bg-card text-foreground hover:border-primary/50 hover:bg-muted/50"
                )}
              >
                <Icon className={cn("size-3.5", isSelected ? "text-primary" : "text-muted-foreground")} />
                <span>{label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Primary color picker */}
      <ColorPicker
        label="Primary color"
        value={config.colorScheme.primary}
        presets={PRIMARY_PRESETS}
        onChange={(color) =>
          updateConfig({
            colorScheme: { ...config.colorScheme, primary: color },
          })
        }
      />

      {/* Accent color picker */}
      <ColorPicker
        label="Accent color"
        value={config.colorScheme.accent}
        presets={ACCENT_PRESETS}
        onChange={(color) =>
          updateConfig({
            colorScheme: { ...config.colorScheme, accent: color },
          })
        }
      />
    </div>
  );
}
