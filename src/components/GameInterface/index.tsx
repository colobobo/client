import React, { FC, useCallback, useState } from "react";

// components
import InterfaceBreak from "../../components/InterfaceBreak";
import InterfaceTimer from "../../components/InterfaceTimer";
import InterfaceButton, { Colors } from "../../components/InterfaceButton";

// assets
import { ReactComponent as PauseSVG } from "../../assets/icons/pause.svg";

// style
import "./index.scss";

const GameInterface: FC = () => {
  // states

  const [gamePaused, setGamePaused] = useState<boolean>(false);

  //handles

  /* WAITING FOR REAL EVENT TO EMIT TO ALL PLAYERS IN ROOM */
  const handleOnClickToggleGameState = useCallback(state => {
    setGamePaused(state);
  }, []);

  // return

  return (
    <div className="game-interface">
      <InterfaceTimer />
      <InterfaceButton
        onClick={() => handleOnClickToggleGameState(true)}
        color={Colors.blue}
        classNames="game-interface__pause button--round"
      >
        <PauseSVG />
      </InterfaceButton>
      {gamePaused && (
        <InterfaceBreak
          handleOnClickToggleGameState={handleOnClickToggleGameState}
        />
      )}
    </div>
  );
};

export default GameInterface;
