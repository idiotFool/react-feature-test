import React, { useRef } from "react";
import type { MenuItem } from "./types";

import { useScroll } from "./useScroll";
import "./index.css";

const Menu = ({
  menus,
  selectedMenu,
  handleClick
}: {
  menus: Array<MenuItem>;
  selectedMenu: string;
  handleClick: (id: string) => void;
}) => {
  const [isFixed] = useScroll();
  return (
    <ul id="menuContainer" className={`menuBox ${isFixed ? "fixed" : ""}`}>
      {menus.map((item) => (
        <li
          key={item.id}
          className={item.id === selectedMenu ? "active" : ""}
          onClick={() => handleClick(item.id)}
        >
          {item.label}
        </li>
      ))}
    </ul>
  );
};

export default Menu;
