import { lazy } from "react";
import { flowers } from "../routeContants";
import Flowers from "./index";

export default () => ({
  path: flowers,
  cpt: Flowers
});
