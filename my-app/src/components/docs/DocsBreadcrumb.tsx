"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { DOC_PAGES } from "@/lib/docs-nav";
import { cn } from "@/lib/utils";

export default function DocsBreadcrumb() {
  const pathname = usePathname();

  if (pathname === "/docs") return null;

  const current = DOC_PAGES.find((p) => p.href === pathname);
  const currentLabel = current?.label ?? formatSegment(pathname);

  function formatSegment(path: string): string {
    const segment = path.split("/").filter(Boolean).pop() ?? "";
    return segment
      .split("-")
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(" ");
  }

  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-4 flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground"
    >
      <Link
        href="/docs"
        className="shrink-0 transition-colors hover:text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background rounded"
      >
        Docs
      </Link>
      <span aria-hidden className="shrink-0 select-none">
        /
      </span>
      <span
        className={cn(
          "min-w-0 truncate font-medium text-foreground"
        )}
      >
        {currentLabel}
      </span>
    </nav>
  );
}
