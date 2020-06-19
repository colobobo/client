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
  const endRoundTimeStamp = useTypedSelector(
    selectors.round.selectEndRoundTimeStamp
  );

  const duration = useMemo(() => endRoundTimeStamp - new Date().getTime(), [
    endRoundTimeStamp
  ]);
  const [remainingTime, setRemainingTime] = useState(duration);
  const $timer = useRef<HTMLDivElement>(null);
  const $animatedTimerValue = useRef({ value: duration });
  const endCap = 6000;

  const handleAnimateTimerUpdate = useCallback(() => {
    setRemainingTime($animatedTimerValue.current.value);
  }, []);

  useEffect(() => {
    gsap.to($animatedTimerValue.current, {
      ease: Linear.easeNone,
      value: 0,
      duration: duration / 1000,
      onUpdate: handleAnimateTimerUpdate
    });
  }, [duration, handleAnimateTimerUpdate]);

  const minutes = useMemo(() => {
    return Math.floor(remainingTime / 60000);
  }, [remainingTime]);

  const seconds = useMemo(() => {
    return Math.floor((remainingTime % 60000) / 1000);
  }, [remainingTime]);

  return (
    <div
      ref={$timer}
      className={Classnames(`timer`, `timer--${color}`, {
        end: $animatedTimerValue.current.value < endCap
      })}
    >
      <div className="timer__container">
        <div className="timer__content">
          {minutes.toString().padStart(1, "0")}:
          {seconds.toString().padStart(2, "0")}
        </div>
      </div>
    </div>
  );
};

export default GameTimer;
