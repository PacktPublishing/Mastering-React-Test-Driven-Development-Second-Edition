import React from "react";
import ReactDOM from "react-dom";
import {
  initializeReactContainer,
  render,
  element,
} from "./reactTestExtensions";
import { AnimatedLine } from "../src/AnimatedLine";
import { horizontalLine } from "./sampleInstructions";

const turtle = { x: 10, y: 10, angle: 10 };

describe("AnimatedLine", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  const renderSvg = (component) =>
    render(<svg>{component}</svg>);
  const line = () => element("line");

  it("draws a line starting at the x1,y1 co-ordinate of the command being drawn", () => {
    renderSvg(
      <AnimatedLine
        commandToAnimate={horizontalLine}
        turtle={turtle}
      />
    );
    expect(line()).not.toBeNull();
    expect(line().getAttribute("x1")).toEqual(
      horizontalLine.x1.toString()
    );
    expect(line().getAttribute("y1")).toEqual(
      horizontalLine.y1.toString()
    );
  });

  it("draws a line ending at the current position of the turtle", () => {
    renderSvg(
      <AnimatedLine
        commandToAnimate={horizontalLine}
        turtle={{ x: 10, y: 20 }}
      />
    );
    expect(line().getAttribute("x2")).toEqual("10");
    expect(line().getAttribute("y2")).toEqual("20");
  });

  it("sets a stroke width of 2", () => {
    renderSvg(
      <AnimatedLine
        commandToAnimate={horizontalLine}
        turtle={turtle}
      />
    );
    expect(
      line().getAttribute("stroke-width")
    ).toEqual("2");
  });

  it("sets a stroke color of black", () => {
    renderSvg(
      <AnimatedLine
        commandToAnimate={horizontalLine}
        turtle={turtle}
      />
    );
    expect(line().getAttribute("stroke")).toEqual(
      "black"
    );
  });
});
