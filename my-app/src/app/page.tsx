"use client";

import { toast } from "sonner";
import { usePromptConfig } from "@/hooks/usePromptConfig";
import { generatePrompt } from "@/lib/prompt-generator";
import { copyToClipboard } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import ConfigPanel from "@/components/builder/ConfigPanel";
import PromptPreview from "@/components/builder/PromptPreview";

export default function Home() {
  const {
    config,
    updateConfig,
    toggleComponent,
    setConfig,
    resetSteps,
  } = usePromptConfig();

  const handleCopy = () => {
    const prompt = generatePrompt(config);
    copyToClipboard(prompt).then((ok) =>
      ok ? toast.success("Prompt copied") : toast.error("Failed to copy")
    );
  };

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-background">
      {/* Locust-style header */}
      <header className="flex shrink-0 items-center justify-between bg-background px-5 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight text-foreground">
            Promptus
          </span>
          <span className="text-sm text-muted-foreground">|</span>
          <span className="text-sm text-muted-foreground">AI Prompt Builder</span>
        </div>
        <nav className="flex items-center gap-3">
          <Button
            type="button"
            size="sm"
            className="rounded-xl bg-secondary font-medium text-secondary-foreground shadow-sm hover:bg-secondary/90"
            onClick={handleCopy}
            aria-label="Copy prompt"
          >
            Copy prompt
          </Button>
        </nav>
      </header>

      {/* Two columns: 50/50 split, each with own scroll */}
      <div className="flex min-h-0 flex-1 flex-col gap-0 overflow-hidden p-4 pt-0 md:flex-row md:gap-5 md:p-6 md:pt-2">
        {/* Left: Configuration — 50% width */}
        <section
          className="flex min-h-0 w-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[0_2px_8px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.04)] md:w-1/2"
          aria-label="Configuration panel"
        >
          <div className="shrink-0 border-b border-border/60 px-5 py-4">
            <h2 className="text-sm font-semibold text-foreground">
              <span className="text-muted-foreground">//</span> Configuration
            </h2>
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain">
            <ConfigPanel
              config={config}
              updateConfig={updateConfig}
              toggleComponent={toggleComponent}
            />
          </div>
        </section>

        {/* Right: Prompt — 50% width */}
        <section
          className="mt-4 flex min-h-0 min-w-0 w-full flex-col overflow-hidden rounded-2xl border border-border/60 bg-card shadow-[0_2px_8px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.04)] md:mt-0 md:w-1/2"
          aria-label="Generated prompt"
        >
          <div className="shrink-0 border-b border-border/60 px-5 py-4">
            <h2 className="text-sm font-semibold text-foreground">
              <span className="text-muted-foreground">//</span> Generated Prompt
            </h2>
          </div>
          <div className="min-h-0 min-w-0 flex-1 overflow-hidden">
            <PromptPreview
              config={config}
              updateConfig={updateConfig}
              setConfig={setConfig}
              resetSteps={resetSteps}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
