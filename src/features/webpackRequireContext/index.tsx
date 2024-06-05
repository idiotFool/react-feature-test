/**
 * 通过webpack提供的require.context方法，解析每个文件下的route.js文件
 * 每个route.js文件中定义了这个文件夹的路由路径，以及要显示的组件
 *
 * 注意(ts报错)：在react 18中，提示react refers to a UMD global, but the current file is a module；
 * 需要在ts的配置文件中确保jsx为react-jsx
 *
 * jsx： preserve  --- 不进行jsx转换
 *       react     --- 使用React.createElement进行转换
 *       react-jsx --- 在react17以及更高版本引入，使用新的jsx转换器进行转换
 */

import { useEffect } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import RoutesConfig from "./routes";
import Home from "./components/Home";
import { animals } from "./routeContants";

import "./index.css";

export default function WebpackRequireContext() {
  useEffect(() => {
    document.title = "路由";
  }, []);

  return (
    <Router>
      <Route path="/">
        <Home />
        <Redirect to={animals} />
      </Route>
      <RoutesConfig />
    </Router>
  );
}
