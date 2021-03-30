import React, { FC } from "react";
import { selectors } from "../../redux";
import { useTypedSelector } from "../../redux/store";
import Classnames from "classnames";
import "./index.scss";

export enum AreaHeight {
  min = "min",
  max = "max"
}

interface AreaProps {
  classNames?: string;
  height?: AreaHeight;
}

const Area: FC<AreaProps> = ({
  children,
  classNames,
  height = AreaHeight.min
}) => {
  // selectors
  const playerId = useTypedSelector(selectors.room.selectPlayerId);
  const device = useTypedSelector(state =>
    selectors.area.selectDevice(state, { playerId })
  );
  const areaWidh = useTypedSelector(selectors.area.selectWidth);
  const areaMinHeight = useTypedSelector(selectors.area.selectMinHeight);
  const areaMaxHeight = useTypedSelector(selectors.area.selectMaxHeight);

  // return
  return (
    <div
      className={Classnames("area", `area--${height}`, classNames)}
      style={{
        width: areaWidh,
        height: height === AreaHeight.min ? areaMinHeight : areaMaxHeight,
        left: -device?.offsetX || 0
      }}
    >
      {children}
    </div>
  );
};

export default Area;
