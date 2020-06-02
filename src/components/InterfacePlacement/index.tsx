import React, { FC, useMemo, useEffect } from "react";

// store
import { selectors } from "../../redux";
import { useTypedSelector } from "../../redux/store";

// assets
import mobileIcon from "../../assets/illustrations/mobile.png";

// styles
import "./index.scss";

interface Props {
  placement: string;
}

const InterfacePlacement: FC<Props> = ({ placement }) => {
  // store

  const devicesArray = useTypedSelector(selectors.area.selectDevicesArray);
  const deviceId = useTypedSelector(selectors.room.selectDeviceId);
  const currentDevice = useTypedSelector(state =>
    selectors.area.selectDevice(state, { id: deviceId })
  );

  const currentDevicePosition = useMemo(() => {
    return currentDevice?.position;
  }, [currentDevice]);

  // effects

  useEffect(() => {
    const playersContainer = document.querySelector(
      ".placement__players"
    ) as HTMLElement;
    const players = document.getElementsByClassName(
      "placement__player"
    ) as HTMLCollection;

    playersContainer.style.height = `${playersContainer.offsetWidth}px`;

    const degree = 360 / players.length;
    const radius = playersContainer.offsetWidth / 3;
    const step = (2 * Math.PI) / players.length;

    let angle = 0;
    let incrementDegree = 0;

    for (let player of players) {
      const currentPlayer = player as HTMLElement;

      if (placement === "round" && devicesArray.length > 1) {
        currentPlayer.style.transform = `rotate(-${incrementDegree}deg)`;

        const x = Math.round(
          playersContainer.offsetWidth / 2 +
            radius * Math.cos(angle) -
            currentPlayer.offsetWidth
        );
        const y = Math.round(
          playersContainer.offsetHeight / 2 +
            radius * Math.sin(angle) -
            currentPlayer.offsetWidth / 2
        );

        currentPlayer.style.position = `absolute`;
        currentPlayer.style.top = `${x}px`;
        currentPlayer.style.left = `${y}px`;

        angle += step;
        incrementDegree += degree;
      } else {
        currentPlayer.style.transform = `none`;
        currentPlayer.style.position = `relative`;
        currentPlayer.style.top = `initial`;
        currentPlayer.style.left = `initial`;
      }
    }
  }, [devicesArray.length, placement]);

  // return

  return (
    <div className="placement">
      <div className={`placement__players ${placement}`}>
        {devicesArray.map(device => (
          <div
            className={`placement__player ${
              currentDevicePosition === device.position ? "current" : ""
            }`}
            key={device.id}
          >
            <img src={mobileIcon} alt={`Position ${device.position + 1}`} />
            <span>{device.position + 1}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InterfacePlacement;
