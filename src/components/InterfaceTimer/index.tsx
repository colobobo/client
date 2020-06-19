import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import gsap, { Linear } from "gsap";

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
  const $animatedTimerValue = useRef({ value: duration });

  useEffect(() => {
    gsap.to($animatedTimerValue.current, {
      ease: Linear.easeNone,
      value: 0,
      duration: duration / 1000,
      onUpdate: () => setRemainingTime($animatedTimerValue.current.value)
    });
  }, [duration]);

  const minutes = useMemo(() => {
    return Math.floor(remainingTime / 60000);
  }, [remainingTime]);

  const seconds = useMemo(() => {
    return Math.floor((remainingTime % 60000) / 1000);
  }, [remainingTime]);

  return (
    <div className={`timer timer--${color}`}>
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
