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

  // selector
  const playerId = useSelector(selectors.room.selectPlayerId);
  const isSuccess = useTypedSelector(selectors.round.selectIsSuccess);
  const isFail = useTypedSelector(selectors.round.selectIsFail);
  const currentWorld = useTypedSelector(selectors.round.selectWorld);
  const failCause = useTypedSelector(selectors.round.selectFailCause);
  const isTransitionStarted = useSelector(selectors.transition.selectIsStarted);
  const gameIsEnded = useTypedSelector(selectors.game.selectIsEnded);
  const isCreator = useTypedSelector(selectors.room.selectIsCreator);

  const handleOnMotionTransitionEnded = useCallback((value: boolean) => {
    setShowScore(value);
  }, []);

  const handleTransitionEnded = useCallback(() => {
    if (isCreator) {
      dispatch(actions.webSocket.emit.transition.ended());
    }
    if (gameIsEnded) {
      setTimeout(() => history.push("/leaderboard"), 2000);
    }
  }, [dispatch, gameIsEnded, history, isCreator]);

  const handleVideoIsReady = useCallback(() => {
    dispatch(actions.webSocket.emit.transition.playerReady({ playerId }));
  }, [dispatch, playerId]);

  // effect

  useEffect(() => {
    if (isSuccess && isTansitionActive) {
      setShowScore(true);
      dispatch(actions.webSocket.emit.transition.playerReady({ playerId }));
    }
  }, [dispatch, isSuccess, isTansitionActive, playerId]);

  useEffect(() => {
    if (!isTansitionActive) {
      dispatch(actions.transition.stop());
      handleOnMotionTransitionEnded(false);
    }
  }, [dispatch, handleOnMotionTransitionEnded, isTansitionActive]);

  // return

  return (
    <div className={`transition ${isTansitionActive ? "active" : ""}`}>
      {/*  /!\ Find another way to toggle the display of each element /!\ */}
      {/*  /!\ Toggle outcome when time is over OR if member is down /!\ */}
      {isFail && failCause && isTansitionActive && (
        <MotionTransition
          failCause={failCause!}
          world={currentWorld}
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
        />
      </div>
      {isSuccess === undefined && (
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
      {gameIsEnded && (
        <MotionShared
          type={Type.ending}
          extension={Extension.mp4}
          position={Position.center}
          isPlayed={isTransitionStarted}
          onEnded={handleTransitionEnded}
          onLoadedData={handleVideoIsReady}
          bleedColor={BleedColor.ending}
        />
      )}
    </div>
  );
};

export default Transition;
