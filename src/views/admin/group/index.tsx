import React, { useState, FC, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../../../redux";
import Device from "../../../components/admin/Device";

//config
import { adminGroups, adminDevices } from "../../../config";

//style
import "./index.scss";

interface room {
  name: string;
  devices: Array<string>;
  adminRoomId?: string;
  autoconnect?: boolean;
}

const Group: FC = () => {
  let { groupId } = useParams();
  const dispatch = useDispatch();

  // store

  const roomId = useSelector(selectors.room.selectId);

  // state

  const [devicesList, setDevicesList] = useState<Array<object>>([]);
  const [devicesNumber, setDevicesNumber] = useState<number>(0);
  const [currentRoom, setCurrentRoom] = useState<room>({
    name: "",
    devices: [],
    adminRoomId: "",
    autoconnect: false
  });

  // handlers

  const handleOnAddPlayer = useCallback(() => {
    setDevicesNumber(prev => prev + 1);
  }, []);

  // EFFECTS

  // on mount : create socket room

  useEffect(() => {
    dispatch(
      actions.webSocket.emit.room.create({ isAdmin: true, width: 0, height: 0 })
    );
  }, [dispatch]);

  useEffect(() => {
    if (groupId) {
      setCurrentRoom({
        name: adminGroups[parseInt(groupId)].name,
        devices: adminGroups[parseInt(groupId)].devices,
        autoconnect: adminGroups[parseInt(groupId)].autoconnect
      });
      setDevicesNumber(adminGroups[parseInt(groupId)].devices.length);
    }
  }, [groupId]);

  useEffect(() => {
    if (groupId && roomId) {
      const devicesArray = [];

      for (let i = 0; i < devicesNumber; i++) {
        let deviceName, deviceIndex, deviceResolution;

        if (currentRoom.devices[i] != null) {
          deviceName = currentRoom.devices[i];
          for (let j = 0; j < adminDevices.length; j++) {
            if (adminDevices[j].name === deviceName) {
              deviceIndex = j;
              deviceResolution = adminDevices[j].resolution;
            }
          }
        } else {
          deviceIndex = 0;
          deviceName = adminDevices[0].name;
          deviceResolution = adminDevices[0].resolution;
        }

        const deviceData = {
          index: deviceIndex,
          name: deviceName,
          resolution: deviceResolution
        };

        const device = (
          <Device
            key={i}
            userId={i}
            autoconnect={currentRoom.autoconnect}
            deviceData={deviceData}
            adminRoomId={roomId}
            // onCreateRoom={handleOnCreateRoom}
          />
        );

        devicesArray.push(device);
      }
      setDevicesList(devicesArray);
    }
  }, [
    devicesNumber,
    currentRoom.autoconnect,
    currentRoom.devices,
    currentRoom.adminRoomId,
    // handleOnCreateRoom,
    groupId,
    roomId
  ]);

  return (
    <div className="admin-room">
      <div className="admin-room__header">
        <div>
          <h1 className="admin-room__title">Room: {currentRoom.name}</h1>
          <h2 className="admin-room__title2">Socket room id : {roomId}</h2>
        </div>

        <button onClick={handleOnAddPlayer} className="admin-room__add">
          Ajouter un joueur
        </button>
      </div>

      <div className="admin-room__container">
        <div className="admin-room__clients">{devicesList}</div>
      </div>
    </div>
  );
};

export default Group;
