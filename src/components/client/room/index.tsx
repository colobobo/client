import React, { FC, useCallback } from "react";
import { useParams } from "react-router-dom";

// store
import { useDispatch } from "react-redux";
import { actions as GameActions } from "../../../redux/WebSocket";

import "./index.scss";

const Room: FC = () => {
  const { roomId } = useParams();

  // store
  const dispatch = useDispatch();

  // handlers

  const handleOnClickStart = useCallback(
    event => {
      event.preventDefault();
      dispatch(GameActions.emit.game.start());
    },
    [dispatch]
  );

  // return

  return (
    <div className="room">
      <div className="room__container">
        <h1 className="room__title">Id de la room: {roomId}</h1>
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
