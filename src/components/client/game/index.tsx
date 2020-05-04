import React, { FC } from "react";
import Area from "../../Area";

import "./game.scss";
import { useTypedSelector } from "../../../redux/store";
import { selectors } from "../../../redux";

const Game: FC = () => {
  // selectors
  const gameTick = useTypedSelector(selectors.game.selectTick);
  const gamePosition = useTypedSelector(selectors.game.selectPosition);

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
