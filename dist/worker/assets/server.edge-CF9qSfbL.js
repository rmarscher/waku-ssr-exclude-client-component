import { r as requireServer_edge, g as getDefaultExportFromCjs } from "./server.edge-D4UH8nha.js";
function _mergeNamespaces(n, m) {
  for (var i = 0; i < m.length; i++) {
    const e = m[i];
    if (typeof e !== "string" && !Array.isArray(e)) {
      for (const k in e) {
        if (k !== "default" && !(k in n)) {
          const d = Object.getOwnPropertyDescriptor(e, k);
          if (d) {
            Object.defineProperty(n, k, d.get ? d : {
              enumerable: true,
              get: () => e[k]
            });
          }
        }
      }
    }
  }
  return Object.freeze(Object.defineProperty(n, Symbol.toStringTag, { value: "Module" }));
}
var server_edgeExports = requireServer_edge();
const server_edge = /* @__PURE__ */ getDefaultExportFromCjs(server_edgeExports);
const server_edge$1 = /* @__PURE__ */ _mergeNamespaces({
  __proto__: null,
  default: server_edge
}, [server_edgeExports]);
export {
  server_edgeExports as a,
  server_edge$1 as s
};
