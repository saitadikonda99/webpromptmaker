"use client";

import { useMemo, useRef } from "react";
import { toast } from "sonner";
import type { BuilderMode, PromptConfig } from "@/lib/types";
import { parseImportedConfig } from "@/lib/types";
import { generatePrompt } from "@/lib/prompt-generator";
import { copyToClipboard } from "@/lib/utils";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Download, Share2, FileJson, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const EXPORT_FILENAME = "webpromptmaker-config.json";

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
  { value: "emergent", label: "Emergent AI" },
  { value: "vibecoding", label: "Vibecoding" },
  { value: "generic", label: "Generic" },
];

function handleCopy(prompt: string): void {
  copyToClipboard(prompt).then((ok) => {
    if (ok) toast.success("Copied to clipboard");
    else toast.error("Failed to copy");
  });
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

  const onImportClick = () => fileInputRef.current?.click();
  const onImportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file || !setConfig || !resetSteps) return;
    handleImportConfig(file, setConfig, resetSteps);
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      {/* Builder mode + character count */}
      <div className="flex shrink-0 items-center justify-between gap-3 border-b border-border/60 bg-muted/20 px-5 py-3">
        <Select
          value={config.builderMode}
          onValueChange={(value) =>
            updateConfig({ builderMode: value as BuilderMode })
          }
        >
          <SelectTrigger
            className="h-9 w-[160px] rounded-xl border-2 border-border bg-card text-sm font-medium shadow-sm"
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
        <span className="rounded-lg bg-primary/10 px-3 py-1 text-sm font-medium tabular-nums text-primary">
          {charCount.toLocaleString()} chars
        </span>
      </div>

      {/* Full-height markdown / code-editor style viewer (dark theme) — selectable, only this area scrolls */}
      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden overscroll-contain select-text">
        {config.components.length === 0 ? (
          <div
            className="flex h-full min-h-[200px] items-center justify-center border-b border-border/50 bg-muted/10 px-4"
            role="status"
          >
            <p className="text-muted-foreground text-center text-sm">
              Select components in Configuration to generate a prompt.
            </p>
          </div>
        ) : (
          <div className="border-border/50 bg-[#1e1e1e] font-mono text-[13px] leading-[1.6] text-[#d4d4d4] selection:bg-[#264f78] select-text cursor-text">
            <div className="p-4 select-text">
              <article className="prose prose-invert max-w-none select-text prose-headings:font-semibold prose-headings:text-[#d4d4d4] prose-p:my-2 prose-ul:my-2 prose-li:my-0.5 prose-strong:text-[#fff] prose-code:rounded prose-code:bg-[#2d2d2d] prose-code:px-1.5 prose-code:py-0.5 prose-code:text-[#d4d4d4] prose-code:before:content-none prose-code:after:content-none prose-pre:my-2 prose-pre:rounded prose-pre:bg-[#2d2d2d] prose-pre:border prose-pre:border-[#404040] prose-pre:p-3 prose-pre:text-[13px]">
                <ReactMarkdown
                  remarkPlugins={[remarkGfm]}
                  components={{
                    p: ({ children }) => (
                      <p className="mb-2 leading-relaxed">{children}</p>
                    ),
                    strong: ({ children }) => (
                      <strong className="font-semibold text-[#fff]">{children}</strong>
                    ),
                    ul: ({ children }) => (
                      <ul className="my-2 list-inside list-disc space-y-0.5">{children}</ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="my-2 list-inside list-decimal space-y-0.5">{children}</ol>
                    ),
                    li: ({ children }) => (
                      <li className="leading-relaxed">{children}</li>
                    ),
                    code: ({ className, children, ...props }) => {
                      const isBlock = className?.includes("language-");
                      if (isBlock) {
                        return (
                          <pre className="my-2 overflow-x-auto rounded border border-[#404040] bg-[#2d2d2d] p-3 text-[13px]">
                            <code {...props}>{children}</code>
                          </pre>
                        );
                      }
                      return (
                        <code
                          className="rounded bg-[#2d2d2d] px-1.5 py-0.5"
                          {...props}
                        >
                          {children}
                        </code>
                      );
                    },
                    pre: ({ children }) => (
                      <pre className="my-2 overflow-x-auto rounded border border-[#404040] bg-[#2d2d2d] p-3 text-[13px]">
                        {children}
                      </pre>
                    ),
                    h1: ({ children }) => (
                      <h1 className="mb-2 mt-4 text-lg font-semibold text-[#fff] first:mt-0">
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2 className="mb-2 mt-3 text-base font-semibold text-[#d4d4d4]">
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="mb-1 mt-2 text-sm font-semibold text-[#d4d4d4]">
                        {children}
                      </h3>
                    ),
                    hr: () => <hr className="my-3 border-[#404040]" />,
                  }}
                >
                  {prompt}
                </ReactMarkdown>
              </article>
            </div>
          </div>
        )}
      </div>

      {/* Sticky action bar - Locust-style buttons */}
      <footer className="flex shrink-0 flex-wrap items-center gap-2 border-t border-border/60 bg-muted/20 px-5 py-3">
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
          size="sm"
          className="rounded-xl bg-secondary font-medium text-secondary-foreground shadow-sm hover:bg-secondary/90"
          onClick={() => handleCopy(prompt)}
          aria-label="Copy prompt to clipboard"
        >
          <Copy className="mr-1.5 size-4" aria-hidden />
          Copy
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-xl border-2 border-border bg-card font-medium shadow-sm hover:bg-muted/50"
          onClick={() => handleDownload(prompt)}
          aria-label="Download prompt as text file"
        >
          <Download className="mr-1.5 size-4" aria-hidden />
          Download
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-xl border-2 border-border bg-card font-medium shadow-sm hover:bg-muted/50"
          onClick={() => handleShare(config)}
          aria-label="Copy share link to clipboard"
        >
          <Share2 className="mr-1.5 size-4" aria-hidden />
          Share
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-xl border-2 border-border bg-card font-medium shadow-sm hover:bg-muted/50"
          onClick={() => handleExportConfig(config)}
          aria-label="Export configuration as JSON"
        >
          <FileJson className="mr-1.5 size-4" aria-hidden />
          Export
        </Button>
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="rounded-xl border-2 border-border bg-card font-medium shadow-sm hover:bg-muted/50"
          onClick={onImportClick}
          disabled={!setConfig || !resetSteps}
          aria-label="Import configuration from JSON file"
        >
          <Upload className="mr-1.5 size-4" aria-hidden />
          Import
        </Button>
      </footer>
    </div>
  );
}
