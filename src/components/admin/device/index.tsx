import React, { useState, FC } from "react";
import { devices } from "../../../datas/devices";
import StoreWrapper from "../../../components/StoreWrapper";

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
          <Client deviceSize={deviceSize} isAdmin={adminStatus} />
        </StoreWrapper>
      </div>
    </div>
  );
};

export default Device;
