"use client";

import { usePromptConfig } from "@/hooks/usePromptConfig";
import ConfigPanel from "@/components/builder/ConfigPanel";
import PromptPreview from "@/components/builder/PromptPreview";

export default function Home() {
  const { config, updateConfig, toggleComponent, resetConfig } = usePromptConfig();

  return (
    <main className="flex h-screen flex-col md:flex-row overflow-hidden">
      {/* Left: Configuration */}
      <section className="flex flex-col w-full md:w-[60%] min-h-0 border-r border-border">
        <h2 className="shrink-0 px-4 py-3 text-sm font-medium text-muted-foreground border-b border-border bg-muted/30">
          Configuration
        </h2>
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
          <div className="p-4">
            <ConfigPanel
              config={config}
              updateConfig={updateConfig}
              toggleComponent={toggleComponent}
              resetConfig={resetConfig}
            />
          </div>
        </div>
      </section>

      {/* Right: Generated Prompt */}
      <section className="flex flex-col w-full md:w-[40%] min-h-0">
        <h2 className="shrink-0 px-4 py-3 text-sm font-medium text-muted-foreground border-b border-border bg-muted/30">
          Generated Prompt
        </h2>
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
          <div className="p-4">
            <PromptPreview config={config} />
          </div>
        </div>
      </section>
    </main>
  );
}
