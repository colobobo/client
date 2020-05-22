import React, { FC } from "react";
import Area from "../../components/Area";
import GameCanvas from "../../components/GameCanvas";

import "./index.scss";

const Game: FC = () => {
  // return

  return (
    <div className="game">
      <Area>
        <div className="game-background"></div>
        <GameCanvas />
      </Area>
    </div>
  );
};

export default Game;
