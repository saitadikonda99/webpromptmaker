"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { toast } from "sonner";
import type { BuilderMode, PromptConfig } from "@/lib/types";
import { parseImportedConfig } from "@/lib/types";
import {
  trackEvent,
  getAnalytics,
  clearAnalytics,
  type AnalyticsEvent,
} from "@/lib/analytics";
import { generatePrompt } from "@/lib/prompt-generator";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EXPORT_FILENAME = "promptforge-config.json";

export interface PromptPreviewProps {
  config: PromptConfig;
  updateConfig: (partial: Partial<PromptConfig>) => void;
  setConfig?: (config: PromptConfig) => void;
  resetSteps?: () => void;
}

const BUILDER_MODE_OPTIONS: { value: BuilderMode; label: string }[] = [
  { value: "lovable", label: "Lovable" },
  { value: "v0", label: "v0" },
  { value: "bolt", label: "Bolt" },
  { value: "vibecoding", label: "Vibecoding" },
  { value: "generic", label: "Generic" },
];

function handleCopy(prompt: string): void {
  navigator.clipboard.writeText(prompt).then(
    () => {
      trackEvent("prompt_copied");
      toast.success("Copied to clipboard");
    },
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
      () => {
        trackEvent("share_link_created");
        toast.success("Share link copied to clipboard");
      },
      () => toast.error("Failed to copy link")
    );
  } catch {
    toast.error("Failed to create share link");
  }
}

function handleExportConfig(config: PromptConfig): void {
  try {
    const json = JSON.stringify(config, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = EXPORT_FILENAME;
    a.click();
    URL.revokeObjectURL(url);
    trackEvent("config_exported");
    toast.success("Configuration exported.");
  } catch {
    toast.error("Failed to export configuration");
  }
}

function handleImportConfig(
  file: File,
  setConfig: (config: PromptConfig) => void,
  resetSteps: () => void
): void {
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const raw = JSON.parse(reader.result as string) as unknown;
      const parsed = parseImportedConfig(raw);
      if (parsed) {
        setConfig(parsed);
        resetSteps();
        trackEvent("config_imported");
        toast.success("Configuration imported.");
      } else {
        toast.error("Invalid configuration file.");
      }
    } catch {
      toast.error("Invalid configuration file.");
    }
  };
  reader.onerror = () => toast.error("Invalid configuration file.");
  reader.readAsText(file, "utf-8");
}

export default function PromptPreview({
  config,
  updateConfig,
  setConfig,
  resetSteps,
}: PromptPreviewProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const prompt = useMemo(() => generatePrompt(config), [config]);
  const charCount = prompt.length;

  useEffect(() => {
    if (prompt.length > 0) {
      trackEvent("prompt_generated", { componentCount: config.components.length });
    }
  }, [
    config.components,
    config.pageType,
    config.framework,
    config.builderMode,
    prompt,
  ]);

  const onImportClick = () => fileInputRef.current?.click();
  const onImportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !setConfig || !resetSteps) return;
    handleImportConfig(file, setConfig, resetSteps);
  };

  const [analyticsOpen, setAnalyticsOpen] = useState(false);
  const [analyticsEvents, setAnalyticsEvents] = useState<AnalyticsEvent[]>([]);
  const openAnalytics = () => {
    setAnalyticsEvents(getAnalytics());
    setAnalyticsOpen(true);
  };
  const clearAnalyticsAndClose = () => {
    clearAnalytics();
    setAnalyticsEvents([]);
  };

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
        <input
          ref={fileInputRef}
          type="file"
          accept=".json,application/json"
          className="hidden"
          aria-hidden
          onChange={onImportChange}
        />
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
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="transition-colors duration-150"
          onClick={() => handleExportConfig(config)}
          aria-label="Export configuration as JSON"
        >
          Export Config
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="transition-colors duration-150"
          onClick={onImportClick}
          disabled={!setConfig || !resetSteps}
          aria-label="Import configuration from JSON file"
        >
          Import Config
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          className="text-muted-foreground transition-colors duration-150"
          onClick={openAnalytics}
          aria-label="View local analytics"
        >
          Analytics
        </Button>
      </footer>

      <Dialog open={analyticsOpen} onOpenChange={setAnalyticsOpen}>
        <DialogContent className="max-h-[80vh] max-w-md overflow-hidden flex flex-col" showCloseButton>
          <DialogHeader>
            <DialogTitle>Local analytics</DialogTitle>
            <p className="text-muted-foreground text-sm">
              Last {analyticsEvents.length} events (stored in this device only).
            </p>
          </DialogHeader>
          <div className="min-h-0 flex-1 overflow-y-auto rounded-none border border-border bg-muted/20 p-2">
            {analyticsEvents.length === 0 ? (
              <p className="text-muted-foreground py-4 text-center text-sm">No events yet.</p>
            ) : (
              <ul className="space-y-2 text-xs">
                {analyticsEvents.map((evt, i) => (
                  <li
                    key={`${evt.timestamp}-${i}`}
                    className="rounded-none border border-border bg-background p-2 font-mono"
                  >
                    <span className="font-semibold">{evt.name}</span>
                    <span className="text-muted-foreground ml-2">
                      {new Date(evt.timestamp).toLocaleString()}
                    </span>
                    {evt.payload != null && Object.keys(evt.payload).length > 0 && (
                      <pre className="mt-1 overflow-x-auto whitespace-pre-wrap break-words text-[10px]">
                        {JSON.stringify(evt.payload)}
                      </pre>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
          <DialogFooter showCloseButton={false}>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={clearAnalyticsAndClose}
              aria-label="Clear analytics data"
            >
              Clear
            </Button>
            <Button
              type="button"
              variant="default"
              size="sm"
              onClick={() => setAnalyticsOpen(false)}
              aria-label="Close"
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
