import React, { FC } from "react";
import { useParams, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./index.scss";

const Room: FC = () => {
  const { t } = useTranslation();
  const { roomId } = useParams();

  // return

  return (
    <div className="room">
      <div className="room__container">
        <h1 className="room__title">
          {t("room.title")} {roomId}
        </h1>
        <Link to="/game" className="room__action button button--orange">
          {t("room.buttons.start")}
        </Link>
      </div>
    </div>
  );
};

export default Room;
