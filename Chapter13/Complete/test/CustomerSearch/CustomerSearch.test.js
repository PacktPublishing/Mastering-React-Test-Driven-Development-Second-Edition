import React from "react";
import { fetchResponseOk } from "../builders/fetch";
import {
  initializeReactContainer,
  renderAndWait,
  change,
  element,
  elements,
  textOf,
} from "../reactTestExtensions";
import { SearchButtons } from "../../src/CustomerSearch/SearchButtons";
import { CustomerSearch } from "../../src/CustomerSearch/CustomerSearch";

jest.mock(
  "../../src/CustomerSearch/SearchButtons",
  () => ({
    SearchButtons: jest.fn(() => (
      <div id="SearchButtons" />
    )),
  })
);

const oneCustomer = [
  {
    id: 1,
    firstName: "A",
    lastName: "B",
    phoneNumber: "1",
  },
];

const twoCustomers = [
  {
    id: 1,
    firstName: "A",
    lastName: "B",
    phoneNumber: "1",
  },
  {
    id: 2,
    firstName: "C",
    lastName: "D",
    phoneNumber: "2",
  },
];

const tenCustomers = Array.from(
  "0123456789",
  (id) => ({ id })
);

describe("CustomerSearch", () => {
  beforeEach(() => {
    initializeReactContainer();
    jest
      .spyOn(global, "fetch")
      .mockResolvedValue(fetchResponseOk([]));
  });

  const testProps = {
    navigate: jest.fn(),
    renderCustomerActions: jest.fn(() => {}),
    searchTerm: "",
    lastRowIds: [],
  };

  it("renders a table with four headings", async () => {
    await renderAndWait(
      <CustomerSearch {...testProps} />
    );
    const headings = elements("table th");
    expect(textOf(headings)).toEqual([
      "First name",
      "Last name",
      "Phone number",
      "Actions",
    ]);
  });

  it("fetches all customer data when component mounts", async () => {
    await renderAndWait(
      <CustomerSearch {...testProps} />
    );
    expect(global.fetch).toBeCalledWith(
      "/customers",
      {
        method: "GET",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  });

  it("renders all customer data in a table row", async () => {
    global.fetch.mockResolvedValue(
      fetchResponseOk(oneCustomer)
    );
    await renderAndWait(
      <CustomerSearch {...testProps} />
    );
    const columns = elements(
      "table > tbody > tr > td"
    );
    expect(columns[0]).toContainText("A");
    expect(columns[1]).toContainText("B");
    expect(columns[2]).toContainText("1");
  });

  it("renders multiple customer rows", async () => {
    global.fetch.mockResolvedValue(
      fetchResponseOk(twoCustomers)
    );
    await renderAndWait(
      <CustomerSearch {...testProps} />
    );
    const rows = elements("table tbody tr");
    expect(rows[1].childNodes[0]).toContainText("C");
  });

  it("has a search input field with a placeholder", async () => {
    await renderAndWait(
      <CustomerSearch {...testProps} />
    );
    expect(element("input")).not.toBeNull();
    expect(
      element("input").getAttribute("placeholder")
    ).toEqual("Enter filter text");
  });

  it("changes location when search term is changed", async () => {
    let navigateSpy = jest.fn();
    await renderAndWait(
      <CustomerSearch
        {...testProps}
        navigate={navigateSpy}
      />
    );
    change(element("input"), "name");
    expect(navigateSpy).toBeCalledWith(
      "?searchTerm=name"
    );
  });

  it("displays provided action buttons for each customer", async () => {
    const actionSpy = jest
      .fn()
      .mockReturnValue("actions");
    global.fetch.mockResolvedValue(
      fetchResponseOk(oneCustomer)
    );
    await renderAndWait(
      <CustomerSearch
        {...testProps}
        renderCustomerActions={actionSpy}
      />
    );
    const rows = elements("table tbody td");
    expect(rows[rows.length - 1]).toContainText(
      "actions"
    );
  });

  it("passes customer to the renderCustomerActions prop", async () => {
    global.fetch.mockResolvedValue(
      fetchResponseOk(oneCustomer)
    );
    await renderAndWait(
      <CustomerSearch {...testProps} />
    );
    expect(
      testProps.renderCustomerActions
    ).toBeCalledWith(oneCustomer[0]);
  });

  it("renders SearchButtons with props", async () => {
    global.fetch.mockResolvedValue(
      fetchResponseOk(tenCustomers)
    );

    await renderAndWait(
      <CustomerSearch
        {...testProps}
        searchTerm="term"
        limit={20}
        lastRowIds={["123"]}
      />
    );

    expect(SearchButtons).toBeRenderedWithProps({
      customers: tenCustomers,
      searchTerm: "term",
      limit: 20,
      lastRowIds: ["123"],
    });
  });
});
