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

export enum BleedColor {
  scoreBottom = "#64ce55",
  preambleLeft = "#6fd462",
  preambleRight = "#6fd462"
}

interface Props {
  position: BleedPosition;
  bgColor: string;
  elementWidth?: number;
}

const InterfaceBleed: FC<Props> = ({ position, bgColor, elementWidth }) => {
  // selectors

  const areaMinHeight = useTypedSelector(selectors.area.selectMinHeight);
  const areaWidth = useTypedSelector(selectors.area.selectWidth);
  const deviceHeight = document.documentElement.clientHeight;

  const bleedHeight = useMemo(() => {
    if (BleedPosition.bottom === position || BleedPosition.top === position) {
      return (deviceHeight - areaMinHeight) / 2 + 5;
    }
    return 0;
  }, [areaMinHeight, deviceHeight, position]);

  const bleedWidth = useMemo(() => {
    if (elementWidth) {
      return (areaWidth - elementWidth) / 2 + 5;
    }
    return 0;
  }, [areaWidth, elementWidth]);

  // return
  return (
    <div
      className={`interface-bleed interface-bleed--${position}`}
      style={{
        height: bleedHeight ? `${bleedHeight}px` : `100%`,
        width: bleedWidth ? `${bleedWidth}px` : `100%`,
        backgroundColor: bgColor
      }}
    ></div>
  );
};

export default InterfaceBleed;
