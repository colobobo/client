import React, { FC } from "react";

// lib
import { enums } from "@colobobo/library";

// style
import "./index.scss";

interface Props {
  world: enums.World;
}

const GameBackground: FC<Props> = ({ world }) => {
  // return
  return (
    <div className="game-decoration__backgrounds">
      <div
        className="game-decoration__background"
        style={{
          backgroundImage: `url(${require(`../../assets/worlds/${world}/background-1.png`)})`
        }}
      ></div>
      <div
        className="game-decoration__background"
        style={{
          backgroundImage: `url(${require(`../../assets/worlds/${world}/background-2.png`)})`
        }}
      ></div>
    </div>
  );
};

export default GameBackground;
