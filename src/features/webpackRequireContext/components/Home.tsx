import { useState } from "react";
import { useHistory } from "react-router-dom";
import { animals, flowers, fruits } from "../routeContants";

export default function Home() {
  const [count, setCount] = useState(0);
  const history = useHistory();

  console.log(history, "history");

  const handleNavigate = (path: string) => {
    history.push(path);
  };

  return (
    <div className="common_area">
      <h2>this is common area</h2>
      <div className="carousel_area">
        <p>{count}</p>
        <button onClick={() => setCount(count + 1)}>点我试试</button>

        <div className="route_wrapper">
          <div onClick={() => handleNavigate(animals)}>动物</div>
          <div onClick={() => handleNavigate(flowers)}>鲜花</div>
          <div onClick={() => handleNavigate(fruits)}>水果</div>
        </div>
      </div>
    </div>
  );
}
