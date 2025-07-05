export function isNoSsrError(
  error: unknown
): error is Error & { digest: "no-ssr" } {
  return (
    typeof error === "object" &&
    error !== null &&
    (("digest" in error && error.digest === "no-ssr") ||
      (error as Error).message.includes("No SSR") ||
      (error as Error).message.includes("#419"))
  );
}

export function createNoSsrError() {
  const error = new Error("No SSR") as Error & { digest: "no-ssr" };
  error.digest = "no-ssr";
  return error;
}
