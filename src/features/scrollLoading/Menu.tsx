import React from "react";
import type { MenuItem } from "./types";

const Menu = ({
  menus,
  selectedMenu,
  handleClick
}: {
  menus: Array<MenuItem>;
  selectedMenu: string;
  handleClick: (id: string) => void;
}) => {
  return (
    <ul>
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
