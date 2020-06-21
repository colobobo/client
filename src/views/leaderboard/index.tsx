import React, { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

// components
import InterfaceHeader, { Type } from "../../components/InterfaceHeader";
import InterfaceLeaderboardRegister from "../../components/InterfaceLeaderboardRegister";
import InterfaceLeaderboardTable from "../../components/InterfaceLeaderboardTable";
import InterfaceButton, { Colors } from "../../components/InterfaceButton";

// store
import { useTypedSelector } from "../../redux/store";
import { selectors } from "../../redux";

// style
import "./index.scss";

const About: FC = () => {
  const { t } = useTranslation();
  const isCreator = useTypedSelector(selectors.room.selectIsCreator);
  const playersNumber = useTypedSelector(selectors.area.selectDevicesArray)
    .length;

  // state
  const [activeRegister, setActiveRegister] = useState<boolean>(false);

  // store values
  const score = useTypedSelector(selectors.game.selectScore)
    .toString()
    .padStart(4, "0");

  // handlers
  const handleToggleScoreRegisterState = useCallback(state => {
    setActiveRegister(state);
  }, []);

  const handlePlayAgain = useCallback(() => {
    console.log("PLAY AGAIN");
  }, []);

  // return

  return (
    <div className="leaderboard">
      <InterfaceHeader
        backButtonStatus={activeRegister}
        onBackButtonClick={() => handleToggleScoreRegisterState(false)}
        type={Type.leaderboard}
        score={score}
      />

      <div className="leaderboard__container">
        <div className="leaderboard__content">
          <div className="leaderboard__filters">
            <InterfaceButton
              color={Colors.yellow}
              text={t("leaderboard.filters.all")}
              classNames="leaderboard__filter button--small"
            />
            <InterfaceButton
              color={Colors.white}
              text={playersNumber + t("leaderboard.filters.players")}
              classNames="leaderboard__filter button--small"
            />
          </div>
          <div className="leaderboard__board">
            <InterfaceLeaderboardTable />
          </div>
          {isCreator && (
            <div className="leaderboard__actions">
              <InterfaceButton
                onClick={() => handleToggleScoreRegisterState(true)}
                color={Colors.yellow}
                text={t("leaderboard.buttons.register")}
                classNames="leaderboard__action"
              />
              <InterfaceButton
                onClick={handlePlayAgain}
                color={Colors.blue}
                text={t("leaderboard.buttons.play-again")}
                classNames="leaderboard__action"
              />
            </div>
          )}
        </div>
      </div>

      {activeRegister && (
        <InterfaceLeaderboardRegister
          onToggleScoreRegisterState={handleToggleScoreRegisterState}
        />
      )}
    </div>
  );
};

export default About;
