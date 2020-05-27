import React, { FC, useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

// store
import { useDispatch, useSelector } from "react-redux";
import { selectors, actions } from "../../redux";

// style
import "./index.scss";

// assets
import logo from "../../assets/logo/logo-simple.png";

const Landing: FC = () => {
  const { t, i18n } = useTranslation();
  const history = useHistory();

  // states

  const [currentLanguage, setCurrentLanguage] = useState<string>("fr");

  // store

  const dispatch = useDispatch();
  const roomId = useSelector(selectors.room.selectId);
  const roomError = useSelector(selectors.room.selectError);
  const screenSize = useSelector(selectors.device.selectScreenSize);

  // handlers

  const handleOnClickCreateRoom = useCallback(() => {
    dispatch(
      actions.webSocket.emit.room.create({
        width: screenSize.width,
        height: screenSize.height
      })
    );
  }, [dispatch, screenSize]);

  const handleChangeLanguage = useCallback(
    event => {
      setCurrentLanguage(event.target.value);
      i18n.changeLanguage(event.target.value);
    },
    [i18n]
  );

  useEffect(() => {
    if (roomId) {
      history.push("/room/" + roomId, { isCreator: true });
    }
  }, [history, roomId]);

  // return

  return (
    <div className="landing">
      <div className="landing__container">
        <select
          className="landing__languages"
          value={currentLanguage}
          onChange={handleChangeLanguage}
        >
          <option value="fr">{t("languages.french")}</option>
          <option value="en">{t("languages.english")}</option>
        </select>

        <Link to="/join" className="landing__about button button--yellow">
          ?
        </Link>

        <div className="landing__center">
          <img className="landing__logo" src={logo} alt="Logo" />
        </div>

        <div className="landing__actions">
          <button
            onClick={handleOnClickCreateRoom}
            className="landing__action button button--yellow"
          >
            {t("landing.buttons.create")}
          </button>
          <Link to="/join" className="landing__action button button--blue">
            {t("landing.buttons.join")}
          </Link>
        </div>
        <div className="landing__error">{roomError}</div>
      </div>
    </div>
  );
};

export default Landing;
