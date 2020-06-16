import React, { FC, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";

// styles
import "./index.scss";

// store
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../../../redux";
import { useTypedSelector } from "../../../redux/store";

// components
import InterfaceScore from "../../../components/InterfaceScore";
import MotionShared, { Type } from "../../../components/MotionShared";
import MotionTransition, {
  Outcome
} from "../../../components/MotionTransition";

interface Props {
  isActive: boolean;
}

const Transition: FC<Props> = ({ isActive }) => {
  // return

  const dispatch = useDispatch();
  const [showScore, setShowScore] = useState(false);
  const history = useHistory();

  // selector
  const playerId = useSelector(selectors.room.selectPlayerId);
  const isSuccess = useTypedSelector(selectors.round.selectIsSuccess);
  const currentWorld = useTypedSelector(selectors.round.selectWorld);
  const isTransitionStarted = useSelector(selectors.transition.selectIsStarted);
  const gameIsEnded = useTypedSelector(selectors.game.selectIsEnded);

  const handleOnMotionTransitionEnded = useCallback((value: boolean) => {
    setShowScore(value);
  }, []);

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
      handleOnMotionTransitionEnded(false);
    }
  }, [dispatch, isActive, playerId, handleOnMotionTransitionEnded]);

  useEffect(() => {
    if (gameIsEnded) {
      setTimeout(() => history.push("/leaderboard"), 4000);
    }
  }, [gameIsEnded, history]);

  // return

  return (
    <div className={`transition ${isActive ? "active" : ""}`}>
      {/*  /!\ Find another way to toggle the display of each element /!\ */}
      {isSuccess === undefined && (
        <MotionShared
          type={Type.preamble}
          isTransitionStarted={isTransitionStarted}
        />
      )}
      {/*  /!\ Toggle outcome when time is over OR if member is down /!\ */}
      {isSuccess !== undefined && !showScore && (
        <MotionTransition
          outcome={Outcome.death}
          world={currentWorld}
          onMotionTransitionEnded={handleOnMotionTransitionEnded}
        />
      )}
      {showScore && <InterfaceScore isActive={isActive} />}
    </div>
  );
};

export default Transition;
