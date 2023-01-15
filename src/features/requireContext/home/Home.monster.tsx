import React from "react";
import { useParams } from "react-router-dom";
import HomeBaJie from "./Home.bajie";
import HomeWuKong from "./Home.wukong";

export default function HomeMonster() {
  const { childRouteDiffParam }: any = useParams();

  return (
    <div>
      这是什么页面: <em>{childRouteDiffParam}</em>
      然后科技根据这个参数来区分路由来定制化对应的页面
      {childRouteDiffParam === "wukong" ? <HomeWuKong /> : <HomeBaJie />}
    </div>
  );
}
