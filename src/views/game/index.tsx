import React, { FC, useMemo } from "react";

// components
import Area from "../../components/Area";
import GameDecorationBleed from "../../components/GameDecorationBleed";
import GameDecoration from "../../components/GameDecoration";
import GameBackground from "../../components/GameBackground";
import GamePhaser from "../../components/GamePhaser";
import GameInterface from "../../components/GameInterface";

// config
import { worlds } from "../../config/worlds";

// assets
import "./index.scss";

const Game: FC = () => {
  const world = "mountain";

  const worldProperties = useMemo(() => {
    for (let i = 0; i < worlds.length; i++) {
      if (worlds[i].name === world) {
        const properties = {
          bgColor: worlds[i].bgColor,
          bgBleedColor: worlds[i].bgBleedColor,
          colorTheme: worlds[i].colorTheme
        };
        return properties;
      }
    }
  }, []);

  // return

  return (
    <div style={{ backgroundColor: worldProperties!.bgColor }} className="game">
      <Area height="min">
        <GameBackground world={world} />
        <GameDecoration world={world} position="top" />
        <GameDecoration world={world} position="bottom" />
        <GamePhaser />
      </Area>
      <Area height="max">
        <GameDecorationBleed
          bgBleedColor={worldProperties!.bgBleedColor}
          world={world}
          position="top"
        />
        <GameDecorationBleed
          bgBleedColor={worldProperties!.bgBleedColor}
          world={world}
          position="bottom"
        />
      </Area>
      <GameInterface colorTheme={worldProperties!.colorTheme} />
    </div>
  );
};

export default Game;
