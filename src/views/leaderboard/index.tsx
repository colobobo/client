import React, { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";

// components
import InterfaceHeader from "../../components/InterfaceHeader";
import InterfaceButton, { Colors } from "../../components/InterfaceButton";

// store
import { useTypedSelector } from "../../redux/store";
import { selectors } from "../../redux";

// style
import "./index.scss";

const About: FC = () => {
  const { t } = useTranslation();

  // store values
  const score = useTypedSelector(selectors.round.selectScore)
    .toString()
    .padStart(3, "0");

  // handlers
  const handleOnScoreRegister = useCallback(() => {
    console.log("TOGGLE REGISTER DISPLAY");
  }, []);

  const handleOnPlayAgain = useCallback(() => {
    console.log("PLAY AGAIN");
  }, []);

  // return

  return (
    <div className="leaderboard">
      <InterfaceHeader type="leaderboard" score={score} />

      <div className="leaderboard__container">
        <div className="leaderboard__content">
          <div className="leaderboard__filters">
            <InterfaceButton
              color={Colors.yellow}
              text={t("leaderboard.filters.all")}
              classNames="leaderboard__filter button--small"
            />
            <InterfaceButton
              color={Colors.yellow}
              text={t("leaderboard.filters.players")}
              classNames="leaderboard__filter button--small"
            />
          </div>
          <table className="leaderboard__list">
            <tbody className="leaderboard__teams">
              <tr className="leaderboard__team">
                <td>Les Boulets</td>
                <td>4 joueurs</td>
                <td>320</td>
              </tr>
              <tr className="leaderboard__team">
                <td>Superhéros</td>
                <td>6 joueurs</td>
                <td>600</td>
              </tr>
              <tr className="leaderboard__team">
                <td>Totally Spies</td>
                <td>3 joueurs</td>
                <td>289</td>
              </tr>
            </tbody>
          </table>
          <div className="leaderboard__actions">
            <InterfaceButton
              onClick={handleOnScoreRegister}
              color={Colors.yellow}
              text={t("leaderboard.buttons.register")}
              classNames="leaderboard__action"
            />
            <InterfaceButton
              onClick={handleOnPlayAgain}
              color={Colors.blue}
              text={t("leaderboard.buttons.play-again")}
              classNames="leaderboard__action"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
