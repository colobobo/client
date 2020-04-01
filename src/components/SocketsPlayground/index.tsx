import React, { FC, Ref, useCallback } from "react";
import { actions as WebSocketActions } from "../../redux/WebSocket";
import { useDispatch } from "react-redux";

import "./styles.scss";

interface SocketsPlaygroundProps {}

const SocketsPlayground: FC<SocketsPlaygroundProps> = () => {
  const dispatch = useDispatch();
  const joinInput: Ref<HTMLInputElement> = React.createRef();

  const handleRoomCreate = useCallback(() => {
    dispatch(WebSocketActions.emit.room.create({ width: 200, height: 200 }));
  }, [dispatch]);

  const handleRoomJoin = useCallback(() => {
    dispatch(
      WebSocketActions.emit.room.join({
        id: joinInput.current!.value,
        width: 200,
        height: 200
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
