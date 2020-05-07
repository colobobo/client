import React, { FC } from "react";
import Area from "../../Area";
import DraggableElement from "../../DraggableElement";
import "./index.scss";

import { selectors } from "../../../redux";
import { useSelector } from "react-redux";

const Game: FC = () => {
  // selectors

  const objectsArray = useSelector(selectors.game.selectObjectsAsArray);

  // return

  return (
    <div className="game">
      <Area>
        {objectsArray.map(object => (
          <DraggableElement key={object.id} id={object.id} />
        ))}
      </Area>
    </div>
  );
};

export default Game;
