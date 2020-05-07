import React, { useState, FC, useMemo, useCallback, useEffect } from "react";
import { useParams } from "react-router-dom";
import Device from "../../../components/admin/device";

//config
import { rooms } from "../../../config/rooms";

//style
import "./index.scss";

interface room {
  name: string;
  devices: Array<string>;
}

const Room: FC = () => {
  let { roomId } = useParams();

  const [clientNumber, setClientNumber] = useState(1);
  const [currentRoom, setCurrentRoom] = useState<room>({
    name: "",
    devices: []
  });

  useEffect(() => {
    if (roomId) {
      setCurrentRoom({
        name: rooms[parseInt(roomId)].name,
        devices: rooms[parseInt(roomId)].devices
      });
      setClientNumber(rooms[parseInt(roomId)].devices.length);
    }
  }, [roomId]);

  let devices = useMemo(() => {
    const c = [];
    for (let i = 0; i < clientNumber; i++) {
      c.push(<Device key={i} userId={i} deviceName={currentRoom.devices[i]} />);
    }
    return c;
  }, [clientNumber]);

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
        <div className="admin-room__clients">{devices}</div>
      </div>
    </div>
  );
};

export default Room;
