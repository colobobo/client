import React, { FC } from "react";

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

// styles
import "./index.scss";

const Round: FC = () => {
  // return

  const dispatch = useDispatch();

  const isRoundStarted = useSelector(selectors.round.selectIsStarted);

  return (
    <div style={{ backgroundColor: "#A4E7FF" }} className="round">
      <Area height="min">
        <GameBackground />
        <GameDecoration position="top" />
        <GameDecoration position="bottom" />
        <GamePhaser />
      </Area>
      <Area height="max">
        <GameDecorationBleed position="top" />
        <GameDecorationBleed position="bottom" />
      </Area>
      <GameInterface />
      <GameTimer />
      <button
        style={{ position: "absolute", top: 100, left: 10 }}
        onClick={() => {
          dispatch(actions.webSocket.emit.round.playerReady());
        }}
      >
        Emit round player ready
      </button>
      <button
        style={{ position: "absolute", top: 130, left: 10 }}
        onClick={() => {
          dispatch(actions.webSocket.emit.round.memberArrived());
        }}
      >
        Emit member arrived
      </button>
    </div>
  );
};

export default Round;
