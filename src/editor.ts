module Editor {
  export class Editor {
    public editor: HTMLTextAreaElement;
    constructor(value = '', js = false) {
      this.editor = document.createElement('textarea');
      this.editor.spellcheck = false;
      this.editor.value = value;
      this.editor.placeholder = '/* ' + (js ? 'JavaScript' : 'CSS') + ' */'
      this.setEditorCSS(js);
    }

    private setEditorCSS(bottom = false) {
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
      this.editor.style.font = '12px "Inconsolata", "Consolas", "Menlo", "Monaco", "Lucida Console", "Courier New", "Courier", monospace;'
      this.editor.style.direction = 'ltr';
      this.editor.style.textAlign = 'left';
    }
  }
}