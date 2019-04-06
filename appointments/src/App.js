import React, { useState, useCallback } from "react";
import {
  Link,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { AppointmentsDayViewLoader } from "./AppointmentsDayViewLoader";
import { CustomerForm } from "./CustomerForm";
import { CustomerSearchRoute } from "./CustomerSearchRoute";
import { AppointmentFormRoute } from "./AppointmentFormRoute";
import { CustomerHistoryRoute } from "./CustomerHistoryRoute";

const blankCustomer = {
  firstName: "",
  lastName: "",
  phoneNumber: "",
};

export const MainScreen = () => (
  <>
    <menu>
      <li>
        <Link to="/addCustomer" role="button">
          Add customer and appointment
        </Link>
      </li>
      <li>
        <Link to="/searchCustomers" role="button">
          Search customers
        </Link>
      </li>
    </menu>
    <AppointmentsDayViewLoader />
  </>
);

export const App = () => {
  const navigate = useNavigate();

  const transitionToDayView = () => navigate("/");

  const searchActions = (customer) => (
    <>
      <Link
        role="button"
        to={`/addAppointment?customer=${customer.id}`}
      >
        Create appointment
      </Link>
      <Link
        role="button"
        to={`/viewHistory?customer=${customer.id}`}
      >
        View history
      </Link>
    </>
  );

  return (
    <Routes>
      <Route
        path="/addCustomer"
        element={
          <CustomerForm original={blankCustomer} />
        }
      />
      <Route
        path="/addAppointment"
        element={
          <AppointmentFormRoute
            onSave={transitionToDayView}
          />
        }
      />
      <Route
        path="/searchCustomers"
        element={
          <CustomerSearchRoute
            renderCustomerActions={searchActions}
          />
        }
      />
      <Route
        path="/viewHistory"
        element={<CustomerHistoryRoute />}
      />
      <Route path="/" element={<MainScreen />} />
    </Routes>
  );
};
