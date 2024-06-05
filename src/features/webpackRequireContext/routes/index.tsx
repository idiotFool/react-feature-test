import { Switch, Route } from "react-router-dom";

export default function RoutesConfig() {
  const routeContexts = require.context("../animals", true, /.*route\.ts$/);
  const routeKeys = routeContexts.keys();

  return (
    <Switch>
      {routeKeys.map((key) => {
        const route = routeContexts(key);
        console.log("key: ", key, "route: ", route.default());

        const { path, cpt: Cpt, ...rest } = route.default();
        return <Route key={path} path={path} component={Cpt}></Route>;
      })}
    </Switch>
  );
}
