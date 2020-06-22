import React, { FC } from "react";
import { useSelector } from "react-redux";
import { selectors } from "../../redux";
import { enums } from "@colobobo/library";

// components
import Round from "./round";
import Transition from "./transition";

// style
import "./index.scss";

const Game: FC = () => {
  // return

  const sceneType = useSelector(selectors.game.selectSceneType);

  return (
    <div className="game">
      {/* TODO : animate transition */}
      <Round isActive={sceneType === enums.scene.Type.round} />
      {sceneType === enums.scene.Type.transition && (
        <Transition
          isTansitionActive={sceneType === enums.scene.Type.transition}
        />
      )}
    </div>
  );
};

export default Game;
