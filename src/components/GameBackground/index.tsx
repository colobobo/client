import React, { FC } from "react";

// style
import "./index.scss";

const GameBackground: FC = () => {
  // return
  return (
    <div className="game-decoration__backgrounds">
      <div
        className="game-decoration__background"
        style={{
          backgroundImage: `url(${require("../../assets/worlds/jungle/background-1.png")})`
        }}
      ></div>
      <div
        className="game-decoration__background"
        style={{
          backgroundImage: `url(${require("../../assets/worlds/jungle/background-2.png")})`
        }}
      ></div>
    </div>
  );
};

export default GameBackground;
