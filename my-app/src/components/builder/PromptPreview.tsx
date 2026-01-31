"use client";

import { useMemo } from "react";
import { toast } from "sonner";
import type { BuilderMode, PromptConfig } from "@/lib/types";
import { generatePrompt } from "@/lib/prompt-generator";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export interface PromptPreviewProps {
  config: PromptConfig;
  updateConfig: (partial: Partial<PromptConfig>) => void;
}

const BUILDER_MODE_OPTIONS: { value: BuilderMode; label: string }[] = [
  { value: "lovable", label: "Lovable" },
  { value: "v0", label: "v0" },
  { value: "bolt", label: "Bolt" },
  { value: "cursor", label: "Cursor" },
  { value: "chatgpt", label: "ChatGPT" },
  { value: "generic", label: "Generic" },
];

function handleCopy(prompt: string): void {
  navigator.clipboard.writeText(prompt).then(
    () => toast.success("Copied to clipboard"),
    () => toast.error("Failed to copy")
  );
}

function handleDownload(prompt: string): void {
  const blob = new Blob([prompt], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "prompt.txt";
  a.click();
  URL.revokeObjectURL(url);
  toast.success("Downloaded prompt.txt");
}

function handleShare(config: PromptConfig): void {
  if (typeof window === "undefined") return;
  try {
    const json = JSON.stringify(config);
    const base64 = btoa(unescape(encodeURIComponent(json)));
    const encoded = encodeURIComponent(base64);
    const url = `${window.location.origin}${window.location.pathname}?config=${encoded}`;
    navigator.clipboard.writeText(url).then(
      () => toast.success("Share link copied to clipboard"),
      () => toast.error("Failed to copy link")
    );
  } catch {
    toast.error("Failed to create share link");
  }
}

export default function PromptPreview({
  config,
  updateConfig,
}: PromptPreviewProps) {
  const prompt = useMemo(() => generatePrompt(config), [config]);
  const charCount = prompt.length;

  return (
    <div className="flex h-full min-h-0 flex-col gap-4 animate-in fade-in duration-200">
      <header className="space-y-3">
        <h3 className="text-sm font-medium text-foreground">
          Generated Prompt
        </h3>
        <Select
          value={config.builderMode}
          onValueChange={(value) =>
            updateConfig({ builderMode: value as BuilderMode })
          }
        >
          <SelectTrigger
            className="w-full transition-colors duration-150"
            id="builder-mode"
            aria-label="Builder mode"
          >
            <SelectValue placeholder="Builder mode" />
          </SelectTrigger>
          <SelectContent>
            {BUILDER_MODE_OPTIONS.map(({ value, label }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </header>

      <div className="flex min-h-0 flex-1 flex-col gap-2">
        {config.components.length === 0 && (
          <p
            className="text-muted-foreground shrink-0 rounded-none border border-dashed border-border bg-muted/20 px-3 py-4 text-center text-sm"
            role="status"
          >
            Select components to generate a prompt.
          </p>
        )}
        <textarea
          readOnly
          value={prompt}
          className="border-input bg-muted/30 font-mono text-xs leading-relaxed w-full flex-1 min-h-[200px] resize-none overflow-auto rounded-none border p-3 outline-none transition-opacity duration-150"
          spellCheck={false}
          aria-label="Generated prompt"
        />
        <p className="text-muted-foreground shrink-0 text-xs">
          {charCount.toLocaleString()} character{charCount !== 1 ? "s" : ""}
        </p>
      </div>

      <footer className="flex shrink-0 flex-wrap items-center gap-2 border-t border-border pt-4">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="transition-colors duration-150"
          onClick={() => handleCopy(prompt)}
          aria-label="Copy prompt to clipboard"
        >
          Copy
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="transition-colors duration-150"
          onClick={() => handleDownload(prompt)}
          aria-label="Download prompt as text file"
        >
          Download .txt
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="transition-colors duration-150"
          onClick={() => handleShare(config)}
          aria-label="Copy share link to clipboard"
        >
          Share link
        </Button>
      </footer>
    </div>
  );
}
