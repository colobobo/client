import React, { FC, Ref, useCallback } from "react";
import { actions as WebSocketActions } from "../../redux/WebSocket";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

import "./styles.scss";

interface SocketsPlaygroundProps {}

const SocketsPlayground: FC<SocketsPlaygroundProps> = () => {
  const dispatch: AppDispatch = useDispatch();
  const joinInput: Ref<HTMLInputElement> = React.createRef();

  const handleRoomCreate = useCallback(() => {
    dispatch(WebSocketActions.emit.RoomCreate({ width: 200, height: 200 }));
  }, [dispatch]);

  const handleRoomJoin = useCallback(() => {
    dispatch(
      WebSocketActions.emit.RoomJoin({
        id: joinInput.current!.value,
        deviceInfo: { width: 200, height: 200 }
      })
    );
  }, [dispatch, joinInput]);

  return (
    <div className="sockets-playground">
      <div className="sockets-playground__buttons">
        <button onClick={handleRoomCreate}>Create room</button>
        <div>
          <input type="text" ref={joinInput} />
          <button onClick={handleRoomJoin}>Join room</button>
        </div>
      </div>
    </div>
  );
};

export default SocketsPlayground;
