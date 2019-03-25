import React from "react";
import {
  initializeReactContainer,
  renderAndWait,
  clickAndWait,
  change,
  element,
  elements,
  textOf,
} from "./reactTestExtensions";
import { CustomerSearch } from "../src/CustomerSearch";
import { fetchResponseOk } from "./builders/fetch";

describe("CustomerSearch", () => {
  beforeEach(() => {
    initializeReactContainer();
    jest
      .spyOn(global, "fetch")
      .mockResolvedValue(fetchResponseOk([]));
  });
});
