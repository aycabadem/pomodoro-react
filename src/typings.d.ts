declare module NodeJS {
  interface Require {
    context(
      path: string,
      recursive: boolean,
      pattern: RegExp
    ): {
      keys(): string[];
    };
  }
}
