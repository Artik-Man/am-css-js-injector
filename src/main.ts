(function () {
  window.addEventListener('DOMContentLoaded', async event => {
    const M_KEY_CODE = 77;
    const storage = new Database.Storage();
    const json = JSON.parse(await storage.get());
    const code = {
      css: json['css'] || '',
      js: json['js'] || ''
    }
    console.log(code);
    

    const CSSEditor = new Editor.Editor(code.css, false);
    document.body.appendChild(CSSEditor.editor);

    const applyStylesFn = Helpers.debounce(() => {
      code.css = CSSEditor.editor.value;
      Helpers.applyStyles(code.css);
      storage.set(JSON.stringify(code));
    }, 500);

    CSSEditor.editor.addEventListener('keyup', e => {
      applyStylesFn();
    });

    const JSEditor = new Editor.Editor(code.js, true);
    document.body.appendChild(JSEditor.editor);

    const applyScriptsFn = Helpers.debounce(() => {
      code.js = JSEditor.editor.value;
      Helpers.applyScripts(code.js);
      storage.set(JSON.stringify(code));
    }, 1500);

    JSEditor.editor.addEventListener('keyup', e => {
      applyScriptsFn();
    });

    applyStylesFn();
    applyScriptsFn();

    let lastFocusElement: HTMLElement = null;
    window.addEventListener('keydown', event => {
      if (event.ctrlKey && event.keyCode === M_KEY_CODE) {
        if (CSSEditor.editor.style.display !== 'block') {
          CSSEditor.editor.style.display = 'block';
          JSEditor.editor.style.display = 'block';
          lastFocusElement = document.activeElement as HTMLElement;
          CSSEditor.editor.focus();
        } else {
          if (lastFocusElement) {
            lastFocusElement.focus();
          }
          CSSEditor.editor.style.display = 'none';
          JSEditor.editor.style.display = 'none';
        }
      }
    });
  })
})();