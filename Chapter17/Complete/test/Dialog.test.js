import React from "react";
import {
  initializeReactContainer,
  render,
  element,
  elements,
  buttonWithLabel,
  idsOf,
  click,
} from "./reactTestExtensions";
import { Dialog } from "../src/Dialog";

describe("Dialog", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  const testProps = {
    message: "Hello",
    buttons: [],
    onChoose: jest.fn(),
    onClose: jest.fn(),
  };

  it("renders a div with className dialog", () => {
    render(<Dialog {...testProps} />);
    expect(element("div.dialog")).not.toBeNull();
  });

  it("renders message in a paragraph element", () => {
    render(
      <Dialog
        {...testProps}
        message="This is a message"
      />
    );
    expect(element("p")).not.toBeNull();
    expect(element("p")).toContainText(
      "This is a message"
    );
  });

  it("renders a div with className dialogButtons inside dialog", () => {
    render(<Dialog {...testProps} />);
    expect(
      element("div.dialog > div.dialogButtons")
    ).not.toBeNull();
  });

  it("renders button properties", () => {
    render(
      <Dialog
        {...testProps}
        buttons={[{ id: "yes", text: "Yes" }]}
      />
    );
    expect(buttonWithLabel("Yes")).not.toBeNull();
    expect(buttonWithLabel("Yes").id).toEqual("yes");
  });

  it("renders all buttons inside the dialogButtons div", () => {
    render(
      <Dialog
        {...testProps}
        buttons={[
          { id: "yes", text: "Yes" },
          { id: "no", text: "No" },
        ]}
      />
    );
    const buttons = elements(
      "div.dialogButtons > button"
    );
    expect(idsOf(buttons)).toEqual(["yes", "no"]);
  });

  it("calls onChoose with the button id when it is clicked", () => {
    render(
      <Dialog
        {...testProps}
        buttons={[
          { id: "yes", text: "Yes" },
          { id: "no", text: "No" },
        ]}
      />
    );
    click(buttonWithLabel("Yes"));
    expect(testProps.onChoose).toBeCalledWith("yes");
  });

  it("calls onClose when a button is clicked", () => {
    render(
      <Dialog
        {...testProps}
        buttons={[
          { id: "yes", text: "Yes" },
          { id: "no", text: "No" },
        ]}
      />
    );
    click(buttonWithLabel("Yes"));
    expect(testProps.onClose).toBeCalled();
  });
});
