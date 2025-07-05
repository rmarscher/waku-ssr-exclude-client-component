import { StrictMode, createElement } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { Router } from "waku/router/client";
import { isNoSsrError } from "./lib/no-ssr";

const rootElement = createElement(StrictMode, null, createElement(Router));

if ((globalThis as any).__WAKU_HYDRATE__) {
  hydrateRoot(document, rootElement, {
    onRecoverableError(error) {
      if (isNoSsrError(error)) {
        return;
      }
      console.error(error);
    },
  });
} else {
  createRoot(document, {
    onRecoverableError(error) {
      if (isNoSsrError(error)) {
        return;
      }
      console.error(error);
    },
  }).render(rootElement);
}
