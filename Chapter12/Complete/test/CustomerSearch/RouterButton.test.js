import React from "react";
import {
  initializeReactContainer,
  render,
  element,
} from "../reactTestExtensions";
import { Link } from "react-router-dom";
import { RouterButton } from "../../src/CustomerSearch/RouterButton";

jest.mock("react-router-dom", () => ({
  Link: jest.fn(({ children }) => (
    <div id="Link">{children}</div>
  )),
}));

describe("RouterButton", () => {
  const queryParams = { a: "123", b: "234" };

  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders a Link", () => {
    render(
      <RouterButton queryParams={queryParams} />
    );
    expect(Link).toBeRenderedWithProps({
      className: "",
      role: "button",
      to: {
        search: "?a=123&b=234",
      },
    });
  });

  it("renders children", () => {
    render(
      <RouterButton queryParams={queryParams}>
        child text
      </RouterButton>
    );
    expect(element("#Link")).toContainText(
      "child text"
    );
  });

  it("adds disabled class if disabled prop is true", () => {
    render(
      <RouterButton
        disabled={true}
        queryParams={queryParams}
      />
    );
    expect(Link).toBeRenderedWithProps(
      expect.objectContaining({
        className: "disabled",
      })
    );
  });
});
