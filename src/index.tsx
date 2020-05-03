import React, { Suspense } from "react";
import "./i18n";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import StoreWrapper from "./components/StoreWrapper";

// styles
import "./stylesheets/index.scss";

ReactDOM.render(
  <Suspense fallback={null}>
    <StoreWrapper storeId="app">
      <App />
    </StoreWrapper>
  </Suspense>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
