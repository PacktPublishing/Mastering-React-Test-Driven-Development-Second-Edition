import React from "react";
import {
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { CustomerSearch } from "./CustomerSearch/CustomerSearch";

const convertParams = () => {
  const [params] = useSearchParams();
  const obj = {};
  if (params.has("searchTerm")) {
    obj.searchTerm = params.get("searchTerm");
  }
  if (params.has("limit")) {
    obj.limit = parseInt(params.get("limit"), 10);
  }
  if (params.has("lastRowIds")) {
    obj.lastRowIds = params
      .get("lastRowIds")
      .split(",")
      .filter((id) => id !== "");
  }
  return obj;
};

export const CustomerSearchRoute = (props) => (
  <CustomerSearch
    {...props}
    navigate={useNavigate()}
    {...convertParams()}
  />
);
