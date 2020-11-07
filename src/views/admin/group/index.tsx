import React, { FC, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../../../redux";
import Device from "../../../components/admin/Device";

//config
import { adminDevices, adminGroups } from "../../../config";
import { AdminDevicesName, AdminGroup } from "../../../config/admin";

//style
import "./index.scss";

const Group: FC = () => {
  let { groupId } = useParams();
  const dispatch = useDispatch();

  // store

  const roomId = useSelector(selectors.room.selectId);

  // state

  const [currentRoom, setCurrentRoom] = useState<AdminGroup>({
    name: "",
    devices: [],
    autoconnect: false
  });

  // handlers

  const handleOnAddPlayer = useCallback(() => {
    setCurrentRoom(prev => ({
      ...prev,
      devices: [...prev.devices, AdminDevicesName.iPhone_5_SE]
    }));
  }, []);

  // effects

  // on mount : create socket room
  useEffect(() => {
    dispatch(
      actions.webSocket.emit.room.create({ isAdmin: true, width: 0, height: 0 })
    );
  }, [dispatch]);

  // on mount : set room
  useEffect(() => {
    if (groupId) {
      setCurrentRoom(adminGroups[parseInt(groupId)]);
    }
  }, [groupId]);

  // renderer

  const renderDevices = useCallback(() => {
    if (groupId && roomId) {
      return currentRoom.devices.map((device, i) => (
        <Device
          key={i}
          userId={i}
          autoconnect={currentRoom.autoconnect}
          deviceData={adminDevices[device]}
          adminRoomId={roomId}
        />
      ));
    }
    return null;
  }, [currentRoom.autoconnect, currentRoom.devices, groupId, roomId]);

  // return

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
        <div className="admin-room__clients">{renderDevices()}</div>
      </div>
    </div>
  );
};

export default Group;
