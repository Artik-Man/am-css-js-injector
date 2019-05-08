module Helpers {
  let cssEl: Element;

  export const applyStyles = (css: string) => {
    if (!cssEl) {
      cssEl = document.createElement('style');
      document.head.appendChild(cssEl);
    }
    cssEl.innerHTML = css;
  }

  export const applyScripts = (js: string) => {
    if (!js.length) {
      return;
    }
    console.group('Custom JS function: ');
    try {
      new Function('"use strict";return (' + js + ')')();
      console.log('___________________');
    } catch (e) {
      console.warn(js);
      console.warn(e);
      console.log('___________________');
    }
    console.groupEnd();
  }

  export const debounce = (f: Function, ms: number) => {
    let timer = null;
    return function (...args) {
      const onComplete = () => {
        f.apply(this, args);
        timer = null;
      }
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(onComplete, ms);
    };
  }
}