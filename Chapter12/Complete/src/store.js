import {
  createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import createSagaMiddleware from "redux-saga";
import { takeLatest } from "redux-saga/effects";
import { addCustomer } from "./sagas/customer";
import { reducer as customerReducer } from "./reducers/customer";

function* rootSaga() {
  yield takeLatest(
    "ADD_CUSTOMER_REQUEST",
    addCustomer
  );
}

export const configureStore = (
  storeEnhancers = []
) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    combineReducers({ customer: customerReducer }),
    compose(
      applyMiddleware(sagaMiddleware),
      ...storeEnhancers
    )
  );
  sagaMiddleware.run(rootSaga);

  return store;
};
