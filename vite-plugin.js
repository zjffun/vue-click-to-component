const fs = require("fs");
const { getSourceWithSourceCodeLocation } = require("./dist/index.js");
const htmlTags = require("html-tags");

module.exports = function vitePlugin() {
  return {
    name: "vite-plugin-click-to-component",
    enforce: "pre",
    load(id) {
      if (process.env.NODE_ENV !== "development") {
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
          console.error("[vite-plugin-click-to-component] error", {
            file: id,
            error: error && error.message,
          });

          return;
        }
      }
    },
  };
};
