if (process.env.NODE_ENV === "development") {
  console.warn("vue-click-to-component enabled in development mode");

  function cleanTarget() {
    document
      .querySelectorAll("[data-click-to-component-target]")
      .forEach((el) => {
        el.removeAttribute("data-click-to-component-target");
      });
  }

  function getElWithSourceCodeLocation(el) {
    try {
      while (el && !el.dataset.__sourceCodeLocation) {
        el = el.parentElement;
      }
    } catch (error) {
      return null;
    }

    return el;
  }

  function getSourceCodeLocation(el) {
    const _el = getElWithSourceCodeLocation(el);
    if (!_el) {
      return null;
    }
    return _el.dataset.__sourceCodeLocation;
  }

  function setTarget(el) {
    let _el = getElWithSourceCodeLocation(el);

    if (!_el) {
      return;
    }

    _el.setAttribute("data-click-to-component-target", "");
  }

  document.head.insertAdjacentHTML(
    "beforeend",
    `
<style type="text/css" key="click-to-component-style">
  [data-click-to-component] * {
    pointer-events: auto !important;
  }

  [data-click-to-component-target] {
    cursor: var(--click-to-component-cursor, context-menu) !important;
    outline: auto 1px;
    outline: var(
      --click-to-component-outline,
      -webkit-focus-ring-color auto 1px
    ) !important;
  }
</style>`
  );

  /* --- open --- */
  window.addEventListener(
    "click",
    (e) => {
      if (e.altKey && e.button === 0) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        const sourceCodeLocation = getSourceCodeLocation(e.target);
        if (!sourceCodeLocation) {
          return;
        }

        let editor = "vscode";
        if (typeof window.__VUE_CLICK_TO_COMPONENT_EDITOR__ === "string") {
          editor = window.__VUE_CLICK_TO_COMPONENT_EDITOR__;
        }

        window.open(`${editor}://file/${sourceCodeLocation}`);

        cleanTarget();
      }
    },
    true
  );

  /* --- set target --- */
  window.addEventListener(
    "mousemove",
    (e) => {
      cleanTarget();

      if (e.altKey) {
        setTarget(e.target);
      }
    },
    true
  );

  /* --- clean target --- */
  window.addEventListener(
    "keyup",
    (e) => {
      if (e.key === "Alt") {
        cleanTarget();
      }
    },
    true
  );

  window.addEventListener(
    "blur",
    () => {
      cleanTarget();
    },
    true
  );
}
