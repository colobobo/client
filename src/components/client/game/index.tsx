import React, { FC } from "react";
import Area from "../../Area";
import DraggableElement from "../../DraggableElement";
import "./index.scss";

const Game: FC = () => {
  // return

  return (
    <div className="game">
      <Area>
        <DraggableElement />
      </Area>
    </div>
  );
};

export default Game;
