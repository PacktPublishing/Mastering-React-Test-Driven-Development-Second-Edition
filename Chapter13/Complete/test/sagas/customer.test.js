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

  const dispatchRequest = (customer) =>
    store.dispatch({
      type: "ADD_CUSTOMER_REQUEST",
      customer,
    });

  it("sets current status to submitting", () => {
    dispatchRequest();

    return expectRedux(store)
      .toDispatchAnAction()
      .matching({ type: "ADD_CUSTOMER_SUBMITTING" });
  });

  it("sends HTTP request to POST /customers", async () => {
    const inputCustomer = { firstName: "Ashley" };
    dispatchRequest(inputCustomer);

    expect(global.fetch).toBeCalledWith(
      "/customers",
      expect.objectContaining({
        method: "POST",
      })
    );
  });

  it("calls fetch with correction configuration", async () => {
    const inputCustomer = { firstName: "Ashley" };
    dispatchRequest(inputCustomer);

    expect(global.fetch).toBeCalledWith(
      expect.anything(),
      expect.objectContaining({
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
      })
    );
  });

  it("calls fetch with customer as request body", async () => {
    const inputCustomer = { firstName: "Ashley" };
    dispatchRequest(inputCustomer);

    expect(global.fetch).toBeCalledWith(
      expect.anything(),
      expect.objectContaining({
        body: JSON.stringify(inputCustomer),
      })
    );
  });

  it("dispatches ADD_CUSTOMER_SUCCESSFUL on success", () => {
    dispatchRequest();

    return expectRedux(store)
      .toDispatchAnAction()
      .matching({ type: "ADD_CUSTOMER_SUCCESSFUL", customer });
  });

  it("navigates to /addAppointment on success", () => {
    dispatchRequest();
    expect(window.location.pathname).toEqual("/addAppointment");
  });

  it("includes the customer id in the query string when navigating to /addAppointment", () => {
    dispatchRequest();
    expect(window.location.search).toEqual("?customer=123");
  });

  it("dispatches ADD_CUSTOMER_FAILED on non-specific error", () => {
    global.fetch.mockReturnValue(fetchResponseError());
    dispatchRequest();

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

    dispatchRequest();

    return expectRedux(store).toDispatchAnAction().matching({
      type: "ADD_CUSTOMER_VALIDATION_FAILED",
      validationErrors: errors,
    });
  });
});
