import React from "react";
import "./translations/i18n";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import StoreWrapper from "./components/StoreWrapper";

// styles
import "./stylesheets/index.scss";

ReactDOM.render(
  <StoreWrapper storeId="app">
    <App />
  </StoreWrapper>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
