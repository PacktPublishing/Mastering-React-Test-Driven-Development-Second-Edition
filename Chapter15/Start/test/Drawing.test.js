import React from "react";
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
import { Turtle } from "../src/Turtle";
import { StaticLines } from "../src/StaticLines";
jest.mock("../src/Turtle", () => ({
  Turtle: jest.fn(() => <div id="Turtle" />),
}));
jest.mock("../src/StaticLines", () => ({
  StaticLines: jest.fn(() => (
    <div id="StaticLines" />
  )),
}));

describe("Drawing", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  const svg = () => element("svg");
  const line = () => element("line");
  const allLines = () => elements("line");

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

  it("passes the turtle x, y and angle as props to Turtle", () => {
    const turtle = { x: 10, y: 20, angle: 30 };
    renderWithStore(<Drawing />, {
      script: { drawCommands: [], turtle },
    });
    expect(Turtle).toBeCalledWith(
      { x: 10, y: 20, angle: 30 },
      {}
    );
  });

  it("renders StaticLines within the svg", () => {
    renderWithStore(<Drawing />);
    expect(
      element("svg > div#StaticLines")
    ).not.toBeNull();
  });

  it("sends only line commands to StaticLines", () => {
    const unknown = { drawCommand: "unknown" };
    renderWithStore(<Drawing />, {
      script: {
        drawCommands: [
          horizontalLine,
          verticalLine,
          unknown,
        ],
      },
    });
    expect(StaticLines).toBeCalledWith(
      {
        lineCommands: [horizontalLine, verticalLine],
      },
      expect.anything()
    );
  });
});
