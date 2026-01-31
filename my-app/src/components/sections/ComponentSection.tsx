"use client";

import type { Component, PromptConfig } from "@/lib/types";

export interface ComponentSectionProps {
  config: PromptConfig;
  toggleComponent: (component: Component) => void;
}

export default function ComponentSection({
  config,
  toggleComponent,
}: ComponentSectionProps) {
  return <div className="text-sm text-muted-foreground">Component toggles — connected</div>;
}
