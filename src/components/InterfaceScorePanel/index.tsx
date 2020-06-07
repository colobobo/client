import React, { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

// components
import SpriteAnimation from "../../components/SpriteAnimation";

// config
import { animationId } from "../../config/animations";

// styles
import "./index.scss";

interface Props {
  score: number;
  life: number;
}

const InterfaceScorePanel: FC<Props> = ({ score, life }) => {
  const { t } = useTranslation();
  const maxLife = 4; /* REPLACE BY MAX LIFE LATER */
  const currentLives = 3;

  const lives = useMemo(() => {
    let livesArray = [];
    const currentLife = maxLife - currentLives - 1;

    for (let i = 0; i < maxLife; i++) {
      let life = (
        <li className="score-panel__life" key={i}>
          <SpriteAnimation
            animationID={
              currentLife === i
                ? animationId.teacher_fail
                : animationId.teacher_success
            }
          />
        </li>
      );
      livesArray.push(life);
    }
    return livesArray;
  }, [maxLife]);

  // return

  return (
    <div className="score-panel">
      <div className="score-panel__container">
        <div className="score-panel__content">
          <p className="score-panel__title">{t("score.title")}</p>
          {/* REPLACE BY SCORE LATER */}
          <p className="score-panel__score">000</p>{" "}
          <ul className="score-panel__lives">{lives}</ul>
        </div>
      </div>
    </div>
  );
};

export default InterfaceScorePanel;
