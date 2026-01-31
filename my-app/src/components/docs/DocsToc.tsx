"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const CONTENT_ID = "docs-content";
const MIN_HEADINGS = 2;

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    || "section";
}

export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

export interface DocsTocProps {
  className?: string;
}

export default function DocsToc({ className }: DocsTocProps) {
  const pathname = usePathname();
  const [items, setItems] = useState<TocItem[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  // Scan headings and assign ids when pathname or container content changes
  useEffect(() => {
    function scanHeadings() {
      const container = document.getElementById(CONTENT_ID);
      if (!container) {
        setItems([]);
        return;
      }
      const headings = container.querySelectorAll<HTMLHeadingElement>("h2, h3");
      const seen = new Set<string>();
      const toc: TocItem[] = [];
      headings.forEach((el, i) => {
        const text = el.textContent?.trim() || "";
        let slug = slugify(text);
        if (!slug) slug = `section-${i}`;
        if (seen.has(slug)) {
          let n = 1;
          while (seen.has(`${slug}-${n}`)) n++;
          slug = `${slug}-${n}`;
        }
        seen.add(slug);
        if (!el.id) el.id = slug;
        toc.push({
          id: slug,
          text,
          level: el.tagName === "H2" ? 2 : 3,
        });
      });
      setItems(toc);
      setActiveId(toc[0]?.id ?? null);
    }

    scanHeadings();
    // Rescan after paint so client-rendered / late content (e.g. /docs index) is picked up
    let raf2Id: number | null = null;
    const raf1Id = requestAnimationFrame(() => {
      raf2Id = requestAnimationFrame(scanHeadings);
    });
    // Extra rescan for /docs index so "On this page" reliably shows Quick Start + Documentation Sections
    const timeoutId =
      pathname === "/docs"
        ? window.setTimeout(scanHeadings, 150)
        : undefined;
    const container = document.getElementById(CONTENT_ID);
    const mo = container
      ? new MutationObserver(() => {
          scanHeadings();
        })
      : null;
    if (container && mo) {
      mo.observe(container, { childList: true, subtree: true });
    }
    return () => {
      cancelAnimationFrame(raf1Id);
      if (raf2Id !== null) cancelAnimationFrame(raf2Id);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
      mo?.disconnect();
    };
  }, [pathname]);

  // Intersection Observer: highlight visible section (root = scroll container so last heading works)
  useEffect(() => {
    if (items.length === 0) return;
    const raw = document.getElementById(CONTENT_ID);
    if (!raw) return;
    const containerEl: HTMLElement = raw;

    function setActiveFromVisible() {
      const containerRect = containerEl.getBoundingClientRect();
      const topOffset = 100;
      // When scrolled to bottom, prefer last section so it stays highlighted
      const nearBottom =
        items.length > 0 &&
        containerEl.scrollHeight - containerEl.scrollTop - containerEl.clientHeight < 80;
      if (nearBottom && items.length > 0) {
        setActiveId(items[items.length - 1].id);
        return;
      }
      let best: { id: string; top: number } | null = null;
      for (const { id } of items) {
        const el = document.getElementById(id);
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        const relativeTop = rect.top - containerRect.top;
        if (relativeTop <= topOffset && (best === null || relativeTop > best.top)) {
          best = { id, top: relativeTop };
        } else if (
          relativeTop > topOffset &&
          rect.bottom > containerRect.top &&
          (best === null || relativeTop < best.top)
        ) {
          best = { id, top: relativeTop };
        }
      }
      if (best) setActiveId(best.id);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length === 0) return;
        const byTop = [...intersecting].sort(
          (a, b) =>
            (a.boundingClientRect?.top ?? 0) - (b.boundingClientRect?.top ?? 0)
        );
        const id = byTop[0]?.target.id;
        if (id) setActiveId(id);
      },
      {
        root: containerEl,
        rootMargin: "-80px 0px 0px 0px",
        threshold: [0, 0.1, 0.5, 1],
      }
    );

    items.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    requestAnimationFrame(setActiveFromVisible);
    containerEl.addEventListener("scroll", setActiveFromVisible, { passive: true });
    const raf = requestAnimationFrame(() => setActiveFromVisible());

    return () => {
      observer.disconnect();
      containerEl.removeEventListener("scroll", setActiveFromVisible);
      cancelAnimationFrame(raf);
    };
  }, [items]);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  if (items.length < MIN_HEADINGS) return null;

  return (
    <aside
      className={cn(
        "hidden h-full w-52 shrink-0 flex-col pl-8 pt-8 lg:flex",
        "overflow-hidden",
        className
      )}
      aria-label="On this page"
    >
      <nav className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto scrollbar-hide border-l border-border/60 pl-2 pb-8">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          On this page
        </p>
        {items.map(({ id, text, level }) => (
          <a
            key={id}
            href={`#${id}`}
            onClick={(e) => handleClick(e, id)}
            className={cn(
              "block rounded-r py-1.5 pr-2 text-sm transition-colors duration-150 -ml-px",
              level === 3 && "pl-3",
              activeId === id
                ? "font-medium text-primary border-l-2 border-primary pl-3 bg-primary/5"
                : "border-l-2 border-transparent pl-3 text-muted-foreground hover:bg-muted/50 hover:text-foreground"
            )}
          >
            {text}
          </a>
        ))}
      </nav>
    </aside>
  );
}
