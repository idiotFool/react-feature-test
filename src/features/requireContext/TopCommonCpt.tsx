import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch, useLocation } from "react-router-dom";
import { Carousel } from "antd";
import "./style.css";

const datas = [
  {
    id: "1",
    value: "悟空",
    path: "wukong"
  },
  {
    id: "2",
    value: "八戒",
    path: "bajie"
  }
];

const contentStyle: React.CSSProperties = {
  height: "160px",
  color: "#fff",
  lineHeight: "160px",
  textAlign: "center",
  background: "#364d79"
};

export const TopCarousel: React.FC = () => (
  <Carousel autoplay>
    <div>
      <h3 style={contentStyle}>1</h3>
    </div>
    <div>
      <h3 style={contentStyle}>2</h3>
    </div>
    <div>
      <h3 style={contentStyle}>3</h3>
    </div>
    <div>
      <h3 style={contentStyle}>4</h3>
    </div>
  </Carousel>
);

export const TopCommonCpt = () => {
  const [count, setCount] = useState(0);
  const history = useHistory();
  const { url } = useRouteMatch();
  const location = useLocation();
  const [activeId, setActiveId] = useState(() => {
    const matchObj = datas.filter((data) =>
      location.pathname.includes(data.path)
    )[0];
    return matchObj?.id || "1";
  });

  const clickHandler = (path: string, id: string) => {
    history.push(path);
    setActiveId(id);
  };

  useEffect(() => {
    console.log("top common");
    return () => {
      console.log("top common unmounted");
    };
  }, []);

  return (
    <>
      <div className="layout">
        <div className="topCommon">
          <h2>当前的计数是： {count}</h2>
          <button onClick={() => setCount(count + 1)}>更新计数</button>
        </div>

        <TopCarousel />
      </div>

      <div className="layout">
        {datas.map(({ value, id, path }) => {
          return (
            <button
              key={id}
              className={activeId === id ? "active" : ""}
              onClick={() => clickHandler(`${url}/${path}`, id)}
            >
              {value}
            </button>
          );
        })}
      </div>
    </>
  );
};
