import React from "react";
import { act } from "react-dom/test-utils";
import {
  initializeReactContainer,
  renderWithStore,
  store,
  blur,
  change,
  withFocus,
  keyPress,
  element,
} from "./reactTestExtensions";
import { expectRedux } from "expect-redux";
import { ScriptName } from "../src/ScriptName";

describe("ScriptName", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders an input box with the script name from the store", () => {
    renderWithStore(<ScriptName />);
    expect(element("input").value).toEqual(
      "Unnamed script"
    );
  });

  it("has a class name of isEditing when the input field has focus", () => {
    renderWithStore(<ScriptName />);
    withFocus(element("input"), () => {
      expect(element("input")).toHaveClass(
        "isEditing"
      );
    });
  });

  it("does not initially have a class name of isEditing", () => {
    renderWithStore(<ScriptName />);
    expect(element("input")).not.toHaveClass(
      "isEditing"
    );
  });

  const enterName = (name) => {
    act(() => {
      element("input").focus();
    });
    change(element("input"), name);
    keyPress(element("input"), { charCode: 13 });
  };

  describe("when the user hits Enter", () => {
    it("submits the new name when the user hits Enter", () => {
      renderWithStore(<ScriptName />);
      enterName("new name");
      return expectRedux(store)
        .toDispatchAnAction()
        .matching({
          type: "SUBMIT_SCRIPT_NAME",
          text: "new name",
        });
    });

    it("removes the isEditing class name", () => {
      renderWithStore(<ScriptName />);
      enterName("new name");
      expect(element("input")).not.toHaveClass(
        "isEditing"
      );
    });

    it("does not resubmit when losing focus after change", () => {
      renderWithStore(<ScriptName />);
      withFocus(element("input"), () => {
        enterName("new name");
      });
      expect(element("input")).not.toHaveClass(
        "isEditing"
      );
    });
  });

  describe("when the user moves focus somewhere else", () => {
    it("submits the new name when the field loses focus", () => {
      renderWithStore(<ScriptName />);
      withFocus(element("input"), () => {
        change(element("input"), "new name");
      });

      return expectRedux(store)
        .toDispatchAnAction()
        .matching({
          type: "SUBMIT_SCRIPT_NAME",
          text: "new name",
        });
    });
  });
});
