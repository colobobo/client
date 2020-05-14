import React, { FC, useEffect, useCallback } from "react";
import { Route, Switch, MemoryRouter } from "react-router-dom";

// store
import { useDispatch, useSelector } from "react-redux";
import { WebSocketActionTypes } from "../../redux/WebSocket/actions/actionCreators";
import { redux as reduxUtils } from "../../utils";
import { actions, selectors } from "../../redux";

//style
import "./index.scss";

// views
import Landing from "./landing";
import Room from "./room";
import Join from "./join";
import Game from "./game";
import WaitingRoom from "./waitingRoom";

interface Props {
  device: any;
  isAdmin: boolean;
  adminRoomId?: string;
  autoconnect?: boolean;
  onCreateRoom?: (adminRoomId: string) => any;
  adminPosition: number;
}

const Client: FC<Props> = ({
  device,
  isAdmin,
  adminRoomId,
  autoconnect,
  onCreateRoom,
  adminPosition
}) => {
  const dispatch = useDispatch();
  const roomId = useSelector(selectors.room.selectId);

  useEffect(() => {
    reduxUtils.dispatchAll(
      actions.webSocket,
      WebSocketActionTypes.wsSubscribe,
      dispatch
    );
  }, [dispatch]);

  useEffect(() => {
    if (roomId && onCreateRoom) {
      onCreateRoom(roomId);
    }
  }, [onCreateRoom, roomId]);

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
          width: device.resolution.width,
          height: device.resolution.height
        })
      );

      if (autoconnect) {
        if (!adminRoomId && adminPosition === 0) {
          dispatch(
            actions.webSocket.emit.room.create({
              width: device.resolution.width,
              height: device.resolution.height
            })
          );
        } else if (adminRoomId && adminPosition > 0) {
          dispatch(
            actions.webSocket.emit.room.join({
              width: device.resolution.width,
              height: device.resolution.height,
              id: adminRoomId
            })
          );
        }
      }
    }
  }, [dispatch, isAdmin, adminRoomId, autoconnect, adminPosition]);

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
