import React, { FC, useMemo } from "react";

// store
import { actions, selectors } from "../../../redux";
import { useDispatch, useSelector } from "react-redux";
import { useTypedSelector } from "../../../redux/store";

// components
import Area from "../../../components/Area";
import GameDecorationBleed from "../../../components/GameDecorationBleed";
import GameDecoration from "../../../components/GameDecoration";
import GameBackground from "../../../components/GameBackground";
import GameInterface from "../../../components/GameInterface";
import GamePhaser from "../../../components/GamePhaser";

// config
import { worlds } from "../../../config/worlds";

// styles
import "./index.scss";

const Round: FC = () => {
  const world = useTypedSelector(selectors.round.selectWorld);

  const worldProperties = useMemo(() => {
    console.log(world);
    for (let i = 0; i < worlds.length; i++) {
      if (worlds[i].name === world) {
        const properties = {
          bgColor: worlds[i].bgColor,
          bgBleedColor: worlds[i].bgBleedColor,
          colorTheme: worlds[i].colorTheme
        };
        return properties;
      }
    }
  }, [world]);

  // return

  const dispatch = useDispatch();

  const isRoundStarted = useSelector(selectors.round.selectIsStarted);

  return (
    <div
      style={{ backgroundColor: worldProperties?.bgColor }}
      className="round"
    >
      <Area height="min">
        {world && (
          <div>
            <GameBackground world={world} />
            <GameDecoration world={world} position="top" />
            <GameDecoration world={world} position="bottom" />
          </div>
        )}
        <GamePhaser />
      </Area>
      <Area height="max">
        {world && (
          <div>
            <GameDecorationBleed
              bgBleedColor={worldProperties!.bgBleedColor}
              world={world}
              position="top"
            />
            <GameDecorationBleed
              bgBleedColor={worldProperties!.bgBleedColor}
              world={world}
              position="bottom"
            />
          </div>
        )}
      </Area>
      {world && (
        <GameInterface
          isRoundStarted={isRoundStarted}
          colorTheme={worldProperties!.colorTheme}
        />
      )}
      <button
        style={{ position: "absolute", top: 30, right: 10 }}
        onClick={() => {
          dispatch(actions.webSocket.emit.round.memberArrived());
        }}
      >
        Emit member arrived
      </button>
      <button
        style={{ position: "absolute", top: 60, right: 10 }}
        onClick={() => {
          dispatch(actions.webSocket.emit.round.playerReady());
        }}
      >
        Emit round player ready
      </button>
    </div>
  );
};

export default Round;
