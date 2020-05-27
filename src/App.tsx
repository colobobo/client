import React, { FC, useEffect, useCallback } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { actions } from "./redux";
import { useDispatch } from "react-redux";
import { WebSocketActionTypes } from "./redux/WebSocket/actions/actionCreators";
import { redux as reduxUtils } from "./utils";
import Client from "./views";
import Admin from "./views/admin";

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    reduxUtils.dispatchAll(
      actions.webSocket,
      WebSocketActionTypes.wsSubscribe,
      dispatch
    );
  }, [dispatch]);

  const handleResize = useCallback(() => {
    const vh = window.innerHeight * 0.01;
    document.body.style.setProperty("--vh", `${vh}px`);
  }, []);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [handleResize]);

  return (
    <Router>
      <Switch>
        <Route path="/" exact component={Client} />
        <Route path="/admin" component={Admin} />
      </Switch>
    </Router>
  );
};

export default App;
