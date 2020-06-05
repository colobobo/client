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

  const roundMembersWaiting = useSelector(selectors.round.selectMembersWaiting);
  const roundMembersActive = useSelector(selectors.round.selectMembersActive);
  const roundMembersArrived = useSelector(selectors.round.selectMembersArrived);
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
