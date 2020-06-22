import React, { FC, useEffect, useMemo } from "react";

// store
import { actions, selectors } from "../../../redux";
import { useDispatch, useSelector } from "react-redux";
import { useTypedSelector } from "../../../redux/store";

// components
import Area from "../../../components/Area";
import GameDecorationBleed, {
  Position as GameDecorationBleedPosition
} from "../../../components/GameDecorationBleed";
import GameDecoration, {
  Position as GameDecorationPosition
} from "../../../components/GameDecoration";
import GameBackground from "../../../components/GameBackground";
import GameInterface from "../../../components/GameInterface";
import GamePhaser from "../../../components/GamePhaser";

// config
import * as config from "../../../config";

// styles
import "./index.scss";

interface Props {
  isActive: boolean;
}

const Round: FC<Props> = ({ isActive }) => {
  const dispatch = useDispatch();

  const hasGamePreamble = useTypedSelector(selectors.game.selectHasPreamble);
  const world = useTypedSelector(selectors.round.selectWorld);

  const worldProperties = useMemo(() => {
    return config.worlds[world];
  }, [world]);

  useEffect(() => {
    if (isActive) {
      dispatch(actions.webSocket.emit.round.playerReady());
    }
  }, [dispatch, isActive]);

  useEffect(() => {
    if (isActive && !hasGamePreamble) {
      dispatch(actions.game.preambleUpdate());
    }
  }, [dispatch, hasGamePreamble, isActive]);

  // return

  return (
    <div
      style={{ backgroundColor: worldProperties?.bgColor }}
      className={`round ${isActive ? "active" : ""}`}
    >
      <Area height="min">
        {world && (
          <div>
            <GameBackground world={world} />
            <GamePhaser isActive={isActive} />
            <GameDecoration
              world={world}
              position={GameDecorationPosition.top}
            />
            <GameDecoration
              world={world}
              position={GameDecorationPosition.bottom}
            />
          </div>
        )}
      </Area>
      <Area height="max">
        {world && (
          <div>
            <GameDecorationBleed
              bgBleedColor={worldProperties!.bgBleedColor}
              world={world}
              position={GameDecorationBleedPosition.top}
            />
            <GameDecorationBleed
              bgBleedColor={worldProperties!.bgBleedColor}
              world={world}
              position={GameDecorationBleedPosition.bottom}
            />
          </div>
        )}
      </Area>
      {world && <GameInterface colorTheme={worldProperties!.colorTheme} />}
    </div>
  );
};

export default Round;
