import React, { FC } from "react";

// assets
import Round from "./round";
import Transition from "./transition";
import { useSelector } from "react-redux";
import { selectors } from "../../redux";
import { enums } from "@colobobo/library";
import "./index.scss";

const Game: FC = () => {
  // return

  const sceneType = useSelector(selectors.game.selectSceneType);

  return (
    <div className="game">
      {/* TODO : animate transition */}
      <Round isActive={sceneType === enums.scene.Type.round} />
      <Transition
        isTansitionActive={sceneType === enums.scene.Type.transition}
      />
    </div>
  );
};

export default Game;
