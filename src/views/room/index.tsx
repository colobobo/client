import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// store
import { useDispatch } from "react-redux";
import { selectors, actions } from "../../redux";
import { useTypedSelector } from "../../redux/store";

// components
import InterfaceHeader from "../../components/InterfaceHeader";
import InterfaceButton from "../../components/InterfaceButton";
import InterfacePlacement from "../../components/InterfacePlacement";

// styles
import "./index.scss";

const Room: FC = () => {
  const { t } = useTranslation();
  const { roomId } = useParams();
  const history = useHistory();
  const location = useLocation<{ isCreator: boolean }>();
  const placements = ["inline", "round"];

  const [currentPlacement, setCurrentPlacement] = useState<string>("inline");

  // store

  const dispatch = useDispatch();
  const isGameStarted = useTypedSelector(selectors.game.selectIsStarted);

  // memo

  const isCreator = useMemo(() => location.state.isCreator, [
    location.state.isCreator
  ]);

  // effect

  useEffect(() => {
    if (isGameStarted) {
      history.push("/game/");
    }
  }, [history, isGameStarted]);

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

  // return

  return (
    <div className="room">
      <InterfaceHeader type="create" code={roomId} />

      <div className="room__container">
        <p
          className="room__description"
          dangerouslySetInnerHTML={{
            __html: isCreator
              ? t("room.creatorDescription")
              : t("room.description")
          }}
        ></p>
        {isCreator && (
          <div className="room__selection">
            {placements.map((placement, index) => (
              <div className="room__choice" key={index}>
                <input
                  type="radio"
                  id={placement}
                  value={placement}
                  name="placement"
                  checked={currentPlacement === placement}
                  onChange={handleCurrentPlacementChange}
                />
                <InterfaceButton
                  color="yellow"
                  text={t(`room.placement.${placement}`)}
                  extraClass="button--small"
                />
                <label htmlFor={placement} />
              </div>
            ))}
          </div>
        )}
        <div className="room__placement">
          <InterfacePlacement placement={currentPlacement} />
        </div>
        {isCreator && (
          <InterfaceButton
            actionOnClick={handleOnClickStart}
            color="blue"
            text={t("room.buttons.start")}
            extraClass="room__action"
          />
        )}
      </div>
    </div>
  );
};

export default Room;
