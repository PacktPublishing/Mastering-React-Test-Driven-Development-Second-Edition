import React from "react";
import { useSearchParams } from "react-router-dom";
import { AppointmentFormLoader } from "./AppointmentFormLoader";

const blankAppointment = {
  service: "",
  stylist: "",
  startsAt: null,
};

export const AppointmentFormRoute = (props) => {
  const [params] = useSearchParams();

  return (
    <AppointmentFormLoader
      {...props}
      original={{
        ...blankAppointment,
        customer: params.get("customer"),
      }}
    />
  );
};
