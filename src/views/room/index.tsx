import React, { FC, useCallback, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

// store
import { useDispatch } from "react-redux";
import { selectors, actions } from "../../redux";
import { useTypedSelector } from "../../redux/store";

// components
import InterfaceHeader, { Type } from "../../components/InterfaceHeader";
import InterfaceButton, { Colors } from "../../components/InterfaceButton";
import InterfacePlacement from "../../components/InterfacePlacement";

// lib
import { enums } from "@colobobo/library";

// styles
import "./index.scss";

const Room: FC = () => {
  const { t } = useTranslation();
  const { roomId } = useParams();
  const history = useHistory();

  // store

  const dispatch = useDispatch();
  const gameMinPlayers = useTypedSelector(selectors.room.selectPlayersMin);
  const isGameStarted = useTypedSelector(selectors.game.selectIsStarted);
  const isCreator = useTypedSelector(selectors.room.selectIsCreator);
  const disposition = useTypedSelector(selectors.game.selectDisposition);
  const devicesArray = useTypedSelector(selectors.area.selectDevicesArray);
  const sceneType = useTypedSelector(selectors.game.selectSceneType);

  const [currentPlacement, setCurrentPlacement] = useState<
    enums.game.Disposition
  >(disposition);

  // effect

  useEffect(() => {
    if (isGameStarted && sceneType) {
      history.push("/game/");
    }
  }, [history, isGameStarted, sceneType]);

  // handlers

  const handleOnClickStart = useCallback(
    event => {
      event.preventDefault();
      dispatch(actions.webSocket.emit.game.start());
    },
    [dispatch]
  );

  const handleCurrentPlacementChange = useCallback(event => {
    setCurrentPlacement(event.target.value);
  }, []);

  const handleOnBackButtonClick = useCallback(() => {
    // TODO
    console.log("LEAVE THE ROOM AND REDIRECT TO HOME");
  }, []);

  useEffect(() => {
    dispatch(
      actions.webSocket.emit.game.dispositionSelected({
        disposition: currentPlacement
      })
    );
  }, [dispatch, currentPlacement]);

  // return

  return (
    <div className="room">
      <InterfaceHeader
        backButtonStatus={true}
        onBackButtonClick={handleOnBackButtonClick}
        type={Type.create}
        code={roomId}
      />

      <div className="room__container">
        <p
          className="room__description"
          dangerouslySetInnerHTML={{
            __html: isCreator
              ? t("room.creatorDescription")
              : t("room.description")
          }}
        />
        {isCreator && (
          <div className="room__selection">
            {Object.values(enums.game.Disposition).map(value => (
              <div className="room__choice" key={value}>
                <input
                  type="radio"
                  id={value}
                  value={value}
                  name="placement"
                  checked={currentPlacement === value}
                  onChange={handleCurrentPlacementChange}
                />
                <label htmlFor={value}>
                  <InterfaceButton
                    color={
                      currentPlacement === value ? Colors.yellow : Colors.white
                    }
                    text={t(`room.placement.${value}`)}
                    classNames="button--small"
                  />
                </label>
              </div>
            ))}
          </div>
        )}
        <div className="room__placement">
          <InterfacePlacement placement={disposition} />
        </div>
        {isCreator && (
          <InterfaceButton
            onClick={handleOnClickStart}
            color={Colors.blue}
            text={t("room.buttons.start")}
            classNames="room__action"
            disabled={devicesArray.length < gameMinPlayers}
          />
        )}
      </div>
    </div>
  );
};

export default Room;
