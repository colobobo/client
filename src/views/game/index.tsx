import React, { FC } from "react";
import Area from "../../components/Area";
import GameCanvas from "../../components/GameCanvas";
import GameDecorationBleed from "../../components/GameDecorationBleed";
import GameDecoration from "../../components/GameDecoration";

import "./index.scss";

const Game: FC = () => {
  // return

  return (
    <div className="game">
      <GameDecorationBleed position="top" />
      <Area>
        <div className="game-decoration__background"></div>
        <GameCanvas />
        <GameDecoration position="top" />
        <GameDecoration position="bottom" />
      </Area>
      <GameDecorationBleed position="bottom" />
    </div>
  );
};

export default Game;
