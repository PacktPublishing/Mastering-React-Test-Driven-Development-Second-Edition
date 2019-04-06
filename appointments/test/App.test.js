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
  CustomerForm: jest.fn(() => (
    <div id="CustomerForm" />
  )),
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

  it("renders CustomerForm at the /addCustomer endpoint", () => {
    renderWithRouter(<App />, {
      location: "/addCustomer",
    });
    expect(CustomerForm).toBeRendered();
  });

  it("renders AppointmentFormRoute at /addAppointment", () => {
    renderWithRouter(<App />, {
      location: "/addAppointment?customer=123",
    });
    expect(AppointmentFormRoute).toBeRendered();
  });

  it("renders CustomerSearchRoute at /searchCustomers", () => {
    renderWithRouter(<App />, {
      location: "/searchCustomers",
    });
    expect(CustomerSearchRoute).toBeRendered();
  });

  it("renders CustomerHistory at /viewHistory", () => {
    renderWithRouter(<App />, {
      location: "/viewHistory?customer=123",
    });
    expect(CustomerHistoryRoute).toBeRendered();
  });

  const customer = { id: "123" };

  it("renders a link to the /addCustomer route", async () => {
    renderWithRouter(<App />);
    expect(linkFor("/addCustomer")).toBeDefined();
  });

  it("captions the /addCustomer link as 'Add customer and appointment'", async () => {
    renderWithRouter(<App />);
    expect(linkFor("/addCustomer")).toContainText(
      "Add customer and appointment"
    );
  });

  it("renders a link to the /searchCustomers route", async () => {
    renderWithRouter(<App />);
    expect(linkFor("/searchCustomers")).toBeDefined();
  });

  it("captions the /searchCustomers link as 'Search customers'", async () => {
    renderWithRouter(<App />);
    expect(linkFor("/searchCustomers")).toContainText(
      "Search customers"
    );
  });

  it("displays the CustomerSearch when link is clicked", async () => {
    renderWithRouter(<App />);
    click(linkFor("/searchCustomers"));
    expect(CustomerSearchRoute).toBeRendered();
  });

  it("navigates to / when AppointmentFormRoute is saved", () => {
    renderWithRouter(<App />, {
      location: "/addAppointment?customer=123",
    });
    const onSave = propsOf(
      AppointmentFormRoute
    ).onSave;
    act(() => onSave());
    expect(history.location.pathname).toEqual("/");
  });

  describe("search customers", () => {
    const searchFor = (customer) =>
      propsOf(
        CustomerSearchRoute
      ).renderCustomerActions(customer);

    it("renders a link to the /addAppointment route for each CustomerSearch row", async () => {
      renderWithRouter(<App />);
      click(linkFor("/searchCustomers"));
      renderWithRouter(searchFor(customer));
      expect(
        linkFor("/addAppointment?customer=123")
      ).toBeDefined();
    });

    it("renders a link to the /viewHistory route for each CustomerSearch row", () => {
      renderWithRouter(<App />);
      click(linkFor("/searchCustomers"));
      renderWithRouter(searchFor(customer));
      expect(
        linkFor("/viewHistory?customer=123")
      ).not.toBeNull();
    });
  });
});
