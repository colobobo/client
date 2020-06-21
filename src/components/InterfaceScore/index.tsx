import React, {
  FC,
  useEffect,
  useState,
  useCallback,
  useRef,
  useMemo
} from "react";
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
import { animationId } from "../../config/animations";

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
  onGameOverClick: any;
}

const InterfaceScore: FC<Props> = ({
  isTansitionActive,
  isScoreActive,
  isGameOver,
  onGameOverClick
}) => {
  const isSuccess = useTypedSelector(selectors.transition.selectIsRoundSuccess);
  const isFail = useTypedSelector(selectors.transition.selectIsRoundFail);

  const areaMinHeight = useTypedSelector(selectors.area.selectMinHeight);
  const isCreator = useTypedSelector(selectors.room.selectIsCreator);
  const areaDevices = useTypedSelector(selectors.area.selectDevices);
  const playerId = useTypedSelector(selectors.room.selectPlayerId);
  const device = useTypedSelector(state =>
    selectors.area.selectDevice(state, { playerId })
  );

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const isLastDevice = useMemo(() => {
    return Object.keys(areaDevices).length - 1 === device.position;
  }, [areaDevices, device.position]);

  // refs

  const $scorePanel = useRef<HTMLDivElement>(null);
  const $scoreOverlay = useRef<HTMLDivElement>(null);
  const $scoreBottom = useRef<HTMLDivElement>(null);

  // state

  const [showMotion, setShowMotion] = useState(false);
  const [animationHeight, setAnimationHeight] = useState(0);
  const [playSpritesheet, setPlaySpritesheet] = useState(false);

  // handlers

  const handleOnPanelAnimationComplete = useCallback(() => {
    setPlaySpritesheet(true);
  }, []);

  const handleOnNextRoundClick = useCallback(() => {
    setShowMotion(true);
    gsap.to([$scorePanel.current, $scoreBottom.current], {
      duration: 0.3,
      opacity: 0
    });
  }, []);

  const handleSpritesheetAnimation = useCallback((spritesheet?: any) => {
    setAnimationHeight(spritesheet.getInfo("height"));
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
  }, [dispatch]);

  //use effects

  useEffect(() => {
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
  }, [areaMinHeight, isScoreActive]);

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

        <div ref={$scorePanel} className="score__panel">
          <InterfaceScorePanel
            isSuccess={isSuccess}
            isActive={isTansitionActive}
            isFail={isFail}
            isScoreActive={isScoreActive}
            playSpritesheet={playSpritesheet}
            onAnimationComplete={handleOnPanelAnimationComplete}
          />
        </div>

        <InterfaceScoreArea
          showMotion={showMotion}
          animationHeight={animationHeight}
          onMotionEnded={handleOnMotionEnded}
        />

        {isCreator && (
          <div
            ref={$scoreBottom}
            className="score__bottom"
            style={{
              height: areaMinHeight
            }}
          >
            <InterfaceButton
              onClick={isGameOver ? onGameOverClick : handleOnNextRoundClick}
              color={Colors.blue}
              text={
                isGameOver
                  ? t("score.buttons.next")
                  : t("score.buttons.nextLevel")
              }
              classNames="score__next"
            />
            <div className={Classnames("score__animations")}>
              <SpriteAnimation
                animationID={
                  isSuccess ? animationId.group_success : animationId.group_fail
                }
                className="score__animation"
                onInstance={handleSpritesheetAnimation}
                play={playSpritesheet}
              />
            </div>
          </div>
        )}

        {isLastDevice && !isGameOver && (
          <SpriteAnimation
            className="score__sign"
            animationID={animationId.sign}
            autoplay={true}
          />
        )}
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
