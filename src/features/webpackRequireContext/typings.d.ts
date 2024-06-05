import React from "react";

declare const require: {
  context(
    directory: string,
    useSubdirectories?: boolean,
    regExp?: RegExp
  ): {
    keys(): string[];
    <T>(id: string): T;
  };
};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // 这里添加你想要支持的 HTML 元素，例如 div, span, input 等
      [elemName: string]: any;
    }
  }
}
