if (process.env.NODE_ENV === "development") {
  console.warn("[vue-click-to-component] enabled");

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
</style>`,
  );

  /* --- open --- */
  window.addEventListener(
    "click",
    (e) => {
      if (e.altKey && e.button === 0) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();

        const elWithSourceCodeLocation = getElWithSourceCodeLocation(e.target);
        if (!elWithSourceCodeLocation) {
          return;
        }

        const sourceCodeLocation =
          elWithSourceCodeLocation.dataset.__sourceCodeLocation;

        // __VUE_CLICK_TO_COMPONENT_URL_FUNCTION__ can be async
        const urlPromise = Promise.resolve().then(() => {
          if (
            typeof window.__VUE_CLICK_TO_COMPONENT_URL_FUNCTION__ !== "function"
          ) {
            // Fix https://github.com/zjffun/vue-click-to-component/issues/4
            if (sourceCodeLocation.startsWith("/")) {
              return `vscode://file${sourceCodeLocation}`;
            }

            return `vscode://file/${sourceCodeLocation}`;
          }

          return window.__VUE_CLICK_TO_COMPONENT_URL_FUNCTION__({
            sourceCodeLocation,
            element: elWithSourceCodeLocation,
          });
        });

        urlPromise
          .then((url) => {
            if (!url) {
              console.error(
                "[vue-click-to-component] url is empty, please check __VUE_CLICK_TO_COMPONENT_URL_FUNCTION__",
              );
              return;
            }

            window.open(url);
          })
          .catch((e) => {
            console.error(e);
          })
          .finally(() => {
            cleanTarget();
          });
      }
    },
    true,
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
    true,
  );

  /* --- clean target --- */
  window.addEventListener(
    "keyup",
    (e) => {
      if (e.key === "Alt") {
        cleanTarget();
      }
    },
    true,
  );

  window.addEventListener(
    "blur",
    () => {
      cleanTarget();
    },
    true,
  );
}
