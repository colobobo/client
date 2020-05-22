import React, { FC } from "react";
import Area from "../../components/Area";
import GameCanvas from "../../components/GameCanvas";
import GameDecorationBleed from "../../components/GameDecorationBleed";

import "./index.scss";

const Game: FC = () => {
  // return

  return (
    <div className="game">
      <GameDecorationBleed position="top" />
      <Area>
        <div className="game-decoration__background"></div>
        <GameCanvas />
        <div className="game-decoration__top"></div>
        <div className="game-decoration__bottom"></div>
      </Area>
      <GameDecorationBleed position="bottom" />
    </div>
  );
};

export default Game;
