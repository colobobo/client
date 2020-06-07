import React, { FC } from "react";

// lib
import { enums } from "@colobobo/library";

// config
import * as config from "../../config";

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
          backgroundImage: `url(${config.worlds[world].backgrounds.first})`
        }}
      />
      <div
        className="game-decoration__background"
        style={{
          backgroundImage: `url(${config.worlds[world].backgrounds.second})`
        }}
      />
    </div>
  );
};

export default GameBackground;
