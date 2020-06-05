import React, { FC, useEffect } from "react";

// styles
import "./index.scss";

// store
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../../../redux";

// components
import InterfaceScore from "../../../components/InterfaceScore";

const Transition: FC = () => {
  // return

  const dispatch = useDispatch();

  // selector
  const deviceId = useSelector(selectors.room.selectDeviceId);
  const isTransitionStarted = useSelector(selectors.transition.selectIsStarted);

  // effect

  useEffect(() => {
    return () => {
      dispatch(actions.transition.stop());
    };
  }, [dispatch]);

  // return

  return (
    <div className="transition">
      <InterfaceScore />
      <div className="debug">
        <p>TRANSITION</p>
        <span>started : {isTransitionStarted ? "true" : "false"}</span>
        <button
          onClick={() => {
            dispatch(
              actions.webSocket.emit.transition.playerReady({
                playerId: deviceId
              })
            );
          }}
        >
          Emit transition player ready
        </button>
        <button
          onClick={() => {
            dispatch(actions.webSocket.emit.transition.ended());
          }}
        >
          Emit transition ended
        </button>
      </div>
    </div>
  );
};

export default Transition;
