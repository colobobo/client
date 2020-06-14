import React, { FC, useEffect, useState } from "react";

// components
import InterfaceScorePanel from "../../components/InterfaceScorePanel";
import Area from "../../components/Area";

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
  const areaMinHeight = useTypedSelector(selectors.area.selectMinHeight);
  const isCreator = useTypedSelector(selectors.room.selectIsCreator);

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
        <div
          className="score__background"
          style={{
            height: areaMinHeight
          }}
        ></div>
        <div
          className="score__min-area"
          style={{
            height: areaMinHeight
          }}
        >
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
        </div>
        <Area height="min">
          <div className="score__bush"></div>
        </Area>
        <div
          className="score__min-area"
          style={{
            height: areaMinHeight
          }}
        >
          <div className="score__animation">
            {isCreator && (
              <img
                className="score__gif"
                src={require(`../../assets/illustrations/score/gifs/${
                  isSuccess ? "success" : "fail"
                }.gif`)}
                alt="Gif"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterfaceScore;
