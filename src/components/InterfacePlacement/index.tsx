import React, { FC, useMemo } from "react";

// store
import { selectors } from "../../redux";
import { useTypedSelector } from "../../redux/store";

// assets
import mobileIcon from "../../assets/illustrations/mobile.png";

// styles
import "./index.scss";

interface Props {
  placement: string;
}

const InterfacePlacement: FC<Props> = ({ placement }) => {
  // store

  const devicesArray = useTypedSelector(selectors.area.selectDevicesArray);
  const deviceId = useTypedSelector(selectors.room.selectDeviceId);
  const currentDevice = useTypedSelector(state =>
    selectors.area.selectDevice(state, { id: deviceId })
  );

  const currentDevicePosition = useMemo(() => {
    return currentDevice?.position;
  }, [currentDevice]);

  // return

  return (
    <div className="placement">
      <div className="placement__container">
        <div className={`placement__players ${placement}`}>
          {devicesArray.map(device => (
            <div
              className={`placement__player ${
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
    </div>
  );
};

export default InterfacePlacement;
