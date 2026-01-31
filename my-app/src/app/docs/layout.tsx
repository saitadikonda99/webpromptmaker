"use client";

import { useState } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import DocsSidebar from "@/components/docs/DocsSidebar";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background md:flex-row">
      {/* Mobile header with menu button */}
      <div className="flex shrink-0 items-center gap-2 border-b border-border/60 bg-background px-4 py-3 md:hidden">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen((o) => !o)}
          aria-label={sidebarOpen ? "Close sidebar" : "Open sidebar"}
          className="rounded-lg"
        >
          {sidebarOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
        <Link
          href="/docs"
          className="text-sm font-semibold text-foreground"
        >
          Promptus Docs
        </Link>
      </div>

      {/* Sidebar: fixed overlay on mobile, sticky on desktop */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 shrink-0 transition-transform duration-200 ease-out md:sticky md:top-0 md:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <DocsSidebar
          onNavigate={() => setSidebarOpen(false)}
          className="h-full"
        />
      </div>

      {/* Overlay when sidebar open on mobile */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-black/20 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <main className="min-h-0 flex-1 overflow-y-auto">
        <div className="max-w-3xl px-4 py-8 md:px-8 md:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
