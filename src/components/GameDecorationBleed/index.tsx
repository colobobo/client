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
  const areaMinHeight = useTypedSelector(selectors.area.selectMinHeight);
  const areaMaxHeight = useTypedSelector(selectors.area.selectMaxHeight);

  const bleedHeight = useMemo(() => {
    return (areaMaxHeight - areaMinHeight) / 2;
  }, [areaMinHeight, areaMaxHeight]);

  // return
  return (
    <div
      className={`game-decoration__bleed game-decoration__bleed--${position}`}
      style={{ height: `${bleedHeight}px` }}
    >
      <div
        className="source"
        style={{
          backgroundImage: `url(${require("../../assets/worlds/jungle/decorations/" +
            position +
            ".png")})`
        }}
      ></div>
    </div>
  );
};

export default GameDecorationBleed;
