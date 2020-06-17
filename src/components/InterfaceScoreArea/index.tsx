import React, { FC, useEffect, useRef } from "react";
import Classnames from "classnames";

// components
import Area from "../../components/Area";

// style
import "./index.scss";

interface Props {
  animationHeight: number;
  showMotion: boolean;
  onMotionEnded: any;
}

const InterfaceScoreArea: FC<Props> = ({
  animationHeight,
  showMotion,
  onMotionEnded
}) => {
  // refs
  const $motionVideo = useRef<HTMLVideoElement>(null);

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
  );
};

export default InterfaceScoreArea;
