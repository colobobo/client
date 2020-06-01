import React, { FC } from "react";
import Area from "../../../components/Area";
import GameDecorationBleed from "../../../components/GameDecorationBleed";
import GameDecoration from "../../../components/GameDecoration";
import GameBackground from "../../../components/GameBackground";

import "./index.scss";
import GamePhaser from "../../../components/GamePhaser";
import { actions, selectors } from "../../../redux";
import { useDispatch, useSelector } from "react-redux";

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
