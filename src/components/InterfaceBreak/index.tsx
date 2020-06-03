import React, { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";

// components
import InterfaceButton from "../../components/InterfaceButton";

// assets
import { ReactComponent as SoundSVG } from "../../assets/icons/sound-on.svg";
import memberPicture from "../../assets/illustrations/break/man.png";

// style
import "./index.scss";

interface Props {
  handleOnClickToggleGameState: (state: boolean) => any;
}

const InterfaceBreak: FC<Props> = ({ handleOnClickToggleGameState }) => {
  const { t } = useTranslation();

  // handles

  const handleOnClickLeftRoom = useCallback(() => {
    console.log("left room");
  }, []);

  const handleOnClickToggleSoundState = useCallback(() => {
    console.log("toggle sound state");
  }, []);

  // return
  return (
    <div className="break">
      <div className="break__container">
        <InterfaceButton
          actionOnClick={handleOnClickToggleSoundState}
          color="blue"
          extraClass="break__sound button--round"
        >
          <SoundSVG />
        </InterfaceButton>
        <div className="break__center">
          <img
            className="break__picture"
            src={memberPicture}
            alt="Man in break"
          />
          <div className="break__actions">
            <InterfaceButton
              actionOnClick={() => handleOnClickToggleGameState(false)}
              color="yellow"
              text={t("break.buttons.resume")}
              extraClass="break__action"
            />
            <InterfaceButton
              actionOnClick={handleOnClickLeftRoom}
              color="blue"
              text={t("break.buttons.left")}
              extraClass="break__action"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterfaceBreak;
