"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const DOC_LINKS = [
  { href: "/docs/getting-started", label: "Getting Started" },
  { href: "/docs/vibecoding", label: "Vibecoding Guide" },
  { href: "/docs/builders", label: "AI Builders Guide" },
  { href: "/docs/prompt-guide", label: "Prompt Writing Guide" },
];

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background md:flex-row">
      {/* Mobile menu button */}
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

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 shrink-0 border-r border-border/60 bg-card transition-transform duration-200 ease-out md:sticky md:top-0 md:translate-x-0 md:pt-6",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-full flex-col gap-1 overflow-y-auto px-3 pb-8 pt-4 md:pt-2">
          <Link
            href="/"
            className="mb-1 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            ← Back to app
          </Link>
          <Link
            href="/docs"
            className="mb-2 px-3 py-1.5 text-sm font-semibold text-foreground"
          >
            Promptus Docs
          </Link>
          <nav className="flex flex-col gap-0.5">
            {DOC_LINKS.map(({ href, label }) => {
              const isActive =
                pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  {label}
                </Link>
              );
            })}
          </nav>
        </div>
      </aside>

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
        <div className="mx-auto max-w-3xl px-4 py-8 md:px-8 md:py-10">
          {children}
        </div>
      </main>
    </div>
  );
}
