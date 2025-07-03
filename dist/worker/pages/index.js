import { j as jsxRuntime_reactServerExports } from "../assets/jsx-runtime.react-server-CEUHQ-vs.js";
import { r as react_reactServerExports } from "../assets/react.react-server-DT-QcAOw.js";
import "../assets/react.react-server-DdYoVMo5.js";
const HeavyClientComponent = react_reactServerExports.lazy(
  () => import("../assets/rsc0-340664ac5.js")
);
async function HomePage() {
  return /* @__PURE__ */ jsxRuntime_reactServerExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntime_reactServerExports.jsx("title", { children: "Waku SSR Exclude Client Component" }),
    /* @__PURE__ */ jsxRuntime_reactServerExports.jsx("h1", { className: "text-4xl font-bold tracking-tight", children: "Waku SSR Exclude Client Component" }),
    /* @__PURE__ */ jsxRuntime_reactServerExports.jsx(react_reactServerExports.Suspense, { fallback: "Loading...", children: /* @__PURE__ */ jsxRuntime_reactServerExports.jsx(HeavyClientComponent, {}) })
  ] });
}
const getConfig = async () => {
  return {
    render: "dynamic"
  };
};
export {
  HomePage as default,
  getConfig
};
