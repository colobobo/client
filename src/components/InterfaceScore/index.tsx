import React, { FC } from "react";

// components
import InterfaceScorePanel from "../../components/InterfaceScorePanel";

// store
import { useSelector } from "react-redux";
import { selectors } from "../../redux";

// styles
import "./index.scss";

const InterfaceScore: FC = () => {
  const score = useSelector(selectors.game.selectScore);
  const life = useSelector(selectors.game.selectLife);

  // return

  return (
    <div className="score">
      <div className="score__container">
        <div className="score__panel">
          <InterfaceScorePanel score={score} life={life} />
        </div>
      </div>
    </div>
  );
};

export default InterfaceScore;
