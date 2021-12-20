import React from "react";
import { act } from "react-dom/test-utils";
import {
  initializeReactContainer,
  element,
  elements,
  click,
  linkFor,
  propsOf,
  container,
  renderWithRouter,
  propsMatching,
  history,
} from "./reactTestExtensions";
import { Route } from "react-router-dom";
import { App } from "../src/App";
import { AppointmentFormRoute } from "../src/AppointmentFormRoute";
import { AppointmentsDayViewLoader } from "../src/AppointmentsDayViewLoader";
import { CustomerForm } from "../src/CustomerForm";
import { blankCustomer } from "./builders/customer";
import { blankAppointment } from "./builders/appointment";
import { CustomerSearchRoute } from "../src/CustomerSearchRoute";
import { CustomerHistoryRoute } from "../src/CustomerHistoryRoute";

jest.mock("../src/AppointmentFormRoute", () => ({
  AppointmentFormRoute: jest.fn(() => (
    <div id="AppointmentFormRoute" />
  )),
}));
jest.mock("../src/AppointmentsDayViewLoader", () => ({
  AppointmentsDayViewLoader: jest.fn(() => (
    <div id="AppointmentsDayViewLoader" />
  )),
}));
jest.mock("../src/CustomerForm", () => ({
  CustomerForm: jest.fn(() => <div id="CustomerForm" />),
}));
jest.mock("../src/CustomerSearchRoute", () => ({
  CustomerSearchRoute: jest.fn(() => (
    <div id="CustomerSearchRoute" />
  )),
}));
jest.mock("../src/CustomerHistoryRoute", () => ({
  CustomerHistoryRoute: jest.fn(() => (
    <div id="CustomerHistoryRoute" />
  )),
}));

describe("App", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  it("initially shows the AppointmentDayViewLoader", () => {
    renderWithRouter(<App />);
    expect(AppointmentsDayViewLoader).toBeRendered();
  });

  it("has a menu bar", () => {
    renderWithRouter(<App />);
    expect(element("menu")).not.toBeNull();
  });
});

describe("App", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders CustomerForm at the /addCustomer endpoint", () => {
    renderWithRouter(<App />, { location: "/addCustomer" });
    expect(CustomerForm).toBeRendered();
  });

  it("renders AppointmentFormRoute at /addAppointment", () => {
    renderWithRouter(<App />, {
      location: "/addAppointment?customer=123",
    });
    expect(AppointmentFormRoute).toBeRendered();
  });

  it("renders CustomerSearchRoute at /searchCustomers", () => {
    renderWithRouter(<App />, { location: "/searchCustomers" });
    expect(CustomerSearchRoute).toBeRendered();
  });

  it("renders CustomerHistory at /viewHistory", () => {
    renderWithRouter(<App />, {
      location: "/viewHistory?customer=123",
    });
    expect(CustomerHistoryRoute).toBeRendered();
  });

  const customer = { id: "123" };

  it("has a button to add a customer and appointment", () => {
    renderWithRouter(<App />);
    const firstButton = element(
      "menu > li:nth-of-type(1) > [role=button]"
    );
    expect(firstButton).toContainText(
      "Add customer and appointment"
    );
  });

  it("navigates to / when AppointmentFormRoute is saved", () => {
    renderWithRouter(<App />, {
      location: "/addAppointment?customer=123",
    });
    const onSave = propsOf(AppointmentFormRoute).onSave;
    act(() => onSave());
    expect(history.location.pathname).toEqual("/");
  });

  describe("search customers", () => {
    it("has a button to search customers", () => {
      renderWithRouter(<App />);
      const secondButton = element(
        "menu > li:nth-of-type(2) > [role=button]"
      );
      expect(secondButton).toContainText("Search customers");
    });

    const navigateToSearchCustomers = () =>
      click(
        element("menu > li:nth-of-type(2) > [role=button]")
      );

    const searchFor = (customer) =>
      propsOf(CustomerSearchRoute).renderCustomerActions(
        customer
      );

    it("displays the CustomerSearch when button is clicked", async () => {
      renderWithRouter(<App />);
      navigateToSearchCustomers();
      expect(element("#CustomerSearchRoute")).not.toBeNull();
    });

    it("renders a link to the /addAppointment route for each CustomerSearch row", async () => {
      renderWithRouter(<App />);
      navigateToSearchCustomers();
      renderWithRouter(searchFor(customer));
      expect(
        linkFor("/addAppointment?customer=123")
      ).not.toBeNull();
    });

    it("renders a link to the /viewHistory route for each CustomerSearch row", () => {
      renderWithRouter(<App />);
      navigateToSearchCustomers();
      renderWithRouter(searchFor(customer));
      expect(
        linkFor("/viewHistory?customer=123")
      ).not.toBeNull();
    });
  });
});
