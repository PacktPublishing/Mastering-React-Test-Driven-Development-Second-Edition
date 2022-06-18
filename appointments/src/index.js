import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
import { appHistory } from "./history";
import { configureStore } from "./store";
import { App } from "./App";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <Provider store={configureStore()}>
    <HistoryRouter history={appHistory}>
      <App />
    </HistoryRouter>
  </Provider>
);
