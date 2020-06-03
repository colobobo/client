import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import StoreWrapper from "./components/StoreWrapper";
// translation
import { I18nextProvider } from "react-i18next";
import i18n from "./translations/i18n";

// styles
import "./stylesheets/index.scss";

ReactDOM.render(
  <StoreWrapper>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </StoreWrapper>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
