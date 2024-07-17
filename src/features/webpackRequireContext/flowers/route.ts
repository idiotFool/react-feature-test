import { lazy } from "react";
import { flowers } from "../routeContants";
// import Flowers from "./index";

const Flowers = lazy(() => import("./index"));

export default () => ({
  path: flowers,
  cpt: Flowers
});
