import React, { FC, useEffect, useState, useMemo } from "react";

// store
import { selectors } from "../../redux";
import { useTypedSelector } from "../../redux/store";

// components
import { Colors } from "../InterfaceButton";

// style
import "./index.scss";

interface Props {
  isRoundStarted: boolean;
  color: Colors;
}

const GameTimer: FC<Props> = ({ isRoundStarted, color }) => {
  // selectors
  const areaWidh = useTypedSelector(selectors.area.selectWidth);
  const playerId = useTypedSelector(selectors.room.selectPlayerId);
  const device = useTypedSelector(state =>
    selectors.area.selectDevice(state, { playerId })
  );
  const duration = useTypedSelector(selectors.round.selectDuration);

  // state
  const [timeLeft, setTimeLeft] = useState(0);

  // handles

  useEffect(() => {
    if (timeLeft === duration) {
      return;
    }

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft + 100);
    }, 100);

    return () => clearInterval(intervalId);
  }, [duration, isRoundStarted, timeLeft]);

  const progressTimer = useMemo(() => {
    return Math.floor((timeLeft * areaWidh) / duration);
  }, [timeLeft, areaWidh, duration]);

  // return

  return (
    <div className="timer">
      <div
        className="timer__container"
        style={{ width: areaWidh, left: -device?.offsetX || 0 }}
      >
        <div
          className={`timer__progress timer__progress--${color}`}
          style={{ width: `${progressTimer}px` }}
        ></div>
      </div>
    </div>
  );
};

export default GameTimer;
