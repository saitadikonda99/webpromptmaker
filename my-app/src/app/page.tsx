"use client";

import Link from "next/link";
import { BookOpen } from "lucide-react";
import { usePromptConfig } from "@/hooks/usePromptConfig";
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

  return (
    <main className="flex min-h-screen flex-col bg-background md:h-screen md:overflow-hidden">
      {/* Header */}
      <header className="flex shrink-0 items-center justify-between bg-background px-5 py-4 md:px-8">
        <div className="flex items-center gap-3">
          <span className="text-xl font-bold tracking-tight text-foreground">
            WebPromptMaker
          </span>
          <span className="text-sm text-muted-foreground">|</span>
          <span className="text-sm text-muted-foreground">
            AI Prompt Builder
          </span>
        </div>

        <nav className="flex items-center gap-3">
          <Link href="/docs">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="rounded-xl border-border bg-card font-medium shadow-sm hover:bg-muted/50"
              aria-label="View documentation"
            >
              <BookOpen className="mr-1.5 size-4" aria-hidden />
              Docs
            </Button>
          </Link>
        </nav>
      </header>

      {/* Layout */}
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0 md:flex-row md:gap-5 md:overflow-hidden md:p-6 md:pt-2">
        
        {/* Configuration Panel */}
        <section
          className="flex w-full flex-col overflow-visible rounded-2xl border border-border/60 bg-card shadow-[0_2px_8px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.04)] md:flex-1 md:overflow-hidden"
          aria-label="Configuration panel"
        >
          <div className="shrink-0 border-b border-border/60 px-5 py-4">
            <h2 className="text-sm font-semibold text-foreground">
              <span className="text-muted-foreground">//</span> Configuration
            </h2>
          </div>

          <div className="flex-1 overflow-visible md:overflow-y-auto">
            <ConfigPanel
              config={config}
              updateConfig={updateConfig}
              toggleComponent={toggleComponent}
            />
          </div>
        </section>

        {/* Prompt Panel */}
        <section
          className="flex w-full flex-col overflow-visible rounded-2xl border border-border/60 bg-card shadow-[0_2px_8px_rgba(0,0,0,0.04),0_4px_16px_rgba(0,0,0,0.04)] md:flex-1 md:overflow-hidden"
          aria-label="Generated prompt"
        >
          <div className="shrink-0 border-b border-border/60 px-5 py-4">
            <h2 className="text-sm font-semibold text-foreground">
              <span className="text-muted-foreground">//</span> Generated Prompt
            </h2>
          </div>

          <div className="flex-1 overflow-visible md:overflow-y-auto">
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
