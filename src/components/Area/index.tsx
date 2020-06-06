import React, { FC } from "react";
import { selectors } from "../../redux";
import { useTypedSelector } from "../../redux/store";
import "./index.scss";

interface AreaProps {
  height: string;
}

const Area: FC<AreaProps> = ({ children, height }) => {
  // selectors
  const playerId = useTypedSelector(selectors.room.selectPlayerId);
  const device = useTypedSelector(state =>
    selectors.area.selectDevice(state, { playerId })
  );
  const areaWidh = useTypedSelector(selectors.area.selectWidth);
  const areaMinHeight = useTypedSelector(selectors.area.selectMinHeight);
  const areaMaxHeight = useTypedSelector(selectors.area.selectMaxHeight);

  // handlers

  // return
  return (
    <div
      className={`area area--${height}`}
      style={{
        width: areaWidh,
        height: height === "min" ? areaMinHeight : areaMaxHeight,
        left: -device?.offsetX || 0
      }}
    >
      {children}
    </div>
  );
};

export default Area;
