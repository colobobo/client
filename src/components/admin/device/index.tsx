import React, { useState, FC, useMemo, useCallback } from "react";
import { devices } from "../../../datas/devices";

// translation
import { I18nextProvider } from "react-i18next";
import i18n from "../../../translations/i18n";

// views / components
import Client from "../../../views/client";
import StoreWrapper from "../../../components/StoreWrapper";

// store
import { useSelector } from "react-redux";
import { selectors } from "../../../redux";

//style
import "./index.scss";

interface currentMobile {
  index: number;
  name: string;
  resolution: {
    width: number;
    height: number;
  };
}

interface Props {
  userId: number;
  deviceData: any;
  gameId?: string;
  autoconnect?: boolean;
  onCreateGame: any;
}

const Device: FC<Props> = ({
  userId,
  deviceData,
  gameId,
  onCreateGame,
  autoconnect
}) => {
  const adminStatus = useSelector(selectors.admin.selectStatus);

  const [currentMobile, setCurrentMobile] = useState<currentMobile>({
    index: deviceData?.index,
    name: deviceData?.name,
    resolution: deviceData?.resolution
  });

  const chooseDevice = useCallback((event: any) => {
    setCurrentMobile({
      index: event.target.value,
      name: devices[event.target.value].name,
      resolution: devices[event.target.value].resolution
    });
  }, []);

  const handleOnCreateGame = useCallback(
    (gameId?: string) => {
      onCreateGame(gameId);
    },
    [onCreateGame]
  );

  const deviceSize = {
    width: currentMobile.resolution.width,
    height: currentMobile.resolution.height
  };

  const newI18nInstance = useMemo(() => i18n.cloneInstance(), []);

  return (
    <div className="device">
      <select value={currentMobile.index} onChange={chooseDevice}>
        {devices.map((device, index) => (
          <option value={index} key={index}>
            {device.name}
          </option>
        ))}
      </select>
      <div className="device__screen" style={deviceSize}>
        <StoreWrapper storeId={userId.toString()}>
          <I18nextProvider i18n={newI18nInstance}>
            <Client
              currentMobile={currentMobile}
              autoconnect={autoconnect}
              isAdmin={adminStatus}
              adminPosition={userId}
              gameId={gameId}
              onCreateGame={handleOnCreateGame}
            />
          </I18nextProvider>
        </StoreWrapper>
      </div>
    </div>
  );
};

export default Device;
