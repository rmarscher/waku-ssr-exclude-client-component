import { Suspense, lazy } from "react";

const HeavyClientComponent = lazy(
  () => import("../components/heavy-client-component")
);

export default async function HomePage() {
  return (
    <div>
      <title>Waku SSR Exclude Client Component</title>
      <h1 className="text-4xl font-bold tracking-tight">
        Waku SSR Exclude Client Component
      </h1>
      <Suspense fallback="Loading...">
        <HeavyClientComponent />
      </Suspense>
    </div>
  );
}

// Enable dynamic server rendering.
// Static rendering is possible if you want to render at build time.
// The Hono context will not be available.
export const getConfig = async () => {
  return {
    render: "dynamic",
  } as const;
};
