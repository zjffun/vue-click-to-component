const { getSourceWithSourceCodeLocation } = require("./dist/index.js");
const htmlTags = require("html-tags");

module.exports = function (source) {
  if (process.env.NODE_ENV !== "development") {
    return source;
  }

  try {
    const { resourcePath } = this;
    const sourceWithSourceCodeLocation = getSourceWithSourceCodeLocation({
      source,
      filePath: resourcePath,
      htmlTags,
    });

    return sourceWithSourceCodeLocation;
  } catch (error) {
    console.error("[vite-plugin-click-to-component] error", {
      file: id,
      error: error && error.message,
    });

    return source;
  }
};
