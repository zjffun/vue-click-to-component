const { getSourceWithSourceCodeLocation } = require("./dist/index.js");
const htmlTags = require("html-tags");

module.exports = function (source) {
  if (
    process.env.VUE_CLICK_TO_COMPONENT_FORCE_ENABLE !== "true" &&
    process.env.NODE_ENV !== "development"
  ) {
    // disable loader
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
    console.error("[vue-click-to-component-loader] error", {
      file: id,
      error: error && error.message,
    });

    return source;
  }
};
