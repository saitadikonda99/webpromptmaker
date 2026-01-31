"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { filterDocsByQuery } from "@/lib/docs-nav";

export interface DocsSidebarProps {
  /** Called when a nav link is clicked (e.g. to close mobile drawer). */
  onNavigate?: () => void;
  /** Optional class name for the root aside. */
  className?: string;
  /** Optional search query to filter nav links by title. */
  searchQuery?: string;
}

export default function DocsSidebar({
  onNavigate,
  className,
  searchQuery = "",
}: DocsSidebarProps) {
  const pathname = usePathname();
  const links = filterDocsByQuery(searchQuery);

  return (
    <aside
      className={cn(
        "flex h-full w-64 shrink-0 flex-col border-r border-border/60 bg-card",
        className
      )}
    >
      <div className="flex flex-col gap-1 overflow-y-auto scrollbar-hide px-3 pb-8 pt-4">
        <Link
          href="/"
          className="mb-1 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          ← Back to app
        </Link>
        <h2 className="px-3 py-2 text-sm font-semibold text-foreground">
          WebPromptMaker Docs
        </h2>
        <nav className="flex flex-col gap-0.5" aria-label="Documentation">
          {links.length === 0 ? (
            <p className="px-3 py-2 text-xs text-muted-foreground">
              No matching pages.
            </p>
          ) : (
            links.map(({ href, label }) => {
              const isActive =
                pathname === href || pathname.startsWith(href + "/");
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={onNavigate}
                  className={cn(
                    "rounded-lg px-3 py-2 text-sm font-medium transition-colors duration-150",
                    isActive
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  )}
                >
                  {label}
                </Link>
              );
            })
          )}
        </nav>
      </div>
    </aside>
  );
}
