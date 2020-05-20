import React, { FC } from "react";
import Area from "../../components/Area";
import GameCanvas from "../../components/GameCanvas";

import "./index.scss";

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
