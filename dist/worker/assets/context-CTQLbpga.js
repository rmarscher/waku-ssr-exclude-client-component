const setContextStorage = (storage) => {
  globalThis.__WAKU_MIDDLEWARE_CONTEXT_STORAGE__ ||= storage;
};
const getContextStorage = () => {
  return globalThis.__WAKU_MIDDLEWARE_CONTEXT_STORAGE__;
};
try {
  const { AsyncLocalStorage } = await import("node:async_hooks");
  setContextStorage(new AsyncLocalStorage());
} catch {
  console.warn("AsyncLocalStorage is not available");
}
let previousContext;
let currentContext;
const runWithContext = (context2, fn) => {
  const contextStorage = getContextStorage();
  if (contextStorage) {
    return contextStorage.run(context2, fn);
  }
  previousContext = currentContext;
  currentContext = context2;
  try {
    return fn();
  } finally {
    currentContext = previousContext;
  }
};
const context = () => {
  return async (ctx, next) => {
    const context2 = {
      req: ctx.req,
      data: ctx.data
    };
    return runWithContext(context2, next);
  };
};
function getContext() {
  const contextStorage = getContextStorage();
  const context2 = contextStorage?.getStore() ?? currentContext;
  if (!context2) {
    throw new Error("Context is not available. Make sure to use the context middleware. For now, Context is not available during the build time.");
  }
  return context2;
}
function getContextData() {
  const contextStorage = getContextStorage();
  const context2 = contextStorage?.getStore() ?? currentContext;
  if (!context2) {
    return {};
  }
  return context2.data;
}
export {
  context as default,
  getContext,
  getContextData
};
