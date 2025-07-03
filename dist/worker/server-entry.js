import { r as react_reactServerExports } from "./assets/react.react-server-DT-QcAOw.js";
import { getContext } from "./assets/context-CTQLbpga.js";
import { INTERNAL_ServerRouter, ErrorBoundary } from "./assets/rsc2-8727ced3f.js";
import { Children, Slot } from "./assets/rsc1-0cc2eaeb6.js";
import "./assets/react.react-server-DdYoVMo5.js";
import "./assets/server.edge-CF9qSfbL.js";
import "./assets/server.edge-D4UH8nha.js";
import "node:async_hooks";
const EXTENSIONS = [
  ".js",
  ".ts",
  ".tsx",
  ".jsx",
  ".mjs",
  ".cjs"
];
const SRC_MAIN = "client-entry";
const filePathToFileURL = (filePath) => "file://" + encodeURI(filePath);
const joinPath = (...paths) => {
  const isAbsolute = paths[0]?.startsWith("/");
  const items = [].concat(...paths.map((path) => path.split("/")));
  let i = 0;
  while (i < items.length) {
    if (items[i] === "." || items[i] === "") {
      items.splice(i, 1);
    } else if (items[i] === "..") {
      if (i > 0) {
        items.splice(i - 1, 2);
        --i;
      } else {
        items.splice(i, 1);
      }
    } else {
      ++i;
    }
  }
  return (isAbsolute ? "/" : "") + items.join("/") || ".";
};
const parsePathWithSlug = (path) => path.split("/").filter(Boolean).map((name) => {
  let type = "literal";
  const isSlug = name.startsWith("[") && name.endsWith("]");
  if (isSlug) {
    type = "group";
    name = name.slice(1, -1);
  }
  const isWildcard = name.startsWith("...");
  if (isWildcard) {
    type = "wildcard";
    name = name.slice(3);
  }
  return {
    type,
    name
  };
});
const parseExactPath = (path) => path.split("/").filter(Boolean).map((name) => ({
  type: "literal",
  name
}));
const path2regexp = (path) => {
  const parts = path.map(({ type, name }) => {
    if (type === "literal") {
      return name;
    } else if (type === "group") {
      return `([^/]+)`;
    } else {
      return `(.*)`;
    }
  });
  return `^/${parts.join("/")}$`;
};
const pathSpecAsString = (path) => {
  return "/" + path.map(({ type, name }) => {
    if (type === "literal") {
      return name;
    } else if (type === "group") {
      return `[${name}]`;
    } else {
      return `[...${name}]`;
    }
  }).join("/");
};
const getPathMapping = (pathSpec, pathname) => {
  const actual = pathname.split("/").filter(Boolean);
  if (pathSpec.length > actual.length) {
    return null;
  }
  const mapping = {};
  let wildcardStartIndex = -1;
  for (let i = 0; i < pathSpec.length; i++) {
    const { type, name } = pathSpec[i];
    if (type === "literal") {
      if (name !== actual[i]) {
        return null;
      }
    } else if (type === "wildcard") {
      wildcardStartIndex = i;
      break;
    } else if (name) {
      mapping[name] = actual[i];
    }
  }
  if (wildcardStartIndex === -1) {
    if (pathSpec.length !== actual.length) {
      return null;
    }
    return mapping;
  }
  let wildcardEndIndex = -1;
  for (let i = 0; i < pathSpec.length; i++) {
    const { type, name } = pathSpec[pathSpec.length - i - 1];
    if (type === "literal") {
      if (name !== actual[actual.length - i - 1]) {
        return null;
      }
    } else if (type === "wildcard") {
      wildcardEndIndex = actual.length - i - 1;
      break;
    } else if (name) {
      mapping[name] = actual[actual.length - i - 1];
    }
  }
  if (wildcardStartIndex === -1 || wildcardEndIndex === -1) {
    throw new Error("Invalid wildcard path");
  }
  const wildcardName = pathSpec[wildcardStartIndex].name;
  if (wildcardName) {
    mapping[wildcardName] = actual.slice(wildcardStartIndex, wildcardEndIndex + 1);
  }
  return mapping;
};
function INTERNAL_setAllEnv(newEnv) {
  globalThis.__WAKU_SERVER_ENV__ = newEnv;
}
function INTERNAL_setPlatformDataLoader(loader) {
  globalThis.__WAKU_SERVER_PLATFORM_DATA_LOADER__ = loader;
}
async function unstable_setPlatformData(key, data, serializable) {
  const platformData = globalThis.__WAKU_SERVER_PLATFORM_DATA__ ||= {};
  platformData[key] = [
    data,
    serializable
  ];
}
async function unstable_getPlatformData(key) {
  const platformData = globalThis.__WAKU_SERVER_PLATFORM_DATA__ ||= {};
  const item = platformData[key];
  if (item) {
    return item[0];
  }
  const loader = globalThis.__WAKU_SERVER_PLATFORM_DATA_LOADER__;
  if (loader) {
    return loader(key);
  }
}
function unstable_getBuildOptions() {
  return globalThis.__WAKU_BUILD_OPTIONS__ ||= {};
}
function unstable_createAsyncIterable(create) {
  return {
    [Symbol.asyncIterator]: () => {
      let tasks;
      return {
        next: async () => {
          if (!tasks) {
            tasks = Array.from(await create());
          }
          const task = tasks.shift();
          if (task) {
            return {
              value: await task()
            };
          }
          return {
            done: true,
            value: void 0
          };
        }
      };
    }
  };
}
function unstable_defineEntries(fns) {
  return fns;
}
const ROUTE_PREFIX = "R";
function encodeRoutePath(path) {
  if (!path.startsWith("/")) {
    throw new Error("Path must start with `/`: " + path);
  }
  if (path === "/") {
    return ROUTE_PREFIX + "/_root";
  }
  if (path.endsWith("/")) {
    throw new Error("Path must not end with `/`: " + path);
  }
  return ROUTE_PREFIX + path;
}
function decodeRoutePath(rscPath) {
  if (!rscPath.startsWith(ROUTE_PREFIX)) {
    throw new Error("rscPath should not start with `/`");
  }
  if (rscPath === ROUTE_PREFIX + "/_root") {
    return "/";
  }
  return rscPath.slice(ROUTE_PREFIX.length);
}
const ROUTE_ID = "ROUTE";
const IS_STATIC_ID = "IS_STATIC";
const HAS404_ID = "HAS404";
const SKIP_HEADER = "X-Waku-Router-Skip";
const streamToArrayBuffer = async (stream) => {
  const reader = stream.getReader();
  const chunks = [];
  let totalSize = 0;
  let done = false;
  let value;
  do {
    ({ done, value } = await reader.read());
    if (!done && value) {
      chunks.push(value);
      totalSize += value.length;
    }
  } while (!done);
  const result = new Uint8Array(totalSize);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  return result.buffer;
};
const stringToStream = (str) => {
  const encoder = new TextEncoder();
  return new ReadableStream({
    start(controller) {
      controller.enqueue(encoder.encode(str));
      controller.close();
    }
  });
};
const isErrorInfo = (x) => {
  if (typeof x !== "object" || x === null) {
    return false;
  }
  if ("status" in x && typeof x.status !== "number") {
    return false;
  }
  if ("location" in x && typeof x.location !== "string") {
    return false;
  }
  return true;
};
const prefix = "__WAKU_CUSTOM_ERROR__;";
const getErrorInfo = (err) => {
  const digest = err?.digest;
  if (typeof digest !== "string" || !digest.startsWith(prefix)) {
    return null;
  }
  try {
    const info = JSON.parse(digest.slice(prefix.length));
    if (isErrorInfo(info)) {
      return info;
    }
  } catch {
  }
  return null;
};
const isStringArray = (x) => Array.isArray(x) && x.every((y) => typeof y === "string");
const parseRscParams = (rscParams) => {
  if (rscParams instanceof URLSearchParams) {
    return {
      query: rscParams.get("query") || ""
    };
  }
  if (typeof rscParams?.query === "string") {
    return {
      query: rscParams.query
    };
  }
  return {
    query: ""
  };
};
const RSC_PATH_SYMBOL = Symbol("RSC_PATH");
const RSC_PARAMS_SYMBOL = Symbol("RSC_PARAMS");
const setRscPath = (rscPath) => {
  try {
    const context = getContext();
    context[RSC_PATH_SYMBOL] = rscPath;
  } catch {
  }
};
const setRscParams = (rscParams) => {
  try {
    const context = getContext();
    context[RSC_PARAMS_SYMBOL] = rscParams;
  } catch {
  }
};
const RERENDER_SYMBOL = Symbol("RERENDER");
const setRerender = (rerender) => {
  try {
    const context = getContext();
    context[RERENDER_SYMBOL] = rerender;
  } catch {
  }
};
const pathSpec2pathname = (pathSpec) => {
  if (pathSpec.some(({ type }) => type !== "literal")) {
    return void 0;
  }
  return "/" + pathSpec.map(({ name }) => name).join("/");
};
const ROUTE_SLOT_ID_PREFIX = "route:";
function unstable_defineRouter(fns) {
  let cachedPathConfig;
  const getMyPathConfig = async () => {
    const pathConfig = await unstable_getPlatformData("defineRouterPathConfigs");
    if (pathConfig) {
      return pathConfig;
    }
    if (!cachedPathConfig) {
      cachedPathConfig = Array.from(await fns.getConfig()).map((item) => {
        switch (item.type) {
          case "route": {
            const is404 = item.path.length === 1 && item.path[0].type === "literal" && item.path[0].name === "404";
            const isStatic = !!item.rootElement.isStatic && !!item.routeElement.isStatic && Object.values(item.elements).every((x) => x.isStatic);
            return {
              pathSpec: item.path,
              pathname: pathSpec2pathname(item.path),
              pattern: path2regexp(item.pathPattern || item.path),
              specs: {
                ...item.rootElement.isStatic ? {
                  rootElementIsStatic: true
                } : {},
                ...item.routeElement.isStatic ? {
                  routeElementIsStatic: true
                } : {},
                staticElementIds: Object.entries(item.elements).flatMap(([id, { isStatic: isStatic2 }]) => isStatic2 ? [
                  id
                ] : []),
                ...isStatic ? {
                  isStatic: true
                } : {},
                ...is404 ? {
                  is404: true
                } : {},
                ...item.noSsr ? {
                  noSsr: true
                } : {}
              }
            };
          }
          case "api": {
            return {
              pathSpec: item.path,
              pathname: pathSpec2pathname(item.path),
              pattern: path2regexp(item.path),
              specs: {
                ...item.isStatic ? {
                  isStatic: true
                } : {},
                isApi: true
              }
            };
          }
          default:
            throw new Error("Unknown config type");
        }
      });
    }
    return cachedPathConfig;
  };
  const getPathConfigItem = async (pathname) => {
    const pathConfig = await getMyPathConfig();
    const found = pathConfig.find(({ pathSpec }) => getPathMapping(pathSpec, pathname));
    return found;
  };
  const has404 = async () => {
    const pathConfig = await getMyPathConfig();
    return pathConfig.some(({ specs: { is404 } }) => is404);
  };
  const getEntries = async (rscPath, rscParams, headers) => {
    setRscPath(rscPath);
    setRscParams(rscParams);
    const pathname = decodeRoutePath(rscPath);
    const pathConfigItem = await getPathConfigItem(pathname);
    if (!pathConfigItem) {
      return null;
    }
    let skipParam;
    try {
      skipParam = JSON.parse(headers[SKIP_HEADER.toLowerCase()] || "");
    } catch {
    }
    const skipIdSet = new Set(isStringArray(skipParam) ? skipParam : []);
    const { query } = parseRscParams(rscParams);
    const { rootElement, routeElement, elements } = await fns.handleRoute(pathname, pathConfigItem.specs.isStatic ? {} : {
      query
    });
    if (Object.keys(elements).some((id) => id.startsWith(ROUTE_SLOT_ID_PREFIX))) {
      throw new Error('Element ID cannot start with "route:"');
    }
    const entries = {
      ...elements
    };
    for (const id of pathConfigItem.specs.staticElementIds || []) {
      if (skipIdSet.has(id)) {
        delete entries[id];
      }
    }
    if (!pathConfigItem.specs.rootElementIsStatic || !skipIdSet.has("root")) {
      entries.root = rootElement;
    }
    const decodedPathname = decodeURI(pathname);
    const routeId = ROUTE_SLOT_ID_PREFIX + decodedPathname;
    if (!pathConfigItem.specs.routeElementIsStatic || !skipIdSet.has(routeId)) {
      entries[routeId] = routeElement;
    }
    entries[ROUTE_ID] = [
      decodedPathname,
      query
    ];
    entries[IS_STATIC_ID] = !!pathConfigItem.specs.isStatic;
    if (await has404()) {
      entries[HAS404_ID] = true;
    }
    return entries;
  };
  const handleRequest = async (input, { renderRsc, renderHtml }) => {
    if (input.type === "component") {
      const entries = await getEntries(input.rscPath, input.rscParams, input.req.headers);
      if (!entries) {
        return null;
      }
      return renderRsc(entries);
    }
    if (input.type === "function") {
      let elementsPromise = Promise.resolve({});
      let rendered = false;
      const rerender = (rscPath, rscParams) => {
        if (rendered) {
          throw new Error("already rendered");
        }
        elementsPromise = Promise.all([
          elementsPromise,
          getEntries(rscPath, rscParams, input.req.headers)
        ]).then(([oldElements, newElements]) => {
          if (newElements === null) {
            console.warn("getEntries returned null");
          }
          return {
            ...oldElements,
            ...newElements
          };
        });
      };
      setRerender(rerender);
      const value = await input.fn(...input.args);
      rendered = true;
      return renderRsc({
        ...await elementsPromise,
        _value: value
      });
    }
    const pathConfigItem = await getPathConfigItem(input.pathname);
    if (pathConfigItem?.specs?.isApi && fns.handleApi) {
      return fns.handleApi(input.pathname, {
        url: input.req.url,
        body: input.req.body,
        headers: input.req.headers,
        method: input.req.method
      });
    }
    if (input.type === "action" || input.type === "custom") {
      const renderIt = async (pathname, query2, httpstatus = 200) => {
        const rscPath = encodeRoutePath(pathname);
        const rscParams = new URLSearchParams({
          query: query2
        });
        const entries = await getEntries(rscPath, rscParams, input.req.headers);
        if (!entries) {
          return null;
        }
        const html = react_reactServerExports.createElement(INTERNAL_ServerRouter, {
          route: {
            path: pathname,
            query: query2,
            hash: ""
          },
          httpstatus
        });
        const actionResult = input.type === "action" ? await input.fn() : void 0;
        return renderHtml(entries, html, {
          rscPath,
          actionResult
        });
      };
      const query = input.req.url.searchParams.toString();
      if (pathConfigItem?.specs?.noSsr) {
        return null;
      }
      try {
        if (pathConfigItem) {
          return await renderIt(input.pathname, query);
        }
      } catch (e) {
        const info = getErrorInfo(e);
        if (info?.status !== 404) {
          throw e;
        }
      }
      if (await has404()) {
        return {
          ...await renderIt("/404", "", 404),
          status: 404
        };
      } else {
        return null;
      }
    }
  };
  const handleBuild = ({ renderRsc, renderHtml, rscPath2pathname, unstable_generatePrefetchCode, unstable_collectClientModules }) => unstable_createAsyncIterable(async () => {
    const tasks = [];
    const pathConfig = await getMyPathConfig();
    for (const { pathname, specs } of pathConfig) {
      const { handleApi } = fns;
      if (pathname && specs.isStatic && specs.isApi && handleApi) {
        tasks.push(async () => ({
          type: "file",
          pathname,
          body: handleApi(pathname, {
            url: new URL(pathname, "http://localhost:3000"),
            body: null,
            headers: {},
            method: "GET"
          }).then(({ body }) => body || stringToStream(""))
        }));
      }
    }
    const path2moduleIds = {};
    const moduleIdsForPrefetch = /* @__PURE__ */ new WeakMap();
    const entriesCache = /* @__PURE__ */ new Map();
    await Promise.all(pathConfig.map(async ({ pathSpec, pathname, pattern, specs }) => {
      if (specs.isApi) {
        return;
      }
      const moduleIds = /* @__PURE__ */ new Set();
      moduleIdsForPrefetch.set(pathSpec, moduleIds);
      if (!pathname) {
        return;
      }
      const rscPath = encodeRoutePath(pathname);
      const entries = await getEntries(rscPath, void 0, {});
      if (entries) {
        entriesCache.set(pathname, entries);
        path2moduleIds[pattern] = await unstable_collectClientModules(entries);
        if (specs.isStatic) {
          tasks.push(async () => ({
            type: "file",
            pathname: rscPath2pathname(rscPath),
            body: renderRsc(entries, {
              moduleIdCallback: (id) => moduleIds.add(id)
            })
          }));
        }
      }
    }));
    const getRouterPrefetchCode = () => `
globalThis.__WAKU_ROUTER_PREFETCH__ = (path) => {
  const path2ids = ${JSON.stringify(path2moduleIds)};
  const pattern = Object.keys(path2ids).find((key) => new RegExp(key).test(path));
  if (pattern && path2ids[pattern]) {
    for (const id of path2ids[pattern] || []) {
      import(id);
    }
  }
};`;
    for (const { pathSpec, pathname, specs } of pathConfig) {
      if (specs.isApi) {
        continue;
      }
      tasks.push(async () => {
        const moduleIds = moduleIdsForPrefetch.get(pathSpec);
        if (pathname) {
          const rscPath = encodeRoutePath(pathname);
          const code2 = unstable_generatePrefetchCode([
            rscPath
          ], moduleIds) + getRouterPrefetchCode();
          const entries = entriesCache.get(pathname);
          if (specs.isStatic && entries) {
            const html = react_reactServerExports.createElement(INTERNAL_ServerRouter, {
              route: {
                path: pathname,
                query: "",
                hash: ""
              },
              httpstatus: specs.is404 ? 404 : 200
            });
            return {
              type: "file",
              pathname,
              body: renderHtml(entries, html, {
                rscPath,
                htmlHead: `<script type="module" async>${code2}<\/script>`
              }).then(({ body }) => body)
            };
          }
        }
        const code = unstable_generatePrefetchCode([], moduleIds) + getRouterPrefetchCode();
        return {
          type: "htmlHead",
          pathSpec,
          head: `<script type="module" async>${code}<\/script>`
        };
      });
    }
    await unstable_setPlatformData("defineRouterPathConfigs", pathConfig, true);
    return tasks;
  });
  return unstable_defineEntries({
    handleRequest,
    handleBuild
  });
}
const getGrouplessPath = (path) => {
  if (path.includes("(")) {
    const withoutGroups = path.split("/").filter((part) => !part.startsWith("("));
    path = withoutGroups.length > 1 ? withoutGroups.join("/") : "/";
  }
  return path;
};
const METHODS = [
  "GET",
  "HEAD",
  "POST",
  "PUT",
  "DELETE",
  "CONNECT",
  "OPTIONS",
  "TRACE",
  "PATCH"
];
const sanitizeSlug = (slug) => slug.replace(/\./g, "").replace(/ /g, "-");
const DefaultRoot = ({ children }) => react_reactServerExports.createElement(ErrorBoundary, null, react_reactServerExports.createElement("html", null, react_reactServerExports.createElement("head", null), react_reactServerExports.createElement("body", null, children)));
const createNestedElements = (elements, children) => {
  return elements.reduceRight((result, element) => react_reactServerExports.createElement(element.component, element.props, result), children);
};
const createPages = (fn) => {
  let configured = false;
  const groupPathLookup = /* @__PURE__ */ new Map();
  const staticPathMap = /* @__PURE__ */ new Map();
  const pagePartRenderModeMap = /* @__PURE__ */ new Map();
  const staticPagePartRoutes = /* @__PURE__ */ new Set();
  const dynamicPagePathMap = /* @__PURE__ */ new Map();
  const wildcardPagePathMap = /* @__PURE__ */ new Map();
  const dynamicLayoutPathMap = /* @__PURE__ */ new Map();
  const apiPathMap = /* @__PURE__ */ new Map();
  const staticComponentMap = /* @__PURE__ */ new Map();
  let rootItem = void 0;
  const noSsrSet = /* @__PURE__ */ new WeakSet();
  const getPageRoutePath = (path) => {
    if (staticComponentMap.has(joinPath(path, "page").slice(1)) || staticPagePartRoutes.has(path)) {
      return path;
    }
    const allPaths = [
      ...dynamicPagePathMap.keys(),
      ...wildcardPagePathMap.keys()
    ];
    for (const p of allPaths) {
      if (getPathMapping(parsePathWithSlug(p), path)) {
        return p;
      }
    }
  };
  const getApiRoutePath = (path, method) => {
    for (const [p, v] of apiPathMap.entries()) {
      if ((method in v.handlers || v.handlers.all) && getPathMapping(parsePathWithSlug(p), path)) {
        return p;
      }
    }
  };
  const pagePathExists = (path) => {
    for (const pathKey of apiPathMap.keys()) {
      const [_m, p] = pathKey.split(" ");
      if (p === path) {
        return true;
      }
    }
    return staticPathMap.has(path) || dynamicPagePathMap.has(path) || wildcardPagePathMap.has(path);
  };
  const getOriginalStaticPathSpec = (path) => {
    const staticPathSpec = staticPathMap.get(path);
    if (staticPathSpec) {
      return staticPathSpec.originalSpec ?? staticPathSpec.literalSpec;
    }
  };
  const registerStaticComponent = (id, component) => {
    if (staticComponentMap.has(id) && staticComponentMap.get(id) !== component) {
      throw new Error(`Duplicated component for: ${id}`);
    }
    staticComponentMap.set(id, component);
  };
  const createPage = (page) => {
    if (configured) {
      throw new Error("createPage no longer available");
    }
    if (pagePathExists(page.path)) {
      throw new Error(`Duplicated path: ${page.path}`);
    }
    const pathSpec = parsePathWithSlug(page.path);
    const { numSlugs, numWildcards } = getSlugsAndWildcards(pathSpec);
    if (page.unstable_disableSSR) {
      noSsrSet.add(pathSpec);
    }
    if (page.exactPath) {
      const spec = parseExactPath(page.path);
      if (page.render === "static") {
        staticPathMap.set(page.path, {
          literalSpec: spec
        });
        const id = joinPath(page.path, "page").replace(/^\//, "");
        if (page.component) {
          registerStaticComponent(id, page.component);
        }
      } else if (page.component) {
        dynamicPagePathMap.set(page.path, [
          spec,
          page.component
        ]);
      } else {
        dynamicPagePathMap.set(page.path, [
          spec,
          []
        ]);
      }
    } else if (page.render === "static" && numSlugs === 0) {
      const pagePath = getGrouplessPath(page.path);
      staticPathMap.set(pagePath, {
        literalSpec: pathSpec
      });
      const id = joinPath(pagePath, "page").replace(/^\//, "");
      if (pagePath !== page.path) {
        groupPathLookup.set(pagePath, page.path);
      }
      if (page.component) {
        registerStaticComponent(id, page.component);
      }
    } else if (page.render === "static" && numSlugs > 0 && "staticPaths" in page) {
      const staticPaths = page.staticPaths.map((item) => (Array.isArray(item) ? item : [
        item
      ]).map(sanitizeSlug));
      for (const staticPath of staticPaths) {
        if (staticPath.length !== numSlugs && numWildcards === 0) {
          throw new Error("staticPaths does not match with slug pattern");
        }
        const mapping = {};
        let slugIndex = 0;
        const pathItems = [];
        pathSpec.forEach(({ type, name }) => {
          switch (type) {
            case "literal":
              pathItems.push(name);
              break;
            case "wildcard":
              mapping[name] = staticPath.slice(slugIndex);
              staticPath.slice(slugIndex++).forEach((slug) => {
                pathItems.push(slug);
              });
              break;
            case "group":
              pathItems.push(staticPath[slugIndex++]);
              mapping[name] = pathItems[pathItems.length - 1];
              break;
          }
        });
        const definedPath = "/" + pathItems.join("/");
        const pagePath = getGrouplessPath(definedPath);
        staticPathMap.set(pagePath, {
          literalSpec: pathItems.map((name) => ({
            type: "literal",
            name
          })),
          originalSpec: pathSpec
        });
        if (pagePath !== definedPath) {
          groupPathLookup.set(pagePath, definedPath);
        }
        const id = joinPath(...pathItems, "page");
        const WrappedComponent = (props) => react_reactServerExports.createElement(page.component, {
          ...props,
          ...mapping
        });
        registerStaticComponent(id, WrappedComponent);
      }
    } else if (page.render === "dynamic" && numWildcards === 0) {
      const pagePath = getGrouplessPath(page.path);
      if (pagePath !== page.path) {
        groupPathLookup.set(pagePath, page.path);
      }
      dynamicPagePathMap.set(pagePath, [
        pathSpec,
        page.component
      ]);
    } else if (page.render === "dynamic" && numWildcards === 1) {
      const pagePath = getGrouplessPath(page.path);
      if (pagePath !== page.path) {
        groupPathLookup.set(pagePath, page.path);
      }
      wildcardPagePathMap.set(pagePath, [
        pathSpec,
        page.component
      ]);
    } else {
      throw new Error("Invalid page configuration");
    }
    return page;
  };
  const createLayout = (layout) => {
    if (configured) {
      throw new Error("createLayout no longer available");
    }
    if (layout.render === "static") {
      const id = joinPath(layout.path, "layout").replace(/^\//, "");
      registerStaticComponent(id, layout.component);
    } else if (layout.render === "dynamic") {
      if (dynamicLayoutPathMap.has(layout.path)) {
        throw new Error(`Duplicated dynamic path: ${layout.path}`);
      }
      const pathSpec = parsePathWithSlug(layout.path);
      dynamicLayoutPathMap.set(layout.path, [
        pathSpec,
        layout.component
      ]);
    } else {
      throw new Error("Invalid layout configuration");
    }
  };
  const createApi = (options) => {
    if (configured) {
      throw new Error("createApi no longer available");
    }
    if (apiPathMap.has(options.path)) {
      throw new Error(`Duplicated api path: ${options.path}`);
    }
    const pathSpec = parsePathWithSlug(options.path);
    if (options.render === "static") {
      apiPathMap.set(options.path, {
        render: "static",
        pathSpec,
        handlers: {
          GET: options.handler
        }
      });
    } else {
      apiPathMap.set(options.path, {
        render: "dynamic",
        pathSpec,
        handlers: options.handlers
      });
    }
  };
  const createRoot = (root) => {
    if (configured) {
      throw new Error("createRoot no longer available");
    }
    if (rootItem) {
      throw new Error(`Duplicated root component`);
    }
    if (root.render === "static" || root.render === "dynamic") {
      rootItem = root;
    } else {
      throw new Error("Invalid root configuration");
    }
  };
  const createPagePart = (params) => {
    if (params.path.endsWith("[path]")) {
      throw new Error("Page part file cannot be named [path]. This will conflict with the path prop of the page component.");
    }
    if (configured) {
      throw new Error("createPagePart no longer available");
    }
    const pagePartRenderMode = pagePartRenderModeMap.get(params.path);
    if (!pagePartRenderMode) {
      pagePartRenderModeMap.set(params.path, params.render);
    } else if (params.render === "dynamic" && pagePartRenderMode === "static") {
      pagePartRenderModeMap.set(params.path, "dynamic");
    }
    const pathSpec = parsePathWithSlug(params.path);
    const { numWildcards } = getSlugsAndWildcards(pathSpec);
    const pagePathMap = numWildcards === 0 ? dynamicPagePathMap : wildcardPagePathMap;
    if (pagePathMap.has(params.path) && !Array.isArray(pagePathMap.get(params.path)?.[1])) {
      throw new Error(`Duplicated path: ${params.path}. Tip: createPagePart cannot be used with createPage. Only one at a time is allowed.`);
    }
    if (params.render === "static") {
      const id = joinPath(params.path, "page").replace(/^\//, "") + ":" + params.order;
      registerStaticComponent(id, params.component);
    }
    if (!pagePathMap.has(params.path)) {
      const pathComponents = [];
      pathComponents[params.order] = {
        component: params.component,
        render: params.render
      };
      pagePathMap.set(params.path, [
        pathSpec,
        pathComponents
      ]);
    } else {
      const pageComponents = pagePathMap.get(params.path)?.[1];
      if (Array.isArray(pageComponents)) {
        if (pageComponents[params.order]) {
          throw new Error("Duplicated pagePartComponent order: " + params.order);
        }
        pageComponents[params.order] = {
          render: params.render,
          component: params.component
        };
      }
    }
    return params;
  };
  let ready;
  const configure = async () => {
    if (!configured && !ready) {
      ready = fn({
        createPage,
        createLayout,
        createRoot,
        createApi,
        createPagePart
      });
      await ready;
      for (const [path, renderMode] of pagePartRenderModeMap) {
        if (renderMode === "dynamic") {
          continue;
        }
        staticPagePartRoutes.add(path);
        const pathSpec = parsePathWithSlug(path);
        const { numWildcards } = getSlugsAndWildcards(pathSpec);
        const pagePathMap = numWildcards === 0 ? dynamicPagePathMap : wildcardPagePathMap;
        pagePathMap.delete(path);
        const pagePath = getGrouplessPath(path);
        staticPathMap.set(pagePath, {
          literalSpec: pathSpec
        });
        if (path !== pagePath) {
          groupPathLookup.set(pagePath, pagePath);
        }
      }
      configured = true;
    }
    await ready;
  };
  const getLayouts = (spec) => {
    const pathSegments = spec.reduce((acc, _segment, index) => {
      acc.push(pathSpecAsString(spec.slice(0, index + 1)));
      return acc;
    }, [
      "/"
    ]);
    return pathSegments.filter((segment) => dynamicLayoutPathMap.has(segment) || staticComponentMap.has(joinPath(segment, "layout").slice(1)));
  };
  const definedRouter = unstable_defineRouter({
    getConfig: async () => {
      await configure();
      const routeConfigs = [];
      const rootIsStatic = !rootItem || rootItem.render === "static";
      for (const [path, { literalSpec, originalSpec }] of staticPathMap) {
        const noSsr = noSsrSet.has(literalSpec);
        const layoutPaths = getLayouts(originalSpec ?? literalSpec);
        const elements = {
          ...layoutPaths.reduce((acc, lPath) => {
            acc[`layout:${lPath}`] = {
              isStatic: !dynamicLayoutPathMap.has(lPath)
            };
            return acc;
          }, {}),
          [`page:${path}`]: {
            isStatic: staticPathMap.has(path)
          }
        };
        routeConfigs.push({
          type: "route",
          path: literalSpec.filter((part) => !part.name?.startsWith("(")),
          ...originalSpec && {
            pathPattern: originalSpec
          },
          rootElement: {
            isStatic: rootIsStatic
          },
          routeElement: {
            isStatic: true
          },
          elements,
          noSsr
        });
      }
      for (const [path, [pathSpec, components]] of dynamicPagePathMap) {
        const noSsr = noSsrSet.has(pathSpec);
        const layoutPaths = getLayouts(pathSpec);
        const elements = {
          ...layoutPaths.reduce((acc, lPath) => {
            acc[`layout:${lPath}`] = {
              isStatic: !dynamicLayoutPathMap.has(lPath)
            };
            return acc;
          }, {})
        };
        if (Array.isArray(components)) {
          for (let i = 0; i < components.length; i++) {
            const component = components[i];
            if (component) {
              elements[`page:${path}:${i}`] = {
                isStatic: component.render === "static"
              };
            }
          }
        } else {
          elements[`page:${path}`] = {
            isStatic: false
          };
        }
        routeConfigs.push({
          type: "route",
          path: pathSpec.filter((part) => !part.name?.startsWith("(")),
          rootElement: {
            isStatic: rootIsStatic
          },
          routeElement: {
            isStatic: true
          },
          elements,
          noSsr
        });
      }
      for (const [path, [pathSpec, components]] of wildcardPagePathMap) {
        const noSsr = noSsrSet.has(pathSpec);
        const layoutPaths = getLayouts(pathSpec);
        const elements = {
          ...layoutPaths.reduce((acc, lPath) => {
            acc[`layout:${lPath}`] = {
              isStatic: !dynamicLayoutPathMap.has(lPath)
            };
            return acc;
          }, {})
        };
        if (Array.isArray(components)) {
          for (let i = 0; i < components.length; i++) {
            const component = components[i];
            if (component) {
              elements[`page:${path}:${i}`] = {
                isStatic: component.render === "static"
              };
            }
          }
        } else {
          elements[`page:${path}`] = {
            isStatic: false
          };
        }
        routeConfigs.push({
          type: "route",
          path: pathSpec.filter((part) => !part.name?.startsWith("(")),
          rootElement: {
            isStatic: rootIsStatic
          },
          routeElement: {
            isStatic: true
          },
          elements,
          noSsr
        });
      }
      const apiConfigs = Array.from(apiPathMap.values()).map(({ pathSpec, render }) => {
        return {
          type: "api",
          path: pathSpec,
          isStatic: render === "static"
        };
      });
      const getRoutePriority = (pathConfig) => {
        const hasWildcard = pathConfig.path.at(-1)?.type === "wildcard";
        if (pathConfig.type === "api") {
          return hasWildcard ? 2 : 1;
        }
        return hasWildcard ? 3 : 0;
      };
      return [
        ...routeConfigs,
        ...apiConfigs
      ].sort((configA, configB) => getRoutePriority(configA) - getRoutePriority(configB));
    },
    handleRoute: async (path, { query }) => {
      await configure();
      const routePath = getPageRoutePath(path);
      if (!routePath) {
        throw new Error("Route not found: " + path);
      }
      let pageComponent = staticComponentMap.get(joinPath(routePath, "page").slice(1)) ?? dynamicPagePathMap.get(routePath)?.[1] ?? wildcardPagePathMap.get(routePath)?.[1];
      if (!pageComponent && staticPagePartRoutes.has(routePath)) {
        pageComponent = [];
        for (const [name, v] of staticComponentMap.entries()) {
          if (name.startsWith(joinPath(routePath, "page").slice(1))) {
            pageComponent.push({
              component: v,
              render: "static"
            });
          }
        }
      }
      if (!pageComponent) {
        throw new Error("Page not found: " + path);
      }
      const layoutMatchPath = groupPathLookup.get(routePath) ?? routePath;
      const pathSpec = parsePathWithSlug(layoutMatchPath);
      const mapping = getPathMapping(
        pathSpec,
        // ensure path is encoded for props of page component
        encodeURI(path)
      );
      const result = {};
      if (Array.isArray(pageComponent)) {
        for (let i = 0; i < pageComponent.length; i++) {
          const comp = pageComponent[i];
          if (!comp) {
            continue;
          }
          result[`page:${routePath}:${i}`] = react_reactServerExports.createElement(comp.component, {
            ...mapping,
            ...query ? {
              query
            } : {},
            path
          });
        }
      } else {
        result[`page:${routePath}`] = react_reactServerExports.createElement(pageComponent, {
          ...mapping,
          ...query ? {
            query
          } : {},
          path
        }, react_reactServerExports.createElement(Children));
      }
      const layoutPaths = getLayouts(getOriginalStaticPathSpec(path) ?? pathSpec);
      for (const segment of layoutPaths) {
        const layout = dynamicLayoutPathMap.get(segment)?.[1] ?? staticComponentMap.get(joinPath(segment, "layout").slice(1));
        const isDynamic = dynamicLayoutPathMap.has(segment);
        if (layout && !Array.isArray(layout)) {
          const id = "layout:" + segment;
          result[id] = react_reactServerExports.createElement(layout, isDynamic ? {
            path
          } : null, react_reactServerExports.createElement(Children));
        } else {
          throw new Error("Invalid layout " + segment);
        }
      }
      const layouts = layoutPaths.map((lPath) => ({
        component: Slot,
        props: {
          id: `layout:${lPath}`
        }
      }));
      const finalPageChildren = Array.isArray(pageComponent) ? react_reactServerExports.createElement(react_reactServerExports.Fragment, null, pageComponent.map((_comp, order) => react_reactServerExports.createElement(Slot, {
        id: `page:${routePath}:${order}`,
        key: `page:${routePath}:${order}`
      }))) : react_reactServerExports.createElement(Slot, {
        id: `page:${routePath}`
      });
      return {
        elements: result,
        rootElement: react_reactServerExports.createElement(rootItem ? rootItem.component : DefaultRoot, null, react_reactServerExports.createElement(Children)),
        routeElement: createNestedElements(layouts, finalPageChildren)
      };
    },
    handleApi: async (path, { url, ...options }) => {
      await configure();
      const routePath = getApiRoutePath(path, options.method);
      if (!routePath) {
        throw new Error("API Route not found: " + path);
      }
      const { handlers } = apiPathMap.get(routePath);
      const req = new Request(url, options);
      const handler = handlers[options.method] ?? handlers.all;
      if (!handler) {
        throw new Error("API method not found: " + options.method + "for path: " + path);
      }
      const res = await handler(req);
      return {
        ...res.body ? {
          body: res.body
        } : {},
        headers: Object.fromEntries(res.headers.entries()),
        status: res.status
      };
    }
  });
  return definedRouter;
};
const getSlugsAndWildcards = (pathSpec) => {
  let numSlugs = 0;
  let numWildcards = 0;
  for (const slug of pathSpec) {
    if (slug.type !== "literal") {
      numSlugs++;
    }
    if (slug.type === "wildcard") {
      numWildcards++;
    }
  }
  return {
    numSlugs,
    numWildcards
  };
};
const IGNORED_PATH_PARTS = /* @__PURE__ */ new Set([
  "_components",
  "_hooks"
]);
const isIgnoredPath = (paths) => paths.some((p) => IGNORED_PATH_PARTS.has(p));
const __vite_import_meta_env__ = {};
const DO_NOT_BUNDLE = "";
function unstable_fsRouter(importMetaUrl, loadPage, options) {
  const buildOptions = unstable_getBuildOptions();
  return createPages(async ({ createPage, createLayout, createRoot, createApi, createPagePart }) => {
    let files = await unstable_getPlatformData("fsRouterFiles");
    if (!files) {
      if (__vite_import_meta_env__ && true && !buildOptions.unstable_phase) {
        throw new Error("files must be set in production.");
      }
      const [{ readdir }, { join, dirname, extname, sep }, { fileURLToPath }] = await Promise.all([
        import(
          /* @vite-ignore */
          DO_NOT_BUNDLE + "node:fs/promises"
        ),
        import(
          /* @vite-ignore */
          DO_NOT_BUNDLE + "node:path"
        ),
        import(
          /* @vite-ignore */
          DO_NOT_BUNDLE + "node:url"
        )
      ]);
      const pagesDir = join(dirname(fileURLToPath(importMetaUrl)), options.pagesDir);
      files = await readdir(pagesDir, {
        encoding: "utf8",
        recursive: true
      });
      files = files.flatMap((file) => {
        const myExt = extname(file);
        const myExtIndex = EXTENSIONS.indexOf(myExt);
        if (myExtIndex === -1) {
          return [];
        }
        file = file.replace(/(?<=^|\/|\\)_([^/]+)_(?=\/|\\|\.)/g, "[$1]");
        file = sep === "/" ? file : file.replace(/\\/g, "/");
        const exts = [
          myExt,
          ...EXTENSIONS
        ];
        exts.splice(myExtIndex + 1, 1);
        for (const ext of exts) {
          const f = file.slice(0, -myExt.length) + ext;
          if (loadPage(f)) {
            return [
              f
            ];
          }
        }
        throw new Error("Failed to resolve " + file);
      });
    }
    if (buildOptions.unstable_phase) {
      await unstable_setPlatformData("fsRouterFiles", files, true);
    }
    for (const file of files) {
      const mod = await loadPage(file);
      const config = await mod.getConfig?.();
      const pathItems = file.replace(/\.\w+$/, "").split("/").filter(Boolean);
      if (isIgnoredPath(pathItems)) {
        continue;
      }
      const path = "/" + ([
        "_layout",
        "index",
        "_root"
      ].includes(pathItems.at(-1)) || pathItems.at(-1)?.startsWith("_part") ? pathItems.slice(0, -1) : pathItems).join("/");
      if (pathItems.at(-1) === "[path]") {
        throw new Error("Page file cannot be named [path]. This will conflict with the path prop of the page component.");
      } else if (pathItems.at(0) === options.apiDir) {
        if (config?.render === "static") {
          if (Object.keys(mod).length !== 2 || !mod.GET) {
            console.warn(`API ${path} is invalid. For static API routes, only a single GET handler is supported.`);
          }
          createApi({
            path: pathItems.join("/"),
            render: "static",
            method: "GET",
            handler: mod.GET
          });
        } else {
          const validMethods = new Set(METHODS);
          const handlers = Object.fromEntries(Object.entries(mod).flatMap(([exportName, handler]) => {
            const isValidExport = exportName === "getConfig" || exportName === "default" || validMethods.has(exportName);
            if (!isValidExport) {
              console.warn(`API ${path} has an invalid export: ${exportName}. Valid exports are: ${METHODS.join(", ")}`);
            }
            return isValidExport && exportName !== "getConfig" ? exportName === "default" ? [
              [
                "all",
                handler
              ]
            ] : [
              [
                exportName,
                handler
              ]
            ] : [];
          }));
          createApi({
            path: pathItems.join("/"),
            render: "dynamic",
            handlers
          });
        }
      } else if (pathItems.at(-1) === "_layout") {
        createLayout({
          path,
          component: mod.default,
          render: "static",
          ...config
        });
      } else if (pathItems.at(-1) === "_root") {
        createRoot({
          component: mod.default,
          render: "static",
          ...config
        });
      } else if (pathItems.at(-1)?.startsWith("_part")) {
        createPagePart({
          path,
          component: mod.default,
          render: "dynamic",
          ...config
        });
      } else {
        createPage({
          path,
          component: mod.default,
          render: "dynamic",
          ...config
        });
      }
    }
    return null;
  });
}
const serverEntry = unstable_fsRouter(
  "file:///Users/robmarscher/Code/waku-examples/ssr-exclude-client-component/src/server-entry.js",
  (file) => /* @__PURE__ */ Object.assign({ "/src/pages/_layout.tsx": () => import("./pages/_layout.js"), "/src/pages/index.tsx": () => import("./pages/index.js") })[`/src/pages/${file}`]?.(),
  { pagesDir: "pages", apiDir: "api" }
);
const configPrd = {
  basePath: "/",
  rscBase: "RSC"
};
function loadMiddleware() {
  return Promise.all([
    import("./assets/context-CTQLbpga.js"),
    import("./assets/dev-server-D5zZ9Hs3.js"),
    import("./assets/waku.cloudflare-middleware-DjZzkYpD.js"),
    import("./assets/handler-WmIZABf4.js")
  ]);
}
function loadModule(id) {
  switch (id) {
    case "rsdw-server":
      return import("./assets/server.edge-CF9qSfbL.js").then((n) => n.s);
    case "client/rd-server":
      return import("./ssr/rd-server.js");
    case "client/rsdw-client":
      return import("./ssr/rsdw-client.js");
    case "client/waku-minimal-client":
      return import("./ssr/assets/rsc1-0cc2eaeb6.js");
    case "ssr/assets/rsc0-340664ac5.js":
      return import("./ssr/assets/rsc0-340664ac5.js");
    case "ssr/assets/rsc1-0cc2eaeb6.js":
      return import("./ssr/assets/rsc1-0cc2eaeb6.js");
    case "ssr/assets/rsc2-8727ced3f.js":
      return import("./ssr/assets/rsc2-8727ced3f.js");
    case "ssr/assets/rsc3-40eab323f.js":
      return import("./ssr/assets/rsc3-40eab323f.js");
    default:
      throw new Error("Cannot find module: " + id);
  }
}
globalThis.__WAKU_SERVER_IMPORT__ = loadModule;
globalThis.__WAKU_CLIENT_IMPORT__ = (id) => loadModule("ssr/" + id);
const defaultHtmlHead = "\n    <script type=\"module\" async>\nglobalThis.__WAKU_CLIENT_IMPORT__ = (id) => import(id);\n</script>\n\n    <script async type=\"module\" crossorigin src=\"/assets/indexHtml-jSUpxxkM.js\"></script>\n    <link rel=\"modulepreload\" crossorigin href=\"/assets/index-BVOCwoKb.js\">\n    <link rel=\"modulepreload\" crossorigin href=\"/assets/client-CwvIu2bL.js\">\n    <link rel=\"modulepreload\" crossorigin href=\"/assets/client-XN82YjJy.js\">\n    <link rel=\"modulepreload\" crossorigin href=\"/assets/rsc2-8727ced3f.js\">\n    <link rel=\"stylesheet\" href=\"/assets/_layout-DeWeFboy.css\">\n  ";
const dynamicHtmlPaths = [[[],"\n    <script type=\"module\" async>\nglobalThis.__WAKU_CLIENT_IMPORT__ = (id) => import(id);\n</script>\n\n    <script async type=\"module\" crossorigin src=\"/assets/indexHtml-jSUpxxkM.js\"></script>\n    <link rel=\"modulepreload\" crossorigin href=\"/assets/index-BVOCwoKb.js\">\n    <link rel=\"modulepreload\" crossorigin href=\"/assets/client-CwvIu2bL.js\">\n    <link rel=\"modulepreload\" crossorigin href=\"/assets/client-XN82YjJy.js\">\n    <link rel=\"modulepreload\" crossorigin href=\"/assets/rsc2-8727ced3f.js\">\n    <link rel=\"stylesheet\" href=\"/assets/_layout-DeWeFboy.css\">\n  <script type=\"module\" async>\nglobalThis.__WAKU_ROUTER_PREFETCH__ = (path) => {\n  const path2ids = {\"^/$\":[\"/assets/rsc2-8727ced3f.js\",\"/assets/rsc1-0cc2eaeb6.js\",\"/assets/rsc0-340664ac5.js\"]};\n  const pattern = Object.keys(path2ids).find((key) => new RegExp(key).test(path));\n  if (pattern && path2ids[pattern]) {\n    for (const id of path2ids[pattern] || []) {\n      import(id);\n    }\n  }\n};</script>"]];
const publicIndexHtml = "\n<!doctype html>\n<html>\n  <head>\n    <script type=\"module\" async>\nglobalThis.__WAKU_CLIENT_IMPORT__ = (id) => import(id);\n</script>\n\n    <script async type=\"module\" crossorigin src=\"/assets/indexHtml-jSUpxxkM.js\"></script>\n    <link rel=\"modulepreload\" crossorigin href=\"/assets/index-BVOCwoKb.js\">\n    <link rel=\"modulepreload\" crossorigin href=\"/assets/client-CwvIu2bL.js\">\n    <link rel=\"modulepreload\" crossorigin href=\"/assets/client-XN82YjJy.js\">\n    <link rel=\"modulepreload\" crossorigin href=\"/assets/rsc2-8727ced3f.js\">\n    <link rel=\"stylesheet\" href=\"/assets/_layout-DeWeFboy.css\">\n  </head>\n  <body>\n  </body>\n</html>\n";
const loadPlatformData = 
(key) => {
  switch (key) {
    case 'fsRouterFiles': return import('./platform-data/fsRouterFiles.js').then((m) => m.default);
case 'defineRouterPathConfigs': return import('./platform-data/defineRouterPathConfigs.js').then((m) => m.default);
    default: throw new Error('Cannot find platform data: ' + key);
  }
}
;
const serverEntry$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  configPrd,
  default: serverEntry,
  defaultHtmlHead,
  dynamicHtmlPaths,
  loadMiddleware,
  loadModule,
  loadPlatformData,
  publicIndexHtml
}, Symbol.toStringTag, { value: "Module" }));
export {
  INTERNAL_setAllEnv as I,
  SRC_MAIN as S,
  INTERNAL_setPlatformDataLoader as a,
  getErrorInfo as b,
  stringToStream as c,
  configPrd,
  serverEntry$1 as d,
  serverEntry as default,
  defaultHtmlHead,
  dynamicHtmlPaths,
  filePathToFileURL as f,
  getPathMapping as g,
  loadMiddleware,
  loadModule,
  loadPlatformData,
  publicIndexHtml,
  streamToArrayBuffer as s
};
