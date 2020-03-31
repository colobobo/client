import React, { FC } from "react";
import { BrowserRouter as Router, useParams, Link } from "react-router-dom";

const Room: FC = () => {
  const { roomId } = useParams();
  // return

  return (
    <div className="room">
      <div className="room__id">Id de la room: {roomId}</div>
      <Link to="/game" className="room__action">
        Commencer le jeu
      </Link>
    </div>
  );
};

export default Room;
