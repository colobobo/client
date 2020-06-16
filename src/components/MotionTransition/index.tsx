import React, { FC, useRef, useCallback } from "react";

// lib
import { enums } from "@colobobo/library";

// config
import * as config from "../../config";

// style
import "./index.scss";

export enum Outcome {
  death = "death",
  elapsedTime = "elapsedTime"
}

interface Props {
  outcome: Outcome;
  world: enums.World;
  onMotionTransitionEnded: (value: boolean) => any;
}

const MotionTransition: FC<Props> = ({
  outcome,
  world,
  onMotionTransitionEnded
}) => {
  const motionVideo = useRef<HTMLVideoElement>(null);

  // handlers

  const handleOnVideoEnded = useCallback(() => {
    setTimeout(() => onMotionTransitionEnded(true), 2000);
  }, [onMotionTransitionEnded]);

  // return

  return (
    <div className="motion-transition">
      <div className="motion-transition__container">
        <video
          ref={motionVideo}
          className="motion-transition__video"
          autoPlay
          muted
          onEnded={handleOnVideoEnded}
        >
          <source src={config.worlds[world].motions[outcome]} />
        </video>
      </div>
    </div>
  );
};

export default MotionTransition;
