import {
  scriptReducer as reducer,
  defaultState,
} from "../../src/reducers/script";
import { parseStatement } from "../../src/parser";
jest.mock("../../src/parser", () => ({
  parseStatement: jest.fn(),
}));

describe("scriptReducer", () => {
  it("returns default state when existing state is undefined", () => {
    expect(reducer(undefined, {})).toEqual(
      defaultState
    );
  });

  it("updates the script name when receiving a SUBMIT_SCRIPT_NAME action", () => {
    const initialState = { name: "a" };
    const action = {
      type: "SUBMIT_SCRIPT_NAME",
      text: "b",
    };
    const result = reducer(initialState, action);
    expect(result.name).toEqual("b");
  });

  describe("when receiving a SUBMIT_EDIT_LINE action", () => {
    const action = {
      type: "SUBMIT_EDIT_LINE",
      text: "statement",
    };

    it("passes text through to parser", () => {
      reducer(undefined, action);
      expect(parseStatement).toBeCalledWith(
        "statement",
        expect.anything()
      );
    });

    it("passes through state with error removed", () => {
      reducer(
        { a: 123, b: 234, error: "an error" },
        action
      );
      expect(parseStatement).toBeCalledWith(
        expect.anything(),
        {
          a: 123,
          b: 234,
          error: undefined,
        }
      );
    });
  });

  describe("RESET action", () => {
    it("resets state to default state", () => {
      const state = { a: 123 };
      expect(
        reducer(state, { type: "RESET" })
      ).toEqual(defaultState);
    });
  });
});
