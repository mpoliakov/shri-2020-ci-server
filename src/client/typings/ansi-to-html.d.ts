declare module 'ansi-to-html' {
  export interface Options {
    fg: string;
    bg: string;
  }

  export default class Convert {
    constructor(options: Options);
    toHtml: (ansi: string) => string;
  }
}


