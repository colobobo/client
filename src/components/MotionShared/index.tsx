import React, { FC, useCallback, useEffect, useRef } from "react";

// store
import { useDispatch } from "react-redux";
import { actions } from "../../redux";

// components
import Area from "../Area";

// style
import "./index.scss";

export enum Type {
  preamble = "preamble",
  ending = "ending"
}

interface Props {
  type: Type;
  isTransitionStarted: boolean;
}

const MotionShared: FC<Props> = ({ type, isTransitionStarted }) => {
  const dispatch = useDispatch();
  const motionVideo = useRef<HTMLVideoElement>(null);

  // handlers

  const handleOnVideoEnded = useCallback(() => {
    dispatch(actions.webSocket.emit.transition.ended());
  }, [dispatch]);

  // useEffect

  useEffect(() => {
    if (isTransitionStarted) {
      motionVideo.current?.play();
    }
  }, [isTransitionStarted]);

  // return

  return (
    <div className="motion-shared">
      <div className="motion-shared__container">
        <Area height="min">
          <video
            ref={motionVideo}
            className="motion-shared__video"
            muted
            onEnded={handleOnVideoEnded}
          >
            <source src={require(`../../assets/motions/${type}.mp4`)} />
          </video>
        </Area>
      </div>
    </div>
  );
};

export default MotionShared;
