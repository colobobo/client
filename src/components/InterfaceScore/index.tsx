import React, { FC } from "react";

// components
import InterfaceScorePanel from "../../components/InterfaceScorePanel";

// store
import { useTypedSelector } from "../../redux/store";
import { selectors } from "../../redux";

// styles
import "./index.scss";

const InterfaceScore: FC = () => {
  const lives = useTypedSelector(selectors.round.selectLives);
  const score = useTypedSelector(selectors.round.selectScore);
  const isSuccess = useTypedSelector(selectors.round.selectIsSuccess);

  // return

  return (
    <div className="score">
      <div className="score__container">
        <div className="score__panel">
          <InterfaceScorePanel score={score} lives={lives} />
        </div>
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
