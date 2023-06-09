module.exports = function (webpackConfig) {
  webpackConfig.module
    .rule("vue-click-to-component")
    .test(/\.vue$/)
    .pre()
    .use("vue-click-to-component/loader")
    .loader("vue-click-to-component/loader")
    .end();
};
