const fs = require("fs");
const { getSourceWithSourceCodeLocation } = require("./dist/index.js");
const htmlTags = require("html-tags");

module.exports = function vitePlugin() {
  return {
    name: "vite-plugin-click-to-component",
    enforce: "pre",
    load(id) {
      if (
        process.env.VUE_CLICK_TO_COMPONENT_FORCE_ENABLE !== "true" &&
        process.env.NODE_ENV !== "development"
      ) {
        // disable vite plugin
        return;
      }

      if (id.endsWith(".vue")) {
        try {
          const source = fs.readFileSync(id, "utf-8");
          const sourceWithSourceCodeLocation = getSourceWithSourceCodeLocation({
            source,
            filePath: id,
            htmlTags,
          });

          return sourceWithSourceCodeLocation;
        } catch (error) {
          console.error("[vue-click-to-component-vite-plugin] error", {
            file: id,
            error: error && error.message,
          });

          return;
        }
      }
    },
  };
};
