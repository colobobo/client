import React, { FC, useMemo, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import Odometer from "react-odometerjs";
import Classnames from "classnames";

// store
import { useTypedSelector } from "../../redux/store";
import { selectors } from "../../redux";

// components
import SpriteAnimation from "../../components/SpriteAnimation";

// config
import { animationId } from "../../config/animations";

// styles
import "./index.scss";

interface Props {
  isSuccess: boolean;
  isFail: boolean;
  isActive: boolean;
  isScoreActive: boolean;
  playSpritesheet: boolean;
  onAnimationComplete: any;
}

const InterfaceScorePanel: FC<Props> = ({
  isSuccess,
  isFail,
  isScoreActive,
  playSpritesheet,
  onAnimationComplete
}) => {
  const { t } = useTranslation();
  const defaultDelay = 1;

  const roundScoreDetails = useTypedSelector(
    selectors.round.selectScoreDetails
  );
  const gameScore = useTypedSelector(selectors.game.selectScore);
  const lives = useTypedSelector(selectors.round.selectLives);
  const totalLives = useTypedSelector(selectors.game.selectLives);

  // refs
  const $scoreLives = useRef<HTMLDivElement>(null);
  const $scoreRoundTotal = useRef<HTMLDivElement>(null);

  const [newScore, setNewScore] = useState(0);

  const livesItem = useMemo(() => {
    let livesArray = [];
    const lostLives = totalLives - lives;

    for (let i = 0; i < totalLives; i++) {
      const currentLife = i + 1;
      const currentLifeLost = isFail && currentLife === lostLives;

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
              isLoop={isSuccess}
            />
          )}
        </div>
      );
      livesArray.push(life);
    }
    return livesArray;
  }, [isFail, isSuccess, lives, playSpritesheet, totalLives]);

  const cardsItem = useMemo(() => {
    let cardsArray = [];

    if (roundScoreDetails) {
      for (let [key] of Object.entries(roundScoreDetails.details)) {
        const isTraps = key === "traps";
        const isTime = key === "remainingTime";

        let card = (
          <div className="card" key={key}>
            <div className="card__detail">
              {isTime && (
                <span>
                  +
                  {Math.floor(roundScoreDetails.details[key].value / 60000)
                    .toString()
                    .padStart(1, "0")}
                  :
                  {Math.ceil(
                    (roundScoreDetails.details[key].value % 60000) / 1000
                  )
                    .toString()
                    .padStart(2, "0")}
                </span>
              )}
              {!isTime && <span>x{roundScoreDetails.details[key].value}</span>}
            </div>
            <div className="card__picture">
              <img
                src={require(`../../assets/illustrations/score/${key}.png`)}
                alt="Icon"
              />
            </div>
            <p
              className={Classnames("card__point", {
                "card__point--yellow": isTraps
              })}
            >
              {isTraps ? "- " : "+ "}
              {roundScoreDetails.details[key].points}
            </p>
          </div>
        );
        cardsArray.push(card);
      }
    }

    return cardsArray;
  }, [roundScoreDetails]);

  // use effects

  useEffect(() => {
    if (playSpritesheet) {
      setNewScore(gameScore);
    }
  }, [playSpritesheet, gameScore]);

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
          <div className="score-panel__score">
            <Odometer format="d" duration={1000} value={newScore} />
          </div>
          <div ref={$scoreLives} className="score-panel__lives">
            {livesItem}
          </div>
          <div className="score-panel__cards">{cardsItem}</div>
          <div ref={$scoreRoundTotal} className="score-panel__sum">
            <p>{t("score.sum")}</p>
            <span>{roundScoreDetails?.total}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterfaceScorePanel;
