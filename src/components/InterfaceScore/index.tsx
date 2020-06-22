import React, { FC, useEffect, useState, useCallback, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";

// components
import InterfaceButton, { Colors } from "../../components/InterfaceButton";
import InterfaceScorePanel from "../../components/InterfaceScorePanel";
import InterfaceScoreArea from "../../components/InterfaceScoreArea";
import InterfaceBleed, {
  BleedPosition,
  BleedColor
} from "../../components/InterfaceBleed";
import SpriteAnimation from "../../components/SpriteAnimation";

// config
import { animationId } from "../../config/animations";

// store
import { useTypedSelector } from "../../redux/store";
import { selectors } from "../../redux";

// styles
import "./index.scss";

interface Props {
  isGameOver: boolean;
  onNextClick: any;
}

const InterfaceScore: FC<Props> = ({ isGameOver, onNextClick }) => {
  const isSuccess = useTypedSelector(selectors.transition.selectIsRoundSuccess);
  const isFail = useTypedSelector(selectors.transition.selectIsRoundFail);
  const areaMinHeight = useTypedSelector(selectors.area.selectMinHeight);
  const isCreator = useTypedSelector(selectors.room.selectIsCreator);

  const { t } = useTranslation();

  // refs

  const $scorePanel = useRef<HTMLDivElement>(null);
  const $scoreBottom = useRef<HTMLDivElement>(null);

  // state

  const [playSpritesheet, setPlaySpritesheet] = useState(false);
  const [playPanelAnimation, setPlayPanelAnimation] = useState(false);

  // handlers
  const handleOnPanelAnimationComplete = useCallback(() => {
    setPlaySpritesheet(true);
  }, []);

  //use effects

  useEffect(() => {
    gsap.from($scorePanel.current, {
      duration: 1,
      yPercent: `100`
    });
    gsap
      .to([$scorePanel.current, $scoreBottom.current], {
        opacity: 1
      })
      .then(() => {
        setPlayPanelAnimation(true);
      });
  }, [areaMinHeight]);

  // return

  return (
    <div className="score">
      <div
        className="score__container"
        style={{
          height: areaMinHeight
        }}
      >
        <div ref={$scorePanel} className="score__panel">
          <InterfaceScorePanel
            isSuccess={isSuccess}
            isFail={isFail}
            playSpritesheet={playSpritesheet}
            playPanelAnimation={playPanelAnimation}
            onAnimationComplete={handleOnPanelAnimationComplete}
          />
        </div>

        <InterfaceScoreArea isGameOver={isGameOver} />

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

          {isCreator && (
            <SpriteAnimation
              animationID={
                isSuccess ? animationId.group_success : animationId.group_fail
              }
              className="score__animation"
              play={playSpritesheet}
            />
          )}
        </div>
      </div>
      <InterfaceBleed
        position={BleedPosition.bottom}
        bgColor={BleedColor.score_bottom}
      />
    </div>
  );
};

export default InterfaceScore;
