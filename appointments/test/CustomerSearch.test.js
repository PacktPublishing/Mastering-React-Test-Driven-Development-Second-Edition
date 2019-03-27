import React from "react";
import {
  initializeReactContainer,
  renderAndWait,
  clickAndWait,
  change,
  element,
  elements,
  textOf,
  buttonWithLabel,
  changeAndWait,
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

const tenCustomers = Array.from("0123456789", (id) => ({ id }));

const anotherTenCustomers = Array.from("ABCDEFGHIJ", (id) => ({
  id,
}));

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

  it("has a next button", async () => {
    await renderAndWait(<CustomerSearch />);
    expect(buttonWithLabel("Next")).not.toBeNull();
  });

  it("requests next page of data when next button is clicked", async () => {
    global.fetch.mockResolvedValue(
      fetchResponseOk(tenCustomers)
    );
    await renderAndWait(<CustomerSearch />);
    await clickAndWait(buttonWithLabel("Next"));
    expect(global.fetch).toHaveBeenLastCalledWith(
      "/customers?after=9",
      expect.anything()
    );
  });

  it("displays next page of data when next button is clicked", async () => {
    const nextCustomer = [{ id: "next", firstName: "Next" }];
    global.fetch
      .mockResolvedValueOnce(fetchResponseOk(tenCustomers))
      .mockResolvedValue(fetchResponseOk(nextCustomer));
    await renderAndWait(<CustomerSearch />);
    await clickAndWait(buttonWithLabel("Next"));
    expect(elements("tbody tr")).toHaveLength(1);
    expect(elements("td")[0]).toContainText("Next");
  });

  it("has a previous button", async () => {
    await renderAndWait(<CustomerSearch />);
    expect(buttonWithLabel("Previous")).not.toBeNull();
  });

  it("moves back to first page when previous button is clicked", async () => {
    global.fetch.mockResolvedValue(
      fetchResponseOk(tenCustomers)
    );
    await renderAndWait(<CustomerSearch />);
    await clickAndWait(buttonWithLabel("Next"));
    await clickAndWait(buttonWithLabel("Previous"));
    expect(global.fetch).toHaveBeenLastCalledWith(
      "/customers",
      expect.anything()
    );
  });

  it("moves back one page when clicking previous after multiple clicks of the next button", async () => {
    global.fetch
      .mockResolvedValueOnce(fetchResponseOk(tenCustomers))
      .mockResolvedValue(fetchResponseOk(anotherTenCustomers));
    await renderAndWait(<CustomerSearch />);
    await clickAndWait(buttonWithLabel("Next"));
    await clickAndWait(buttonWithLabel("Next"));
    await clickAndWait(buttonWithLabel("Previous"));
    expect(global.fetch).toHaveBeenLastCalledWith(
      "/customers?after=9",
      expect.anything()
    );
  });

  it("moves back multiple pages", async () => {
    global.fetch.mockResolvedValue(
      fetchResponseOk(tenCustomers)
    );
    await renderAndWait(<CustomerSearch />);
    await clickAndWait(buttonWithLabel("Next"));
    await clickAndWait(buttonWithLabel("Next"));
    await clickAndWait(buttonWithLabel("Previous"));
    await clickAndWait(buttonWithLabel("Previous"));
    expect(global.fetch).toHaveBeenLastCalledWith(
      "/customers",
      expect.anything()
    );
  });

  it("renders a text field for a search term", async () => {
    await renderAndWait(<CustomerSearch />);
    expect(element("input")).not.toBeNull();
  });

  it("sets the placeholder text on the search term field", async () => {
    await renderAndWait(<CustomerSearch />);
    expect(
      element("input").getAttribute("placeholder")
    ).toEqual("Enter filter text");
  });

  it("performs search when search term is changed", async () => {
    await renderAndWait(<CustomerSearch />);
    await changeAndWait(element("input"), "name");
    expect(global.fetch).toHaveBeenLastCalledWith(
      "/customers?searchTerm=name",
      expect.anything()
    );
  });

  it("includes search term when moving to next page", async () => {
    global.fetch.mockResolvedValue(
      fetchResponseOk(tenCustomers)
    );
    await renderAndWait(<CustomerSearch />);
    await changeAndWait(element("input"), "name");
    await clickAndWait(buttonWithLabel("Next"));
    expect(global.fetch).toHaveBeenLastCalledWith(
      "/customers?after=9&searchTerm=name",
      expect.anything()
    );
  });

  it("displays provided action buttons for each customer", async () => {
    const actionSpy = jest.fn(() => "actions");
    global.fetch.mockResolvedValue(
      fetchResponseOk(oneCustomer)
    );
    await renderAndWait(
      <CustomerSearch renderCustomerActions={actionSpy} />
    );
    const rows = elements("table tbody td");
    expect(rows[rows.length - 1]).toContainText("actions");
  });

  it("passes customer to the renderCustomerActions prop", async () => {
    const actionSpy = jest.fn(() => "actions");
    global.fetch.mockResolvedValue(
      fetchResponseOk(oneCustomer)
    );
    await renderAndWait(
      <CustomerSearch renderCustomerActions={actionSpy} />
    );
    expect(actionSpy).toBeCalledWith(oneCustomer[0]);
  });
});
