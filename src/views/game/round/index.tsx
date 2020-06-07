import React, { FC, useMemo } from "react";

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

  const roundMembersWaiting = useSelector(selectors.round.selectMembersWaiting);
  const roundMembersActive = useSelector(selectors.round.selectMembersActive);
  const roundMembersArrived = useSelector(selectors.round.selectMembersArrived);
  const isRoundStarted = useSelector(selectors.round.selectIsStarted);
  const world = useTypedSelector(selectors.round.selectWorld);

  const worldProperties = useMemo(() => {
    return config.worlds[world];
  }, [world]);

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
        {isActive && <GamePhaser />}
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
          top: 90,
          left: 10,
          display: "none",
          flexDirection: "column",
          pointerEvents: "none"
        }}
      >
        <button
          style={{
            marginTop: 10
            //pointerEvents: "all"
          }}
          onClick={() => {
            dispatch(actions.webSocket.emit.round.playerReady());
          }}
        >
          Emit round player ready
        </button>
        <button
          style={{
            marginTop: 10
            //pointerEvents: "all"
          }}
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
          style={{
            marginTop: 10
            //pointerEvents: "all"
          }}
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
          style={{ marginTop: 10, pointerEvents: "all" }}
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
