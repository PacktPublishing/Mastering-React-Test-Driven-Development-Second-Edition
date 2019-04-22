import React from "react";
import {
  initializeReactContainer,
  renderWithStore,
  store,
  container,
  dispatchToStore,
  buttonWithLabel,
  click,
  propsOf,
  element,
} from "./reactTestExtensions";
import { act } from "react-dom/test-utils";
import { expectRedux } from "expect-redux";
import { MenuButtons } from "../src/MenuButtons";
import { Dialog } from "../src/Dialog";
jest.mock("../src/Dialog", () => ({
  Dialog: jest.fn(() => <div id="Dialog" />),
}));

describe("MenuButtons", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  const makeDialogChoice = (button) =>
    act(() => propsOf(Dialog).onChoose(button));

  const closeDialog = () =>
    act(() => propsOf(Dialog).onClose());

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
    let socketSpyFactory;
    let socketSpy;

    beforeEach(() => {
      socketSpyFactory = jest.spyOn(
        window,
        "WebSocket"
      );
      socketSpyFactory.mockImplementation(() => {
        socketSpy = {
          close: () => {},
          send: () => {},
        };
        return socketSpy;
      });
    });

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

    it("dispatches an action of START_SHARING when dialog onChoose prop is invoked with reset", () => {
      renderWithStore(<MenuButtons />);
      click(buttonWithLabel("Start sharing"));

      makeDialogChoice("reset");

      return expectRedux(store)
        .toDispatchAnAction()
        .matching({
          type: "START_SHARING",
          reset: true,
        });
    });

    it("dispatches an action of START_SHARING when dialog onChoose prop is invoked with share", () => {
      renderWithStore(<MenuButtons />);
      click(buttonWithLabel("Start sharing"));

      makeDialogChoice("share");

      return expectRedux(store)
        .toDispatchAnAction()
        .matching({
          type: "START_SHARING",
          reset: false,
        });
    });

    it("opens a dialog when start sharing is clicked", () => {
      renderWithStore(<MenuButtons />);
      click(buttonWithLabel("Start sharing"));
      expect(Dialog).toBeCalled();
    });

    it("prints a useful message in the sharing dialog", () => {
      renderWithStore(<MenuButtons />);
      click(buttonWithLabel("Start sharing"));
      expect(propsOf(Dialog).message).toEqual(
        "Do you want to share your previous commands, or would you like to reset to a blank script?"
      );
    });

    it("does not initially show the dialog", () => {
      renderWithStore(<MenuButtons />);
      expect(Dialog).not.toBeCalled();
    });

    it("passes Share and Reset buttons to the dialog", () => {
      renderWithStore(<MenuButtons />);
      click(buttonWithLabel("Start sharing"));
      expect(propsOf(Dialog).buttons).toEqual([
        { id: "keep", text: "Share previous" },
        { id: "reset", text: "Reset" },
      ]);
    });

    it("closes the dialog when the onClose prop is called", () => {
      renderWithStore(<MenuButtons />);
      click(buttonWithLabel("Start sharing"));
      closeDialog();
      expect(element("#dialog")).toBeNull();
    });

    const notifySocketOpened = async () => {
      const data = JSON.stringify({ id: 1 });
      await act(async () => {
        await socketSpy.onopen();
        socketSpy.onmessage({ data });
      });
    };

    it("dispatches an action of STOP_SHARING when stop sharing is clicked", async () => {
      renderWithStore(<MenuButtons />);
      dispatchToStore({ type: "START_SHARING" });
      await notifySocketOpened();
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
