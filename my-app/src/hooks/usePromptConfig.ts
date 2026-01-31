"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  type Component,
  type PromptConfig,
  DEFAULT_CONFIG,
} from "@/lib/types";

const STORAGE_KEY = "promptus-prompt-config";

function isPlainObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isStringArray(value: unknown): value is string[] {
  return Array.isArray(value) && value.every((v) => typeof v === "string");
}

/**
 * Light validation: ensure parsed data has required shape. Merges with DEFAULT_CONFIG
 * so missing or invalid fields are replaced. Returns null if parsing fails or shape is invalid.
 */
export function decodeConfig(encoded: string): PromptConfig | null {
  try {
    const decoded = decodeURIComponent(encoded);
    const raw = atob(decoded);
    const parsed = JSON.parse(raw) as unknown;
    if (!isPlainObject(parsed)) return null;
    if (!("version" in parsed) || !("framework" in parsed) || !("components" in parsed)) return null;
    if (!isStringArray(parsed.components)) return null;
    return { ...DEFAULT_CONFIG, ...parsed } as PromptConfig;
  } catch {
    return null;
  }
}

/**
 * Encode config to base64 for URL or clipboard. Safe for UTF-8.
 */
export function encodeConfig(config: PromptConfig): string {
  const json = JSON.stringify(config);
  return btoa(unescape(encodeURIComponent(json)));
}

function getConfigFromUrl(): PromptConfig | null {
  if (typeof window === "undefined") return null;
  try {
    const params = new URLSearchParams(window.location.search);
    const encoded = params.get("config");
    if (!encoded) return null;
    return decodeConfig(encoded);
  } catch {
    return null;
  }
}

function loadConfigFromStorage(): PromptConfig {
  if (typeof window === "undefined") return DEFAULT_CONFIG;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_CONFIG;
    const parsed = JSON.parse(raw) as unknown;
    if (
      isPlainObject(parsed) &&
      "version" in parsed &&
      "framework" in parsed &&
      "components" in parsed &&
      isStringArray(parsed.components)
    ) {
      return { ...DEFAULT_CONFIG, ...parsed } as PromptConfig;
    }
  } catch {
    // Invalid or missing; use default
  }
  return DEFAULT_CONFIG;
}

function saveConfigToStorage(config: PromptConfig): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
  } catch {
    // Ignore storage errors (e.g. quota, private mode)
  }
}

export function usePromptConfig() {
  // Initialize with DEFAULT_CONFIG so server and client first paint match (avoids hydration mismatch).
  const [config, setConfigState] = useState<PromptConfig>(DEFAULT_CONFIG);
  const skipNextSave = useRef(true);

  // On mount: load from URL first, then localStorage, else keep default. Do not auto-update URL.
  useEffect(() => {
    const urlConfig = getConfigFromUrl();
    if (urlConfig) {
      setConfigState(urlConfig);
    } else {
      setConfigState(loadConfigFromStorage());
    }
  }, []);

  // Persist to localStorage on change; skip first run to avoid overwriting before load.
  useEffect(() => {
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }
    saveConfigToStorage(config);
  }, [config]);

  const setConfig = useCallback((value: PromptConfig | ((prev: PromptConfig) => PromptConfig)) => {
    setConfigState(value);
  }, []);

  const updateConfig = useCallback((partial: Partial<PromptConfig>) => {
    setConfigState((prev) => ({ ...prev, ...partial }));
  }, []);

  const toggleComponent = useCallback((component: Component) => {
    setConfigState((prev) => {
      const has = prev.components.includes(component);
      const next = has
        ? prev.components.filter((c) => c !== component)
        : [...prev.components, component];
      return { ...prev, components: next };
    });
  }, []);

  const resetConfig = useCallback(() => {
    setConfigState(DEFAULT_CONFIG);
  }, []);

  return {
    config,
    setConfig,
    updateConfig,
    toggleComponent,
    resetConfig,
  };
}
