import React, { FC } from "react";

// style
import "./index.scss";

interface Props {
  position: string;
}

const GameDecoration: FC<Props> = ({ position }) => {
  // return
  return (
    <div
      className={`game-decoration__foreground game-decoration__foreground--${position}`}
    >
      <div
        className="source"
        style={{
          backgroundImage: `url(${require("../../assets/worlds/mountain/decorations/" +
            position +
            ".png")})`
        }}
      ></div>
    </div>
  );
};

export default GameDecoration;
