import React, { lazy, Suspense } from "react";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

export const routeContext = require.context("./", true, /\.route\.ts$/);

interface RouteConfig {
  path: string;
  component: any;
  children?: any[];
  exact?: boolean;
}

// step2： 通过递归优化后的代码； 但是有一个问题
// 嵌套路由只是Route的嵌套； 但对应的子路由并不渲染
export const routerCreator = (routeConfig: RouteConfig) => {
  const { path, exact, component, children } = routeConfig;
  const Component = lazy(component);

  return (
    <Route key={path} path={path} exact={!!exact}>
      <Suspense key={path} fallback={<div>Loading.....</div>}>
        <Component />
        {children?.map(routerCreator)}
      </Suspense>
    </Route>
  );
};

export const RequireContextAfter = () => {
  const keys = routeContext.keys();

  return (
    <Switch>
      {keys.map((key) => {
        return routerCreator(routeContext(key).default);
      })}
    </Switch>
  );
};

// step1： 代码结构太负责；需要优化
export const RequireContextBefore = () => {
  const keys = routeContext.keys();
  return (
    <Switch>
      {keys.map((key) => {
        const { component, path, exact, children } = routeContext(key).default;
        const Component = lazy(component);
        console.log(path, !!exact);
        return (
          <Route key={path} path={path} exact={!!exact}>
            <Suspense key={path} fallback={<div>Loading.....</div>}>
              <Component />
              {children &&
                children.map((child: any) => {
                  return (
                    <Route
                      key={child.path}
                      path={child.path}
                      exact={!!child.exact}
                      component={lazy(child.component)}
                    >
                      <Suspense
                        key={child.path}
                        fallback={<div>Loading.....</div>}
                      ></Suspense>
                    </Route>
                  );
                })}
            </Suspense>
          </Route>
        );
      })}
    </Switch>
  );
};

const Test = () => <h1>这是测试</h1>;

export const RequireContext = () => {
  const keys = routeContext.keys();
  return (
    <Switch>
      {keys.map((key) => {
        const { component, path, exact, childComponent, defaultChildPath } =
          routeContext(key).default;
        const Component = lazy(component);
        const ChildComponent = lazy(childComponent);
        console.log(path, !!exact);
        return (
          <Route key={path} path={path}>
            <Suspense key={path} fallback={<div>Loading.....</div>}>
              <Component />
              {childComponent && (
                <div className="content">
                  <Switch>
                    <Route path={path} exact={true}>
                      <Redirect to={defaultChildPath}></Redirect>
                    </Route>
                    <Route path={`${path}/:childRouteDiffParam`}>
                      <Suspense key={path} fallback={<div>Loading.....</div>}>
                        <ChildComponent></ChildComponent>
                      </Suspense>
                    </Route>
                  </Switch>
                </div>
              )}
            </Suspense>
          </Route>
        );
      })}
    </Switch>
  );
};
