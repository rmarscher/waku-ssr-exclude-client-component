import "./assets/context-CTQLbpga.js";
import { r as resolveConfigDev } from "./assets/config-DdJCqSee.js";
const HONO_CONTEXT = "__hono_context";
const serverEngine = (options) => {
  const middlewarePromise = options.cmd === "start" ? options.loadEntries().then((entries) => entries.loadMiddleware()) : resolveConfigDev(options.config).then((config) => loadMiddlewareDev(config));
  const handlersPromise = middlewarePromise.then((middlewareList) => middlewareList.map((middleware) => middleware.default(options)));
  return async (c, next) => {
    const ctx = {
      req: {
        body: c.req.raw.body,
        url: new URL(c.req.url),
        method: c.req.method,
        headers: c.req.header()
      },
      res: {},
      data: {
        [HONO_CONTEXT]: c
      }
    };
    const handlers = await handlersPromise;
    const run = async (index) => {
      if (index >= handlers.length) {
        return;
      }
      let alreadyCalled = false;
      await handlers[index](ctx, async () => {
        if (!alreadyCalled) {
          alreadyCalled = true;
          await run(index + 1);
        }
      });
    };
    await run(0);
    if (ctx.res.body || ctx.res.status) {
      const status = ctx.res.status || 200;
      const headers = ctx.res.headers || {};
      if (ctx.res.body) {
        return c.body(ctx.res.body, status, headers);
      }
      return c.body(null, status, headers);
    }
    await next();
  };
};
const DO_NOT_BUNDLE = "";
async function loadMiddlewareDev(configDev) {
  const [{ resolve }, { pathToFileURL }, { loadServerModule }] = await Promise.all([
    import(
      /* @vite-ignore */
      DO_NOT_BUNDLE + "node:path"
    ),
    import(
      /* @vite-ignore */
      DO_NOT_BUNDLE + "node:url"
    ),
    import(
      /* @vite-ignore */
      DO_NOT_BUNDLE + "../utils/vite-loader.js"
    )
  ]);
  return Promise.all(configDev.middleware.map(async (file) => {
    const idOrFileURL = file.startsWith("./") ? pathToFileURL(resolve(file)).toString() : file;
    return loadServerModule(idOrFileURL);
  }));
}
const importHono = () => import("./assets/index-BrYj3Qp3.js");
const { Hono } = await importHono();
const loadEntries = () => import("./server-entry.js").then((n) => n.d);
const loadHonoEnhancer = async () => {
  return (await import("./assets/waku.hono-enhancer-BylSRrEA.js")).default;
};
let serve;
let app;
const createApp = (app2) => {
  app2.use((c, next) => serve(c, next));
  app2.notFound(async (c) => {
    const assetsFetcher = c.env.ASSETS;
    const url = new URL(c.req.raw.url);
    const errorHtmlUrl = url.origin + "/404.html";
    const notFoundStaticAssetResponse = await assetsFetcher.fetch(
      new URL(errorHtmlUrl)
    );
    if (notFoundStaticAssetResponse && notFoundStaticAssetResponse.status < 400) {
      return c.body(notFoundStaticAssetResponse.body, 404);
    }
    return c.text("404 Not Found", 404);
  });
  return app2;
};
const serveCloudflare = {
  async fetch(request, env, ctx) {
    if (!serve) {
      serve = serverEngine({ cmd: "start", loadEntries, env, unstable_onError: /* @__PURE__ */ new Set() });
    }
    if (!app) {
      const honoEnhancer = await loadHonoEnhancer();
      app = honoEnhancer(createApp)(new Hono());
    }
    return app.fetch(request, env, ctx);
  }
};
export {
  serveCloudflare as default
};
