"use client";

import Link from "next/link";
import { Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export interface DocsHeaderProps {
  /** Current search query (controlled). */
  searchValue: string;
  /** Called when search input changes. */
  onSearchChange: (value: string) => void;
  /** Called when mobile menu button is clicked. */
  onMenuClick: () => void;
  /** Optional class name for the header root. */
  className?: string;
}

export default function DocsHeader({
  searchValue,
  onSearchChange,
  onMenuClick,
  className,
}: DocsHeaderProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-20 flex shrink-0 items-center gap-3 border-b border-border/60 bg-background/95 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:px-6",
        className
      )}
    >
      {/* Mobile menu button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        onClick={onMenuClick}
        aria-label="Open sidebar"
        className="shrink-0 rounded-lg md:hidden"
      >
        <Menu className="size-5" />
      </Button>

      {/* Docs title / logo */}
      <Link
        href="/docs"
        className="shrink-0 text-sm font-semibold text-foreground transition-opacity hover:opacity-80"
      >
        WebPromptMaker Docs
      </Link>

      {/* Search input */}
      <div className="relative flex-1 max-w-md">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground"
          aria-hidden
        />
        <input
          type="search"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search docs..."
          aria-label="Search documentation"
          className="w-full rounded-lg border border-border bg-muted/30 py-2 pl-9 pr-3 text-sm text-foreground placeholder:text-muted-foreground transition-colors focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
        />
      </div>
    </header>
  );
}
