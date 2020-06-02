import React, { useState, FC, useMemo, useCallback } from "react";
import { devices } from "../../../datas/devices";

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
  autoconnect?: boolean;
  onCreateRoom?: (adminRoomId: string) => any;
}

const Device: FC<Props> = ({
  userId,
  deviceData,
  adminRoomId,
  onCreateRoom,
  autoconnect
}) => {
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

  // const handleOnCreateRoom = useCallback(
  //   adminRoomId => {
  //     if (onCreateRoom) {
  //       onCreateRoom(adminRoomId);
  //     }
  //   },
  //   [onCreateRoom]
  // );
  //
  // const handleOnSetAdminDevicePosition = useCallback(pos => {
  //   setPosition(pos);
  // }, []);

  const iframeUrlSearchParams = useMemo(() => {
    const urlSearchParams = new URLSearchParams();

    urlSearchParams.append("admin", userId.toString());
    if (autoconnect && adminRoomId) {
      urlSearchParams.append("room", adminRoomId);
    }

    return urlSearchParams.toString();
  }, [adminRoomId, autoconnect, userId]);

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
        {/*    <Client*/}
        {/*      device={currentDevice}*/}
        {/*      autoconnect={autoconnect}*/}
        {/*      isAdmin={adminStatus}*/}
        {/*      adminPosition={userId}*/}
        {/*      adminRoomId={adminRoomId}*/}
        {/*      onCreateRoom={handleOnCreateRoom}*/}
        {/*      onSetAdminDevicePosition={handleOnSetAdminDevicePosition}*/}
        {/*    />*/}
        <iframe
          src={`${window.location.origin}?${iframeUrlSearchParams}`}
          frameBorder="0"
        />
      </div>
    </div>
  );
};

export default Device;
