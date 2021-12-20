import React from "react";
import {
  initializeReactContainer,
  renderWithRouter,
} from "./reactTestExtensions";
import {
  Route,
  Link,
  Switch,
} from "react-router-dom";
import { AppointmentFormRoute } from "../src/AppointmentFormRoute";
import { AppointmentFormLoader } from "../src/AppointmentFormLoader";

jest.mock("../src/AppointmentFormLoader", () => ({
  AppointmentFormLoader: jest.fn(() => (
    <div id="AppointmentFormLoader" />
  )),
}));

describe("AppointmentFormRoute", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  it("passes a blank appointment to the AppointmentFormLoader", () => {
    renderWithRouter(<AppointmentFormRoute />);
    expect(
      AppointmentFormLoader
    ).toBeRenderedWithProps({
      original: expect.objectContaining({
        service: "",
        stylist: "",
        startsAt: null,
      }),
    });
  });

  it("adds the customer id into the original appointment object", () => {
    renderWithRouter(<AppointmentFormRoute />, {
      location: "?customer=123",
    });
    expect(
      AppointmentFormLoader
    ).toBeRenderedWithProps({
      original: expect.objectContaining({
        customer: "123",
      }),
    });
  });

  it("passes all other props through to AppointmentForm", () => {
    const props = { a: "123", b: "456" };
    renderWithRouter(
      <AppointmentFormRoute {...props} />
    );
    expect(
      AppointmentFormLoader
    ).toBeRenderedWithProps(
      expect.objectContaining({
        a: "123",
        b: "456",
      })
    );
  });
});
