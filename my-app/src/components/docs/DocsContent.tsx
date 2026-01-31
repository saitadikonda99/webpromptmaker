import { cn } from "@/lib/utils";

export interface DocsContentProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Wrapper for documentation page content. Provides centered layout,
 * max width for readability, and consistent typography via .docs-content styles.
 */
export default function DocsContent({ children, className }: DocsContentProps) {
  return (
    <article
      className={cn(
        "docs-content w-full",
        "leading-relaxed text-foreground",
        className
      )}
    >
      {children}
    </article>
  );
}
