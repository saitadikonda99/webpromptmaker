"use client";

import type { Component, PromptConfig } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
    <div className="flex flex-1 min-h-0 flex-col">
      <header className="sticky top-0 z-10 shrink-0 border-b border-border bg-background px-4 py-3">
        <h2 className="text-sm font-medium text-foreground">Configuration</h2>
      </header>

      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
        <div className="space-y-6 p-4 pb-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Preset</CardTitle>
            </CardHeader>
            <CardContent>
              <PresetSelector
                config={config}
                updateConfig={updateConfig}
                resetConfig={resetConfig}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Framework</CardTitle>
            </CardHeader>
            <CardContent>
              <FrameworkSection config={config} updateConfig={updateConfig} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Components</CardTitle>
            </CardHeader>
            <CardContent>
              <ComponentSection
                config={config}
                toggleComponent={toggleComponent}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Theme</CardTitle>
            </CardHeader>
            <CardContent>
              <ThemeSection config={config} updateConfig={updateConfig} />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-base">Style</CardTitle>
            </CardHeader>
            <CardContent>
              <StyleSection config={config} updateConfig={updateConfig} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
