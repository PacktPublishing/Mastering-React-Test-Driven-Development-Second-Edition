import React from "react";
import { expectRedux } from "expect-redux";
import {
  initializeReactContainer,
  renderWithStore,
  element,
  elements,
} from "./reactTestExtensions";
import { PromptError } from "../src/PromptError";

describe("PromptError", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  const renderInTableWithStore = (
    component,
    initialState = {}
  ) =>
    renderWithStore(
      <table>{component}</table>,
      initialState
    );

  it("renders a tbody", () => {
    renderInTableWithStore(<PromptError />);
    expect(element("tbody")).not.toBeNull();
  });

  it("renders a single td with a colspan of 2", () => {
    renderInTableWithStore(<PromptError />);
    expect(elements("td")).toHaveLength(1);
    expect(
      element("td").getAttribute("colSpan")
    ).toEqual("2");
  });

  it("has no error text in the table cell", () => {
    renderInTableWithStore(<PromptError />);
    expect(element("td")).toContainText("");
  });

  describe("with error present", () => {
    const initialStoreState = {
      script: {
        error: { description: "error message" },
      },
    };

    it("displays the error from state in a table cell", () => {
      renderInTableWithStore(
        <PromptError />,
        initialStoreState
      );
      expect(element("td")).toContainText(
        "error message"
      );
    });
  });
});
