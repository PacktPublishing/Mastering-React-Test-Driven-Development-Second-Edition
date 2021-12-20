import React from "react";
import {
  toBeRenderedWithProps,
  toBeFirstRenderedWithProps,
} from "./toBeRenderedWithProps";
import {
  initializeReactContainer,
  render,
} from "../reactTestExtensions";

const stripTerminalColor = (text) =>
  text.replace(/\x1B\[\d+m/g, "");

describe("toBeFirstRenderedWithProps", () => {
  let Component;

  beforeEach(() => {
    initializeReactContainer();
    Component = jest.fn(() => <div />);
  });

  it("returns pass is true when mock has been rendered", () => {
    render(<Component />);
    const result = toBeFirstRenderedWithProps(Component, {});
    expect(result.pass).toBe(true);
  });

  it("returns pass is false when the mock has not been rendered", () => {
    const result = toBeFirstRenderedWithProps(Component, {});
    expect(result.pass).toBe(false);
  });

  it("returns pass is false when the properties do not match", () => {
    render(<Component a="b" />);
    const result = toBeFirstRenderedWithProps(Component, {
      c: "d",
    });
    expect(result.pass).toBe(false);
  });

  it("returns a message that contains the source line if no match", () => {
    const result = toBeFirstRenderedWithProps(Component, {
      c: "d",
    });
    expect(stripTerminalColor(result.message())).toMatch(
      `expect(mockedComponent).toBeFirstRenderedWithProps({"c": "d"})`
    );
  });

  it("returns a message that contains the source line if negated match", () => {
    render(<Component c="d" />);
    const result = toBeFirstRenderedWithProps(Component, {
      c: "d",
    });
    expect(stripTerminalColor(result.message())).toMatch(
      `expect(mockedComponent).not.toBeFirstRenderedWithProps({"c": "d"})`
    );
  });

  it("returns a message that contains the actual props rendered", () => {
    render(<Component a="b" />);
    const result = toBeFirstRenderedWithProps(Component, {
      c: "d",
    });
    expect(stripTerminalColor(result.message())).toMatch(
      `Rendered with props: {"a": "b"}`
    );
  });

  it("returns a message that the passed object is not a mock", () => {
    const result = toBeFirstRenderedWithProps(<div />, {});
    expect(stripTerminalColor(result.message())).toMatch(
      `mockedComponent is not a mock`
    );
  });

  it("returns a message that the component was never rendered", () => {
    const result = toBeFirstRenderedWithProps(Component, {});
    expect(stripTerminalColor(result.message())).toMatch(
      `mockedComponent was never rendered`
    );
  });
});

describe("toBeRenderedWithProps", () => {
  let Component;

  beforeEach(() => {
    initializeReactContainer();
    Component = jest.fn(() => <div />);
  });

  it("returns pass is true when mock has been rendered", () => {
    render(<Component />);
    const result = toBeRenderedWithProps(Component, {});
    expect(result.pass).toBe(true);
  });

  it("returns pass is false when the mock has not been rendered", () => {
    const result = toBeRenderedWithProps(Component, {});
    expect(result.pass).toBe(false);
  });

  it("returns pass is false when the properties do not match", () => {
    render(<Component a="b" />);
    const result = toBeRenderedWithProps(Component, { c: "d" });
    expect(result.pass).toBe(false);
  });

  it("returns pass is true when the properties of the last render match", () => {
    render(<Component a="b" />);
    render(<Component c="d" />);
    const result = toBeRenderedWithProps(Component, { c: "d" });
    expect(result.pass).toBe(true);
  });

  it("returns a message that contains the source line if no match", () => {
    const result = toBeRenderedWithProps(Component, { c: "d" });
    expect(stripTerminalColor(result.message())).toMatch(
      `expect(mockedComponent).toBeRenderedWithProps({"c": "d"})`
    );
  });

  it("returns a message that contains the source line if negated match", () => {
    render(<Component c="d" />);
    const result = toBeRenderedWithProps(Component, { c: "d" });
    expect(stripTerminalColor(result.message())).toMatch(
      `expect(mockedComponent).not.toBeRenderedWithProps({"c": "d"})`
    );
  });

  it("returns a message that contains the actual props rendered", () => {
    render(<Component a="b" />);
    const result = toBeRenderedWithProps(Component, {
      c: "d",
    });
    expect(stripTerminalColor(result.message())).toMatch(
      `Rendered with props: {"a": "b"}`
    );
  });

  it("returns a message that the passed object is not a mock", () => {
    const result = toBeRenderedWithProps(<div />, {});
    expect(stripTerminalColor(result.message())).toMatch(
      `mockedComponent is not a mock`
    );
  });

  it("returns a message that the component was never rendered", () => {
    const result = toBeRenderedWithProps(Component, {});
    expect(stripTerminalColor(result.message())).toMatch(
      `mockedComponent was never rendered`
    );
  });
});
