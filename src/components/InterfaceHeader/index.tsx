import React, { FC } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

// style
import "./index.scss";

// assets
import { ReactComponent as ArrowBack } from "../../assets/icons/arrow-back.svg";
import logo from "../../assets/logo/logo-simple.png";

interface Props {
  type: string;
  code?: string;
}

const InterfaceHeader: FC<Props> = ({ type, code }) => {
  const { t } = useTranslation();

  // return
  return (
    <div className="header">
      <Link to="/" className="header__back">
        <ArrowBack />
      </Link>
      <div className="header__container">
        {type === "join" && (
          <img className="header__logo" src={logo} alt="Logo" />
        )}
        {type === "create" && (
          <div>
            <p>{t("header.code.description")}</p>
            <p className="header__logo">7623</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InterfaceHeader;
