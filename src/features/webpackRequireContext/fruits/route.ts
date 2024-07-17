import { lazy } from "react";
import { fruits } from "../routeContants";
// import Fruits from "./index";

const Fruits = lazy(() => import("./index"));

export default () => ({
  path: fruits,
  cpt: Fruits
});
