import React, { FC, useEffect } from "react";
import "./index.scss";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../../../redux";

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
      <p>TRANSITION</p>
      <p>started : {isTransitionStarted ? "true" : "false"}</p>
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
  );
};

export default Transition;
