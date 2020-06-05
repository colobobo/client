import React, { FC, useMemo, useEffect, useState } from "react";

// store
import { selectors } from "../../redux";
import { useTypedSelector } from "../../redux/store";

// lib
import { enums } from "@colobobo/library";

// style
import "./index.scss";

interface Props {
  position: string;
  world: enums.World;
  bgBleedColor: string;
}

const GameDecorationBleed: FC<Props> = ({ position, world, bgBleedColor }) => {
  const [decorationHeight, setDecorationHeight] = useState<number>(0);

  // selectors
  const areaMinHeight = useTypedSelector(selectors.area.selectMinHeight);
  const areaMaxHeight = useTypedSelector(selectors.area.selectMaxHeight);

  useEffect(() => {
    const $decoration = document.querySelector(
      `.game-decoration__foreground--${position}`
    ) as HTMLElement;
    const height = $decoration?.offsetHeight * 2;
    setDecorationHeight(height);
  }, [position]);

  const bleedHeight = useMemo(() => {
    return (areaMaxHeight - areaMinHeight) / 2;
  }, [areaMinHeight, areaMaxHeight]);

  const colorBleedHeight = useMemo(() => {
    return decorationHeight > 0 ? bleedHeight - decorationHeight : 0;
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
            backgroundImage: `url(${require(`../../assets/worlds/${world}/decorations/bleeds/${position}.png`)})`
          }}
        ></div>
        <div
          className="source__color-bleed"
          style={{
            height: `${colorBleedHeight}px`,
            backgroundColor: bgBleedColor
          }}
        ></div>
      </div>
    </div>
  );
};

export default GameDecorationBleed;
