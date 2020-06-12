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
  lives: number;
  totalLives: number;
  isSuccess: boolean;
  isActive: boolean;
}

const InterfaceScorePanel: FC<Props> = ({
  score,
  lives,
  totalLives,
  isSuccess
}) => {
  const { t } = useTranslation();

  const livesItem = useMemo(() => {
    let livesArray = [];

    for (let i = 0; i < totalLives; i++) {
      let life = (
        <li className="score-panel__life" key={i}>
          <SpriteAnimation animationID={animationId.teacher_success} />
        </li>
      );
      livesArray.push(life);
    }
    return livesArray;
  }, [totalLives]);

  // return

  return (
    <div className="score-panel">
      <div className="score-panel__container">
        <div className="score-panel__content">
          <p className="score-panel__title">{t("score.title")}</p>
          <p className="score-panel__score">
            {score.toString().padStart(3, "0")}
          </p>
          <ul className="score-panel__lives">{livesItem}</ul>
        </div>
      </div>
    </div>
  );
};

export default InterfaceScorePanel;
