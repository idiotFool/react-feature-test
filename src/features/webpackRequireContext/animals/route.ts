import { lazy } from "react";
import { animals } from "../routeContants";
// import Animals from "./index";

const Animals = lazy(() => import("./index"));

export default () => ({
  path: animals,
  cpt: Animals
});
