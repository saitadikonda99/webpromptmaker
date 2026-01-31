"use client";

import { useEffect } from "react";
import { toast } from "sonner";
import { usePromptConfig } from "@/hooks/usePromptConfig";
import { generatePrompt } from "@/lib/prompt-generator";
import ConfigPanel from "@/components/builder/ConfigPanel";
import PromptPreview from "@/components/builder/PromptPreview";

export default function Home() {
  const { config, updateConfig, toggleComponent, resetConfig } = usePromptConfig();

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      const isMod = e.metaKey || e.ctrlKey;
      const target = e.target as HTMLElement;
      const inInput =
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.isContentEditable;

      if (isMod && e.key === "c" && !inInput) {
        e.preventDefault();
        const prompt = generatePrompt(config);
        navigator.clipboard.writeText(prompt).then(
          () => toast.success("Prompt copied"),
          () => toast.error("Failed to copy")
        );
      }
      if (isMod && e.key === "r") {
        e.preventDefault();
        resetConfig();
        toast.success("Configuration reset");
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [config, resetConfig]);

  return (
    <main className="flex h-screen flex-col overflow-hidden md:flex-row">
      {/* Left: Configuration */}
      <section
        className="flex min-h-0 w-full flex-col border-r border-border md:w-[60%] animate-in fade-in duration-200"
        aria-label="Configuration panel"
      >
        <ConfigPanel
          config={config}
          updateConfig={updateConfig}
          toggleComponent={toggleComponent}
          resetConfig={resetConfig}
        />
      </section>

      {/* Right: Generated Prompt */}
      <section
        className="flex min-h-0 w-full flex-col md:w-[40%] animate-in fade-in duration-200"
        aria-label="Generated prompt"
      >
        <h2 className="shrink-0 border-b border-border bg-muted/30 px-4 py-3 text-sm font-medium text-muted-foreground">
          Generated Prompt
        </h2>
        <div className="min-h-0 flex-1 overflow-x-hidden overflow-y-auto scroll-smooth">
          <div className="p-4">
            <PromptPreview config={config} updateConfig={updateConfig} />
          </div>
        </div>
      </section>
    </main>
  );
}
