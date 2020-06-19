import React, { FC, useCallback, useRef } from "react";
import { useDispatch } from "react-redux";
import { enums } from "@colobobo/library";
import { actions } from "../../redux";

import "./styles.scss";

interface SocketsPlaygroundProps {}

const SocketsPlayground: FC<SocketsPlaygroundProps> = () => {
  const dispatch = useDispatch();
  const joinInput = useRef<HTMLInputElement>(null);

  const handleRoomCreate = useCallback(() => {
    dispatch(actions.webSocket.emit.room.create({ width: 200, height: 200 }));
  }, [dispatch]);

  const handleRoomJoin = useCallback(() => {
    dispatch(
      actions.webSocket.emit.room.join({
        id: joinInput.current!.value,
        width: 200,
        height: 200
      })
    );
  }, [dispatch, joinInput]);

  const handleRoundPlay = useCallback(() => {
    dispatch(
      actions.webSocket.emit.round.statusUpdate({
        status: enums.round.Status.play
      })
    );
  }, [dispatch]);

  const handleRoundPause = useCallback(() => {
    dispatch(
      actions.webSocket.emit.round.statusUpdate({
        status: enums.round.Status.pause
      })
    );
  }, [dispatch]);

  return (
    <div className="sockets-playground">
      <div className="sockets-playground__buttons">
        <button onClick={handleRoomCreate}>Create room</button>
        <div>
          <input type="text" ref={joinInput} />
          <button onClick={handleRoomJoin}>Join room</button>
        </div>
        <button onClick={handleRoundPlay}>Play round</button>
        <button onClick={handleRoundPause}>Pause round</button>
      </div>
    </div>
  );
};

export default SocketsPlayground;
