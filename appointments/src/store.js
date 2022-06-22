import { createStore, combineReducers } from "redux";
import { reducer as customerReducer } from "./reducers/customer";

export const configureStore = (storeEnhancers = []) =>
  createStore(
    combineReducers({ customer: customerReducer }),
    storeEnhancers
  );
