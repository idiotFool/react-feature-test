import { useLayoutEffect, useState } from "react";

export function useScroll() {
  const [isFixed, setIsFixed] = useState<boolean>(false);
  const [scrollHeight, setScrollHeight] = useState<number>(0);
  useLayoutEffect(() => {
    const container = document.querySelector(".container") as HTMLElement;

    const scrollFn = () => {
      // 获取滚动高度
      const scrollHeight = container.scrollTop;
      console.log("滚动高度", scrollHeight);

      // 如果页面滚动高度大于header到顶部的高度，就让吸顶
      setIsFixed(scrollHeight >= 20);
      setScrollHeight(scrollHeight);
    };

    container.addEventListener("scroll", scrollFn);

    return () => container.removeEventListener("scroll", scrollFn);
  }, []);

  return [isFixed, scrollHeight];
}
