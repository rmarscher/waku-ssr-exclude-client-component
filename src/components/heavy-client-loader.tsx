"use client";

import { type ComponentType, lazy } from "react";
import { createNoSsrError } from "../lib/no-ssr";

const HeavyClientComponent = lazy(
  (): Promise<{ default: ComponentType }> =>
    import.meta.env.SSR
      ? Promise.resolve({ default: () => null })
      : import("../components/heavy-client-component")
);

export function HeavyClientLoader() {
  if (typeof window === "undefined") {
    throw createNoSsrError();
  }
  return <HeavyClientComponent />;
}
