import React, { FC } from "react";
import { BrowserRouter as Router, useParams, Link } from "react-router-dom";

import "./index.scss";

const Room: FC = () => {
  const { roomId } = useParams();
  // return

  return (
    <div className="room">
      <div className="room__container">
        <h1 className="room__title">Id de la room: {roomId}</h1>
        <Link to="/game" className="room__action button button--orange">
          Commencer le jeu
        </Link>
      </div>
    </div>
  );
};

export default Room;
