import React, { FC } from "react";
import { selectors } from "../../redux";
import { useTypedSelector } from "../../redux/store";
import "./index.scss";

interface AreaProps {}

const Area: FC<AreaProps> = ({ children }) => {
  // selectors
  const deviceId = useTypedSelector(selectors.room.selectDeviceId);
  const device = useTypedSelector(state =>
    selectors.area.selectDevice(state, { id: deviceId })
  );
  const areaWidh = useTypedSelector(selectors.area.selectWidth);
  const areaHeight = useTypedSelector(selectors.area.selectHeight);

  // handlers

  // return
  return (
    <div
      className="area"
      style={{
        width: areaWidh,
        height: areaHeight,
        left: -device?.offsetX || 0
      }}
    >
      {children}
    </div>
  );
};

export default Area;
