import React, { FC } from "react";
import { useTranslation } from "react-i18next";

// style
import "./index.scss";

// assets
import { ReactComponent as ArrowBack } from "../../assets/icons/arrow-back.svg";
import logo from "../../assets/logo/logo-simple.png";

interface Props {
  type: string;
  code?: string;
  score?: string;
  backButtonStatus?: boolean;
  onBackButtonClick?: any;
}

const InterfaceHeader: FC<Props> = ({
  type,
  code,
  score,
  backButtonStatus,
  onBackButtonClick
}) => {
  const { t } = useTranslation();

  // return
  return (
    <div className="header">
      {backButtonStatus && (
        <ArrowBack className="header__back" onClick={onBackButtonClick} />
      )}
      <div className="header__container">
        {type === "join" && (
          <img className="header__logo" src={logo} alt="Logo" />
        )}
        {type === "create" && (
          <div>
            <p>{t("header.code.description")}</p>
            <p className="header__code">{code}</p>
          </div>
        )}
        {type === "leaderboard" && (
          <div>
            <p className="header__score">{score}</p>
            <p className="header__best-score">
              {t("header.score.description")} {score}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterfaceHeader;
