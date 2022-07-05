import React from "react";
import { objectToQueryString } from "../objectToQueryString";
import { Link } from "react-router-dom";

export const RouterButton = ({
  queryParams,
  children,
  disabled,
}) => (
  <Link
    className={disabled ? "disabled" : ""}
    role="button"
    to={{
      search: objectToQueryString(queryParams),
    }}
  >
    {children}
  </Link>
);
