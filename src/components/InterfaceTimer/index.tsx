import React, { FC, useEffect, useState, useMemo } from "react";

// store
import { selectors } from "../../redux";
import { useTypedSelector } from "../../redux/store";

// style
import "./index.scss";

const GameTimer: FC = () => {
  // selectors
  const areaWidh = useTypedSelector(selectors.area.selectWidth);
  const deviceId = useTypedSelector(selectors.room.selectDeviceId);
  const device = useTypedSelector(state =>
    selectors.area.selectDevice(state, { id: deviceId })
  );

  const isWin = false; // TODO: REPLACE BY ROUND SUCCESS EVENT
  const duration = 30000; // en ms // TODO: REPLACE BY DURATION OF INIT SCENE EVENT

  // state
  const [timeLeft, setTimeLeft] = useState(0);

  // handles

  useEffect(() => {
    if (timeLeft === duration) {
      console.log("END OF TIMER"); // TODO: EMIT EVENT WHEN TIMER IS OVER
      return;
    } else if (isWin) {
      // TODO: RECEIVE EVENT WHEN ROUND IS WIN
      console.log("STOP TIMER BEFORE IS COMPLETE");
      return;
    }
    // TODO: START TIMER WHEN ROUND + PLAYERS ARE READY

    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft + 100);
    }, 100);

    return () => clearInterval(intervalId);
  }, [isWin, timeLeft]);

  const progressTimer = useMemo(() => {
    return Math.floor((timeLeft * areaWidh) / duration);
  }, [timeLeft, areaWidh]);

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
