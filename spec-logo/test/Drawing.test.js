import React from "react";
import { act } from "react-dom/test-utils";
import ReactDOM from "react-dom";
import {
  initializeReactContainer,
  renderWithStore,
  element,
  elements,
} from "./reactTestExtensions";
import {
  horizontalLine,
  verticalLine,
  rotate90,
} from "./sampleInstructions";
import { Drawing } from "../src/Drawing";
import { AnimatedLine } from "../src/AnimatedLine";
import { Turtle } from "../src/Turtle";
import { StaticLines } from "../src/StaticLines";
jest.mock("../src/AnimatedLine", () => ({
  AnimatedLine: jest.fn(() => (
    <div id="AnimatedLine" />
  )),
}));
jest.mock("../src/Turtle", () => ({
  Turtle: jest.fn(() => <div id="Turtle" />),
}));
jest.mock("../src/StaticLines", () => ({
  StaticLines: jest.fn(() => (
    <div id="StaticLines" />
  )),
}));

describe("Drawing", () => {
  const cancelToken = "cancelToken";
  beforeEach(() => {
    initializeReactContainer();
    jest
      .spyOn(window, "requestAnimationFrame")
      .mockReturnValue(cancelToken);
    jest.spyOn(window, "cancelAnimationFrame");
  });

  const svg = () => element("svg");
  const line = () => element("line");
  const allLines = () => elements("line");

  const triggerRequestAnimationFrame = (time) => {
    act(() => {
      const mock = window.requestAnimationFrame.mock;
      const lastCallFirstArg =
        mock.calls[mock.calls.length - 1][0];
      lastCallFirstArg(time);
    });
  };

  const triggerAnimationSequence = (times) =>
    times.forEach(triggerRequestAnimationFrame);

  it("renders an svg inside div#viewport", () => {
    renderWithStore(<Drawing />, {
      script: { drawCommands: [] },
    });
    expect(
      element("div#viewport > svg")
    ).not.toBeNull();
  });

  it("sets a viewbox of +/- 300 in either axis and preserves aspect ratio", () => {
    renderWithStore(<Drawing />, {
      script: { drawCommands: [] },
    });
    expect(svg()).not.toBeNull();
    expect(svg().getAttribute("viewBox")).toEqual(
      "-300 -300 600 600"
    );
    expect(
      svg().getAttribute("preserveAspectRatio")
    ).toEqual("xMidYMid slice");
  });

  it("renders a Turtle within the svg", () => {
    renderWithStore(<Drawing />);
    expect(
      element("svg > div#Turtle")
    ).not.toBeNull();
  });

  it("initially places the turtle at 0,0 with angle 0", () => {
    renderWithStore(<Drawing />);
    expect(Turtle).toBeRenderedWithProps({
      x: 0,
      y: 0,
      angle: 0,
    });
  });

  it("renders StaticLines within the svg", () => {
    renderWithStore(<Drawing />);
    expect(
      element("svg > div#StaticLines")
    ).not.toBeNull();
  });

  it("does not render AnimatedLine when not moving", () => {
    renderWithStore(<Drawing />, {
      script: { drawCommands: [] },
    });
    expect(AnimatedLine).not.toBeRendered();
  });

  describe("movement animation", () => {
    const horizontalLineDrawn = {
      script: {
        drawCommands: [horizontalLine],
        turtle: { x: 0, y: 0, angle: 0 },
      },
    };

    it("invokes requestAnimationFrame when the timeout fires", () => {
      renderWithStore(
        <Drawing />,
        horizontalLineDrawn
      );
      expect(
        window.requestAnimationFrame
      ).toBeCalled();
    });

    it("renders an AnimatedLine with turtle at the start position when the animation has run for 0s", () => {
      renderWithStore(
        <Drawing />,
        horizontalLineDrawn
      );
      triggerRequestAnimationFrame(0);
      expect(AnimatedLine).toBeRenderedWithProps({
        commandToAnimate: horizontalLine,
        turtle: { x: 100, y: 100, angle: 0 },
      });
    });

    it("renders an AnimatedLine with turtle at a position based on a speed of 5px per ms", () => {
      renderWithStore(
        <Drawing />,
        horizontalLineDrawn
      );
      triggerAnimationSequence([0, 250]);
      expect(AnimatedLine).toBeRenderedWithProps({
        commandToAnimate: horizontalLine,
        turtle: { x: 150, y: 100, angle: 0 },
      });
    });

    it("calculates move distance with a non-zero animation start time", () => {
      const startTime = 12345;
      renderWithStore(
        <Drawing />,
        horizontalLineDrawn
      );
      triggerRequestAnimationFrame(startTime);
      triggerRequestAnimationFrame(startTime + 250);
      expect(AnimatedLine).toBeRenderedWithProps({
        commandToAnimate: horizontalLine,
        turtle: { x: 150, y: 100, angle: 0 },
      });
    });

    it("invokes requestAnimationFrame repeatedly until the duration is reached", () => {
      renderWithStore(
        <Drawing />,
        horizontalLineDrawn
      );
      triggerAnimationSequence([0, 250, 500]);
      expect(
        window.requestAnimationFrame.mock.calls
      ).toHaveLength(3);
    });
  });

  describe("after animation", () => {
    it("animates the next command", () => {
      renderWithStore(<Drawing />, {
        script: {
          drawCommands: [
            horizontalLine,
            verticalLine,
          ],
        },
      });
      triggerAnimationSequence([0, 500]);
      expect(AnimatedLine).toBeRenderedWithProps(
        expect.objectContaining({
          commandToAnimate: verticalLine,
        })
      );
    });

    it("places line in StaticLines", () => {
      renderWithStore(<Drawing />, {
        script: {
          drawCommands: [
            horizontalLine,
            verticalLine,
          ],
        },
      });
      triggerRequestAnimationFrame(0);
      triggerRequestAnimationFrame(500);
      expect(StaticLines).toBeRenderedWithProps({
        lineCommands: [horizontalLine],
      });
    });
  });

  it("calls cancelAnimationFrame on reset", () => {
    renderWithStore(<Drawing />, {
      script: { drawCommands: [horizontalLine] },
    });
    renderWithStore(<Drawing />, {
      script: { drawCommands: [] },
    });
    expect(
      window.cancelAnimationFrame
    ).toBeCalledWith(cancelToken);
  });

  it("does not call cancelAnimationFrame if no line animating", () => {
    jest.spyOn(window, "cancelAnimationFrame");
    renderWithStore(<Drawing />, {
      script: { drawCommands: [] },
    });
    renderWithStore(<React.Fragment />);
    expect(
      window.cancelAnimationFrame
    ).not.toBeCalled();
  });

  describe("rotation animation", () => {
    const rotationPerformed = {
      script: { drawCommands: [rotate90] },
    };

    it("rotates the turtle", () => {
      renderWithStore(<Drawing />, rotationPerformed);
      triggerAnimationSequence([0, 500]);
      expect(Turtle).toBeRenderedWithProps({
        x: 0,
        y: 0,
        angle: 90,
      });
    });

    it("rotates part-way at a speed of 1s per 180 degrees", () => {
      renderWithStore(<Drawing />, rotationPerformed);
      triggerAnimationSequence([0, 250]);
      expect(Turtle).toBeRenderedWithProps({
        x: 0,
        y: 0,
        angle: 45,
      });
    });

    it("calculates rotation with a non-zero animation start time", () => {
      const startTime = 12345;
      renderWithStore(<Drawing />, rotationPerformed);
      triggerRequestAnimationFrame(startTime);
      triggerRequestAnimationFrame(startTime + 250);
      expect(Turtle).toBeRenderedWithProps({
        x: 0,
        y: 0,
        angle: 45,
      });
    });

    it("invokes requestAnimationFrame repeatedly until the duration is reached", () => {
      renderWithStore(<Drawing />, rotationPerformed);
      triggerAnimationSequence([0, 250, 500]);
      expect(
        window.requestAnimationFrame.mock.calls
      ).toHaveLength(3);
    });
  });

  it("animates the next command once rotation is complete", async () => {
    renderWithStore(<Drawing />, {
      script: {
        drawCommands: [rotate90, horizontalLine],
      },
    });
    triggerAnimationSequence([0, 500, 0, 250]);
    expect(Turtle).toBeRenderedWithProps({
      x: 150,
      y: 100,
      angle: 90,
    });
  });

  describe("skipping animation", () => {
    const store = {
      environment: { shouldAnimate: false },
      script: {
        drawCommands: [rotate90, horizontalLine],
        turtle: { x: 123, y: 234, angle: 180 },
      },
    };

    it("does not render AnimatedLine", () => {
      renderWithStore(<Drawing />, store);
      expect(AnimatedLine).not.toBeCalled();
    });

    it("draws all remaining commands as StaticLines", () => {
      renderWithStore(<Drawing />, store);
      expect(StaticLines).toBeRenderedWithProps({
        lineCommands: [horizontalLine],
      });
    });

    it("sets the turtle at the final position", () => {
      renderWithStore(<Drawing />, store);
      expect(Turtle).toBeRenderedWithProps({
        x: 123,
        y: 234,
        angle: 180,
      });
    });
  });

  describe("resetting", () => {
    it("resets Turtle position and angle to all-zeros", async () => {
      renderWithStore(<Drawing />, {
        script: {
          drawCommands: [horizontalLine, rotate90],
        },
      });
      triggerAnimationSequence([0, 500, 0, 500]);
      renderWithStore(<Drawing />, {
        script: {
          drawCommands: [],
          turtle: { x: 0, y: 0, angle: 0 },
        },
      });
      expect(Turtle).toBeRenderedWithProps({
        x: 0,
        y: 0,
        angle: 0,
      });
    });
  });

  describe("undo", () => {
    it("resets Turtle position to the store turtle position", () => {
      renderWithStore(<Drawing />, {
        script: {
          drawCommands: [horizontalLine, rotate90],
        },
      });
      triggerAnimationSequence([0, 500, 0, 500]);
      renderWithStore(<Drawing />, {
        script: {
          drawCommands: [horizontalLine],
          turtle: { x: 123, y: 234, angle: 90 },
        },
      });
      expect(Turtle).toBeRenderedWithProps({
        x: 123,
        y: 234,
        angle: 90,
      });
    });
  });
});
