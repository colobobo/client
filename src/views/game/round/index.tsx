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

  const roundMembersWaiting = useSelector(selectors.round.selectMembersWaiting);
  const roundMembersActive = useSelector(selectors.round.selectMembersActive);
  const roundMembersArrived = useSelector(selectors.round.selectMembersArrived);

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
      <div
        className="debug-buttons"
        style={{
          position: "absolute",
          top: 100,
          left: 10,
          display: "flex",
          flexDirection: "column"
        }}
      >
        <button
          style={{ marginTop: 15 }}
          onClick={() => {
            dispatch(actions.webSocket.emit.round.playerReady());
          }}
        >
          Emit round player ready
        </button>
        <button
          style={{ marginTop: 15 }}
          onClick={() => {
            const memberId = roundMembersWaiting[0]?.id;
            if (memberId) {
              dispatch(
                actions.webSocket.emit.round.memberSpawned({ memberId })
              );
            }
          }}
        >
          Emit member spawned
        </button>
        <button
          style={{ marginTop: 15 }}
          onClick={() => {
            const memberId = roundMembersActive[0]?.id;
            if (memberId) {
              dispatch(
                actions.webSocket.emit.round.memberTrapped({ memberId })
              );
            }
          }}
        >
          Emit member trapped
        </button>
        <button
          style={{ marginTop: 15 }}
          onClick={() => {
            const memberId = roundMembersActive[0]?.id;
            if (memberId) {
              dispatch(
                actions.webSocket.emit.round.memberArrived({ memberId })
              );
            }
          }}
        >
          Emit member arrived
        </button>
        <p style={{ marginTop: 5 }}>Waiting: {roundMembersWaiting.length}</p>
        <p style={{ marginTop: 5 }}>Active: {roundMembersActive.length}</p>
        <p style={{ marginTop: 5 }}>Arrived: {roundMembersArrived.length}</p>
      </div>
    </div>
  );
};

export default Round;
