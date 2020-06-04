import React, { FC, useCallback, useEffect, useMemo, useState } from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// store
import { useDispatch } from "react-redux";
import { selectors, actions } from "../../redux";
import { useTypedSelector } from "../../redux/store";

// components
import InterfaceHeader from "../../components/InterfaceHeader";
import InterfaceButton, { Colors } from "../../components/InterfaceButton";
import InterfacePlacement, {
  PlacementList
} from "../../components/InterfacePlacement";

// styles
import "./index.scss";

const Room: FC = () => {
  const { t } = useTranslation();
  const { roomId } = useParams();
  const history = useHistory();

  const [currentPlacement, setCurrentPlacement] = useState<PlacementList>(
    PlacementList.round
  );

  // store

  const dispatch = useDispatch();
  const isGameStarted = useTypedSelector(selectors.game.selectIsStarted);
  const isCreator = useTypedSelector(selectors.room.selectIsCreator);

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
            {Object.values(PlacementList).map(value => (
              <div className="room__choice" key={value}>
                <input
                  type="radio"
                  id={value}
                  value={value}
                  name="placement"
                  checked={currentPlacement === value}
                  onChange={handleCurrentPlacementChange}
                />
                <InterfaceButton
                  color={Colors.yellow}
                  text={t(`room.placement.${value}`)}
                  classNames="button--small"
                />
                <label htmlFor={value} />
              </div>
            ))}
          </div>
        )}
        <div className="room__placement">
          <InterfacePlacement placement={currentPlacement} />
        </div>
        {isCreator && (
          <InterfaceButton
            onClick={handleOnClickStart}
            color={Colors.blue}
            text={t("room.buttons.start")}
            classNames="room__action"
          />
        )}
      </div>
    </div>
  );
};

export default Room;
