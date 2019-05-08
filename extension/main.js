var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Editor;
(function (Editor_1) {
    class Editor {
        constructor(value = '', js = false) {
            this.editor = document.createElement('textarea');
            this.editor.spellcheck = false;
            this.editor.value = value;
            this.editor.placeholder = '/* ' + (js ? 'JavaScript' : 'CSS') + ' */';
            this.setEditorCSS(js);
        }
        setEditorCSS(bottom = false) {
            this.editor.style.display = 'none';
            this.editor.style.position = 'fixed';
            this.editor.style.top = 50 * +bottom + '%';
            this.editor.style.right = '0';
            this.editor.style.width = '300px';
            this.editor.style.height = '50%';
            this.editor.style.zIndex = '9999999999999';
            this.editor.style.overflow = 'auto';
            this.editor.style.outline = 'none';
            this.editor.style.padding = '10px 20px';
            this.editor.style.border = 'none';
            this.editor.style.borderLeft = '1px solid #ccc';
            this.editor.style.color = '#222';
            this.editor.style.background = '#fcfcfc';
            this.editor.style.font = '12px "Inconsolata", "Consolas", "Menlo", "Monaco", "Lucida Console", "Courier New", "Courier", monospace;';
            this.editor.style.direction = 'ltr';
            this.editor.style.textAlign = 'left';
        }
    }
    Editor_1.Editor = Editor;
})(Editor || (Editor = {}));
var Helpers;
(function (Helpers) {
    let cssEl;
    Helpers.applyStyles = (css) => {
        if (!cssEl) {
            cssEl = document.createElement('style');
            document.head.appendChild(cssEl);
        }
        cssEl.innerHTML = css;
    };
    Helpers.applyScripts = (js) => {
        console.group('Custom JS function: ');
        try {
            new Function('"use strict";return (' + js + ')')();
            console.log('___________________');
        }
        catch (e) {
            console.warn(js);
            console.warn(e);
            console.log('___________________');
        }
        console.groupEnd();
    };
    Helpers.debounce = (f, ms) => {
        let timer = null;
        return function (...args) {
            const onComplete = () => {
                f.apply(this, args);
                timer = null;
            };
            if (timer) {
                clearTimeout(timer);
            }
            timer = setTimeout(onComplete, ms);
        };
    };
})(Helpers || (Helpers = {}));
(function () {
    window.addEventListener('DOMContentLoaded', (event) => __awaiter(this, void 0, void 0, function* () {
        const M_KEY_CODE = 77;
        const storage = new Database.Storage();
        const json = JSON.parse(yield storage.get());
        const code = {
            css: json['css'] || '',
            js: json['js'] || ''
        };
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
        let lastFocusElement = null;
        window.addEventListener('keydown', event => {
            if (event.ctrlKey && event.keyCode === M_KEY_CODE) {
                if (CSSEditor.editor.style.display !== 'block') {
                    CSSEditor.editor.style.display = 'block';
                    JSEditor.editor.style.display = 'block';
                    lastFocusElement = document.activeElement;
                    CSSEditor.editor.focus();
                }
                else {
                    if (lastFocusElement) {
                        lastFocusElement.focus();
                    }
                    CSSEditor.editor.style.display = 'none';
                    JSEditor.editor.style.display = 'none';
                }
            }
        });
    }));
})();
var Database;
(function (Database) {
    Database.STORAGE_KEY = 'am-css-js-injector-' + window.location.host;
    class Storage {
        constructor() {
            this.cache = '{}';
        }
        get() {
            return new Promise(resolve => {
                chrome.storage.sync.get(Database.STORAGE_KEY, result => {
                    this.cache = result[Database.STORAGE_KEY] || '{}';
                    resolve(this.cache);
                });
            });
        }
        set(data) {
            this.cache = data;
            chrome.storage.sync.set({ [Database.STORAGE_KEY]: data });
            return data;
        }
    }
    Database.Storage = Storage;
})(Database || (Database = {}));
