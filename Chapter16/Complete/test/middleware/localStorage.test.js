import {
  load,
  save,
} from "../../src/middleware/localStorage";
import {
  parseTokens,
  emptyState,
} from "../../src/parser";
jest.mock("../../src/parser", () => ({
  emptyState: jest.requireActual("../../src/parser")
    .emptyState,
  parseTokens: jest.fn(),
}));

describe("localStorage", () => {
  let getItemSpy = jest.fn();
  let setItemSpy = jest.fn();

  beforeEach(() => {
    Object.defineProperty(window, "localStorage", {
      value: {
        getItem: getItemSpy,
        setItem: setItemSpy,
      },
    });
  });

  describe("save middleware", () => {
    const name = "script name";
    const parsedTokens = ["forward 10"];
    const state = { script: { name, parsedTokens } };
    const action = { type: "ANYTHING" };
    const store = { getState: () => state };
    let next;

    beforeEach(() => {
      next = jest.fn();
    });

    function callMiddleware() {
      return save(store)(next)(action);
    }

    it("calls next with the action", () => {
      callMiddleware();
      expect(next).toBeCalledWith(action);
    });

    it("returns the result of next action", () => {
      next.mockReturnValue({ a: 123 });
      expect(callMiddleware()).toEqual({ a: 123 });
    });

    it("saves the current state of the store in localStorage", () => {
      callMiddleware();
      expect(setItemSpy).toBeCalledWith("name", name);
      expect(setItemSpy).toBeCalledWith(
        "parsedTokens",
        JSON.stringify(parsedTokens)
      );
    });
  });

  describe("load", () => {
    describe("with saved data", () => {
      beforeEach(() => {
        getItemSpy.mockReturnValueOnce("script name");
        getItemSpy.mockReturnValueOnce(
          JSON.stringify([{ a: 123 }])
        );
      });

      it("retrieves state from localStorage", () => {
        load();
        expect(getItemSpy).toBeCalledWith("name");
        expect(getItemSpy).toHaveBeenLastCalledWith(
          "parsedTokens"
        );
      });

      it("calls to parseTokens to retrieve data", () => {
        load();
        expect(parseTokens).toBeCalledWith(
          [{ a: 123 }],
          emptyState
        );
      });

      it("returns re-parsed draw commands", () => {
        parseTokens.mockReturnValue({
          drawCommands: [],
        });
        expect(load().script).toHaveProperty(
          "drawCommands",
          []
        );
      });

      it("returns name", () => {
        expect(load().script).toHaveProperty(
          "name",
          "script name"
        );
      });
    });

    it("returns undefined if there is no state saved", () => {
      getItemSpy.mockReturnValue(null);
      expect(load()).not.toBeDefined();
    });
  });
});
