import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import Classnames from "classnames";
import { gsap } from "gsap";

// store
import { useDispatch } from "react-redux";
import { actions } from "../../redux";

// components
import Area from "../Area";
import InterfaceBleed, {
  BleedPosition,
  BleedColor
} from "../../components/InterfaceBleed";

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

  // refs
  const $motionVideo = useRef<HTMLVideoElement>(null);
  const $scoreOverlay = useRef<HTMLDivElement>(null);

  const [videoIsLoaded, setVideoIsLoaded] = useState(false);

  // handlers

  const handleOnVideoEnded = useCallback(() => {
    gsap
      .to($scoreOverlay.current, {
        duration: 0.5,
        opacity: 1
      })
      .then(() => {
        dispatch(actions.webSocket.emit.transition.ended());
      });
  }, [dispatch]);

  const handleOnVideoLoaded = useCallback(() => {
    setVideoIsLoaded(true);
  }, []);

  // useEffect

  useEffect(() => {
    if (isPlayed && videoIsLoaded) {
      $motionVideo.current?.play();
    } else {
      $motionVideo.current?.pause();
    }
  }, [isPlayed, videoIsLoaded]);

  useEffect(() => {
    $motionVideo.current?.load();
    $motionVideo.current?.setAttribute("muted", "true");
  }, []);

  // return

  return (
    <div className="motion-shared">
      <div className="motion-shared__container">
        <Area height="min">
          {videoIsLoaded && (
            <InterfaceBleed
              position={BleedPosition.left}
              bgColor={BleedColor.preambleLeft}
              elementWidth={$motionVideo.current?.clientWidth}
            />
          )}
          <video
            ref={$motionVideo}
            className={Classnames("motion-shared__video", position)}
            playsInline
            muted
            autoPlay={false}
            preload="auto"
            onEnded={handleOnVideoEnded}
            onLoadedData={handleOnVideoLoaded}
          >
            <source
              src={require(`../../assets/motions/${type}.${extension}`)}
            />
          </video>
          {videoIsLoaded && (
            <InterfaceBleed
              position={BleedPosition.right}
              bgColor={BleedColor.preambleRight}
              elementWidth={$motionVideo.current?.clientWidth}
            />
          )}
        </Area>
        {isPlayed && (
          <div ref={$scoreOverlay} className="motion-shared__overlay"></div>
        )}
      </div>
    </div>
  );
};

export default MotionShared;
