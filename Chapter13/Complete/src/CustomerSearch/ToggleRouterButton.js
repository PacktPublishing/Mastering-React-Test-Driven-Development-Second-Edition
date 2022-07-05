import React from "react";
import { objectToQueryString } from "../objectToQueryString";
import { Link } from "react-router-dom";

export const ToggleRouterButton = ({
  queryParams,
  children,
  toggled,
}) => (
  <Link
    className={toggled ? "toggled" : ""}
    role="button"
    to={{
      search: objectToQueryString(queryParams),
    }}
  >
    {children}
  </Link>
);
