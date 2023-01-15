import React from "react";
import { useHistory, useRouteMatch } from "react-router-dom";

export default function HomeBaJie() {
  const history = useHistory();
  const { url } = useRouteMatch();

  const clickHandler = () => {
    history.push(`${url}/detail`);
  };

  return (
    <>
      <h1>这是八戒页面</h1>
      <button onClick={clickHandler}>点我八戒娶媳妇</button>
    </>
  );
}
