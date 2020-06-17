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
import Area from "../../components/Area";
import SpriteAnimation from "../../components/SpriteAnimation";

// config
import { animationId } from "../../config/animations";

// store
import { useTypedSelector } from "../../redux/store";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../../redux";

// styles
import "./index.scss";

interface Props {
  isTansitionActive: boolean;
  isScoreActive: boolean;
}

const InterfaceScore: FC<Props> = ({ isTansitionActive, isScoreActive }) => {
  const isSuccess = useTypedSelector(selectors.round.selectIsSuccess);
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
    if (Object.keys(areaDevices).length - 1 === device.position) {
      return true;
    }
    return false;
  }, [areaDevices, device.position]);

  // refs

  const $motionVideo = useRef<HTMLVideoElement>(null);
  const $scorePanel = useRef<HTMLDivElement>(null);

  // state

  const [showMotion, setShowMotion] = useState(false);
  const [animationHeight, setAnimationHeight] = useState(0);
  const [playSpritesheet, setPlaySpritesheet] = useState(false);

  // handlers

  const handlePanelAnimationComplete = useCallback(() => {
    setPlaySpritesheet(true);
  }, []);

  const handleOnNextRoundClick = useCallback(() => {
    setShowMotion(true);
    dispatch(actions.webSocket.emit.transition.ended());
  }, [dispatch]);

  const handleSpritesheetAnimation = useCallback((spritesheet?: any) => {
    setAnimationHeight(spritesheet.getInfo("height"));
  }, []);

  //use effects

  useEffect(() => {
    $motionVideo.current?.load();
    $motionVideo.current?.setAttribute("muted", "true");
  }, []);

  useEffect(() => {
    if (showMotion) {
      $motionVideo.current?.play();
    }
  }, [showMotion]);

  useEffect(() => {
    if (isScoreActive) {
      gsap.from($scorePanel.current, {
        duration: 1,
        bottom: `-${areaMinHeight}px`
      });
    } else {
      setShowMotion(false);
      setPlaySpritesheet(false);
    }
  }, [areaMinHeight, handlePanelAnimationComplete, isScoreActive]);

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
            isActive={isTansitionActive}
            isScoreActive={isScoreActive}
            playSpritesheet={playSpritesheet}
            onAnimationComplete={handlePanelAnimationComplete}
          />
        </div>

        <Area height="min">
          <div className="score__bush"></div>
          <div
            style={{
              height: `${animationHeight}px`
            }}
            className={Classnames("score__motion", {
              active: showMotion
            })}
          >
            <video ref={$motionVideo} playsInline muted autoPlay={false}>
              <source src={require(`../../assets/motions/transition.webm`)} />
            </video>
          </div>
        </Area>

        {isCreator && (
          <div
            className="score__bottom"
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
            <div
              className={Classnames("score__animations", {
                active: !showMotion
              })}
            >
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

        {isLastDevice && (
          <SpriteAnimation
            className="score__sign"
            animationID={animationId.sign}
            autoplay={true}
          />
        )}
      </div>
    </div>
  );
};

export default InterfaceScore;
