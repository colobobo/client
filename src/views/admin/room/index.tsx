import React, { useState, FC, useMemo, useCallback } from "react";
import Device from "../../../components/admin/device";
import "./index.scss";

const Room: FC = () => {
  const [clientNumber, setClientNumber] = useState(1);

  let clients = useMemo(() => {
    const c = [];
    for (let i = 0; i < clientNumber; i++) {
      c.push(<Device key={i} userId={i} />);
    }
    return c;
  }, [clientNumber]);

  const handle = useCallback(() => {
    setClientNumber(prev => prev + 1);
  }, []);

  return (
    <div className="room">
      <div className="room__header">
        <h1 className="room__title">Room: 0001</h1>
        <button onClick={handle} className="room__add">
          Ajouter un joueur
        </button>
      </div>

      <div className="room__container">
        <div className="room__clients">{clients}</div>
      </div>
    </div>
  );
};

export default Room;
