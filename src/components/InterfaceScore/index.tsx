import React, { FC, useEffect, useState } from "react";

// components
import InterfaceScorePanel from "../../components/InterfaceScorePanel";

// store
import { useTypedSelector } from "../../redux/store";
import { selectors, actions } from "../../redux";
import { useDispatch } from "react-redux";

// styles
import "./index.scss";

interface Props {
  isActive: boolean;
}

const InterfaceScore: FC<Props> = ({ isActive }) => {
  const dispatch = useDispatch();
  const roundId = useTypedSelector(selectors.round.selectId);
  const lives = useTypedSelector(selectors.round.selectLives);
  const totalLives = useTypedSelector(selectors.game.selectTotalLives);
  const score = useTypedSelector(selectors.round.selectScore);
  const isSuccess = useTypedSelector(selectors.round.selectIsSuccess);

  console.log(isSuccess);

  // state

  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    if (isActive && lives === 0) {
      setTimeout(() => setIsGameOver(true), 3000);
    }
  }, [isActive, lives]);

  useEffect(() => {
    if (roundId === 1) {
      dispatch(
        actions.game.setTotalLives({ lives: isSuccess ? lives : lives + 1 })
      );
    }
  }, [dispatch, isSuccess, lives, roundId]);

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
              totalLives={totalLives}
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
