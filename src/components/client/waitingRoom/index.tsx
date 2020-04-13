import React, { FC } from "react";
import { useParams } from "react-router-dom";

import "./index.scss";

const Room: FC = () => {
  const { roomId } = useParams();

  // return

  return (
    <div className="waiting-room">
      <div className="waiting-room__container">
        <h1 className="waiting-room__title">
          Vous êtes bien dans la room : {roomId}
        </h1>
      </div>
    </div>
  );
};

export default Room;
