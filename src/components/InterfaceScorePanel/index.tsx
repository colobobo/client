import React, { FC, useMemo, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";

// store
import { useTypedSelector } from "../../redux/store";
import { selectors } from "../../redux";

// components
import SpriteAnimation from "../../components/SpriteAnimation";

// config
import { animationId } from "../../config/animations";

// assets
import timePicture from "../../assets/illustrations/score/time.png";
import memberPicture from "../../assets/illustrations/score/member.png";
import trapPicture from "../../assets/illustrations/score/trap.png";

// styles
import "./index.scss";

interface Props {
  isSuccess: boolean;
  isActive: boolean;
  isScoreActive: boolean;
  playSpritesheet: boolean;
  onAnimationComplete: any;
}

const InterfaceScorePanel: FC<Props> = ({
  isSuccess,
  isScoreActive,
  playSpritesheet,
  onAnimationComplete
}) => {
  const { t } = useTranslation();
  const defaultDelay = 1;

  const score = useTypedSelector(selectors.round.selectScore);
  const lives = useTypedSelector(selectors.round.selectLives);
  /* TO REPLACE BY REAL LIVES FROM STORE -> WAINTING */
  const totalLives = 4;

  // refs
  const $scoreLives = useRef<HTMLDivElement>(null);
  const $scoreRoundTotal = useRef<HTMLDivElement>(null);

  const livesItem = useMemo(() => {
    let livesArray = [];
    const lostLives = totalLives - lives;

    for (let i = 0; i < totalLives; i++) {
      const currentLife = i + 1;
      const currentLifeLost = !isSuccess && currentLife === lostLives;

      let life = (
        <div className="score-panel__life" key={i}>
          {currentLife <= lostLives && (
            <SpriteAnimation
              pauseOnLastFrame={!currentLifeLost}
              play={currentLifeLost && playSpritesheet}
              animationID={animationId.teacher_fail}
              autoplay={false}
            />
          )}
          {currentLife > lostLives && (
            <SpriteAnimation
              play={isSuccess && playSpritesheet}
              animationID={animationId.teacher_success}
              autoplay={false}
            />
          )}
        </div>
      );
      livesArray.push(life);
    }
    return livesArray;
  }, [isSuccess, lives, playSpritesheet]);

  // use effects

  useEffect(() => {
    if (isScoreActive) {
      const timeline = gsap.timeline({
        delay: defaultDelay
      });

      timeline.from($scoreLives.current, 0.2, {
        opacity: 0
      });

      const cards = document.getElementsByClassName("card");
      timeline.from([...cards, $scoreRoundTotal.current], 0.5, {
        opacity: 0,
        stagger: 0.5
      });

      timeline.then(onAnimationComplete);
    }
  }, [isScoreActive, onAnimationComplete]);

  // return

  return (
    <div className="score-panel">
      <div className="score-panel__container">
        <div className="score-panel__content">
          <p className="score-panel__score">
            {score.toString().padStart(4, "0")}
          </p>
          <div ref={$scoreLives} className="score-panel__lives">
            {livesItem}
          </div>
          <div className="score-panel__cards">
            <div className="card">
              <div className="card__detail">x5</div>
              <div className="card__picture">
                <img src={memberPicture} alt="Member icon" />
              </div>
              <p className="card__point">+200</p>
            </div>
            <div className="card">
              <div className="card__detail">x15</div>
              <div className="card__picture">
                <img src={trapPicture} alt="Trap icon" />
              </div>
              <p className="card__point">-100</p>
            </div>
            <div className="card">
              <div className="card__detail">x5</div>
              <div className="card__picture">
                <img src={timePicture} alt="Time icon" />
              </div>
              <p className="card__point">+200</p>
            </div>
          </div>
          <div ref={$scoreRoundTotal} className="score-panel__sum">
            <p>{t("score.sum")}</p>
            <span>240</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterfaceScorePanel;
