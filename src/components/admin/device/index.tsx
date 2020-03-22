import React, { useState, useEffect, FunctionComponent } from "react";
import { devices } from "../../../datas/devices";

import Client from "../../client";
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

const Device: FunctionComponent<Props> = ({ userId }) => {
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
    <div className="client">
      <select onChange={chooseDevice}>
        {devices.map((devices, index) => (
          <option value={index} key={index}>
            {devices.name}
          </option>
        ))}
      </select>
      <div className="client__screen" style={deviceSize}>
        <Client userId={userId} />
      </div>
    </div>
  );
};

export default Device;
