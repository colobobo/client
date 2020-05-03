import React, { FC } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

import "./index.scss";

const Room: FC = () => {
  const { t } = useTranslation();
  const { roomId } = useParams();

  // return

  return (
    <div className="waiting-room">
      <div className="waiting-room__container">
        <h1 className="waiting-room__title">
          {t("room.waiting.title")} {roomId}
        </h1>
      </div>
    </div>
  );
};

export default Room;
