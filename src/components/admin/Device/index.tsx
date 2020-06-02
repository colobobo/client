import React, { useState, FC, useMemo, useCallback } from "react";
import { devices } from "../../../datas/devices";

//style
import "./index.scss";
import { useSelector } from "react-redux";
import { selectors } from "../../../redux";

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

  const adminDevices = useSelector(selectors.admin.selectDevices);
  const areaDevices = useSelector(selectors.area.selectDevices);

  // state

  const [currentDevice, setCurrentDevice] = useState<currentDevice>({
    index: deviceData?.index,
    name: deviceData?.name,
    resolution: deviceData?.resolution
  });

  // handlers

  const chooseDevice = useCallback((event: any) => {
    setCurrentDevice({
      index: event.target.value,
      name: devices[event.target.value].name,
      resolution: devices[event.target.value].resolution
    });
  }, []);

  // memo

  const position = useMemo(() => {
    const playerId = adminDevices[userId.toString()]?.playerId;

    return areaDevices[playerId] ? areaDevices[playerId].position : 100;
  }, [adminDevices, areaDevices, userId]);

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
      <select value={currentDevice.index} onChange={chooseDevice}>
        {devices.map((device, index) => (
          <option value={index} key={index}>
            {device.name}
          </option>
        ))}
      </select>
      <div
        className="device__screen"
        style={{
          width: currentDevice.resolution.width,
          height: currentDevice.resolution.height
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
