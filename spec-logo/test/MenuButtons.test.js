import React from "react";
import {
  initializeReactContainer,
  renderWithStore,
  store,
  dispatchToStore,
  buttonWithLabel,
  click,
} from "./reactTestExtensions";
import { expectRedux } from "expect-redux";
import { MenuButtons } from "../src/MenuButtons";

describe("MenuButtons", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  describe("reset button", () => {
    it("renders", () => {
      renderWithStore(<MenuButtons />);
      expect(buttonWithLabel("Reset")).not.toBeNull();
    });

    it("is disabled initially", () => {
      renderWithStore(<MenuButtons />);
      expect(
        buttonWithLabel("Reset").hasAttribute(
          "disabled"
        )
      ).toBeTruthy();
    });

    it("is enabled once a state change occurs", () => {
      renderWithStore(<MenuButtons />);
      dispatchToStore({
        type: "SUBMIT_EDIT_LINE",
        text: "forward 10\n",
      });
      expect(
        buttonWithLabel("Reset").hasAttribute(
          "disabled"
        )
      ).toBeFalsy();
    });

    it("dispatches an action of RESET when clicked", () => {
      renderWithStore(<MenuButtons />);
      dispatchToStore({
        type: "SUBMIT_EDIT_LINE",
        text: "forward 10\n",
      });
      click(buttonWithLabel("Reset"));
      return expectRedux(store)
        .toDispatchAnAction()
        .matching({ type: "RESET" });
    });
  });
});
