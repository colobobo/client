import React, { FC } from "react";
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
      {sceneType === enums.scene.Type.round && <Round />}
      {sceneType === enums.scene.Type.transition && <Transition />}
    </div>
  );
};

export default Game;
