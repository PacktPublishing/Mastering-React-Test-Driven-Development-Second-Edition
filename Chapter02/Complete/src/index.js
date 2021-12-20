import React from "react";
import ReactDOM from "react-dom/client";
import { AppointmentsDayView } from "./AppointmentsDayView";
import { sampleAppointments } from "./sampleData";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AppointmentsDayView appointments={sampleAppointments} />
);
