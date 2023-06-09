const { defineConfig } = require("@vue/cli-service");
const vueClickToComponent = require("vue-click-to-component/vue-cli-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    vueClickToComponent(config);
  },
});
