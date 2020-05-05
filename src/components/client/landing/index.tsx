import React, { FC, useCallback, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

// store
import { useDispatch, useSelector } from "react-redux";
import { actions as RoomActions } from "../../../redux/WebSocket";
import { selectors as RoomSelectors } from "../../../redux/Room";
import { selectors as DeviceSelectors } from "../../../redux/Device";

// style
import "./index.scss";

const Landing: FC = () => {
  const { t, i18n } = useTranslation();

  // states

  const [currentLanguage, setCurrentLanguage] = useState<string>("fr");

  // store

  const dispatch = useDispatch();
  const roomId = useSelector(RoomSelectors.selectId);
  const roomError = useSelector(RoomSelectors.selectError);
  const screenSize = useSelector(DeviceSelectors.selectScreenSize);

  const history = useHistory();

  // handlers

  const handleOnClickCreateRoom = useCallback(() => {
    dispatch(
      RoomActions.emit.room.create({
        width: screenSize.width,
        height: screenSize.height
      })
    );
  }, [dispatch, screenSize]);

  const handleChangeLanguage = useCallback(event => {
    setCurrentLanguage(event.target.value);
    i18n.changeLanguage(event.target.value);
  }, []);

  useEffect(() => {
    if (roomId) {
      history.push("/room/" + roomId);
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

        <div className="landing__actions">
          <button
            onClick={handleOnClickCreateRoom}
            className="landing__action button button--orange"
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
