import React, { useState, FC, useMemo, useEffect } from "react";
import { devices } from "../../../datas/devices";
import StoreWrapper from "../../../components/StoreWrapper";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../translations/i18n";

import { useSelector } from "react-redux";
import { selectors } from "../../../redux";

import Client from "../../../views/client";
import "./index.scss";

interface resolution {
  width: number;
  height: number;
}

interface currentMobileState {
  index: number;
  name: string;
  resolution: resolution;
}

interface Props {
  userId: number;
  deviceName: string;
}

const Device: FC<Props> = ({ userId, deviceName }) => {
  const adminStatus = useSelector(selectors.admin.selectStatus);

  const [currentMobile, setCurrentMobile] = useState<currentMobileState>({
    index: 0,
    name: devices[0].name,
    resolution: devices[0].resolution
  });

  useEffect(() => {
    if (deviceName) {
      devices.map((device, index) => {
        if (device.name === deviceName) {
          setCurrentMobile({
            index: index,
            name: device.name,
            resolution: device.resolution
          });
        }
      });
    }
  }, [deviceName]);

  function chooseDevice(event: any) {
    setCurrentMobile({
      index: event.target.value,
      name: devices[event.target.value].name,
      resolution: devices[event.target.value].resolution
    });
  }

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
            <Client deviceSize={deviceSize} isAdmin={adminStatus} />
          </I18nextProvider>
        </StoreWrapper>
      </div>
    </div>
  );
};

export default Device;
