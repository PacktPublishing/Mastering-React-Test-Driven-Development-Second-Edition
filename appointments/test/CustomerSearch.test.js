import React from "react";
import {
  initializeReactContainer,
  renderAndWait,
  clickAndWait,
  change,
  element,
  elements,
  textOf,
} from "./reactTestExtensions";
import { CustomerSearch } from "../src/CustomerSearch";
import { fetchResponseOk } from "./builders/fetch";

const oneCustomer = [
  { id: 1, firstName: "A", lastName: "B", phoneNumber: "1" },
];

const twoCustomers = [
  { id: 1, firstName: "A", lastName: "B", phoneNumber: "1" },
  { id: 2, firstName: "C", lastName: "D", phoneNumber: "2" },
];

describe("CustomerSearch", () => {
  beforeEach(() => {
    initializeReactContainer();
    jest
      .spyOn(global, "fetch")
      .mockResolvedValue(fetchResponseOk([]));
  });

  it("renders a table with four headings", async () => {
    await renderAndWait(<CustomerSearch />);
    const headings = elements("table th");
    expect(textOf(headings)).toEqual([
      "First name",
      "Last name",
      "Phone number",
      "Actions",
    ]);
  });

  it("fetches all customer data when component mounts", async () => {
    await renderAndWait(<CustomerSearch />);
    expect(global.fetch).toBeCalledWith("/customers", {
      method: "GET",
      credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
    });
  });

  it("renders all customer data in a table row", async () => {
    global.fetch.mockResolvedValue(
      fetchResponseOk(oneCustomer)
    );
    await renderAndWait(<CustomerSearch />);
    const columns = elements("table > tbody > tr > td");
    expect(columns[0]).toContainText("A");
    expect(columns[1]).toContainText("B");
    expect(columns[2]).toContainText("1");
  });

  it("renders multiple customer rows", async () => {
    global.fetch.mockResolvedValue(
      fetchResponseOk(twoCustomers)
    );
    await renderAndWait(<CustomerSearch />);
    const rows = elements("table tbody tr");
    expect(rows[1].childNodes[0]).toContainText("C");
  });
});
