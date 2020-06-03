import React, { FC } from "react";

// components
import Area from "../../components/Area";
import GameDecorationBleed from "../../components/GameDecorationBleed";
import GameDecoration from "../../components/GameDecoration";
import GameBackground from "../../components/GameBackground";
import GamePhaser from "../../components/GamePhaser";
import GameInterface from "../../components/GameInterface";

// assets
import "./index.scss";

const Game: FC = () => {
  // return

  return (
    <div style={{ backgroundColor: "#A4E7FF" }} className="game">
      <Area height="min">
        <GameBackground />
        <GameDecoration position="top" />
        <GameDecoration position="bottom" />
        <GamePhaser />
      </Area>
      <Area height="max">
        <GameDecorationBleed position="top" />
        <GameDecorationBleed position="bottom" />
      </Area>
      <GameInterface />
    </div>
  );
};

export default Game;
