import React, { FC } from "react";

// style
import "./index.scss";

interface Props {
  position: string;
  world: string;
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
          backgroundImage: `url(${require(`../../assets/worlds/${world}/decorations/${position}.png`)})`
        }}
      ></div>
    </div>
  );
};

export default GameDecoration;
