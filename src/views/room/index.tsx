import React, { useState, FunctionComponent } from "react";
import Device from "../../components/admin/device";
import "./index.scss";

const Room: FunctionComponent = () => {
  const [clientNumber, setClientNumber] = useState(1);

  let clients = [];
  for (let i = 0; i < clientNumber; i++) {
    clients.push(<Device key={i} userId={i} />);
  }

  return (
    <div className="room">
      <div className="room__header">
        <h1 className="room__title">Room: 0001</h1>
        <button
          onClick={() => setClientNumber(clientNumber + 1)}
          className="room__add"
        >
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
