import { j as jsxRuntime_reactServerExports } from "../assets/jsx-runtime.react-server-CEUHQ-vs.js";
import { r as react_reactServerExports } from "../assets/react.react-server-DT-QcAOw.js";
import "../assets/react.react-server-DdYoVMo5.js";
const Header = () => {
  return /* @__PURE__ */ jsxRuntime_reactServerExports.jsx("header", { className: "flex items-center gap-4 p-6 lg:fixed lg:left-0 lg:top-0" });
};
const Footer = () => {
  return /* @__PURE__ */ jsxRuntime_reactServerExports.jsx("footer", { className: "p-6 lg:fixed lg:bottom-0 lg:left-0", children: /* @__PURE__ */ jsxRuntime_reactServerExports.jsxs("div", { children: [
    "visit",
    " ",
    /* @__PURE__ */ jsxRuntime_reactServerExports.jsx(
      "a",
      {
        href: "https://waku.gg/",
        target: "_blank",
        rel: "noreferrer",
        className: "mt-4 inline-block underline",
        children: "waku.gg"
      }
    ),
    " ",
    "to learn more"
  ] }) });
};
async function RootLayout({ children }) {
  const data = await getData();
  return /* @__PURE__ */ jsxRuntime_reactServerExports.jsxs("div", { className: "font-['Nunito']", children: [
    /* @__PURE__ */ jsxRuntime_reactServerExports.jsx("meta", { name: "description", content: data.description }),
    /* @__PURE__ */ jsxRuntime_reactServerExports.jsx("link", { rel: "icon", type: "image/png", href: data.icon }),
    /* @__PURE__ */ jsxRuntime_reactServerExports.jsx(Header, {}),
    /* @__PURE__ */ jsxRuntime_reactServerExports.jsx("main", { className: "m-6 flex items-center *:min-h-64 *:min-w-64 lg:m-0 lg:min-h-svh lg:justify-center", children: /* @__PURE__ */ jsxRuntime_reactServerExports.jsx(react_reactServerExports.Suspense, { children }) }),
    /* @__PURE__ */ jsxRuntime_reactServerExports.jsx(Footer, {})
  ] });
}
const getData = async () => {
  const data = {
    description: "An internet website!",
    icon: "/images/favicon.png"
  };
  return data;
};
const getConfig = async () => {
  return {
    render: "static"
  };
};
export {
  RootLayout as default,
  getConfig
};
