import React, { FC } from "react";
import Area from "../../Area";

import "./game.scss";
import { useTypedSelector } from "../../../redux/store";
import { selectors as GameSelectors } from "../../../redux/Game";

const Game: FC = () => {
  // selectors

  const gameTick = useTypedSelector(GameSelectors.selectTick);
  const gamePosition = useTypedSelector(GameSelectors.selectPosition);

  // return

  return (
    <div className="game">
      <Area>
        {gamePosition && (
          <div
            className="game__square"
            style={{
              transform: `translate(${gamePosition.x}px, ${gamePosition.y}px)`,
              transition: `transform ${gameTick}ms linear`
            }}
          />
        )}
      </Area>
    </div>
  );
};

export default Game;
