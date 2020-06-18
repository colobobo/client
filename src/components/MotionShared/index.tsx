import React, { FC, useCallback, useEffect, useRef } from "react";
import Classnames from "classnames";

// store
import { useDispatch } from "react-redux";
import { actions } from "../../redux";

// components
import Area from "../Area";

// style
import "./index.scss";

export enum Type {
  preamble = "preamble",
  transition = "transition",
  ending = "ending"
}

export enum Extension {
  mp4 = "mp4",
  webm = "webm"
}

export enum Position {
  center = "center",
  left = "left"
}

interface Props {
  type: Type;
  extension: Extension;
  position: Position;
  isPlayed: boolean;
}

const MotionShared: FC<Props> = ({ type, extension, position, isPlayed }) => {
  const dispatch = useDispatch();
  const motionVideo = useRef<HTMLVideoElement>(null);

  // handlers

  const handleOnVideoEnded = useCallback(() => {
    dispatch(actions.webSocket.emit.transition.ended());
  }, [dispatch]);

  // useEffect

  useEffect(() => {
    if (isPlayed) {
      motionVideo.current?.play();
    } else {
      motionVideo.current?.pause();
    }
  }, [isPlayed]);

  useEffect(() => {
    motionVideo.current?.load();
    motionVideo.current?.setAttribute("muted", "true");
  }, []);

  // return

  return (
    <div className="motion-shared">
      <div className="motion-shared__container">
        <Area height="min">
          <video
            ref={motionVideo}
            className={Classnames("motion-shared__video", position)}
            playsInline
            muted
            autoPlay={false}
            onEnded={handleOnVideoEnded}
          >
            <source
              src={require(`../../assets/motions/${type}.${extension}`)}
            />
          </video>
        </Area>
      </div>
    </div>
  );
};

export default MotionShared;
