# vue-click-to-component

[![npm](https://img.shields.io/npm/v/vue-click-to-component)](https://www.npmjs.com/package/vue-click-to-component)

<kbd>Option+Click</kbd>(<kbd>Alt+Click</kbd>) a Component in the browser to **instantly** goto the source in your editor.

![Vite Demo](./images/vite.webp)

## Features

- <kbd>Option+Click</kbd>(<kbd>Alt+Click</kbd>) opens the immediate Component's source
- Supports `vscode` & `vscode-insiders`' [URL handling](https://code.visualstudio.com/docs/editor/command-line#_opening-vs-code-with-urls)
- Automatically **tree-shaken** from `production` builds

## Installation

<details>
<summary>npm</summary>

```shell
npm install vue-click-to-component
```

</details>

<details>
<summary>pnpm</summary>

```shell
pnpm add vue-click-to-component
```

</details>

<details>
<summary>yarn</summary>

```shell
yarn add vue-click-to-component
```

</details>

Even though `vue-click-to-component` is added to `dependencies`, [tree-shaking](https://esbuild.github.io/api/#tree-shaking) will remove `vue-click-to-component` from `production` builds.

## Usage

<details>
<summary>Vite</summary>

[`vite.config.ts`](./examples/vite/vite.config.ts#L7)

```diff
+import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueClickToComponent from 'vue-click-to-component/vite-plugin';

// https://vitejs.dev/config/
export default defineConfig({
-  plugins: [vue()],
+  plugins: [vueClickToComponent(), vue()],
})
```

[`main.ts`](./examples/vite/src/main.ts#L4)

```diff
import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
+import 'vue-click-to-component/client';

createApp(App).mount('#app')
```

</details>

<details>
<summary>Vue CLI</summary>

[`vue.config.js`](./examples/vue-cli/vue.config.js#L6-L8)

```diff
const { defineConfig } = require("@vue/cli-service");
+const vueClickToComponent = require("vue-click-to-component/vue-cli-plugin");

module.exports = defineConfig({
  transpileDependencies: true,
+  chainWebpack: (config) => {
+    vueClickToComponent(config);
+  },
});
```

[`main.js`](./examples/vue-cli/src/main.js#L3)

```diff
import Vue from 'vue'
import App from './App.vue'
+import 'vue-click-to-component/client.js'

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
```

</details>

<details>
<summary>webpack</summary>

[`webpack.config.js`](./examples/webpack/webpack.config.js#L31-L35)

```diff
module: {
  rules: [
+    {
+        test: /\.vue$/,
+        enforce: 'pre',
+        loader: 'vue-click-to-component/loader',
+    },
    {
        test: /\.vue$/,
        loader: 'vue-loader',
    },
  ],
},
```

[`main.js`](./examples/webpack/src/index.js#L3)

```diff
import { createApp } from "vue";
import App from "./App.vue";
+import "vue-click-to-component/client.js";

createApp(App).mount("#app");
```

[`package.json`](./examples/webpack/package.json#L10)

```diff
"scripts": {
-  "serve": "webpack serve"
+  "serve": "NODE_ENV=development webpack serve"
},
```

</details>

### `editor`

By default, clicking will default `editor` to [`vscode`](https://code.visualstudio.com/).

If, like me, you use [`vscode-insiders`](https://code.visualstudio.com/insiders/), you can set `editor` explicitly:

```diff
import 'vue-click-to-component/client';
+window.__VUE_CLICK_TO_COMPONENT_EDITOR__ = 'vscode-insiders';
```
