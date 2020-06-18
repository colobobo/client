import React, { FC, useMemo } from "react";

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
  const duration = endRoundTimeStamp - new Date().getTime();

  // handles
  const minutes = useMemo(() => {
    return Math.floor(duration / 60000);
  }, [duration]);

  const seconds = useMemo(() => {
    return Math.floor((duration % 60000) / 1000);
  }, [duration]);

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
