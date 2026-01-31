"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import DocsHeader from "@/components/docs/DocsHeader";
import DocsSidebar from "@/components/docs/DocsSidebar";
import DocsPageNav from "@/components/docs/DocsPageNav";
import DocsToc from "@/components/docs/DocsToc";
import DocsHeadingAnchors from "@/components/docs/DocsHeadingAnchors";
import DocsBreadcrumb from "@/components/docs/DocsBreadcrumb";

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="flex h-screen flex-col overflow-hidden bg-background lg:flex-row">
      {/* Sidebar: drawer on mobile/tablet, visible only from lg so docs content gets full width until then */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-64 shrink-0 transition-transform duration-200 ease-out lg:sticky lg:top-0 lg:h-screen lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <DocsSidebar
          onNavigate={() => setSidebarOpen(false)}
          searchQuery={searchQuery}
          className="h-full max-h-screen"
        />
      </div>

      {/* Overlay when sidebar open on mobile/tablet (hidden at lg when sidebar is in flow) */}
      {sidebarOpen && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-30 bg-black/20 transition-opacity lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main: header fixed, only content area scrolls */}
      <main className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <DocsHeader
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <div className="flex min-h-0 flex-1 gap-0 overflow-hidden lg:gap-4">
          <div
            id="docs-content"
            className="min-h-0 min-w-0 flex-1 overflow-y-auto scrollbar-hide px-4 py-8 md:px-8 md:py-10 max-w-3xl"
          >
            <DocsBreadcrumb />
            <DocsHeadingAnchors />
            {children}
            <DocsPageNav />
          </div>
          <DocsToc />
        </div>
      </main>
    </div>
  );
}
