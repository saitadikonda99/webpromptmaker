"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  type Component,
  type PromptConfig,
  DEFAULT_CONFIG,
  normalizePromptConfig,
} from "@/lib/types";
import { trackEvent } from "@/lib/analytics";

const STORAGE_KEY = "promptus-prompt-config";
const STEP_STORAGE_KEY = "promptforge-current-step";

const MIN_STEP = 1;

function loadStepFromStorage(): number {
  if (typeof window === "undefined") return MIN_STEP;
  try {
    const raw = localStorage.getItem(STEP_STORAGE_KEY);
    if (raw == null) return MIN_STEP;
    const n = Number(raw);
    if (!Number.isInteger(n) || n < MIN_STEP) return MIN_STEP;
    return n;
  } catch {
    return MIN_STEP;
  }
}

function saveStepToStorage(step: number): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STEP_STORAGE_KEY, String(step));
  } catch {
    // Ignore storage errors
  }
}

/** Major config fingerprint: preset/pageType/framework/components. Used to reset steps only on structural changes. */
function getMajorConfigFingerprint(config: PromptConfig): string {
  const componentsKey = config.components.slice().sort().join(",");
  return [config.pageType, config.framework, componentsKey, config.builderMode].join("|");
}

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
    return normalizePromptConfig({ ...DEFAULT_CONFIG, ...parsed } as PromptConfig);
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
      return normalizePromptConfig({ ...DEFAULT_CONFIG, ...parsed } as PromptConfig);
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

/** Max vibecoding step count: layout + one per component + polish. */
function getVibecodingMaxStep(components: Component[]): number {
  return Math.max(MIN_STEP, components.length + 2);
}

export function usePromptConfig() {
  // Initialize with DEFAULT_CONFIG so server and client first paint match (avoids hydration mismatch).
  const [config, setConfigState] = useState<PromptConfig>(DEFAULT_CONFIG);
  const skipNextSave = useRef(true);

  // Step state: load from localStorage on mount; default to 1 if missing or invalid.
  const [currentStep, setCurrentStep] = useState<number>(MIN_STEP);

  // On mount: load from URL first, then localStorage, else keep default. Do not auto-update URL.
  useEffect(() => {
    const urlConfig = getConfigFromUrl();
    if (urlConfig) {
      setConfigState(urlConfig);
    } else {
      setConfigState(loadConfigFromStorage());
    }
    setCurrentStep(loadStepFromStorage());
  }, []);

  // Persist to localStorage on change; skip first run to avoid overwriting before load.
  useEffect(() => {
    if (skipNextSave.current) {
      skipNextSave.current = false;
      return;
    }
    saveConfigToStorage(config);
  }, [config]);

  // Reset step when MAJOR config changes (preset/pageType/framework/components). Compare previous fingerprint to prevent infinite resets.
  // Do NOT reset on minor edits: colors, theme, animations, design style, responsive, accessibility, seo, outputFormat.
  const majorFingerprintRef = useRef<string>("");
  const hasSeenConfigRef = useRef(false);
  useEffect(() => {
    const fingerprint = getMajorConfigFingerprint(config);
    const changed = majorFingerprintRef.current !== fingerprint;
    majorFingerprintRef.current = fingerprint;

    if (hasSeenConfigRef.current && changed) {
      setCurrentStep(MIN_STEP);
      saveStepToStorage(MIN_STEP);
      toast.info("Flow restarted due to major configuration change.");
    }
    hasSeenConfigRef.current = true;
  }, [config.pageType, config.framework, config.components, config.builderMode]);

  // Persist current step to localStorage when it changes.
  useEffect(() => {
    saveStepToStorage(currentStep);
  }, [currentStep]);

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

  const maxStep = getVibecodingMaxStep(config.components);

  const nextStep = useCallback(() => {
    trackEvent("next_step_clicked", { maxStep });
    setCurrentStep((prev) => Math.min(prev + 1, maxStep));
  }, [maxStep]);

  const resetSteps = useCallback(() => {
    setCurrentStep(MIN_STEP);
    saveStepToStorage(MIN_STEP);
  }, []);

  const resetConfig = useCallback(() => {
    setConfigState(DEFAULT_CONFIG);
    setCurrentStep(MIN_STEP);
    saveStepToStorage(MIN_STEP);
  }, []);

  return {
    config,
    setConfig,
    updateConfig,
    toggleComponent,
    resetConfig,
    currentStep,
    nextStep,
    resetSteps,
  };
}
