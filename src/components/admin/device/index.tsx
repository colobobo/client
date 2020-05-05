import React, { useState, FC, useMemo } from "react";
import { devices } from "../../../datas/devices";
import StoreWrapper from "../../../components/StoreWrapper";
import { I18nextProvider } from "react-i18next";
import i18n from "../../../translations/i18n";

import { useSelector } from "react-redux";
import { selectors as AdminSelectors } from "../../../redux/Admin";

import Client from "../../../views/client";
import "./index.scss";

interface resolution {
  width: number;
  height: number;
}

interface currentMobileState {
  name: string;
  resolution: resolution;
}

interface Props {
  userId: number;
}

const Device: FC<Props> = ({ userId }) => {
  const adminStatus = useSelector(AdminSelectors.selectStatus);

  const [currentMobile, setCurrentMobile] = useState<currentMobileState>({
    name: devices[0].name,
    resolution: devices[0].resolution
  });

  function chooseDevice(event: any) {
    setCurrentMobile({
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
      <select onChange={chooseDevice}>
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
