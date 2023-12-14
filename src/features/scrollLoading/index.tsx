import React, { useLayoutEffect, useState } from "react";

import Menu from "./Menu";
import type { MenuItem } from "./types";
import MenuCpt from "./Menu1Cpt";
import { useScroll } from "./useScroll";

import "./index.css";

const ScrollLoading = () => {
  const menus: Array<MenuItem> = [
    {
      id: "menu1",
      label: "Menu 1",
      components: () => import("./Menu1Cpt")
    },
    {
      id: "menu2",
      label: "Menu 2",
      components: () => import("./Menu1Cpt")
    },
    {
      id: "menu3",
      label: "Menu 3",
      components: () => import("./Menu1Cpt")
    },
    {
      id: "menu4",
      label: "Menu 4",
      components: () => import("./Menu1Cpt")
    }
  ];

  const [selectedMenu, setSelectedMenu] = useState<string>("menu1"); // 存储对应的menu的id
  const handleClick = (id: string) => {
    setSelectedMenu(id);
    const target = document.querySelector(`#${id}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };
  const [, scrollHeight] = useScroll();

  useLayoutEffect(() => {
    // 在滚动时，当当前的滚动高度大于某一个节点的offsetHeight属性值时，设置对应你的节点为高亮节点
    const activeMenu = menus.find((item) => {
      const target = document.querySelector(`#${item.id}`) as HTMLElement;
      const height = target?.offsetTop + target?.clientHeight - 100;
      return scrollHeight < height;
    });

    console.log(activeMenu, "=====");
    activeMenu?.id && setSelectedMenu(activeMenu.id);
  }, [scrollHeight, menus]);

  return (
    <div className="scrollBox">
      <div className="topBanner">这是banner区域</div>
      <div className="container">
        <div className="menu_container">
          <Menu
            menus={menus}
            selectedMenu={selectedMenu}
            handleClick={handleClick}
          />
        </div>
        <div className="content_container">
          <MenuCpt id="menu1" />
          <MenuCpt id="menu2" />
          <MenuCpt id="menu3" />
          <MenuCpt id="menu4" />
        </div>
      </div>
    </div>
  );
};

export default ScrollLoading;
