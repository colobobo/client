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
    ></div>
  );
};

export default GameDecoration;
