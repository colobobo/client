import React, { FC, useEffect, useState, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import Classnames from "classnames";
import { gsap } from "gsap";

// components
import InterfaceButton, { Colors } from "../../components/InterfaceButton";
import InterfaceScorePanel from "../../components/InterfaceScorePanel";
import InterfaceScoreArea from "../../components/InterfaceScoreArea";
import InterfaceScoreClosing from "../../components/InterfaceScoreClosing";
import InterfaceBleed, {
  BleedPosition,
  BleedColor
} from "../../components/InterfaceBleed";
import SpriteAnimation from "../../components/SpriteAnimation";

// config
import animations, { animationId } from "../../config/animations";

// store
import { useTypedSelector } from "../../redux/store";
import { useDispatch } from "react-redux";
import { actions, selectors } from "../../redux";

// styles
import "./index.scss";

interface Props {
  isTansitionActive: boolean;
  isScoreActive: boolean;
  isGameOver: boolean;
  onNextClick: any;
}

const InterfaceScore: FC<Props> = ({
  isTansitionActive,
  isScoreActive,
  isGameOver,
  onNextClick
}) => {
  const isSuccess = useTypedSelector(selectors.round.selectIsSuccess);
  const isFail = useTypedSelector(selectors.round.selectIsFail);
  const areaMinHeight = useTypedSelector(selectors.area.selectMinHeight);
  const isCreator = useTypedSelector(selectors.room.selectIsCreator);
  const isTransitionNext = useTypedSelector(selectors.transition.selectIsNext);

  const dispatch = useDispatch();
  const { t } = useTranslation();

  // refs

  const $scorePanel = useRef<HTMLDivElement>(null);
  const $scoreOverlay = useRef<HTMLDivElement>(null);
  const $scoreBottom = useRef<HTMLDivElement>(null);
  const $animationContainer = useRef<HTMLDivElement>(null);

  // state

  const [showMotion, setShowMotion] = useState(false);
  const [playSpritesheet, setPlaySpritesheet] = useState(false);
  const [animationWidth, setAnimationWidth] = useState(0);

  // handlers

  /*   useEffect(() => {
    if ($animationContainer.current) {
      const width =
        $animationContainer.current?.clientHeight *
        (animations[animationId.group_success].widthFrame /
          animations[animationId.group_success].heightFrame);
      setAnimationWidth(width);
    }
  }, []);

  const handleOnPanelAnimationComplete = useCallback(() => {
    setPlaySpritesheet(true);
  }, []);

  const handleOnMotionEnded = useCallback(() => {
    gsap
      .to($scoreOverlay.current, {
        duration: 1,
        opacity: 1
      })
      .then(() => {
        dispatch(actions.webSocket.emit.transition.ended());
      });
  }, [dispatch]); */

  //use effects

  /*   useEffect(() => {
    if (isTransitionNext && !isGameOver) {
      setShowMotion(true);
      gsap.to([$scorePanel.current, $scoreBottom.current], {
        duration: 0.3,
        opacity: 0
      });
    }
  }, [isGameOver, isTransitionNext]); */

  /*   useEffect(() => {
    if (isScoreActive) {
      gsap.from($scorePanel.current, {
        duration: 1,
        yPercent: `100`
      });
      gsap.to([$scorePanel.current, $scoreBottom.current], {
        opacity: 1
      });
    } else {
      setShowMotion(false);
      setPlaySpritesheet(false);
    }
  }, [areaMinHeight, isScoreActive]); */

  // return

  return (
    <div className="score">
      <div
        className="score__container"
        style={{
          height: areaMinHeight
        }}
      >
        {showMotion && isSuccess && <InterfaceScoreClosing />}

        {/*         <div ref={$scorePanel} className="score__panel">
          <InterfaceScorePanel
            isSuccess={isSuccess}
            isFail={isFail}
            isScoreActive={isScoreActive}
            playSpritesheet={playSpritesheet}
            onAnimationComplete={handleOnPanelAnimationComplete}
          />
        </div> */}
        {/* 
        <InterfaceScoreArea
          isGameOver={isGameOver}
          showMotion={showMotion}
          onMotionEnded={handleOnMotionEnded}
        /> */}

        <div
          ref={$scoreBottom}
          className="score__bottom"
          style={{
            height: areaMinHeight
          }}
        >
          {isCreator && (
            <InterfaceButton
              onClick={onNextClick}
              color={Colors.blue}
              text={
                isGameOver
                  ? t("score.buttons.next")
                  : t("score.buttons.nextLevel")
              }
              classNames="score__next"
            />
          )}

          {/*           <div
            ref={$animationContainer}
            className={Classnames("score__animations", {
              active: isCreator
            })}
            style={{
              width: `${animationWidth}px`
            }}
          >
            <SpriteAnimation
              animationID={
                isSuccess ? animationId.group_success : animationId.group_fail
              }
              className="score__animation"
              play={playSpritesheet}
            />
          </div> */}
        </div>
      </div>

      {isScoreActive && (
        <div ref={$scoreOverlay} className="score__overlay"></div>
      )}

      <InterfaceBleed
        position={BleedPosition.bottom}
        bgColor={BleedColor.score_bottom}
      />
    </div>
  );
};

export default InterfaceScore;
