import React, { FC, useEffect, useState } from "react";

// components
import InterfaceScorePanel from "../../components/InterfaceScorePanel";

// store
import { useTypedSelector } from "../../redux/store";
import { selectors } from "../../redux";

// styles
import "./index.scss";

interface Props {
  isActive: boolean;
}

const InterfaceScore: FC<Props> = ({ isActive }) => {
  const lives = useTypedSelector(selectors.round.selectLives);
  const score = useTypedSelector(selectors.round.selectScore);
  const isSuccess = useTypedSelector(selectors.round.selectIsSuccess);

  // state

  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (isActive && lives === 0) {
      setTimeout(() => setIsGameOver(true), 3000);
    }
  }, [isActive, lives]);

  // return

  return (
    <div className="score">
      <div className="score__container">
        {isGameOver ? (
          <div className="score__game-over">
            <p>Game over</p>
          </div>
        ) : (
          <div className="score__panel">
            <InterfaceScorePanel
              score={score}
              lives={lives}
              isSuccess={isSuccess}
              isActive={isActive}
            />
          </div>
        )}

        <div className="score__animation">
          <img
            className="score__gif"
            src={require(`../../assets/illustrations/score/gifs/${
              isSuccess ? "success" : "fail"
            }.gif`)}
            alt="Gif"
          />
        </div>
      </div>
    </div>
  );
};

export default InterfaceScore;
