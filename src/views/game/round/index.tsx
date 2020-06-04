import React, { FC, useMemo } from "react";

// store
import { actions, selectors } from "../../../redux";
import { useDispatch, useSelector } from "react-redux";

// components
import Area from "../../../components/Area";
import GameDecorationBleed from "../../../components/GameDecorationBleed";
import GameDecoration from "../../../components/GameDecoration";
import GameBackground from "../../../components/GameBackground";
import GameInterface from "../../../components/GameInterface";
import GameTimer from "../../../components/GameTimer";
import GamePhaser from "../../../components/GamePhaser";

// config
import { worlds } from "../../../config/worlds";

// styles
import "./index.scss";

const Round: FC = () => {
  const world = "river";

  const worldProperties = useMemo(() => {
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
  }, []);

  // return

  const dispatch = useDispatch();

  const isRoundStarted = useSelector(selectors.round.selectIsStarted);

  return (
    <div
      style={{ backgroundColor: worldProperties!.bgColor }}
      className="round"
    >
      <Area height="min">
        <GameBackground world={world} />
        <GameDecoration world={world} position="top" />
        <GameDecoration world={world} position="bottom" />
        <GamePhaser />
      </Area>
      <Area height="max">
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
      </Area>
      <GameInterface colorTheme={worldProperties!.colorTheme} />
      <button
        style={{ position: "absolute", top: 10, right: 10 }}
        onClick={() => {
          dispatch(actions.webSocket.emit.round.memberArrived());
        }}
      >
        Emit member arrived
      </button>
      <button
        style={{ position: "absolute", top: 10, left: 10 }}
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
