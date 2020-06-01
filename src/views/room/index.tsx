import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useState,
  useRef
} from "react";
import { useHistory, useParams, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

// store
import { useDispatch } from "react-redux";
import { selectors, actions } from "../../redux";
import { useTypedSelector } from "../../redux/store";

// components
import InterfaceHeader from "../../components/InterfaceHeader";

// assets
import mobileIcon from "../../assets/illustrations/mobile.png";

// styles
import "./index.scss";

const Room: FC = () => {
  const { t } = useTranslation();
  const { roomId } = useParams();
  const history = useHistory();
  const location = useLocation<{ isCreator: boolean }>();

  const [currentPlacement, setCurrentPlacement] = useState<string>("inline");

  // store

  const dispatch = useDispatch();
  const isGameStarted = useTypedSelector(selectors.game.selectIsStarted);
  const devicesArray = useTypedSelector(selectors.area.selectDevicesArray);
  const deviceId = useTypedSelector(selectors.room.selectDeviceId);
  const currentDevice = useTypedSelector(state =>
    selectors.area.selectDevice(state, { id: deviceId })
  );

  const currentDevicePosition = useMemo(() => {
    return currentDevice?.position;
  }, [currentDevice]);

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
        <p className="room__description">
          {isCreator ? t("room.creatorDescription") : t("room.description")}
        </p>
        {isCreator && (
          <ul className="room__selection">
            <li className="room__choice">
              <input
                type="radio"
                id="inline"
                value="inline"
                name="placement"
                checked={currentPlacement === "inline"}
                onChange={handleCurrentPlacementChange}
              />
              <label className="button button--yellow" htmlFor="inline">
                {t("room.buttons.placement.inline")}
              </label>
            </li>
            <li className="room__choice">
              <input
                type="radio"
                id="round"
                value="round"
                name="placement"
                checked={currentPlacement === "round"}
                onChange={handleCurrentPlacementChange}
              />
              <label className="button button--yellow" htmlFor="round">
                {t("room.buttons.placement.round")}
              </label>
            </li>
          </ul>
        )}
        <div className="room__placement">
          <div className={`room__players ${currentPlacement}`}>
            {devicesArray.map(device => (
              <div
                className={`room__player ${
                  currentDevicePosition === device.position ? "current" : ""
                }`}
                key={device.id}
              >
                <img src={mobileIcon} alt={`Position ${device.position + 1}`} />
                <span>{device.position + 1}</span>
              </div>
            ))}
          </div>
        </div>
        {isCreator && (
          <button
            onClick={handleOnClickStart}
            className="room__action button button--blue"
          >
            {t("room.buttons.start")}
          </button>
        )}
      </div>
    </div>
  );
};

export default Room;
