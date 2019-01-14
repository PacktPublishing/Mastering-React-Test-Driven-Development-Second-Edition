import React from "react";
import {
  initializeReactContainer,
  render,
  container,
} from "./reactTestExtensions";
import { MenuButtons } from "../src/MenuButtons";

describe("MenuButtons", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders nothing", () => {
    render(<MenuButtons />);
    expect(container.childNodes).toHaveLength(0);
  });
});
