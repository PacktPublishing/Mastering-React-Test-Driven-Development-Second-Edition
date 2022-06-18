import { put, call } from "redux-saga/effects";
import { appHistory } from "../history";

const fetch = (url, data) =>
  global.fetch(url, {
    body: JSON.stringify(data),
    method: "POST",
    credentials: "same-origin",
    headers: { "Content-Type": "application/json" },
  });

export function* addCustomer({ customer }) {
  yield put({ type: "ADD_CUSTOMER_SUBMITTING" });
  const result = yield call(
    fetch,
    "/customers",
    customer
  );
  if (result.ok) {
    const customerWithId = yield call([
      result,
      "json",
    ]);
    yield put({
      type: "ADD_CUSTOMER_SUCCESSFUL",
      customer: customerWithId,
    });
    appHistory.push(
      `/addAppointment?customer=${customerWithId.id}`
    );
  } else if (result.status === 422) {
    const response = yield call([result, "json"]);
    yield put({
      type: "ADD_CUSTOMER_VALIDATION_FAILED",
      validationErrors: response.errors,
    });
  } else {
    yield put({ type: "ADD_CUSTOMER_FAILED" });
  }
}
