import React, { FC, useEffect } from "react";
import { Route, Switch, MemoryRouter } from "react-router-dom";

// store
import { useDispatch } from "react-redux";
import { WebSocketActionTypes } from "../../redux/WebSocket/actions/actionCreators";
import { redux as reduxUtils } from "../../utils";
import { actions } from "../../redux";

import "./index.scss";

// views
import Landing from "./landing";
import Room from "./room";
import Join from "./join";
import Game from "./game";
import WaitingRoom from "./waitingRoom";

interface Props {
  deviceSize: {
    width: number;
    height: number;
  };
  isAdmin: boolean;
}

const Client: FC<Props> = ({ deviceSize, isAdmin }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    reduxUtils.dispatchAll(
      actions.webSocket,
      WebSocketActionTypes.wsSubscribe,
      dispatch
    );
  }, [dispatch]);

  useEffect(() => {
    if (isAdmin) {
      dispatch(actions.admin.activate());
    } else {
      dispatch(actions.admin.disable());
    }
  }, [isAdmin, dispatch]);

  useEffect(() => {
    if (isAdmin) {
      dispatch(
        actions.device.addScreenSize({
          width: deviceSize.width,
          height: deviceSize.height
        })
      );
    }
  }, [isAdmin, dispatch, deviceSize]);

  // return

  return (
    <div className="client">
      <MemoryRouter>
        <Switch>
          <Route exact path="/" component={Landing} />
          <Route exact path="/join" component={Join} />
          <Route exact path="/game" component={Game} />
          <Route path="/room/:roomId" component={Room} />
          <Route path="/waiting-room/:roomId" component={WaitingRoom} />
        </Switch>
      </MemoryRouter>
    </div>
  );
};

export default Client;
