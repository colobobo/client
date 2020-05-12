/* eslint-disable prettier/prettier */
import React, { useState, FC, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import Device from "../../../components/admin/device";

//config
import { rooms } from "../../../config/rooms";
import { devices } from "../../../datas/devices";

//style
import "./index.scss";

interface room {
  name: string;
  devices: Array<string>;
  gameId?: string;
  autoconnect?: boolean;
}

const Room: FC = () => {
  let { roomId } = useParams();

  //store

  const [devicesList, setDevicesList] = useState<Array<object>>([]);
  const [clientNumber, setClientNumber] = useState<number>(0);
  const [currentRoom, setCurrentRoom] = useState<room>({
    name: "",
    devices: [],
    gameId: "",
    autoconnect: false
  });

  const handleOnCreateGame = useCallback((gameId: string) => {
    setCurrentRoom(prev => ({
      ...prev,
      gameId
    }));
  }, []);

  useEffect(() => {
    if (roomId) {
      setCurrentRoom({
        name: rooms[parseInt(roomId)].name,
        devices: rooms[parseInt(roomId)].devices,
        autoconnect: rooms[parseInt(roomId)].autoconnect
      });
      setClientNumber(rooms[parseInt(roomId)].devices.length);
    }
  }, [roomId]);

  useEffect(() => {
    if (roomId) {
      const c = [];

      for (let i = 0; i < clientNumber; i++) {
        const deviceName = currentRoom.devices[i];
        let deviceIndex = 0;
        let deviceResolution = {};

        for (let j = 0; j < devices.length; j++) {
          if (devices[j].name === deviceName) {
            deviceIndex = j;
            deviceResolution = devices[j].resolution;
          }
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
            gameId={currentRoom.gameId}
            onCreateGame={handleOnCreateGame}
          />
        );

        c.push(device);
      }
      console.log("c", c);
      setDevicesList(c);
    }
  }, [
    clientNumber,
    currentRoom.autoconnect,
    currentRoom.devices,
    currentRoom.gameId,
    handleOnCreateGame,
    roomId
  ]);

  const handle = useCallback(() => {
    setClientNumber(prev => prev + 1);
  }, []);

  return (
    <div className="admin-room">
      <div className="admin-room__header">
        <h1 className="admin-room__title">Room: {currentRoom.name}</h1>
        <button onClick={handle} className="admin-room__add">
          Ajouter un joueur
        </button>
      </div>

      <div className="admin-room__container">
        <div className="admin-room__clients">{devicesList}</div>
      </div>
    </div>
  );
};

export default Room;
