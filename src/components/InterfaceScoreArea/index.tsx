import React, { FC, useEffect, useRef, useMemo } from "react";
import Classnames from "classnames";

// components
import Area from "../../components/Area";
import SpriteAnimation from "../../components/SpriteAnimation";

// config
import { animationId } from "../../config/animations";

// store
import { useTypedSelector } from "../../redux/store";
import { selectors } from "../../redux";

// style
import "./index.scss";

interface Props {
  showMotion: boolean;
  onMotionEnded: any;
  isGameOver: boolean;
  animationHeight: number;
}

const InterfaceScoreArea: FC<Props> = ({
  showMotion,
  onMotionEnded,
  isGameOver,
  animationHeight
}) => {
  const areaDevices = useTypedSelector(selectors.area.selectDevices);
  const playerId = useTypedSelector(selectors.room.selectPlayerId);
  const device = useTypedSelector(state =>
    selectors.area.selectDevice(state, { playerId })
  );

  // refs

  const $motionVideo = useRef<HTMLVideoElement>(null);

  // handlers

  const isLastDevice = useMemo(() => {
    return Object.keys(areaDevices).length - 1 === device.position;
  }, [areaDevices, device.position]);

  // use effect

  useEffect(() => {
    $motionVideo.current?.load();
    $motionVideo.current?.setAttribute("muted", "true");
  }, []);

  useEffect(() => {
    if (showMotion) {
      $motionVideo.current?.play();
    }
  }, [showMotion]);
  // return

  return (
    <div className="score-area">
      <Area height="min">
        <div className="score__bush"></div>
        {isLastDevice && !isGameOver && (
          <SpriteAnimation
            className="score__sign"
            animationID={animationId.sign}
            autoplay={true}
          />
        )}
        <div
          style={{
            height: `${animationHeight}px`
          }}
          className={Classnames("score__motion", {
            active: showMotion
          })}
        >
          <video
            ref={$motionVideo}
            playsInline
            muted
            autoPlay={false}
            onEnded={onMotionEnded}
          >
            <source src={require(`../../assets/motions/transition.webm`)} />
          </video>
        </div>
      </Area>
    </div>
  );
};

export default InterfaceScoreArea;
