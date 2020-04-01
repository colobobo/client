import React, { FC, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  MemoryRouter
} from "react-router-dom";
import { useDispatch } from "react-redux";
import { WebSocketActionTypes } from "../../redux/WebSocket/actions/actionCreators";
import { redux as reduxUtils } from "../../utils";
import { actions as WebSocketActions } from "../../redux/WebSocket";

import "./index.scss";

// views
import Landing from "../../views/app/landing";
import Room from "../../views/app/room";
import Join from "../../views/app/join";
import Game from "../../views/app/game";

const Client: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    reduxUtils.dispatchAll(
      WebSocketActions,
      WebSocketActionTypes.wsSubscribe,
      dispatch
    );
  }, [dispatch]);

  // return

  return (
    <div className="client">
      <MemoryRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/join" component={Join} />
          <Route exact path="/game" component={Game} />
          <Route path="/room/:roomId" component={Room} />
        </Switch>
      </MemoryRouter>
    </div>
  );
};

export default Client;
