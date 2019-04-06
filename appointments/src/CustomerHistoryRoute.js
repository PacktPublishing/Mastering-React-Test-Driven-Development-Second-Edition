import React from "react";
import { useSearchParams } from "react-router-dom";
import { CustomerHistory } from "./CustomerHistory";

export const CustomerHistoryRoute = (props) => {
  const [params, _] = useSearchParams();

  return (
    <CustomerHistory id={params.get("customer")} />
  );
};
