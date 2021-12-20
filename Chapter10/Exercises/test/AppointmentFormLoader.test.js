import React from "react";
import {
  initializeReactContainer,
  renderAndWait,
} from "./reactTestExtensions";
import { fetchResponseOk } from "./builders/fetch";
import { AppointmentFormLoader } from "../src/AppointmentFormLoader";
import { AppointmentForm } from "../src/AppointmentForm";
import { todayAt } from "./builders/time";

jest.mock("../src/AppointmentForm", () => ({
  AppointmentForm: jest.fn(() => (
    <div id="AppointmentForm" />
  )),
}));

describe("AppointmentFormLoader", () => {
  const availableTimeSlots = [{ when: todayAt(9) }];

  beforeEach(() => {
    initializeReactContainer();
    jest
      .spyOn(global, "fetch")
      .mockResolvedValue(
        fetchResponseOk(availableTimeSlots)
      );
  });

  it("fetches data when component is mounted", async () => {
    await renderAndWait(<AppointmentFormLoader />);

    expect(global.fetch).toBeCalledWith(
      "/availableTimeSlots",
      expect.objectContaining({
        method: "GET",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  });

  it("initially passes no data to AppointmentForm", async () => {
    await renderAndWait(<AppointmentFormLoader />);

    expect(
      AppointmentForm
    ).toBeFirstRenderedWithProps({
      availableTimeSlots: [],
    });
  });

  it("displays time slots that are fetched on mount", async () => {
    await renderAndWait(<AppointmentFormLoader />);

    expect(AppointmentForm).toBeRenderedWithProps({
      availableTimeSlots,
    });
  });

  it("passes props through to children", async () => {
    await renderAndWait(
      <AppointmentFormLoader testProp={123} />
    );

    expect(AppointmentForm).toBeRenderedWithProps(
      expect.objectContaining({ testProp: 123 })
    );
  });
});
