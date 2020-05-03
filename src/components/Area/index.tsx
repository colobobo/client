import React, { FC } from "react";

import { selectors as RoomSelectors } from "../../redux/Room";
import { selectors as AreaSelectors } from "../../redux/Area";
import { useTypedSelector } from "../../redux/store";

import "./index.scss";

interface AreaProps {}

const Area: FC<AreaProps> = ({ children }) => {
  // selectors
  const deviceId = useTypedSelector(RoomSelectors.selectDeviceId);
  const device = useTypedSelector(state =>
    AreaSelectors.selectDevice(state, { id: deviceId })
  );
  const areaWidh = useTypedSelector(AreaSelectors.selectWidth);
  const areaHeight = useTypedSelector(AreaSelectors.selectHeight);

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
