import React, { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

// components
import SpriteAnimation from "../../components/SpriteAnimation";

// config
import { animationId } from "../../config/animations";

// assets
import teacherDeadPicture from "../../assets/illustrations/score/teacher_dead.png";
import teacherAlivePicture from "../../assets/illustrations/score/teacher_alive.png";

// styles
import "./index.scss";

interface Props {
  score: number;
  lives: number;
  isSuccess: boolean;
  isActive: boolean;
}

const InterfaceScorePanel: FC<Props> = ({ score, lives, isSuccess }) => {
  const { t } = useTranslation();

  const livesItem = useMemo(() => {
    let livesArray = [];
    /* TODO: REPLACE MAX LIVES NUMBER BY VARIABLE BASED ON LIVES FROM ROUND INIT */
    const currentLife = 4 - lives - 1;

    for (let i = 0; i < 4; i++) {
      let life = (
        <li className="score-panel__life" key={i}>
          {i < currentLife && (
            <img src={teacherDeadPicture} alt="Dead teacher" />
          )}
          {i === currentLife && isSuccess && (
            <img src={teacherDeadPicture} alt="Dead teacher" />
          )}
          {i === currentLife && !isSuccess && (
            <SpriteAnimation
              animationID={animationId.teacher_fail}
              autoplay={true}
            />
          )}
          {i > currentLife && isSuccess && (
            <SpriteAnimation
              animationID={animationId.teacher_success}
              autoplay={true}
            />
          )}
          {i > currentLife && !isSuccess && (
            <img src={teacherAlivePicture} alt="Alive teacher" />
          )}
        </li>
      );
      livesArray.push(life);
    }
    return livesArray;
  }, [isSuccess, lives]);

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
