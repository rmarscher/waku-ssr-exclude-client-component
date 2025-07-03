const DEFAULT_MIDDLEWARE = [
  "waku/middleware/context",
  "waku/middleware/dev-server",
  "waku/middleware/handler"
];
async function resolveConfigDev(config) {
  const configDev = {
    basePath: "/",
    srcDir: "src",
    distDir: "dist",
    pagesDir: "pages",
    apiDir: "api",
    privateDir: "private",
    rscBase: "RSC",
    middleware: DEFAULT_MIDDLEWARE,
    unstable_honoEnhancer: void 0,
    unstable_viteConfigs: void 0,
    ...config
  };
  return configDev;
}
export {
  resolveConfigDev as r
};
