import React, { FC, useCallback, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

// store
import { useDispatch } from "react-redux";
import { actions as WebSocketActions } from "../../../redux/WebSocket";
import { selectors as AreaSelectors } from "../../../redux/Area";

import "./index.scss";
import { useTypedSelector } from "../../../redux/store";
import { selectors as GameSelectors } from "../../../redux/Game";

const Room: FC = () => {
  const { roomId } = useParams();
  const history = useHistory();

  // store

  const dispatch = useDispatch();
  const devicesArray = useTypedSelector(AreaSelectors.selectDevicesArray);
  const isGameStarted = useTypedSelector(GameSelectors.selectIsStarted);

  // effect

  useEffect(() => {
    if (isGameStarted) {
      history.push("/game/");
    }
  }, [history, isGameStarted]);

  // handlers

  const handleOnClickStart = useCallback(
    event => {
      event.preventDefault();
      dispatch(WebSocketActions.emit.game.start());
    },
    [dispatch]
  );

  // return

  return (
    <div className="room">
      <div className="room__container">
        <h1 className="room__title">Id de la room: {roomId}</h1>
        <p>Joueur{devicesArray.length > 1 && "s"} :</p>
        <ul>
          {devicesArray.map(device => (
            <li key={device.id}>{device.id}</li>
          ))}
        </ul>
        <button
          onClick={handleOnClickStart}
          className="room__action button button--orange"
        >
          Commencer le jeu
        </button>
      </div>
    </div>
  );
};

export default Room;
