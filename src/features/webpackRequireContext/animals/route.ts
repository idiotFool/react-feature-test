import { lazy } from "react";
import { animals } from "../routeContants";
import Animals from "./index";

export default () => ({
  path: animals,
  cpt: Animals
});
