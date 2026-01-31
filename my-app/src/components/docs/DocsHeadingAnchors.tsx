"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

const CONTENT_ID = "docs-content";

const linkIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>`;

function addAnchors(container: HTMLElement) {
  const headings = container.querySelectorAll<HTMLHeadingElement>("h2[id], h3[id]");
  headings.forEach((heading) => {
    if (heading.closest(".docs-heading-wrapper")) return;
    const id = heading.getAttribute("id");
    if (!id) return;

    const wrapper = document.createElement("div");
    wrapper.className = "docs-heading-wrapper";
    heading.parentNode?.insertBefore(wrapper, heading);
    wrapper.appendChild(heading);

    const anchor = document.createElement("a");
    anchor.className = "docs-heading-anchor";
    anchor.href = `#${id}`;
    anchor.setAttribute("aria-label", "Copy section link");
    anchor.innerHTML = linkIconSvg;
    anchor.addEventListener("click", (e) => {
      e.preventDefault();
      const url = `${window.location.origin}${window.location.pathname}#${id}`;
      navigator.clipboard.writeText(url).then(
        () => toast.success("Link copied to clipboard"),
        () => toast.error("Failed to copy link")
      );
    });
    wrapper.insertBefore(anchor, heading);
  });
}

export default function DocsHeadingAnchors() {
  const pathname = usePathname();

  useEffect(() => {
    const container = document.getElementById(CONTENT_ID);
    if (!container) return;
    const rafId = requestAnimationFrame(() => addAnchors(container));
    return () => {
      cancelAnimationFrame(rafId);
      container.querySelectorAll(".docs-heading-wrapper").forEach((w) => {
        const parent = w.parentNode;
        if (!parent) return;
        const heading = w.querySelector("h2, h3");
        if (heading) parent.insertBefore(heading, w);
        w.remove();
      });
    };
  }, [pathname]);

  return null;
}
