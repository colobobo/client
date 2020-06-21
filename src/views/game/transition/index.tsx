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
import { BleedColor } from "../../../components/InterfaceBleed";
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
  const [showEnding, setShowEnding] = useState(false);

  // selector
  const playerId = useSelector(selectors.room.selectPlayerId);
  const isCreator = useTypedSelector(selectors.room.selectIsCreator);
  const isRoundSuccess = useTypedSelector(
    selectors.transition.selectIsRoundSuccess
  );
  const isRoundFail = useTypedSelector(selectors.transition.selectIsRoundFail);
  const isTransitionStarted = useSelector(selectors.transition.selectIsStarted);
  const roundWorld = useTypedSelector(selectors.transition.selectRoundWorld);
  const roundFailCause = useTypedSelector(
    selectors.transition.selectRoundFailCause
  );
  const isGameOver = useTypedSelector(selectors.game.selectIsOver);
  const hasGamePreamble = useTypedSelector(selectors.game.selectHasPreamble);

  const handleOnGameOverClick = useCallback(() => {
    setShowScore(false);
    setShowEnding(true);
  }, []);

  const handleOnMotionTransitionEnded = useCallback((value: boolean) => {
    setShowScore(value);
  }, []);

  const handleTransitionEnded = useCallback(() => {
    if (isCreator) {
      dispatch(actions.webSocket.emit.transition.ended());
    }
    if (isGameOver) {
      setTimeout(() => history.push("/leaderboard"), 2000);
    }
  }, [isCreator, isGameOver, dispatch, history]);

  const handleVideoIsReady = useCallback(() => {
    dispatch(actions.webSocket.emit.transition.playerReady({ playerId }));
  }, [dispatch, playerId]);

  // effect

  useEffect(() => {
    if (isRoundSuccess && isTansitionActive) {
      setShowScore(true);
      dispatch(actions.webSocket.emit.transition.playerReady({ playerId }));
    }
  }, [dispatch, isRoundSuccess, isTansitionActive, playerId]);

  useEffect(() => {
    if (!isTansitionActive) {
      dispatch(actions.transition.stop());
      handleOnMotionTransitionEnded(false);
    }
  }, [dispatch, handleOnMotionTransitionEnded, isTansitionActive]);

  // return

  return (
    <div className={`transition ${isTansitionActive ? "active" : ""}`}>
      {isRoundFail && roundFailCause && isTansitionActive && (
        <MotionTransition
          failCause={roundFailCause!}
          world={roundWorld}
          onMotionTransitionEnded={handleOnMotionTransitionEnded}
        />
      )}
      <div
        className={Classnames("transition__score", {
          active: showScore
        })}
      >
        <InterfaceScore
          isScoreActive={showScore}
          isTansitionActive={isTansitionActive}
          isGameOver={isGameOver}
          onGameOverClick={handleOnGameOverClick}
        />
      </div>
      {!hasGamePreamble && (
        <MotionShared
          type={Type.preamble}
          extension={Extension.mp4}
          position={Position.center}
          isPlayed={isTransitionStarted}
          onEnded={handleTransitionEnded}
          onLoadedData={handleVideoIsReady}
          bleedColor={BleedColor.preamble}
          showSkip={true}
          onSkipClick={handleTransitionEnded}
        />
      )}
      {isGameOver && showEnding && (
        <MotionShared
          type={Type.ending}
          extension={Extension.mp4}
          position={Position.center}
          isPlayed={showEnding}
          onEnded={handleTransitionEnded}
          onLoadedData={handleVideoIsReady}
          bleedColor={BleedColor.preamble}
        />
      )}
    </div>
  );
};

export default Transition;
