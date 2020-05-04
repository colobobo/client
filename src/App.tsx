import React, { FC, useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { actions } from "./redux";

import Routes from "./routes";
import "./App.scss";
import { useDispatch } from "react-redux";
import { WebSocketActionTypes } from "./redux/WebSocket/actions/actionCreators";
import { redux as reduxUtils } from "./utils";

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    reduxUtils.dispatchAll(
      actions.webSocket,
      WebSocketActionTypes.wsSubscribe,
      dispatch
    );
  }, [dispatch]);

  return (
    <Router>
      <Routes />
    </Router>
  );
};

export default App;
