import React, { FC, useCallback } from "react";
import { useTranslation } from "react-i18next";

// components
import InterfaceButton, { Colors } from "../../components/InterfaceButton";

// assets
import { ReactComponent as SoundSVG } from "../../assets/icons/sound-on.svg";
import memberPicture from "../../assets/illustrations/break/man.png";

// style
import "./index.scss";

interface Props {
  handleOnClickToggleGameState: () => any;
  showContinue: boolean;
}

const InterfaceBreak: FC<Props> = ({
  handleOnClickToggleGameState,
  showContinue
}) => {
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
          onClick={handleOnClickToggleSoundState}
          color={Colors.blue}
          classNames="break__sound button--round"
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
            {showContinue && (
              <InterfaceButton
                onClick={handleOnClickToggleGameState}
                color={Colors.yellow}
                text={t("break.buttons.resume")}
                classNames="break__action"
              />
            )}
            <InterfaceButton
              onClick={handleOnClickLeftRoom}
              color={Colors.blue}
              text={t("break.buttons.left")}
              classNames="break__action"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterfaceBreak;
