import React, { FC, useEffect } from "react";
import { Route, Switch, MemoryRouter } from "react-router-dom";

// store
import { useDispatch } from "react-redux";
import { useTypedSelector } from "../../redux/store";
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
  onSetAdminDevicePosition?: (position: number) => any;
  adminPosition: number;
}

const Client: FC<Props> = ({
  device,
  isAdmin,
  adminRoomId,
  autoconnect,
  onCreateRoom,
  onSetAdminDevicePosition,
  adminPosition
}) => {
  const dispatch = useDispatch();
  const roomId = useTypedSelector(selectors.room.selectId);
  const deviceId = useTypedSelector(selectors.room.selectDeviceId);
  const devicesArray = useTypedSelector(selectors.area.selectDevicesArray);
  const devicePosition = useTypedSelector(selectors.device.selectPosition);

  useEffect(() => {
    if (deviceId) {
      let position;
      devicesArray.map(device => {
        if (device.id === deviceId) {
          position = device.position;
        }
      });

      if (position !== undefined) {
        dispatch(
          actions.device.update({
            id: deviceId,
            position: position
          })
        );
      }
    }
  }, [deviceId, dispatch]);

  useEffect(() => {
    if (isAdmin && onSetAdminDevicePosition && devicePosition !== undefined) {
      onSetAdminDevicePosition(devicePosition + 1);
    }
  }, [isAdmin, devicePosition, onSetAdminDevicePosition]);

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
