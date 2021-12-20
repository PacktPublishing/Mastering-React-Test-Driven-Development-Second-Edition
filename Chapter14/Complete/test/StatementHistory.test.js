import React from "react";
import {
  initializeReactContainer,
  renderWithStore,
  element,
  elements,
} from "./reactTestExtensions";
import { StatementHistory } from "../src/StatementHistory";

describe("StatementHistory", () => {
  const initialState = {
    script: {
      parsedTokens: [
        { lineNumber: 1, text: "abc" },
        { lineNumber: 1, text: "def" },
        { lineNumber: 2, text: "abc" },
        { lineNumber: 3, text: "abc" },
      ],
    },
  };

  const renderInTableWithStore = (component) =>
    renderWithStore(
      <table>{component}</table>,
      initialState
    );

  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders a tbody", () => {
    renderInTableWithStore(<StatementHistory />);
    expect(element("tbody")).not.toBeNull();
  });

  const firstRowCell = (n) =>
    elements("tr")[0].childNodes[n];

  it("renders a table cell with the line number as the first cell in each row", () => {
    renderInTableWithStore(<StatementHistory />);
    expect(firstRowCell(0)).toContainText("1");
    expect(firstRowCell(0)).toHaveClass("lineNumber");
  });

  it("renders a table cell with the joined tokens as the second cell in each row", () => {
    renderInTableWithStore(<StatementHistory />);
    expect(firstRowCell(1)).toContainText("abcdef");
    expect(firstRowCell(1)).toHaveClass("text");
  });

  it("renders a row for each line", () => {
    renderInTableWithStore(<StatementHistory />);
    expect(elements("tr")).toHaveLength(3);
  });
});
