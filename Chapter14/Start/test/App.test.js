import React from "react";
import {
  initializeReactContainer,
  renderWithStore,
  element,
  elements,
} from "./reactTestExtensions";
import { App } from "../src/App";
import { MenuButtons } from "../src/MenuButtons";
import { StatementHistory } from "../src/StatementHistory";
import { ScriptName } from "../src/ScriptName";
import { Drawing } from "../src/Drawing";
import { Prompt } from "../src/Prompt";
import { PromptError } from "../src/PromptError";
jest.mock("../src/ScriptName", () => ({
  ScriptName: jest.fn(() => <div id="ScriptName" />),
}));
jest.mock("../src/MenuButtons", () => ({
  MenuButtons: jest.fn(() => (
    <div id="MenuButtons" />
  )),
}));
jest.mock("../src/Drawing", () => ({
  Drawing: jest.fn(() => <div id="Drawing" />),
}));
jest.mock("../src/StatementHistory", () => ({
  StatementHistory: jest.fn(() => (
    <tbody id="StatementHistory" />
  )),
}));
jest.mock("../src/Prompt", () => ({
  Prompt: jest.fn(() => <tbody id="Prompt" />),
}));
jest.mock("../src/PromptError", () => ({
  PromptError: jest.fn(() => (
    <tbody id="PromptError" />
  )),
}));

describe("App", () => {
  beforeEach(() => {
    initializeReactContainer();
  });

  it("renders a ScriptName component as the first item in  the menu", () => {
    renderWithStore(<App />);
    expect(elements("menu > *")[0].id).toEqual(
      "ScriptName"
    );
  });

  it("renders a MenuButtons component as the second items in the menu", () => {
    renderWithStore(<App />);
    expect(elements("menu > *")[1].id).toEqual(
      "MenuButtons"
    );
  });

  it("renders a Display component in div#drawing", () => {
    renderWithStore(<App />);
    expect(
      element("#drawing > #Display")
    ).toBeDefined();
  });

  it("renders a table in div#commands", () => {
    renderWithStore(<App />);
    expect(
      element("#commands > table")
    ).toBeDefined();
  });

  it("renders a StatementHistory component as the first item in the table", () => {
    renderWithStore(<App />);
    const tableChildren = elements(
      "#commands > table > *"
    );
    expect(tableChildren[0].id).toEqual(
      "StatementHistory"
    );
  });

  it("renders a Prompt component as the second item in the table", () => {
    renderWithStore(<App />);
    const tableChildren = elements(
      "#commands > table > *"
    );
    expect(tableChildren[1].id).toEqual("Prompt");
  });

  it("renders a PromptError component as the third item in the table", () => {
    renderWithStore(<App />);
    const tableChildren = elements(
      "#commands > table > *"
    );
    expect(tableChildren[2].id).toEqual(
      "PromptError"
    );
  });
});
