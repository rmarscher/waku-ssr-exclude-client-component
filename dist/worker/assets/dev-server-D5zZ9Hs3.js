const __vite_import_meta_env__ = {};
const DO_NOT_BUNDLE = "";
const devServer = (options) => {
  if (__vite_import_meta_env__ && true) {
    return (_ctx, next) => next();
  }
  const devServerImplPromise = import(
    /* @vite-ignore */
    DO_NOT_BUNDLE + "./dev-server-impl.js"
  ).then(({ devServer: devServer2 }) => devServer2(options));
  return async (ctx, next) => {
    const devServerImpl = await devServerImplPromise;
    return devServerImpl(ctx, next);
  };
};
export {
  devServer as default
};
