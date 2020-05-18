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

interface currentDevice {
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
  adminRoomId?: string;
  adminDevicesNumber: number;
  autoconnect?: boolean;
  onCreateRoom?: (adminRoomId: string) => any;
}

const Device: FC<Props> = ({
  userId,
  deviceData,
  adminRoomId,
  adminDevicesNumber,
  onCreateRoom,
  autoconnect
}) => {
  const adminStatus = useSelector(selectors.admin.selectStatus);
  const [position, setPosition] = useState<number>();
  const [currentDevice, setCurrentDevice] = useState<currentDevice>({
    index: deviceData?.index,
    name: deviceData?.name,
    resolution: deviceData?.resolution
  });

  const chooseDevice = useCallback((event: any) => {
    setCurrentDevice({
      index: event.target.value,
      name: devices[event.target.value].name,
      resolution: devices[event.target.value].resolution
    });
  }, []);

  const handleOnCreateRoom = useCallback(
    adminRoomId => {
      if (onCreateRoom) {
        onCreateRoom(adminRoomId);
      }
    },
    [onCreateRoom]
  );

  const handleOnSetAdminDevicePosition = useCallback(pos => {
    if (pos) {
      setPosition(pos);
    }
  }, []);

  const deviceSize = {
    width: currentDevice.resolution.width,
    height: currentDevice.resolution.height
  };

  const positionStyle = {
    order: position
  };

  const newI18nInstance = useMemo(() => i18n.cloneInstance(), []);

  return (
    <div className="device" style={positionStyle}>
      <select value={currentDevice.index} onChange={chooseDevice}>
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
              device={currentDevice}
              autoconnect={autoconnect}
              isAdmin={adminStatus}
              adminPosition={userId}
              adminRoomId={adminRoomId}
              onCreateRoom={handleOnCreateRoom}
              onSetAdminDevicePosition={handleOnSetAdminDevicePosition}
            />
          </I18nextProvider>
        </StoreWrapper>
      </div>
    </div>
  );
};

export default Device;
