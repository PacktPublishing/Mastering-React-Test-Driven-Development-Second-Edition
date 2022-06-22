import { storeSpy, expectRedux } from "expect-redux";
import {
  fetchResponseOk,
  fetchResponseError,
} from "../builders/fetch";
import { configureStore } from "../../src/store";

describe("addCustomer", () => {
  const customer = { id: 123 };
  let store;

  beforeEach(() => {
    jest
      .spyOn(global, "fetch")
      .mockReturnValue(fetchResponseOk(customer));
    store = configureStore([storeSpy]);
  });

  const addCustomerRequest = (customer) => ({
    type: "ADD_CUSTOMER_REQUEST",
    customer,
  });

  it("sets current status to submitting", () => {
    store.dispatch(addCustomerRequest());

    return expectRedux(store)
      .toDispatchAnAction()
      .matching({ type: "ADD_CUSTOMER_SUBMITTING" });
  });

  it("sends HTTP request to POST /customers", async () => {
    const inputCustomer = { firstName: "Ashley" };
    store.dispatch(addCustomerRequest(inputCustomer));

    expect(global.fetch).toBeCalledWith(
      "/customers",
      expect.objectContaining({
        method: "POST",
      })
    );
  });

  it("calls fetch with correct configuration", async () => {
    const inputCustomer = { firstName: "Ashley" };
    store.dispatch(addCustomerRequest(inputCustomer));

    expect(global.fetch).toBeCalledWith(
      expect.anything(),
      expect.objectContaining({
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
      })
    );
  });

  it("calls fetch with customer as request body", async () => {
    const inputCustomer = { firstName: "Ashley" };
    store.dispatch(addCustomerRequest(inputCustomer));

    expect(global.fetch).toBeCalledWith(
      expect.anything(),
      expect.objectContaining({
        body: JSON.stringify(inputCustomer),
      })
    );
  });

  it("dispatches ADD_CUSTOMER_SUCCESSFUL on success", () => {
    store.dispatch(addCustomerRequest());

    return expectRedux(store)
      .toDispatchAnAction()
      .matching({
        type: "ADD_CUSTOMER_SUCCESSFUL",
        customer,
      });
  });

  it("dispatches ADD_CUSTOMER_FAILED on non-specific error", () => {
    global.fetch.mockReturnValue(
      fetchResponseError()
    );
    store.dispatch(addCustomerRequest());

    return expectRedux(store)
      .toDispatchAnAction()
      .matching({ type: "ADD_CUSTOMER_FAILED" });
  });

  it("dispatches ADD_CUSTOMER_VALIDATION_FAILED if validation errors were returned", () => {
    const errors = {
      field: "field",
      description: "error text",
    };
    global.fetch.mockReturnValue(
      fetchResponseError(422, { errors })
    );

    store.dispatch(addCustomerRequest());

    return expectRedux(store)
      .toDispatchAnAction()
      .matching({
        type: "ADD_CUSTOMER_VALIDATION_FAILED",
        validationErrors: errors,
      });
  });
});
