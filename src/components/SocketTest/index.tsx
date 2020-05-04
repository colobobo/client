import React, { FC, useCallback } from "react";
import { actions } from "../../redux";
import { useDispatch } from "react-redux";
import "./styles.css";

interface SocketTestProps {}

const SocketTest: FC<SocketTestProps> = () => {
  const dispatch = useDispatch();

  // handlers

  const handleClickEmitEvent = useCallback(() => {
    dispatch(actions.webSocket.emit.room.create({ width: 10, height: 10 }));
  }, [dispatch]);

  const handleClickSubsribeEvent = useCallback(() => {
    dispatch(actions.webSocket.subscribe.room.joinSuccess);
  }, [dispatch]);

  const handleClickUnsubsribeEvent = useCallback(() => {
    dispatch(actions.webSocket.unsubscribe.room.joinSuccess);
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
