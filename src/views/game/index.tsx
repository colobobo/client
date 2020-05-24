import React, { FC } from "react";
import Area from "../../components/Area";
import GameCanvas from "../../components/GameCanvas";
import GameDecorationBleed from "../../components/GameDecorationBleed";
import GameDecoration from "../../components/GameDecoration";
import GameBackground from "../../components/GameBackground";

import "./index.scss";
import GamePhaser from "../../components/GamePhaser";

const Game: FC = () => {
  // return

  return (
    <div className="game">
      <Area height="min">
        <GameBackground />
        <GameCanvas />
        <GameDecoration position="top" />
        <GameDecoration position="bottom" />
      </Area>
      <Area height="max">
        <GameDecorationBleed position="top" />
        <GameDecorationBleed position="bottom" />
      </Area>
    </div>
  );
};

export default Game;
