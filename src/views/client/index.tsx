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
  currentMobile: any;
  isAdmin: boolean;
  gameId?: string;
  autoconnect?: boolean;
  onCreateGame: any;
  adminPosition: number;
}

const Client: FC<Props> = ({
  currentMobile,
  isAdmin,
  gameId,
  autoconnect,
  onCreateGame,
  adminPosition
}) => {
  const dispatch = useDispatch();
  const roomId = useSelector(selectors.room.selectId);

  const handleOnCreateGame = useCallback(
    (gameId?: string) => {
      onCreateGame(gameId);
    },
    [onCreateGame]
  );

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
          width: currentMobile.resolution.width,
          height: currentMobile.resolution.height
        })
      );

      if (autoconnect) {
        if (!gameId && adminPosition === 0) {
          console.log(currentMobile);
          dispatch(
            actions.webSocket.emit.room.create({
              width: currentMobile.resolution.width,
              height: currentMobile.resolution.height
            })
          );
          if (roomId) {
            handleOnCreateGame(roomId);
          }
        } else if (gameId && adminPosition > 0) {
          dispatch(
            actions.webSocket.emit.room.join({
              width: currentMobile.resolution.width,
              height: currentMobile.resolution.height,
              id: gameId
            })
          );
        }
      }
    }
  }, [
    dispatch,
    isAdmin,
    currentMobile,
    gameId,
    handleOnCreateGame,
    autoconnect,
    adminPosition,
    roomId
  ]);

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
