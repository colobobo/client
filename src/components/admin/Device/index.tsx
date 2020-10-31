import React, { useState, FC, useMemo, useCallback } from "react";
import { adminDevices } from "../../../config";
import { AdminDevicesName, AdminDevice } from "../../../config/admin";

//style
import "./index.scss";
import { useSelector } from "react-redux";
import { selectors } from "../../../redux";

interface Props {
  userId: number;
  deviceData: AdminDevice;
  adminRoomId: string;
  autoconnect?: boolean;
}

const Device: FC<Props> = ({
  userId,
  deviceData,
  adminRoomId,
  autoconnect
}) => {
  // selectors

  const adminConnectedDevices = useSelector(
    selectors.admin.selectConnectedDevices
  );
  const areaDevices = useSelector(selectors.area.selectDevices);

  // state

  const [currentDevice, setCurrentDevice] = useState<AdminDevice>(deviceData);

  // handlers

  const chooseDevice = useCallback((event: any) => {
    if (event.target.value) {
      setCurrentDevice(adminDevices[event.target.value as AdminDevicesName]);
    }
  }, []);

  // memo

  const position = useMemo(() => {
    const playerId = adminConnectedDevices[userId.toString()]?.playerId;

    return areaDevices[playerId] ? areaDevices[playerId].position : 100;
  }, [adminConnectedDevices, areaDevices, userId]);

  const iframeUrlSearchParams = useMemo(() => {
    const urlSearchParams = new URLSearchParams();

    urlSearchParams.append("store_id", userId.toString());
    urlSearchParams.append("admin", userId.toString());

    if (adminRoomId) {
      urlSearchParams.append("admin_room", adminRoomId);

      if (autoconnect) {
        urlSearchParams.append("room", adminRoomId);
      }
    }

    return urlSearchParams.toString();
  }, [adminRoomId, autoconnect, userId]);

  // return

  return (
    <div className="device" style={{ order: position }}>
      <select value={currentDevice.name} onChange={chooseDevice}>
        {Object.values(adminDevices).map(device => (
          <option value={device.name} key={device.name}>
            {device.name}
          </option>
        ))}
      </select>
      <div
        className="device__screen"
        style={{
          width: currentDevice.dimensions.width,
          height: currentDevice.dimensions.height
        }}
      >
        <iframe
          src={`${window.location.origin}?${iframeUrlSearchParams}`}
          frameBorder="0"
          title={`device-${userId.toString()}`}
        />
      </div>
    </div>
  );
};

export default Device;
