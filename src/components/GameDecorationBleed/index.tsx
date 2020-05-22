import React, { FC, useMemo } from "react";

// store
import { selectors } from "../../redux";
import { useTypedSelector } from "../../redux/store";

// style
import "./index.scss";

interface Props {
  position: string;
}

const GameDecorationBleed: FC<Props> = ({ position }) => {
  // selectors
  const deviceId = useTypedSelector(selectors.room.selectDeviceId);
  const device = useTypedSelector(state =>
    selectors.area.selectDevice(state, { id: deviceId })
  );
  const areaHeight = useTypedSelector(selectors.area.selectHeight);

  const bleedHeight = useMemo(() => {
    return (device.height - areaHeight) / 2;
  }, [areaHeight, device.height]);

  // return
  return (
    <div
      className={`game-decoration__bleed game-decoration__bleed--${position}`}
      style={{ height: `${bleedHeight}px` }}
    ></div>
  );
};

export default GameDecorationBleed;
