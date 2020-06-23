import React, {
  FC,
  useEffect,
  useMemo,
  useRef,
  useState,
  useCallback
} from "react";
import gsap, { Linear } from "gsap";
import Classnames from "classnames";
import { enums } from "@colobobo/library";

// store
import { selectors } from "../../redux";
import { useTypedSelector } from "../../redux/store";

// components
import { Colors } from "../InterfaceButton";

// style
import "./index.scss";

interface Props {
  color: Colors;
}

const GameTimer: FC<Props> = ({ color }) => {
  // selectors
  const roundStatus = useTypedSelector(selectors.round.selectStatus);
  const endRoundTimeStamp = useTypedSelector(
    selectors.round.selectEndRoundTimeStamp
  );

  const duration = useMemo(() => endRoundTimeStamp - new Date().getTime(), [
    endRoundTimeStamp
  ]);
  const [remainingTime, setRemainingTime] = useState(duration);
  const $timerGlow = useRef<HTMLDivElement>(null);
  const $animatedTimerValue = useRef({ value: duration });
  const $timerTween = useRef<GSAPTimeline | null>(null);
  const $glowTween = useRef<GSAPTimeline | null>(null);
  const endCap = 5000;
  const handleAnimateTimerUpdate = useCallback(() => {
    const glowTweenProgress = gsap.utils.mapRange(
      endCap,
      0,
      0,
      1,
      gsap.utils.clamp(0, endCap, $animatedTimerValue.current.value)
    );
    $glowTween.current?.progress(glowTweenProgress);
    setRemainingTime($animatedTimerValue.current.value);
  }, []);

  useEffect(() => {
    $animatedTimerValue.current.value = duration;
    $timerTween.current = gsap.timeline();
    $timerTween.current.to($animatedTimerValue.current, {
      ease: Linear.easeNone,
      value: 0,
      duration: duration / 1000,
      onUpdate: handleAnimateTimerUpdate
    });

    return () => {
      $timerTween.current?.kill();
    };
  }, [duration, handleAnimateTimerUpdate]);

  useEffect(() => {
    if (roundStatus === enums.round.Status.pause) $timerTween.current?.pause();
  }, [roundStatus]);

  useEffect(() => {
    $glowTween.current = gsap.timeline({ paused: true });

    $glowTween.current.to($timerGlow.current, {
      scale: 1,
      opacity: 0.6,
      repeat: 10,
      yoyo: true
    });
  }, []);

  const minutes = useMemo(() => {
    return Math.floor(remainingTime / 60000);
  }, [remainingTime]);

  const seconds = useMemo(() => {
    return Math.ceil((remainingTime % 60000) / 1000);
  }, [remainingTime]);

  return (
    <div
      className={Classnames(`timer`, `timer--${color}`, {
        end: $animatedTimerValue.current.value < endCap
      })}
    >
      <div className="timer__container">
        <div ref={$timerGlow} className="timer__glow" />
        <div className="timer__content">
          {minutes.toString().padStart(1, "0")}:
          {seconds.toString().padStart(2, "0")}
        </div>
      </div>
    </div>
  );
};

export default GameTimer;
