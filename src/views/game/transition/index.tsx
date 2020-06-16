import React, { FC, useEffect, useState, useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

// styles
import "./index.scss";

// store
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../../../redux";
import { useTypedSelector } from "../../../redux/store";

// components
import InterfaceScore from "../../../components/InterfaceScore";
import InterfaceButton, { Colors } from "../../../components/InterfaceButton";
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
  const { t } = useTranslation();
  const history = useHistory();

  const [showScore, setShowScore] = useState(false);

  // selector
  const playerId = useSelector(selectors.room.selectPlayerId);
  const isSuccess = useTypedSelector(selectors.round.selectIsSuccess);
  const currentWorld = useTypedSelector(selectors.round.selectWorld);
  const isTransitionStarted = useSelector(selectors.transition.selectIsStarted);
  const isCreator = useTypedSelector(selectors.room.selectIsCreator);
  const isGameEnded = useTypedSelector(selectors.game.selectIsEnded);

  // handlers

  const handleOnMotionTransitionEnded = useCallback((value: boolean) => {
    setShowScore(value);
  }, []);

  const handleOnTransitionEnded = useCallback(() => {
    dispatch(actions.webSocket.emit.transition.ended());
  }, [dispatch]);

  // effect

  useEffect(() => {
    if (isActive) {
      dispatch(actions.webSocket.emit.transition.playerReady({ playerId }));
      setTimeout(() => handleOnTransitionEnded, 4000);
    } else {
      dispatch(actions.transition.stop());
      handleOnMotionTransitionEnded(false);
    }
  }, [
    dispatch,
    isActive,
    playerId,
    handleOnMotionTransitionEnded,
    handleOnTransitionEnded
  ]);

  useEffect(() => {
    if (isGameEnded) {
      setTimeout(() => history.push("/leaderboard"), 4000);
    }
  }, [isGameEnded, history]);

  // return

  return (
    <div className={`transition ${isActive ? "active" : ""}`}>
      {/*  /!\ Find another way to toggle the display of each element /!\ */}
      {isSuccess === undefined && (
        <div className="transition__motion-shared">
          <MotionShared
            type={Type.preamble}
            isTransitionStarted={isTransitionStarted}
          />
          {isCreator && (
            <InterfaceButton
              onClick={handleOnTransitionEnded}
              color={Colors.blue}
              text={t("transition.buttons.preambleSkip")}
              classNames="transition__skip button--small"
            />
          )}
        </div>
      )}
      {/*  /!\ Toggle outcome when time is over OR if member is down /!\ */}
      {isSuccess !== undefined && !showScore && (
        <MotionTransition
          outcome={Outcome.death}
          world={currentWorld}
          onMotionTransitionEnded={handleOnMotionTransitionEnded}
        />
      )}
      {showScore && (
        <InterfaceScore
          isActive={isActive}
          isCreator={isCreator}
          isSuccess={isSuccess}
        />
      )}
    </div>
  );
};

export default Transition;
