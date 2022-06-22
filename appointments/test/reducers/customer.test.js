import { reducer } from "../../src/reducers/customer";

describe("customer reducer", () => {
  it("returns a default state for an undefined existing state", () => {
    expect(reducer(undefined, {})).toEqual({
      customer: {},
      status: undefined,
      validationErrors: {},
      error: false,
    });
  });

  describe("ADD_CUSTOMER_SUBMITTING action", () => {
    const action = {
      type: "ADD_CUSTOMER_SUBMITTING",
    };

    it("sets status to SUBMITTING", () => {
      expect(
        reducer(undefined, action)
      ).toMatchObject({
        status: "SUBMITTING",
      });
    });

    it("maintains existing state", () => {
      expect(
        reducer({ a: 123 }, action)
      ).toMatchObject({
        a: 123,
      });
    });
  });

  describe("ADD_CUSTOMER_FAILED action", () => {
    const action = { type: "ADD_CUSTOMER_FAILED" };

    it("sets status to FAILED", () => {
      expect(
        reducer(undefined, action)
      ).toMatchObject({
        status: "FAILED",
      });
    });

    it("maintains existing state", () => {
      expect(
        reducer({ a: 123 }, action)
      ).toMatchObject({
        a: 123,
      });
    });

    it("sets error to true", () => {
      expect(
        reducer(undefined, action)
      ).toMatchObject({
        error: true,
      });
    });
  });

  describe("ADD_CUSTOMER_VALIDATION_FAILED action", () => {
    const validationErrors = { field: "error text" };
    const action = {
      type: "ADD_CUSTOMER_VALIDATION_FAILED",
      validationErrors,
    };
    it("sets status to VALIDATION_FAILED", () => {
      expect(
        reducer(undefined, action)
      ).toMatchObject({
        status: "VALIDATION_FAILED",
      });
    });

    it("maintains existing state", () => {
      expect(
        reducer({ a: 123 }, action)
      ).toMatchObject({
        a: 123,
      });
    });

    it("sets validation errors to provided errors", () => {
      expect(
        reducer(undefined, action)
      ).toMatchObject({
        validationErrors,
      });
    });
  });

  describe("ADD_CUSTOMER_SUCCESSFUL action", () => {
    const customer = { id: 123 };
    const action = {
      type: "ADD_CUSTOMER_SUCCESSFUL",
      customer,
    };

    it("sets status to SUCCESSFUL", () => {
      expect(
        reducer(undefined, action)
      ).toMatchObject({
        status: "SUCCESSFUL",
      });
    });

    it("maintains existing state", () => {
      expect(
        reducer({ a: 123 }, action)
      ).toMatchObject({
        a: 123,
      });
    });

    it("sets customer to provided customer", () => {
      expect(
        reducer(undefined, action)
      ).toMatchObject({
        customer,
      });
    });
  });
});
