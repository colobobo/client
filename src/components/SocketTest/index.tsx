import React, { FC, useCallback } from "react";
import {
  wsEmitMyActionExample,
  wsSubscribeMyActionExample,
  wsUnsubscribeMyActionExample,
  wsEmitAction,
  wsSubscribeAction,
  wsUnsubscribeAction
} from "../../redux/WebSocket";
import { useDispatch } from "react-redux";
import "./styles.css";

interface SocketTestProps {}

const SocketTest: FC<SocketTestProps> = () => {
  const dispatch = useDispatch();

  // handlers

  const handleClickEmitEvent = useCallback(() => {
    // exemple 1
    dispatch(wsEmitMyActionExample("data test"));
    // exemple 2
    dispatch(wsEmitAction("socketEventName2", "data test"));
  }, [dispatch]);

  const handleClickSubsribeEvent = useCallback(() => {
    // example 1
    dispatch(wsSubscribeMyActionExample);
    // example 2
    dispatch(wsSubscribeAction("socketEventName2", "reduxAction2"));
  }, [dispatch]);

  const handleClickUnsubsribeEvent = useCallback(() => {
    // example 1
    dispatch(wsUnsubscribeMyActionExample);
    // example 2
    dispatch(wsUnsubscribeAction("socketEventName2"));
  }, [dispatch]);

  // return
  return (
    <div className="socket-test">
      <div className="socket-test__buttons">
        <button onClick={handleClickEmitEvent}>emit event</button>
        <button onClick={handleClickSubsribeEvent}>subscribe event</button>
        <button onClick={handleClickUnsubsribeEvent}>subscribe event</button>
      </div>
    </div>
  );
};

export default SocketTest;
