import React, { FC, useCallback, useState } from "react";
import { useTranslation } from "react-i18next";

// components
import InterfaceButton, { Colors } from "../InterfaceButton";
import winnerPicture from "../../assets/illustrations/score/winner.png";

// styles
import "./index.scss";

interface Props {
  onToggleScoreRegisterState: (state: boolean) => any;
}

const InterfaceLeaderboardRegister: FC<Props> = ({
  onToggleScoreRegisterState
}) => {
  const { t } = useTranslation();

  // states

  const [inputTeamName, setInputTeamName] = useState<string>("");

  // handlers

  const handleTeamNameChange = useCallback(event => {
    setInputTeamName(event.target.value);
  }, []);

  const handleScoreRegister = useCallback(() => {
    console.log("REGISTER SCORE");
    onToggleScoreRegisterState(false);
  }, [onToggleScoreRegisterState]);

  // return

  return (
    <div className="leaderboard-register">
      <div className="leaderboard-register__container">
        <img
          className="leaderboard-register__picture"
          src={winnerPicture}
          alt="Winner"
        />
        <input
          type="text"
          value={inputTeamName}
          onChange={handleTeamNameChange}
          className="leaderboard-register__input"
          name="teamName"
          id="teamName"
          placeholder={t("leaderboard.placeholder")}
        />
        <InterfaceButton
          onClick={handleScoreRegister}
          color={Colors.yellow}
          text={t("leaderboard.buttons.register")}
          classNames="leaderboard-register__action"
        />
      </div>
    </div>
  );
};

export default InterfaceLeaderboardRegister;
