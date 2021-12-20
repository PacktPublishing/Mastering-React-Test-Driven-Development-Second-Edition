import React from "react";
import {
  initializeReactContainer,
  renderWithStore,
  store,
  container,
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

  describe("undo button", () => {
    it("renders", () => {
      renderWithStore(<MenuButtons />);
      expect(buttonWithLabel("Undo")).not.toBeNull();
    });

    it("is disabled if there is no history", () => {
      renderWithStore(<MenuButtons />);
      expect(
        buttonWithLabel("Undo").hasAttribute(
          "disabled"
        )
      ).toBeTruthy();
    });

    it("is enabled if an action occurs", () => {
      renderWithStore(<MenuButtons />);
      dispatchToStore({
        type: "SUBMIT_EDIT_LINE",
        text: "forward 10\n",
      });
      expect(
        buttonWithLabel("Undo").hasAttribute(
          "disabled"
        )
      ).toBeFalsy();
    });

    it("dispatches an action of UNDO when clicked", () => {
      renderWithStore(<MenuButtons />);
      dispatchToStore({
        type: "SUBMIT_EDIT_LINE",
        text: "forward 10\n",
      });
      click(buttonWithLabel("Undo"));
      return expectRedux(store)
        .toDispatchAnAction()
        .matching({ type: "UNDO" });
    });
  });

  describe("redo button", () => {
    it("renders", () => {
      renderWithStore(<MenuButtons />);
      expect(buttonWithLabel("Redo")).not.toBeNull();
    });

    it("is disabled if undo has not occurred yet", () => {
      renderWithStore(<MenuButtons />);
      dispatchToStore({
        type: "SUBMIT_EDIT_LINE",
        text: "forward 10\n",
      });
      expect(
        buttonWithLabel("Redo").hasAttribute(
          "disabled"
        )
      ).toBeTruthy();
    });

    it("is enabled if an undo occurred", () => {
      renderWithStore(<MenuButtons />);
      dispatchToStore({
        type: "SUBMIT_EDIT_LINE",
        text: "forward 10\n",
      });
      dispatchToStore({ type: "UNDO" });
      expect(
        buttonWithLabel("Redo").hasAttribute(
          "disabled"
        )
      ).toBeFalsy();
    });

    it("dispatches an action of REDO when clicked", () => {
      renderWithStore(<MenuButtons />);
      dispatchToStore({
        type: "SUBMIT_EDIT_LINE",
        text: "forward 10\n",
      });
      click(buttonWithLabel("Undo"));
      click(buttonWithLabel("Redo"));
      return expectRedux(store)
        .toDispatchAnAction()
        .matching({ type: "REDO" });
    });
  });

  describe("skip animation button", () => {
    it("renders", () => {
      renderWithStore(<MenuButtons />);
      expect(
        buttonWithLabel("Skip animation")
      ).not.toBeNull();
    });

    it("is disabled if animations have already been skipped", () => {
      renderWithStore(<MenuButtons />);
      dispatchToStore({
        type: "SKIP_ANIMATING",
      });
      expect(
        buttonWithLabel(
          "Skip animation"
        ).hasAttribute("disabled")
      ).toBeTruthy();
    });

    it("is enabled if animations have already been skipped", () => {
      renderWithStore(<MenuButtons />);
      dispatchToStore({
        type: "START_ANIMATING",
      });
      expect(
        buttonWithLabel(
          "Skip animation"
        ).hasAttribute("disabled")
      ).toBeFalsy();
    });

    it("dispatches a SKIP_ANIMATING action when clicked", () => {
      renderWithStore(<MenuButtons />);
      dispatchToStore({
        type: "START_ANIMATING",
      });
      click(buttonWithLabel("Skip animation"));
      return expectRedux(store)
        .toDispatchAnAction()
        .matching({ type: "SKIP_ANIMATING" });
    });
  });

  describe("sharing button", () => {
    it("renders Start sharing by default", () => {
      renderWithStore(<MenuButtons />);
      expect(
        buttonWithLabel("Start sharing")
      ).not.toBeNull();
    });

    it("renders Stop sharing if sharing has started", () => {
      renderWithStore(<MenuButtons />);
      dispatchToStore({ type: "STARTED_SHARING" });
      expect(
        buttonWithLabel("Stop sharing")
      ).not.toBeNull();
    });

    it("renders Start sharing if sharing has stopped", () => {
      renderWithStore(<MenuButtons />);
      dispatchToStore({ type: "STARTED_SHARING" });
      dispatchToStore({ type: "STOPPED_SHARING" });
      expect(
        buttonWithLabel("Start sharing")
      ).not.toBeNull();
    });

    it("dispatches an action of START_SHARING when start sharing is clicked", () => {
      renderWithStore(<MenuButtons />);
      click(buttonWithLabel("Start sharing"));
      return expectRedux(store)
        .toDispatchAnAction()
        .matching({ type: "START_SHARING" });
    });

    it("dispatches an action of STOP_SHARING when stop sharing is clicked", async () => {
      renderWithStore(<MenuButtons />);
      dispatchToStore({ type: "STARTED_SHARING" });
      click(buttonWithLabel("Stop sharing"));
      return expectRedux(store)
        .toDispatchAnAction()
        .matching({ type: "STOP_SHARING" });
    });
  });

  describe("messages", () => {
    it("renders a message containing the url if sharing has started", () => {
      renderWithStore(<MenuButtons />);
      dispatchToStore({
        type: "STARTED_SHARING",
        url: "http://123",
      });
      expect(container.innerHTML).toContain(
        'You are now presenting your script. <a href="http://123">Here\'s the URL for sharing.</a></p>'
      );
    });

    it("renders a message when watching has started", () => {
      renderWithStore(<MenuButtons />);
      dispatchToStore({ type: "STARTED_WATCHING" });
      expect(container.innerHTML).toContain(
        "<p>You are now watching the session</p>"
      );
    });
  });
});
