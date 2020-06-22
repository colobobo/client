import React, { FC, useMemo } from "react";

// components
import Area from "../../components/Area";

// store
import { useTypedSelector } from "../../redux/store";
import { selectors } from "../../redux";

// style
import "./index.scss";

interface Props {
  isGameOver: boolean;
}

const InterfaceScoreArea: FC<Props> = ({ isGameOver }) => {
  const areaDevices = useTypedSelector(selectors.area.selectDevices);
  const playerId = useTypedSelector(selectors.room.selectPlayerId);
  const device = useTypedSelector(state =>
    selectors.area.selectDevice(state, { playerId })
  );

  // handlers

  const isLastDevice = useMemo(() => {
    return Object.keys(areaDevices).length - 1 === device.position;
  }, [areaDevices, device.position]);

  // return

  return (
    <div className="score-area">
      <Area height="min">
        <div className="score__bush"></div>
        {isLastDevice && !isGameOver && (
          <img
            className="score__sign"
            src={require(`../../assets/illustrations/score/sign.png`)}
            alt="Sign"
          />
        )}
      </Area>
    </div>
  );
};

export default InterfaceScoreArea;
