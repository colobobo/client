import React, { FC, useCallback } from "react";
import { actions as WebSocketActions } from "../../redux/WebSocket";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import "./styles.css";

interface SocketTestProps {}

const SocketTest: FC<SocketTestProps> = () => {
  const dispatch: AppDispatch = useDispatch();

  // handlers

  const handleClickEmitEvent = useCallback(() => {
    dispatch(WebSocketActions.emit.room.create({ width: 10, height: 10 }));
  }, [dispatch]);

  const handleClickSubsribeEvent = useCallback(() => {
    dispatch(WebSocketActions.subscribe.room.joinSuccess);
  }, [dispatch]);

  const handleClickUnsubsribeEvent = useCallback(() => {
    dispatch(WebSocketActions.unsubscribe.room.joinSuccess);
  }, [dispatch]);

  // return
  return (
    <div className="socket-test">
      <div className="socket-test__buttons">
        <button onClick={handleClickEmitEvent}>emit event</button>
        <button onClick={handleClickSubsribeEvent}>subscribe event</button>
        <button onClick={handleClickUnsubsribeEvent}>unsubscribe event</button>
      </div>
    </div>
  );
};

export default SocketTest;
