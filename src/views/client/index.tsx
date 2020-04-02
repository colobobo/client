import React, { FC, useEffect } from "react";
import { Route, Switch, MemoryRouter } from "react-router-dom";

// store
import { useDispatch } from "react-redux";
import { WebSocketActionTypes } from "../../redux/WebSocket/actions/actionCreators";
import { redux as reduxUtils } from "../../utils";
import { actions as WebSocketActions } from "../../redux/WebSocket";
import { actions as AdminActions } from "../../redux/Admin";
import { actions as DeviceActions } from "../../redux/Device";

import "./index.scss";

// views
import Landing from "./landing";
import Room from "./room";
import Join from "./join";
import Game from "./game";

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
      WebSocketActions,
      WebSocketActionTypes.wsSubscribe,
      dispatch
    );
  }, [dispatch]);

  useEffect(() => {
    if (isAdmin) {
      dispatch(AdminActions.activate());
    } else {
      dispatch(AdminActions.disable());
    }
  }, [isAdmin, dispatch]);

  useEffect(() => {
    if (isAdmin) {
      dispatch(
        DeviceActions.addScreenSize({
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
        </Switch>
      </MemoryRouter>
    </div>
  );
};

export default Client;
