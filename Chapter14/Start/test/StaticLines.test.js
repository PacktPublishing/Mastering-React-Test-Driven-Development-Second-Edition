import React from "react";
import {
  initializeReactContainer,
  render,
  element,
  elements,
} from "./reactTestExtensions";
import { StaticLines } from "../src/StaticLines";
import {
  horizontalLine,
  verticalLine,
  diagonalLine,
} from "./sampleInstructions";

describe("StaticLines", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  const renderSvg = (component) =>
    render(<svg>{component}</svg>);
  const line = () => element("line");
  const allLines = () => elements("line");

  it("renders a line with the line coordinates", () => {
    renderSvg(
      <StaticLines lineCommands={[horizontalLine]} />
    );
    expect(line()).not.toBeNull();
    expect(line().getAttribute("x1")).toEqual("100");
    expect(line().getAttribute("y1")).toEqual("100");
    expect(line().getAttribute("x2")).toEqual("200");
    expect(line().getAttribute("y2")).toEqual("100");
  });

  it("sets a stroke width of 2", () => {
    renderSvg(
      <StaticLines lineCommands={[horizontalLine]} />
    );
    expect(
      line().getAttribute("stroke-width")
    ).toEqual("2");
  });

  it("sets a stroke color of black", () => {
    renderSvg(
      <StaticLines lineCommands={[horizontalLine]} />
    );
    expect(line().getAttribute("stroke")).toEqual(
      "black"
    );
  });

  it("draws every drawLine command", () => {
    renderSvg(
      <StaticLines
        lineCommands={[
          horizontalLine,
          verticalLine,
          diagonalLine,
        ]}
      />
    );
    expect(allLines()).toHaveLength(3);
  });
});
