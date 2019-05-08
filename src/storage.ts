module Database {
  export const STORAGE_KEY: string = 'am-css-js-injector-' + window.location.host;

  export class Storage {
    private cache: string = '{}';

    constructor() { }

    public get(): Promise<string> {
      return new Promise(resolve => {
        chrome.storage.sync.get(STORAGE_KEY, result => {
          this.cache = result[STORAGE_KEY] || '{}';
          resolve(this.cache);
        });
      })
    }

    public set(data: string) {
      this.cache = data;
      chrome.storage.sync.set({ [STORAGE_KEY]: data });
      return data;
    }
  }
}