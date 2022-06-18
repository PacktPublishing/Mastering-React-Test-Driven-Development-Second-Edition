import React from "react";
import { act } from "react-dom/test-utils";
import {
  initializeReactContainer,
  render,
  renderAndWait,
  container,
  element,
  elements,
  textOf,
} from "./reactTestExtensions";
import { fetchQuery } from "relay-runtime";
import {
  CustomerHistory,
  query,
} from "../src/CustomerHistory";
import { getEnvironment } from "../src/relayEnvironment";
jest.mock("relay-runtime");
jest.mock("../src/relayEnvironment");

const date = new Date("February 16, 2019");

const appointments = [
  {
    startsAt: date.setHours(9, 0, 0, 0).toString(),
    stylist: "Jo",
    service: "Cut",
    notes: "Note one",
  },
  {
    startsAt: date.setHours(10, 0, 0, 0).toString(),
    stylist: "Stevie",
    service: "Cut & color",
    notes: "Note two",
  },
];

const customer = {
  firstName: "Ashley",
  lastName: "Jones",
  phoneNumber: "123",
  appointments,
};

describe("CustomerHistory", () => {
  let unsubscribeSpy = jest.fn();

  const sendCustomer = ({ next }) => {
    act(() => next({ customer }));
    return { unsubscribe: unsubscribeSpy };
  };

  beforeEach(() => {
    initializeReactContainer();
    fetchQuery.mockReturnValue({
      subscribe: sendCustomer,
    });
  });

  it("calls fetchQuery", async () => {
    await renderAndWait(<CustomerHistory id={123} />);
    expect(fetchQuery).toBeCalledWith(
      getEnvironment(),
      query,
      {
        id: 123,
      }
    );
  });

  it("unsubscribes when id changes", async () => {
    await renderAndWait(<CustomerHistory id={123} />);
    await renderAndWait(<CustomerHistory id={234} />);
    expect(unsubscribeSpy).toBeCalled();
  });

  it("renders the first name and last name together in a h2", async () => {
    await renderAndWait(<CustomerHistory id={123} />);
    await new Promise(setTimeout);
    expect(element("h2")).toContainText(
      "Ashley Jones"
    );
  });

  it("renders the phone number", async () => {
    await renderAndWait(<CustomerHistory id={123} />);
    expect(document.body).toContainText("123");
  });

  it("renders a Booked appointments heading", async () => {
    await renderAndWait(<CustomerHistory id={123} />);
    expect(element("h3")).not.toBeNull();
    expect(element("h3")).toContainText(
      "Booked appointments"
    );
  });

  it("renders a table with four column headings", async () => {
    await renderAndWait(<CustomerHistory id={123} />);
    const headings = elements(
      "table > thead > tr > th"
    );
    expect(textOf(headings)).toEqual([
      "When",
      "Stylist",
      "Service",
      "Notes",
    ]);
  });

  const columnValues = (columnNumber) =>
    elements("tbody > tr").map(
      (tr) => tr.childNodes[columnNumber]
    );

  it("renders the start time of each appointment in the correct format", async () => {
    await renderAndWait(<CustomerHistory id={123} />);
    expect(textOf(columnValues(0))).toEqual([
      "Sat Feb 16 2019 09:00",
      "Sat Feb 16 2019 10:00",
    ]);
  });

  it("renders the stylist", async () => {
    await renderAndWait(<CustomerHistory id={123} />);
    expect(textOf(columnValues(1))).toEqual([
      "Jo",
      "Stevie",
    ]);
  });

  it("renders the service", async () => {
    await renderAndWait(<CustomerHistory id={123} />);
    expect(textOf(columnValues(2))).toEqual([
      "Cut",
      "Cut & color",
    ]);
  });

  it("renders notes", async () => {
    await renderAndWait(<CustomerHistory id={123} />);
    expect(textOf(columnValues(3))).toEqual([
      "Note one",
      "Note two",
    ]);
  });

  describe("submitting", () => {
    const noSend = () => unsubscribeSpy;

    beforeEach(() => {
      fetchQuery.mockReturnValue({
        subscribe: noSend,
      });
    });

    it("displays a loading message", async () => {
      await renderAndWait(
        <CustomerHistory id={123} />
      );

      expect(element("[role=alert]")).toContainText(
        "Loading"
      );
    });
  });

  describe("when there is an error fetching data", () => {
    const errorSend = ({ error }) => {
      act(() => error());
      return { unsubscribe: unsubscribeSpy };
    };

    beforeEach(() => {
      fetchQuery.mockReturnValue({
        subscribe: errorSend,
      });
    });

    it("displays an error message", async () => {
      await renderAndWait(<CustomerHistory />);
      expect(element("[role=alert]")).toContainText(
        "Sorry, an error occurred while pulling data from the server."
      );
    });
  });
});
