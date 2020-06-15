import React, { FC, useMemo } from "react";
import { useTranslation } from "react-i18next";

// components
import SpriteAnimation from "../../components/SpriteAnimation";

// config
import { animationId } from "../../config/animations";

// assets
import teacherDeadPicture from "../../assets/illustrations/score/teacher_dead.png";
import teacherAlivePicture from "../../assets/illustrations/score/teacher_alive.png";
import timePicture from "../../assets/illustrations/score/time.png";
import memberPicture from "../../assets/illustrations/score/member.png";
import trapPicture from "../../assets/illustrations/score/trap.png";

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
          <p className="score-panel__score">
            {score.toString().padStart(3, "0")}
          </p>
          <ul className="score-panel__lives">{livesItem}</ul>
          <ul className="score-panel__cards">
            <li className="card">
              <div className="card__detail">x5</div>
              <div className="card__picture">
                <img src={memberPicture} alt="Member icon" />
              </div>
              <p className="card__point">+200</p>
            </li>
            <li className="card">
              <div className="card__detail">x15</div>
              <div className="card__picture">
                <img src={trapPicture} alt="Trap icon" />
              </div>
              <p className="card__point">-100</p>
            </li>
            <li className="card">
              <div className="card__detail">x5</div>
              <div className="card__picture">
                <img src={timePicture} alt="Time icon" />
              </div>
              <p className="card__point">+200</p>
            </li>
          </ul>
          <div className="score-panel__sum">
            <p>{t("score.sum")}</p>
            <span>240</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterfaceScorePanel;
