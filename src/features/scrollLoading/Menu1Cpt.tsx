import React from "react";
import "./index.css";

const Menu1Cpt = ({ id }: { id: string }) => {
  return (
    <div className="wrapper" id={id}>
      这是{id}对应的组件内容
    </div>
  );
};

export default Menu1Cpt;
