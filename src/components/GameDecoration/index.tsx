import React, { FC } from "react";

// lib
import { enums } from "@colobobo/library";

// config
import * as config from "../../config";

// style
import "./index.scss";

export enum Position {
  top = "top",
  bottom = "bottom"
}

interface Props {
  position: Position;
  world: enums.World;
}

const GameDecoration: FC<Props> = ({ position, world }) => {
  // return
  return (
    <div
      className={`game-decoration__foreground game-decoration__foreground--${position}`}
    >
      <div
        className="source"
        style={{
          backgroundImage: `url(${config.worlds[world].decorations[position]})`
        }}
      />
    </div>
  );
};

export default GameDecoration;
