import React, { FC } from "react";
import Area from "../../Area";

import "./index.scss";

import GameCanvas from "../../GameCanvas";

const Game: FC = () => {
  // return

  return (
    <div className="game">
      <Area>
        <GameCanvas />
      </Area>
    </div>
  );
};

export default Game;
