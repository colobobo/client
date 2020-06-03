import React, { FC, useCallback, useState } from "react";

// components
import InterfaceBreak from "../../components/InterfaceBreak";
import InterfaceButton from "../../components/InterfaceButton";

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
      <InterfaceButton
        actionOnClick={() => handleOnClickToggleGameState(true)}
        color="blue"
        extraClass="game-interface__pause button--round"
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
