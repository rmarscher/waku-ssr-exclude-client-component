import { r as reactExports } from "./index-D4N3kwqt.js";
import { c as clientExports } from "./client-BfSB3A3y.js";
import { Router } from "./rsc2-8727ced3f.js";
import "./index-TKDiFiC_.js";
import "./index-Pm7HIP5V.js";
import "./rsc1-0cc2eaeb6.js";
import "./react-server-dom-webpack-client.edge.production-dF25wLiU.js";
const rootElement = reactExports.createElement(reactExports.StrictMode, null, reactExports.createElement(Router));
if (globalThis.__WAKU_HYDRATE__) {
  clientExports.hydrateRoot(document, rootElement);
} else {
  clientExports.createRoot(document).render(rootElement);
}
