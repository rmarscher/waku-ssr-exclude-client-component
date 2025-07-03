function isWranglerDev(headers) {
  return !headers?.["cf-visitor"];
}
const cloudflareMiddleware = () => {
  return async (ctx, next) => {
    await next();
    if (!isWranglerDev(ctx.req.headers)) {
      return;
    }
    const contentType = ctx.res.headers?.["content-type"];
    if (!contentType || contentType.includes("text/html") || contentType.includes("text/plain")) {
      ctx.res.headers ||= {};
      ctx.res.headers["content-encoding"] = "Identity";
    }
  };
};
export {
  cloudflareMiddleware as default
};
