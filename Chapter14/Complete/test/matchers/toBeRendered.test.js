import React from "react";
import { toBeRendered } from "./toBeRendered";
import {
  initializeReactContainer,
  render,
} from "../reactTestExtensions";

describe("toBeRendered", () => {
  let Component;

  beforeEach(() => {
    initializeReactContainer();
    Component = jest.fn(() => <div />);
  });

  it("returns pass is true when mock has been rendered", () => {
    render(<Component />);
    const result = toBeRendered(Component);
    expect(result.pass).toBe(true);
  });

  it("returns pass is false when the mock has not been rendered", () => {
    const result = toBeRendered(Component);
    expect(result.pass).toBe(false);
  });

  it("returns a message that contains the source line if no match", () => {
    const result = toBeRendered(Component);
    expect(result.message()).toMatch(
      `expect(mockedComponent).toBeRendered()`
    );
  });

  it("returns a message that contains the source line if negated match", () => {
    render(<Component c="d" />);
    const result = toBeRendered(Component);
    expect(result.message()).toMatch(
      `expect(mockedComponent).not.toBeRendered()`
    );
  });
});
