import { r as reactExports } from "./index-D4N3kwqt.js";
import { g as getDefaultExportFromCjs } from "./index-Pm7HIP5V.js";
import { r as requireReactServerDomWebpackClient_edge_production } from "./react-server-dom-webpack-client.edge.production-dF25wLiU.js";
import "./index-TKDiFiC_.js";
var client_edge = { exports: {} };
var hasRequiredClient_edge;
function requireClient_edge() {
  if (hasRequiredClient_edge) return client_edge.exports;
  hasRequiredClient_edge = 1;
  {
    client_edge.exports = requireReactServerDomWebpackClient_edge_production();
  }
  return client_edge.exports;
}
var client_edgeExports = requireClient_edge();
const RSDWClient = /* @__PURE__ */ getDefaultExportFromCjs(client_edgeExports);
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
const createCustomError = (message, errorInfo) => {
  const err = new Error(message);
  err.digest = prefix + JSON.stringify(errorInfo);
  return err;
};
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
const encodeRscPath = (rscPath) => {
  if (rscPath.startsWith("_")) {
    throw new Error("rscPath must not start with `_`: " + rscPath);
  }
  if (rscPath.endsWith("_")) {
    throw new Error("rscPath must not end with `_`: " + rscPath);
  }
  if (rscPath === "") {
    rscPath = "_";
  }
  if (rscPath.startsWith("/")) {
    rscPath = "_" + rscPath;
  }
  if (rscPath.endsWith("/")) {
    rscPath += "_";
  }
  return rscPath + ".txt";
};
const FUNC_PREFIX = "F/";
const encodeFuncId = (funcId) => {
  const [file, name] = funcId.split("#");
  if (name.includes("/")) {
    throw new Error("Function name must not include `/`: " + name);
  }
  if (file.startsWith("_")) {
    throw new Error("File must not start with `_`: " + file);
  }
  if (file.startsWith("/")) {
    return FUNC_PREFIX + "_" + file + "/" + name;
  }
  return FUNC_PREFIX + file + "/" + name;
};
const { createFromFetch, encodeReply, createTemporaryReferenceSet } = RSDWClient;
const DEFAULT_HTML_HEAD = [
  reactExports.createElement("meta", {
    charSet: "utf-8"
  }),
  reactExports.createElement("meta", {
    name: "viewport",
    content: "width=device-width, initial-scale=1"
  }),
  reactExports.createElement("meta", {
    name: "generator",
    content: "Waku"
  })
];
const BASE_RSC_PATH = `${"/"}${"RSC"}/`;
const checkStatus = async (responsePromise) => {
  const response = await responsePromise;
  if (!response.ok) {
    const location = response.headers.get("location");
    const err = createCustomError(await response.text() || response.statusText, {
      status: response.status,
      ...location && {
        location
      }
    });
    throw err;
  }
  return response;
};
const getCached = (c, m, k) => (m.has(k) ? m : m.set(k, c())).get(k);
const cache1 = /* @__PURE__ */ new WeakMap();
const mergeElementsPromise = (a, b) => {
  const getResult = () => Promise.all([
    a,
    b
  ]).then(([a2, b2]) => {
    const nextElements = {
      ...a2,
      ...b2
    };
    delete nextElements._value;
    return nextElements;
  });
  const cache2 = getCached(() => /* @__PURE__ */ new WeakMap(), cache1, a);
  return getCached(getResult, cache2, b);
};
const ENTRY = "e";
const SET_ELEMENTS = "s";
const FETCH_RSC_INTERNAL = "f";
const defaultFetchCache = {};
const createFetchRscInternal = (fetchCache) => (rscPath, rscParams, prefetchOnly, fetchFn = fetch) => {
  const prefetched = globalThis.__WAKU_PREFETCHED__ ||= {};
  let prefetchedEntry = prefetchOnly ? void 0 : prefetched[rscPath];
  delete prefetched[rscPath];
  if (prefetchedEntry) {
    if (Array.isArray(prefetchedEntry)) {
      if (prefetchedEntry[1] !== rscParams) {
        prefetchedEntry = void 0;
      }
    } else {
      prefetchedEntry = [
        prefetchedEntry
      ];
    }
  }
  const temporaryReferences = prefetchedEntry?.[2] || createTemporaryReferenceSet();
  const url = BASE_RSC_PATH + encodeRscPath(rscPath);
  const responsePromise = prefetchedEntry ? prefetchedEntry[0] : rscParams === void 0 ? fetchFn(url) : rscParams instanceof URLSearchParams ? fetchFn(url + "?" + rscParams) : encodeReply(rscParams, {
    temporaryReferences
  }).then((body) => fetchFn(url, {
    method: "POST",
    body
  }));
  if (prefetchOnly) {
    prefetched[rscPath] = [
      responsePromise,
      rscParams,
      temporaryReferences
    ];
    return void 0;
  }
  return createFromFetch(checkStatus(responsePromise), {
    callServer: (funcId, args) => unstable_callServerRsc(funcId, args, fetchCache),
    temporaryReferences
  });
};
const unstable_callServerRsc = async (funcId, args, fetchCache = defaultFetchCache) => {
  const setElements = fetchCache[SET_ELEMENTS];
  const fetchRscInternal = fetchCache[FETCH_RSC_INTERNAL];
  const rscPath = encodeFuncId(funcId);
  const rscParams = args.length === 1 && args[0] instanceof URLSearchParams ? args[0] : args;
  const { _value: value, ...data } = await fetchRscInternal(rscPath, rscParams);
  if (Object.keys(data).length) {
    reactExports.startTransition(() => {
      setElements((prev) => mergeElementsPromise(prev, data));
    });
  }
  return value;
};
const fetchRsc = (rscPath, rscParams, fetchCache = defaultFetchCache) => {
  const fetchRscInternal = fetchCache[FETCH_RSC_INTERNAL];
  const entry = fetchCache[ENTRY];
  if (entry && entry[0] === rscPath && entry[1] === rscParams) {
    return entry[2];
  }
  const data = fetchRscInternal(rscPath, rscParams);
  fetchCache[ENTRY] = [
    rscPath,
    rscParams,
    data
  ];
  return data;
};
const prefetchRsc = (rscPath, rscParams, fetchCache = defaultFetchCache) => {
  const fetchRscInternal = fetchCache[FETCH_RSC_INTERNAL];
  const prefetched = globalThis.__WAKU_PREFETCHED__ ||= {};
  const prefetchedEntry = prefetched[rscPath];
  if (Array.isArray(prefetchedEntry) && prefetchedEntry[1] === rscParams) {
    return;
  }
  fetchRscInternal(rscPath, rscParams, true);
};
const RefetchContext = reactExports.createContext(() => {
  throw new Error("Missing Root component");
});
const ElementsContext = reactExports.createContext(null);
const EnhanceFetchRscInternalContext = reactExports.createContext(() => {
  throw new Error("Missing Root component");
});
const useEnhanceFetchRscInternal_UNSTABLE = () => reactExports.use(EnhanceFetchRscInternalContext);
const Root = ({ initialRscPath, initialRscParams, fetchCache = defaultFetchCache, children }) => {
  fetchCache[FETCH_RSC_INTERNAL] ||= createFetchRscInternal(fetchCache);
  const enhanceFetchRscInternal = reactExports.useMemo(() => {
    const enhancers = /* @__PURE__ */ new Set();
    const enhance = () => {
      let fetchRscInternal = createFetchRscInternal(fetchCache);
      for (const fn of enhancers) {
        fetchRscInternal = fn(fetchRscInternal);
      }
      fetchCache[FETCH_RSC_INTERNAL] = fetchRscInternal;
    };
    return (fn) => {
      enhancers.add(fn);
      enhance();
      return () => {
        enhancers.delete(fn);
        enhance();
      };
    };
  }, [
    fetchCache
  ]);
  const [elements, setElements] = reactExports.useState(() => fetchRsc(initialRscPath || "", initialRscParams, fetchCache));
  reactExports.useEffect(() => {
    fetchCache[SET_ELEMENTS] = setElements;
  }, [
    fetchCache
  ]);
  const refetch = reactExports.useCallback(async (rscPath, rscParams) => {
    delete fetchCache[ENTRY];
    const data = fetchRsc(rscPath, rscParams, fetchCache);
    const dataWithoutErrors = Promise.resolve(data).catch(() => ({}));
    setElements((prev) => mergeElementsPromise(prev, dataWithoutErrors));
    await data;
  }, [
    fetchCache
  ]);
  return reactExports.createElement(EnhanceFetchRscInternalContext, {
    value: enhanceFetchRscInternal
  }, reactExports.createElement(RefetchContext, {
    value: refetch
  }, reactExports.createElement(ElementsContext, {
    value: elements
  }, ...DEFAULT_HTML_HEAD, children)));
};
const useRefetch = () => reactExports.use(RefetchContext);
const ChildrenContext = reactExports.createContext(void 0);
const ChildrenContextProvider = reactExports.memo(ChildrenContext);
const Children = () => reactExports.use(ChildrenContext);
const useElementsPromise_UNSTABLE = () => {
  const elementsPromise = reactExports.use(ElementsContext);
  if (!elementsPromise) {
    throw new Error("Missing Root component");
  }
  return elementsPromise;
};
const Slot = ({ id, children, unstable_fallback }) => {
  const elementsPromise = useElementsPromise_UNSTABLE();
  const elements = reactExports.use(elementsPromise);
  if (id in elements && elements[id] === void 0) {
    throw new Error("Element cannot be undefined, use null instead: " + id);
  }
  const element = elements[id];
  const isValidElement = element !== void 0;
  if (!isValidElement) {
    if (unstable_fallback) {
      return unstable_fallback;
    }
    throw new Error("Invalid element: " + id);
  }
  return reactExports.createElement(
    ChildrenContextProvider,
    {
      value: children
    },
    // FIXME is there `isReactNode` type checker?
    element
  );
};
const INTERNAL_ServerRoot = ({ elementsPromise, children }) => reactExports.createElement(ElementsContext, {
  value: elementsPromise
}, ...DEFAULT_HTML_HEAD, children);
export {
  Children,
  INTERNAL_ServerRoot,
  Root,
  Slot,
  fetchRsc,
  getErrorInfo as g,
  prefetchRsc,
  unstable_callServerRsc,
  useElementsPromise_UNSTABLE,
  useEnhanceFetchRscInternal_UNSTABLE,
  useRefetch
};
