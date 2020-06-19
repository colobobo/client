import React, { FC, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import Classnames from "classnames";

// styles
import "./index.scss";

// store
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../../../redux";
import { useTypedSelector } from "../../../redux/store";

// components
import InterfaceScore from "../../../components/InterfaceScore";
import MotionShared, {
  Type,
  Extension,
  Position
} from "../../../components/MotionShared";
import MotionTransition from "../../../components/MotionTransition";

interface Props {
  isTansitionActive: boolean;
}

const Transition: FC<Props> = ({ isTansitionActive }) => {
  // return

  const dispatch = useDispatch();
  const history = useHistory();

  const [showScore, setShowScore] = useState(false);

  // selector
  const playerId = useSelector(selectors.room.selectPlayerId);
  const isSuccess = useTypedSelector(selectors.round.selectIsSuccess);
  const isFail = useTypedSelector(selectors.round.selectIsFail);
  const currentWorld = useTypedSelector(selectors.round.selectWorld);
  const failCause = useTypedSelector(selectors.round.selectFailCause);
  const isTransitionStarted = useSelector(selectors.transition.selectIsStarted);
  const gameIsEnded = useTypedSelector(selectors.game.selectIsEnded);

  const handleOnMotionTransitionEnded = useCallback((value: boolean) => {
    setShowScore(value);
  }, []);

  // effect

  useEffect(() => {
    if (isSuccess) {
      setShowScore(true);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isTansitionActive) {
      dispatch(actions.webSocket.emit.transition.playerReady({ playerId }));
    } else {
      dispatch(actions.transition.stop());
      handleOnMotionTransitionEnded(false);
    }
  }, [dispatch, playerId, handleOnMotionTransitionEnded, isTansitionActive]);

  useEffect(() => {
    if (gameIsEnded) {
      setTimeout(() => history.push("/leaderboard"), 4000);
    }
  }, [gameIsEnded, history]);

  // return

  return (
    <div className={`transition ${isTansitionActive ? "active" : ""}`}>
      {/*  /!\ Find another way to toggle the display of each element /!\ */}
      {/*  /!\ Toggle outcome when time is over OR if member is down /!\ */}
      {isFail && failCause && (
        <MotionTransition
          failCause={failCause!}
          world={currentWorld}
          onMotionTransitionEnded={handleOnMotionTransitionEnded}
        />
      )}
      <div
        className={Classnames("transition__score", {
          active: isTansitionActive && showScore
        })}
      >
        <InterfaceScore
          isScoreActive={showScore}
          isTansitionActive={isTansitionActive}
        />
      </div>
      {isSuccess === undefined && (
        <MotionShared
          type={Type.preamble}
          extension={Extension.mp4}
          position={Position.center}
          isPlayed={isTransitionStarted}
        />
      )}
    </div>
  );
};

export default Transition;
