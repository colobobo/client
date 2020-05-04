import React, { FC, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";

import "./index.scss";
import { useTypedSelector } from "../../../redux/store";
import { selectors } from "../../../redux";

const Room: FC = () => {
  const { roomId } = useParams();
  const history = useHistory();

  // store

  const devicesArray = useTypedSelector(selectors.area.selectDevicesArray);
  const isGameStarted = useTypedSelector(selectors.game.selectIsStarted);

  // effect

  useEffect(() => {
    if (isGameStarted) {
      history.push("/game/");
    }
  }, [history, isGameStarted]);

  // return

  return (
    <div className="waiting-room">
      <div className="waiting-room__container">
        <h1 className="waiting-room__container__title">
          Vous êtes bien dans la room : {roomId}
        </h1>
        <p>Joueur{devicesArray.length > 1 && "s"} :</p>
        <ul>
          {devicesArray.map(device => (
            <li key={device.id}>{device.id}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Room;
