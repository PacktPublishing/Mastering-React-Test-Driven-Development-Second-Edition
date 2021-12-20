import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CustomerSearch } from "./CustomerSearch/CustomerSearch";

const convertParams = (url) => {
  const params = new URLSearchParams(url);
  const obj = {};
  if (params.has("searchTerm")) {
    obj.searchTerm = params.get("searchTerm");
  }
  if (params.has("limit")) {
    obj.limit = parseInt(params.get("limit"));
  }
  if (params.has("lastRowIds")) {
    obj.lastRowIds = params
      .get("lastRowIds")
      .split(",")
      .filter((id) => id !== "");
  }
  return obj;
};

export const CustomerSearchRoute = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <CustomerSearch
      {...props}
      location={location}
      navigate={navigate}
      {...convertParams(location.search)}
    />
  );
};
