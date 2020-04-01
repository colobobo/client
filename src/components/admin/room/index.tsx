import React, { useState, FC, useMemo, useCallback } from "react";
import Device from "../../../components/admin/device";
import "./index.scss";

const Room: FC = () => {
  const [clientNumber, setClientNumber] = useState(1);

  let devices = useMemo(() => {
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
    <div className="admin-room">
      <div className="admin-room__header">
        <h1 className="admin-room__title">Room: 0001</h1>
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
