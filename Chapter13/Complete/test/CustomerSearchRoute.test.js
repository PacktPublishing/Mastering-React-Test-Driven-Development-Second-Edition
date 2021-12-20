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
import { CustomerSearchRoute } from "../src/CustomerSearchRoute";
import { CustomerSearch } from "../src/CustomerSearch/CustomerSearch";

jest.mock(
  "../src/CustomerSearch/CustomerSearch",
  () => ({
    CustomerSearch: jest.fn(() => (
      <div id="CustomerSearch" />
    )),
  })
);

describe("CustomerSearchRoute", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  it("parses searchTerm from query string", () => {
    renderWithRouter(<CustomerSearchRoute />, {
      location: "?searchTerm=abc",
    });
    expect(CustomerSearch).toBeRenderedWithProps(
      expect.objectContaining({
        searchTerm: "abc",
      })
    );
  });

  it("parses limit from query string", () => {
    renderWithRouter(<CustomerSearchRoute />, {
      location: "?limit=123",
    });
    expect(CustomerSearch).toBeRenderedWithProps(
      expect.objectContaining({
        limit: 123,
      })
    );
  });

  it("parses lastRowIds from query string", () => {
    const location =
      "?lastRowIds=" + encodeURIComponent("1,2,3");
    renderWithRouter(<CustomerSearchRoute />, {
      location,
    });
    expect(CustomerSearch).toBeRenderedWithProps(
      expect.objectContaining({
        lastRowIds: ["1", "2", "3"],
      })
    );
  });

  it("removes empty lastRowIds from query string", () => {
    renderWithRouter(<CustomerSearchRoute />, {
      location: "?lastRowIds=",
    });
    expect(CustomerSearch).toBeRenderedWithProps(
      expect.objectContaining({
        lastRowIds: [],
      })
    );
  });

  it("passes all other props through to CustomerSearch", () => {
    const props = { a: "123", b: "456" };
    renderWithRouter(
      <CustomerSearchRoute {...props} />
    );
    expect(CustomerSearch).toBeRenderedWithProps(
      expect.objectContaining({
        a: "123",
        b: "456",
      })
    );
  });
});
