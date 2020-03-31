import React, { FC } from "react";
import "./index.scss";

import Landing from "./landing";
import Game from "./game";
import JoinRoom from "./joinRoom";
import CreateRoom from "./createRoom";

const Client: FC = () => {
  // return

  return (
    <div className="client">
      <Landing />
      <JoinRoom />
      <CreateRoom />
      <Game />
    </div>
  );
};

export default Client;
