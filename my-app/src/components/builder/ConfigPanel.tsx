"use client";

import type { Component, PromptConfig } from "@/lib/types";
import { LayoutGrid, Braces, Layers, Palette, Sparkles } from "lucide-react";
import PresetSelector from "@/components/builder/PresetSelector";
import FrameworkSection from "@/components/sections/FrameworkSection";
import ComponentSection from "@/components/sections/ComponentSection";
import ThemeSection from "@/components/sections/ThemeSection";
import StyleSection from "@/components/sections/StyleSection";

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
    <div className="flex min-h-0 flex-1 flex-col divide-y divide-border/60">
      {/* Preset Section */}
      <section className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <LayoutGrid className="size-4 text-primary" aria-hidden />
            Preset
          </h3>
          <span className="text-xs text-muted-foreground">Choose a starting point</span>
        </div>
        <PresetSelector
          config={config}
          updateConfig={updateConfig}
          resetConfig={resetConfig}
        />
      </section>

      {/* Framework Section */}
      <section className="p-5">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Braces className="size-4 text-primary" aria-hidden />
          Framework
        </h3>
        <FrameworkSection config={config} updateConfig={updateConfig} />
      </section>

      {/* Components Section */}
      <section className="p-5">
        <h3 className="mb-4 flex items-center gap-2 text-sm font-semibold text-foreground">
          <Layers className="size-4 text-primary" aria-hidden />
          Components
        </h3>
        <ComponentSection config={config} toggleComponent={toggleComponent} />
      </section>

      {/* Theme Section */}
      <section className="p-5">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Palette className="size-4 text-primary" aria-hidden />
            Theme
          </h3>
          <span className="text-xs text-muted-foreground">Colors & mode</span>
        </div>
        <ThemeSection config={config} updateConfig={updateConfig} />
      </section>

      {/* Style Section */}
      <section className="p-5 pb-10">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-foreground">
            <Sparkles className="size-4 text-primary" aria-hidden />
            Style
          </h3>
          <span className="text-xs text-muted-foreground">Design & behavior</span>
        </div>
        <StyleSection config={config} updateConfig={updateConfig} />
      </section>
    </div>
  );
}
