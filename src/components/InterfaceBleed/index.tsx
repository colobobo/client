import React, { FC, useMemo } from "react";

// store
import { selectors } from "../../redux";
import { useTypedSelector } from "../../redux/store";

// style
import "./index.scss";

export enum BleedPosition {
  top = "top",
  bottom = "bottom",
  left = "left",
  right = "right"
}

interface Props {
  position: BleedPosition;
  bgColor: string;
}

const InterfaceBleed: FC<Props> = ({ position, bgColor }) => {
  // selectors
  const areaMinHeight = useTypedSelector(selectors.area.selectMinHeight);
  const deviceHeight = document.documentElement.clientHeight;

  const bleedHeight = useMemo(() => {
    if (BleedPosition.bottom === position || BleedPosition.top === position) {
      return (deviceHeight - areaMinHeight) / 2 + 5;
    }
  }, [areaMinHeight, deviceHeight, position]);

  // return
  return (
    <div
      className={`interface-bleed interface-bleed--${position}`}
      style={{ height: `${bleedHeight}px`, backgroundColor: bgColor }}
    ></div>
  );
};

export default InterfaceBleed;
