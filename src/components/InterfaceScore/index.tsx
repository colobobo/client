import React, { FC, useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Classnames from "classnames";

// components
import InterfaceButton, { Colors } from "../../components/InterfaceButton";
import InterfaceScorePanel from "../../components/InterfaceScorePanel";
import Area from "../../components/Area";
import SpriteAnimation from "../../components/SpriteAnimation";
import MotionShared, {
  Type,
  Extension,
  Position
} from "../../components/MotionShared";

// config
import { animationId } from "../../config/animations";

// store
import { useTypedSelector } from "../../redux/store";
import { useDispatch } from "react-redux";
import { actions, selectors } from "../../redux";

// styles
import "./index.scss";

interface Props {
  isActive: boolean;
  isTransitionStarted: boolean;
}

const InterfaceScore: FC<Props> = ({ isActive, isTransitionStarted }) => {
  const roundId = useTypedSelector(selectors.round.selectId);
  const lives = useTypedSelector(selectors.round.selectLives);
  const totalLives = useTypedSelector(selectors.game.selectTotalLives);
  const score = useTypedSelector(selectors.round.selectScore);
  const isSuccess = useTypedSelector(selectors.round.selectIsSuccess);
  const areaMinHeight = useTypedSelector(selectors.area.selectMinHeight);
  const isCreator = useTypedSelector(selectors.room.selectIsCreator);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [showMotion, setShowMotion] = useState(false);

  // handlers

  const handleOnNextRoundClick = useCallback(() => {
    setShowMotion(true);
    // dispatch(actions.webSocket.emit.transition.ended());
  }, []);

  useEffect(() => {
    if (roundId === 1) {
      dispatch(
        actions.game.setTotalLives({ lives: isSuccess ? lives : lives + 1 })
      );
    }
  }, [dispatch, isSuccess, lives, roundId]);

  // return

  return (
    <div className="score">
      <div className="score__container">
        <div
          className="score__background"
          style={{
            height: areaMinHeight
          }}
        ></div>
        <div
          className="score__area"
          style={{
            height: areaMinHeight
          }}
        >
          <div className="score__panel">
            <InterfaceScorePanel
              score={score}
              lives={lives}
              isSuccess={isSuccess}
              isActive={isActive}
              totalLives={totalLives}
            />
          </div>
        </div>
        <Area height="min">
          <div className="score__bush"></div>
          {/* <div
            className={Classnames("score__motion", {
              active: showMotion
            })}
          >
            <MotionShared
              type={Type.transition}
              extension={Extension.webm}
              position={Position.left}
              isPlayed={showMotion}
            />
          </div> */}
        </Area>
        {isCreator && (
          <div
            className="score__area"
            style={{
              height: areaMinHeight
            }}
          >
            <InterfaceButton
              onClick={handleOnNextRoundClick}
              color={Colors.blue}
              text={t("score.buttons.next")}
              classNames="score__next"
            />
            <div className="score__animations">
              <SpriteAnimation
                animationID={animationId.group_success}
                className="score__animation"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterfaceScore;
