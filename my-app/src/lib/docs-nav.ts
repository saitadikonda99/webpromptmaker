/** Ordered list of docs pages for navigation and search. */
export const DOC_PAGES = [
  { href: "/docs", label: "Documentation" },
  { href: "/docs/getting-started", label: "Getting Started" },
  { href: "/docs/examples", label: "Examples" },
  { href: "/docs/vibecoding", label: "Vibecoding Guide" },
  { href: "/docs/builders", label: "AI Builders Guide" },
  { href: "/docs/prompt-guide", label: "Prompt Writing Guide" },
  { href: "/docs/changelog", label: "Changelog" },
] as const;

export const DOCS_ORDER = DOC_PAGES.map((p) => p.href);

/** Sidebar nav links (all except index). */
export const DOC_SIDEBAR_LINKS = DOC_PAGES.slice(1);

export function getPrevNext(pathname: string): {
  prev: (typeof DOC_PAGES)[number] | null;
  next: (typeof DOC_PAGES)[number] | null;
} {
  const index = (DOCS_ORDER as readonly string[]).indexOf(pathname);
  if (index < 0) return { prev: null, next: null };
  return {
    prev: index > 0 ? DOC_PAGES[index - 1]! : null,
    next: index < DOC_PAGES.length - 1 ? DOC_PAGES[index + 1]! : null,
  };
}

export function filterDocsByQuery(
  query: string
): readonly { href: string; label: string }[] {
  const q = query.trim().toLowerCase();
  if (!q) return DOC_SIDEBAR_LINKS;
  return DOC_SIDEBAR_LINKS.filter((p) =>
    p.label.toLowerCase().includes(q)
  );
}
