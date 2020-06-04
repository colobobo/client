import React, { FC, useEffect, useState, useMemo } from "react";

// store
import { selectors } from "../../redux";
import { useTypedSelector } from "../../redux/store";

// style
import "./index.scss";

interface Props {
  isRoundStarted: boolean;
}

const GameTimer: FC<Props> = ({ isRoundStarted }) => {
  // selectors
  const areaWidh = useTypedSelector(selectors.area.selectWidth);
  const deviceId = useTypedSelector(selectors.room.selectDeviceId);
  const device = useTypedSelector(state =>
    selectors.area.selectDevice(state, { id: deviceId })
  );
  const duration = useTypedSelector(selectors.round.selectDuration);

  // state
  const [timeLeft, setTimeLeft] = useState(0);

  // handles

  useEffect(() => {
    if (!isRoundStarted || timeLeft === duration) {
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
          className="timer__progress"
          style={{ width: `${progressTimer}px` }}
        ></div>
      </div>
    </div>
  );
};

export default GameTimer;
