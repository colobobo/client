import React, { FC, useEffect, useRef } from "react";
import { gsap, Linear } from "gsap";

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

  // ref

  const $progressBar = useRef<HTMLDivElement>(null);

  // handles

  useEffect(() => {
    if (!isRoundStarted) {
      return;
    }

    gsap.fromTo(
      $progressBar.current!,
      { scale: 1 },
      {
        duration: duration / 1000,
        scaleX: 0,
        ease: Linear.easeNone
      }
    );
  }, [duration, isRoundStarted]);

  // return

  return (
    <div className="timer">
      <div
        className="timer__container"
        style={{ width: areaWidh, left: -device?.offsetX || 0 }}
      >
        <div
          ref={$progressBar}
          className={`timer__progress timer__progress--${color}`}
        />
      </div>
    </div>
  );
};

export default GameTimer;
