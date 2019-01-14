import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { configureStore } from "./store";
import { App } from "./App";

ReactDOM.createRoot(
  document.getElementById("root")
).render(
  <Provider store={configureStore()}>
    <App />
  </Provider>
);
