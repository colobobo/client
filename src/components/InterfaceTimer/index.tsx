import React, { FC, useEffect, useState, useMemo, useCallback } from "react";

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
  const duration = useTypedSelector(selectors.round.selectDuration);

  // handles

  const [count, setCount] = useState(duration);

  const tick = useCallback(() => {
    setCount(count - 100);
  }, [count]);

  useEffect(() => {
    setCount(duration);
  }, [duration]);

  useEffect(() => {
    if (!isRoundStarted) {
      return;
    }

    let id = setInterval(tick, 100);
    return () => clearInterval(id);
  }, [count, isRoundStarted, tick]);

  const seconds = useMemo(() => {
    return Math.floor((count % 60000) / 1000);
  }, [count]);

  const minutes = useMemo(() => {
    return Math.floor(count / 60000);
  }, [count]);

  // return

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
