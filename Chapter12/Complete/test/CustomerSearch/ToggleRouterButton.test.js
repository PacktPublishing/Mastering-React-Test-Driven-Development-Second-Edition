import React from "react";
import {
  initializeReactContainer,
  container,
  render,
  element,
} from "../reactTestExtensions";
import { Link } from "react-router-dom";
import { ToggleRouterButton } from "../../src/CustomerSearch/ToggleRouterButton";

jest.mock("react-router-dom", () => ({
  Link: jest.fn(({ children }) => (
    <div id="Link">{children}</div>
  )),
}));

describe("ToggleRouterButton", () => {
  const queryParams = { a: "123", b: "234" };

  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders a Link", () => {
    render(
      <ToggleRouterButton queryParams={queryParams} />
    );
    expect(container.firstChild).toEqual(
      element("#Link")
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
      <ToggleRouterButton queryParams={queryParams}>
        child text
      </ToggleRouterButton>
    );
    expect(element("#Link")).toContainText(
      "child text"
    );
  });

  it("adds toggled class if toggled prop is true", () => {
    render(
      <ToggleRouterButton
        queryParams={queryParams}
        toggled={true}
      />
    );
    expect(Link).toBeRenderedWithProps(
      expect.objectContaining({
        className: "toggled",
      })
    );
  });
});
