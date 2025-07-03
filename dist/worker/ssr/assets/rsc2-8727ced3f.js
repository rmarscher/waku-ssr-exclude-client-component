import { r as reactExports } from "./index-D4N3kwqt.js";
import { Root, useElementsPromise_UNSTABLE, useEnhanceFetchRscInternal_UNSTABLE, useRefetch, prefetchRsc, Slot, g as getErrorInfo } from "./rsc1-0cc2eaeb6.js";
import "./index-TKDiFiC_.js";
import "./index-Pm7HIP5V.js";
import "./react-server-dom-webpack-client.edge.production-dF25wLiU.js";
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
const ROUTE_ID = "ROUTE";
const IS_STATIC_ID = "IS_STATIC";
const HAS404_ID = "HAS404";
const SKIP_HEADER = "X-Waku-Router-Skip";
const normalizeRoutePath = (path) => {
  for (const suffix of [
    "/",
    "/index.html"
  ]) {
    if (path.endsWith(suffix)) {
      return path.slice(0, -suffix.length) || "/";
    }
  }
  return path;
};
const parseRoute = (url) => {
  const { pathname, searchParams, hash } = url;
  return {
    path: normalizeRoutePath(pathname),
    query: searchParams.toString(),
    hash
  };
};
const parseRouteFromLocation = () => {
  const httpStatusMeta = document.querySelector('meta[name="httpstatus"]');
  if (httpStatusMeta && "content" in httpStatusMeta && httpStatusMeta.content === "404") {
    return {
      path: "/404",
      query: "",
      hash: ""
    };
  }
  return parseRoute(new URL(window.location.href));
};
const isAltClick = (event) => event.button !== 0 || !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
let savedRscParams;
const createRscParams = (query) => {
  if (savedRscParams && savedRscParams[0] === query) {
    return savedRscParams[1];
  }
  const rscParams = new URLSearchParams({
    query
  });
  savedRscParams = [
    query,
    rscParams
  ];
  return rscParams;
};
const RouterContext = reactExports.createContext(null);
function useRouter() {
  const router = reactExports.useContext(RouterContext);
  if (!router) {
    throw new Error("Missing Router");
  }
  const { route, changeRoute, prefetchRoute } = router;
  const push = reactExports.useCallback(async (to, options) => {
    const url = new URL(to, window.location.href);
    const newPath = url.pathname !== window.location.pathname;
    window.history.pushState({
      ...window.history.state,
      waku_new_path: newPath
    }, "", url);
    await changeRoute(parseRoute(url), {
      shouldScroll: options?.scroll ?? newPath
    });
  }, [
    changeRoute
  ]);
  const replace = reactExports.useCallback(async (to, options) => {
    const url = new URL(to, window.location.href);
    const newPath = url.pathname !== window.location.pathname;
    window.history.replaceState(window.history.state, "", url);
    await changeRoute(parseRoute(url), {
      shouldScroll: options?.scroll ?? newPath
    });
  }, [
    changeRoute
  ]);
  const reload = reactExports.useCallback(async () => {
    const url = new URL(window.location.href);
    await changeRoute(parseRoute(url), {
      shouldScroll: true
    });
  }, [
    changeRoute
  ]);
  const back = reactExports.useCallback(() => {
    window.history.back();
  }, []);
  const forward = reactExports.useCallback(() => {
    window.history.forward();
  }, []);
  const prefetch = reactExports.useCallback((to) => {
    const url = new URL(to, window.location.href);
    prefetchRoute(parseRoute(url));
  }, [
    prefetchRoute
  ]);
  return {
    ...route,
    push,
    replace,
    reload,
    back,
    forward,
    prefetch,
    unstable_events: router.routeChangeEvents
  };
}
function useSharedRef(ref) {
  const managedRef = reactExports.useRef(null);
  const handleRef = reactExports.useCallback((node) => {
    managedRef.current = node;
    const isRefCallback = typeof ref === "function";
    let cleanup;
    if (isRefCallback) {
      cleanup = ref(node);
    } else if (ref) {
      ref.current = node;
    }
    return () => {
      managedRef.current = null;
      if (isRefCallback) {
        if (cleanup) {
          cleanup();
        } else {
          ref(null);
        }
      } else if (ref) {
        ref.current = null;
      }
    };
  }, [
    ref
  ]);
  return [
    managedRef,
    handleRef
  ];
}
function Link({ to, children, scroll, unstable_pending, unstable_notPending, unstable_prefetchOnEnter, unstable_prefetchOnView, unstable_startTransition, ref: refProp, ...props }) {
  const router = reactExports.useContext(RouterContext);
  const changeRoute = router ? router.changeRoute : () => {
    throw new Error("Missing Router");
  };
  const prefetchRoute = router ? router.prefetchRoute : () => {
    throw new Error("Missing Router");
  };
  const [isPending, startTransition] = reactExports.useTransition();
  const startTransitionFn = unstable_startTransition || (unstable_pending || unstable_notPending) && startTransition || ((fn) => fn());
  const [ref, setRef] = useSharedRef(refProp);
  reactExports.useEffect(() => {
    if (unstable_prefetchOnView && ref.current) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const url = new URL(to, window.location.href);
            if (router && url.href !== window.location.href) {
              const route = parseRoute(url);
              router.prefetchRoute(route);
            }
          }
        });
      }, {
        threshold: 0.1
      });
      observer.observe(ref.current);
      return () => {
        observer.disconnect();
      };
    }
  }, [
    unstable_prefetchOnView,
    router,
    to,
    ref
  ]);
  const internalOnClick = () => {
    const url = new URL(to, window.location.href);
    if (url.href !== window.location.href) {
      const route = parseRoute(url);
      prefetchRoute(route);
      startTransitionFn(async () => {
        const newPath = url.pathname !== window.location.pathname;
        window.history.pushState({
          ...window.history.state,
          waku_new_path: newPath
        }, "", url);
        await changeRoute(route, {
          shouldScroll: scroll ?? newPath,
          unstable_startTransition: startTransitionFn
        });
      });
    }
  };
  const onClick = (event) => {
    if (props.onClick) {
      props.onClick(event);
    }
    if (!event.defaultPrevented && !isAltClick(event)) {
      event.preventDefault();
      internalOnClick();
    }
  };
  const onMouseEnter = unstable_prefetchOnEnter ? (event) => {
    const url = new URL(to, window.location.href);
    if (url.href !== window.location.href) {
      const route = parseRoute(url);
      prefetchRoute(route);
    }
    props.onMouseEnter?.(event);
  } : props.onMouseEnter;
  const ele = reactExports.createElement("a", {
    ...props,
    href: to,
    onClick,
    onMouseEnter,
    ref: setRef
  }, children);
  if (isPending && unstable_pending !== void 0) {
    return reactExports.createElement(reactExports.Fragment, null, ele, unstable_pending);
  }
  if (!isPending && unstable_notPending !== void 0) {
    return reactExports.createElement(reactExports.Fragment, null, ele, unstable_notPending);
  }
  return ele;
}
const notAvailableInServer = (name) => () => {
  throw new Error(`${name} is not in the server`);
};
function renderError(message) {
  return reactExports.createElement("html", null, reactExports.createElement("body", null, reactExports.createElement("h1", null, message)));
}
class ErrorBoundary extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  render() {
    if ("error" in this.state) {
      if (this.state.error instanceof Error) {
        return renderError(this.state.error.message);
      }
      return renderError(String(this.state.error));
    }
    return this.props.children;
  }
}
const NotFound = ({ has404, reset }) => {
  const router = reactExports.useContext(RouterContext);
  if (!router) {
    throw new Error("Missing Router");
  }
  const { changeRoute } = router;
  reactExports.useEffect(() => {
    if (has404) {
      const url = new URL("/404", window.location.href);
      changeRoute(parseRoute(url), {
        shouldScroll: true
      }).then(() => {
        setTimeout(() => {
          reset();
        }, 1);
      }).catch((err) => {
        console.log("Error while navigating to 404:", err);
      });
    }
  }, [
    has404,
    reset,
    changeRoute
  ]);
  return has404 ? null : reactExports.createElement("h1", null, "Not Found");
};
const Redirect = ({ to, reset }) => {
  const router = reactExports.useContext(RouterContext);
  if (!router) {
    throw new Error("Missing Router");
  }
  const { changeRoute } = router;
  reactExports.useEffect(() => {
    const url = new URL(to, window.location.href);
    if (url.hostname !== window.location.hostname) {
      window.location.replace(to);
      return;
    }
    const newPath = url.pathname !== window.location.pathname;
    window.history.pushState({
      ...window.history.state,
      waku_new_path: newPath
    }, "", url);
    changeRoute(parseRoute(url), {
      shouldScroll: newPath
    }).then(() => {
      setTimeout(() => {
        reset();
      }, 1);
    }).catch((err) => {
      console.log("Error while navigating to redirect:", err);
    });
  }, [
    to,
    reset,
    changeRoute
  ]);
  return null;
};
class CustomErrorHandler extends reactExports.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
    this.reset = this.reset.bind(this);
  }
  static getDerivedStateFromError(error) {
    return {
      error
    };
  }
  reset() {
    this.setState({
      error: null
    });
  }
  render() {
    const { error } = this.state;
    if (error !== null) {
      const info = getErrorInfo(error);
      if (info?.status === 404) {
        return reactExports.createElement(NotFound, {
          has404: this.props.has404,
          reset: this.reset
        });
      }
      if (info?.location) {
        return reactExports.createElement(Redirect, {
          to: info.location,
          reset: this.reset
        });
      }
      throw error;
    }
    return this.props.children;
  }
}
const ThrowError = ({ error }) => {
  throw error;
};
const getRouteSlotId = (path) => "route:" + decodeURI(path);
const handleScroll = () => {
  const { hash } = window.location;
  const { state } = window.history;
  const element = hash && document.getElementById(hash.slice(1));
  window.scrollTo({
    left: 0,
    top: element ? element.getBoundingClientRect().top + window.scrollY : 0,
    behavior: state?.waku_new_path ? "instant" : "auto"
  });
};
const InnerRouter = ({ initialRoute }) => {
  const elementsPromise = useElementsPromise_UNSTABLE();
  const [has404, setHas404] = reactExports.useState(false);
  const staticPathSetRef = reactExports.useRef(/* @__PURE__ */ new Set());
  const cachedIdSetRef = reactExports.useRef(/* @__PURE__ */ new Set());
  reactExports.useEffect(() => {
    elementsPromise.then((elements) => {
      const { [ROUTE_ID]: routeData, [IS_STATIC_ID]: isStatic, [HAS404_ID]: has404FromElements, ...rest } = elements;
      if (has404FromElements) {
        setHas404(true);
      }
      if (routeData) {
        const [path, _query] = routeData;
        if (isStatic) {
          staticPathSetRef.current.add(path);
        }
      }
      cachedIdSetRef.current = new Set(Object.keys(rest));
    }, () => {
    });
  }, [
    elementsPromise
  ]);
  const enhanceFetchRscInternal = useEnhanceFetchRscInternal_UNSTABLE();
  const locationListenersRef = reactExports.useRef(/* @__PURE__ */ new Set());
  const locationListeners = locationListenersRef.current;
  reactExports.useEffect(() => {
    const enhanceFetch = (fetchFn) => (input, init = {}) => {
      const skipStr = JSON.stringify(Array.from(cachedIdSetRef.current));
      const headers = init.headers ||= {};
      if (Array.isArray(headers)) {
        headers.push([
          SKIP_HEADER,
          skipStr
        ]);
      } else {
        headers[SKIP_HEADER] = skipStr;
      }
      return fetchFn(input, init);
    };
    return enhanceFetchRscInternal((fetchRscInternal) => (rscPath, rscParams, prefetchOnly, fetchFn = fetch) => {
      const enhancedFetch = enhanceFetch(fetchFn);
      const elementsPromise2 = fetchRscInternal(rscPath, rscParams, prefetchOnly, enhancedFetch);
      Promise.resolve(elementsPromise2).then((elements = {}) => {
        const { [ROUTE_ID]: routeData, [IS_STATIC_ID]: isStatic } = elements;
        if (routeData) {
          const [path, query] = routeData;
          if (window.location.pathname !== path || !isStatic && window.location.search.replace(/^\?/, "") !== query) {
            locationListeners.forEach((listener) => listener(path, query));
          }
        }
      }).catch(() => {
      });
      return elementsPromise2;
    });
  }, [
    enhanceFetchRscInternal,
    locationListeners
  ]);
  const refetch = useRefetch();
  const [route, setRoute] = reactExports.useState(() => ({
    // This is the first initialization of the route, and it has
    // to ignore the hash, because on server side there is none.
    // Otherwise there will be a hydration error.
    // The client side route, including the hash, will be updated in the effect below.
    ...initialRoute,
    hash: ""
  }));
  const routeChangeListenersRef = reactExports.useRef(null);
  if (routeChangeListenersRef.current === null) {
    const listeners = {
      start: /* @__PURE__ */ new Set(),
      complete: /* @__PURE__ */ new Set()
    };
    const executeListeners2 = (eventType, eventRoute) => {
      const eventListenersSet = listeners[eventType];
      if (!eventListenersSet.size) {
        return;
      }
      for (const listener of eventListenersSet) {
        listener(eventRoute);
      }
    };
    const events = /* @__PURE__ */ (() => {
      const on = (event, handler) => {
        listeners[event].add(handler);
      };
      const off = (event, handler) => {
        listeners[event].delete(handler);
      };
      return {
        on,
        off
      };
    })();
    routeChangeListenersRef.current = [
      events,
      executeListeners2
    ];
  }
  reactExports.useEffect(() => {
    setRoute((prev) => {
      if (prev.path === initialRoute.path && prev.query === initialRoute.query && prev.hash === initialRoute.hash) {
        return prev;
      }
      return initialRoute;
    });
  }, [
    initialRoute
  ]);
  const [routeChangeEvents, executeListeners] = routeChangeListenersRef.current;
  const [err, setErr] = reactExports.useState(null);
  const refetching = reactExports.useRef(null);
  const changeRoute = reactExports.useCallback(async (route2, options) => {
    executeListeners("start", route2);
    const startTransitionFn = options.unstable_startTransition || ((fn) => fn());
    refetching.current = [];
    setErr(null);
    const { skipRefetch } = options || {};
    if (!staticPathSetRef.current.has(route2.path) && !skipRefetch) {
      const rscPath = encodeRoutePath(route2.path);
      const rscParams = createRscParams(route2.query);
      try {
        await refetch(rscPath, rscParams);
      } catch (e) {
        refetching.current = null;
        setErr(e);
        throw e;
      }
    }
    startTransitionFn(() => {
      if (options.shouldScroll) {
        handleScroll();
      }
      setRoute(route2);
      refetching.current[0]?.();
      refetching.current = null;
      executeListeners("complete", route2);
    });
  }, [
    executeListeners,
    refetch
  ]);
  const prefetchRoute = reactExports.useCallback((route2) => {
    if (staticPathSetRef.current.has(route2.path)) {
      return;
    }
    const rscPath = encodeRoutePath(route2.path);
    const rscParams = createRscParams(route2.query);
    prefetchRsc(rscPath, rscParams);
    globalThis.__WAKU_ROUTER_PREFETCH__?.(route2.path);
  }, []);
  reactExports.useEffect(() => {
    const callback = () => {
      const route2 = parseRoute(new URL(window.location.href));
      changeRoute(route2, {
        shouldScroll: true
      }).catch((err2) => {
        console.log("Error while navigating back:", err2);
      });
    };
    window.addEventListener("popstate", callback);
    return () => {
      window.removeEventListener("popstate", callback);
    };
  }, [
    changeRoute
  ]);
  reactExports.useEffect(() => {
    const callback = (path, query) => {
      const fn = () => {
        const url = new URL(window.location.href);
        url.pathname = path;
        url.search = query;
        url.hash = "";
        if (path !== "/404") {
          window.history.pushState({
            ...window.history.state,
            waku_new_path: url.pathname !== window.location.pathname
          }, "", url);
        }
        changeRoute(parseRoute(url), {
          skipRefetch: true,
          shouldScroll: false
        }).catch((err2) => {
          console.log("Error while navigating to new route:", err2);
        });
      };
      if (refetching.current) {
        refetching.current.push(fn);
      } else {
        reactExports.startTransition(fn);
      }
    };
    locationListeners.add(callback);
    return () => {
      locationListeners.delete(callback);
    };
  }, [
    changeRoute,
    locationListeners
  ]);
  const routeElement = err !== null ? reactExports.createElement(ThrowError, {
    error: err
  }) : reactExports.createElement(Slot, {
    id: getRouteSlotId(route.path)
  });
  const rootElement = reactExports.createElement(Slot, {
    id: "root"
  }, reactExports.createElement(CustomErrorHandler, {
    has404
  }, routeElement));
  return reactExports.createElement(RouterContext, {
    value: {
      route,
      changeRoute,
      prefetchRoute,
      routeChangeEvents
    }
  }, rootElement);
};
function Router({ initialRoute = parseRouteFromLocation() }) {
  const initialRscPath = encodeRoutePath(initialRoute.path);
  const initialRscParams = createRscParams(initialRoute.query);
  return reactExports.createElement(Root, {
    initialRscPath,
    initialRscParams
  }, reactExports.createElement(InnerRouter, {
    initialRoute
  }));
}
const MOCK_ROUTE_CHANGE_LISTENER = {
  on: () => notAvailableInServer("routeChange:on"),
  off: () => notAvailableInServer("routeChange:off")
};
function INTERNAL_ServerRouter({ route, httpstatus }) {
  const routeElement = reactExports.createElement(Slot, {
    id: getRouteSlotId(route.path)
  });
  const rootElement = reactExports.createElement(Slot, {
    id: "root"
  }, reactExports.createElement("meta", {
    name: "httpstatus",
    content: `${httpstatus}`
  }), routeElement);
  return reactExports.createElement(reactExports.Fragment, null, reactExports.createElement(RouterContext, {
    value: {
      route,
      changeRoute: notAvailableInServer("changeRoute"),
      prefetchRoute: notAvailableInServer("prefetchRoute"),
      routeChangeEvents: MOCK_ROUTE_CHANGE_LISTENER
    }
  }, rootElement));
}
export {
  ErrorBoundary,
  INTERNAL_ServerRouter,
  Link,
  Router,
  useRouter
};
