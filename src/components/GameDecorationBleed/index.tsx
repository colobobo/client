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

  const $decoration = document.querySelector(
    `.game-decoration__foreground--${position}`
  ) as HTMLElement;

  const decorationHeight = useMemo(() => {
    const height = $decoration?.offsetHeight * 2;
    return height;
  }, [$decoration]);

  const colorBleedHeight = useMemo(() => {
    return bleedHeight - decorationHeight;
  }, [bleedHeight, decorationHeight]);

  // return
  return (
    <div
      className={`game-decoration__bleed game-decoration__bleed--${position}`}
      style={{ height: `${bleedHeight}px` }}
    >
      <div className="source__container">
        <div
          className="source"
          style={{
            height: `${decorationHeight}px`,
            backgroundImage: `url(${require("../../assets/worlds/mountain/decorations/bleeds/" +
              position +
              ".png")})`
          }}
        ></div>
        <div
          className="source__color-bleed"
          style={{ height: `${colorBleedHeight}px` }}
        ></div>
      </div>
    </div>
  );
};

export default GameDecorationBleed;
