declare global {
  interface Window {
    __VUE_CLICK_TO_COMPONENT_URL_FUNCTION__: (data: {
      sourceCodeLocation: string;
    }) => string | Promise<string>;
  }
}

export {};
