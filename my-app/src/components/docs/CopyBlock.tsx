"use client";

import { useState } from "react";
import { Copy } from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import { copyToClipboard } from "@/lib/utils";

export interface CopyBlockProps {
  /** Content to display and copy (exact string is copied to clipboard). */
  content: string;
  /** Optional label above the block (e.g. "Example prompt"). */
  label?: string;
  /** Optional class name for the wrapper. */
  className?: string;
}

export default function CopyBlock({
  content,
  label,
  className,
}: CopyBlockProps) {
  const [copied, setCopied] = useState(false);

  async function handleCopy() {
    const ok = await copyToClipboard(content);
    if (ok) {
      toast.success("Copied to clipboard");
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error("Failed to copy");
    }
  }

  return (
    <div
      className={cn(
        "docs-copy-block relative mt-2 mb-4 overflow-hidden rounded-lg border border-[var(--docs-code-border)] bg-[var(--docs-code-bg)]",
        className
      )}
    >
      {label ? (
        <div className="border-b border-[var(--docs-code-border)] px-3 py-1.5 text-xs font-medium text-muted-foreground">
          {label}
        </div>
      ) : null}
      <div className="relative">
        <pre className="overflow-x-hidden px-4 py-3 pr-12 text-left font-mono text-[0.8125rem] leading-relaxed text-[var(--docs-code-fg)] break-all whitespace-pre-wrap">
          <code className="block break-all">{content}</code>
        </pre>
        <button
          type="button"
          onClick={handleCopy}
          className={cn(
            "absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-md border border-[var(--docs-code-border)] bg-[var(--docs-code-bg)] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-[var(--docs-code-bg)]",
            copied && "border-primary/50 text-primary"
          )}
          aria-label="Copy to clipboard"
          title="Copy"
        >
          <Copy
            className={cn("size-4", copied && "text-primary")}
            aria-hidden
          />
        </button>
      </div>
    </div>
  );
}
