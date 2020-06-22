import React, { FC, useMemo, useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { gsap } from "gsap";
import Odometer from "react-odometerjs";
import Classnames from "classnames";

//lib
import { enums } from "@colobobo/library";

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
  playSpritesheet: boolean;
  playPanelAnimation: boolean;
  onAnimationComplete: any;
}

const InterfaceScorePanel: FC<Props> = ({
  isSuccess,
  isFail,
  playSpritesheet,
  onAnimationComplete,
  playPanelAnimation
}) => {
  const { t } = useTranslation();
  const defaultDelay = 1;

  const roundScoreDetails = useTypedSelector(
    selectors.transition.selectRoundScoreDetails
  );
  const roundLives = useTypedSelector(selectors.transition.selectRoundLives);
  const gameScore = useTypedSelector(selectors.game.selectScore);
  const gameLives = useTypedSelector(selectors.game.selectLives);

  // refs
  const $scoreLives = useRef<HTMLDivElement>(null);
  const $scoreRoundTotal = useRef<HTMLDivElement>(null);

  const [newScore, setNewScore] = useState(0);

  const livesItem = useMemo(() => {
    let livesArray = [];
    const lostLives = gameLives - roundLives;

    for (let i = 0; i < gameLives; i++) {
      const currentLife = i + 1;
      const currentLifeLost = isFail && currentLife === lostLives;

      let life = (
        <div className="score-panel__life" key={i}>
          {(currentLife <= lostLives && isSuccess) ||
            (currentLife < lostLives && isFail && (
              <img
                src={require(`../../assets/illustrations/score/teacher_dead.png`)}
                alt="Live"
              />
            ))}
          {currentLifeLost && (
            <SpriteAnimation
              play={playSpritesheet}
              animationID={animationId.teacher_fail}
              autoplay={false}
            />
          )}
          {currentLife > lostLives && isSuccess && (
            <SpriteAnimation
              play={playSpritesheet}
              animationID={animationId.teacher_success}
              autoplay={false}
              isLoop={true}
            />
          )}
          {currentLife > lostLives && isFail && (
            <img
              src={require(`../../assets/illustrations/score/teacher_alive.png`)}
              alt="Live"
            />
          )}
        </div>
      );
      livesArray.push(life);
    }
    return livesArray;
  }, [isFail, isSuccess, roundLives, playSpritesheet, gameLives]);

  const cardsItem = useMemo(() => {
    let cardsArray = [];

    if (roundScoreDetails) {
      for (let [key] of Object.entries(roundScoreDetails.details)) {
        const value = roundScoreDetails.details[key].value;
        const points = roundScoreDetails.details[key].points;
        const isPositivePoints = Math.sign(points) > 0;
        const isTime = key === enums.round.ScoreDetails.remainingTime;
        const isArrivedMembers =
          key === enums.round.ScoreDetails.arrivedMembers;

        let card = (
          <div className="card" key={key}>
            <div className="card__detail">
              {isTime && (
                <span>
                  +
                  {Math.floor(value / 60000)
                    .toString()
                    .padStart(1, "0")}
                  :
                  {Math.floor((value % 60000) / 1000)
                    .toString()
                    .padStart(2, "0")}
                </span>
              )}
              {!isTime && <span>x{value}</span>}
            </div>
            <div className="card__picture">
              <img
                src={require(`../../assets/illustrations/score/${
                  isArrivedMembers && value === 0 ? "arrivedMembers_null" : key
                }.png`)}
                alt="Icon"
              />
            </div>
            <p
              className={Classnames("card__point", {
                "card__point--yellow": !isPositivePoints
              })}
            >
              {isPositivePoints ? "+" : ""}
              {points}
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
    if (playPanelAnimation) {
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
  }, [onAnimationComplete, playPanelAnimation]);

  // return

  return (
    <div className="score-panel">
      <div className="score-panel__container">
        <div className="score-panel__content">
          <div className="score-panel__score">
            <Odometer format="dddd" duration={1000} value={newScore} />
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
