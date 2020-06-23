import React, { FC, useEffect, useCallback, useMemo } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { actions } from "./redux";
import { useDispatch } from "react-redux";
import { WebSocketActionTypes } from "./redux/WebSocket/actions/actionCreators";
import { redux as reduxUtils } from "./utils";
import Client from "./views";
import Admin from "./views/admin";

const App: FC = () => {
  const dispatch = useDispatch();

  // URL PARAMS

  const urlParams = useMemo(() => {
    return new URLSearchParams(window.location.search);
  }, []);

  const urlIsAdmin = useMemo(() => {
    return urlParams.has("admin");
  }, [urlParams]);

  const urlHasDebug = useMemo(() => {
    return urlParams.has("debug");
  }, [urlParams]);

  const urlAdminIndex = useMemo(() => {
    return urlParams.get("admin");
  }, [urlParams]);

  const urlAdminRoomId = useMemo(() => {
    return urlParams.get("admin_room");
  }, [urlParams]);

  const urlRoomId = useMemo(() => {
    return urlParams.get("room");
  }, [urlParams]);

  // handlers

  const handleResize = useCallback(() => {
    const vh = window.innerHeight * 0.01;
    document.body.style.setProperty("--vh", `${vh}px`);
  }, []);

  // EFFECT

  // if url admin -> set admin status

  useEffect(() => {
    if (urlIsAdmin) {
      dispatch(actions.admin.activate());
    }
  }, [dispatch, urlIsAdmin]);

  // if url admin index -> set admin device index

  useEffect(() => {
    if (urlAdminIndex) {
      dispatch(actions.admin.setDeviceIndex({ index: urlAdminIndex }));
    }
  }, [dispatch, urlAdminIndex]);

  // if url admin room -> set admin room id

  useEffect(() => {
    if (urlIsAdmin && urlAdminRoomId) {
      dispatch(actions.admin.setRoomId({ id: urlAdminRoomId }));
    }
  }, [dispatch, urlAdminRoomId, urlIsAdmin]);

  // if room -> join room id

  useEffect(() => {
    if (urlRoomId) {
      dispatch(
        actions.webSocket.emit.room.join({
          width: window.innerWidth,
          height: window.innerHeight,
          id: urlRoomId,
          ...(urlAdminIndex ? { adminIndex: urlAdminIndex } : {})
        })
      );
    }
  }, [dispatch, urlAdminIndex, urlAdminRoomId, urlIsAdmin, urlRoomId]);

  // if url debug

  useEffect(() => {
    if (urlHasDebug) {
      dispatch(
        actions.game.setHasDebug({
          hasDebug: true
        })
      );
    }
  }, [dispatch, urlHasDebug]);

  // subscribe all socket events

  useEffect(() => {
    reduxUtils.dispatchAll(
      actions.webSocket,
      WebSocketActionTypes.wsSubscribe,
      dispatch
    );
  }, [dispatch]);

  // resize

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
