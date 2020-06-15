import React, { FC, useEffect } from "react";
import { useHistory } from "react-router-dom";

// styles
import "./index.scss";

// store
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../../../redux";
import { useTypedSelector } from "../../../redux/store";

// components
import InterfaceScore from "../../../components/InterfaceScore";

interface Props {
  isActive: boolean;
}

const Transition: FC<Props> = ({ isActive }) => {
  // return

  const dispatch = useDispatch();
  const history = useHistory();

  // selector
  const playerId = useSelector(selectors.room.selectPlayerId);
  const isSuccess = useTypedSelector(selectors.round.selectIsSuccess);
  const gameIsEnded = useTypedSelector(selectors.game.selectIsEnded);
  // const isTransitionStarted = useSelector(selectors.transition.selectIsStarted);

  // effect

  useEffect(() => {
    if (isActive) {
      dispatch(actions.webSocket.emit.transition.playerReady({ playerId }));

      setTimeout(
        () => dispatch(actions.webSocket.emit.transition.ended()),
        4000
      );
    } else {
      dispatch(actions.transition.stop());
    }
  }, [dispatch, isActive, playerId]);

  useEffect(() => {
    if (gameIsEnded) {
      setTimeout(() => history.push("/leaderboard"), 4000);
    }
  }, [gameIsEnded, history]);

  // return

  return (
    <div className={`transition ${isActive ? "active" : ""}`}>
      {isSuccess !== undefined && <InterfaceScore isActive={isActive} />}
      {/*<div className="debug">
        <span>started : {isTransitionStarted ? "true" : "false"}</span>
        <button
          onClick={() => {
            dispatch(
              actions.webSocket.emit.transition.playerReady({
                playerId
              })
            );
          }}
        >
          Emit transition player ready
        </button>
      </div>*/}
    </div>
  );
};

export default Transition;
