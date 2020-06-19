import React, { FC, useRef, useCallback } from "react";

// lib
import { enums } from "@colobobo/library";

// config
import * as config from "../../config";

// style
import "./index.scss";

interface Props {
  failCause: enums.round.FailCauses;
  world: enums.World;
  onMotionTransitionEnded: (value: boolean) => any;
}

const MotionTransition: FC<Props> = ({
  failCause,
  world,
  onMotionTransitionEnded
}) => {
  const motionVideo = useRef<HTMLVideoElement>(null);

  // handlers

  const handleOnVideoEnded = useCallback(() => {
    onMotionTransitionEnded(true);
  }, [onMotionTransitionEnded]);

  // return

  return (
    <div className="motion-transition">
      <div className="motion-transition__container">
        <video
          ref={motionVideo}
          className="motion-transition__video"
          playsInline
          muted
          autoPlay
          onEnded={handleOnVideoEnded}
        >
          <source src={config.worlds[world].motions[failCause]} />
        </video>
      </div>
    </div>
  );
};

export default MotionTransition;
